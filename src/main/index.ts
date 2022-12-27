import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoute from './router/authRoute';
import testRouter from './router/testsRouter';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/test', testRouter);

export default app;
