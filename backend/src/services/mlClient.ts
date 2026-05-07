import axios from 'axios';
import { env } from '../config/env.js';
import { StreamPoint } from './streamSimulator.js';

export const mlClient = axios.create({
  baseURL: env.fastapiUrl,
  timeout: 5000
});

export const analyzePoint = async (point: StreamPoint) => {
  const { data } = await mlClient.post('/predict', point);
  return data;
};
