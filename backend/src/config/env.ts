import dotenv from 'dotenv';

dotenv.config();

const required = (value: string | undefined, fallback: string) => value ?? fallback;

export const env = {
  port: Number(required(process.env.BACKEND_PORT, '5000')),
  mongoUri: required(process.env.MONGODB_URI, 'mongodb://localhost:27017/realtime_stream_dash'),
  jwtSecret: required(process.env.JWT_SECRET, 'change_this_secret'),
  jwtExpiresIn: required(process.env.JWT_EXPIRES_IN, '7d'),
  clientUrl: required(process.env.CLIENT_URL, 'http://localhost:5173'),
  fastapiUrl: required(process.env.FASTAPI_URL, 'http://localhost:8000'),
  streamIntervalMs: Number(required(process.env.STREAM_INTERVAL_MS, '1500')),
  demoUserEmail: required(process.env.DEMO_USER_EMAIL, 'admin@dashboard.dev'),
  demoUserPassword: required(process.env.DEMO_USER_PASSWORD, 'Admin@12345')
};
