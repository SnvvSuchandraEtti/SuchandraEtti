
import React, { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import SkillsSection from '@/components/home/SkillsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import CertificatesSection from '@/components/home/CertificatesSection';
import ChatbotButton from '@/components/ui/ChatbotButton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificatesSection />
        <ChatbotButton />
      </main>
      <Footer />
    </>
  );
};

export default Index;
