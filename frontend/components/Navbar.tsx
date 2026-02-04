import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Utensils, LogOut, Menu, X, Pizza } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-red-500 to-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <Pizza className="text-white" size={28} />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent uppercase tracking-tighter">
                Fast<span className="text-orange-600">Food</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-bold text-gray-700 hover:text-red-500 transition-colors flex items-center gap-1">
              <Utensils size={18} /> Trang chủ
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/cart" className="relative font-bold text-gray-700 hover:text-red-500 transition-colors flex items-center gap-1">
                  <ShoppingBag size={18} /> Giỏ hàng
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-xl font-bold transition-all">
                  <LogOut size={18} /> Đăng xuất
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="font-bold text-gray-700 hover:text-red-500 transition-colors">Đăng nhập</Link>
                <Link to="/register" className="bg-orange-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-md">Đăng ký</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 focus:outline-none">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          <Link to="/" className="block font-bold text-gray-700 p-2">Trang chủ</Link>
          {isLoggedIn ? (
            <>
              <Link to="/cart" className="flex justify-between items-center font-bold text-gray-700 p-2">
                Giỏ hàng
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">{cartCount}</span>
              </Link>
              <button onClick={handleLogout} className="w-full text-left font-bold text-red-600 p-2">Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block font-bold text-gray-700 p-2">Đăng nhập</Link>
              <Link to="/register" className="block bg-orange-500 text-white text-center font-bold p-3 rounded-xl">Đăng ký</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;