import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MenuList from "../../components/MenuList";
import Cart from "../../components/Cart";
import FoodDetailModal from "../../components/FoodDetailModal";

const ITEMS_PER_PAGE = 8;

const CATEGORIES = [
    { key: "all", label: "Tất cả", icon: "🍽️" },
    { key: "meals", label: "Đồ ăn", icon: "🍚" },
    { key: "coffee", label: "Cà phê", icon: "☕" },
    { key: "tea", label: "Trà", icon: "🫖" },
    { key: "snacks", label: "Đồ ăn nhẹ", icon: "🥨" },
    { key: "desserts", label: "Tráng miệng", icon: "🍰" }
];

const MENU = [
    // Đồ ăn
    {
        id: 1,
        name: "Cơm gà xối mỡ",
        desc: "Cơm với gà rán giòn",
        price: 45000,
        category: "meals",
        img: "/img/1.jpg",
        options: ["Thêm cơm", "Thêm trứng", "Rau thêm", "Tương ớt"]
    },
    {
        id: 2,
        name: "Phở bò tái",
        desc: "Phở bò với nước dùng đặc biệt",
        price: 50000,
        category: "meals",
        img: "/img/1.jpg",
        options: ["Thêm bò", "Thêm bánh", "Giá thêm", "Hành nhiều"]
    },
    {
        id: 3,
        name: "Bún chả",
        desc: "Bún chả Hà Nội truyền thống",
        price: 45000,
        category: "meals",
        img: "/img/1.jpg",
        options: ["Thêm bún", "Thêm chả", "Nhiều rau", "Ớt thêm"]
    },
    {
        id: 4,
        name: "Mì xào hải sản",
        desc: "Mì xào với hải sản tươi",
        price: 55000,
        category: "meals",
        img: "/img/1.jpg",
        options: ["Thêm mì", "Hải sản thêm", "Rau nhiều", "Cay"]
    },

    // Cà phê
    {
        id: 5,
        name: "Cà phê đen đá",
        desc: "Cà phê nguyên chất",
        price: 20000,
        category: "coffee",
        img: "/img/2.jpg",
        options: ["Đá nhiều", "Đá ít", "Đường nhiều", "Đường ít"]
    },
    {
        id: 6,
        name: "Cà phê sữa đá",
        desc: "Cà phê pha sữa đặc",
        price: 25000,
        category: "coffee",
        img: "/img/2.jpg",
        options: ["Đá nhiều", "Đá ít", "Sữa nhiều", "Sữa ít"]
    },
    {
        id: 7,
        name: "Bạc xỉu",
        desc: "Cà phê sữa tươi béo",
        price: 30000,
        category: "coffee",
        img: "/img/2.jpg",
        options: ["Đá nhiều", "Đá ít", "Sữa nhiều", "Sữa ít"]
    },
    {
        id: 8,
        name: "Cà phê mocha",
        desc: "Cà phê pha socola",
        price: 35000,
        category: "coffee",
        img: "/img/2.jpg",
        options: ["Đá nhiều", "Đá ít", "Kem nhiều", "Kem ít"]
    },

    // Trà
    {
        id: 9,
        name: "Trà đào",
        desc: "Trà đào tươi mát",
        price: 30000,
        category: "tea",
        img: "/img/3.jpg",
        options: ["Đào nhiều", "Đá nhiều", "Đường nhiều", "Đường ít"]
    },
    {
        id: 10,
        name: "Trà sữa trân châu",
        desc: "Trà sữa với trân châu đường đen",
        price: 35000,
        category: "tea",
        img: "/img/3.jpg",
        options: ["Trân châu nhiều", "Đá nhiều", "Đường nhiều", "Đường ít"]
    },
    {
        id: 11,
        name: "Trà chanh",
        desc: "Trà chanh mật ong",
        price: 25000,
        category: "tea",
        img: "/img/3.jpg",
        options: ["Chanh nhiều", "Đá nhiều", "Đường nhiều", "Đường ít"]
    },
    {
        id: 12,
        name: "Trà gừng",
        desc: "Trà gừng nóng",
        price: 25000,
        category: "tea",
        img: "/img/3.jpg",
        options: ["Gừng nhiều", "Nóng", "Đường nhiều", "Đường ít"]
    },

    // Đồ ăn nhẹ
    {
        id: 13,
        name: "Bánh mì thịt",
        desc: "Bánh mì kẹp thịt và rau",
        price: 25000,
        category: "snacks",
        img: "/img/4.jpg",
        options: ["Thêm thịt", "Thêm rau", "Ớt", "Tương ớt"]
    },
    {
        id: 14,
        name: "Khoai tây chiên",
        desc: "Khoai tây chiên giòn",
        price: 30000,
        category: "snacks",
        img: "/img/4.jpg",
        options: ["Nhiều muối", "Ít muối", "Tương ớt", "Mayonnaise"]
    },
    {
        id: 15,
        name: "Gà rán",
        desc: "Cánh gà rán giòn",
        price: 45000,
        category: "snacks",
        img: "/img/4.jpg",
        options: ["Cay", "Không cay", "Tương ớt", "Mayonnaise"]
    },
    {
        id: 16,
        name: "Xúc xích",
        desc: "Xúc xích Đức nướng",
        price: 35000,
        category: "snacks",
        img: "/img/4.jpg",
        options: ["Tương ớt", "Tương cà", "Mayonnaise", "Mustard"]
    },

    // Tráng miệng
    {
        id: 17,
        name: "Chè thái",
        desc: "Chè thái thập cẩm",
        price: 30000,
        category: "desserts",
        img: "/img/4.jpg",
        options: ["Thêm đá", "Ít đá", "Thêm sữa", "Ít sữa"]
    },
    {
        id: 18,
        name: "Flan",
        desc: "Bánh flan caramel",
        price: 25000,
        category: "desserts",
        img: "/img/4.jpg",
        options: ["Thêm caramel", "Ít caramel", "Thêm đá", "Không đá"]
    },
    {
        id: 19,
        name: "Trái cây dầm",
        desc: "Trái cây dầm sữa chua",
        price: 35000,
        category: "desserts",
        img: "/img/4.jpg",
        options: ["Nhiều trái cây", "Nhiều sữa chua", "Thêm đá", "Ít đá"]
    },
    {
        id: 20,
        name: "Yaourt",
        desc: "Yaourt đá đường",
        price: 20000,
        category: "desserts",
        img: "/img/4.jpg",
        options: ["Thêm đường", "Ít đường", "Thêm đá", "Ít đá"]
    }
];

