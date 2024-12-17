"use server";
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { getRecipeById } from "@/services/recipe.service";
import UpdateButton from "@/components/updateButton";
import DeleteButton from "@/components/deleteButton";
import Recipe from "@/types/recipe";

export default async function SpecificRecipePage() {
  const specificRecipeId = 10;
  const recipe: Recipe | null = await getRecipeById(specificRecipeId);

  if (!recipe) {
    return (
      <MainLayout>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1>Recipe Not Found</h1>
          <p>It seems this recipe doesn't exist. Please try another one.</p>
        </div>
      </MainLayout>
    );
  }

  // Safely check and parse ingredients and instructions
  const ingredients: string[] =
    typeof recipe.ingredients === "string"
      ? recipe.ingredients.split("\n")
      : Array.isArray(recipe.ingredients)
      ? recipe.ingredients
      : [];

  const instructions: string[] =
    typeof recipe.instructions === "string"
      ? recipe.instructions.split("\n")
      : Array.isArray(recipe.instructions)
      ? recipe.instructions
      : [];

  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          lineHeight: 1.6,
        }}
      >
        {/* Title Section */}
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
          {recipe.recipeName}
        </h1>
        <p style={{ marginBottom: "20px", fontStyle: "italic" }}>
          By <strong>{recipe.recipeAuthor}</strong>
        </p>

        {/* Recipe Details */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#f9f9f9",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <p>
            <strong>Prep Time:</strong> {recipe.preptime}
          </p>
          <p>
            <strong>Cook Time:</strong> {recipe.cooktime}
          </p>
          <p>
            <strong>Total Time:</strong> {recipe.totaltime}
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings}
          </p>
        </div>

        {/* Ingredients */}
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Ingredients</h2>
        <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
          {ingredients.map((ingredient, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {ingredient}
            </li>
          ))}
        </ul>

        {/* Directions */}
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Directions</h2>
        <ol style={{ paddingLeft: "20px" }}>
          {instructions.map((step, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              {step}
            </li>
          ))}
        </ol>

        {/* Action Buttons */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <UpdateButton recipeId={recipe.id} />
          <DeleteButton recipeId={recipe.id} />
        </div>
      </div>
    </MainLayout>
  );
}
