import React from "react";
import KahfImage from "./logo.png"; 

const KahfLogo = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={KahfImage} alt="Kahf Logo" className="w-32 h-auto" /> 
    </div>
  );
};

export default KahfLogo;
