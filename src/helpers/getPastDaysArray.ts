import { subDays, format } from 'date-fns';

export function getPastDaysArray(pastDays: number): string[] {
    const pastDaysArray = [];
    
    const today = new Date();
    for (let day = 0; day <= pastDays; day++) {
        const date = format(subDays(today, day), 'yyyy-MM-dd');
        pastDaysArray.push(date);
    }

    return pastDaysArray;
}