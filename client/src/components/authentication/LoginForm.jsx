import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';

function LoginForm({ onLogin, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:1337/api/login', { username, password });
      setMessage(res.data.message || 'Đăng nhập thành công!');
      setUsername('');
      setPassword('');
      // Lưu token vào localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('roles', JSON.stringify(res.data.user.roles || []));
      if (onLogin) onLogin(res.data.user);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <form className="login-form-modal" onSubmit={handleSubmit}>
      <button type="button" className="close-modal-btn" onClick={onClose} aria-label="Đóng" style={{position:'absolute',top:10,right:10}}>
        &#10005;
      </button>
      <h3>Đăng nhập</h3>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Đăng nhập</button>
      {message && <div className="message">{message}</div>}
    </form>
  );
}

export default LoginForm;