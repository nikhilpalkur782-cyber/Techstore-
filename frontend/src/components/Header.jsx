import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Unable to load featured products</h2>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            TechStore
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">
            Premium Electronics & Gadgets
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 transition-colors duration-300">
            Discover the latest in technology with unbeatable prices
          </p>
        </div>

        {/* Featured Products Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Side - Small Products Grid */}
          <div className="hidden lg:block">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">
              Top Picks
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {data?.slice(0, 2).map((product) => (
                <div key={product._id} className="transform hover:scale-105 transition-transform duration-200">
                  <SmallProduct product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Center - Product Carousel */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
              <ProductCarousel />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">25+</div>
            <div className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Premium Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">5★</div>
            <div className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">Free</div>
            <div className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Shipping</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
