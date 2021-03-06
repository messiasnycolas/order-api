import { parseDateStringToUnix } from '../helpers/parseDateStringToUnix';
import { getPastDaysArray } from '../helpers/getPastDaysArray';
import { buildXML } from '../helpers/buildXML';
import { deal } from '../interfaces/deal';
import { formattedDeal } from '../interfaces/formattedDeal';
import { orderSummary } from '../interfaces/orderSummary';
import { pipedriveService } from './pipedrive.service';
import { blingService } from './bling.service';
import { orderRepository } from '../repositories/order.repository';

async function getOrderSummaries(pastDays: number): Promise<orderSummary[] | undefined> {
    const pastDaysArray = getPastDaysArray(pastDays);

    const orderSummaries = await orderRepository.getOrderSummaries(pastDaysArray);

    return orderSummaries?.sort(
        (a, b) => parseDateStringToUnix(b.wonDate) - parseDateStringToUnix(a.wonDate)
    );
}

async function refreshOrderSummaries(pastDays: number): Promise<void> {
    const orderSummaries: orderSummary[] = [];
    const wonDeals = await pipedriveService.getWonDeals();

    if (wonDeals.length === 0) return;

    const pastDaysArray = getPastDaysArray(pastDays);

    for (const date of pastDaysArray) {
        let totalValue = 0;
        const dailyWonDeals: formattedDeal[] = getAndFormatDailyWonDeals(wonDeals, date);

        for (const deal of dailyWonDeals) {
            const order = blingService.parseDealToOrder(deal);
            const orderXML = buildXML(order);
            await blingService.postOrder(orderXML);

            totalValue += deal.value;
        }

        orderSummaries.push({ totalValue, wonDate: date, opportunities: dailyWonDeals });
    }

    await orderRepository.upsertOrderSummaries(orderSummaries);
}

export const orderService = {
    getOrderSummaries,
    refreshOrderSummaries,
}

function getAndFormatDailyWonDeals(wonDeals: [], date: string): formattedDeal[] {
    return wonDeals.filter(
        (deal: deal) => deal.won_time.split(' ')[0] === date
    ).map(
        (deal: deal): formattedDeal => ({
            id: deal.id,
            value: deal.value,
            clientName: deal.person_id.name,
            title: deal.title,
        })
    );
}