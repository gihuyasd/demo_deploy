import React, { useState, useEffect } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface FoodMenuProps {
  onAddToCartSuccess: () => void;
}

const FoodMenu: React.FC<FoodMenuProps> = ({ onAddToCartSuccess }) => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addingId, setAddingId] = useState<number | null>(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`${API_URL}/food`);
        setFoods(response.data);
      } catch (err) {
        console.error("Lỗi khi tải thực đơn:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [API_URL]);

  const handleAddToCart = async (foodId: number) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert("Vui lòng đăng nhập để đặt món!");
      navigate('/login');
      return;
    }

    try {
      setAddingId(foodId);
      await axios.post(
        `${API_URL}/Cart/increase`,
        { foodId: foodId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onAddToCartSuccess();

      alert("Đã thêm món vào giỏ hàng!");
    } catch (err) {
      console.error("Lỗi thêm giỏ hàng:", err);
      alert("Không thể thêm vào giỏ hàng. Thử lại sau!");
    } finally {
      setAddingId(null);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-orange-500">
        <Loader2 className="animate-spin h-10 w-10 mb-2" />
        <p className="font-medium">Đang chuẩn bị thực đơn...</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-black text-gray-900 uppercase mb-10 tracking-tighter">
          Thực đơn <span className="text-orange-500">Đồ ăn nhanh</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {foods.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
              <div className="relative overflow-hidden h-48 bg-gray-200">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>

              <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-black text-red-600">{item.price.toLocaleString()}đ</span>
                </div>

                <button
                  onClick={() => handleAddToCart(item.id)}
                  disabled={addingId === item.id}
                  className={`mt-4 w-full py-2.5 border-2 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    addingId === item.id
                      ? 'bg-gray-100 border-gray-300 text-gray-400'
                      : 'border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white'
                  }`}
                >
                  {addingId === item.id ? <Loader2 className="animate-spin h-4 w-4" /> : <ShoppingCart size={18} />}
                  {addingId === item.id ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodMenu;