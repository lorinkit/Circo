import { NextApiRequest, NextApiResponse } from 'next';
import { getRecipes, insertRecipe } from '@/services/recipe.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const recipes = await getRecipes();
      return res.status(200).json(recipes);
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error. Please try again later.' });
    }
  } else if (req.method === 'POST') {
    const { recipeName, recipeAuthor, description, equipment, ingredients, instructions } = req.body;

    try {
      if (!recipeName || !recipeAuthor || !description || !equipment || !ingredients || !instructions) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      await insertRecipe({ recipeName, recipeAuthor, description, equipment, ingredients, instructions });
      return res.status(201).json({ message: 'Recipe successfully created!' });
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
