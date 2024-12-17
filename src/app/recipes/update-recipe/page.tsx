"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";

const UpdateRecipe: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipeId = searchParams?.get("recipeId");
  console.log("Recipe ID:", recipeId);

  const [formData, setFormData] = useState({
    recipeName: "",
    recipeAuthor: "",
    description: "",
    category: "",
    ingredients: "",
    instructions: "",
    preptime: "",
    cooktime: "",
    totaltime: "",
    servings: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (recipeId) {
      setIsLoading(true);
      const getData = async () => {
        try {
          const res = await fetch(`/api/recipe/get-recipe?id=${recipeId}`);
          const json = await res.json();

          if (json) {
            setFormData({
              recipeName: json.recipeName || "",
              recipeAuthor: json.recipeAuthor || "",
              preptime: json.preptime || "",
              cooktime: json.cooktime || "",
              totaltime: json.totaltime || "",
              servings: json.servings || "",
              description: json.description || "",
              category: json.category || "",
              ingredients: json.ingredients || "",
              instructions: json.instructions || "",
            });
          } else {
            router.push("/404");
          }
        } catch (error) {
          setStatusMessage("An error occurred while fetching the recipe.");
        } finally {
          setIsLoading(false);
        }
      };

      getData();
    }
  }, [recipeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      !formData.category ||
      !formData.ingredients ||
      !formData.instructions
    ) {
      setStatusMessage("Please fill in all fields.");
      setIsSuccessful(false);
      return;
    }

    try {
      const res = await fetch(`/api/recipe/${recipeId}/route`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeName: formData.recipeName,
          recipeAuthor: formData.recipeAuthor,
          preptime: formData.preptime,
          cooktime: formData.cooktime,
          totaltime: formData.totaltime,
          servings: formData.servings,
          description: formData.description,
          category: formData.category,
          ingredients: formData.ingredients,
          instructions: formData.instructions,
        }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        setStatusMessage(`Error: ${errorResponse.message || "Something went wrong."}`);
        setIsSuccessful(false);
        return;
      }

      const data = await res.json();
      console.log("Update response:", data);
      setStatusMessage("Recipe successfully updated!");
      setIsSuccessful(true);

      router.push(`/recipes/recipelist/${formData.category.toLowerCase()}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error updating recipe:", error);
      setStatusMessage(`An error occurred: ${errorMessage}`);
      setIsSuccessful(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="relative min-h-screen bg-[#FAF6E3] flex flex-col items-center justify-center px-4">
        <div className="absolute inset-0 bg-[#EEEEEE] opacity-90"></div>

        <div className="text-center mb-6 z-10">
          <h1 className="text-3xl font-bold text-gray-800">Update Recipe</h1>
          <p className="text-gray-600 mt-2">Modify your recipe details below and save changes.</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg z-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.entries(formData).map(([key, value]) => {
              if (key === "ingredients" || key === "instructions") {
                return (
                  <div key={key} className="mb-4">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 capitalize"
                    >
                      {key}
                    </label>
                    <textarea
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="block w-full p-2 text-sm border rounded-md overflow-y-auto"
                      rows={key === "ingredients" ? 4 : 5}
                      required
                    ></textarea>
                  </div>
                );
              } else {
                return (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-700 capitalize"
                    >
                      {key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/(preptime|cooktime|totaltime)/, "$1 (mins)")}
                    </label>
                    {key === "category" ? (
                      <select
                        id={key}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="block w-full p-2 text-sm border rounded-md"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="apetizers">Appetizers</option>
                        <option value="main-course">Main Course</option>
                        <option value="desserts">Desserts</option>
                      </select>
                    ) : (
                      <input
                        type={key === "servings" ? "number" : "text"}
                        id={key}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="block w-full p-2 text-sm border rounded-md"
                        required
                      />
                    )}
                  </div>
                );
              }
            })}

            {statusMessage && (
              <div
                className={`text-sm ${isSuccessful ? "text-green-500" : "text-red-500"}`}
              >
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              {isLoading ? "Updating..." : "Update Recipe"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default UpdateRecipe;
