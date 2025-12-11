import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { AiOutlineSearch } from "react-icons/ai";

const SearchResults = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword") || "";

    const { data, isLoading, error } = useGetProductsQuery({ keyword });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (data?.products) {
            setProducts(data.products);
        }
    }, [data]);

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
                        Back to Home
                    </Link>
                </div>

                {/* Page Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <AiOutlineSearch className="text-pink-500 mr-3" size={40} />
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            Search Results
                        </h1>
                    </div>
                    {keyword && (
                        <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            Showing results for: <span className="font-semibold text-pink-600 dark:text-pink-400">"{keyword}"</span>
                        </p>
                    )}
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader />
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Searching products...</p>
                    </div>
                ) : error ? (
                    /* Error State */
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md">
                            <div className="text-center">
                                <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Search Error
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {error?.data?.error || "Unable to perform search. Please try again."}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : products.length === 0 ? (
                    /* No Results State */
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 max-w-md text-center transition-colors duration-300">
                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AiOutlineSearch className="text-gray-400 dark:text-gray-500" size={48} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                No Products Found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                We couldn't find any products matching "{keyword}". Try different keywords or browse our shop.
                            </p>
                            <Link
                                to="/shop"
                                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Browse All Products
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Results */
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                                {products.length} Product{products.length !== 1 ? "s" : ""} Found
                            </h2>
                            <Link
                                to="/shop"
                                className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium transition-colors"
                            >
                                View All Products →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product._id} className="transform hover:scale-105 transition-transform duration-200">
                                    <ProductCard p={product} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
