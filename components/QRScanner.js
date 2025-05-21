import React from 'react';
import QrReader from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      try {
        const info = JSON.parse(data.text);
        if (info.ban) {
          navigate(`/ban/${info.ban}`);
        } else {
          alert('Mã QR không hợp lệ!');
        }
      } catch {
        alert('Mã QR không hợp lệ!');
      }
    }
  };

  const handleError = () => {
    alert('Lỗi camera hoặc không thể quét QR!');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2 >Quét mã QR để vào menu bàn</h2>
    
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default QRScanner;