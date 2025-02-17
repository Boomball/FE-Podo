import React, { useState } from 'react';
import axios from 'axios';

const SeatChart = ({ seats, userName, onSeatClick }) => {
  // 좌석의 상태를 상태로 관리할 수 있도록 useState 사용
  const [updatedSeats, setUpdatedSeats] = useState(seats);

  // 좌석 클릭 시 실행되는 함수
  const handleSeatClick = (id) => {
    const updatedSeat = updatedSeats.find((seat) => seat.id === id);
    if (updatedSeat.status !== 'AVAILABLE') return; // 이미 예약된 좌석은 클릭 불가능

    // 백엔드로 좌석 예약 요청 보내기
    axios.post(`http://localhost:8080/api/users/${userName}/reserve/${id}`)
      .then((response) => {
        // 백엔드 요청이 성공했을 때 처리
        console.log('좌석 예약 성공:', response.data);
        
        // 서버에서 갱신된 좌석 상태를 받아와서 상태 업데이트
        axios.get('http://localhost:8080/api/seats')  // 좌석 상태를 다시 가져오는 API 호출
          .then((response) => {
            setUpdatedSeats(response.data);  // 서버에서 받은 데이터로 상태 업데이트
          })
          .catch((error) => {
            console.error('좌석 상태 업데이트 실패:', error);
          });
        
        if (onSeatClick) {
          onSeatClick(id); // 추가적인 처리 (예: 클릭된 좌석 정보 전달)
        }
      })
      .catch((error) => {
        // 오류가 발생했을 때 처리
        console.error('좌석 예약 실패:', error);
      });
  };

  const seatButtons = updatedSeats.map((seat) => {
    const seatLabel = `${seat.seatRow}${seat.seatColumn}`; // 행과 열 정보를 합친 문자열
    const seatStatus = seat.status;

    return (
      <button
        key={seat.id}
        style={{
          width: '40px',
          height: '40px',
          margin: '2px',
          backgroundColor: seatStatus === 'AVAILABLE' ? 'purple' : seatStatus === 'RESERVED' ? 'orange' : 'gray',
        }}
        disabled={seatStatus !== 'AVAILABLE'}
        onClick={() => handleSeatClick(seat.id)} // 클릭 이벤트 핸들러 추가
      >
        {seatLabel} {/* 버튼 안에 행과 열을 표시 */}
      </button>
    );
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {seatButtons}
    </div>
  );
};

export default SeatChart;