import express, { json, urlencoded } from 'express';
import authRoute from './router/authRoute';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/api/v1/auth', authRoute);

export default app;
