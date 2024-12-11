"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const showDropdown = () => setIsDropdownVisible(true);
  const hideDropdown = () => setIsDropdownVisible(false);

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
                  top: '100%', // Position right below the button
                  marginTop: '-4px', // Slightly raises the dropdown closer to the button
                }}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
              >
                <ul className="flex flex-col">
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="recipes\recipelist\apetizers">Appetizers</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/recipes/main-course">Main Course</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/recipes/desserts">Desserts</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/recipes/beverages">Beverages</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link href="/recipes/submit-recipe">Submit a Recipe</Link>
          </li>
          <li>
            <Link href="/about-us">Learn About Us</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link href="/sign">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
