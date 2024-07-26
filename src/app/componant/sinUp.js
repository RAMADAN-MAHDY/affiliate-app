'use client'
import React, { useState } from 'react';

const SignUpComponent = ({ onSignin }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState("تأكيد انشاء الحساب");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
      setError('البريد الإلكتروني غير صالح');
      return;
    }

    // التحقق من قوة كلمة المرور
    if (password.length < 6) {
      setError('كلمة السر يجب أن تكون أكثر من 6 أرقام أو أحرف');
      return;
    }

    // التحقق من تطابق كلمتي المرور
    if (password !== confirmPassword) {
      setError('كلمة السر غير متطابقة');
      return;
    }

    if (!email || !code) {
      setError('تأكد من إدخال البريد الإلكتروني والكود');
      return;
    }

    setLoading("جاري إنشاء الحساب...");

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, code }),
      });

      if (!response.ok) {
        setLoading("تأكيد إنشاء الحساب");
        throw new Error('فشل في إنشاء الحساب');
      }

      // إعادة تعيين الحقول بعد التسجيل
      setEmail('');
      setCode('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setLoading("تم إنشاء الحساب بنجاح");
      alert('تم إنشاء حسابك بنجاح');
    } catch (err) {
      console.error(err.message);
      setLoading("تأكيد إنشاء الحساب");
      setError('حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.');
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-80 ml-[10%] lg:ml-[20%]">
      <h2 className="text-2xl font-bold mb-4 text-center">إنشاء حساب</h2>
      <input
        required
        type="text"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <input
        required
        type="password"
        placeholder="كلمة السر"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <input
        required
        type="password"
        placeholder="تأكيد كلمة السر"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <input
        required
        type="number"
        placeholder="الكود"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSignUp}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {loading}
      </button>
      <button
        onClick={() => onSignin()}
        className="w-full mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        تسجيل الدخول
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default SignUpComponent;
