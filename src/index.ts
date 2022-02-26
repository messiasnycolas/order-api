import 'dotenv/config';
import express from 'express';
import { auth } from './middlewares/auth';

const app = express();
app.use(express.json());
app.use(auth);

app.get('/', (req, res, next) => res.send('Success!'));

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log(`Server listening at port ${port}`));