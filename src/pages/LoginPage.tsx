import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BodyBioLogo from '../../public/bodyBioLogo.svg';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/features/auth/authSlice';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // const res = await loginApi(email, password);
      if (email.includes('admin')) {
        const res = {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ADMIN_TOKEN',
          user: {
            id: 1,
            role: 'Admin',
          },
        };
        dispatch(
          loginSuccess({
            token: res.accessToken,
            role: res.user.role,
            userId: res.user.id,
          })
        );
        navigate('/admin-portal');
      } else if (email.includes('doctor')) {
        const res = {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.DOCTOR_TOKEN',
          user: {
            id: 45,
            role: 'Doctor',
          },
        };
        dispatch(
          loginSuccess({
            token: res.accessToken,
            role: res.user.role,
            userId: res.user.id,
          })
        );
        navigate('/doctor-portal');
      } else if (email.includes('user')) {
        const res = {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.USER_TOKEN',
          user: {
            id: 128,
            role: 'User',
          },
        };
        dispatch(
          loginSuccess({
            token: res.accessToken,
            role: res.user.role,
            userId: res.user.id,
          })
        );
        navigate('/user-portal');
      } else {
        setError('Invalid email or password');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl border border-gray-100 rounded-3xl p-10 w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <img src={BodyBioLogo} alt="BodyBio" className="mx-auto w-24 h-auto" />
          <p className="text-gray-500 text-sm mt-1">Secure Login Portal</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., admin@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 outline-none transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 active:scale-[0.98] transition cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="grow border-gray-200" />
          <span className="px-2 text-gray-400 text-sm">or</span>
          <hr className="grow border-gray-200" />
        </div>

        {/* Forgot Password */}
        <div className="text-center">
          <button
            onClick={() => navigate('/auth/forgot-update')}
            className="text-blue-500 text-sm hover:underline transition cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};
