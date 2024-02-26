import React, { useState } from 'react';
import Categories from '../components/Categories';
import Products from '../components/Products';

const MainContent = () => {
  const [activeTable, setActiveTable] = useState('categories');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <br/>
      <div>Authorized Access!</div>
      <br/>
      <div>
        <button className="login-button" onClick={() => setActiveTable('categories')}>Categories</button>&nbsp;&nbsp;
        <button className="login-button" onClick={() => setActiveTable('products')}>Products</button>&nbsp;&nbsp;
        <button className="login-button" onClick={() => setActiveTable('clients')}>Clients</button>&nbsp;&nbsp;
        <button className="login-button" onClick={() => setActiveTable('addresses')}>Addresses</button>&nbsp;&nbsp;
        <button className="login-button" onClick={() => setActiveTable('orders')}>Orders</button>&nbsp;&nbsp;
        <button className="login-button" onClick={() => setActiveTable('ordersProducts')}>Orders_Products</button>
      </div>
      <br/>
      {activeTable === 'categories' && <Categories/>}
      {activeTable === 'products' && <Products/>}
    </div>
  );
};

export default MainContent;
