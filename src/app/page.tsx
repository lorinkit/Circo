import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div
        className="relative min-h-screen bg-[#FAF6E3]"
        style={{
          backgroundImage: 'url("/images/circo logo.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#EEEEEE] opacity-90"></div>

        {/* Hero Section */}
        <div className="relative z-10 text-center py-16">
          <h1 className="text-5xl font-bold text-black mb-4">Circo Recipe Share</h1>
          <p className="text-xl text-black mb-6">Stirring Up Flavor, One Recipe at a Time!</p>

          
        </div>

        {/* Featured Recipes Section */}
        <div className="relative z-10 mt-12 px-6 py-12 bg-white shadow-md rounded-lg mx-4 sm:mx-8 lg:mx-16">
          <h2 className="text-3xl font-bold text-center mb-6 text-black">Featured Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {featuredRecipes.map((recipe) => (
    <div
      key={recipe.id}
      className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
    >
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold">{recipe.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{recipe.description}</p>
      <Link
        href={`/recipes/recipelist/${recipe.category}/${recipe.id}`}
        className="text-yellow-500 hover:underline"
      >
        View Recipe
      </Link>
    </div>
  ))}
</div>

        </div>

        {/* Fun Trivia Section */}
<div
  className="relative z-10 mt-12 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-10 px-6 w-full text-center rounded-lg shadow-lg mx-4 sm:mx-8 lg:mx-16"
  style={{ transform: 'translateX(-5%)' }} // Shifted slightly to the left
>
  <h2 className="text-3xl font-bold mb-4">Did You Know?</h2>
  <p className="text-lg font-medium">
    The world's largest pancake was over 49 feet in diameter and weighed 6,614 pounds!
  </p>
</div>

      </div>
    </MainLayout>
  );
};

const featuredRecipes = [
  {
    id: 'meatballs',
    category: 'main-course',
    name: 'Chicken Cordon Bleu Meatballs',
    description: 'A creamy and classic Italian pasta dish.',
    image: '/images/maincourse/Cordon Bleu.jpg',
  },
  {
    id: 'brownies',
    category: 'desserts',
    name: 'Blackberry Cheesecake Brownies',
    description: 'Rich chocolate cake with a gooey center.',
    image: '/images/desserts/Blackberry Brownies.jpg',
  },
  {
    id: 'buffalo-cauliflower',
    category: 'appetizers',
    name: 'Buffalo Cauliflower Wings',
    description: 'Crispy greens with a tangy Caesar dressing.',
    image: '/images/appetizers/Buffalo Cauliflower Wings.jpg',
  },
];


export default Home;
