import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import Soban from './ban/soban';
import QRManagement from './admin/QRManagement';  // Thêm dòng này

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/scan" element={<QRScanner />} />
      <Route path="/ban/:id" element={<Soban />} />
      <Route path="/admin/qr" element={<QRManagement />} />  {/* Thêm route cho trang quản lý QR */}
      <Route path="*" element={
        <div style={{textAlign:'center',marginTop:40}}>
          <h2>Chào mừng đến Menu QR!</h2>
          <p>Vào <b>/scan</b> để quét mã QR.</p>
        </div>
      } />
    </Routes>
  </BrowserRouter>
);

export default App;