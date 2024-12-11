import mysql, { MysqlError } from 'mysql';
import Recipe from '@/types/recipe';



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

const insertRecipe = async (recipeData: { recipeName: string; recipeAuthor: string; description: string; equipment: string; ingredients: string; instructions: string }) => {
  return new Promise<void>((resolve, reject) => {
    const query = "INSERT INTO `recipes` (`recipeName`, `recipeAuthor`, `description`, `equipment`, `ingredients`, `instructions`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [recipeData.recipeName, recipeData.recipeAuthor, recipeData.description, recipeData.equipment, recipeData.ingredients, recipeData.instructions];

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

export { getRecipes, insertRecipe };