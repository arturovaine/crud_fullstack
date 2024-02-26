

import React, { useEffect, useState } from 'react';
import { CreateBtn, SaveBtn, EditBtn, DeleteBtn, CancelBtn } from './buttons';
import '../index.css';
import '../App.css';

const Orders = () => {
  const [data,  setData] = useState([]);

  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});
  const [deletingId, setDeletingId] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newOrder, setNewOrder] = useState(
    { numero_pedido: '', valor_total_pedido: '', data_pedido: '', status: '', cliente_id: '' });

  const token = localStorage.getItem('token');

  let emptyOrderObj = {
    numero_pedido: '',
    valor_total_pedido: '',
    data_pedido: '',
    status: '',
    cliente_id: ''
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

  const fetchOrders = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch('http://localhost:3000/api/orders', options);
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders().catch(console.error);
  }, []);

  const handleAddNew = () => {
    setAddingNew(true);
    setEditingId(null);
    setNewOrder(emptyOrderObj); // Reset newOrder for a new entry
  };

  const handleSaveNew = async () => {
    if (!addingNew) return;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newOrder),
    };
    await fetch('http://localhost:3000/api/orders', options);
    setAddingNew(false); // Exit adding mode
    setNewOrder(emptyOrderObj); // Reset new item state
    fetchOrders(); // Refresh
  };

  const handleChangeNewOrder = (e, field) => {
    setNewOrder(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleCancelNew = () => {
    setAddingNew(false);
    setNewOrder(emptyOrderObj); // Reset newOrder state
  };

  const handleChange = (e, field) => {
    setEditedOrder((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEdit = (pedido_id) => {
    const product = orders.find((product) => product.pedido_id === pedido_id);
    setEditingId(pedido_id);
    setEditedOrder({ ...product });
  };

  const handleSave = async (pedido_id) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(editedOrder),
    };
    await fetch(`http://localhost:3000/api/orders/${pedido_id}`, options);
    const updatedOrders = orders.map((p) =>
      p.pedido_id === pedido_id ? { ...p, ...editedOrder } : p
    );
    setOrders(updatedOrders);
    setEditingId(null); // Exit editing mode
  };

  const handleDelete = (pedido_id) => {
    if (deletingId === pedido_id) {
      // Delete ? Confirm : Cancel
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      fetch(`http://localhost:3000/api/orders/${pedido_id}`, options)
        .then(() => {
          // Update local state to reflect the deletion
          setOrders(orders.filter((p) => p.pedido_id !== pedido_id));
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
            { cols.orders.map(c => <th scope="col" className="py-3 px-6">{c}</th>) }
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
                value={newOrder.numero_pedido}
                onChange={(e) => handleChangeNewOrder(e, 'numero_pedido')}
                placeholder="Número do pedido"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newOrder.valor_total_pedido}
                onChange={(e) => handleChangeNewOrder(e, 'valor_total_pedido')}
                placeholder="Valor total do pedido"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newOrder.data_pedido}
                onChange={(e) => handleChangeNewOrder(e, 'data_pedido')}
                placeholder="Data do pedido"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newOrder.status}
                onChange={(e) => handleChangeNewOrder(e, 'status')}
                placeholder="Status"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newOrder.cliente_id}
                onChange={(e) => handleChangeNewOrder(e, 'cliente_id')}
                placeholder="ID do cliente"
                className="editing-text-input"
              />
            </td>

          </tr>
        )}
          {orders.map((order) => (
            <tr key={order.pedido_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6 flex justify-start space-x-2">
                {editingId === order.pedido_id ? (
                  <>
                    <CancelBtn onClick={() => handleCancelEdit()} />
                    &nbsp;&nbsp;
                    <SaveBtn onClick={() => handleSave(order.pedido_id)} />
                  </>
                ) : deletingId === order.pedido_id ? (
                  <>
                    <DeleteBtn onClick={() => handleDelete(order.pedido_id)} />
                    &nbsp;&nbsp;
                    <CancelBtn onClick={handleCancelDelete} />
                  </>
                ) : (
                  <>
                    <EditBtn onClick={() => handleEdit(order.pedido_id)} />
                    &nbsp;&nbsp; 
                    <DeleteBtn onClick={() => handleDelete(order.pedido_id)} />
                  </>
                )}
              </td>

              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order.pedido_id}
              </td>

              <td className="py-4 px-6">
                {editingId === order.pedido_id ? (
                  <input
                    type="text"
                    value={editedOrder.numero_pedido}
                    onChange={(e) => handleChange(e, 'numero_pedido')}
                    className="editing-text-input"
                  />
                ) : (
                    order.numero_pedido
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === order.pedido_id ? (
                  <input
                    type="text"
                    value={editedOrder.valor_total_pedido}
                    onChange={(e) => handleChange(e, 'valor_total_pedido')}
                    className="editing-text-input"
                  />
                ) : (
                    order.valor_total_pedido
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === order.pedido_id ? (
                  <input
                    type="text"
                    value={editedOrder.data_pedido}
                    onChange={(e) => handleChange(e, 'data_pedido')}
                    className="editing-text-input"
                  />
                ) : (
                    order.data_pedido
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === order.pedido_id ? (
                  <input
                    type="text"
                    value={editedOrder.status}
                    onChange={(e) => handleChange(e, 'status')}
                    className="editing-text-input"
                  />
                ) : (
                    order.status
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === order.pedido_id ? (
                  <input
                    type="text"
                    value={editedOrder.cliente_id}
                    onChange={(e) => handleChange(e, 'cliente_id')}
                    className="editing-text-input"
                  />
                ) : (
                    order.cliente_id
                )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default Orders;
