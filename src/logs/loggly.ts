import winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';
import { getCurrentTime } from '../helpers/getCurrentTime';

const logglyToken = process.env.LOGGLY_TOKEN;
const logglySubDomain = process.env.LOGGLY_SUBDOMAIN;
let logEnabled: boolean;

if (logglyToken && logglySubDomain) {
    try {
        winston.add(new Loggly({
            token: logglyToken,
            subdomain: logglySubDomain,
            tags: ['Order-API'],
            json: true
        }));

        logEnabled = true;
        console.log(`[INFO] ${getCurrentTime()} Logging service enabled`);
    } catch {
        logEnabled = false;
        console.log(`[INFO] ${getCurrentTime()} Logging service disabled`);
    }
} else {
    logEnabled = false;
    console.log(`[INFO] ${getCurrentTime()} Logging service disabled`);
}

function log(level: 'info' | 'error', message: string): void {
    if (logEnabled) winston.log(level, message);
}

export { log };