import React from 'react';
import QRGenerator from '../../components/QRGenerator';

const QRManagement = () => {
  const tables = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý mã QR cho các bàn</h2>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 20
      }}>
        {tables.map(tableNumber => (
          <div key={tableNumber}>
            <QRGenerator tableNumber={tableNumber} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRManagement;