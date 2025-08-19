import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onLogin, onSwitchToRegister }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin(formData.email, formData.password);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Green Background with Animation */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ backgroundColor: '#C8FF70' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-800 p-8">
            <div className={`transition-all duration-1000 ease-out ${
              animationComplete 
                ? 'transform translate-y-0 opacity-100 flex items-center justify-center space-x-4' 
                : 'transform translate-y-8 opacity-0'
            }`}>
              {/* Logo SVG */}
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center p-2">
                  <path fillRule="evenodd" clipRule="evenodd" d="M46.8355 54.8297C62.7707 44.2565 65.1634 22.6569 51.9266 8.86137C48.8719 5.6894 45.3082 2.97057 45.3082 3.7258C45.3082 3.87685 46.0718 5.08522 47.0391 6.39428C49.4829 9.81799 50.7047 12.4361 51.9266 16.6654C53.1994 21.2975 53.3012 28.9505 52.1303 33.4315C49.992 41.588 43.679 49.4927 36.1951 53.3192C31.2568 55.8367 28.8639 56.4912 22.9073 56.8437L18.0708 57.1457L20.8709 58.1527C21.1023 58.2359 21.3331 58.3217 21.5669 58.4085C23.5969 59.1624 25.8523 60 30.6458 60C38.3843 60 41.7444 58.2031 46.8355 54.8297Z" fill="#C8FF70"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M26.4711 44.3068C20.7691 44.3068 16.8999 43.4509 11.9615 41.0845C10.0269 40.1279 6.6158 37.8119 4.47754 35.9993C0.913766 32.9784 0.506494 32.777 0.506494 33.8343C0.506494 37.3587 4.37575 45.9683 7.43041 49.3417C9.82323 51.9598 13.5906 53.3192 19.5472 53.722C26.8784 54.1752 33.8532 51.9598 39.9625 47.3278C43.4245 44.7096 48.5665 37.8118 47.701 36.9559C47.5483 36.8049 46.2755 37.4091 44.9518 38.416C39.097 42.595 33.8023 44.3068 26.4711 44.3068Z" fill="#C8FF70"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.9068 22.9086C11.1978 14.0473 17.358 6.59568 25.9111 2.36639L30.6458 0L28.4567 0.0503502C23.2637 0.151047 16.6453 2.56778 11.9106 6.09219C5.44486 10.976 -0.562629 21.952 0.659234 26.6848C1.06652 28.1953 5.69942 33.9854 7.12493 34.7406C8.09224 35.2441 8.14314 35.093 8.14314 30.5616C8.14314 27.9939 8.49951 24.5198 8.9068 22.9086Z" fill="#C8FF70"/>
                </svg>
              </div>
              
              {/* Divider */}
              <div className="w-px h-12 bg-gray-800 opacity-50"></div>
              
              {/* Brand Text */}
              <div className="text-left">
                <h1 className="text-4xl font-bold">SyncUpC</h1>
                <p className="text-xl opacity-80 mt-1">
                  Gestiona tus eventos de manera profesional
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 100 100" className="text-white">
                <circle cx="50" cy="50" r="45" fill="currentColor"/>
                <text x="50" y="60" textAnchor="middle" fontSize="36" fontWeight="bold" fill="green">S</text>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">SyncUpC</h1>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h2>
              <p className="text-gray-600">Inicia sesión para gestionar tus eventos</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Ingresa tu correo"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Ingresa tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-green-600 hover:text-green-700 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                ¿No tienes una cuenta?{' '}
                <button
                  onClick={onSwitchToRegister}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Crear Cuenta
                </button>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                <strong>Credenciales de Prueba:</strong><br />
                Email: admin@company.com<br />
                Contraseña: admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}