const Soban = () => {
    const { id } = useParams();
    const [cart, setCart] = useState([]);
    const [category, setCategory] = useState("all");
    const [showCart, setShowCart] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [foodDetail, setFoodDetail] = useState(null);
    const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
    const menuRef = useRef(null);

    const handleScroll = () => {
        if (!menuRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = menuRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredMenu.length));
        }
    };

    useEffect(() => {
        setVisibleItems(ITEMS_PER_PAGE);
    }, [category]);

    const handleAddToCart = (item) => {
        setCart([...cart, {...item, quantity: 1}]);
    };

    const handleCheckout = () => {
        setShowCart(false);
        setShowSuccess(true);
        setCart([]);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const filteredMenu = category === "all" 
        ? MENU 
        : MENU.filter(item => item.category === category);

    const displayedMenu = filteredMenu.slice(0, visibleItems);

    return (
        <div style={{ 
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#f5f5f5"
        }}>
            {/* Header */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                background: "white",
                zIndex: 50,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
                <h2 style={{ 
                    margin: 0,
                    padding: "12px",
                    textAlign: "center", 
                    color: "#00b050",
                    fontSize: "18px",
                    borderBottom: "1px solid #eee"
                }}>
                    - Bàn số {id} -
                </h2>

                {/* Categories */}
                <div style={{
                    display: "flex",
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                    padding: "10px",
                    gap: 10,
                    background: "white",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": { display: "none" }
                }}>
                    {CATEGORIES.map(cat => (
                        <div
                            key={cat.key}
                            onClick={() => setCategory(cat.key)}
                            style={{
                                padding: "10px 20px",
                                borderRadius: 20,
                                background: category === cat.key ? "#00b050" : "#f5f5f5",
                                color: category === cat.key ? "white" : "#333",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: "15px",
                                transition: "all 0.2s ease"
                            }}
                        >
                            <span style={{fontSize: "18px"}}>{cat.icon}</span>
                            <span>{cat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Menu Content with infinite scroll */}
<div 
    ref={menuRef}
    onScroll={handleScroll}
    style={{
        flex: 1,
        overflowY: "auto",
        marginTop: "110px", 
        marginBottom: "65px",
        padding: "0 10px",
        display: "flex",
        flexDirection: "column"
    }}
>
    <div style={{
        flex: "1 0 auto",
        minHeight: displayedMenu.length < 4 
            ? "calc(100vh - 175px)" 
            : "auto"
    }}>
        <MenuList menu={displayedMenu} onShowDetail={setFoodDetail} />
    </div>
    
    {visibleItems < filteredMenu.length && (
        <div style={{
            textAlign: "center",
            padding: "15px",
            color: "#666",
            fontSize: "14px"
        }}>
            Đang tải thêm...
        </div>
    )}
</div>
            {/* Cart Bar */}
            <div style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60px",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 15px",
                boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
                zIndex: 50
            }}>
                <div style={{
                    position: "relative",
                    fontSize: "28px"
                }}>
                    🛒
                    {cart.length > 0 && (
                        <span style={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            width: 20,
                            height: 20,
                            fontSize: 12,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {cart.length}
                        </span>
                    )}
                </div>
                <button 
                    onClick={() => setShowCart(true)}
                    disabled={cart.length === 0}
                    style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: 8,
                        padding: "12px 32px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: cart.length ? "pointer" : "not-allowed",
                        opacity: cart.length ? 1 : 0.6,
                        transition: "all 0.2s ease"
                    }}
                >
                    THANH TOÁN
                </button>
            </div>

            {/* Cart Modal */}
            {showCart && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0,0,0,0.5)",
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }} onClick={() => setShowCart(false)}>
                    <div style={{
                        background: "white",
                        width: "90%",
                        maxWidth: 350,
                        borderRadius: 8,
                        position: "relative"
                    }} onClick={e => e.stopPropagation()}>
                        <Cart cartItems={cart} onCheckout={handleCheckout} />
                        <button style={{
                            position: "absolute",
                            top: 8,
                            right: 12,
                            background: "transparent",
                            border: "none",
                            fontSize: 24,
                            cursor: "pointer"
                        }} onClick={() => setShowCart(false)}>×</button>
                    </div>
                </div>
            )}

            {/* Food Detail Modal */}
            <FoodDetailModal
                open={!!foodDetail}
                food={foodDetail}
                onClose={() => setFoodDetail(null)}
                onAddToCart={handleAddToCart}
            />

            {/* Success Message */}
            {showSuccess && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0,0,0,0.5)",
                    zIndex: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <div style={{
                        background: "white",
                        padding: "20px 30px",
                        borderRadius: 8,
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "green"
                    }}>
                        Đặt món thành công!
                    </div>
                </div>
            )}
        </div>
    );
};

export default Soban;