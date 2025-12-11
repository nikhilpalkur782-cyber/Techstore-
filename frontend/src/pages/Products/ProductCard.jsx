import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <section className="relative overflow-hidden">
        <Link to={`/product/${p._id}`}>
          <img
            className="cursor-pointer w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            src={p.image}
            alt={p.name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x300/f0f0f0/666666?text=Product+Image";
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </Link>
        <div className="absolute top-4 right-4">
          <HeartIcon product={p} />
        </div>
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
            {p?.brand}
          </span>
        </div>
      </section>

      <div className="p-6">
        <Link to={`/product/${p._id}`} className="block">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors">
            {p?.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {p?.description?.substring(0, 80)}...
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-pink-600">
              {p?.price?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <button
              className="p-2 rounded-full"
              onClick={() => addToCartHandler(p, 1)}
            >
              <AiOutlineShoppingCart size={25} />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Premium Quality</span>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">4.5</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 group-hover:scale-105">
              View Details
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
