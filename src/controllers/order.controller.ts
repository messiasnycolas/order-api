import { Request, Response } from 'express';
import { log } from '../logs/loggly';
import { orderService } from '../services/order.service';

async function getOrderSummaries(req: Request, res: Response): Promise<void> {
    try {
        const pastDays = parseInt(req.params.pastDays) || 0;

        if (pastDays < 0) {
            throw new Error('Invalid params');
        }

        const orderSummaries = await orderService.getOrderSummaries(pastDays);

        res.status(200).send(orderSummaries);
    } catch (error) {
        if (error instanceof Error) {
            error.message.includes('params') ? res.status(400) : res.status(500);
            log('error', error.message);
            res.send(error.message);
        } else {
            res.status(500).end();
        }
    }
}

async function refreshOrderSummaries(req: Request, res: Response): Promise<void> {
    try {
        const pastDays = parseInt(req.body.pastDays) || 0;

        if (pastDays < 0) {
            throw new Error('Invalid params');
        }

        orderService.refreshOrderSummaries(pastDays);

        res.status(200).send(`Job successfully created. Refreshing order summaries for the past ${pastDays || ''} day(s).`);
    } catch (error) {
        if (error instanceof Error) {
            error.message.includes('params') ? res.status(400) : res.status(500);
            log('error', error.message);
            res.send(error.message);
        } else {
            res.status(500).end();
        }
    }
}

export const orderController = {
    getOrderSummaries,
    refreshOrderSummaries,
}