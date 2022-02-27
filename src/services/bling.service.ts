import axios from 'axios';
import { formattedDeal } from '../interfaces/formattedDeal';
import { order } from '../interfaces/order';
import utf8 from 'utf8';

function parseDealToOrder(deal: formattedDeal): order {
    return {
        pedido: {
            cliente: {
                nome: deal.clientName
            },
            itens: {
                item: {
                    codigo: deal.id,
                    descricao: deal.title,
                    vlr_unit: deal.value,
                    qtde: 1,
                }
            }
        }
    };
}

async function postOrder(orderXML: XMLDocument) {
    const baseUrl = process.env.BLING_URL;
    const token = process.env.BLING_TOKEN;
    const url = `${baseUrl}/pedido/json?apikey=${token}&xml=${orderXML}`;

    await axios.post(utf8.encode(encodeURI(url)));
}

export const blingService = {
    parseDealToOrder,
    postOrder,
}