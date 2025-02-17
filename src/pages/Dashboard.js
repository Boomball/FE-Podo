import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeatChart from '../components/SeatChart'

const Dashboard = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/seats')
      .then(response => {
        setSeats(response.data);
      })
      .catch(error => {
        console.error('좌석 정보를 가져오는 데 실패했습니다:', error);
      });
  }, []);

  return (
    <div>
      <h2>대시보드</h2>
      <p>로그인 성공 후 여기에 대시보드 내용이 표시됩니다.</p>
      
      {/* 좌석 차트 컴포넌트에 좌석 데이터 전달 */}
      <SeatChart seats={seats} />
    </div>
  );
};

export default Dashboard;