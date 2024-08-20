// hooks/useMeals.ts
import { useQuery } from '@tanstack/react-query';
import mealService from '@/services/recipes.service';
import { Meal } from '@/models/recipes.model';

const useMeals = (category: string) => {
  return useQuery<Meal[], Error>({
    queryKey: ['meals', category],
    queryFn: () => mealService.getMealsByCategory(category),
  });
};

export default useMeals;