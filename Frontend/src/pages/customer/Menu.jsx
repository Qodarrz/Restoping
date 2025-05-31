import { useState, useEffect } from "react";
import { getMenus } from "../../api";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { SweetAlertInstance } from "../../components/SweetAlert";
import CategoryTabs from "../../components/CustomerComponents/MenuComponents/CategoryTabs";
import MenuCard from "../../components/CustomerComponents/MenuComponents/MenuCard";
import ShoppingCart from "../../components/CustomerComponents/MenuComponents/ShoppingCart";
import EmptyState from "../../components/CustomerComponents/MenuComponents/EmptyState";
import Loading from "../../components/Loading";

const CART_STORAGE_KEY = "cart";

const Menu = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartInitialized, setCartInitialized] = useState(false);

  const role = "customer";

  useEffect(() => {
    fetchMenus();
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    filterMenusByCategory();
  }, [menus, activeCategory]);

  const isCartExpired = (savedData) => {
    if (!savedData || !savedData.timestamp) return true;
    const now = new Date().getTime();
    const threeMinutes = 3 * 60 * 1000;
    return now - savedData.timestamp > threeMinutes;
  };

  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (isCartExpired(parsedCart)) {
          localStorage.removeItem(CART_STORAGE_KEY);
          setCartItems([]);
        } else {
          setCartItems(Array.isArray(parsedCart.items) ? parsedCart.items : []);
        }
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
      setCartItems([]);
    } finally {
      setCartInitialized(true);
    }
  };

  useEffect(() => {
    if (!cartInitialized) return;

    try {
      const cartData = {
        items: cartItems,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  }, [cartItems, cartInitialized]);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMenus();

      let menuData = [];
      if (response) {
        if (response.data) {
          menuData = response.data;
        } else if (Array.isArray(response)) {
          menuData = response;
        } else if (response.menus) {
          menuData = response.menus;
        }
      }

      if (menuData && menuData.length > 0) {
        setMenus(menuData);
        const initialQuantities = {};
        menuData.forEach((menu) => {
          initialQuantities[menu.id] = 1;
        });
        setQuantities(initialQuantities);
      } else {
        setMenus([]);
        console.log("No menu data found");
      }
    } catch (err) {
      console.error("Error fetching menus:", err);
      setError(`Failed to load menus: ${err.message}`);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  const filterMenusByCategory = () => {
    if (activeCategory === "all") {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter((menu) => menu.category === activeCategory);
      setFilteredMenus(filtered);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleNavigateToDetail = (menuId) => {
    navigate(`/customer/menus/${menuId}`);
  };

  const handleQuantityChange = (menuId, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [menuId]: newQuantity,
    }));
  };

  const handleAddToCart = (menu, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault(); // Tambahkan ini untuk memastikan
    }

    const quantity = quantities[menu.id] || 1;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === menu.id
      );

      // Jika item sudah ada, update quantity-nya
      if (existingItemIndex >= 0) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Jika item belum ada, tambahkan baru
      else {
        return [
          ...prevItems,
          {
            id: menu.id,
            name: menu.name,
            price: menu.price,
            image: menu.image,
            quantity: quantity,
          },
        ];
      }
    });

    // Tampilkan notifikasi
    SweetAlertInstance.fire({
      title: "Added to Cart!",
      text: `${menu.name} (${quantity}) has been added to your cart.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });

    setQuantities((prev) => ({
      ...prev,
      [menu.id]: 1,
    }));
  };

  const handleUpdateCartItem = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

    SweetAlertInstance.fire({
      title: "Removed from Cart",
      text: "Item has been removed from your cart.",
      icon: "info",
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      SweetAlertInstance.fire({
        title: "Cart is Empty",
        text: "Please add items to your cart before checkout.",
        icon: "warning",
      });
      return;
    }

    navigate("/customer/order", { state: { cartItems } });
    setShowCart(false);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] py-10 px-4 sm:px-6 flex items-center justify-center">
        < Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-10 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
            Discover Our Delicious Menu
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our carefully crafted selection of food and drinks made with
            fresh ingredients and love.
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {error && (
            <div className="col-span-full">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchMenus}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!error && !loading && filteredMenus.length > 0
            ? filteredMenus.map((menu) => (
                <MenuCard
                  key={menu.id}
                  menu={{ ...menu, price: Number(menu.price) }} // <--- konversi di sini
                  role={role}
                  quantities={quantities}
                  onNavigate={() => handleNavigateToDetail(menu.id)}
                  onAddToCart={(e) => handleAddToCart(menu, e)}
                  onQuantityChange={handleQuantityChange}
                />
              ))
            : !error &&
              !loading && (
                <EmptyState
                  message={
                    activeCategory === "all"
                      ? "No menus available at the moment"
                      : `No ${activeCategory} menus available at the moment`
                  }
                  actionText="Browse Other Categories"
                  onAction={() => setActiveCategory("all")}
                  showAction={activeCategory !== "all"}
                />
              )}
        </div>
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="fixed bottom-8 right-8 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition flex items-center justify-center z-40"
      >
        <FaShoppingCart className="text-xl" />
        {getTotalCartItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {getTotalCartItems()}
          </span>
        )}
      </button>

      {/* Shopping Cart Dropdown */}
      {showCart && (
        <ShoppingCart
          items={cartItems}
          onUpdateItem={handleUpdateCartItem}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
};

export default Menu;
