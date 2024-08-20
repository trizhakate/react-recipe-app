// services/recipes.service.ts
import axios from 'axios';
import { RecipeSchema, CategorySchema, DetailedRecipeSchema } from '../models/recipes.model';
import type { Recipe, Category, DetailedRecipe } from '../models/recipes.model';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const recipesService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await axios.get(`${API_BASE_URL}/categories.php`);
    return CategorySchema.array().parse(response.data.categories);
  },

  getMealsByCategory: async (category: string): Promise<Recipe[]> => {
    const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
    return RecipeSchema.array().parse(response.data.meals);
  },

  getMealDetails: async (id: string): Promise<DetailedRecipe> => {
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
    return DetailedRecipeSchema.parse(response.data.meals[0]);
  },

  searchMeals: async (term: string): Promise<Recipe[]> => {
    const response = await axios.get(`${API_BASE_URL}/search.php?s=${term}`);
    return RecipeSchema.array().parse(response.data.meals || []);
  },

  getRandomMeal: async (): Promise<DetailedRecipe> => {
    const response = await axios.get(`${API_BASE_URL}/random.php`);
    return DetailedRecipeSchema.parse(response.data.meals[0]);
  },
};

export default recipesService;