import React, { useState } from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import FoodCard from './components/foodcard';
import AuthModal from './components/authmodal';
import MyOrdersModal from './components/myordersmodal';
import CheckoutModal from './components/checkoutmodal';
import AdminDashboard from './components/admindashboard';

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const foodItems = [
    { _id: "deal1", name: "Couple Combo Deal 👩‍❤️‍👨", description: "2 Crisp Zinger Burgers + 1 Large French Fries + 2 Chilled Soft Drinks (345ml)", price: 1390, category: "Deals", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?w=600&auto=format&fit=crop&q=80" },
    { _id: "deal2", name: "Family Feast Deal 🍕👨‍👩‍👧‍👦", description: "2 Medium Pizzas (Any Flavors) + 1 Garlic Bread Stuffed + 1.5 Litre Soft Drink", price: 2690, category: "Deals", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80" },
    { _id: "deal3", name: "4 Friends Hungama Deal 🍔🍟", description: "4 Smoky BBQ Beef/Chicken Burgers + 2 Family Fries + 4 Soft Drinks", price: 2990, category: "Deals", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80" },
    { _id: "b1", name: "Supreme Crispy Zinger", description: "Crunchy fried chicken fillet with melted cheddar cheese slice & mayo", price: 580, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80" },
    { _id: "b2", name: "Smoky BBQ Beef Burger", description: "Grilled juicy beef patty with caramelized onions & signature BBQ sauce", price: 720, category: "Burgers", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80" },
    { _id: "b3", name: "Classic Cheese Patty Burger", description: "Soft bun stuffed with juicy chicken patty & extra melted cheese", price: 450, category: "Burgers", image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80" },
    { _id: "p1", name: "Pepperoni Loaded Pizza", description: "Rich tomato sauce base topped with 100% mozzarella & beef pepperoni", price: 1250, category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80" },
    { _id: "p2", name: "Italian Margherita", description: "Classic pizza with fresh basil, olive oil, and extra virgin mozzarella", price: 990, category: "Pizza", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=80" },
    { _id: "pas1", name: "Creamy Chicken Alfredo Pasta", description: "Penne pasta tossed in rich garlic parmesan cream sauce with grilled chicken", price: 890, category: "Pasta", image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?w=600&auto=format&fit=crop&q=80" },
    { _id: "w1", name: "Crispy Zinger Chicken Wrap", description: "Crispy zinger strip, iceberg, mayo, and cheese wrapped in soft tortilla", price: 420, category: "Wraps & Rolls", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80" },
    { _id: "d1", name: "Molten Chocolate Lava Cake", description: "Warm chocolate cake with gooey center served with scoop of vanilla ice cream", price: 480, category: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80" },
    { _id: "dr1", name: "Fresh Mint Lemon Margarita", description: "Chilled crushed ice blend of fresh mint, lemon juice & soda water", price: 290, category: "Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80" }
  ];

  const handleAddToCart = (item) => setCart([...cart, item]);
  const calculateTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  const categories = ['All', 'Deals', 'Burgers', 'Pizza', 'Pasta', 'Wraps & Rolls', 'Desserts', 'Drinks'];

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenCheckout = () => {
    if (!user) {
      alert("Please login first to proceed to checkout!");
      setIsCartModalOpen(false);
      setIsAuthModalOpen(true);
      return;
    }
    setIsCartModalOpen(false);
    setIsCheckoutOpen(true);
  };

  const scrollToFooter = () => {
    const footer = document.getElementById('footer-section');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <Navbar 
        cartCount={cart.length} 
        onCartClick={() => setIsCartModalOpen(true)} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onLoginClick={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
        onMyOrdersClick={() => setIsMyOrdersOpen(true)}
      />

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setIsSidebarOpen(false);
        }}
        onScrollToFooter={scrollToFooter}
        onOpenAbout={() => setIsAboutModalOpen(true)}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={(userData) => setUser(userData)}
      />

      <MyOrdersModal 
        isOpen={isMyOrdersOpen}
        onClose={() => setIsMyOrdersOpen(false)}
        userEmail={user?.email}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totalBill={calculateTotal()}
        user={user}
        onOrderSuccess={() => { setCart([]); setIsCheckoutOpen(false); }}
      />

      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        currentUser={user}
      />

      <div style={{ background: 'linear-gradient(135deg, #111827 0%, #ff3838 100%)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800' }}>Craving Delicious Food? 🍕</h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>Get hot & fresh meals delivered straight to your door!</p>
        <button
          onClick={() => setIsAdminDashboardOpen(true)}
          style={{ marginTop: '25px', padding: '8px 18px', backgroundColor: '#1f2937', color: '#ff7675', border: '1px solid #ff7675', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          👨‍🍳 Admin Panel
        </button>
      </div>

      <div id="food-menu-section" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', margin: '30px 0' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '10px 22px', borderRadius: '25px', border: 'none',
              backgroundColor: selectedCategory === cat ? '#ff3838' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : '#2d3436',
              fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        {filteredItems.map(item => <FoodCard key={item._id} item={item} onAddToCart={handleAddToCart} />)}
      </div>

      {isCartModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 300 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', width: '90%', maxWidth: '450px', padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Your Cart 🛒</h2>
              <button onClick={() => setIsCartModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <hr style={{ margin: '15px 0' }} />
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999' }}>Your cart is empty!</p>
            ) : (
              <div>
                <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                  {cart.map((c, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>{c.name}</strong>
                      <strong style={{ color: '#ff3838' }}>Rs. {c.price}</strong>
                    </div>
                  ))}
                </div>
                <hr style={{ margin: '15px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span style={{ color: '#ff3838' }}>Rs. {calculateTotal()}</span>
                </div>
                <button
                  onClick={handleOpenCheckout}
                  style={{ width: '100%', marginTop: '20px', padding: '12px', backgroundColor: '#ff3838', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer id="footer-section" style={{ backgroundColor: '#1e293b', color: '#f8fafc', padding: '40px 20px', marginTop: '60px', textAlign: 'center' }}>
        <h3 style={{ color: '#ff3838', margin: '0 0 10px' }}>🍕 FoodExpress</h3>
        <p style={{ fontSize: '12px', color: '#64748b' }}>© {new Date().getFullYear()} FoodExpress. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;