// filepath: f:\maqr\fe\src\components\FoodDetailModal.js
import React, { useState, useEffect } from 'react';

const FoodDetailModal = ({ open, onClose, food, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setQuantity(1);
    setSelectedOptions([]);
  }, [food]);

  if (!open || !food) return null;

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleAdd = () => {
    onAddToCart({
      ...food,
      quantity,
      selectedOptions
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.3)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', borderRadius: 12, maxWidth: 350, width: '100%',
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)', padding: 0, position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 8, right: 12, background: 'transparent', border: 'none', fontSize: 22, cursor: 'pointer'
        }}>×</button>
        <img src={food.img} alt={food.name} style={{ width: '100%', borderRadius: '12px 12px 0 0', objectFit: 'cover', maxHeight: 180 }} />
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 'bold', fontSize: 20 }}>{food.name}</div>
          <div style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>Loại: {food.category === 'hamburger' ? 'Hamburger' : food.category === 'coffee' ? 'Cà phê' : food.category === 'tea' ? 'Trà' : 'Đồ ăn nhẹ'}</div>
          <div style={{ color: 'red', fontWeight: 'bold', fontSize: 18 }}>{food.price.toLocaleString()}đ</div>
          <div style={{ margin: '10px 0' }}>
            <span style={{ fontWeight: 'bold' }}>Số lượng: </span>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ margin: '0 8px', fontSize: 18 }}>-</button>
            <span style={{ fontWeight: 'bold', fontSize: 16 }}>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} style={{ margin: '0 8px', fontSize: 18 }}>+</button>
          </div>
          <div style={{ fontSize: 14, marginBottom: 8 }}>
            <span style={{ fontWeight: 'bold' }}>Mô tả: </span>{food.desc}
          </div>
          {food.options && food.options.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 'bold', color: '#222' }}>Món ăn kèm <span style={{ color: 'red' }}>(*)</span></div>
              <div style={{ color: '#888', fontSize: 13, marginBottom: 4 }}>Vui lòng chọn một/một số thuộc tính bên dưới!</div>
              {food.options.map(option => (
                <label key={option} style={{ marginRight: 12, fontSize: 15 }}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                  /> {option}
                </label>
              ))}
            </div>
          )}
          <button
            onClick={handleAdd}
            style={{
              width: '100%',
              background: 'red',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '12px 0',
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 8,
              cursor: 'pointer'
            }}
          >
            Thêm vào giỏ hàng ({(food.price * quantity).toLocaleString()}đ)
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailModal;