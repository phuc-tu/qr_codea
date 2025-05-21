import React from 'react';
import QRGenerator from './QRGenerator';  // Thêm dòng này


const Cart = ({ cartItems = [], onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: 16 }}>
      <h3>Giỏ hàng</h3>
      {cartItems.length === 0 ? (
        <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
      ) : (
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx}>
              {item.name} - {item.price.toLocaleString()} đ
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: 12 }}>
        <b>Tổng cộng: {total.toLocaleString()} đ</b>
      </div>
      <button
        style={{
          marginTop: 16,
          background: 'red',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '8px 24px',
          cursor: 'pointer'
        }}
        onClick={onCheckout}
        disabled={cartItems.length === 0}
      >
        Thanh toán
      </button>
    </div>
  );
};

export default Cart;