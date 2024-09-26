import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const Contact = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background stars */}
      <Canvas className="absolute inset-0">
        <Stars 
          radius={300} 
          depth={60} 
          count={20000} 
          factor={7} 
          saturation={0} 
          fade 
        />
      </Canvas>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen text-white px-6 bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
        <p className="mb-4 text-gray-400">I'd love to hear from you! Feel free to reach out using the form below.</p>
        <form className="w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className="w-full px-4 py-2 bg-transparent border border-gray-300 text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              className="w-full px-4 py-2 bg-transparent border border-gray-300 text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message"
              className="w-full px-4 py-2 bg-transparent border border-gray-300 text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;