"use client";

import React from "react";

interface DeleteButtonProps {
  recipeId: string | number;
  onDelete?: (deletedId: string | number) => void; // Make this optional
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ recipeId, onDelete }) => {
  const handleClick = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/recipe/${recipeId}/deleteroute`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Recipe deleted successfully!");
        if (onDelete) {
          onDelete(recipeId); // Call parent handler if provided
        } else {
          window.location.href = "/"; // Redirect or refresh as needed
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("An error occurred while deleting the recipe.");
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        marginTop: "10px",
        padding: "8px 16px",
        backgroundColor: "#f44336",
        color: "white",
        borderRadius: "4px",
        cursor: "pointer",
        border: "none",
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
