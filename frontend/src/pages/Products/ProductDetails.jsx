import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaCheck,
  FaTruck,
  FaUndo,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to cart!");
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Message variant="danger">
              {error?.data?.message || error.message}
            </Message>
          </div>
        ) : (
          <>
            {/* Product Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Product Image - Left */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300 relative">
                  <div className="absolute top-4 right-4 z-10">
                    <HeartIcon product={product} />
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[500px] object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800x500/f0f0f0/666666?text=Product+Image";
                    }}
                  />
                </div>

                {/* Product Highlights */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Product Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <FaCheck className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Genuine Product</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">100% Original</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <FaTruck className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Free Shipping</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">On orders above ₹500</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <FaUndo className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Easy Returns</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">30 Days Return Policy</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <FaStar className="text-pink-600 dark:text-pink-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Top Rated</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{product.rating.toFixed(1)} Stars</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info - Right Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 transition-colors duration-300">
                  {/* Product Title */}
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="mb-4">
                    <Ratings
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">
                      {product.price?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Inclusive of all taxes</p>
                  </div>

                  {/* Product Info Grid */}
                  <div className="mb-6 space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaStore className="mr-2" />
                        <span>Brand</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{product.brand}</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaBox className="mr-2" />
                        <span>In Stock</span>
                      </div>
                      <span className={`font-semibold ${product.countInStock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {product.countInStock > 0 ? `${product.countInStock} units` : 'Out of Stock'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaStar className="mr-2" />
                        <span>Reviews</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{product.numReviews}</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaClock className="mr-2" />
                        <span>Listed</span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {moment(product.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  {product.countInStock > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quantity
                      </label>
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                      >
                        {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className={`w-full font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center ${product.countInStock === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-[1.02] hover:shadow-xl text-white'
                      }`}
                  >
                    <FaShoppingCart className="mr-2" />
                    {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>

                  {/* Buy Now Button */}
                  {product.countInStock > 0 && (
                    <button
                      onClick={() => {
                        addToCartHandler();
                        navigate('/shipping');
                      }}
                      className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
