import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import debug from 'debug';
import createError from 'http-errors';

dotenv.config();

const app = express();
const log = debug('express-supabase-starter:app');

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  log('Root endpoint hit');
  res.json({ message: 'Hello from Express + TypeScript + ESM!' });
});

// Example error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  log('Error handler:', err);
  res.status(err.status || 500).json({ error: err.message });
});

export default app;