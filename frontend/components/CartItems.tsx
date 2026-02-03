import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho một món ăn
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartItemsProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({ items, onUpdateQuantity, onRemove }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-4 transition-all hover:shadow-md"
        >
          {/* Ảnh món ăn */}
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-24 h-24 object-cover rounded-2xl shrink-0 shadow-sm" 
          />

          {/* Thông tin món */}
          <div className="grow text-center sm:text-left">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.name}</h3>
            <p className="text-red-600 font-black text-lg">
              {item.price.toLocaleString()}đ
            </p>
          </div>

          {/* Bộ điều khiển số lượng */}
          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-1">
            <button 
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-gray-600 transition-all active:scale-90"
            >
              <Minus size={18} />
            </button>
            <span className="px-4 font-black text-gray-800 min-w-[40px] text-center">
              {item.quantity}
            </span>
            <button 
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-gray-600 transition-all active:scale-90"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Nút xóa */}
          <button 
            onClick={() => onRemove(item.id)}
            className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
            title="Xóa món này"
          >
            <Trash2 size={22} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;