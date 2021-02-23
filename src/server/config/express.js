import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {NODE_ENV,  MORGAN_FORMAT} from './env';

import routes from '../router';

const app = express();

app.use(
    morgan(MORGAN_FORMAT, {
    skip: (req, res) => res.statusCode < 400 || NODE_ENV === 'test',
    stream: process.stderr
    })
);

app.use(
    morgan(MORGAN_FORMAT, {
    skip: (req, res) => res.statusCode >= 400 || NODE_ENV === 'test',
    stream: process.stdout
    })
);

app.use(express.json());
app.use(compression());
app.use(cors());
app.use(helmet());

//routes
app.use('/api/v1', routes);


export default app;
