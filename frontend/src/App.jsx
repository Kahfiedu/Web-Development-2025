import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Beranda from "./pages/Beranda";
import TentangKami from "./pages/TentangKami";
// import ProgramPilihan from "./pages/programpilihan";
// import Blog from "./pages/blog";
// import Karir from "./pages/karir";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/tentangkami" element={<TentangKami />} />
        {/* <Route path="/programpilihan" element={<ProgramPilihan />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/karir" element={<Karir />} /> */}
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
