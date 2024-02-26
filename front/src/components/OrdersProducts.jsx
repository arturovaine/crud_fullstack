

import React, { useEffect, useState } from 'react';
import { CreateBtn, SaveBtn, EditBtn, DeleteBtn, CancelBtn } from './buttons';
import '../index.css';
import '../App.css';

const OrdersProducts = () => {
  const [data,  setData] = useState([]);

  const [ordersProducts, setOrdersProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedOrderProduct, setEditedOrderProduct] = useState({});
  const [deletingId, setDeletingId] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newOrderProduct, setNewOrderProduct] = useState(
    { qtd_produto_pedido: '', preco_produto_pedido: '', produto_id: '', pedido_id: '' });

  const token = localStorage.getItem('token');

  let emptyOrdersProductsObj = {
    qtd_produto_pedido: '',
    preco_produto_pedido: '',
    produto_id: '',
    pedido_id: ''
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

  const fetchOrdersProducts = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch('http://localhost:3000/api/orders/products', options);
    const data = await response.json();
    setOrdersProducts(data);
  };

  useEffect(() => {
    fetchOrdersProducts().catch(console.error);
  }, []);

  const handleAddNew = () => {
    setAddingNew(true);
    setEditingId(null);
    setNewOrderProduct(emptyOrdersProductsObj); // Reset newOrderProduct for a new entry
  };

  const handleSaveNew = async () => {
    if (!addingNew) return;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newOrderProduct),
    };
    await fetch('http://localhost:3000/api/orders/products', options);
    setAddingNew(false); // Exit adding mode
    setNewOrderProduct(emptyOrdersProductsObj); // Reset new item state
    fetchOrdersProducts(); // Refresh
  };

  const handleChangeNewOrder = (e, field) => {
    setNewOrderProduct(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleCancelNew = () => {
    setAddingNew(false);
    setNewOrderProduct(emptyOrdersProductsObj); // Reset newOrderProduct state
  };

  const handleChange = (e, field) => {
    setEditedOrderProduct((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEdit = (produto_pedido_id) => {
    const orderProduct = ordersProducts.find((orderProduct) => orderProduct.produto_pedido_id === produto_pedido_id);
    setEditingId(produto_pedido_id);
    setEditedOrderProduct({ ...orderProduct });
  };

  const handleSave = async (produto_pedido_id) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(editedOrderProduct),
    };
    await fetch(`http://localhost:3000/api/orders/products/${produto_pedido_id}`, options);
    const updatedOrdersProducts = ordersProducts.map((o) =>
      o.produto_pedido_id === produto_pedido_id ? { ...o, ...editedOrderProduct } : o
    );
    setOrdersProducts(updatedOrdersProducts);
    setEditingId(null); // Exit editing mode
  };

  const handleDelete = (produto_pedido_id) => {
    if (deletingId === produto_pedido_id) {
      // Delete ? Confirm : Cancel
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      fetch(`http://localhost:3000/api/orders/products/${produto_pedido_id}`, options)
        .then(() => {
          // Update local state to reflect the deletion
          setOrdersProducts(ordersProducts.filter((o) => o.produto_pedido_id !== produto_pedido_id));
        })
        .catch(console.error);

      setDeletingId(null); // Reset deleting state
    } else {
      setDeletingId(pedido_id); // Mark for delete
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
    "orders": ["ID", "Produto", "Descrição", "Preço", "Qtde", "Cadastro", "Categoria", "Imagem"],
    "orders": ["ID", "Pedido", "Total (R$)", "Data", "Status", "Cliente"],
    "ordersProducts": ["Produto Pedido ID", "Qtde", "Preço", "Produto ID", "Pedido ID"]
  };

  return (
    <div className="div-table">
      <table className="table-content">
        <thead>
          <tr>
            <th scope="col" className="buttons-cell">
              <CreateBtn onClick={handleAddNew} />
            </th>
            { cols.ordersProducts.map(c => <th scope="col" className="py-3 px-6">{c}</th>) }
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
            {/*<td> ID </td>*/}
            <td>
                {/*
              <input
                type="text"
                value={newOrderProduct.produto_pedido_id}
                onChange={(e) => handleChangeNewOrder(e, 'produto_pedido_id')}
                placeholder="Número do produto pedido"
                className="editing-text-input"
              />
              */}
            </td>
            <td>
              <input
                type="text"
                value={newOrderProduct.qtd_produto_pedido}
                onChange={(e) => handleChangeNewOrder(e, 'qtd_produto_pedido')}
                placeholder="Quantidade"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newOrderProduct.preco_produto_pedido}
                onChange={(e) => handleChangeNewOrder(e, 'preco_produto_pedido')}
                placeholder="Preço do produto"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newOrderProduct.produto_id}
                onChange={(e) => handleChangeNewOrder(e, 'produto_id')}
                placeholder="ID do Produto"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newOrderProduct.pedido_id}
                onChange={(e) => handleChangeNewOrder(e, 'pedido_id')}
                placeholder="ID do Pedido"
                className="editing-text-input"
              />
            </td>

          </tr>
        )}
          {ordersProducts.map((orderProduct) => (
            <tr key={orderProduct.produto_pedido_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6 flex justify-start space-x-2">
                {editingId === orderProduct.produto_pedido_id ? (
                  <>
                    <CancelBtn onClick={() => handleCancelEdit()} />
                    &nbsp;&nbsp;
                    <SaveBtn onClick={() => handleSave(orderProduct.produto_pedido_id)} />
                  </>
                ) : deletingId === orderProduct.produto_pedido_id ? (
                  <>
                    <DeleteBtn onClick={() => handleDelete(orderProduct.produto_pedido_id)} />
                    &nbsp;&nbsp;
                    <CancelBtn onClick={handleCancelDelete} />
                  </>
                ) : (
                  <>
                    <EditBtn onClick={() => handleEdit(orderProduct.produto_pedido_id)} />
                    &nbsp;&nbsp; 
                    <DeleteBtn onClick={() => handleDelete(orderProduct.produto_pedido_id)} />
                  </>
                )}
              </td>

              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {orderProduct.produto_pedido_id}
              </td>

              <td className="py-4 px-6">
                {editingId === orderProduct.produto_pedido_id ? (
                  <input
                    type="text"
                    value={editedOrderProduct.qtd_produto_pedido}
                    onChange={(e) => handleChange(e, 'qtd_produto_pedido')}
                    className="editing-text-input"
                  />
                ) : (
                    orderProduct.qtd_produto_pedido
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === orderProduct.produto_pedido_id ? (
                  <input
                    type="text"
                    value={editedOrderProduct.preco_produto_pedido}
                    onChange={(e) => handleChange(e, 'preco_produto_pedido')}
                    className="editing-text-input"
                  />
                ) : (
                    orderProduct.preco_produto_pedido
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === orderProduct.produto_pedido_id ? (
                  <input
                    type="text"
                    value={editedOrderProduct.produto_id}
                    onChange={(e) => handleChange(e, 'produto_id')}
                    className="editing-text-input"
                  />
                ) : (
                    orderProduct.produto_id
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === orderProduct.produto_pedido_id ? (
                  <input
                    type="text"
                    value={editedOrderProduct.pedido_id}
                    onChange={(e) => handleChange(e, 'pedido_id')}
                    className="editing-text-input"
                  />
                ) : (
                    orderProduct.pedido_id
                )}
              </td>              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default OrdersProducts;
