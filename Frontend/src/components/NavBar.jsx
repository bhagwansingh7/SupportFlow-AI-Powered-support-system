import React, { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white shadow-sm">
            S
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Support<span className="text-indigo-600">Flow</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Features
          </a>

          <a
            href="/profile"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Profile
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Contact
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </a>

          <a
            href="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-2">

            <a
              href="/"
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
            >
              Home
            </a>

            <a
              href="#features"
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
            >
              Features
            </a>

            <a
              href="/profile"
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
            >
              Profile
            </a>

            <a
              href="#contact"
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
            >
              Contact
            </a>

            <div className="mt-2 flex gap-3 border-t border-slate-100 pt-4">
              <a
                href="/login"
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Login
              </a>

              <a
                href="/register"
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Get Started
              </a>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;