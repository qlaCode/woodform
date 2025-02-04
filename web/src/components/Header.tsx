import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) => {
    return `text-slate-800 hover:text-[#10A588] transition-all duration-300 ${
      isActive(path)
        ? "font-bold text-[#10A588] border-b-2 border-[#10A588]"
        : ""
    }`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/woodpecker.gif"
              alt="Woodpecker"
              className="w-12 md:w-16 mr-2 transform scale-x-[-1]"
            />
            <Link to="/" className="flex flex-col">
              <h1 className="text-[#10A588] text-2xl md:text-4xl font-mono font-medium">
                Woodform
              </h1>
              <h3 className="text-slate-800 text-sm md:text-xl font-mono">
                Quentin Lamare
              </h3>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className={navLinkClass("/")}>
              Gallery
            </Link>
            <Link to="/about" className={navLinkClass("/about")}>
              About Me
            </Link>
            <Link to="/contact" className={navLinkClass("/contact")}>
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-slate-800">
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <Link to="/" className={`block py-2 ${navLinkClass("/")}`}>
              Gallery
            </Link>
            <Link
              to="/about"
              className={`block py-2 ${navLinkClass("/about")}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`block py-2 ${navLinkClass("/contact")}`}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
