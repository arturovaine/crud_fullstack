import React, { useEffect, useState } from 'react';
import { CreateBtn, SaveBtn, EditBtn, DeleteBtn, CancelBtn } from './buttons';
import '../index.css';
import '../App.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({});
  const [addingNew, setAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState({ nome_categoria: '', descricao_categoria: '' });

  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch('http://localhost:3000/api/categories', options);
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories().catch(console.error);
  }, []);

  const handleAddNew = () => {
    setAddingNew(true);
    setEditingId(null);
    setNewCategory({ nome_categoria: '', descricao_categoria: '' }); // Reset newCategory for a new entry
  };

  const handleSaveNew = async () => {
    if (!addingNew) return;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newCategory),
    };
    await fetch('http://localhost:3000/api/categories', options);
    setAddingNew(false); // Exit adding mode
    setNewCategory({ nome_categoria: '', descricao_categoria: '' }); // Reset newCategory state
    fetchCategories(); // Refresh categories
  };

  const handleChangeNewCategory = (e, field) => {
    setNewCategory(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleCancelNew = () => {
    setAddingNew(false);
    setNewCategory({ nome_categoria: '', descricao_categoria: '' }); // Reset newCategory state
  };

  const handleChange = (e, field) => {
    setEditedCategory((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEdit = (categoria_id) => {
    const category = categories.find((category) => category.categoria_id === categoria_id);
    setEditingId(categoria_id);
    setEditedCategory({ ...category });
  };

  const handleSave = async (categoria_id) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(editedCategory),
    };
    await fetch(`http://localhost:3000/api/categories/${categoria_id}`, options);
    const updatedCategories = categories.map((cat) =>
      cat.categoria_id === categoria_id ? { ...cat, ...editedCategory } : cat
    );
    setCategories(updatedCategories);
    setEditingId(null); // Exit editing mode
  };

  const handleDelete = (categoria_id) => {
    if (deletingId === categoria_id) {
      // Delete ? Confirm : Cancel
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      fetch(`http://localhost:3000/api/categories/${categoria_id}`, options)
        .then(() => {
          // Update local state to reflect the deletion
          setCategories(categories.filter((cat) => cat.categoria_id !== categoria_id));
        })
        .catch(console.error);

      setDeletingId(null); // Reset deleting state
    } else {
      setDeletingId(categoria_id); // Mark for delete
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
    "products": ["ID", "Nome", "Descrição", "Preço", "Qtde", "Cadastro", "Categoria", "Imagem"],
    "orders": ["ID", "Pedido", "Total (R$)", "Data", "Status", "Cliente"],
    "ordersProducts": ["ID", "Produto pedido", "Qtde", "Preço", "Produto", "Pedido"],
  }

  const headerCategories = ["ID","Nome da Categoria", "Descrição"]

  return (
    <div className="div-table">
      <table className="table-content">
        <thead>
          <tr>
            <th scope="col" className="buttons-cell">
              <CreateBtn onClick={handleAddNew} />
            </th>
            { cols.categories.map(c => <th scope="col" className="py-3 px-6">{c}</th>) }
            {/*
            <th scope="col" className="py-3 px-6">ID</th>
            <th scope="col" className="py-3 px-6">Nome da Categoria</th>
            <th scope="col" className="py-3 px-6">Descrição</th>
            */}
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
            <td></td>
            <td>
              <input
                type="text"
                value={newCategory.nome_categoria}
                onChange={(e) => handleChangeNewCategory(e, 'nome_categoria')}
                placeholder="Nome da Categoria"
                className="editing-text-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={newCategory.descricao_categoria}
                onChange={(e) => handleChangeNewCategory(e, 'descricao_categoria')}
                placeholder="Descrição"
                className="editing-text-input"
              />
            </td>
          </tr>
        )}
          {categories.map((category) => (
            <tr key={category.categoria_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-4 px-6 flex justify-start space-x-2">
                {editingId === category.categoria_id ? (
                  <>
                    <CancelBtn onClick={() => handleCancelEdit()} />
                    &nbsp;&nbsp;
                    <SaveBtn onClick={() => handleSave(category.categoria_id)} />
                  </>
                ) : deletingId === category.categoria_id ? (
                  <>
                    <DeleteBtn onClick={() => handleDelete(category.categoria_id)} />
                    &nbsp;&nbsp;
                    <CancelBtn onClick={handleCancelDelete} />
                  </>
                ) : (
                  <>
                    <EditBtn onClick={() => handleEdit(category.categoria_id)} />
                    &nbsp;&nbsp; 
                    <DeleteBtn onClick={() => handleDelete(category.categoria_id)} />
                  </>
                )}
              </td>
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {category.categoria_id}
              </td>
              <td className="py-4 px-6">
                {editingId === category.categoria_id ? (
                  <input
                    type="text"
                    value={editedCategory.nome_categoria}
                    onChange={(e) => handleChange(e, 'nome_categoria')}
                    className="editing-text-input"
                  />
                ) : (
                  category.nome_categoria
                )}
              </td>
              <td className="py-4 px-6">
                {editingId === category.categoria_id ? (
                  <input
                    type="text"
                    value={editedCategory.descricao_categoria}
                    onChange={(e) => handleChange(e, 'descricao_categoria')}
                    className="editing-text-input"
                  />
                ) : (
                  category.descricao_categoria
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default Categories;
