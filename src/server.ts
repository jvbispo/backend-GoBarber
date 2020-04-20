import express from 'express';
import routes from './routes/index';
import 'reflect-metadata';
import uploadConfig from './config/upload';
import './database/index';

const app = express();
app.use(express.json());

app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

app.listen('3333');
