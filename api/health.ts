import type { Request, Response } from 'express';

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'error';
  service: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  endpoints: {
    wger: string;
    dataGovSg: string;
  };
}

/**
 * Health check handler for serverless / Express runtime
 * Accessible at GET /api/health
 */
export async function healthHandler(req: Request, res: Response): Promise<void> {
  const payload: HealthCheckResponse = {
    status: 'ok',
    service: 'NadiFit ASEAN Serverless Backend',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      wger: 'https://wger.de/api/v2/exerciseinfo/?language=2&limit=20',
      dataGovSg: 'https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast'
    }
  };

  res.status(200).json(payload);
}

// Default export for serverless platforms (e.g. Vercel, Google Cloud Run functions)
export default healthHandler;
