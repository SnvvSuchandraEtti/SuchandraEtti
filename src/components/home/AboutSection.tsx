
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { Sparkles, Lightbulb, Code, Laptop } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="About Me" 
          subtitle="Learn a bit more about who I am and what drives me"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 to-accent/20 blur-xl transform rotate-3"></div>
              <div className="glass-effect rounded-2xl overflow-hidden relative z-10">
                <img 
                  src="https://i.ibb.co/RkY4d4x/Timetable.png" 
                  alt="About Me" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -right-4 -bottom-4 p-4 glass-effect rounded-xl z-20">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Passionate Tech Enthusiast & <span className="text-gradient">Problem Solver</span>
            </h3>

            <div className="space-y-6 text-muted-foreground">
              <p>
                I'm a third-year B.Tech CSE student at Aditya University with a passion for creating 
                innovative solutions that bridge technology and user experience. My journey in 
                computer science began with a curiosity about how technology can improve lives, 
                and that curiosity continues to drive me forward.
              </p>
              <p>
                I specialize in artificial intelligence, web development, and user experience design. 
                My goal is to create technology that's not only functional but also intuitive and 
                accessible to users of all backgrounds.
              </p>
              <p>
                When I'm not coding or designing, you'll find me exploring the latest tech trends, 
                participating in hackathons, or mentoring junior students in our university's tech club.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <HighlightCard 
                icon={<Lightbulb className="h-5 w-5" />}
                title="Creative Thinking"
                description="Approaching problems with innovative solutions"
              />
              <HighlightCard 
                icon={<Code className="h-5 w-5" />}
                title="Technical Skills"
                description="Proficient in multiple programming languages and frameworks"
              />
              <HighlightCard 
                icon={<Laptop className="h-5 w-5" />}
                title="Continuous Learning"
                description="Always expanding my knowledge and skills"
              />
              <HighlightCard 
                icon={<Sparkles className="h-5 w-5" />}
                title="Attention to Detail"
                description="Crafting pixel-perfect, intuitive experiences"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-effect p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <div className="p-2 rounded-md bg-muted mr-2">
          {icon}
        </div>
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default AboutSection;
