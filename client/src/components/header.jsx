import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-400 shadow-md">
            <span className="text-white font-bold text-xl">⚛️</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
            ReactGen Compare
          </h1>
        </div>
      </div>
    </header>
  );
}
