import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section with Carousel */}
      {!keyword && (
        <section className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
          <Header />
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader />
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Message variant="danger">
              {error?.data?.message || error?.message || "Something went wrong"}
            </Message>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Featured Products
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto transition-colors duration-300">
                Discover our handpicked selection of premium electronics and gadgets
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Explore All Products</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data?.products?.map((product) => (
                <div key={product._id} className="transform hover:scale-105 transition-transform duration-200">
                  <Product product={product} />
                </div>
              )) || (
                <div className="col-span-full flex justify-center items-center py-20">
                  <Message>No products found</Message>
                </div>
              )}
            </div>

            {/* Call to Action Section */}
            <div className="mt-20 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-12 text-center transition-colors duration-300">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Shop?
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-200 mb-8 max-w-2xl mx-auto transition-colors duration-300">
                Browse our complete collection of electronics, gadgets, and accessories
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center px-10 py-4 bg-white dark:bg-gray-200 text-gray-900 dark:text-gray-800 font-bold rounded-full hover:bg-gray-100 dark:hover:bg-gray-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                View All Products
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
