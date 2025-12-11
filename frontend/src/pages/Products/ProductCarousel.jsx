import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
// Removed Link import to prevent navigation issues
import { toast } from "react-toastify";
import {
  FaBox,
  FaClock,
  FaStar,
  FaStore,
  FaHeart,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    fade: true,
    cssEase: "linear",
    dotsClass: "slick-dots custom-dots",
    swipe: true,
    touchMove: true,
  };

  return (
    <div className="relative">
      {isLoading ? (
        <div className="flex items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="hero-carousel">
          <Slider {...settings}>
            {products.map((product) => {
              const {
                image,
                _id,
                name,
                price,
                description,
                brand,
                createdAt,
                numReviews,
                rating,
                quantity,
                countInStock,
              } = product;
              
              console.log('Rendering product:', name, 'with ID:', _id); // Debug log
              
              return (
                <div key={_id} className="relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl min-h-[500px]">
                    {/* Product Image */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                          <img
                            src={image}
                            alt={name}
                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/600x400/f0f0f0/666666?text=Product+Image";
                            }}
                          />
                        <div className="absolute top-4 right-4 z-10">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toast.info("Added to favorites!", {
                                position: "top-right",
                                autoClose: 2000,
                              });
                            }}
                            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                          >
                            <FaHeart className="text-pink-500" />
                          </button>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <FaStore className="text-pink-500" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{brand}</span>
                        </div>
                          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            {name}
                          </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                          {description.substring(0, 150)}...
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                        <div className="text-4xl font-bold text-pink-600 mb-2">
                          {price?.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Inclusive of all taxes • {countInStock > 0 ? "Free shipping" : "Currently unavailable"}
                        </div>
                        {countInStock > 0 && (
                          <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
                            ✓ In Stock ({countInStock} available)
                          </div>
                        )}
                      </div>

                      {/* Product Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center text-yellow-500 mb-2">
                            <FaStar className="mr-2" />
                            <span className="font-semibold">{rating || 0}/5</span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {numReviews} Reviews
                          </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                          <div className="flex items-center text-green-500 mb-2">
                            <FaBox className="mr-2" />
                            <span className="font-semibold">{countInStock}</span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            In Stock
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaClock className="mr-2" />
                        Added {moment(createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
          
          <style jsx>{`
            .hero-carousel .slick-dots {
              bottom: -50px;
            }
            .hero-carousel .slick-dots li button:before {
              font-size: 12px;
              color: #ec4899;
              opacity: 0.5;
            }
            .hero-carousel .slick-dots li.slick-active button:before {
              opacity: 1;
              color: #ec4899;
            }
            .hero-carousel .slick-arrow {
              z-index: 10;
            }
            .hero-carousel .slick-prev {
              left: 20px;
            }
            .hero-carousel .slick-next {
              right: 20px;
            }
            .hero-carousel .slick-arrow:before {
              font-size: 24px;
              color: #ec4899;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
