
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates, Certificate } from '@/data/certificates';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import { Award, ExternalLink, Calendar, Bookmark, Filter, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Certificates = () => {
  const [category, setCategory] = useState<'all' | 'technical' | 'participation'>('all');
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>(certificates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let results = certificates;
    
    // Filter by category
    if (category !== 'all') {
      results = results.filter(cert => cert.category === category);
    }
    
    // Search by text
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(cert => 
        cert.title.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.description.toLowerCase().includes(query) ||
        (cert.skills && cert.skills.some(skill => skill.toLowerCase().includes(query)))
      );
    }
    
    setFilteredCertificates(results);
  }, [category, searchQuery]);

  const handleViewCredential = (url?: string) => {
    if (!url) {
      toast({
        title: "Credential link unavailable",
        description: "The credential verification link is not available for this certificate.",
        variant: "destructive",
      });
      return;
    }
    
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 relative">
        {/* Animated background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="My Certificates" 
            subtitle="Credentials and recognitions from various academic and professional programs"
            alignment="center"
          />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div className="relative flex items-center">
              <motion.button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </motion.button>
              
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 z-20 mt-2 p-3 rounded-lg bg-background/90 backdrop-blur-lg border border-white/10 shadow-xl"
                  >
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => {
                          setCategory('all');
                          setIsFilterOpen(false);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          category === 'all' 
                            ? 'bg-primary/20 text-primary' 
                            : 'hover:bg-white/5'
                        } transition-colors`}
                      >
                        All Certificates
                      </button>
                      <button 
                        onClick={() => {
                          setCategory('technical');
                          setIsFilterOpen(false);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          category === 'technical' 
                            ? 'bg-primary/20 text-primary' 
                            : 'hover:bg-white/5'
                        } transition-colors`}
                      >
                        Technical
                      </button>
                      <button 
                        onClick={() => {
                          setCategory('participation');
                          setIsFilterOpen(false);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          category === 'participation' 
                            ? 'bg-primary/20 text-primary' 
                            : 'hover:bg-white/5'
                        } transition-colors`}
                      >
                        Participation
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 focus:outline-none transition-all backdrop-blur-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              )}
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={category + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layoutId={`certificate-${cert.id}`}
                  onClick={() => setSelectedCertificate(cert)}
                  className="glass-effect rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all border border-white/10 hover:border-white/20"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
                    <img 
                      src={cert.imageUrl} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium z-20 backdrop-blur-md ${
                      cert.category === 'technical' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-accent/20 text-accent'
                    }`}>
                      {cert.issuer}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1 line-clamp-1">{cert.title}</h3>
                    
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      {cert.date}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {cert.description}
                    </p>
                    
                    {cert.skills && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cert.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10">
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-white/5 border border-white/10">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        cert.category === 'technical' 
                          ? 'bg-primary/10 text-primary/90' 
                          : 'bg-accent/10 text-accent/90'
                      }`}>
                        {cert.category === 'technical' ? 'Technical' : 'Participation'}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewCredential(cert.credentialUrl);
                        }}
                        className="text-xs flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        Verify <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredCertificates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 glass-effect rounded-xl mx-auto max-w-lg mt-8"
            >
              <Award className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No certificates found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria to find certificates.
              </p>
            </motion.div>
          )}
          
          {/* Certificate details modal */}
          <AnimatePresence>
            {selectedCertificate && (
              <motion.div
                layoutId={`certificate-${selectedCertificate.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  onClick={() => setSelectedCertificate(null)}
                ></motion.div>
                
                <motion.div
                  className="bg-background/95 backdrop-blur-lg rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10 relative z-10"
                >
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-52 md:h-auto relative">
                      <img 
                        src={selectedCertificate.imageUrl} 
                        alt={selectedCertificate.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-background/80 z-10"></div>
                      
                      <div className="absolute bottom-4 left-4 md:hidden z-20">
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          selectedCertificate.category === 'technical' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-accent/20 text-accent'
                        }`}>
                          {selectedCertificate.category === 'technical' ? 'Technical' : 'Participation'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 p-6 md:p-8">
                      <div className="hidden md:inline-flex mb-3">
                        <div className={`items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          selectedCertificate.category === 'technical' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-accent/20 text-accent'
                        }`}>
                          {selectedCertificate.category === 'technical' ? 'Technical' : 'Participation'}
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-semibold mb-2">{selectedCertificate.title}</h2>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Bookmark className="h-4 w-4 mr-2" />
                        {selectedCertificate.issuer} • {selectedCertificate.date}
                      </div>
                      
                      <p className="text-muted-foreground mb-6">
                        {selectedCertificate.description}
                      </p>
                      
                      {selectedCertificate.skills && (
                        <>
                          <h4 className="text-sm font-medium mb-2">Skills & Competencies:</h4>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {selectedCertificate.skills.map((skill, i) => (
                              <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                      
                      {selectedCertificate.credentialUrl && (
                        <button
                          onClick={() => handleViewCredential(selectedCertificate.credentialUrl)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors text-sm"
                        >
                          <Award className="h-4 w-4" />
                          View Credential
                        </button>
                      )}
                      
                      {/* Additional event information for participation certificates */}
                      {selectedCertificate.category === 'participation' && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <h4 className="text-sm font-medium mb-2">Event Information:</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            This certificate was awarded during {selectedCertificate.issuer}'s event. 
                            The program involved hands-on work with industry professionals and peers.
                          </p>
                          
                          {/* Additional links could be added here */}
                          <Link to="#" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                            Learn more about {selectedCertificate.issuer} <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Certificates;
