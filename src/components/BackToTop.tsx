import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      id="btn-back-to-top"
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center cursor-pointer"
      title="Back to Top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
