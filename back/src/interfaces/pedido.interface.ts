
export interface Pedido {
  pedido_id: number,
  numero_pedido: number,
  valor_total_pedido: number,
  data_pedido: Date,
  status: boolean
  cliente_id: number
}
