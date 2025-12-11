import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Rating from "./Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import ProductTabs from "./Tabs";
import HeartIcon from "./HeartIcon";

const Product = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

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
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* Product Image */}
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x400/f0f0f0/666666?text=Product+Image";
                    }}
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <HeartIcon product={product} />
                </div>
              </div>
              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                    {product.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    {product.description}
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6 transition-colors duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
                    {product.price?.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Inclusive of all taxes
                  </div>
                </div>
                {/* Product Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-colors duration-300">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                      <FaStore className="mr-2 text-pink-500" />
                      <span className="text-sm font-medium">Brand</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">{product.brand}</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-colors duration-300">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                      <FaClock className="mr-2 text-blue-500" />
                      <span className="text-sm font-medium">Added</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">{moment(product.createdAt).fromNow()}</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-colors duration-300">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                      <FaStar className="mr-2 text-yellow-500" />
                      <span className="text-sm font-medium">Reviews</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">{product.numReviews}</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-colors duration-300">
                    <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                      <FaBox className="mr-2 text-green-500" />
                      <span className="text-sm font-medium">In Stock</span>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">{product.countInStock}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-4">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                
                {/* Purchase Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4 transition-colors duration-300">
                  {product.countInStock > 0 ? (
                    <>
                      <div className="flex items-center space-x-4">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</label>
                        <select
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors duration-300"
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <button
                        onClick={addToCartHandler}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                      >
                        <FaShoppingCart />
                        <span>Add To Cart</span>
                      </button>
                    </>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white font-bold py-4 px-8 rounded-xl cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Product Tabs */}
            <div className="mt-12">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
