import React, { useEffect, useState } from 'react';
import '../index.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await fetch('http://localhost:3000/api/categories', options);
      const data = await response.json();
      setCategories(data);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div className="div-table">
      <table className="table-content">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="py-3 px-6">
              Categoria ID
            </th>
            <th scope="col" className="py-3 px-6">
              Categoria ID
            </th>
            <th scope="col" className="py-3 px-6">
              Nome da Categoria
            </th>
            <th scope="col" className="py-3 px-6">
              Descrição
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categoria_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {category.categoria_id}
              </th>
              <td className="py-4 px-6">
                {category.nome_categoria}
              </td>
              <td className="py-4 px-6">
                {category.descricao_categoria}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Categories;
