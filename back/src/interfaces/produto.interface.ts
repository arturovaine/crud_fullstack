
export interface Produto {
  produto_id: number,
  nome_produto: string,
  descricao_produto: string,
  preco_produto: number,
  qtd_estoque: number,
  data_cadastro_produto: Date,
  categoria_id: number,
  imagem: string,
}
