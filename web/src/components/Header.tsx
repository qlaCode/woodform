import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <img
          src="/woodpecker.gif"
          alt="Woodpecker"
          className="fixed top-4 right-0 w-16"
        />
        <Link to="/">
          <h1 className="text-[#10A588] text-4xl font-mono font-medium">
            Woodform
          </h1>
        </Link>
        <h3 className="text-slate-800 text-xl font-mono">Quentin Lamare</h3>
      </div>
    </header>
  );
}
