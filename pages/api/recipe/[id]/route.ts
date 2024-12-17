// pages/api/recipes/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import db from '@/configs/database';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleFileError = (error: any, res: NextApiResponse) => {
  console.error('Error handling file upload:', error);
  res.status(500).json({ error: 'Error handling file upload', details: error.message || 'Unknown error occurred' });
};

const handleValidationError = (message: string, res: NextApiResponse) => {
  res.status(400).json({ error: message });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields) => {
      if (err) {
        handleFileError(err, res);
        return;
      }

      const {
        recipeName,
        recipeAuthor,
        description,
        category,
        ingredients,
        instructions,
        preptime,
        cooktime,
        totaltime,
        servings,
      } = fields;

      // Prepare the fields to update dynamically
      const updatedFields: any = {};

      if (recipeName) updatedFields.recipeName = recipeName;
      if (recipeAuthor) updatedFields.recipeAuthor = recipeAuthor;
      if (description) updatedFields.description = description;
      if (category) updatedFields.category = category;
      if (ingredients) updatedFields.ingredients = ingredients;
      if (instructions) updatedFields.instructions = instructions;
      if (preptime) updatedFields.preptime = preptime;
      if (cooktime) updatedFields.cooktime = cooktime;
      if (totaltime) updatedFields.totaltime = totaltime;
      if (servings) updatedFields.servings = servings;

      // If no fields are provided, return a validation error
      if (Object.keys(updatedFields).length === 0) {
        return handleValidationError('At least one field must be provided for update', res);
      }

      try {
        // Update only the fields that were changed
        const updateQuery = 'UPDATE recipes SET ? WHERE id = ?';
        await db.query(updateQuery, [updatedFields, id]);

        res.status(200).json({ message: 'Recipe updated successfully!' });
      } catch (error) {
        console.error('Error updating recipe data:', error);
        res.status(500).json({ error: 'Failed to update recipe data', details: 'Unknown error occurred' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
