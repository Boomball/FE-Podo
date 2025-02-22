import React, { useState } from 'react';
import axios from 'axios';

const MyReservations = ({ userName }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [mySeats, setMySeats] = useState([]);
  const [showSeats, setShowSeats] = useState(false); // 버튼 클릭 시 토글

  const fetchMySeats = () => {
    axios.get(`${API_URL}/users/${userName}/seats`)
      .then(response => {
        setMySeats(response.data);
        setShowSeats(true); // 데이터를 가져오면 표시
      })
      .catch(error => {
        console.error('내 예약 정보를 가져오는 데 실패했습니다:', error);
      });
  };

  return (
    <div>
      <button onClick={fetchMySeats}>내 예약 확인</button>
      {showSeats && (
        <div>
          <h3>내가 예약한 좌석</h3>
          {mySeats.length > 0 ? (
            <ul>
              {mySeats.map(seat => (
                <li key={seat.id}>
                  {seat.seatRow}행 {seat.seatColumn}열
                </li>
              ))}
            </ul>
          ) : (
            <p>예약된 좌석이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReservations;