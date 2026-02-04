import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import FoodMenu from '../components/FoodMenu';
import { Utensils } from 'lucide-react';
import axios from 'axios';

const Home: React.FC = () => {
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCartCount = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setCartItemCount(0);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/Cart/item-count`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItemCount(response.data.totalItems || 0);
    } catch (err) {
      console.error("Lỗi lấy item-count:", err);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar cartCount={cartItemCount} />

      <main className="grow">
        <section className="relative bg-orange-500 py-16 lg:py-24 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-orange-400 rounded-full blur-3xl opacity-50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center lg:text-left lg:max-w-2xl">
              <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
                 Fast Food <br />
                 <span className="text-yellow-300">Giao Tận Nơi</span>
              </h1>
              <p className="mt-6 text-orange-100 text-lg font-medium max-w-lg">
                 Thưởng thức những món ăn ngon nhất chỉ với vài cú click.
              </p>
            </div>
          </div>

          <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-[500px]">
             <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" 
                  alt="Delicious Food"
                  className="relative z-10"
                  style={{ animation: 'bounce-slow 4s ease-in-out infinite' }}
                />
             </div>
          </div>
        </section>

        <div id="menu-section">
          {/* Truyền hàm fetchCartCount xuống để FoodMenu gọi khi thêm thành công */}
          <FoodMenu onAddToCartSuccess={fetchCartCount} />
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Utensils className="text-orange-500" />
            <span className="text-xl font-black uppercase">Fast<span className="text-orange-500">Food</span></span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 FastFood Service. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Home;