import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Award, Home, User, Code, Cpu, Briefcase, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: User },
  { name: 'Projects', path: '/projects', icon: Code },
  { name: 'Skills', path: '/skills', icon: Cpu },
  { name: 'Experience', path: '/experience', icon: Briefcase },
  { name: 'Certificates', path: '/certificates', icon: Award },
  { name: 'Contact', path: '/contact', icon: Phone },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'py-3 backdrop-blur-xl bg-background/80 shadow-lg shadow-primary/5 border-b border-white/10'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/Name */}
        <Link to="/" className="group flex items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-lg blur-md -z-10"
              animate={{ 
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:from-primary group-hover:to-accent transition-all duration-500">
              <span className="inline-block">S</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">u</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">c</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">h</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">a</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">n</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">d</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">r</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">a</span>
              <span className="ml-2 inline-block">E</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">t</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">t</span>
              <span className="inline-block transition-transform group-hover:translate-x-px">i</span>
            </h1>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                active={location.pathname === link.path}
                onHoverStart={() => setHoverIndex(index)}
                onHoverEnd={() => setHoverIndex(null)}
                isHovered={hoverIndex === index}
              >
                <Icon className={cn(
                  "h-4 w-4 mr-2 transition-all",
                  location.pathname === link.path ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                )} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden relative p-2 text-foreground focus:outline-none group"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            className="absolute inset-0 rounded-md -z-10 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.05 }}
          />
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="container mx-auto px-4 py-4 flex flex-col space-y-2"
            >
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        'px-4 py-3 rounded-lg flex items-center transition-all group relative overflow-hidden',
                        location.pathname === link.path
                          ? 'text-white font-medium bg-gradient-to-r from-white/10 to-white/5'
                          : 'text-white/70 hover:text-white'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.span 
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 -z-10 opacity-0 group-hover:opacity-100" 
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <Icon className="h-5 w-5 mr-3 group-hover:text-primary transition-colors" />
                      {link.name}
                      
                      {location.pathname === link.path && (
                        <motion.span
                          layoutId="mobile-indicator"
                          className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  isHovered: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  to, 
  active, 
  children, 
  onHoverStart,
  onHoverEnd,
  isHovered 
}) => {
  return (
    <motion.div
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="relative"
    >
      <Link
        to={to}
        className={cn(
          'relative px-4 py-2 rounded-lg font-medium flex items-center transition-all duration-300 group overflow-hidden z-10',
          active 
            ? 'text-white' 
            : 'text-white/70 hover:text-white'
        )}
      >
        <motion.span 
          className={cn(
            "absolute inset-0 -z-10 rounded-lg transition-opacity duration-300",
            active ? "opacity-100 bg-gradient-to-r from-white/10 to-white/5" : "opacity-0"
          )}
        />
        
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/10 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        />
        
        {children}
        
        {active && (
          <motion.span
            layoutId="navbar-indicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
            style={{ bottom: '0px' }}
            transition={{ duration: 0.5, type: "spring" }}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default Navbar;