import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, MapPin, Phone, Mail, Github, Linkedin, 
  Instagram, Twitter, CheckCircle, Loader2, 
  ArrowRight, Calendar, Clock
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import { useToast } from '@/hooks/use-toast';
import Map from '@/components/ui/Map';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Form validation helpers
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Social media links data
const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/SnvvSuchandraEtti', icon: Github, hoverColor: 'text-white bg-gray-800' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/suchandra-etti', icon: Linkedin, hoverColor: 'text-white bg-[#0A66C2]' },
  { name: 'Instagram', url: '#', icon: Instagram, hoverColor: 'text-white bg-gradient-to-r from-[#F56040] to-[#833AB4]' },
  { name: 'Twitter', url: '#', icon: Twitter, hoverColor: 'text-white bg-[#1DA1F2]' }
];

// Contact info data
const contactInfo = [
  { icon: MapPin, title: 'Location', content: 'Aditya Engineering College, Andhra Pradesh, India' },
  { icon: Mail, title: 'Email', content: 'ettisnvvsuchandra@gmail.com', href: 'mailto:ettisnvvsuchandra@gmail.com' },
  { icon: Phone, title: 'Phone', content: '+91 95XX XXXXX', href: 'tel:+919500000000' },
  { icon: Calendar, title: 'Availability', content: 'Monday - Friday, 9 AM - 6 PM IST' },
  { icon: Clock, title: 'Response Time', content: 'Usually within 24 hours' }
];

// FAQ data
const faqs = [
  {
    question: "What services do you offer?",
    answer: "I specialize in full-stack web development, mobile app development, UI/UX design, and cloud solutions. My expertise includes React, Next.js, Node.js, and various other modern technologies."
  },
  {
    question: "How much do you charge for projects?",
    answer: "My rates vary depending on project complexity, timeline, and specific requirements. I offer both hourly and fixed-price options. Contact me with your project details for a personalized quote."
  },
  {
    question: "How long does it typically take to complete a project?",
    answer: "Project timelines depend on scope and complexity. A simple website might take 2-4 weeks, while complex applications can take several months. I'll provide a detailed timeline after our initial consultation."
  },
  {
    question: "Do you offer maintenance services after project completion?",
    answer: "Yes, I provide ongoing maintenance and support services. I offer various maintenance packages to keep your project running smoothly and up-to-date with the latest technologies."
  }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "B. Prudvi",
    position: "Java Developer & App Designer",
    image: "https://mobile.technicalhub.io:5010/student/22A91A0565.png",
    linkedin: "https://www.linkedin.com/in/prudvi-satya-teja/",
    testimonial: "Suchandra is a coding powerhouse! His ability to architect complex systems made our Java Database project a breeze. What impressed me most was how he could break down technical challenges into manageable pieces. We ended up implementing features in the Student Tracking System we initially thought impossible."
  },
  {
    id: 2,
    name: "M. Balaraju",
    position: "E-commerce & App Developer",
    image: "https://mobile.technicalhub.io:5010/student/22A91A05J1.png",
    linkedin: "https://www.linkedin.com/in/balaraju-marisetti/",
    testimonial: "Working with Suchandra on ShopNest changed how I approach development. His attention to user experience details really elevated our e-commerce platform. During crunch time for Veggie Mart, he stayed up three nights straight to help us meet our deadline. That's the kind of teammate you want!"
  },
  {
    id: 3,
    name: "P. SaiTeja",
    position: "Educational App Developer",
    image: "https://mobile.technicalhub.io:5010/student/22A91A05E9.png",
    linkedin: "https://www.linkedin.com/in/sai-teja-pachikarri/",
    testimonial: "I still remember when Suchandra redesigned our entire STrack interface overnight because he wasn't satisfied with the user flow. That's the level of dedication he brings! His code is clean, well-documented, and somehow he manages to make even the most complicated features seem straightforward."
  },
  {
    id: 4,
    name: "G. Dhanunjay",
    position: "Club Management App Developer",
    image: "https://mobile.technicalhub.io:5010/student/22A91A0571.png",
    linkedin: "https://www.linkedin.com/in/gavireddi-dhanunjaya-naidu/",
    testimonial: "The Aclub App would not be what it is today without Suchandra's contributions. When we hit a major database scaling issue, his solution was brilliant yet simple. He doesn't just code - he genuinely cares about creating something meaningful. Plus, his debugging skills saved us countless hours!"
  },
  {
    id: 5,
    name: "G. Sai Teja",
    position: "Club Management Platform Developer",
    image: "https://mobile.technicalhub.io:5010/student/22MH1A0518.png",
    linkedin: "https://www.linkedin.com/in/sai-teja-gollapalli/",
    testimonial: "Suchandra has this unique ability to see the big picture while also catching the tiniest bugs. During our Aclub App sprints, he often suggested features we hadn't even considered. His positive attitude kept the team motivated even when we faced seemingly impossible challenges. A true tech wizard!"
  },
  {
    id: 6,
    name: "D. Pavan Kumar",
    position: "Founder, Leez",
    image: "https://info.aec.edu.in/ACET/StudentPhotos/22P31A0203.jpg",
    linkedin: "https://www.linkedin.com/in/duggirala-venkata-pavan-kumar-8754912b1/",
    testimonial: "Having Suchandra as a co-founder at Leez has been the best business decision I've made. His technical expertise with Flutter is exceptional, but what truly sets him apart is his entrepreneurial mindset. He doesn't just build features - he builds solutions that drive our rental platform forward. Couldn't ask for a better partner!"
  }
];

