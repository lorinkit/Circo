"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface UpdateButtonProps {
  recipeId: string | number;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ recipeId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/recipes/update-recipe?recipeId=${recipeId}`);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "white",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Update Recipe
    </button>
  );
};

export default UpdateButton;
