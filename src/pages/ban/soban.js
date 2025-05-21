import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MenuList from "../../components/MenuList";
import Cart from "../../components/Cart";
import FoodDetailModal from "../../components/FoodDetailModal";

const CATEGORIES = [
    { key: "all", label: "Tất cả" },
    { key: "hamburger", label: "Hamburger" },
    { key: "coffee", label: "Coffee" },
    { key: "tea", label: "Trà" },
    { key: "snack", label: "Đồ ăn nhẹ" },
];

const MENU = [
    // Hamburger
    {
        id: 1,
        name: "Burger Bò Hoàng Gia Đặc Biệt",
        desc: "Burger bò và phô mai cỡ lớn",
        price: 89000,
        category: "hamburger",
        img: "/img/1.jpg",
        options: ["Bắp cải trộn", "Bắp xào bơ", "Salad Mayo", "Salad sống"],
    },
    {
        id: 2,
        name: "Burger Xúc Xích",
        desc: "Burger kèm xúc xích miếng",
        price: 36000,
        category: "hamburger",
        img: "/img/1.jpg",
        options: ["Bắp cải trộn", "Bắp xào bơ", "Salad Mayo", "Salad sống"],
    },
    {
        id: 3,
        name: "Burger Gà Nhỏ Mayo",
        desc: "Burger gà chiên, xốt mayo",
        price: 36000,
        category: "hamburger",
        img: "/img/1.jpg",
        options: ["Bắp cải trộn", "Bắp xào bơ", "Salad Mayo", "Salad sống"],
    },
    {
        id: 4,
        name: "Burger Hai Lớp Bò, Phô Mai",
        desc: "Burger 2 miếng bò và phô mai",
        price: 99000,
        category: "hamburger",
        img: "/img/1.jpg",
        options: ["Bắp cải trộn", "Bắp xào bơ", "Salad Mayo", "Salad sống"],
    },

    // Coffee
    {
        id: 5,
        name: "Cà phê sữa",
        desc: "Cà phê pha với sữa đặc",
        price: 25000,
        category: "coffee",
        img: "/img/2.jpg",
        options: ["Đá", "Không đá", "Sữa đặc", "Không sữa"],
    },
    {
        id: 6,
        name: "Cà phê nóng",
        desc: "Cà phê đen nóng",
        price: 20000,
        category: "coffee",
        img: "/img/2.jpg",
        options: ["Đường", "Không đường"],
    },
    {
        id: 7,
        name: "Cà phê lạnh",
        desc: "Cà phê đen đá",
        price: 22000,
        category: "coffee",
        img: "/img/2.jpg",
        options: ["Đá", "Không đá"],
    },
    {
        id: 8,
        name: "Cà phê đen",
        desc: "Cà phê đen nguyên chất",
        price: 20000,
        category: "coffee",
        img: "/img/2.jpg",
        options: ["Đường", "Không đường"],
    },

    // Tea
    {
        id: 9,
        name: "Trà đào",
        desc: "Trà đào mát lạnh",
        price: 30000,
        category: "tea",
        img: "/img/3.jpg",
        options: ["Đào miếng", "Không đào", "Đá", "Không đá"],
    },
    {
        id: 10,
        name: "Trà sữa",
        desc: "Trà sữa trân châu",
        price: 32000,
        category: "tea",
        img: "/img/3.jpg",
        options: ["Trân châu", "Không trân châu", "Đá", "Không đá"],
    },
    {
        id: 11,
        name: "Trà chanh",
        desc: "Trà chanh tươi",
        price: 25000,
        category: "tea",
        img: "/img/3.jpg",
        options: ["Đá", "Không đá"],
    },
    {
        id: 12,
        name: "Trà xanh",
        desc: "Trà xanh nguyên chất",
        price: 20000,
        category: "tea",
        img: "/img/3.jpg",
        options: ["Đá", "Không đá"],
    },

    // Snack
    {
        id: 13,
        name: "Khoai tây chiên",
        desc: "Khoai tây chiên giòn",
        price: 30000,
        category: "snack",
        img: "/img/4.jpg",
        options: ["Tương ớt", "Tương cà", "Mayonnaise"],
    },
    {
        id: 14,
        name: "Gà viên chiên",
        desc: "Gà viên chiên xù",
        price: 35000,
        category: "snack",
        img: "/img/4.jpg",
        options: ["Tương ớt", "Tương cà", "Mayonnaise"],
    },
    {
        id: 15,
        name: "Phô mai que",
        desc: "Phô mai que chiên",
        price: 25000,
        category: "snack",
        img: "/img/4.jpg",
        options: ["Tương ớt", "Tương cà", "Mayonnaise"],
    },
    {
        id: 16,
        name: "Xúc xích Đức",
        desc: "Xúc xích Đức nướng",
        price: 40000,
        category: "snack",
        img: "/img/4.jpg",
        options: ["Tương ớt", "Tương cà", "Mayonnaise"],
    },
];

