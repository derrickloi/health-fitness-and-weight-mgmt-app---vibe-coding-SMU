import type { Request, Response } from 'express';

// Target endpoints specified by user under data.gov.sg real-time API and wger
const WGER_ENDPOINT = 'https://wger.de/api/v2/exerciseinfo/?language=2&limit=20';
const DATA_GOV_SG_TWO_HR_ENDPOINT = 'https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast';
const DATA_GOV_SG_PM25_ENDPOINT = 'https://api-open.data.gov.sg/v2/real-time/api/pm25';

export interface ExerciseItem {
  id: number;
  uuid?: string;
  name: string;
  category: string;
  description: string;
  muscles: string[];
  equipment: string[];
  images: string[];
}

export interface AreaForecast {
  area: string;
  forecast: string;
}

export interface WeatherAirData {
  updateTimestamp?: string;
  validPeriod?: {
    start: string;
    end: string;
  };
  forecasts: AreaForecast[];
  summaryCondition: string;
  outdoorWorkoutAdvisory: {
    status: 'Optimal' | 'Caution' | 'Indoor Recommended';
    recommendation: string;
  };
}

export type Pm25Band = 'Band 1 (Normal)' | 'Band 2 (Elevated)' | 'Band 3 (High)' | 'Band 4 (Very High)';

export interface RegionalPm25Reading {
  region: 'north' | 'south' | 'east' | 'west' | 'central';
  value: number; // in µg/m³
  band: Pm25Band;
  isIdealForOutdoor: boolean;
}

export interface Pm25AirQualityData {
  updatedTimestamp: string;
  readings: Record<string, number>;
  regionalDetails: RegionalPm25Reading[];
  maxRegion: {
    region: string;
    value: number;
    band: Pm25Band;
  };
  nationalAverage: number;
  overallBand: Pm25Band;
  isIdealForOutdoor: boolean;
  advisory: {
    verdict: string;
    actionableAdvice: string;
    vulnerableGroupAdvice: string; // for seniors 50-70yo, diabetes, pregnant individuals
    recommendedVenue: 'Outdoor Parks & Trails' | 'Indoor Air-Conditioned ActiveSG Gym' | 'Home / Low Exertion';
  };
}

export interface HealthFitnessWeightMgmtResponse {
  success: boolean;
  timestamp: string;
  sources: {
    wger: {
      status: 'success' | 'failed';
      totalCount?: number;
      count: number;
      data: ExerciseItem[];
      error?: string;
    };
    weather: {
      status: 'success' | 'failed';
      data?: WeatherAirData;
      error?: string;
    };
    pm25: {
      status: 'success' | 'failed';
      data?: Pm25AirQualityData;
      error?: string;
    };
  };
  outdoorFitnessVerdict: {
    isIdealTimeForOutdoor: boolean;
    headline: string;
    detailedAdvisory: string;
    recommendedWorkoutMode: 'Outdoor Trail & Running' | 'Indoor ActiveSG Gym' | 'Light Indoor Mobility';
    hydrationAdvisoryMl: number;
  };
  keysConfigured: {
    wger: boolean;
    dataGovSg: boolean;
  };
}

/**
 * Fetch live data from wger with optional user-supplied API key
 */
