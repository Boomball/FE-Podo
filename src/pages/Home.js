import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard'); // 로그인 후 대시보드 페이지로 이동
    }
  }, [isLoggedIn, navigate]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
  };

  return (
    <div>
      {!isLoggedIn && <LoginForm onLogin={handleLoginSuccess} />}
    </div>
  );
};

export default Home;