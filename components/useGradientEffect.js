import React from "react";
import { useGradientEffect } from "./useGradientEffect";

const GradientBackground = () => {
  const { backgroundImage } = useGradientEffect();

  return (
    <div
      style={{
        backgroundImage,
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Your page content goes here */}
      <h1 style={{ color: "white", textAlign: "center", paddingTop: "40vh" }}>
        Welcome to My Gradient Page!
      </h1>
    </div>
  );
};

export default GradientBackground;
