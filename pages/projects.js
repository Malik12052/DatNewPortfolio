import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei'; // Assuming you use @react-three/drei for background stars
import { OrbitControls } from '@react-three/drei';

const Projects = () => {
  return (
    <div className="relative w-full h-screen">
      <Canvas className="absolute top-0 left-0 w-full h-full">
        {/* Add the nebula galaxy background */}
        <Stars 
          radius={300} 
          depth={60} 
          count={20000} 
          factor={7} 
          saturation={0.9} 
          fade 
        />
        {/* Add more 3D elements like nebula or use textures to create a galaxy effect */}
        <ambientLight intensity={0.5} />
        <OrbitControls />
      </Canvas>
      <div className="relative z-10 p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        {/* Add your project content here */}
      </div>
    </div>
  );
};

export default Projects;
