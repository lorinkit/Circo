import React from "react";
import Footer from "../partials/Footer";
import Header from "../partials/Header";

type Props = {
  children: React.ReactNode;
};
const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
};

export default MainLayout;