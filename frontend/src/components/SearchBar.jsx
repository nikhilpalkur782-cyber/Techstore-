import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const navigate = useNavigate();

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchTerm]);

    // Navigate to search results when debounced term changes
    useEffect(() => {
        if (debouncedTerm.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(debouncedTerm)}`);
        }
    }, [debouncedTerm, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        setDebouncedTerm("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-2xl mx-auto"
        >
            <div className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none">
                    <AiOutlineSearch className="text-gray-400 dark:text-gray-500" size={20} />
                </div>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for products, brands, or categories..."
                    className="w-full pl-12 pr-12 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                />

                {searchTerm && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <AiOutlineClose size={20} />
                    </button>
                )}
            </div>
        </form>
    );
};

export default SearchBar;
