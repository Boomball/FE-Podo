import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeatChart from '../components/SeatChart';
import MyReservations from '../components/MyReservations';


const Dashboard = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [seats, setSeats] = useState([]);
  const [userName, setUserName] = useState(''); // 유저네임 상태 추가

  // 유저네임 설정 (로그인 후)
  const handleLogin = (username) => {
    setUserName(username);
  };

  useEffect(() => {
    // 좌석 정보 가져오기
    axios.get(`${API_URL}/seats`)
      .then(response => {
        setSeats(response.data); // 가져온 데이터로 상태 업데이트
      })
      .catch(error => {
        console.error('좌석 정보를 가져오는 데 실패했습니다:', error);
      });
  }, [API_URL]);

  return (
    <div>
      <h2>대시보드</h2>
      <p>로그인 성공 후 여기에 대시보드 내용이 표시됩니다.</p>

      {/* 로그인 후 유저네임 설정 버튼*/}
      {/* 로그인 한 아이디가 유저네임이 되는게 정상인 것 같은데 지금 서버 연동이 안되어있어서 이렇게 개발 진행중 */}
      <button onClick={() => handleLogin('kng')}>로그인 (kng)</button>
      {/* 유저네임이 있을 경우 좌석 차트 표시 */}
      {userName && (
        <>
          <SeatChart seats={seats} userName={userName} />
          <MyReservations userName={userName} />
        </>
        
      )}
    </div>
  );
};

export default Dashboard;