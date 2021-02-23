import app from './config/express';
import { NODE_ENV, SERVER_HOST, SERVER_PORT } from './config/env';

const server = app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server running on http://${SERVER_HOST}:${SERVER_PORT}/api/v1/ [${NODE_ENV}]`);
});

export default server;