import React, { useState } from 'react';

function Sidebar({ isOpen, onClose, onSelectCategory, onScrollToFooter, onOpenAbout }) {
  const [showCategories, setShowCategories] = useState(false);
  const categories = ['All', 'Deals', 'Burgers', 'Pizza', 'Pasta', 'Wraps & Rolls', 'Desserts', 'Drinks'];

  return (
    <>
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 400
          }}
        />
      )}

      <div style={{
        position: 'fixed', top: 0, left: isOpen ? '0' : '-300px',
        width: '280px', height: '100%', backgroundColor: '#111827', color: '#ffffff',
        boxShadow: '4px 0 20px rgba(0,0,0,0.3)', transition: 'left 0.3s ease-in-out',
        zIndex: 500, padding: '25px', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, color: '#ff3838', fontWeight: '800' }}>🍕 FoodExpress</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '18px', fontWeight: '600' }}>
          
          {/* Home */}
          <div 
            onClick={() => { onSelectCategory('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); onClose(); }}
            style={{ cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #1f2937' }}
          >
            🏠 Home
          </div>

          {/* Categories */}
          <div>
            <div 
              onClick={() => setShowCategories(!showCategories)}
              style={{ cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between' }}
            >
              📂 Categories {showCategories ? '▲' : '▼'}
            </div>
            
            {showCategories && (
              <div style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px' }}>
                {categories.map((cat) => (
                  <div 
                    key={cat}
                    onClick={() => { onSelectCategory(cat); onClose(); }}
                    style={{ cursor: 'pointer', color: cat === 'Deals' ? '#ff3838' : '#d1d5db', fontWeight: cat === 'Deals' ? 'bold' : 'normal' }}
                  >
                    • {cat} {cat === 'Deals' ? '🔥' : ''}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Menu */}
          <div 
            onClick={() => {
              const el = document.getElementById('food-menu-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              onClose();
            }}
            style={{ cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #1f2937' }}
          >
            📋 Menu
          </div>

          {/* About Us */}
          <div 
            onClick={() => { onOpenAbout(); onClose(); }}
            style={{ cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #1f2937' }}
          >
            ℹ️ About Us
          </div>

          {/* Contact */}
          <div 
            onClick={() => { onScrollToFooter(); onClose(); }}
            style={{ cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #1f2937' }}
          >
            📞 Contact
          </div>

        </div>

        <div style={{ marginTop: 'auto', fontSize: '13px', color: '#9ca3af', textAlign: 'center' }}>
          ⚡ 30 Mins Fast Delivery
        </div>
      </div>
    </>
  );
}

export default Sidebar;