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

  // Food Items List
  const foodItems = [
    // --- SPECIAL DEALS ---
    { _id: "deal1", name: "Couple Combo Deal 👩‍❤️‍👨", description: "2 Crisp Zinger Burgers + 1 Large French Fries + 2 Chilled Soft Drinks (345ml)", price: 1390, category: "Deals", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?w=600&auto=format&fit=crop&q=80" },
    { _id: "deal2", name: "Family Feast Deal 🍕👨‍👩‍👧‍👦", description: "2 Medium Pizzas (Any Flavors) + 1 Garlic Bread Stuffed + 1.5 Litre Soft Drink", price: 2690, category: "Deals", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80" },
    { _id: "deal3", name: "4 Friends Hungama Deal 🍔🍟", description: "4 Smoky BBQ Beef/Chicken Burgers + 2 Family Fries + 4 Soft Drinks", price: 2990, category: "Deals", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80" },

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
  };

  return (
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

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #111827 0%, #ff3838 100%)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800' }}>Craving Delicious Food? 🍕</h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>Get hot & fresh meals delivered straight to your door!</p>
        
        {/* Banner Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ margin: 0, color: '#ff7675' }}>15K+</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#d1d5db' }}>Happy Diners</p>
          </div>
          <div>
            <h2 style={{ margin: 0, color: '#ff7675' }}>4.9 ★</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#d1d5db' }}>Customer Rating</p>
          </div>
          <div>
            <h2 style={{ margin: 0, color: '#ff7675' }}>30 Min</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#d1d5db' }}>Fast Delivery</p>
          </div>
        </div>

        <button
          onClick={() => setIsAdminDashboardOpen(true)}
          style={{ marginTop: '25px', padding: '8px 18px', backgroundColor: '#1f2937', color: '#ff7675', border: '1px solid #ff7675', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
        >
          👨‍🍳 Admin Panel
        </button>
      </div>

      {/* Categories Filter Bar */}
      <div id="food-menu-section" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', margin: '30px 0' }}>
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
            {cat} {cat === 'Deals' ? '🔥' : ''}
          </button>
        ))}
      </div>

      {/* Food Cards Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto', minHeight: '300px' }}>
        {filteredItems.map(item => <FoodCard key={item._id} item={item} onAddToCart={handleAddToCart} />)}
      </div>

      {/* Customer Reviews Section */}
      <div style={{ backgroundColor: '#ffffff', padding: '50px 20px', marginTop: '60px', textAlign: 'center' }}>
        <h2 style={{ color: '#2d3436', fontWeight: '800' }}>❤️ Customer Reviews & Ratings</h2>
        <p style={{ color: '#636e72' }}>Rated 4.9/5 Stars by over 15,000+ Foodies!</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '30px', maxWidth: '1000px', margin: '30px auto 0' }}>
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '15px', width: '280px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#ffb142', fontSize: '18px', margin: '0 0 10px' }}>★★★★★</p>
            <p style={{ fontSize: '14px', color: '#2d3436', fontStyle: 'italic' }}>"The Zinger Burger was super crispy and delivered in just 25 minutes hot & fresh!"</p>
            <strong style={{ display: 'block', marginTop: '10px', color: '#ff3838' }}>- Hamza Malik</strong>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '15px', width: '280px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#ffb142', fontSize: '18px', margin: '0 0 10px' }}>★★★★★</p>
            <p style={{ fontSize: '14px', color: '#2d3436', fontStyle: 'italic' }}>"Family Feast Deal is the best value deal in town! Loved the stuffed crust pizza."</p>
            <strong style={{ display: 'block', marginTop: '10px', color: '#ff3838' }}>- Ayesha Khan</strong>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '15px', width: '280px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <p style={{ color: '#ffb142', fontSize: '18px', margin: '0 0 10px' }}>★★★★★</p>
            <p style={{ fontSize: '14px', color: '#2d3436', fontStyle: 'italic' }}>"Fastest delivery ever! Exactly 30 minutes. 10/10 service and food quality."</p>
            <strong style={{ display: 'block', marginTop: '10px', color: '#ff3838' }}>- Bilal Ahmed</strong>
          </div>
        </div>
      </div>

      {/* About Us Modal */}
      {isAboutModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 600 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', width: '90%', maxWidth: '500px', padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, color: '#ff3838' }}>🍕 About FoodExpress</h2>
              <button onClick={() => setIsAboutModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <hr style={{ margin: '15px 0' }} />
            <p style={{ lineHeight: '1.6', color: '#2d3436' }}>
              Welcome to <strong>FoodExpress</strong>! We are dedicated to serving you delicious, fresh, and high-quality gourmet food delivered straight to your doorstep in <strong>30 minutes or less</strong>.
            </p>
            <p style={{ lineHeight: '1.6', color: '#2d3436' }}>
              From juicy gourmet burgers to authentic pizzas, pastas, and exclusive combo deals, every dish is prepared daily with fresh ingredients by world-class chefs.
            </p>
          </div>
        </div>
      )}

      {/* Cart Modal */}
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
                      <div>
                        <strong>{c.name}</strong>
                      </div>
                      <strong style={{ color: '#ff3838' }}>Rs. {c.price}</strong>
                    </di</div>
                <hr style={{ margin: '15px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span style={{ color: '#ff3838' }}>Rs. {calculateTotal()}</span>
                </div>
                <button onClick={handleOpenCheckout} style={{ width: '100%', padding: '12px', backgroundColor: '#00b894', color: 'white', border: 'none', borderRadius: '25px', marginTop: '15px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                  Proceed to Payment & Checkout 🚚
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer / Contact & Location Section */}
      <footer id="footer-section" style={{ backgroundColor: '#111827', color: '#ffffff', padding: '40px 20px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <div>
            <h3 style={{ color: '#ff3838', margin: '0 0 10px' }}>🍕 FoodExpress</h3>
            <p style={{ color: '#9ca3af', maxWidth: '300px' }}>Fastest Food Delivery Service. Hot & Fresh meals delivered in 30 minutes!</p>
            <p style={{ color: '#00b894', fontWeight: 'bold' }}>⚡ Guaranteed 30 Mins Fast Delivery</p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', margin: '0 0 10px' }}>📞 Contact Us</h4>
            <p style={{ color: '#d1d5db', margin: '5px 0' }}>Phone: <strong>0300000000</strong></p>
            <p style={{ color: '#d1d5db', margin: '5px 0' }}>Email: support@foodexpress.com</p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', margin: '0 0 10px' }}>📍 Location & Map</h4>
            <p style={{ color: '#d1d5db', margin: '5px 0' }}>Main Boulevard, Gulberg, Lahore</p>
            <a 
              href="https://maps.google.com/?q=Lahore" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#ff7675', fontWeight: 'bold', textDecoration: 'underline', display: 'inline-block', marginTop: '5px' }}
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid #1f2937', marginTop: '30px', paddingTop: '20px', color: '#6b7280', fontSize: '13px' }}>
          © 2026 FoodExpress. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default App;