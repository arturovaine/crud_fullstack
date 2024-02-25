import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ username, password }),
      };

      const response = await fetch('http://localhost:3000/login', options);
      const data = await response.json();

      console.log('data>', data);
      localStorage.setItem('token', data.token);

      navigate('/content');

      if (data.token.length > 0) {
        console.log('if>', data.token.length);
        localStorage.setItem('token', data.token);
      } else {
        alert('Login falhou!');
      }
    } catch (error) {
      console.error('Erro de login:', error);
      alert('Erro de login!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: 0, alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleLogin} className="form-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
