import React from 'react';

const MenuList = ({ menu = [], onShowDetail }) => {
  return (
    <div>
      {menu.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid #eee',
            borderRadius: 12,
            margin: '8px 0',
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            background: '#fafafa',
            justifyContent: 'space-between'
          }}
        >
          {/* Hiển thị ảnh thumbnail */}
          <img
            src={item.img}
            alt={item.name}
            style={{
              width: 56,
              height: 56,
              objectFit: 'cover',
              borderRadius: 8,
              marginRight: 16,
              border: '1px solid #ddd'
            }}
          />
          <div style={{ flex: 1 }}>
            <b>{item.name}</b>
            <div style={{ fontSize: 13, color: '#555' }}>Mô tả: {item.desc}</div>
            <div style={{ color: 'red', fontWeight: 'bold' }}>
              {item.price.toLocaleString()} đ
            </div>
          </div>
          <button
            onClick={() => onShowDetail(item)}
            style={{
              background: 'red',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 16px',
              cursor: 'pointer',
              marginLeft: 8,
              fontWeight: 'bold'
            }}
          >
            Thêm
          </button>
        </div>
      ))}
    </div>
  );
};

export default MenuList;