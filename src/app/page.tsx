import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

const Home: React.FC = () => {
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

export default Home;
