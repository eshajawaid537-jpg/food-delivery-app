import React, { useState } from 'react';

function CheckoutModal({ isOpen, onClose, cart, totalBill, user, onOrderSuccess }) {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Multan');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [cardNumber, setCardNumber] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);

  if (!isOpen) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!phone || !address) {
      alert("Please fill in your delivery phone number and address!");
      return;
    }

    if (paymentMethod === 'Card' && !cardNumber) {
      alert("Please enter your Card Number!");
      return;
    }

    setIsPlacing(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: user.name,
          customerEmail: user.email,
          phone,
          address,
          city,
          paymentMethod,
          items: cart,
          totalBill
        })
      });

      const data = await response.json();
      setIsPlacing(false);

      if (data.success) {
        alert("🎉 Order & Payment Details Confirmed! Your order is being prepared.");
        onOrderSuccess();
      } else {
        alert("Order failed! Check server.");
      }
    } catch (err) {
      setIsPlacing(false);
      alert("Error placing order. Make sure backend is running.");
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 350
    }}>
      <div style={{ backgroundColor: 'white', borderRadius: '20px', width: '90%', maxWidth: '500px', padding: '25px', maxHeight: '85vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>🚚 Checkout & Payment</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <hr style={{ margin: '15px 0' }} />

        <form onSubmit={handleSubmitOrder}>
          <h4 style={{ color: '#ff3838', marginBottom: '10px' }}>1. Delivery Address Details</h4>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Phone Number:</label>
            <input
              type="text"
              placeholder="0300-1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Complete Street Address:</label>
            <textarea
              placeholder="House #, Street name, Area, Colony..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px', height: '60px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <h4 style={{ color: '#ff3838', marginBottom: '10px' }}>2. Select Payment Method</h4>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
              />
              💵 Cash on Delivery (COD)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="payment"
                value="Card"
                checked={paymentMethod === 'Card'}
                onChange={() => setPaymentMethod('Card')}
              />
              💳 Credit / Debit Card
            </label>
          </div>

          {paymentMethod === 'Card' && (
            <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
              <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Card Number:</label>
              <input
                type="text"
                placeholder="4532 XXXX XXXX 8921"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px', boxSizing: 'border-box' }}
              />
            </div>
          )}

          <div style={{ borderTop: '1px dashed #ccc', paddingTop: '10px', marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
            <span>Total Payable Amount:</span>
            <span style={{ color: '#ff3838' }}>Rs. {totalBill}</span>
          </div>

          <button
            type="submit"
            disabled={isPlacing}
            style={{
              width: '100%', padding: '12px', backgroundColor: '#00b894', color: 'white',
              border: 'none', borderRadius: '25px', marginTop: '15px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer'
            }}
          >
            {isPlacing ? "Processing..." : "Confirm & Place Order 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutModal;