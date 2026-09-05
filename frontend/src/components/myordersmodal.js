import React, { useEffect, useState, useCallback } from 'react';

function MyOrdersModal({ isOpen, onClose, userEmail }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/user/${userEmail}`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
    setLoading(false);
  }, [userEmail]);

  useEffect(() => {
    if (isOpen && userEmail) {
      fetchOrders();
    }
  }, [isOpen, userEmail, fetchOrders]);

  if (!isOpen) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return { bg: '#e8f5e9', color: '#2e7d32', text: '🟢 Delivered' };
      case 'Preparing':
        return { bg: '#fff8e1', color: '#f57f17', text: '🟠 Preparing in Kitchen' };
      case 'Out for Delivery':
        return { bg: '#e3f2fd', color: '#1565c0', text: '🛵 Out for Delivery' };
      default:
        return { bg: '#ffebee', color: '#c62828', text: '🟡 Pending' };
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 350
    }}>
      <div style={{ backgroundColor: 'white', borderRadius: '20px', width: '90%', maxWidth: '550px', padding: '25px', maxHeight: '80vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>📦 My Orders & Tracking</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <hr style={{ margin: '15px 0' }} />

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No orders found yet!</p>
        ) : (
          orders.map((order) => {
            const statusInfo = getStatusBadge(order.status || 'Pending');
            return (
              <div key={order._id} style={{ border: '1px solid #e0e0e0', borderRadius: '12px', padding: '15px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#666' }}>ID: #{order._id.slice(-6)}</span>
                  <span style={{ backgroundColor: statusInfo.bg, color: statusInfo.color, padding: '4px 10px', borderRadius: '15px', fontWeight: 'bold', fontSize: '12px' }}>
                    {statusInfo.text}
                  </span>
                </div>

                <div style={{ fontSize: '14px', margin: '8px 0' }}>
                  <strong>Items:</strong>
                  <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                    {order.items.map((it, idx) => (
                      <li key={idx}>
                        {it.name} {it.selectedVariant ? `(${it.selectedVariant})` : ''} - Rs. {it.price}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #ddd' }}>
                  <span>Total Amount:</span>
                  <span style={{ color: '#ff3838' }}>Rs. {order.totalBill}</span>
                </div>
              </div>
            );
          })
        )}

      </div>
    </div>
  );
}

export default MyOrdersModal;