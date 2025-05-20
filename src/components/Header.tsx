
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 bg-background border-b border-primary/30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-xl md:text-3xl font-pixel text-primary neon-text tracking-wide">XENOTXT</h1>
        </Link>
        <div className="flex space-x-4">
          <button className="bg-muted hover:bg-muted/80 text-xs font-pixel px-3 py-1 rounded pixel-corners transition">
            LOGIN
          </button>
          <button className="bg-primary text-primary-foreground hover:bg-primary/80 text-xs font-pixel px-3 py-1 rounded pixel-corners transition">
            SIGNUP
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
