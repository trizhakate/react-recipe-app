'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import recipesService from '@/services/recipes.service';
import RecipePageClient from '@/app/components/RecipePage';
import Loading from '@/app/components/Loading';

interface RecipePageProps {
  params: {
    recipes: string; // This represents the category
    mealName: string;
  };
}

export default function RecipePage({ params }: RecipePageProps) {
  const { recipes: category, mealName } = params;

  const { data: recipe, isLoading, isError } = useQuery({
    queryKey: ['recipe', mealName],
    queryFn: async () => {
      const searchResults = await recipesService.searchMeals(decodeURIComponent(mealName));
      if (searchResults.length > 0) {
        return recipesService.getMealDetails(searchResults[0].idMeal);
      }
      return null;
    },
  });

  if (isLoading) {
    return <div><Loading/></div>;
  }

  if (isError) {
    return <div>Error fetching recipe</div>;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return <RecipePageClient recipe={recipe} category={category} />;
}