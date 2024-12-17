import { NextApiRequest, NextApiResponse } from 'next';
import { getRecipes } from '@/services/recipe.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const recipes = await getRecipes(); // Fetch recipes from database
      res.status(200).json(recipes);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to load recipes' });
  }
}