export async function fetchWgerExercises(): Promise<{ totalCount?: number; items: ExerciseItem[] }> {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'User-Agent': 'NadiFit-ASEAN-App/1.0'
  };

  const wgerKey = process.env.WGER_API_KEY;
  if (wgerKey) {
    headers['Authorization'] = `Token ${wgerKey}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(WGER_ENDPOINT, {
      headers,
      signal: controller.signal
    });

    if (!res.ok) {
      throw new Error(`wger API responded with HTTP status ${res.status}`);
    }

    const json = await res.json();
    const rawResults = Array.isArray(json.results) ? json.results : [];

    const items: ExerciseItem[] = rawResults.map((ex: any) => {
      const cleanDesc = (ex.description || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const muscles: string[] = [];
      if (Array.isArray(ex.muscles)) {
        ex.muscles.forEach((m: any) => {
          if (m?.name_en || m?.name) muscles.push(m.name_en || m.name);
        });
      }

      const equipment: string[] = [];
      if (Array.isArray(ex.equipment)) {
        ex.equipment.forEach((eq: any) => {
          if (eq?.name) equipment.push(eq.name);
        });
      }

      const images: string[] = [];
      if (Array.isArray(ex.images)) {
        ex.images.forEach((img: any) => {
          if (img?.image) images.push(img.image);
        });
      }

      return {
        id: ex.id,
        uuid: ex.uuid,
        name: ex.name || 'Unnamed Exercise',
        category: ex.category?.name || 'General Strength',
        description: cleanDesc.slice(0, 240) + (cleanDesc.length > 240 ? '...' : ''),
        muscles,
        equipment,
        images
      };
    });

    return { totalCount: json.count, items };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch live data from data.gov.sg real-time 2-hr weather forecast
 */
export async function fetchSingaporeWeather(): Promise<WeatherAirData> {
  const headers: Record<string, string> = {
    'Accept': 'application/json'
  };

  const dataGovSgKey = process.env.DATA_GOV_SG_API_KEY;
  if (dataGovSgKey) {
    headers['x-api-key'] = dataGovSgKey;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(DATA_GOV_SG_TWO_HR_ENDPOINT, {
      headers,
      signal: controller.signal
    });

    if (!res.ok) {
      throw new Error(`data.gov.sg weather API responded with HTTP status ${res.status}`);
    }

    const json = await res.json();
    const items = json?.data?.items?.[0] || json?.items?.[0] || {};
    const forecastsRaw = items?.forecasts || [];

    const forecasts: AreaForecast[] = forecastsRaw.map((f: any) => ({
      area: f.area || 'Unknown Area',
      forecast: f.forecast || 'Fair'
    }));

    const hasRain = forecasts.some(f => /rain|shower|thunder/i.test(f.forecast));
    const hasHazy = forecasts.some(f => /hazy|haze/i.test(f.forecast));

    let status: 'Optimal' | 'Caution' | 'Indoor Recommended' = 'Optimal';
    let recommendation = 'Weather conditions are favorable for outdoor runs, cycling, and park workouts.';

    if (hasRain) {
      status = 'Indoor Recommended';
      recommendation = 'Showers or rain forecast in sectors. Consider indoor ActiveSG gym or indoor track.';
    } else if (hasHazy) {
      status = 'Caution';
      recommendation = 'Haze detected in sectors. Please cross-reference live PM2.5 readings before intense cardio.';
    }

    return {
      updateTimestamp: items?.update_timestamp || new Date().toISOString(),
      validPeriod: items?.valid_period || undefined,
      forecasts: forecasts.slice(0, 16),
      summaryCondition: hasRain ? 'Scattered Rain / Showers' : hasHazy ? 'Hazy' : 'Fair / Clear',
      outdoorWorkoutAdvisory: {
        status,
        recommendation
      }
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Helper to determine NEA PM2.5 Band & Outdoor Suitability
 * Band 1: 0 - 55 µg/m³ (Normal / Safe for all outdoor activities)
 * Band 2: 56 - 150 µg/m³ (Elevated / Healthy can proceed; vulnerable reduce)
 * Band 3: 151 - 250 µg/m³ (High / Unhealthy; avoid strenuous outdoor cardio)
 * Band 4: > 250 µg/m³ (Very High / Move all exercise indoors)
 */
function classifyPm25(value: number): { band: Pm25Band; isIdeal: boolean } {
  if (value <= 55) {
    return { band: 'Band 1 (Normal)', isIdeal: true };
  }
  if (value <= 150) {
    return { band: 'Band 2 (Elevated)', isIdeal: false };
  }
  if (value <= 250) {
    return { band: 'Band 3 (High)', isIdeal: false };
  }
  return { band: 'Band 4 (Very High)', isIdeal: false };
}

/**
 * Fetch live PM2.5 air quality from data.gov.sg to advise on outdoor activities & exercises
 * Endpoint: https://api-open.data.gov.sg/v2/real-time/api/pm25
 */
export async function fetchSingaporePm25(): Promise<Pm25AirQualityData> {
  const headers: Record<string, string> = {
    'Accept': 'application/json'
  };

  // Optional user API key - NOT hardcoded
  const dataGovSgKey = process.env.DATA_GOV_SG_API_KEY;
  if (dataGovSgKey) {
    headers['x-api-key'] = dataGovSgKey;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(DATA_GOV_SG_PM25_ENDPOINT, {
      headers,
      signal: controller.signal
    });

    if (!res.ok) {
      throw new Error(`data.gov.sg PM2.5 API responded with HTTP status ${res.status}`);
    }

    const json = await res.json();
    const item = json?.data?.items?.[0] || json?.items?.[0] || {};
    const readings: Record<string, number> = item?.readings?.pm25_one_hourly || {};

    const regions: ('north' | 'south' | 'east' | 'west' | 'central')[] = ['north', 'south', 'east', 'west', 'central'];
    const regionalDetails: RegionalPm25Reading[] = [];

    let sum = 0;
    let count = 0;
    let maxVal = -1;
    let maxRegionName = 'central';

    for (const reg of regions) {
      const val = typeof readings[reg] === 'number' ? readings[reg] : 0;
      const { band, isIdeal } = classifyPm25(val);
      regionalDetails.push({
        region: reg,
        value: val,
        band,
        isIdealForOutdoor: isIdeal
      });

      sum += val;
      count++;
      if (val > maxVal) {
        maxVal = val;
        maxRegionName = reg;
      }
    }

    const nationalAverage = count > 0 ? Math.round(sum / count) : 0;
    const { band: overallBand, isIdeal: isIdealForOutdoor } = classifyPm25(maxVal);

    // Formulate actionable advice
    let verdict = 'Ideal Time for Outdoor Activities & Exercises';
    let actionableAdvice = 'PM2.5 is within Band 1 (Normal 0-55 µg/m³). Favorable for outdoor running, Hyrox conditioning, and cycling.';
    let vulnerableGroupAdvice = 'Safe for all demographic groups including seniors (50-70yo), pre-diabetics, and postnatal individuals.';
    let recommendedVenue: 'Outdoor Parks & Trails' | 'Indoor Air-Conditioned ActiveSG Gym' | 'Home / Low Exertion' = 'Outdoor Parks & Trails';

    if (maxVal > 250) {
      verdict = 'Hazardous: Strictly Avoid All Outdoor Activities';
      actionableAdvice = `PM2.5 is at ${maxVal} µg/m³ (Band 4 Very High). Cancel outdoor sports and switch to indoor air-conditioned facilities.`;
      vulnerableGroupAdvice = 'Individuals with asthma, diabetes, or cardiovascular conditions must remain indoors.';
      recommendedVenue = 'Indoor Air-Conditioned ActiveSG Gym';
    } else if (maxVal > 150) {
      verdict = 'Not Ideal for Strenuous Outdoor Exercise';
      actionableAdvice = `PM2.5 reached ${maxVal} µg/m³ in ${maxRegionName} (Band 3 High). Strenuous outdoor running or HIIT is not recommended. Move your session to an indoor ActiveSG gym.`;
      vulnerableGroupAdvice = 'Seniors, pre-diabetics, and individuals with respiratory conditions should avoid all outdoor physical exertion.';
      recommendedVenue = 'Indoor Air-Conditioned ActiveSG Gym';
    } else if (maxVal > 55) {
      verdict = 'Moderate Air Quality: Caution for High-Intensity Outdoor Cardio';
      actionableAdvice = `PM2.5 is elevated in ${maxRegionName} (${maxVal} µg/m³, Band 2). Healthy adults may proceed with caution, but consider indoor cardio if training for extended durations.`;
      vulnerableGroupAdvice = 'Seniors (50-70yo) and individuals managing blood pressure or diabetes should reduce prolonged outdoor exertion.';
      recommendedVenue = 'Indoor Air-Conditioned ActiveSG Gym';
    }

    return {
      updatedTimestamp: item?.updatedTimestamp || item?.timestamp || new Date().toISOString(),
      readings,
      regionalDetails,
      maxRegion: {
        region: maxRegionName,
        value: maxVal,
        band: overallBand
      },
      nationalAverage,
      overallBand,
      isIdealForOutdoor,
      advisory: {
        verdict,
        actionableAdvice,
        vulnerableGroupAdvice,
        recommendedVenue
      }
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Serverless / Express Handler for GET /api/healthfitness_weightmgmt
 */
export async function healthFitnessWeightMgmtHandler(req: Request, res: Response): Promise<void> {
  const [wgerResult, weatherResult, pm25Result] = await Promise.allSettled([
    fetchWgerExercises(),
    fetchSingaporeWeather(),
    fetchSingaporePm25()
  ]);

  const wgerSuccess = wgerResult.status === 'fulfilled';
  const weatherSuccess = weatherResult.status === 'fulfilled';
  const pm25Success = pm25Result.status === 'fulfilled';

  const wgerData = wgerSuccess ? wgerResult.value : { totalCount: 0, items: [] };
  const weatherData = weatherSuccess ? weatherResult.value : undefined;
  const pm25Data = pm25Success ? pm25Result.value : undefined;

  // Synthesize holistic outdoor fitness verdict from PM2.5 + 2-hr Weather
  const isPm25Safe = pm25Data ? pm25Data.isIdealForOutdoor : true;
  const isWeatherRainy = weatherData?.outdoorWorkoutAdvisory.status === 'Indoor Recommended';

  let isIdealTimeForOutdoor = isPm25Safe && !isWeatherRainy;
  let headline = 'Ideal Time for Outdoor Activities & Exercise';
  let detailedAdvisory = 'Both weather conditions and PM2.5 air quality are favorable for outdoor runs, park bootcamps, and endurance training.';
  let recommendedMode: 'Outdoor Trail & Running' | 'Indoor ActiveSG Gym' | 'Light Indoor Mobility' = 'Outdoor Trail & Running';
  let hydrationAdvisory = 2500;

  if (pm25Data && !pm25Data.isIdealForOutdoor) {
    isIdealTimeForOutdoor = false;
    headline = pm25Data.advisory.verdict;
    detailedAdvisory = `${pm25Data.advisory.actionableAdvice} ${pm25Data.advisory.vulnerableGroupAdvice}`;
    recommendedMode = 'Indoor ActiveSG Gym';
    hydrationAdvisory = 3000;
  } else if (isWeatherRainy) {
    isIdealTimeForOutdoor = false;
    headline = 'Rain or Showers Detected: Indoor Workout Recommended';
    detailedAdvisory = 'Showers forecasted across regional Singapore sectors. Transfer outdoor training to an indoor gym or ActiveSG facility.';
    recommendedMode = 'Indoor ActiveSG Gym';
    hydrationAdvisory = 2200;
  }

  const payload: HealthFitnessWeightMgmtResponse = {
    success: true,
    timestamp: new Date().toISOString(),
    sources: {
      wger: {
        status: wgerSuccess ? 'success' : 'failed',
        totalCount: wgerData.totalCount,
        count: wgerData.items.length,
        data: wgerData.items,
        error: !wgerSuccess ? (wgerResult.reason as Error)?.message : undefined
      },
      weather: {
        status: weatherSuccess ? 'success' : 'failed',
        data: weatherData,
        error: !weatherSuccess ? (weatherResult.reason as Error)?.message : undefined
      },
      pm25: {
        status: pm25Success ? 'success' : 'failed',
        data: pm25Data,
        error: !pm25Success ? (pm25Result.reason as Error)?.message : undefined
      }
    },
    outdoorFitnessVerdict: {
      isIdealTimeForOutdoor,
      headline,
      detailedAdvisory,
      recommendedWorkoutMode: recommendedMode,
      hydrationAdvisoryMl: hydrationAdvisory
    },
    keysConfigured: {
      wger: Boolean(process.env.WGER_API_KEY),
      dataGovSg: Boolean(process.env.DATA_GOV_SG_API_KEY)
    }
  };

  res.status(200).json(payload);
}

/**
 * Dedicated Serverless / Express Handler for GET /api/pm25
 */
export async function pm25Handler(req: Request, res: Response): Promise<void> {
  try {
    const data = await fetchSingaporePm25();
    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      endpoint: DATA_GOV_SG_PM25_ENDPOINT,
      data
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to fetch live PM2.5 from data.gov.sg'
    });
  }
}

// Default export for serverless function runtimes
export default healthFitnessWeightMgmtHandler;
