import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRGenerator = ({ tableNumber }) => {
  // Sau khi deploy, thay bằng URL của Vercel
    const siteUrl = 'https://qr-codea.vercel.app';

  const tableUrl = `${siteUrl}/ban/${tableNumber}`;

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <QRCodeSVG
        value={tableUrl}
        size={200}
        level="H"
      />
      <div style={{ marginTop: 10 }}>
        Bàn số {tableNumber}
      </div>
    </div>
  );
};

export default QRGenerator;