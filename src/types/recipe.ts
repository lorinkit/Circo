interface Recipe {
    id: number,
    recipeName: string,
    recipeAuthor: string,
    preptime: string,
    cooktime: string,
    totaltime: string,
    servings: string,
    description: string,
    category: string,
    ingredients: string | string[],
    instructions: string |string[]
}

export default Recipe