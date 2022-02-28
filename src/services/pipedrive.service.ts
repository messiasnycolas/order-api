import axios from 'axios';

async function getWonDeals(): Promise<[]> {
    const baseUrl = process.env.PIPEDRIVE_URL;
    const token = process.env.PIPEDRIVE_TOKEN;
    const query = 'deals?status=won';
    
    const url = `${baseUrl}/${query}&api_token=${token}`;

    const { data: { data: wonDeals }} = await axios.get(url);
    return wonDeals;
}

export const pipedriveService = {
    getWonDeals,
}