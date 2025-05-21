import React from 'react';
import QRGenerator from '../../components/QRGenerator';

const QRManagement = () => {
  // Tạo mảng 4 bàn
  const tables = [1, 2, 3, 4];

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: 'center', color: '#00b050' }}>Mã QR cho các bàn</h2>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 20,
        padding: 20
      }}>
        {tables.map(tableNumber => (
          <div key={tableNumber} style={{
            border: '1px solid #eee',
            borderRadius: 12,
            padding: 15,
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <QRGenerator tableNumber={tableNumber} />
            <div style={{ marginTop: 10, fontWeight: 'bold' }}>
              Bàn {tableNumber}
            </div>
            <div style={{ color: '#666', fontSize: 14 }}>
              Quét mã để xem menu và đặt món
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRManagement;