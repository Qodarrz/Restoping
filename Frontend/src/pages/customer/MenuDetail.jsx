import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMenu } from "../../api";
import MenuImage from "../../components/CustomerComponents/MenuDetailsComponents/MenuImage";
import MenuDetailInfo from "../../components/CustomerComponents/MenuDetailsComponents/MenuDetailInfo";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/ErrorDisplay";

const MenuDetail = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuDetail = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getMenu(id);
      setMenu(response);
    } catch (error) {
      console.error("Error fetching menu details:", error);
      setError("Failed to load menu details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError("Invalid menu ID");
      setIsLoading(false);
      return;
    }
    fetchMenuDetail();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price ?? 0);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={fetchMenuDetail} />;
  }

  if (!menu) {
    return <ErrorDisplay error="Menu not found" onRetry={fetchMenuDetail} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      {/* Kartu utama */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Gambar tetap di dalam card */}
        <div className="w-full">
          <MenuImage
            image={menu.image}
            name={menu.name}
            size="lg"
            className="w-full"
          />
        </div>

        {/* Konten detail */}
        <div className="p-6 md:p-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{menu.name}</h1>
            <p className="text-lg text-gray-600">{menu.description}</p>

            <div className="space-y-3 mt-4">
              <MenuDetailInfo
                label="Ingredients"
                value={menu.menu_detail?.ingredients}
              />
              <MenuDetailInfo
                label="Calories"
                value={
                  menu.menu_detail?.calories &&
                  `${menu.menu_detail.calories} kcal`
                }
              />
              <MenuDetailInfo
                label="Serving Size"
                value={menu.menu_detail?.serving_size}
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-2xl font-semibold text-gray-900">
                {formatPrice(menu.price)}
              </p>
              <button className="bg-[#2E8B57] text-white px-6 py-3 rounded-lg hover:bg-[#539770] transition duration-200 shadow-md hover:shadow-lg">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
