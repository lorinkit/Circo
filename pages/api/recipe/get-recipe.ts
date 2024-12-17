import { NextApiRequest, NextApiResponse } from 'next';
import { getRecipeById } from '@/services/recipe.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { id } = req.query; // Assuming [id].ts is the dynamic route file

  console.log("Received ID from query:", id); // Log the ID here for debugging

  try {
    // Check if id is valid
    const recipeId = parseInt(id as string, 10);
    if (isNaN(recipeId)) {
      console.error("Invalid recipe ID:", id);
      return res.status(400).json({ message: 'Invalid recipe ID.' });
    }

    console.log("Fetching recipe with ID:", recipeId);
    const recipe = await getRecipeById(recipeId);  // Pass the valid recipeId

    if (!recipe) {
      console.error("No recipe found for ID:", recipeId);
      return res.status(404).json({ message: 'Recipe not found.' });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}
