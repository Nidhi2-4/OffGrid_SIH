import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'NCPOR Polar Science Outreach Portal API',
    timestamp: new Date().toISOString()
  });
});

// Root API info
app.get('/api', (req: Request, res: Response) => {
  res.json({
    name: 'Integrated Polar Science Outreach API',
    version: '1.0.0',
    team: 'OffGrid',
    problemStatement: 'SIH26063',
    organization: 'MoES - NCPOR',
    endpoints: {
      researchers: '/api/researchers',
      expeditions: '/api/expeditions',
      datasets: '/api/datasets',
      publications: '/api/publications',
      media: '/api/media',
      assistant: '/api/assistant',
      outreach: '/api/outreach',
      auth: '/api/auth'
    }
  });
});

app.listen(PORT, () => {
  console.log(`[PolarPortal-API] Server running on http://localhost:${PORT}`);
});

export default app;
