
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ExternalLink, Github, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import { useToast } from "@/hooks/use-toast";
import ResumeButton from '../ui/ResumeButton';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const { toast } = useToast();
  
  const titles = [
    "Full-Stack Developer",
    "Mobile App Engineer", 
    "UI/UX Designer",
    "AI Enthusiast"
  ];
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / (rect.width / 2) * -20);
    y.set((e.clientY - centerY) / (rect.height / 2) * -20);
  };

  useEffect(() => {
    const currentTitle = titles[textIndex];
    let charIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let isDeleting = false;
    let text = "";
    
    const type = () => {
      if (isDeleting) {
        text = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex <= 0) {
          isDeleting = false;
          setTextIndex((prev) => (prev + 1) % titles.length);
          clearInterval(typingInterval);
          setTimeout(() => {
            typingInterval = setInterval(type, 200); // Slower typing (increased from 150ms)
          }, 1500); // Longer pause between words (increased from 1000ms)
        }
      } else {
        text = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentTitle.length) {
          isDeleting = true;
          clearInterval(typingInterval);
          setTimeout(() => {
            typingInterval = setInterval(type, 150); // Slightly faster deleting (increased from 100ms)
          }, 3000); // Long pause at full word (increased from 2000ms)
        }
      }
      
      setTypedText(text);
    };
    
    typingInterval = setInterval(type, 200); // Slower overall typing (increased from 150ms)
    return () => clearInterval(typingInterval);
  }, [textIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 700, 0);
      const translateY = scrollY * 0.3;
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    canvasRef.current.appendChild(renderer.domElement);
    
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
      
      const hue = (i / (particlesCount * 3)) * 360;
      const color = new THREE.Color(`hsl(${hue}, 70%, 50%)`);
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    const secondaryGeometry = new THREE.BufferGeometry();
    const secondaryCount = 1000;
    
    const secondaryPosArray = new Float32Array(secondaryCount * 3);
    const secondaryColorsArray = new Float32Array(secondaryCount * 3);
    
    for (let i = 0; i < secondaryCount * 3; i += 3) {
      secondaryPosArray[i] = (Math.random() - 0.5) * 20;
      secondaryPosArray[i + 1] = (Math.random() - 0.5) * 20;
      secondaryPosArray[i + 2] = (Math.random() - 0.5) * 20 - 5;
      
      const color = new THREE.Color(`hsl(${220 + Math.random() * 40}, 70%, 50%)`);
      secondaryColorsArray[i] = color.r;
      secondaryColorsArray[i + 1] = color.g;
      secondaryColorsArray[i + 2] = color.b;
    }
    
    secondaryGeometry.setAttribute('position', new THREE.BufferAttribute(secondaryPosArray, 3));
    secondaryGeometry.setAttribute('color', new THREE.BufferAttribute(secondaryColorsArray, 3));
    
    const secondaryMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const secondaryParticles = new THREE.Points(secondaryGeometry, secondaryMaterial);
    scene.add(secondaryParticles);
    
    camera.position.z = 5;
    
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      secondaryParticles.rotation.x -= 0.0003;
      secondaryParticles.rotation.y -= 0.0003;
      
      particlesMesh.rotation.y += mouseX * 0.05;
      particlesMesh.rotation.x += mouseY * 0.05;
      
      secondaryParticles.rotation.y += mouseX * 0.03;
      secondaryParticles.rotation.x += mouseY * 0.03;
      
      const pulse = Math.sin(elapsedTime * 0.5) * 0.05 + 1;
      particlesMesh.scale.set(pulse, pulse, pulse);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showEasterEgg = () => {
    toast({
      title: "You found an Easter egg!",
      description: "Thanks for exploring my portfolio in detail. There are more hidden surprises waiting to be discovered!",
      variant: "default",
      duration: 5000,
    });
  };

  // Skill icons to display around the avatar
  const skillIcons = [
    { emoji: '💻', name: 'Programming', angle: 0 },
    { emoji: '📱', name: 'Mobile Dev', angle: 45 },
    { emoji: '🎨', name: 'UI/UX', angle: 90 },
    { emoji: '🚀', name: 'Cloud', angle: 135 },
    { emoji: '⚙️', name: 'DevOps', angle: 180 },
    { emoji: '🔍', name: 'Analytics', angle: 225 },
    { emoji: '🌐', name: 'Web Dev', angle: 270 },
    { emoji: '🤖', name: 'AI/ML', angle: 315 },
  ];

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div ref={canvasRef} className="absolute inset-0 -z-10"></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/90 to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-accent/20 blur-3xl"></div>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-5 opacity-10">
        <div className="absolute inset-0 grid grid-cols-12 gap-4">
          {Array.from({ length: 12 * 12 }).map((_, i) => (
            <motion.div 
              key={i}
              className="bg-white/5 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                delay: Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </div>

      <div 
        ref={heroRef}
        className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between"
      >
        <div className="md:w-3/5 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full glass-effect text-sm font-medium mb-4 gap-2 border border-primary/20"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              B.Tech CSE Student @ Aditya Engineering College
            </motion.span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2">
              <span className="text-white">Suchandra Etti</span>
            </h1>
            
            <div className="h-12 md:h-16 min-h-12">
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="font-semibold">{typedText}</span>
                <span className="animate-pulse">|</span>
              </motion.p>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0"
            >
              Crafting innovative solutions at the intersection of modern 
              web technologies, mobile applications, and artificial intelligence.
              <span 
                className="hidden md:inline-block ml-1 text-primary/70 cursor-pointer" 
                onClick={showEasterEgg}
              >
                Let's build something amazing together.
              </span>
            </motion.p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.a
                href="#projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white font-medium transition-all duration-300 shadow-lg shadow-primary/20"
              >
                <Sparkles className="h-4 w-4" />
                View Projects
              </motion.a>
              
              <motion.a
                href="https://github.com/SnvvSuchandraEtti"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full glass-effect text-foreground font-medium transition-all duration-300 border border-white/10 backdrop-blur-md"
              >
                <Github className="h-4 w-4" />
                GitHub
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/suchandra-etti"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full glass-effect text-foreground font-medium transition-all duration-300 border border-white/10 backdrop-blur-md"
              >
                <ExternalLink className="h-4 w-4" />
                LinkedIn
              </motion.a>
              
              <ResumeButton 
                className="mt-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              />
            </div>
          </motion.div>
        </div>

        <div className="md:w-2/5 mt-12 md:mt-0 flex justify-center">
          <motion.div
            style={{
              x: useTransform(springX, x => x * 1.5),
              y: useTransform(springY, y => y * 1.5),
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="relative"
          >
            <motion.div 
              className="absolute -inset-8 rounded-full bg-gradient-to-r from-primary/30 via-purple-500/20 to-accent/30 blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            ></motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 2 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-accent rounded-full blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full animate-pulse duration-3000"></div>
              <div className="apple-glass rounded-full overflow-hidden border-4 border-white/10 relative z-10 shadow-2xl w-64 h-64 md:w-80 md:h-80">
                <img 
                  src="https://i.postimg.cc/mDZjf4Kk/317kb.jpg" 
                  alt="Suchandra Etti" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {/* Skill icons around the avatar in a circular pattern */}
            {skillIcons.map((skill, index) => {
              const angle = (skill.angle * Math.PI) / 180;
              const radius = 180; // Distance from center
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={index}
                  className="absolute w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl flex items-center justify-center shadow-lg border border-white/10 z-20"
                  initial={{ 
                    x: 0, 
                    y: 0,
                    opacity: 0 
                  }}
                  animate={{ 
                    x,
                    y,
                    opacity: 0.9,
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    boxShadow: "0 0 20px rgba(79, 70, 229, 0.6)",
                    zIndex: 30
                  }}
                  transition={{ 
                    type: "spring",
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                    delay: 1 + index * 0.1,
                  }}
                >
                  <span className="text-xl">{skill.emoji}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
