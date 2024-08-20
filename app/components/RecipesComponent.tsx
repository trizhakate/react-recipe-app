// app/components/RecipesClientComponent.tsx
'use client'

import { useParams } from 'next/navigation'
import ImageGrid from '@/app/components/ImageGrid'
import useMeals from '@/hooks/useRecipesByCategory'
import Loading from './Loading'

const RecipesClientComponent = () => {
  const params = useParams()
  const category = params.recipes as string
  const { data: recipes, isLoading, error } = useMeals(category)

  if (isLoading) return <Loading />
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center my-4 font-serif">{category.toUpperCase()}</h1>
      <ImageGrid recipes={recipes} category={category} />
    </div>
  )
}

export default RecipesClientComponent