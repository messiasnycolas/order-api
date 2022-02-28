import 'dotenv/config';
import express from 'express';
import { getCurrentTime } from './helpers/getCurrentTime';
import { log } from './logs/loggly';
import { auth } from './middlewares/auth';
import { orderRouter } from './routes/order.routes';

const app = express();
app.use(express.json());
app.use(auth);
app.use('/', orderRouter);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
    const message = `Server up! Listening on port ${port}`;
    console.log(`[INFO] ${getCurrentTime()} ${message}`);
    log('info', message);
});