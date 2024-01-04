
import { Navbar } from "../navbar/Navbar";
import React, { useState } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { Cards } from "../cards/Cards";

const Home = () => {
  return (
    <>
      <div className="content-container">
        <Cards />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
