import { Router } from 'express';
import { orderController } from '../controllers/order.controller';

const orderRouter = Router();

orderRouter.get('/order-summary/:pastDays?', orderController.getOrderSummaries);
orderRouter.post('/order-summary/job', orderController.refreshOrderSummaries);

export { orderRouter };