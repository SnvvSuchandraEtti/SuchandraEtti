
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import { Sparkles, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  ).sort();
  
  // Filter projects based on selected technology
  useEffect(() => {
    let results = projects;
    
    if (selectedTech) {
      results = results.filter(project => 
        project.technologies.includes(selectedTech)
      );
    }
    
    setFilteredProjects(results);
  }, [selectedTech]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 relative overflow-x-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-60 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <SectionHeading 
              title="My Projects" 
              subtitle="A collection of applications and solutions I've built"
              alignment="center"
              className="mb-12"
            />
            
            <div className="flex justify-center mb-12">
              <div className="relative">
                <motion.button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 glass-effect hover:bg-white/10 transition-all duration-300 border border-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter className="w-4 h-4" />
                  {selectedTech ? `Filtered by: ${selectedTech}` : 'Filter by Technology'}
                </motion.button>
                
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div 
                      className="absolute top-full left-0 mt-2 bg-background/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl p-4 z-50 min-w-[300px] max-h-[400px] overflow-y-auto grid grid-cols-2 gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => {
                          setSelectedTech(null);
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "px-3 py-2 text-xs rounded-lg transition-all",
                          selectedTech === null 
                            ? "bg-primary/20 text-primary border border-primary/30" 
                            : "bg-white/5 hover:bg-white/10 border border-white/10"
                        )}
                      >
                        All Projects
                      </button>
                      
                      {allTechnologies.map(tech => (
                        <button
                          key={tech}
                          onClick={() => {
                            setSelectedTech(tech === selectedTech ? null : tech);
                            setIsFilterOpen(false);
                          }}
                          className={cn(
                            "px-3 py-2 text-xs rounded-lg transition-all",
                            tech === selectedTech
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "bg-white/5 hover:bg-white/10 border border-white/10"
                          )}
                        >
                          {tech}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="h-full"
                      style={{ isolation: 'isolate' }} // Fix for hover issue
                    >
                      <ProjectCard 
                        project={project} 
                        featured={false} // Set all cards to the same size
                        index={index} 
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <div className="glass-effect p-8 rounded-xl max-w-md mx-auto">
                    <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No projects found</h3>
                    <p className="text-muted-foreground">
                      No projects match the selected technology filter.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
