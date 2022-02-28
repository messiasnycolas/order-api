import { Schema } from 'mongoose';

const collection = process.env.COLLECTION_NAME;
const orderSummarySchema = new Schema({
    totalValue: Number,
    wonDate: String,
}, { collection, versionKey: false });

export { orderSummarySchema };