import { formattedDeal } from './formattedDeal';

export interface orderSummary {
    totalValue: number,
    wonDate: string,
    opportunities: formattedDeal[],
}