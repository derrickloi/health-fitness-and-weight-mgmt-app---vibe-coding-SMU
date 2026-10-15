import type { Request, Response } from 'express';

// Target endpoints specified by user
const WGER_ENDPOINT = 'https://wger.de/api/v2/exerciseinfo/?language=2&limit=20';
const DATA_GOV_SG_ENDPOINT = 'https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast';

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
    weatherAndAir: {
      status: 'success' | 'failed';
      data?: WeatherAirData;
      error?: string;
    };
  };
  weightManagementInsights: {
    recommendedActivityType: 'Outdoor Trail & Running' | 'Indoor ActiveSG Gym' | 'Hybrid Mobility';
    climateNote: string;
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
async function fetchWgerExercises(): Promise<{ totalCount?: number; items: ExerciseItem[] }> {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'User-Agent': 'NadiFit-ASEAN-App/1.0'
  };

  // Optional user API key - NOT hardcoded
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
      // Clean HTML tags from exercise descriptions
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
 * Fetch live data from data.gov.sg real-time weather & air conditions
 */
async function fetchSingaporeWeatherAndAir(): Promise<WeatherAirData> {
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
    const res = await fetch(DATA_GOV_SG_ENDPOINT, {
      headers,
      signal: controller.signal
    });

    if (!res.ok) {
      throw new Error(`data.gov.sg responded with HTTP status ${res.status}`);
    }

    const json = await res.json();
    const items = json?.data?.items?.[0] || json?.items?.[0] || {};
    const forecastsRaw = items?.forecasts || [];

    const forecasts: AreaForecast[] = forecastsRaw.map((f: any) => ({
      area: f.area || 'Unknown Area',
      forecast: f.forecast || 'Fair'
    }));

    // Detect general condition across key exercise hubs (Kallang, Marina, Bishan)
    const hasRain = forecasts.some(f =>
      /rain|shower|thunder/i.test(f.forecast)
    );
    const hasHazy = forecasts.some(f =>
      /hazy|haze/i.test(f.forecast)
    );

    let status: 'Optimal' | 'Caution' | 'Indoor Recommended' = 'Optimal';
    let recommendation = 'Weather conditions are favorable for outdoor runs, cycling, and park workouts.';

    if (hasRain) {
      status = 'Indoor Recommended';
      recommendation = 'Showers detected in certain sectors. Consider indoor ActiveSG gym training or treadmill runs.';
    } else if (hasHazy) {
      status = 'Caution';
      recommendation = 'Haze or reduced air clarity detected. Moderate outdoor cardiovascular intensity.';
    }

    return {
      updateTimestamp: items?.update_timestamp || new Date().toISOString(),
      validPeriod: items?.valid_period || undefined,
      forecasts: forecasts.slice(0, 16), // key regional spots
      summaryCondition: hasRain ? 'Scattered Rain / Showers' : hasHazy ? 'Hazy' : 'Fair / Cloudy',
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
 * Serverless / Express Handler for GET /api/healthfitness_weightmgmt
 */
export async function healthFitnessWeightMgmtHandler(req: Request, res: Response): Promise<void> {
  const [wgerResult, weatherResult] = await Promise.allSettled([
    fetchWgerExercises(),
    fetchSingaporeWeatherAndAir()
  ]);

  const wgerSuccess = wgerResult.status === 'fulfilled';
  const weatherSuccess = weatherResult.status === 'fulfilled';

  const wgerData = wgerSuccess ? wgerResult.value : { totalCount: 0, items: [] };
  const weatherData = weatherSuccess ? weatherResult.value : undefined;

  // Determine integrated weight management recommendation
  let recommendedActivity: 'Outdoor Trail & Running' | 'Indoor ActiveSG Gym' | 'Hybrid Mobility' = 'Outdoor Trail & Running';
  let climateNote = 'Pleasant tropical conditions for calorie-burning endurance routines.';
  let hydrationAdvisory = 2500;

  if (weatherData?.outdoorWorkoutAdvisory.status === 'Indoor Recommended') {
    recommendedActivity = 'Indoor ActiveSG Gym';
    climateNote = 'Rain forecast in regional sectors. Ideal time for indoor resistance training and InBody scans.';
    hydrationAdvisory = 2200;
  } else if (weatherData?.outdoorWorkoutAdvisory.status === 'Caution') {
    recommendedActivity = 'Hybrid Mobility';
    climateNote = 'Warm/hazy conditions. Increase electrolyte and water intake during high-intensity training.';
    hydrationAdvisory = 3000;
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
      weatherAndAir: {
        status: weatherSuccess ? 'success' : 'failed',
        data: weatherData,
        error: !weatherSuccess ? (weatherResult.reason as Error)?.message : undefined
      }
    },
    weightManagementInsights: {
      recommendedActivityType: recommendedActivity,
      climateNote,
      hydrationAdvisoryMl: hydrationAdvisory
    },
    keysConfigured: {
      wger: Boolean(process.env.WGER_API_KEY),
      dataGovSg: Boolean(process.env.DATA_GOV_SG_API_KEY)
    }
  };

  res.status(200).json(payload);
}

// Default export for serverless function runtimes
export default healthFitnessWeightMgmtHandler;
