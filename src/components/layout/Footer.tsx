import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, MapPin, Phone, ExternalLink, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/90" />
      <div className="absolute -z-10 w-full h-full">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl opacity-10" />
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Personal Brand */}
          <div className="md:col-span-5 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.div className="inline-block relative">
                <h2 className="text-2xl font-bold tracking-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Suchandra Etti</h2>
                <motion.div
                  className="absolute -bottom-2 left-0 h-px w-16 bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                />
              </motion.div>
              
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                A passionate B.Tech CSE student with a flair for technology and innovation, 
                building experiences that make a difference.
              </p>
              
              <div className="flex space-x-3 pt-2">
                {[
                  { id: 'github', href: "https://github.com/SnvvSuchandraEtti", icon: Github, label: "GitHub" },
                  { id: 'linkedin', href: "https://www.linkedin.com/in/suchandra-etti/", icon: Linkedin, label: "LinkedIn" },
                  { id: 'twitter', href: "https://x.com/snvvs369", icon: Twitter, label: "Twitter" },
                  { id: 'email', href: "mailto:snvvvs369@gmail.com", icon: Mail, label: "Email" }
                ].map((social) => (
                  <SocialIcon 
                    key={social.id}
                    href={social.href} 
                    icon={<social.icon className="h-5 w-5" />} 
                    label={social.label}
                    isHovered={hoveredSocial === social.id}
                    onHoverStart={() => setHoveredSocial(social.id)}
                    onHoverEnd={() => setHoveredSocial(null)}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-5">
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <motion.div
                  className="absolute -bottom-2 left-0 h-px w-12 bg-gradient-to-r from-primary/50 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </div>
              
              <ul className="space-y-3">
                {[
                  { id: 'home', to: "/", label: "Home" },
                  { id: 'about', to: "/about", label: "About Me" },
                  { id: 'projects', to: "/projects", label: "Projects" },
                  { id: 'skills', to: "/skills", label: "Skills" },
                  { id: 'contact', to: "/contact", label: "Contact" }
                ].map((link) => (
                  <motion.li 
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + 0.05 * parseInt(link.id) }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative"
                  >
                    <Link 
                      to={link.to} 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                    >
                      <span className="relative overflow-hidden">
                        <span className="block transition-transform duration-300 group-hover:translate-x-1">
                          {link.label}
                        </span>
                      </span>
                      <motion.div
                        animate={{
                          x: hoveredLink === link.id ? 5 : 0,
                          opacity: hoveredLink === link.id ? 1 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="ml-1 h-3 w-3 text-primary" />
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-5">
                <h3 className="text-lg font-semibold">Contact Me</h3>
                <motion.div
                  className="absolute -bottom-2 left-0 h-px w-12 bg-gradient-to-r from-primary/50 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
              </div>
              
              <ul className="space-y-4">
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <a 
                    href="mailto:snvvvs369@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center space-x-2 group"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xs text-white/50">Email</span>
                      <span className="group-hover:text-primary transition-colors">snvvvs369@gmail.com</span>
                    </span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                  </a>
                </motion.li>
                
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <a 
                    href="tel:+917989635988" 
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center space-x-2 group"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-xs text-white/50">Phone</span>
                      <span className="group-hover:text-primary transition-colors">+91 7989635988</span>
                    </span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                  </a>
                </motion.li>
                
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-2"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs text-white/50">Location</span>
                    <span>Mandapeta, Andhra Pradesh</span>
                    <span className="text-sm text-white/70">India</span>
                  </span>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-sm text-white/40 hover:text-white/60 transition-colors"
          >
            &copy; {currentYear} <span className="text-white/60">Snvvs369</span>. All rights reserved.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-sm text-white/40 flex items-center"
          >
            Designed & Built with{' '}
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="mx-1 text-red-400"
            >
              ❤️
            </motion.span>{' '}
            | <span className="ml-1 text-white/60">Suchandra Etti</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const SocialIcon: React.FC<SocialIconProps> = ({ 
  href, 
  icon, 
  label, 
  isHovered,
  onHoverStart,
  onHoverEnd
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center"
      aria-label={label}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-primary"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isHovered ? 
          { opacity: 0.15, scale: 1 } : 
          { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.3 }}
      />
      
      <motion.span
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 transition-colors z-10 group-hover:text-primary"
      >
        {icon}
      </motion.span>
      
      <AnimatePresence>
        {isHovered && (
          <motion.span 
            className="absolute -top-8 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-xs font-medium text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            {label}
            <motion.span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-primary" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

export default Footer;