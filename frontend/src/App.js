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
  const [user, setUser] = useState(null);

  // Food Items List
  const foodItems = [
    // --- BURGERS ---
    { _id: "b1", name: "Supreme Crispy Zinger", description: "Crunchy fried chicken fillet with melted cheddar cheese slice & mayo", price: 580, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Single Patty", price: 580 }, { name: "Double Patty Cheese", price: 820 }] },
    { _id: "b2", name: "Smoky BBQ Beef Burger", description: "Grilled juicy beef patty with caramelized onions & signature BBQ sauce", price: 720, category: "Burgers", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Standard 150g", price: 720 }, { name: "Monster Double 300g", price: 980 }] },
    { _id: "b3", name: "Classic Cheese Patty Burger", description: "Soft bun stuffed with juicy chicken patty & extra melted cheese", price: 450, category: "Burgers", image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Regular", price: 450 }, { name: "Double Cheese", price: 580 }] },
    { _id: "b4", name: "Spicy Jalapeno Crunch", description: "Spicy zinger with jalapenos, sriracha sauce & crispy lettuce", price: 630, category: "Burgers", image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Medium Spicy", price: 630 }, { name: "Extra Hot", price: 650 }] },
    { _id: "b5", name: "Mushroom Swiss Beef", description: "Sautéed mushrooms, Swiss cheese melted over grilled beef patty", price: 790, category: "Burgers", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Single Patty", price: 790 }, { name: "Double Mushroom", price: 1050 }] },

    // --- PIZZA ---
    { _id: "p1", name: "Pepperoni Loaded Pizza", description: "Rich tomato sauce base topped with 100% mozzarella & beef pepperoni", price: 1250, category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Small 8\"", price: 850 }, { name: "Medium 11\"", price: 1250 }, { name: "Large 14\"", price: 1750 }] },
    { _id: "p2", name: "Italian Margherita", description: "Classic pizza with fresh basil, olive oil, and extra virgin mozzarella", price: 990, category: "Pizza", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Small 8\"", price: 690 }, { name: "Medium 11\"", price: 990 }, { name: "Large 14\"", price: 1450 }] },
    { _id: "p3", name: "Smoky BBQ Chicken Pizza", description: "Chunky BBQ chicken, bell peppers, onions & melted cheddar crust", price: 1350, category: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Small 8\"", price: 890 }, { name: "Medium 11\"", price: 1350 }, { name: "Large 14\"", price: 1850 }] },
    { _id: "p4", name: "Cheese Stuffed Crust Pizza", description: "Crispy crust filled with molten cheese and spicy chicken tikka chunks", price: 1450, category: "Pizza", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Medium 11\"", price: 1450 }, { name: "Large 14\"", price: 1950 }] },
    { _id: "p5", name: "Garden Veggie Supreme", description: "Olives, mushrooms, sweetcorn, onions, and green peppers with herb sauce", price: 1100, category: "Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Small 8\"", price: 750 }, { name: "Medium 11\"", price: 1100 }, { name: "Large 14\"", price: 1550 }] },

    // --- PASTA ---
    { _id: "pas1", name: "Creamy Chicken Alfredo Pasta", description: "Penne pasta tossed in rich garlic parmesan cream sauce with grilled chicken", price: 890, category: "Pasta", image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Single Bowl", price: 890 }, { name: "Family Bowl", price: 1590 }] },
    { _id: "pas2", name: "Spicy Penne Arrabbiata", description: "Traditional Italian spicy tomato herb sauce pasta topped with olives & basil", price: 780, category: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Veggie Arrabbiata", price: 780 }, { name: "With Grilled Chicken", price: 920 }] },
    { _id: "pas3", name: "Cheesy Baked Macaroni & Cheese", description: "Oven-baked macaroni in four-cheese sauce topped with golden breadcrumbs", price: 850, category: "Pasta", image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Regular Cheese", price: 850 }, { name: "Loaded Extra Cheese", price: 990 }] },

    // --- WRAPS & ROLLS ---
    { _id: "w1", name: "Crispy Zinger Chicken Wrap", description: "Crispy zinger strip, iceberg, mayo, and cheese wrapped in soft tortilla", price: 420, category: "Wraps & Rolls", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Single Roll", price: 420 }, { name: "Double Strip Jumbo", price: 590 }] },
    { _id: "w2", name: "BBQ Seekh Kabab Paratha Roll", description: "Charcoal grilled beef seekh kabab wrapped in crispy golden paratha with mint chutney", price: 380, category: "Wraps & Rolls", image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Chicken Kabab", price: 380 }, { name: "Beef Kabab", price: 420 }] },
    { _id: "w3", name: "Garlic Mayo Chicken Wrap", description: "Tender grilled chicken chunks coated in signature garlic mayo sauce", price: 450, category: "Wraps & Rolls", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Regular Wrap", price: 450 }, { name: "Cheese Loaded Wrap", price: 540 }] },

    // --- DESSERTS ---
    { _id: "d1", name: "Molten Chocolate Lava Cake", description: "Warm chocolate cake with gooey center served with scoop of vanilla ice cream", price: 480, category: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80" },
    { _id: "d2", name: "New York Classic Cheesecake", description: "Rich creamy cheesecake slice over graham cracker crust with strawberry drizzle", price: 550, category: "Desserts", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80" },
    { _id: "d3", name: "Nutella Belgian Waffle", description: "Freshly baked warm waffle drizzled with Belgian Nutella and chocolate chips", price: 520, category: "Desserts", image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&auto=format&fit=crop&q=80" },

    // --- DRINKS ---
    { _id: "dr1", name: "Fresh Mint Lemon Margarita", description: "Chilled crushed ice blend of fresh mint, lemon juice & soda water", price: 290, category: "Drinks", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Glass 350ml", price: 290 }, { name: "Pitcher 1 Litre", price: 590 }] },
    { _id: "dr2", name: "Chilled Cold Coffee with Ice Cream", description: "Rich blended espresso coffee served with vanilla ice cream float", price: 380, category: "Drinks", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80" },
    { _id: "dr3", name: "Thick Nutella Chocolate Shake", description: "Creamy whole milk blended with Nutella chocolate & topped with whipped cream", price: 420, category: "Drinks", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80", variants: [{ name: "Regular Glass", price: 420 }, { name: "Jumbo Glass", price: 550 }] }
  ];

  const handleAddToCart = (item) => setCart([...cart, item]);
  const calculateTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'Wraps & Rolls', 'Desserts', 'Drinks'];

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

  const handleOrderComplete = () => {
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#f4f6f9', minHeight: '100vh', paddingBottom: '60px' }}>
      
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
        onOrderSuccess={handleOrderComplete}
      />

      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        currentUser={user}
      />

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e272e 0%, #ff3838 100%)', color: 'white', padding: '50px 20px', textAlign: 'center' }}>
        <h1>Craving Delicious Food? 🍕</h1>
        <p>Get hot & fresh meals delivered straight to your door!</p>
        
        {/* Admin Secret Portal Button */}
        <button
          onClick={() => setIsAdminDashboardOpen(true)}
          style={{ marginTop: '15px', padding: '8px 18px', backgroundColor: '#2d3436', color: '#ff7675', border: '1px solid #ff7675', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
        >
          👨‍🍳 Admin Panel
        </button>
      </div>

      {/* Categories Filter */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', margin: '30px 0' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '10px 22px', borderRadius: '25px', border: 'none',
              backgroundColor: selectedCategory === cat ? '#ff3838' : '#ffffff',
              color: selectedCategory === cat ? '#ffffff' : '#2d3436',
              fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Cards Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        {filteredItems.map(item => <FoodCard key={item._id} item={item} onAddToCart={handleAddToCart} />)}
      </div>

      {/* Cart Modal */}
      {isCartModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 300
        }}>
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
                      <div>
                        <strong>{c.name}</strong>
                        {c.selectedVariant && <span style={{ fontSize: '12px', color: '#636e72', display: 'block' }}>Size: {c.selectedVariant}</span>}
                      </div>
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
                  style={{ width: '100%', padding: '12px', backgroundColor: '#00b894', color: 'white', border: 'none', borderRadius: '25px', marginTop: '15px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
                >
                  Proceed to Payment & Checkout 🚚
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;