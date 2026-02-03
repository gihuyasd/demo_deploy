import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, UtensilsCrossed, AtSign } from 'lucide-react';
import axios, { AxiosError } from 'axios';

interface RegisterFormData {
  fullName: string;
  username: string; 
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface ValidationError {
  msg: string;
  loc: (string | number)[];
}

interface ApiErrorResponse {
  detail?: string | ValidationError[];
  message?: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData({ ...formData, [name]: value.replace(/\D/g, '') });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp !');
      return;
    }
    
    setLoading(true);

    const payload = {
      name: formData.fullName.trim(),
      username: formData.username.trim(), 
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
    };
    
    const API_URL = `${import.meta.env.VITE_API_URL}/auth/register`;

    try {
      await axios.post(API_URL, payload);
      setSuccess('Chào mừng thành viên mới! Bạn đã đăng ký thành công. Chuyển hướng đến trang đăng nhập...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      let errorMessage = 'Có lỗi xảy ra khi đăng ký, vui lòng thử lại.';
      
      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-orange-50 border-l-4 border-orange-500 text-orange-700 rounded shadow-sm text-sm">
          <p className="font-bold">Rất tiếc!</p>
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded shadow-sm text-sm italic">
          {success}
        </div>
      )}

      {/* Họ và tên */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Họ và tên</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            placeholder="VD: Nguyễn Văn A"
          />
        </div>
      </div>

      {/* Tên đăng nhập */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tên đăng nhập (Username)</label>
        <div className="relative">
          <AtSign className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            placeholder="VD: foodlover99"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="mail@food.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số điện thoại</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength={11}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="09xxx..."
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="******"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Xác nhận lại</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="******"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400">
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 mt-2 rounded-2xl font-black text-white uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
          loading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 active:scale-95 shadow-orange-200'
        }`}
      >
        {loading ? (
          'Đang xử lý...'
        ) : (
          <>
            <UtensilsCrossed size={20} />
            Đăng ký thành viên ngay!
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;