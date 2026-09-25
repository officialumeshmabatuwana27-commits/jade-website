"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Project & Clients" },
  { href: "/contact", label: "Contact Us" },
  { href: "/calculator", label: "Coverage Calculator" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[4.5rem] sm:min-h-[5rem] py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white/95 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl shadow-sm border border-emerald-100/60 flex items-center transition-transform duration-200 group-hover:scale-105">
              <img
                src="/Logo.png"
                alt="JADE Coatings Logo"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop & Tablet Nav */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 lg:px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-jade-400 bg-jade-500/10 font-semibold"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-2 lg:ml-3 px-4 lg:px-5 py-1.5 lg:py-2 bg-jade-500 hover:bg-jade-400 text-white rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 shadow-md shadow-jade-500/30 hover:scale-105"
            >
              Get in Touch
            </Link>

          </div>

          {/* Mobile Right Controls: Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2.5 rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="bg-charcoal rounded-2xl p-4 space-y-1 border border-white/10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "text-jade-400 bg-jade-500/10"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-jade-500 text-white rounded-xl text-sm font-semibold"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
