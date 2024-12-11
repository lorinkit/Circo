"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/components/module/MenuBar.module.css';

const MenuBar: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* Static Links in Header */}
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/about-us">Learn About Us</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact-us">Contact Us</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/recipes/submit-recipe">Submit a Recipe</Link>
          </li>

          {/* Dropdown for Browse Recipes */}
          <li
            className={styles.navItem}
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <button className={styles.dropdownToggle} onClick={toggleDropdown}>
              Browse Recipes
            </button>
            <div
              className={`${styles.dropdownMenu} ${
                isDropdownVisible ? styles.visible : ''
              }`}
            >
              <ul className={styles.dropdownList}>
                <li>
                  <Link href="/recipes/appetizers">Appetizers</Link>
                </li>
                <li>
                  <Link href="/recipes/main-course">Main Course</Link>
                </li>
                <li>
                  <Link href="/recipes/desserts">Desserts</Link>
                </li>
                <li>
                  <Link href="/recipes/beverages">Beverages</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MenuBar;
