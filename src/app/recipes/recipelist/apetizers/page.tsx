import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

const Home: React.FC = () => {
  const buttons = [
    { src: '/images/appetizers/Deviled eggs.png', alt: 'Deviled Eggs', href: '/recipes/1' },
    { src: '/images/appetizers/Stuffed mushroom.jpg', alt: 'Stuffed Mushroom', href: '/recipes/2' },
    { src: '/images/appetizers/Buffalo Cauliflower Wings.jpg', alt: 'Buffalo Cauliflower Wings', href: '/recipes/3' },
    { src: '/images/appetizers/Taquitos.jpg', alt: 'Taquitos', href: '/recipes/4' },
    { src: '/images/appetizers/Jalapeno Poppers.jpg', alt: 'Jalapeno Poppers', href: '/recipes/5' },
    { src: '/images/appetizers/Steamed Dumplings.jpg', alt: 'Steamed Dumplings', href: '/recipes/6' },
    { src: '/images/appetizers/Spring Roll.jpg', alt: 'Fresh Spring Rolls', href: '/recipes/7' },
    { src: '/images/appetizers/Quesadillas.jpg', alt: 'Quesadillas', href: '/recipes/8' },
    { src: '/images/appetizers/Party Meatballs.jpeg', alt: 'Party Meatballs', href: '/recipes/9' },
    { src: '/images/appetizers/Clam Dip.jpeg', alt: 'Clam Dip', href: '/recipes/10' },
  ];

  return (
    <MainLayout>
      <div
        className="relative min-h-screen bg-[#FAF6E3] flex flex-col items-center justify-center"
        style={{
          backgroundImage: 'url("/images/circo logo.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#EEEEEE] opacity-90"></div>

        {/* Content Section */}
        <div style={contentStyle}>
          <h1 style={headerStyle}>Circo Recipe Share</h1>
          <p style={introStyle}>Stirring Up Flavor, One Recipe at a Time!</p>

          {/* Section 1 */}
          <div style={columnsContainerStyle}>
            {buttons.slice(0, 5).map((button, index) => (
              <Link key={index} href={button.href} style={buttonStyle}>
                <div>
                  <img src={button.src} alt={button.alt} style={imageStyle} />
                  <span style={captionStyle}>{button.alt}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Section Divider */}
          <hr style={dividerStyle} />

          {/* Section 2 */}
          <div style={columnsContainerStyle}>
            {buttons.slice(5).map((button, index) => (
              <Link key={index} href={button.href} style={buttonStyle}>
                <div>
                  <img src={button.src} alt={button.alt} style={imageStyle} />
                  <span style={captionStyle}>{button.alt}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const headerStyle = {
  textAlign: 'center' as 'center',
  margin: '20px 0',
  fontSize: '3rem',
  color: '#000000',
};

const introStyle = {
  marginBottom: '30px',
  fontSize: '1.2rem',
  color: '#000000',
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  zIndex: 10,
  textAlign: 'center',
  padding: '20px',
  fontFamily: 'Times New Roman, Brandon Grotesque, sans-serif',
};

const columnsContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap', // Ensures all buttons fit within the container
};

const buttonStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  width: '150px', // Standard width for buttons
  height: '200px', // Standard height for buttons
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '150px', // Fixes the image height
  objectFit: 'cover', // Ensures the image fits within the container
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s',
};

const captionStyle: React.CSSProperties = {
  marginTop: '10px',
  fontSize: '1rem',
  color: '#000000',
};

const dividerStyle: React.CSSProperties = {
  margin: '30px 0',
  border: 'none',
  height: '1px',
  backgroundColor: '#ccc',
  width: '80%',
};

export default Home;
