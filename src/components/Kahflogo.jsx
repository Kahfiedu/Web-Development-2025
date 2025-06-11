import React from "react";
import KahfImage from "../assets/logo.png";

const KahfLogo = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={KahfImage} alt="Kahf Logo" className="w-20 h-auto" />
    </div>
  );
};

export default KahfLogo;
