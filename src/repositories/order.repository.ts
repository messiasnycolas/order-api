import { connect } from '../databases/mongoose';
import { orderSummary } from '../interfaces/orderSummary';
import { orderSummarySchema } from '../schemas/order.schema';

async function getOrderSummaries(pastDaysArray: string[]): Promise<orderSummary[] | undefined> {
    const mongoose = await connect();
    const orderSummaryModel = mongoose?.model('orderSummary', orderSummarySchema);
    const lastIndex = pastDaysArray.length - 1;

    return orderSummaryModel?.find({
        wonDate: {
            $lte: pastDaysArray[0],
            $gte: pastDaysArray[lastIndex],
        }
    }, '-_id');
}

async function upsertOrderSummaries(orderSummaries: orderSummary[]) {
    const mongoose = await connect();
    const orderSummaryModel = mongoose?.model('orderSummary', orderSummarySchema);

    return orderSummaryModel?.bulkWrite(
        orderSummaries.map(summary => ({
            updateOne: {
                filter: { wonDate: summary.wonDate },
                update: summary,
                upsert: true,
            }
        }))
    );
}

export const orderRepository = {
    getOrderSummaries,
    upsertOrderSummaries,
};
