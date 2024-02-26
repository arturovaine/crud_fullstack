

import React, { useEffect, useState } from 'react';
import { CreateBtn, SaveBtn, EditBtn, DeleteBtn, CancelBtn } from './buttons';
import '../index.css';
import '../App.css';

const Clients = () => {
  const [data,  setData] = useState([]);

  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedClient, seteditedClient] = useState({});
  const [deletingId, setDeletingId] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newClient, setnewClient] = useState(
    { email: '', username: '', senha: '', nome: '', cpf: '', telefone: '', data_nascimento: '', endereco_id: '' });

  const token = localStorage.getItem('token');

  let emptyClientObj = { email: '', username: '', senha: '', nome: '', cpf: '', telefone: '', data_nascimento: '', endereco_id: '' };

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

  const fetchClients = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch('http://localhost:3000/api/clients', options);
    const data = await response.json();
    setClients(data);
  };

  useEffect(() => {
    fetchClients().catch(console.error);
  }, []);

  const handleAddNew = () => {
    setAddingNew(true);
    setEditingId(null);
    setnewClient(emptyClientObj); // Reset for a new entry
  };

  const handleSaveNew = async () => {
    if (!addingNew) return;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newClient),
    };
    await fetch('http://localhost:3000/api/clients', options);
    setAddingNew(false); // Exit adding mode
    setnewClient(emptyClientObj); // Reset new item state
    fetchClients(); // Refresh
  };

  const handleChangenewClient = (e, field) => {
    setnewClient(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleCancelNew = () => {
    setAddingNew(false);
    setnewClient(emptyClientObj); // Reset newClient state
  };

  const handleChange = (e, field) => {
    seteditedClient((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEdit = (cliente_id) => {
    const client = clients.find((client) => client.cliente_id === cliente_id);
    setEditingId(cliente_id);
    seteditedClient({ ...client });
  };

  const handleSave = async (cliente_id) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(editedClient),
    };
    await fetch(`http://localhost:3000/api/clients/${cliente_id}`, options);
    const updatedClients = clients.map((c) =>
      c.cliente_id === cliente_id ? { ...c, ...editedClient } : p
    );
    setClients(updatedClients);
    setEditingId(null); // Exit editing mode
  };

  const handleDelete = (cliente_id) => {
    if (deletingId === cliente_id) {
      // Delete ? Confirm : Cancel
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      fetch(`http://localhost:3000/api/clients/${cliente_id}`, options)
        .then(() => {
          // Update local state to reflect the deletion
          setClients(clients.filter((p) => p.cliente_id !== cliente_id));
        })
        .catch(console.error);

      setDeletingId(null); // Reset deleting state
    } else {
      setDeletingId(cliente_id); // Mark for delete
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
            { cols.clients.map(c => <th scope="col" className="py-3 px-6">{c}</th>) }
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
                value={newClient.email}
                onChange={(e) => handleChangenewClient(e, 'email')}
                placeholder="E-mail"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newClient.username}
                onChange={(e) => handleChangenewClient(e, 'username')}
                placeholder="Username"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newClient.senha}
                onChange={(e) => handleChangenewClient(e, 'senha')}
                placeholder="Senha"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newClient.nome}
                onChange={(e) => handleChangenewClient(e, 'nome')}
                placeholder="Nome"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newClient.cpf}
                onChange={(e) => handleChangenewClient(e, 'cpf')}
                placeholder="CPF"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newClient.telefone}
                onChange={(e) => handleChangenewClient(e, 'telefone')}
                placeholder="Telefone"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newClient.data_nascimento}
                onChange={(e) => handleChangenewClient(e, 'data_nascimento')}
                placeholder="Data de nascimento"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newClient.endereco_id}
                onChange={(e) => handleChangenewClient(e, 'endereco_id')}
                placeholder="Endereço ID"
                className="editing-text-input"
              />
            </td>
            

          </tr>
        )}
          {clients.map((client) => (
            <tr key={client.cliente_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6 flex justify-start space-x-2">
                {editingId === client.cliente_id ? (
                  <>
                    <CancelBtn onClick={() => handleCancelEdit()} />
                    &nbsp;&nbsp;
                    <SaveBtn onClick={() => handleSave(client.cliente_id)} />
                  </>
                ) : deletingId === client.cliente_id ? (
                  <>
                    <DeleteBtn onClick={() => handleDelete(client.cliente_id)} />
                    &nbsp;&nbsp;
                    <CancelBtn onClick={handleCancelDelete} />
                  </>
                ) : (
                  <>
                    <EditBtn onClick={() => handleEdit(client.cliente_id)} />
                    &nbsp;&nbsp; 
                    <DeleteBtn onClick={() => handleDelete(client.cliente_id)} />
                  </>
                )}
              </td>

              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {client.cliente_id}
              </td>

              <td className="py-4 px-6">
                {editingId === client.cliente_id ? (
                  <input
                    type="text"
                    value={editedClient.email}
                    onChange={(e) => handleChange(e, 'email')}
                    className="editing-text-input"
                  />
                ) : (
                    client.email
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === client.cliente_id ? (
                  <input
                    type="text"
                    value={editedClient.username}
                    onChange={(e) => handleChange(e, 'username')}
                    className="editing-text-input"
                  />
                ) : (
                    client.username
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === client.cliente_id ? (
                  <input
                    type="text"
                    value={editedClient.senha}
                    onChange={(e) => handleChange(e, 'senha')}
                    className="editing-text-input"
                  />
                ) : (
                    client.senha
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === client.cliente_id ? (
                  <input
                    type="text"
                    value={editedClient.nome}
                    onChange={(e) => handleChange(e, 'nome')}
                    className="editing-text-input"
                  />
                ) : (
                    client.nome
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === client.cliente_id ? (
                  <input
                    type="text"
                    value={editedClient.cpf}
                    onChange={(e) => handleChange(e, 'cpf')}
                    className="editing-text-input"
                  />
                ) : (
                    client.cpf
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === client.cliente_id ? (
                  <input
                    type="text"
                    value={editedClient.telefone}
                    onChange={(e) => handleChange(e, 'telefone')}
                    className="editing-text-input"
                  />
                ) : (
                    client.telefone
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === client.cliente_id ? (
                  <input
                    type="text"
                    value={editedClient.data_nascimento}
                    onChange={(e) => handleChange(e, 'data_nascimento')}
                    className="editing-text-input"
                  />
                ) : (
                    client.data_nascimento
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === client.cliente_id ? (
                  <input
                    type="text"
                    value={editedClient.endereco_id}
                    onChange={(e) => handleChange(e, 'endereco_id')}
                    className="editing-text-input"
                  />
                ) : (
                    client.endereco_id
                )}
              </td>



            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default Clients;
