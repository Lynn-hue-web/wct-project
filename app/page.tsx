
import React from "react";
import Navbar from "../components/layout/Navbar/nav"
import MainBody from "@/components/layout/MainBody/page";
import Footer from "@/components/layout/Footer/page";


export default function Layout() {
  return (
    <div>
      <Navbar/>
      <MainBody/>
      <Footer/>
      
    </div>
  );
}
