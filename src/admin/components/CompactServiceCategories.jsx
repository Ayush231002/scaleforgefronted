import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CategoryService } from '../../services';

const CompactServiceCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await CategoryService.getAllCategories();
        console.log('All categories:', allCategories);
        
        // Limit to 8 categories for compact view
        const activeCategories = allCategories.slice(0, 8);
        console.log('Active categories:', activeCategories);
        
        setCategories(activeCategories);
        
        // Check if category is selected in URL params
        const categoryId = searchParams.get('category');
        if (categoryId) {
          const category = activeCategories.find(cat => cat._id === categoryId);
          setSelectedCategory(category);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [searchParams]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    // Set selected category immediately - this will both show orange color AND filter services
    const isSameCategory = selectedCategory?._id === category._id;
    const newCategory = isSameCategory ? null : category;
    
    setSelectedCategory(newCategory);
    
    // Update URL immediately
    if (isSameCategory) {
      setSearchParams({});
    } else {
      setSearchParams({ category: category._id });
    }
  };

  // Handle "All Services" click
  const handleAllServicesClick = () => {
    setSelectedCategory(null);
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return null; // Don't show if no categories
  }

  return (
    <div className="sticky top-0 z-50 bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto flex-1">
            {/* All Services Button */}
            <button
              onClick={handleAllServicesClick}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                !selectedCategory
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 transform scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20 hover:scale-105'
              }`}
            >
              All Services
            </button>

            {/* Category Pills */}
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(category)}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap border ${
                  selectedCategory?._id === category._id
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25 transform scale-105'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border-white/20 hover:border-white/30 hover:scale-105'
                }`}
              >
                {/* Conditional rendering: Image + Name or Name only */}
                {category.imageUrl && category.imageUrl.trim() !== '' ? (
                  <>
                    {/* Category Icon/Image */}
                    <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    {/* Category Name */}
                    <span className="truncate max-w-[100px]">{category.name}</span>
                  </>
                ) : (
                  <span className="truncate max-w-[150px]">{category.name}</span>
                )}
                {/* End conditional rendering */}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactServiceCategories;
