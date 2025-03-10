
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} HabitTrack. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <Link to="#" className="hover:text-foreground">
            Privacy
          </Link>
          <Link to="#" className="hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
