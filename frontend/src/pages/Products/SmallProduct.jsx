import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200/f0f0f0/666666?text=Product+Image";
          }}
        />
        <div className="absolute top-3 right-3">
          <HeartIcon product={product} />
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`} className="block hover:text-pink-600 transition-colors">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-pink-600">
              {product.price?.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-1 rounded-full">
              {product.brand}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
