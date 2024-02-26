

import React, { useEffect, useState } from 'react';
import { CreateBtn, SaveBtn, EditBtn, DeleteBtn, CancelBtn } from './buttons';
import '../index.css';
import '../App.css';

const Addresses = () => {
  const [data,  setData] = useState([]);

  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedAddress, setEditedAddress] = useState({});
  const [deletingId, setDeletingId] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newAddress, setNewAddress] = useState(
    { cep: '', rua: '', bairro: '', cidade: '', numero: '', complemento: '', uf: '', endereco_id: '' });

  const token = localStorage.getItem('token');

  let emptyAddressObj = { cep: '', rua: '', bairro: '', cidade: '', numero: '', complemento: '', uf: '', endereco_id: '' };

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
    const response = await fetch('http://localhost:3000/api/addresses', options);
    const data = await response.json();
    setAddresses(data);
  };

  useEffect(() => {
    fetchClients().catch(console.error);
  }, []);

  const handleAddNew = () => {
    setAddingNew(true);
    setEditingId(null);
    setNewAddress(emptyAddressObj); // Reset for a new entry
  };

  const handleSaveNew = async () => {
    if (!addingNew) return;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newAddress),
    };
    await fetch('http://localhost:3000/api/addresses', options);
    setAddingNew(false); // Exit adding mode
    setNewAddress(emptyAddressObj); // Reset new item state
    fetchClients(); // Refresh
  };

  const handleChangenewAddress = (e, field) => {
    setNewAddress(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleCancelNew = () => {
    setAddingNew(false);
    setNewAddress(emptyAddressObj); // Reset newAddress state
  };

  const handleChange = (e, field) => {
    setEditedAddress((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEdit = (endereco_id) => {
    const address = addresses.find((address) => address.endereco_id === endereco_id);
    setEditingId(endereco_id);
    setEditedAddress({ ...address });
  };

  const handleSave = async (endereco_id) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(editedAddress),
    };
    await fetch(`http://localhost:3000/api/addresses/${endereco_id}`, options);
    const updatedAddresses = addresses.map((a) =>
      a.endereco_id === endereco_id ? { ...a, ...editedAddress } : p
    );
    setAddresses(updatedAddresses);
    setEditingId(null); // Exit editing mode
  };

  const handleDelete = (endereco_id) => {
    if (deletingId === endereco_id) {
      // Delete ? Confirm : Cancel
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      fetch(`http://localhost:3000/api/addresses/${endereco_id}`, options)
        .then(() => {
          // Update local state to reflect the deletion
          setAddresses(addresses.filter((p) => p.endereco_id !== endereco_id));
        })
        .catch(console.error);

      setDeletingId(null); // Reset deleting state
    } else {
      setDeletingId(endereco_id); // Mark for delete
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
    "addresses": ["ID", "E-mail", "Usuário", "Senha", "Nome", "CPF", "Tel.", "Data Nasc.", "End. ID"],
    "addresses": ["ID", "CEP", "Rua", "Bairro", "Cidade", "n.º", "Complemento", "UF"],
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
            { cols.addresses.map(c => <th scope="col" className="py-3 px-6">{c}</th>) }
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
                value={newAddress.cep}
                onChange={(e) => handleChangenewAddress(e, 'cep')}
                placeholder="CEP"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newAddress.rua}
                onChange={(e) => handleChangenewAddress(e, 'rua')}
                placeholder="Rua"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newAddress.bairro}
                onChange={(e) => handleChangenewAddress(e, 'bairro')}
                placeholder="Bairro"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newAddress.cidade}
                onChange={(e) => handleChangenewAddress(e, 'cidade')}
                placeholder="Cidade"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newAddress.numero}
                onChange={(e) => handleChangenewAddress(e, 'numero')}
                placeholder="Número"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newAddress.complemento}
                onChange={(e) => handleChangenewAddress(e, 'compleme')}
                placeholder="Complemento"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newAddress.uf}
                onChange={(e) => handleChangenewAddress(e, 'uf')}
                placeholder="UF"
                className="editing-text-input"
              />
            </td>            

          </tr>
        )}
          {addresses.map((address) => (
            <tr key={address.endereco_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6 flex justify-start space-x-2">
                {editingId === address.endereco_id ? (
                  <>
                    <CancelBtn onClick={() => handleCancelEdit()} />
                    &nbsp;&nbsp;
                    <SaveBtn onClick={() => handleSave(address.endereco_id)} />
                  </>
                ) : deletingId === address.endereco_id ? (
                  <>
                    <DeleteBtn onClick={() => handleDelete(address.endereco_id)} />
                    &nbsp;&nbsp;
                    <CancelBtn onClick={handleCancelDelete} />
                  </>
                ) : (
                  <>
                    <EditBtn onClick={() => handleEdit(address.endereco_id)} />
                    &nbsp;&nbsp; 
                    <DeleteBtn onClick={() => handleDelete(address.endereco_id)} />
                  </>
                )}
              </td>

              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {address.endereco_id}
              </td>

              <td className="py-4 px-6">
                {editingId === address.endereco_id ? (
                  <input
                    type="text"
                    value={editedAddress.cep}
                    onChange={(e) => handleChange(e, 'cep')}
                    className="editing-text-input"
                  />
                ) : (
                    address.cep
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === address.endereco_id ? (
                  <input
                    type="text"
                    value={editedAddress.rua}
                    onChange={(e) => handleChange(e, 'rua')}
                    className="editing-text-input"
                  />
                ) : (
                    address.rua
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === address.endereco_id ? (
                  <input
                    type="text"
                    value={editedAddress.bairro}
                    onChange={(e) => handleChange(e, 'bairro')}
                    className="editing-text-input"
                  />
                ) : (
                    address.bairro
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === address.endereco_id ? (
                  <input
                    type="text"
                    value={editedAddress.cidade}
                    onChange={(e) => handleChange(e, 'cidade')}
                    className="editing-text-input"
                  />
                ) : (
                    address.cidade
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === address.endereco_id ? (
                  <input
                    type="text"
                    value={editedAddress.numero}
                    onChange={(e) => handleChange(e, 'numero')}
                    className="editing-text-input"
                  />
                ) : (
                    address.numero
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === address.endereco_id ? (
                  <input
                    type="text"
                    value={editedAddress.complemento}
                    onChange={(e) => handleChange(e, 'complemento')}
                    className="editing-text-input"
                  />
                ) : (
                    address.complemento
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === address.endereco_id ? (
                  <input
                    type="text"
                    value={editedAddress.uf}
                    onChange={(e) => handleChange(e, 'uf')}
                    className="editing-text-input"
                  />
                ) : (
                    address.uf
                )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default Addresses;
