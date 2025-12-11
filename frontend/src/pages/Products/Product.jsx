import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300/f0f0f0/666666?text=Product+Image";
          }}
        />
        <div className="absolute top-4 right-4">
          <HeartIcon product={product} />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>

      <div className="p-6">
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-pink-600">
              {product.price?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
              {product.brand}
            </span>
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
        </Link>
      </div>
    </div>
  );
};

export default Product;
