import { connect } from '../databases/mongoose';
import { orderSummary } from '../interfaces/orderSummary';
import { orderSummarySchema } from '../schemas/order.schema';

async function getOrderSummaries(pastDaysArray: string[]) {
    const mongoose = await connect();
    
    const orderSummaryModel = mongoose?.model('orderSummary', orderSummarySchema);
    
    const lastIndex = pastDaysArray.length -1;
    return orderSummaryModel?.find({ wonDate: { $lte: pastDaysArray[0], $gte: pastDaysArray[lastIndex] }}); 
}

async function createOrUpdateOrderSummary(orderSummary: orderSummary) {
    const mongoose = await connect();
    
    const orderSummaryModel = mongoose?.model('orderSummary', orderSummarySchema);
    
    return orderSummaryModel?.findOneAndUpdate(
        { wonDate: orderSummary.wonDate },
        orderSummary,
        { upsert: true }
    );
}
 
export const orderRepository = {
    getOrderSummaries,
    createOrUpdateOrderSummary,
};
