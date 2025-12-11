import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/ThemeContext";
import Marquee from "./components/Marquee";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Marquee />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Navigation />
        {/* Search Bar Header */}
        <div className="md:ml-16 sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <SearchBar />
          </div>
        </div>
        <main className="md:ml-16 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
