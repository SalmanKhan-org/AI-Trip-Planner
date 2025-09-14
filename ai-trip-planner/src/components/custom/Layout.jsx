// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster />

      <main className="flex-grow">
        <Outlet /> {/* <-- renders child routes here */}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
