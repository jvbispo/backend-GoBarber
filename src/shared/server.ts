import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';

import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import '@shared/container';
import routes from './infra/http/routes/index';

import './infra/typeorm/database/index';

const app = express();
app.use(express.json());
app.use(errors());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

app.listen('3333', () => {
  console.log('listening to port: #3333');
});
