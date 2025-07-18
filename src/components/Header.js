import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UserAccountDropdown from './UserAccountDropdown';
import AuthModal from './AuthModal';

const Header = ({ cartItemsCount, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">E-Shop</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Shop</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Categories</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">Contact</a>
          </nav>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile only */}
            <button className="lg:hidden p-2 text-gray-700 hover:text-primary-600">
              <Search className="h-6 w-6" />
            </button>

            {/* User Account */}
            {user ? (
              <UserAccountDropdown />
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden md:block p-2 text-gray-700 hover:text-primary-600"
              >
                <User className="h-6 w-6" />
              </button>
            )}

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors py-2">Home</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors py-2">Shop</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors py-2">Categories</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors py-2">About</a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors py-2">Contact</a>
              <div className="border-t border-gray-200 pt-4">
                {user ? (
                  <UserAccountDropdown />
                ) : (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center text-gray-700 hover:text-primary-600 transition-colors py-2"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Sign In
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;
