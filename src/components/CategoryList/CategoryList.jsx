import PropTypes from 'prop-types';
import { useState } from 'react';

export default function FilterBar({ categories, onSelectCategory }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onSelectCategory(category);
        setIsOpen(false); 
    };

    return (
        <div className="relative inline-block w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-2">Filtrar por Categoría</h2>
            <button
                onClick={toggleDropdown}
                className="w-full bg-white text-black border border-gray-300 rounded-md px-4 py-2 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring focus:ring-black flex justify-between items-center"
            >
                <span>{selectedCategory}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5H7z" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg transition-opacity duration-200 opacity-100 transform scale-100">
                    <ul className="max-h-60 overflow-auto transition-all duration-200 ease-in-out">
                        <li>
                            <button
                                onClick={() => handleCategoryChange('Todos')}
                                className="block px-4 py-2 text-left w-full hover:bg-gray-200 transition-colors duration-150"
                            >
                                Todos
                            </button>
                        </li>
                        {categories.map((category) => (
                            <li key={category}>
                                <button
                                    onClick={() => handleCategoryChange(category)}
                                    className="block px-4 py-2 text-left w-full hover:bg-gray-200 transition-colors duration-150"
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

FilterBar.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelectCategory: PropTypes.func.isRequired,
};