

import React, { useEffect, useState } from 'react';
import { CreateBtn, SaveBtn, EditBtn, DeleteBtn, CancelBtn } from './buttons';
import '../index.css';
import '../App.css';

const Products = () => {
  const [data,  setData] = useState([]);

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [deletingId, setDeletingId] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newProduct, setNewProduct] = useState(
    { nome_produto: '', descricao_produto: '', preco_produto: '', qtd_estoque: '', data_cadastro_produto: '', produto_id: '', imagem: '' });

  const token = localStorage.getItem('token');

  let emptyProductObj = {
    nome_produto: '',
    descricao_produto: '',
    preco_produto: '',
    qtd_estoque: '',
    data_cadastro_produto: '',
    produto_id: '',
    imagem: ''
};

  const apiRequest = async (method, resource, token, setDataState) => {

    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${token}`,
        },
      };
      const response = await fetch(`http://localhost:3000/api/${resource}`, options);
      const data = await response.json();
      setDataState(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch('http://localhost:3000/api/products', options);
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts().catch(console.error);
  }, []);

  const handleAddNew = () => {
    setAddingNew(true);
    setEditingId(null);
    setNewProduct(emptyProductObj); // Reset newProduct for a new entry
  };

  const handleSaveNew = async () => {
    if (!addingNew) return;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    };
    await fetch('http://localhost:3000/api/products', options);
    setAddingNew(false); // Exit adding mode
    setNewProduct(emptyProductObj); // Reset new item state
    fetchProducts(); // Refresh
  };

  const handleChangeNewProduct = (e, field) => {
    setnewProduct(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleCancelNew = () => {
    setAddingNew(false);
    setNewProduct(emptyProductObj); // Reset newProduct state
  };

  const handleChange = (e, field) => {
    setEditedProduct((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEdit = (produto_id) => {
    const product = products.find((product) => product.produto_id === produto_id);
    setEditingId(produto_id);
    setEditedProduct({ ...product });
  };

  const handleSave = async (produto_id) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(editedProduct),
    };
    await fetch(`http://localhost:3000/api/products/${produto_id}`, options);
    const updatedProducts = products.map((p) =>
      p.produto_id === produto_id ? { ...p, ...editedProduct } : p
    );
    setProducts(updatedProducts);
    setEditingId(null); // Exit editing mode
  };

  const handleDelete = (produto_id) => {
    if (deletingId === produto_id) {
      // Delete ? Confirm : Cancel
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      fetch(`http://localhost:3000/api/products/${produto_id}`, options)
        .then(() => {
          // Update local state to reflect the deletion
          setProducts(products.filter((p) => p.produto_id !== produto_id));
        })
        .catch(console.error);

      setDeletingId(null); // Reset deleting state
    } else {
      setDeletingId(produto_id); // Mark for delete
      setEditingId(null); // Reset editing state
    }
  };

  const handleResetState = (setState) => {
    return () => {
      setState(null);
    };
  };

  const handleCancelEdit = () => {
    setEditingId(null); // Cancel editing
  };

  const handleCancelDelete = () => {
    setDeletingId(null); // Cancel deleting
  };

  const cols = {
    "categories": ["ID","Nome da Categoria", "Descrição"],
    "clients": ["ID", "E-mail", "Usuário", "Senha", "Nome", "CPF", "Tel.", "Data Nasc.", "End. ID"],
    "addresses": ["ID", "Rua", "Bairro", "Cidade", "n.º", "Complemento", "UF"],
    "products": ["ID", "Produto", "Descrição", "Preço", "Qtde", "Cadastro", "Categoria", "Imagem"],
    "orders": ["ID", "Pedido", "Total (R$)", "Data", "Status", "Cliente"],
    "ordersProducts": ["ID", "Produto pedido", "Qtde", "Preço", "Produto", "Pedido"]
  };

  return (
    <div className="div-table">
      <table className="table-content">
        <thead>
          <tr>
            <th scope="col" className="buttons-cell">
              <CreateBtn onClick={handleAddNew} />
            </th>
            { cols.products.map(c => <th scope="col" className="py-3 px-6">{c}</th>) }
          </tr>
        </thead>
        <tbody>
        {addingNew && (
          <tr>
            <td>
              <SaveBtn onClick={handleSaveNew} />
              &nbsp;&nbsp;
              <CancelBtn onClick={handleCancelNew} />
            </td>
            <td>{/* ID */}</td>

            <td>
              <input
                type="text"
                value={newProduct.nome_produto}
                onChange={(e) => handleChangeNewProduct(e, 'nome_produto')}
                placeholder="Nome do produto"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newProduct.descricao_produto}
                onChange={(e) => handleChangeNewProduct(e, 'descricao_produto')}
                placeholder="Descrição do produto"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newProduct.preco_produto}
                onChange={(e) => handleChangeNewProduct(e, 'preco_produto')}
                placeholder="Preço"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newProduct.qtd_estoque}
                onChange={(e) => handleChangeNewProduct(e, 'qtd_estoque')}
                placeholder="Estoque"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newProduct.data_cadastro_produto}
                onChange={(e) => handleChangeNewProduct(e, 'data_cadastro_produto')}
                placeholder="Data de cadastro"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newProduct.categoria_id}
                onChange={(e) => handleChangeNewProduct(e, 'categoria_id')}
                placeholder="Categoria"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newProduct.imagem}
                onChange={(e) => handleChangeNewProduct(e, 'imagem')}
                placeholder="Imagem"
                className="editing-text-input"
              />
            </td>

          </tr>
        )}
          {products.map((product) => (
            <tr key={product.produto_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6 flex justify-start space-x-2">
                {editingId === product.produto_id ? (
                  <>
                    <CancelBtn onClick={() => handleCancelEdit()} />
                    &nbsp;&nbsp;
                    <SaveBtn onClick={() => handleSave(product.produto_id)} />
                  </>
                ) : deletingId === product.produto_id ? (
                  <>
                    <DeleteBtn onClick={() => handleDelete(product.produto_id)} />
                    &nbsp;&nbsp;
                    <CancelBtn onClick={handleCancelDelete} />
                  </>
                ) : (
                  <>
                    <EditBtn onClick={() => handleEdit(product.produto_id)} />
                    &nbsp;&nbsp; 
                    <DeleteBtn onClick={() => handleDelete(product.produto_id)} />
                  </>
                )}
              </td>

              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.produto_id}
              </td>

              <td className="py-4 px-6">
                {editingId === product.produto_id ? (
                  <input
                    type="text"
                    value={editedProduct.nome_produto}
                    onChange={(e) => handleChange(e, 'nome_produto')}
                    className="editing-text-input"
                  />
                ) : (
                    product.nome_produto
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === product.produto_id ? (
                  <input
                    type="text"
                    value={editedProduct.descricao_produto}
                    onChange={(e) => handleChange(e, 'descricao_produto')}
                    className="editing-text-input"
                  />
                ) : (
                    product.descricao_produto
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === product.produto_id ? (
                  <input
                    type="text"
                    value={editedProduct.preco_produto}
                    onChange={(e) => handleChange(e, 'preco_produto')}
                    className="editing-text-input"
                  />
                ) : (
                    product.preco_produto
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === product.produto_id ? (
                  <input
                    type="text"
                    value={editedProduct.qtd_estoque}
                    onChange={(e) => handleChange(e, 'qtd_estoque')}
                    className="editing-text-input"
                  />
                ) : (
                    product.qtd_estoque
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === product.produto_id ? (
                  <input
                    type="text"
                    value={editedProduct.data_cadastro_produto}
                    onChange={(e) => handleChange(e, 'data_cadastro_produto')}
                    className="editing-text-input"
                  />
                ) : (
                    product.data_cadastro_produto
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === product.produto_id ? (
                  <input
                    type="text"
                    value={editedProduct.categoria_id}
                    onChange={(e) => handleChange(e, 'categoria_id')}
                    className="editing-text-input"
                  />
                ) : (
                    product.categoria_id
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === product.produto_id ? (
                  <input
                    type="text"
                    value={editedProduct.imagem}
                    onChange={(e) => handleChange(e, 'imagem')}
                    className="editing-text-input"
                  />
                ) : (
                    product.imagem
                )}
              </td>



            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default Products;
