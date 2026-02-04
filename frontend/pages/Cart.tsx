import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  ShoppingBag, 
  Truck, 
  Loader2,
  MapPin,
  StickyNote
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CartItems, { type CartItem } from '../components/CartItems';

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);
  
  const [address, setAddress] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/Cart/cart-item`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(response.data);
    } catch (err) {
      console.error("Lỗi lấy giỏ hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleUpdateQuantity = async (id: number, delta: number) => {
    const token = localStorage.getItem('access_token');
    const endpoint = delta > 0 ? 'increase' : 'decrease';
    try {
      await axios.post(`${API_URL}/Cart/${endpoint}`, { foodId: id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCartItems(); 
    } catch (err) {
      console.error(`Lỗi khi ${endpoint}:`, err);
    }
  };

  const handleRemove = async (id: number) => {
    if (!window.confirm("Bạn muốn xóa món này?")) return;
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${API_URL}/Cart`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { foodId: id }
      });
      fetchCartItems();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  // --- TÍNH TOÁN DỮ LIỆU ---
  // Tính tổng số lượng món (để hiển thị badge trên Navbar)
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  // Tính tiền
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = items.length > 0 ? 15000 : 0;
  const total = subtotal + shippingFee;

  const handleCheckout = async () => {
    if (!address.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    const token = localStorage.getItem('access_token');
    const payload = {
      note: note,
      address: address,
      total: total
    };

    try {
      setCheckoutLoading(true);
      await axios.post(`${API_URL}/Booking`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Đặt món thành công! Đơn hàng của bạn đang được xử lý.");
      navigate('/'); 
    } catch (err) {
      console.error("Lỗi đặt hàng:", err);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      {/* QUAN TRỌNG: Truyền cartCount vào đây để hết lỗi build */}
      <Navbar cartCount={cartCount} />
      
      <main className="max-w-7xl mx-auto px-4 py-8 w-full grow">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 font-bold mb-8 transition-all group">
          <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
            <ArrowLeft size={20} />
          </div>
          Quay lại chọn thêm món
        </Link>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                Giỏ hàng <span className="text-orange-500">của bạn</span>
              </h1>

              <CartItems 
                items={items} 
                onUpdateQuantity={handleUpdateQuantity} 
                onRemove={handleRemove} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                    <MapPin size={18} className="text-orange-500" /> Địa chỉ giao hàng
                  </label>
                  <input 
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                    placeholder="Số nhà, tên đường, phường..."
                  />
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                    <StickyNote size={18} className="text-orange-500" /> Ghi chú
                  </label>
                  <textarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                    rows={1}
                    placeholder="Không hành, ít cay..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28">                
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-orange-100/50 border border-orange-50">
                  <h2 className="text-xl font-black text-gray-900 uppercase mb-8">Tổng kết</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-500 font-bold">
                      <span>Tạm tính</span>
                      <span className="text-gray-900">{subtotal.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-bold">
                      <span className="flex items-center gap-1"><Truck size={18} /> Phí giao hàng</span>
                      <span className="text-gray-900">{shippingFee.toLocaleString()}đ</span>
                    </div>
                    <div className="h-px border-t border-dashed border-gray-200 my-6"></div>
                    <div className="flex justify-between items-end">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Thành tiền</p>
                      <span className="text-4xl font-black text-red-600 tracking-tighter">{total.toLocaleString()}đ</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full mt-10 bg-gradient-to-r from-red-600 to-orange-500 text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-lg hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {checkoutLoading ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <CreditCard size={24} />
                    )}
                    {checkoutLoading ? 'Đang xử lý...' : 'Đặt món ngay'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border">
             <ShoppingBag className="mx-auto text-orange-200 mb-6" size={100} />
             <h2 className="text-2xl font-bold uppercase">Giỏ hàng trống</h2>
             <Link to="/" className="mt-6 inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-bold">Quay lại Menu</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;