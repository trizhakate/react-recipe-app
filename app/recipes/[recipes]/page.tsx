'use client';

import { useQuery } from '@tanstack/react-query';
import ImageGrid from '@/app/components/ImageGrid';
import mealService from '@/services/recipes.service';
import Loading from '@/app/components/Loading'; // Assume you have a Loading component

interface Params {
    params: {
        recipes: string;
    };
}

const RecipesPage = ({ params }: Params) => {
    const { data: recipes, isLoading, isError } = useQuery({
        queryKey: ['recipes', params.recipes],
        queryFn: () => mealService.getMealsByCategory(params.recipes),
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error loading recipes</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center my-4 font-serif">{params.recipes.toUpperCase()}</h1>
            {recipes && <ImageGrid recipes={recipes} category={params.recipes} />}
        </div>
    );
};

export default RecipesPage;