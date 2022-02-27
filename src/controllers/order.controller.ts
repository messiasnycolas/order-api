import { NextFunction, Request, Response } from 'express';
import { orderService } from '../services/order.service';

async function getOrderSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const pastDays = parseInt(req.params.pastDays) || 5;

        const orderSummary = await orderService.getOrderSummary(pastDays);

        res.status(200).send(orderSummary);
    } catch (error) {
        // <Update status depending on error and respond>
        res.end();
    }
}

async function refreshOrderSummaries(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const pastDays = parseInt(req.body.pastDays) || 1;

        orderService.refreshOrderSummaries(pastDays);

        res.status(200).send(`Job successfully created. Refreshing order summaries for the past ${pastDays} days.`);
    } catch (error) {
        // <Update status depending on error and respond>
        res.end()
    }
}

export const orderController = {
    getOrderSummary,
    refreshOrderSummaries,
}