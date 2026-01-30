import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300">
      {/* Top CTA */}
      <div className="border-b border-white/10">
        <div className="w-[95%] xl:w-[90%] mx-auto py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl md:text-5xl font-bold text-white text-center md:text-left">
            Looking for the right pumping solution?
          </h3>

          <button className="group flex items-center gap-2 bg-gradient-to-r from-primary to-[#c4161d] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition">
            Get a Quote
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-[95%] xl:w-[90%] mx-auto py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <img src={logo} alt="Angel Pumps" className="h-12 mb-6" />
          <p className="text-gray-400 leading-relaxed">
            Angel Pumps is a trusted name in pumping solutions, delivering
            precision-engineered products for agriculture, industrial and
            domestic applications since 1987.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              'Home',
              'About Us',
              'Products',
              'Event News',
              'E Brochure',
              'Career',
              'Contact Us',
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">
            Our Products
          </h4>
          <ul className="space-y-3 text-gray-400">
            <li>Submersible Pumps</li>
            <li>Open-well Pumps</li>
            <li>Mono-bloc Pumps</li>
            <li>Self-Priming Pumps</li>
            <li>Industrial Pumps</li>
          </ul>
        </div>
        

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">
            Contact Us
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-1" />
              <span>
                {/* Rajkot, Gujarat, India <br /> */}
                G-1604, Gate No. 2, GIDC Metoda, <br /> Rajkot - 360 021. Gujarat (INDIA)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary" />
              <span>+91 2827 287150-51-52</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary" />
              <span>info@pumpsangel.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-[95%] xl:w-[90%] mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Angel Pumps. All Rights Reserved.
          </p>
          {/* <div className="flex gap-1">
          Developed by <a href="https://rudrabranding.com" className='text-primary' target="_blank" rel="noopener noreferrer">Rudra Branding</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
