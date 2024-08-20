'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DetailedRecipe } from '@/models/recipes.model';

interface RecipePageClientProps {
  recipe: DetailedRecipe;
  category: string;
}

const imageLoader = ({ src }: { src: string }) => {
  return src;
};

const RecipePageClient: React.FC<RecipePageClientProps> = ({ recipe, category }) => {
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  const handleCheckboxChange = (ingredient: string) => {
    setCheckedIngredients(prevChecked =>
      prevChecked.includes(ingredient)
        ? prevChecked.filter(item => item !== ingredient)
        : [...prevChecked, ingredient]
    );
  };

  const instructions = recipe.strInstructions
    ? recipe.strInstructions.split('.').filter(sentence => sentence.trim() !== '')
    : ['No instructions available'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row h-[300px] mb-8">
        {/* Left column with image */}
        <div className="md:w-1/2 h-full relative">
          <Image 
            loader={imageLoader}
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </div>
        
        {/* Right column with black background */}
        <div className="md:w-1/2 bg-black text-white p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold font-serif">{recipe.strMeal}</h1>
          <p>{recipe.strArea} | {category}</p>
        </div>
      </div>

      <div className="w-full md:w-2/3 mt-4 mx-auto flex flex-col md:flex-row gap-4">
        {/* Ingredients section */}
        <div className="md:w-1/3 bg-gray-200 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2 font-serif">Ingredients:</h2>
          <ul className="list-none pl-5">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
              const ingredient = recipe[`strIngredient${i}` as keyof DetailedRecipe];
              const measure = recipe[`strMeasure${i}` as keyof DetailedRecipe];
              if (ingredient) {
                const ingredientText = `${measure} ${ingredient}`.trim();
                return (
                  <li key={i} className={`flex items-center mb-2 p-2 rounded ${i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <input
                      type="checkbox"
                      id={`ingredient-${i}`}
                      checked={checkedIngredients.includes(ingredientText)}
                      onChange={() => handleCheckboxChange(ingredientText)}
                      className="mr-2 appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-[#94D82D] checked:border-transparent focus:outline-none"
                    />
                    <label
                      htmlFor={`ingredient-${i}`}
                      className={`flex-1 ${checkedIngredients.includes(ingredientText) ? 'line-through text-gray-500' : ''}`}
                    >
                      {ingredientText}
                    </label>
                  </li>
                );
              }
              return null;
            }).filter(Boolean)}
          </ul>
        </div>

        {/* Instructions section */}
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold mb-2 font-serif">Instructions:</h2>
          <ol className="list-decimal list-inside pl-5">
            {instructions.map((instruction, index) => (
              <li key={index} className="flex items-start mb-2">
                <span className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-full text-sm flex-shrink-0 mr-3">{index + 1}</span>
                {instruction.trim()}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipePageClient;