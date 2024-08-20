import { useQuery } from '@tanstack/react-query';
import recipesService from '@/services/recipes.service';
import type { DetailedRecipe } from '@/models/recipes.model';

export const useSearchRecipes = (searchTerm: string) => {
  return useQuery<DetailedRecipe | null, Error>({
    queryKey: ['searchRecipes', searchTerm],
    queryFn: async () => {
      const meals = await recipesService.searchMeals(searchTerm);
      return meals.length > 0 ? await recipesService.getMealDetails(meals[0].idMeal) : null;
    },
    enabled: searchTerm.length > 0,
  });
};