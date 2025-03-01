import React, { useState } from 'react';
import '../styles/LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // 응답 상태 코드 확인
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`); // HTTP 상태 코드로 에러 처리
      }

      // Content-Type 확인 및 JSON 파싱
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (data.name) {
          localStorage.setItem('username', data.name);
          onLogin(data.name); // 사용자 이름 넘기기
        } else {
          throw new Error('로그인에 실패했습니다.');
        }
      } else {
        throw new Error('서버에서 유효하지 않은 데이터를 반환했습니다.');
      }
    } catch (err) {
      setError(err.message); // 사용자에게 표시할 에러 메시지 업데이트
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="username">사용자 이름</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;