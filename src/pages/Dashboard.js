import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeatChart from '../components/SeatChart';
import MyReservations from '../components/MyReservations';

const Dashboard = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [seats, setSeats] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    axios.get(`${API_URL}/seats`)
      .then(response => {
        setSeats(response.data); 
      })
      .catch(error => {
        console.error('좌석 정보를 가져오는 데 실패했습니다:', error);
      });
  }, [API_URL]);

  if (!userName) {
    return <p>로그인 후 이용해주세요.</p>;
  }

  return (
    <div>
      <h2>대시보드</h2>
      <p>{userName && `${userName}님, 로그인 성공!`}</p>

      {seats.length === 0 ? (
        <p>좌석 정보가 없습니다.</p>
      ) : (
        <>
          <SeatChart seats={seats} userName={userName} />
          <MyReservations userName={userName} />
        </>
      )}
    </div>
  );
};

export default Dashboard;