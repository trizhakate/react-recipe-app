// models/recipes.model.ts
import { z } from 'zod';

export const RecipeSchema = z.object({
  idMeal: z.string(),
  strMeal: z.string(),
  strMealThumb: z.string().url(),
});

export const CategorySchema = z.object({
  idCategory: z.string(),
  strCategory: z.string(),
  strCategoryThumb: z.string().url(),
  strCategoryDescription: z.string(),
});

export const DetailedRecipeSchema = RecipeSchema.extend({
  strDrinkAlternate: z.string().nullable(),
  strCategory: z.string(),
  strArea: z.string(),
  strInstructions: z.string(),
  strTags: z.string().nullable(),
  strYoutube: z.string().url().nullable(),
  strSource: z.string().url().nullable(),
  strImageSource: z.string().url().nullable(),
  strCreativeCommonsConfirmed: z.string().nullable(),
  dateModified: z.string().nullable(),
  ...Object.fromEntries(
    Array.from({ length: 20 }, (_, i) => i + 1).flatMap((i) => [
      [`strIngredient${i}`, z.string().nullable()],
      [`strMeasure${i}`, z.string().nullable()],
    ])
  ),
});

export type Recipe = z.infer<typeof RecipeSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type DetailedRecipe = z.infer<typeof DetailedRecipeSchema>;