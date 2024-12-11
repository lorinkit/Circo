import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

const Home: React.FC = () => {
  const buttons = [
    { src: '/images/recipe1.png', alt: 'Recipe 1', href: '/recipes/1' },
    { src: '/images/recipe2.png', alt: 'Recipe 2', href: '/recipes/2' },
    { src: '/images/recipe3.png', alt: 'Recipe 3', href: '/recipes/3' },
    { src: '/images/recipe4.png', alt: 'Recipe 4', href: '/recipes/4' },
    { src: '/images/recipe5.png', alt: 'Recipe 5', href: '/recipes/5' },
    { src: '/images/recipe6.png', alt: 'Recipe 6', href: '/recipes/6' },
    { src: '/images/recipe7.png', alt: 'Recipe 7', href: '/recipes/7' },
    { src: '/images/recipe8.png', alt: 'Recipe 8', href: '/recipes/8' },
    { src: '/images/recipe9.png', alt: 'Recipe 9', href: '/recipes/9' },
    { src: '/images/recipe10.png', alt: 'Recipe 10', href: '/recipes/10' },
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
          <div style={columnsContainerStyle}>
            <div style={columnStyle}>
              {buttons.slice(0, 5).map((button, index) => (
                <Link key={index} href={button.href} style={buttonStyle}>
                  <div>
                    <img src={button.src} alt={button.alt} style={imageStyle} />
                    <span style={captionStyle}>{button.alt}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div style={columnStyle}>
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
};

const columnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
};

const buttonStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s',
};

const captionStyle: React.CSSProperties = {
  marginTop: '10px',
  fontSize: '1rem',
  color: '#000000',
};

export default Home;
