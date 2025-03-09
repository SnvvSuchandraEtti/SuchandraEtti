
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { certificates } from '@/data/certificates';

const CertificatesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const technicalCount = certificates.filter(cert => cert.category === 'technical').length;
  const participationCount = certificates.filter(cert => cert.category === 'participation').length;
  
  // Featured certificates (3 of each type)
  const featuredTechnical = certificates
    .filter(cert => cert.category === 'technical')
    .slice(0, 3);
    
  const featuredParticipation = certificates
    .filter(cert => cert.category === 'participation')
    .slice(0, 3);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  return (
    <section id="certificates" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4" ref={ref}>
        <SectionHeading 
          title="My Certifications" 
          subtitle="A showcase of my technical achievements and participation in various events"
        />
        
        {/* Stats overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 justify-center mb-12"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative glass-effect p-6 rounded-xl flex items-center flex-1 max-w-xs mx-auto"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-sm -z-10"></div>
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{technicalCount}+</h3>
              <p className="text-muted-foreground">Technical Certifications</p>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative glass-effect p-6 rounded-xl flex items-center flex-1 max-w-xs mx-auto"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-sm -z-10"></div>
            <div className="p-3 rounded-full bg-accent/10 mr-4">
              <Award className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{participationCount}+</h3>
              <p className="text-muted-foreground">Participation Certificates</p>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="space-y-12">
          {/* Technical Certifications */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-semibold mb-6 flex items-center"
            >
              <Award className="mr-2 h-5 w-5 text-primary" />
              Technical Certifications
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredTechnical.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="glass-effect rounded-xl overflow-hidden border border-white/10"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
                    <img 
                      src={cert.imageUrl} 
                      alt={cert.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-primary/20 backdrop-blur-md z-20">
                      {cert.issuer}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-semibold mb-2 line-clamp-1">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {cert.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{cert.date}</span>
                      <Link 
                        to={`/certificates/${cert.id}`} 
                        className="text-sm text-primary hover:text-primary/80 flex items-center"
                      >
                        View Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Participation Certificates */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl font-semibold mb-6 flex items-center"
            >
              <Award className="mr-2 h-5 w-5 text-accent" />
              Participation Certificates
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredParticipation.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="glass-effect rounded-xl overflow-hidden border border-white/10"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
                    <img 
                      src={cert.imageUrl} 
                      alt={cert.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-accent/20 backdrop-blur-md z-20">
                      {cert.issuer}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-semibold mb-2 line-clamp-1">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {cert.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{cert.date}</span>
                      <Link 
                        to={`/certificates/${cert.id}`} 
                        className="text-sm text-accent hover:text-accent/80 flex items-center"
                      >
                        View Details <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/certificates" 
            className="inline-flex items-center px-6 py-3 rounded-lg glass-button border border-white/10 hover:bg-white/5 transition-all duration-300"
          >
            View All Certificates <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificatesSection;
