// Ví dụ hàm lấy menu từ server (giả lập)
export const fetchMenu = async () => {
  // Thay bằng gọi API thực tế nếu có
  return [
    { id: 1, name: 'Burger Bò Hoàng Gia Đặc Biệt', desc: 'Burger bò và phô mai cỡ lớn', price: 89000 },
    { id: 2, name: 'Burger Xúc Xích', desc: 'Burger kèm xúc xích miếng', price: 36000 },
    { id: 3, name: 'Burger Gà Nhỏ Mayo', desc: 'Burger gà chiên, xốt mayo', price: 36000 },
    { id: 4, name: 'Burger Hai Lớp Bò, Phô Mai', desc: 'Burger 2 miếng bò và phô mai', price: 99000 },
  ];
};

// Ví dụ hàm gửi đơn hàng (giả lập)
export const sendOrder = async (tableId, cartItems) => {
  // Thay bằng gọi API thực tế nếu có
  return {
    success: true,
    message: `Đã gửi đơn hàng cho bàn số ${tableId}`,
    data: cartItems,
  };
};