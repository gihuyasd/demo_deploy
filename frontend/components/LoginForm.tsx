import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Pizza } from 'lucide-react';
import axios, { AxiosError } from 'axios';

interface ValidationError {
  msg: string;
  loc: (string | number)[];
}

interface ApiErrorResponse {
  detail: string | ValidationError[];
}

interface LoginResponse {
  token: string;
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username: username.trim(),
          password,
        }
      );

      localStorage.setItem('access_token', res.data.token);
      navigate('/', { replace: true });
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      let errorMessage = 'Đăng nhập không thành công. Bạn kiểm tra lại tài khoản nhé!';

      if (axiosError.response) {
        if (axiosError.response.status === 422) {
          const detail = axiosError.response.data.detail;
          if (Array.isArray(detail) && detail.length > 0) {
            errorMessage = `Lỗi: ${detail[0].msg}`;
          }
        } else {
          const detail = axiosError.response.data.detail;
          errorMessage = typeof detail === 'string' ? detail : errorMessage;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      {error && (
        <div className="p-4 bg-orange-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm shadow-sm">
          <span className="font-bold">Opps!</span> {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
          Tên đăng nhập / Email
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3.5 h-5 w-5 text-orange-400" />
          <input
            type="text"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300"
            placeholder="Tên của bạn..."
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
          Mật khẩu
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-orange-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-12 py-3.5 border-2 border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-gray-300"
            placeholder="••••••••"
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-orange-500 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Nút bấm Đăng nhập */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-2xl font-black text-white uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
          loading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 active:scale-95 shadow-red-200'
        }`}
      >
        {loading ? (
          'Đang kiểm tra...'
        ) : (
          <>
            <Pizza size={20} />
            Đăng nhập ngay!
          </>
        )}
      </button>

      <div className="flex justify-center mt-4">
        <button type="button" className="text-sm font-bold text-orange-600 hover:text-red-600 transition-colors">
          Quên mật khẩu?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;