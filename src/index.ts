import 'dotenv/config';
import express from 'express';
import { auth } from './middlewares/auth';
import { orderRouter } from './routes/order.routes';

const app = express();
app.use(express.json());
app.use(auth);
app.use('/', orderRouter);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));