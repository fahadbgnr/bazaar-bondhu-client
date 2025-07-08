import React from 'react';
import { Outlet } from 'react-router'; 
import NavBar from '../Pages/Shared/NavBar/NavBar';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
