import React, { useState } from 'react';

const FoodCard = ({ item, onAddToCart }) => {
  // Working fallback image
  const defaultImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80";
  
  // Default variant selection
  const [selectedVariant, setSelectedVariant] = useState(item.variants ? item.variants[0] : null);

  const currentPrice = selectedVariant ? selectedVariant.price : item.price;

  return (
    <div className="food-card">
      <div className="img-container">
        <img 
          src={item.image || defaultImage} 
          alt={item.name} 
          onError={(e) => { e.target.src = defaultImage; }}
        />
        <span className="category-badge">{item.category}</span>
      </div>
      
      <div className="card-content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        
        {/* Variant/Size Selector Dropdown */}
        {item.variants && (
          <div style={{ margin: '10px 0' }}>
            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', display: 'block', marginBottom: '4px', textAlign: 'left' }}>
              CHOOSE SIZE / VARIANT:
            </label>
            <select 
              value={selectedVariant?.name}
              onChange={(e) => {
                const found = item.variants.find(v => v.name === e.target.value);
                setSelectedVariant(found);
              }}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                width: '100%',
                fontSize: '13px',
                fontWeight: '600',
                backgroundColor: '#f8f9fa',
                color: '#333',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {item.variants.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} - Rs. {v.price}
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <h4 style={{ margin: 0, color: '#ff3838', fontSize: '20px', fontWeight: '800' }}>
            Rs. {currentPrice}
          </h4>
          <button 
            onClick={() => onAddToCart({ ...item, price: currentPrice, selectedVariant: selectedVariant?.name })}
            className="add-btn"
          >
            + Add To Cart
          </button>
        </div>
      </div>

      <style>{`
        .food-card {
          border: none;
          border-radius: 20px;
          margin: 15px;
          width: 270px;
          background-color: #ffffff;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          justify: space-between;
        }

        .food-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 35px rgba(255, 56, 56, 0.15);
        }

        .img-container {
          width: 100%;
          height: 170px;
          overflow: hidden;
          position: relative;
        }

        .category-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0, 0, 0, 0.65);
          color: #fff;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          backdrop-filter: blur(5px);
        }

        .img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .food-card:hover .img-container img {
          transform: scale(1.12);
        }

        .card-content {
          padding: 18px;
          text-align: left;
        }

        .card-content h3 {
          margin: 0 0 6px 0;
          color: #1e272e;
          font-size: 17px;
          font-weight: 700;
        }

        .card-content p {
          color: #718093;
          font-size: 12px;
          margin-bottom: 12px;
          height: 36px;
          line-height: 1.4;
          overflow: hidden;
        }

        .add-btn {
          background: linear-gradient(135deg, #ff3838 0%, #ff4d4d 100%);
          color: white;
          border: none;
          padding: 9px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 700;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(255, 56, 56, 0.3);
          transition: all 0.2s ease;
        }

        .add-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 16px rgba(255, 56, 56, 0.45);
        }

        .add-btn:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default FoodCard;