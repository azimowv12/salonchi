"use client";
import React, { useState } from 'react';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  const handleAuth = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Xush kelibsiz!</h2>
            <p className="text-gray-600 mb-6">Siz tizimga kirdingiz</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Chiqish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Tizimga kirish' : 'Roʻyxatdan oʻtish'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Hisobingizga kiring' : 'Yangi hisob yarating'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);
          handleAuth(data);
        }}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Ism
              </label>
              <input
                type="text"
                name="name"
                required={!isLogin}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                placeholder="Ismingizni kiriting"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              placeholder="email@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Parol
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              placeholder="Parolingizni kiriting"
            />
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                name="confirmPassword"
                required={!isLogin}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                placeholder="Parolni qayta kiriting"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 mb-4"
          >
            {isLogin ? 'Kirish' : 'Roʻyxatdan oʻtish'}
          </button>
        </form>

        {/* Switch mode */}
        <div className="text-center">
          <p className="text-gray-600">
            {isLogin ? 'Hisobingiz yoʻqmi?' : 'Allaqachon hisobingiz bormi?'}
            <button
              onClick={switchMode}
              className="ml-2 text-blue-500 hover:text-blue-600 font-medium transition duration-200"
            >
              {isLogin ? 'Roʻyxatdan oʻting' : 'Tizimga kiring'}
            </button>
          </p>
        </div>

        {/* Additional links */}
        {isLogin && (
          <div className="text-center mt-4">
            <button className="text-sm text-gray-500 hover:text-gray-700 transition duration-200">
              Parolni unutdingizmi?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;