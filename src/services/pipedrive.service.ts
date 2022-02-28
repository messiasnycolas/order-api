import axios from 'axios';
import { log } from '../logs/loggly';

async function getWonDeals(): Promise<[]> {
    const baseUrl = process.env.PIPEDRIVE_URL;
    const token = process.env.PIPEDRIVE_TOKEN;
    const query = 'deals?status=won';
    
    const url = `${baseUrl}/${query}&api_token=${token}`;

    try {
    const { data: { data: wonDeals }} = await axios.get(url);
    return wonDeals;
    } catch (error) {
        if (error instanceof Error) log('error', `Error while fetching won deals: ${error.message || error}`);
        return [];
    }
}

export const pipedriveService = {
    getWonDeals,
}