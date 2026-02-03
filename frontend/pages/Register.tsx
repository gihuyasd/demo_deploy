import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
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

                <div className="relative bg-linear-to-br from-green-600 to-emerald-800 hidden md:block">
                <div className="hidden md:block relative w-full h-full">
                        <img
                            src="/fastfood1.jpg"
                            alt="Fast food"
                            className="w-full h-full object-cover"
                        />
                    </div>
                
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">Tạo tài khoản mới</h2>
                    </div>

                    <RegisterForm />

                    <p className="mt-8 text-center text-sm text-gray-600">
                    Đã có tài khoản?{' '}
                    <a href="/login" className="font-bold text-green-600 hover:text-green-700">
                        Đăng nhập ngay
                    </a>
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Register;