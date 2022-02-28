import { parse, getUnixTime } from 'date-fns';

export function parseDateStringToUnix(date: string): number {
    return getUnixTime(parse(date, 'yyyy-MM-dd', new Date()));
}