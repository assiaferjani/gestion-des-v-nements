import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendar, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { link: "Accueil", path: "/" },
    { link: "Événements", path: "/events" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`w-full fixed top-0 left-0 right-0 transition-all ease-in duration-300 z-50 ${
      isSticky ? "bg-blue-300" : "bg-blue-500"
    }`}>
      <nav className="py-4 lg:px-24 px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <FaCalendar className="inline-block" />
            Evenements
          </Link>

          <ul className="hidden md:flex items-center space-x-12">
            {navItems.map(({ link, path }) => (
              <Link 
                key={path} 
                to={path}
                className="text-black hover:text-blue-700 transition duration-300"
              >
                {link}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-black hover:text-red-600 transition duration-300"
            >
              <FaSignOutAlt />
              <span>Se déconnecter</span>
            </button>
          </ul>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6 text-black" />
              ) : (
                <FaBars className="h-6 w-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-500 py-4">
            <div className="flex flex-col space-y-4 px-4">
              {navItems.map(({ link, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="text-white hover:text-blue-200 transition duration-300"
                >
                  {link}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-100 hover:text-red-200 transition duration-300"
              >
                <FaSignOutAlt />
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;