import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import ThemeToggle from "../../components/ThemeToggle";
import SearchBar from "../../components/SearchBar";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-[10000] md:hidden bg-pink-600 text-white p-2 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 z-[9999] group ${showSidebar ? "w-64" : "w-16 hover:w-64"
          } ${showSidebar ? "" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <span className={`font-bold text-gray-900 dark:text-white transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                TechStore
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Theme Toggle */}
            <div className="flex justify-center mb-6">
              <ThemeToggle />
            </div>

            <Link
              to="/"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${location.pathname === "/"
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600"
                }`}
            >
              <AiOutlineHome size={20} className="flex-shrink-0" />
              <span className={`font-medium transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                Home
              </span>
            </Link>

            <Link
              to="/shop"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${location.pathname === "/shop"
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600"
                }`}
            >
              <AiOutlineShopping size={20} className="flex-shrink-0" />
              <span className={`font-medium transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                Shop
              </span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group relative ${location.pathname === "/cart"
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600"
                }`}
            >
              <div className="relative">
                <AiOutlineShoppingCart size={20} className="flex-shrink-0" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </div>
              <span className={`font-medium transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                Cart
              </span>
            </Link>

            <Link
              to="/favorite"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group relative ${location.pathname === "/favorite"
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600"
                }`}
            >
              <div className="relative">
                <FaHeart size={18} className="flex-shrink-0" />
                <FavoritesCount />
              </div>
              <span className={`font-medium transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                Favorites
              </span>
            </Link>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {userInfo.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className={`font-medium transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}>
                    {userInfo.username}
                  </span>
                  <svg
                    className={`w-4 h-4 ml-auto transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{userInfo.username}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {userInfo.isAdmin ? "Administrator" : "Customer"}
                      </p>
                    </div>
                    {userInfo.isAdmin && (
                      <div className="py-2">
                        <p className="px-4 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Admin
                        </p>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/admin/productlist"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Products
                        </Link>
                        <Link
                          to="/admin/categorylist"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Categories
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Orders
                        </Link>
                        <Link
                          to="/admin/userlist"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Users
                        </Link>
                      </div>
                    )}

                    <div className="py-2 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logoutHandler();
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600 transition-all duration-200 group"
                >
                  <AiOutlineLogin size={20} className="flex-shrink-0" />
                  <span className={`font-medium transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}>
                    Login
                  </span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600 transition-all duration-200 group"
                >
                  <AiOutlineUserAdd size={20} className="flex-shrink-0" />
                  <span className={`font-medium transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}>
                    Register
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998] md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </>
  );
};

export default Navigation;