// Main component
const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Focus on name input when component mounts
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Scroll to form function
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      setActiveTab('form');
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };
    
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formState.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formState.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }
    
    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error sending message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-background to-background/80">
      <Navbar />
      
      {/* Enhanced animated background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-20">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Get in Touch" 
            subtitle="Have a project in mind? Let's discuss how I can help bring your ideas to life."
            alignment="center"
          />
          
          {/* Hero section with CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <p className="text-lg text-muted-foreground mb-6">
              I'm currently available for freelance work, collaborations, and exciting projects. Whether you need a website, mobile app, or custom solution, I'm here to help you achieve your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={scrollToForm}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-6 px-8"
                size="lg"
              >
                Contact Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a 
                href="https://calendly.com/snvvs369" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="py-6 px-8 border-primary/20 hover:border-primary/50"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Call
                </Button>
              </a>
            </div>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="form" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                <TabsTrigger value="form">Contact Form</TabsTrigger>
                <TabsTrigger value="info">Contact Info</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              
              <TabsContent value="form" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                  {/* Contact form - wider column */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-3"
                  >
                    <div className="glass-effect p-8 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                      <h2 className="text-2xl font-semibold mb-6 flex items-center">
                        <Send className="h-5 w-5 mr-2 text-primary" />
                        <span>Send a Message</span>
                      </h2>
                      
                      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="text-sm font-medium mb-1 block">
                              Your Name <span className="text-primary">*</span>
                            </label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              ref={nameInputRef}
                              value={formState.name}
                              onChange={handleChange}
                              className={`w-full bg-white/5 border ${formErrors.name ? 'border-red-500' : 'border-white/10'}`}
                              placeholder="John Doe"
                              disabled={isSubmitting || isSuccess}
                              aria-invalid={!!formErrors.name}
                              aria-describedby={formErrors.name ? "name-error" : undefined}
                            />
                            {formErrors.name && (
                              <p id="name-error" className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="text-sm font-medium mb-1 block">
                              Email Address <span className="text-primary">*</span>
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formState.email}
                              onChange={handleChange}
                              className={`w-full bg-white/5 border ${formErrors.email ? 'border-red-500' : 'border-white/10'}`}
                              placeholder="john@example.com"
                              disabled={isSubmitting || isSuccess}
                              aria-invalid={!!formErrors.email}
                              aria-describedby={formErrors.email ? "email-error" : undefined}
                            />
                            {formErrors.email && (
                              <p id="email-error" className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="text-sm font-medium mb-1 block">
                            Subject
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            value={formState.subject}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10"
                            placeholder="Project inquiry"
                            disabled={isSubmitting || isSuccess}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="text-sm font-medium mb-1 block">
                            Message <span className="text-primary">*</span>
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formState.message}
                            onChange={handleChange}
                            className={`w-full bg-white/5 border ${formErrors.message ? 'border-red-500' : 'border-white/10'} resize-none`}
                            placeholder="Hello Suchandra, I'd like to discuss a project..."
                            disabled={isSubmitting || isSuccess}
                            aria-invalid={!!formErrors.message}
                            aria-describedby={formErrors.message ? "message-error" : undefined}
                          />
                          {formErrors.message && (
                            <p id="message-error" className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                          )}
                        </div>
                      
                        
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`button-${isSubmitting}-${isSuccess}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button
                              type="submit"
                              className="w-full py-6 bg-gradient-to-r from-primary to-accent text-white font-medium"
                              disabled={isSubmitting || isSuccess}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                  Sending Message...
                                </>
                              ) : isSuccess ? (
                                <>
                                  <CheckCircle className="h-5 w-5 mr-2" />
                                  Message Sent Successfully!
                                </>
                              ) : (
                                <>
                                  <Send className="h-5 w-5 mr-2" />
                                  Send Message
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </AnimatePresence>
                      </form>
                    </div>
                  </motion.div>
                  
                  {/* Contact info - smaller column */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-2 space-y-6"
                  >
                    <div className="glass-effect p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-4">Contact Details</h3>
                      <div className="space-y-5">
                        {contactInfo.map((item, index) => (
                          <motion.div 
                            key={item.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-4"
                          >
                            <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
                              <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              {item.href ? (
                                <a 
                                  href={item.href} 
                                  className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {item.content}
                                </a>
                              ) : (
                                <p className="text-muted-foreground">{item.content}</p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="glass-effect p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                      <div className="flex flex-wrap gap-3">
                        {socialLinks.map((link, index) => (
                          <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-3 rounded-full glass-effect text-foreground border border-white/10 transition-all duration-300 hover:scale-110"
                            aria-label={link.name}
                            whileHover={{ 
                              y: -5, 
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                              className: link.hoverColor
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <link.icon className="h-5 w-5" />
                          </motion.a>
                        ))}
                      </div>
                      
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>Feel free to connect! I'm always open to discussing new projects and opportunities.</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="info" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-effect p-8 rounded-xl border border-white/10 shadow-lg"
                  >
                    <h2 className="text-2xl font-semibold mb-6">About Me</h2>
                    <p className="text-muted-foreground mb-4">
                      I'm a passionate full-stack developer specializing in creating modern, responsive web applications and mobile experiences. With expertise in React, Next.js, and various other technologies, I help businesses and individuals bring their digital ideas to life.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Based in Andhra Pradesh, India, I work with clients globally to deliver exceptional digital experiences that meet their unique needs and business goals.
                    </p>
                    <ul className="space-y-2 mt-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        <span>Full-stack Web Development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        <span>Mobile App Development</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        <span>UI/UX Design</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        <span>API Development & Integration</span>
                      </li>
                    </ul>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="glass-effect p-8 rounded-xl border border-white/10 shadow-lg h-full">
                      <h2 className="text-2xl font-semibold mb-6">My Location</h2>
                      <div className="h-64 mb-4 rounded-lg overflow-hidden border border-white/10">
                      <Map 
  latitude={16.5062} 
  longitude={81.5195} 
  zoom={15} 
  markerTitle="Aditya Engineering College"
/>
                      </div>
                      <p className="text-muted-foreground">
                        Located at Aditya Engineering College, Andhra Pradesh, India. I'm available for in-person meetings in the local area and virtual meetings for clients worldwide.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="mt-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="glass-effect p-8 rounded-xl border border-white/10 shadow-lg"
                >
                  <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                  
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg border border-white/10 bg-white/5"
                      >
                        <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-muted-foreground mb-4">Don't see your question here? Feel free to ask!</p>
                    <Button 
                      onClick={scrollToForm}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Ask a Question
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
            
            {/* Testimonials section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-semibold text-center mb-8">What Collaborators Say</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="glass-effect p-6 rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-blue-400">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        <a 
                          href={testimonial.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-blue-500 hover:underline flex items-center mt-1"
                        >
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{testimonial.testimonial}"</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;