"use client";
import React, { useState } from "react";
import { Users, Book, Globe, Menu, X } from "lucide-react";
const MainHeader = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: "english", label: "EN", fullName: "English" },
    { code: "mongolian", label: "МН", fullName: "Mongolian" },
  ];
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
              <Users className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-xl font-light text-gray-900 tracking-tight">
              FamilySpace
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
            >
              Home
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></div>
            </a>

            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group flex items-center gap-1"
            >
              <Book className="w-4 h-4" />
              Reading
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></div>
            </a>

            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
            >
              Activities
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></div>
            </a>

            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
            >
              Profile
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></div>
            </a>
          </nav>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200 bg-white">
                <Globe className="w-4 h-4" />
                <span>
                  {
                    languages.find((lang) => lang.code === selectedLanguage)
                      ?.label
                  }
                </span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 ${
                      selectedLanguage === lang.code
                        ? "text-gray-900 font-medium bg-gray-50"
                        : "text-gray-600"
                    }`}
                  >
                    {lang.fullName}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden border-t border-gray-100 transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 space-y-1">
            <a
              href="#"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Book className="w-4 h-4" />
              Reading
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              Activities
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              Profile
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default MainHeader;
