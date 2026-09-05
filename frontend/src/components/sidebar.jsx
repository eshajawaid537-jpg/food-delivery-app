import React from 'react';

function Sidebar({ isOpen, onClose, onSelectCategory }) {
  const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'Wraps & Rolls', 'Desserts', 'Drinks'];

  return (
    <>
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 400
          }}
        />
      )}

      <div style={{
        position: 'fixed', top: 0, left: isOpen ? '0' : '-280px',
        width: '280px', height: '100%', backgroundColor: '#ffffff',
        boxShadow: '4px 0 15px rgba(0,0,0,0.1)', transition: 'left 0.3s ease',
        zIndex: 500, padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: '#ff3838' }}>🍔 Menu Categories</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {categories.map((cat) => (
            <li 
              key={cat} 
              onClick={() => onSelectCategory(cat)}
              style={{
                padding: '12px 15px', cursor: 'pointer', borderRadius: '10px',
                marginBottom: '8px', fontWeight: '600', color: '#2d3436',
                backgroundColor: '#f8f9fa'
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;