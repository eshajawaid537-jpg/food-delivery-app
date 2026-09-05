import React, { useState } from 'react';

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill all required fields');
      return;
    }

    const userData = {
      name: isLogin ? (formData.email.split('@')[0]) : formData.name,
      email: formData.email
    };

    onLoginSuccess(userData);
    onClose();
    alert(isLogin ? 'Login Successful!' : 'Account Created & Logged In Successfully!');
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 400, backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'white', padding: '30px', borderRadius: '20px',
        width: '90%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: '#2d3436' }}>{isLogin ? 'Welcome Back 👋' : 'Create Account 🚀'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ccc' }}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ccc' }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ccc' }}
            required
          />

          <button type="submit" style={{
            padding: '12px', backgroundColor: '#ff3838', color: 'white',
            border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer'
          }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#636e72' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#ff3838', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;