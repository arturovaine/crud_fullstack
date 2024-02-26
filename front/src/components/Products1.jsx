
import React, { useEffect, useState } from 'react';
import { CreateBtn, SaveBtn, EditBtn, DeleteBtn, CancelBtn } from './buttons';
import TableHeader from './TableHeader';
import '../index.css';
import '../App.css';

const Products = () => {
  const [data,  setData] = useState([]);

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({});
  const [deletingId, setDeletingId] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState({ nome_categoria: '', descricao_categoria: '' });

  const token = localStorage.getItem('token');

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
      console.log('api products', Object.keys(data[0]));
      setDataState(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
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
    setCategories(data);
  };

  useEffect(() => {
    apiRequest('GET','products',token,setProducts).catch(console.error);
  }, []);

  const handleAddNew = () => {
    setAddingNew(true);
    setEditingId(null);
    setNewCategory({ nome_categoria: '', descricao_categoria: '' });
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

  let infoKeys = Object.keys(products);
  let infoId = infoKeys[0];

  console.log('products>', products);
  console.log('products>', Object.keys(products));
  //console.log('products>', Object.keys(products[0]));

  const cols = {
    "categories": ["ID","Nome da Categoria", "Descrição"],
    "clients": ["ID", "E-mail", "Usuário", "Senha", "Nome", "CPF", "Tel.", "Data Nasc.", "End. ID"],
    "addresses": ["ID", "Rua", "Bairro", "Cidade", "n.º", "Complemento", "UF"],
    "products": ["ID", "Nome", "Descrição", "Preço", "Qtde", "Cadastro", "Categoria", "Imagem"],
    "orders": ["ID", "Pedido", "Total (R$)", "Data", "Status", "Cliente"],
    "ordersProducts": ["ID", "Produto pedido", "Qtde", "Preço", "Produto", "Pedido"]
  };

  console.log('cols.products>', cols.products);
  let columns = cols.products;

  return (
    <div className="div-table">
      <table className="table-content">
      <TableHeader handler={handleAddNew} columns={columns} />
        <tbody>

        {products.map((product) => (
            <tr key={product.product_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

              <td className="py-4 px-6 flex justify-start space-x-2">
                edit or delete
              </td>


              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.produto_id}
              </td>

                {
                    infoKeys.map(infoKey => (
                        <>
                            <td className="py-4 px-6">
                                teste{infoId}-{infoKey}
                                {
                                    product[infoId]
                                }

                            </td>
                        </>
                    ))
                }


              <td className="py-4 px-6">
                
                {editingId === product.produto_id ? (
                  <input
                    type="text"
                    value={editedCategory.nome_produto}
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
                    value={editedCategory.descricao_produto}
                    onChange={(e) => handleChange(e, 'descricao_produto')}
                    className="editing-text-input"
                  />
                ) : (
                    product.descricao_produto
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
