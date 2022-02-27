export interface order {
    pedido: {
        cliente: {
            nome: string,
        },
        itens: {
            item: {
                codigo: number,
                descricao: string,
                vlr_unit: number,
                qtde: number,
            }
        }
    }
}