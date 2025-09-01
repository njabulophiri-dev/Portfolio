import { motion } from "framer-motion";
import { ArrowDown, Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingElements from "./3D/FloatingElements";
import { MouseEvent } from "react";

const Hero = () => {
  const scrollToProjects = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start", // Added for consistent scrolling
    });
  };

  const scrollToContact = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start", // Added for consistent scrolling
    });
  };

  const handleDownloadCV = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const cvUrl = "/Njabulo_Phiri_CV.pdf";
      const response = await fetch(cvUrl);
      if (!response.ok) throw new Error("CV not found");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Njabulo_Phiri_CV.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (err) {
      alert("Sorry, CV is not available at the moment.");
      console.error(err);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <FloatingElements />

      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-background/80" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {" "}
        {/* Improved padding */}
        <div className="text-center space-y-6 md:space-y-8">
          {" "}
          {/* Better spacing */}
          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3 md:space-y-4" // Better spacing
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black gradient-text" // Added sm:text-5xl
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              Njabulo Phiri
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4" // Improved mobile layout
            >
              <span className="inline-block animate-fade-in">
                Full-Stack Developer
              </span>
              <span className="hidden sm:inline text-primary">•</span>
              <span
                className="inline-block animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                AI Enthusiast
              </span>
              <span className="hidden sm:inline text-secondary">•</span>
              <span
                className="inline-block animate-fade-in"
                style={{ animationDelay: "1s" }}
              >
                Problem Solver
              </span>
            </motion.div>
          </motion.div>
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4" // Added padding, better text scaling
          >
            Crafting innovative digital experiences with modern technologies.
            Specializing in React, Spring Boot microservices and AI integration.
          </motion.p>
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4" // Better gap spacing
          >
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="group relative overflow-hidden bg-gradient-primary hover:scale-105 transition-all duration-300 px-6 sm:px-8 py-3" // Better padding
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowDown
                  size={18}
                  className="group-hover:translate-y-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary-dark opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>

            <Button
              onClick={scrollToContact}
              variant="outline"
              size="lg"
              className="group border-2 border-primary/30 hover:border-primary hover:bg-primary/10 px-6 sm:px-8 py-3" // Better padding
            >
              <MessageCircle
                size={18}
                className="mr-2 group-hover:scale-110 transition-transform"
              />
              Get In Touch
            </Button>

            <Button
              onClick={handleDownloadCV}
              variant="ghost"
              size="lg"
              className="group hover:bg-accent px-6 sm:px-8 py-3 flex items-center justify-center gap-2" // Better padding
            >
              <Download size={18} />
              Download CV
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2" // Better positioning
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-muted-foreground"
        >
          <span className="text-xs sm:text-sm mb-2">Scroll to explore</span>{" "}
          {/* Better text scaling */}
          <ArrowDown size={18} className="sm:size-5" />{" "}
          {/* Better icon sizing */}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
