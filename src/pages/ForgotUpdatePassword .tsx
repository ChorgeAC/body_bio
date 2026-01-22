import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BodyBioLogo from '../../public/bodyBioLogo.svg';

export const ForgotUpdatePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState('forgot');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForgot = (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep('update');
      setSuccess('OTP sent to your email!');
    }, 1000);
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess('Password updated successfully!');
      setTimeout(() => navigate('/auth/login'), 1000);
    }, 1000);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      return 'Strong';
    }
    if (password.length >= 6) {
      return 'Medium';
    }
    if (password.length > 0) {
      return 'Weak';
    }
    return '';
  };

  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl border border-gray-100 rounded-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={BodyBioLogo} alt="BodyBio" className="mx-auto w-24 h-auto" />
          <p className="text-gray-500 text-sm mt-1">
            {step === 'forgot' ? 'Forgot Password' : 'Update Password'}
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3 text-center">{success}</p>}

        {step === 'forgot' ? (
          <form onSubmit={handleForgot} className="space-y-6">
            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition active:scale-[0.98] cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="text-gray-700 font-medium">OTP</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer select-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>
              {newPassword && (
                <p
                  className={`text-sm mt-1 ${
                    passwordStrength === 'Strong'
                      ? 'text-green-600'
                      : passwordStrength === 'Medium'
                        ? 'text-yellow-600'
                        : 'text-red-500'
                  }`}
                >
                  Strength: {passwordStrength}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition active:scale-[0.98] cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <button
            className="text-blue-600 text-sm hover:underline cursor-pointer"
            onClick={() => navigate('/auth/login')}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
