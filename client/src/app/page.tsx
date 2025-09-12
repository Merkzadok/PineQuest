"use client";

import React, { useEffect, useState } from "react";
import { Heart, Star, Users } from "lucide-react";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden">
      <div
        className={`max-w-4xl w-full text-center transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Star
            className="absolute top-20 left-1/4 text-yellow-300 w-6 h-6 animate-pulse"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <Heart
            className="absolute top-32 right-1/3 text-pink-300 w-5 h-5 animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "2.5s" }}
          />
          <Star
            className="absolute bottom-32 left-1/3 text-blue-300 w-4 h-4 animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "3.5s" }}
          />
          <Heart
            className="absolute bottom-20 right-1/4 text-emerald-300 w-6 h-6 animate-pulse"
            style={{ animationDelay: "0.5s", animationDuration: "2.8s" }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {/* Logo/Icon */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          {/* Title */}
          <h1
            className={`text-5xl md:text-6xl font-bold text-slate-800 mb-6 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Welcome to
            <span className="block text-blue-500 mt-2">FamilySpace</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            A safe and fun digital space designed for both kids and parents to
            explore, learn, and connect together.
          </p>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Kids Button */}
            <button className="group relative px-12 py-4 bg-coral-400 hover:bg-coral-500 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 min-w-[200px]">
              <div className="flex items-center justify-center gap-3">
                <Star className="w-6 h-6 group-hover:animate-spin transition-transform duration-500" />
                <span>Kids</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>

            {/* Parents Button */}
            <button className="group relative px-12 py-4 bg-emerald-400 hover:bg-emerald-500 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 min-w-[200px]">
              <div className="flex items-center justify-center gap-3">
                <Heart className="w-6 h-6 group-hover:animate-pulse transition-transform duration-500" />
                <span>Parents</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Small feature text */}
          <p
            className={`text-slate-500 text-sm mt-8 transition-all duration-1000 delay-1200 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            Choose your experience and start your journey
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div
            className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-10 right-10 w-24 h-24 bg-pink-100 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "2s", animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 right-20 w-20 h-20 bg-emerald-100 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "5s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
