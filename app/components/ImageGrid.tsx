'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Loading from './Loading';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface ImageGridProps {
  recipes: Recipe[] | undefined;
  category: string;
}

const imageLoader = ({ src }: { src: string }) => {
  return src;
};

const ImageGrid: React.FC<ImageGridProps> = ({ recipes, category }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isGridView, setIsGridView] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleClick = (mealName: string) => {
    console.log(`Navigating to: /recipes/${category}/${encodeURIComponent(mealName)}`);
    router.push(`/recipes/${encodeURIComponent(category)}/${encodeURIComponent(mealName)}`);
  };

  const filteredAndSortedRecipes = useMemo(() => {
    if (!recipes) return [];
    return recipes
      .filter(recipe => recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.strMeal.localeCompare(b.strMeal);
        } else {
          return b.strMeal.localeCompare(a.strMeal);
        }
      });
  }, [recipes, searchTerm, sortOrder]);

  if (!recipes) {
    return <Loading />;
  }

  const NoResultsFound = () => (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h2 className="text-2xl font-bold mb-2">No Recipes Found</h2>
      <p className="text-gray-600 mb-4">We couldn't find any recipes matching your search.</p>
      <div className="space-y-2">
        <p className="font-medium">Try adjusting your search:</p>
        <ul className="list-disc list-inside text-left text-gray-600">
          <li>Check the spelling of your search terms</li>
          <li>Use more general keywords</li>
          <li>Try searching for a similar recipe</li>
        </ul>
      </div>
      {searchTerm && (
        <button
          className="mt-6 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
          onClick={() => setSearchTerm('')}
        >
          Clear Search
        </button>
      )}
    </div>
  );

  const FilterControls = () => (
    <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 bg-white lg:bg-transparent p-4 lg:p-0 rounded-md lg:rounded-none shadow-lg lg:shadow-none">
      <input
        type="text"
        placeholder="Search recipes..."
        className="w-full lg:w-64 px-4 py-2 border rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex justify-between items-center space-x-4">
        <div className="relative">
          <button
            className="px-4 py-2 bg-black lg:bg-transparent text-white lg:text-black rounded-md flex items-center hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            Sort {sortOrder === 'asc' ? '↑' : '↓'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isSortOpen && (
            <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
              <button
                className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 hover:text-black w-full text-left"
                onClick={() => { setSortOrder('asc'); setIsSortOpen(false); }}
              >
                Ascending
              </button>
              <button
                className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 hover:text-black w-full text-left"
                onClick={() => { setSortOrder('desc'); setIsSortOpen(false); }}
              >
                Descending
              </button>
            </div>
          )}
        </div>
        <button
          className="p-2 bg-black lg:bg-transparent text-white lg:text-black rounded-md hover:bg-gray-200 transition-colors duration-300"
          onClick={() => setIsGridView(!isGridView)}
          aria-label={isGridView ? "Switch to list view" : "Switch to grid view"}
        >
          {isGridView ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-end mb-6">
        <div className="hidden sm:block w-full lg:w-auto">
          <FilterControls />
        </div>
        <button
          className="sm:hidden p-2 bg-black text-white rounded-md"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          aria-label="Toggle filter options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </button>
      </div>
      {isFilterOpen && (
        <div className="sm:hidden mb-6">
          <FilterControls />
        </div>
      )}

      {filteredAndSortedRecipes.length === 0 ? (
        <NoResultsFound />
      ) : (
        <div className={isGridView 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
          : "grid grid-cols-1 gap-4"}>
          {filteredAndSortedRecipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className={`flex ${isGridView ? 'flex-col' : 'flex-row'} items-center border rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 group hover:bg-black`}
              onClick={() => handleClick(recipe.strMeal)}
            >
              <div className={`relative ${isGridView ? 'w-full h-60' : 'w-40 h-40 flex-shrink-0'}`}>
                <Image
                  loader={imageLoader}
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-lg transition-transform duration-300 transform group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className={`p-4 flex flex-col justify-center ${isGridView ? 'items-center w-full' : 'items-start flex-grow'} transition-colors duration-300`}>
                <p className={`${isGridView ? 'text-center' : 'text-left'} text-lg font-medium font-serif group-hover:text-white transition-colors duration-300`}>
                  {recipe.strMeal}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGrid;