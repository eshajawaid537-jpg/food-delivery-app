import React, { useState, useEffect } from 'react';

function AdminDashboard({ isOpen, onClose, currentUser }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sirf Admin ke liye hi open hone ka check
  if (!isOpen) return null;

  // Agar login user admin nahi hai toh alert
  if (currentUser?.role !== 'admin' && currentUser?.email !== 'admin@foodexpress.com') {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 400 }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center' }}>
          <h3 style={{ color: '#d63031' }}>⛔ Access Denied</h3>
          <p>Aap Admin nahi hain! Yeh page sirf Admin ke liye hai.</p>
          <button onClick={onClose} style={{ padding: '8px 20px', backgroundColor: '#0984e3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    );
  }

  // Backend se saare orders fetch karna
  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Orders load nahi ho sake", err);
    }
    setLoading(false);
  };

  // Order status update karna
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Order status updated to: ${newStatus}`);
        fetchAllOrders(); // List Refresh
      }
    } catch (err) {
      alert("Status update nahi ho saka!");
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 400 }}>
      <div style={{ backgroundColor: 'white', borderRadius: '15px', width: '90%', maxWidth: '900px', padding: '25px', maxHeight: '85vh', overflowY: 'auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
          <h2>👨‍🍳 Admin Order Control Dashboard</h2>
          <div>
            <button onClick={fetchAllOrders} style={{ padding: '6px 12px', marginRight: '10px', backgroundColor: '#00b894', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>🔄 Refresh</button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer' }}>✕</button>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', margin: '20px' }}>Orders load ho rahe hain...</p>
        ) : orders.length === 0 ? (
          <p style={{ textAlign: 'center', margin: '20px', color: '#777' }}>Koi naya order nahi mila.</p>
        ) : (
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f2f6', borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '10px' }}>Customer</th>
                <th style={{ padding: '10px' }}>Phone / Address</th>
                <th style={{ padding: '10px' }}>Items</th>
                <th style={{ padding: '10px' }}>Total</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>
                    <strong>{ord.customerName}</strong><br />
                    <small style={{ color: '#666' }}>{ord.customerEmail}</small>
                  </td>
                  <td style={{ padding: '10px' }}>
                    {ord.phone}<br />
                    <small>{ord.address}, {ord.city}</small>
                  </td>
                  <td style={{ padding: '10px' }}>
                    {ord.items?.map((item, idx) => (
                      <div key={idx} style={{ fontSize: '12px' }}>• {item.name}</div>
                    ))}
                  </td>
                  <td style={{ padding: '10px', fontWeight: 'bold', color: '#ff3838' }}>Rs. {ord.totalBill}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', color: 'white',
                      backgroundColor: ord.status === 'Delivered' ? '#00b894' : ord.status === 'Preparing' ? '#fdcb6e' : '#ff7675'
                    }}>
                      {ord.status || 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <select
                      value={ord.status || 'Pending'}
                      onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                      style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;