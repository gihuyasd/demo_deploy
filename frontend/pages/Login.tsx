import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        <div className="hidden md:block relative w-full h-full">
            <img
                src="/fastfood.jpg"
                alt="Fast food"
                className="w-full h-full object-cover"
            />
        </div>

        {/* Bên phải: Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Hệ thống đặt đồ ăn nhanh</h2>
              <p className="mt-2 text-gray-600">Đăng nhập để tiếp tục</p>
            </div>

            {/* Dùng lại component đã tách riêng */}
            <LoginForm />

            <p className="mt-8 text-center text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <a href="/register" className="font-bold text-red-500 hover:text-red-700">
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;