const Soban = () => {
    const { id } = useParams();
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [category, setCategory] = useState("all");
    const [showSuccess, setShowSuccess] = useState(false);
    const [foodDetail, setFoodDetail] = useState(null);

    const handleAddToCart = (item) => {
        if (item.quantity && item.quantity > 1) {
            setCart([
                ...cart,
                ...Array(item.quantity).fill({ ...item, quantity: 1 }),
            ]);
        } else {
            setCart([...cart, item]);
        }
    };

    const handleCheckout = () => {
        setShowCart(false);
        setShowSuccess(true);
        setCart([]);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const filteredMenu =
        category === "all"
            ? MENU
            : MENU.filter((item) => item.category === category);

    return (
        <div style={{ maxWidth: 600, margin: "20px auto", paddingBottom: 80 }}>
            <h2
                style={{ color: "green", marginBottom: 8, textAlign: "center" }}
            >
                - Bàn số {id} -
            </h2>
            {/* Tabs danh mục */}
            <div
                style={{
                    display: "flex",
                    overflowX: "auto",
                    marginBottom: 12,
                    justifyContent: "center",
                }}
            >
                {CATEGORIES.map((cat) => (
                    <div
                        key={cat.key}
                        onClick={() => setCategory(cat.key)}
                        style={{
                            minWidth: 90,
                            padding: "8px 0",
                            marginRight: 18,
                            textAlign: "center",
                            borderBottom:
                                category === cat.key
                                    ? "3px solid #00b050"
                                    : "3px solid transparent",
                            color: category === cat.key ? "#00b050" : "#333",
                            fontWeight:
                                category === cat.key ? "bold" : "normal",
                            cursor: "pointer",
                        }}
                    >
                        {cat.label}
                    </div>
                ))}
            </div>
            <div
                style={{
                    fontWeight: "bold",
                    color: "#00b050",
                    marginBottom: 8,
                }}
            >
                {CATEGORIES.find((c) => c.key === category)?.label}
            </div>
            <MenuList menu={filteredMenu} onShowDetail={setFoodDetail} />
            {/* Thanh giỏ hàng */}
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "#fff",
                    borderTop: "1px solid #eee",
                    padding: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    zIndex: 10,
                }}
            >
                <div
                    style={{
                        fontSize: 22,
                        color: "red",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <span role="img" aria-label="cart">
                        🛒
                    </span>
                    <span style={{ marginLeft: 4 }}>{cart.length}</span>
                </div>
                <button
                    style={{
                        background: "red",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "8px 24px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                    onClick={() => setShowCart(true)}
                    disabled={cart.length === 0}
                >
                    Thanh toán
                </button>
            </div>
            {/* Popup giỏ hàng */}
            {showCart && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.3)",
                        zIndex: 100,
                    }}
                    onClick={() => setShowCart(false)}
                >
                    <div
                        style={{
                            background: "#fff",
                            maxWidth: 350,
                            margin: "60px auto",
                            borderRadius: 8,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            position: "relative",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Cart cartItems={cart} onCheckout={handleCheckout} />
                        <button
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 12,
                                background: "transparent",
                                border: "none",
                                fontSize: 22,
                                cursor: "pointer",
                            }}
                            onClick={() => setShowCart(false)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
            {/* Popup chi tiết món ăn */}
            <FoodDetailModal
                open={!!foodDetail}
                food={foodDetail}
                onClose={() => setFoodDetail(null)}
                onAddToCart={handleAddToCart}
            />
            {/* Thông báo thanh toán thành công */}
            {showSuccess && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.2)",
                        zIndex: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            padding: "32px 40px",
                            borderRadius: 12,
                            boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                            fontSize: 22,
                            color: "green",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Bạn đã thanh toán thành công!
                    </div>
                </div>
            )}
        </div>
    );
};

export default Soban;