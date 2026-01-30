import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  useGSAP(() => {
    gsap.from('header', {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Submersible Pump', href: '#' },
    { name: 'Solar', href: '#' },
    // {
    //   name: 'Products',
    //   dropdown: [
    //     { name: 'Solar', href: '#' },
    //     { name: 'Pump', href: '#' },
    //   ],
    // },
    { name: 'Event News', href: '#' },
    { name: 'E Brochure', href: '#' },
    { name: 'Career', href: '#' },
    { name: 'Contact Us', href: '#' },
  ];


  return (
    <header
      className={`fixed top-0 left-0 w-full z-[999] py-6 transition-all duration-300 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="w-[95%] xl:w-[90%] mx-auto px-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Angel Pumps"
            className="h-10 md:h-[80px] object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.name}
                className="relative group"
              >
                <button
                  className={`font-medium text-sm tracking-wide flex items-center gap-1 transition-colors ${isScrolled ? 'text-gray-800 hover:text-primary' : 'text-white hover:text-primary'
                    }`}
                >
                  {link.name}
                </button>

                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-3 w-44 bg-white shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {link.dropdown.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-xl transition"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className={`relative font-medium transition-colors duration-300 text-sm tracking-wide ${isScrolled ? 'text-gray-800 hover:text-primary' : 'text-white hover:text-primary'
                  } group`}
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            )
          )}

          <button className="ml-4 bg-gradient-to-r from-primary to-[#c4161d] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            Get a Quote
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="flex flex-col px-6 py-6 space-y-5">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name}>
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="w-full flex justify-between items-center text-gray-800 text-base font-medium border-b border-gray-100 pb-2"
                >
                  {link.name}
                  <span>{isProductsOpen ? '−' : '+'}</span>
                </button>

                {isProductsOpen && (
                  <div className="mt-3 ml-4 space-y-3">
                    {link.dropdown.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-gray-600 hover:text-primary transition"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 text-base font-medium border-b border-gray-100 pb-2 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            )
          )}


          <button className="mt-4 bg-gradient-to-r from-primary to-[#c4161d] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition">
            Get a Quote
          </button>
        </div>
      </div>
    </header>
  );
}
