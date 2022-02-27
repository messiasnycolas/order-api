import { deal } from '../interfaces/deal';
import { getPastDaysArray } from '../helpers/getPastDaysArray';
import { pipedriveService } from './pipedrive.service';
import { formattedDeal } from '../interfaces/formattedDeal';
import { blingService } from './bling.service';
import { buildXML } from '../helpers/buildXML';

async function getOrderSummary(pastDays: number) {
    return;
}

async function refreshOrderSummaries(pastDays: number): Promise<void> {
    const wonDeals = await pipedriveService.getWonDeals();

    const pastDaysArray = getPastDaysArray(pastDays);
    for (const day of pastDaysArray) {
        const dailyWonDeals = wonDeals
            .filter((deal: deal) => deal.won_time.split(' ')[0] === day)
            .map((deal: deal): formattedDeal => {
                return {
                    id: deal.id,
                    value: deal.value,
                    clientName: deal.person_id.name,
                    title: deal.title,
                };
            });

        for (const deal of dailyWonDeals) {
            const order = blingService.parseDealToOrder(deal);
            const orderXML = buildXML(order);
            await blingService.postOrder(orderXML);

            // Save each deal using 'day'
        }
    }

}

export const orderService = {
    getOrderSummary,
    refreshOrderSummaries
}
