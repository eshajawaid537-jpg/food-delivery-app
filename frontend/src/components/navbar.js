import React from 'react';

function Navbar({ cartCount, onCartClick, onToggleSidebar, searchTerm, setSearchTerm, onLoginClick, user, onLogout, onMyOrdersClick }) {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '15px 30px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={onToggleSidebar} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>☰</button>
        <h2 style={{ color: '#ff3838', margin: 0, fontWeight: '800' }}>🍕 FoodExpress</h2>
      </div>

      <input
        type="text"
        placeholder="Search yummy food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px 18px', borderRadius: '25px', border: '1px solid #dfe6e9',
          width: '250px', outline: 'none'
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 'bold', color: '#2d3436' }}>👤 {user.name}</span>
            <button onClick={onMyOrdersClick} style={{
              padding: '6px 12px', borderRadius: '15px', border: 'none',
              backgroundColor: '#00b894', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px'
            }}>📦 My Orders</button>
            <button onClick={onLogout} style={{
              padding: '6px 12px', borderRadius: '15px', border: '1px solid #ff3838',
              backgroundColor: 'transparent', color: '#ff3838', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px'
            }}>Logout</button>
          </div>
        ) : (
          <button onClick={onLoginClick} style={{
            padding: '8px 18px', borderRadius: '20px', border: 'none',
            backgroundColor: '#ff3838', color: 'white', fontWeight: 'bold', cursor: 'pointer'
          }}>🔑 Login / Register</button>
        )}

        <button onClick={onCartClick} style={{
          position: 'relative', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'
        }}>
          🛒
          {cartCount > 0 && (
            <span style={{
              position: 'absolute', top: '-8px', right: '-10px', backgroundColor: '#ff3838',
              color: 'white', borderRadius: '50%', padding: '2px 7px', fontSize: '12px', fontWeight: 'bold'
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;