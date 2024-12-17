// pages/api/recipes/delete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/configs/database';
import { ResultSetHeader } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    // Validate that an ID is provided
    if (!id) {
      res.status(400).json({ error: 'Recipe ID is required for deletion' });
      return; 
    }

    try {
      // Execute delete query
      const deleteQuery = 'DELETE FROM recipes WHERE id = ?';
      const [result] = await db.query<ResultSetHeader>(deleteQuery, [id]);

      if (result.affectedRows === 0) {
        // If no rows were affected, the recipe ID does not exist
        res.status(404).json({ error: 'Recipe not found' });
        return;
      }

      res.status(200).json({ message: 'Recipe deleted successfully!' });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Failed to delete recipe', details: (error as Error).message || 'Unknown error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
