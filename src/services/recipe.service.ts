import mysql, { MysqlError } from 'mysql';
import Recipe from '@/types/recipe';
import db from '@/configs/database';



const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'circodb',
  connectionLimit: 100,
});

const getRecipes = async (): Promise<Recipe[]> => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM `recipes`", (error: { message: any; }, results: Recipe[] | PromiseLike<Recipe[]>) => {
      if (error) {
        console.log("MySQL Error:", error.message);
        reject(error.message);
        return;
      }
      resolve(results);
    });
  });
};


const insertRecipe = async (recipeData: { recipeName: string; recipeAuthor: string; preptime: string; cooktime: string; totaltime: string; servings: string; description: string; category: string; ingredients: string; instructions: string }) => {
  return new Promise<void>((resolve, reject) => {
    const query = "INSERT INTO `recipes` (`recipeName`, `recipeAuthor`, `preptime`, `cooktime`, `totaltime`, `servings`, `description`, `category`, `ingredients`, `instructions`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [recipeData.recipeName, recipeData.recipeAuthor, recipeData.preptime, recipeData.cooktime, recipeData.totaltime, recipeData.servings, recipeData.description, recipeData.category, recipeData.ingredients, recipeData.instructions];

    pool.query(query, values, (error: MysqlError | null) => {
        if (error) {
          console.log("MySQL Error:", error.message);
          reject(error.message);
          return;
        }
        resolve();
      });
  });
};

const updateRecipe = async (recipeName: string, updatedFields: Record<string, any>) => {
  return new Promise<void>((resolve, reject) => {
    const query = `
      UPDATE recipes
      SET recipeAuthor = ?, preptime = ?, cooktime = ?, totaltime = ?, servings = ?,description = ?, category = ?, ingredients = ?, instructions = ?
      WHERE id = ?
    `;
    const values = [
      updatedFields.recipeName,
      updatedFields.recipeAuthor,
      updatedFields.preptime,
      updatedFields.cooktime,
      updatedFields.totaltime,
      updatedFields.servings,
      updatedFields.description,
      updatedFields.category,
      updatedFields.ingredients,
      updatedFields.instructions,
      recipeName, // Use recipeName in the WHERE clause
    ];

    pool.query(query, values, (error: MysqlError | null) => {
      if (error) {
        console.log("MySQL Error:", error.message);
        reject(error.message);
        return;
      }
      resolve();
    });
  });
};


async function getRecipeById(id: number) {
  console.log("Querying database for recipe ID:", id);

  try {
    const query = `SELECT * FROM recipes WHERE id = ?`;
    const [rows]: any = await db.query(query, [id]);

    if (rows.length === 0) {
      console.warn("No recipe found for ID:", id);
      return null;
    }

    console.log("Recipe found:", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Failed to fetch recipe from database.");
  }
}








export { getRecipes, insertRecipe, updateRecipe, getRecipeById };