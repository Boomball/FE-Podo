import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');  // 로그인 성공 시 대시보드 페이지로 이동
  };

  return (
    <div>
      <LoginForm onLogin={handleLoginSuccess} />
    </div>
  );
};

export default Home;