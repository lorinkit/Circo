"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // To handle redirect after logout

  // Check if user is logged in from localStorage or sessionStorage on the client side
  useEffect(() => {
    // Check the login status from localStorage on the client side
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    }
  }, []); // Runs once on mount

  const showDropdown = () => setIsDropdownVisible(true);
  const hideDropdown = () => setIsDropdownVisible(false);

  const handleLogout = () => {
    // Logic to log out, like clearing tokens or user session
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true'); // Set login status to false
    }
    setIsLoggedIn(true);
    router.push('/'); // Redirect to home page after logging out
  };

  return (
    <header className="relative z-50 flex justify-between items-center h-16 bg-gray-300 px-4 shadow-md">
      {/* Logo */}
      <Image src="/images/circo logo.png" alt="Circo Logo" width={50} height={10} />

      {/* Navigation */}
      <nav className="flex items-center">
        <ul className="flex gap-6 items-center">
          {/* Static Links */}
          <li>
            <Link href="/">Home</Link>
          </li>

          {/* Dropdown for Browse Recipes */}
          <li
            className="relative"
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
          >
            <button
              className="relative z-10 bg-transparent border-none cursor-pointer"
            >
              Browse Recipes
            </button>
            {isDropdownVisible && (
              <div
                className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-40 z-50"
                style={{
                  top: '100%',
                  marginTop: '-4px',
                }}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <ul className="flex flex-col">
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/recipes/recipelist/apetizers">Appetizers</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/recipes/recipelist/main-course">Main Course</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/recipes/recipelist/desserts">Desserts</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link href="/recipes/submit-recipe">Submit a Recipe</Link>
          </li>
          

          {/* Conditional Rendering for Sign Up or Profile Icon */}
          {!isLoggedIn ? (
            <li>
              <Link href="/sign">Sign Up</Link>
            </li>
          ) : (
            <li>
              {/* Profile Icon Button */}
              <button
                onClick={handleLogout}
                className="flex items-center p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <Image src="/images/profile-icon.png" alt="Profile" width={30} height={30} />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
