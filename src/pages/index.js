import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import Soban from './ban/soban';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/scan" element={<QRScanner />} />
      <Route path="/ban/:id" element={<Soban />} />
      {/* Thêm các route khác nếu cần */}
    </Routes>
  </BrowserRouter>
);

export default App;