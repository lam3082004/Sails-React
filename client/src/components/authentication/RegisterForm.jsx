import React, { useState } from 'react';
import './RegisterForm.css'
import axios from 'axios';

function RegisterForm({ onSuccess, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:1337/api/register', { username, password });
      setMessage(res.data.message || 'Đăng ký thành công!');
      setUsername('');
      setPassword('');
      if (onSuccess) {
        alert('Bạn đã tạo tài khoản thành công. Vui lòng đăng nhập');
        onSuccess();
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <form className="register-form-modal" onSubmit={handleSubmit}>
      <button type="button" className="close-modal-btn" onClick={onClose} aria-label="Đóng" style={{position:'absolute',top:10,right:10}}>
        &#10005;
      </button>
      <h3>Đăng ký</h3>
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
      <button type="submit">Đăng ký</button>
      {message && <div className="message">{message}</div>}
    </form>
  );
}

export default RegisterForm;



