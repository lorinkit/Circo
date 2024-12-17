"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";

const SubmitRecipe: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    recipeName: "",
    recipeAuthor: "",
    preptime: "",
    cooktime: "",
    totaltime: "",
    servings: "",
    description: "",
    category: "Appetizers", // Default value
    ingredients: "",
    instructions: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.recipeName ||
      !formData.recipeAuthor ||
      !formData.preptime ||
      !formData.cooktime ||
      !formData.totaltime ||
      !formData.servings ||
      !formData.description ||
      !formData.ingredients ||
      !formData.instructions
    ) {
      setStatusMessage("Please fill in all fields.");
      setIsSuccessful(false);
      return;
    }

    try {
      const res = await fetch("/api/recipe/submit-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.message || "Something went wrong.");
        setIsSuccessful(false);
      } else {
        setStatusMessage("Submitted successfully!");
        setIsSuccessful(true);
        // Clear the form fields
        setFormData({
          recipeName: "",
          recipeAuthor: "",
          preptime: "",
          cooktime: "",
          totaltime: "",
          servings: "",
          description: "",
          category: "Appetizers", // Reset to default
          ingredients: "",
          instructions: "",
        });
        // Optionally navigate to another page
        router.push("/recipes/submit-recipe");
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
      setIsSuccessful(false);
    }
  };

  return (
    <MainLayout>
      <div
        className="relative min-h-screen bg-[#FAF6E3] flex flex-col items-center justify-center px-4"
        style={{
          backgroundImage: 'url("/images/circo logo.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#EEEEEE] opacity-90"></div>

        {/* Header and Description */}
        <div className="text-center mb-6 z-10">
          <h1 className="text-3xl font-bold text-gray-800">Submit A Recipe</h1>
          <p className="text-gray-600 mt-2">Share your favorite recipes with the world!</p>
        </div>

        {/* Recipe Submission Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md z-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700">
                Recipe Name
              </label>
              <input
                type="text"
                id="recipeName"
                name="recipeName"
                value={formData.recipeName}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="recipeAuthor" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                id="recipeAuthor"
                name="recipeAuthor"
                value={formData.recipeAuthor}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="preptime" className="block text-sm font-medium text-gray-700">
                Preparation Time
              </label>
              <input
                type="text"
                id="preptime"
                name="preptime"
                value={formData.preptime}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cooktime" className="block text-sm font-medium text-gray-700">
                Cook Time
              </label>
              <input
                type="text"
                id="cooktime"
                name="cooktime"
                value={formData.cooktime}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="totaltime" className="block text-sm font-medium text-gray-700">
                Total Time
              </label>
              <input
                type="text"
                id="totaltime"
                name="totaltime"
                value={formData.totaltime}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700">
                Servings
              </label>
              <input
                type="text"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                rows={3}
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                required
              >
                <option value="apetizers">Appetizers</option>
                <option value="main-course">Main Course</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                Ingredients
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                rows={4}
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="block w-full p-2 text-sm border rounded-md"
                rows={5}
                required
              ></textarea>
            </div>

            {statusMessage && (
              <div className={`mb-4 text-sm ${isSuccessful ? "text-green-500" : "text-red-500"}`}>
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              Submit Recipe
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default SubmitRecipe;
