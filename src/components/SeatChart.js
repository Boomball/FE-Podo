import React from 'react';

const SeatChart = ({ seats }) => {
  const seatButtons = seats.map((seat) => {
    const seatLabel = `${seat.seatRow}${seat.seatColumn}`; // 행과 열 정보를 합친 문자열
    const seatStatus = seat.status;

    return (
      <button
        key={seat.id}
        style={{
          width: '40px',
          height: '40px',
          margin: '2px',
          backgroundColor: seatStatus === 'AVAILABLE' ? 'purple' : 'gray',
        }}
        disabled={seatStatus !== 'AVAILABLE'}
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