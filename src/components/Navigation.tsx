import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    document.documentElement.style.scrollPaddingTop = "80px";

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollPaddingTop = "";
    };
  }, []);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);

    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/njabulophiri-dev",
      label: "GitHub",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/njabulophiri36/",
      label: "LinkedIn",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      icon: Mail,
      href: "mailto:njabulophiri36@icloud.com",
      label: "Email",
      onClick: (e: React.MouseEvent) => e.preventDefault(),
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass border-b border-card-border" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl sm:text-2xl font-bold gradient-text cursor-pointer bg-transparent border-none p-2"
              onClick={(e) => scrollToSection("home", e)}
              aria-label="Scroll to home"
            >
              MyPortfolio
            </motion.button>

            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={(e) => scrollToSection(item.id, e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-foreground hover:text-primary transition-colors relative group bg-transparent border-none cursor-pointer px-3 py-2"
                  aria-label={`Scroll to ${item.name}`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.target}
                  rel={social.rel}
                  onClick={social.onClick}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-40 w-80 max-w-full md:hidden"
            >
              <div className="h-full glass border-l border-card-border p-6 overflow-y-auto">
                <div className="mt-16 space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={(e) => scrollToSection(item.id, e)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.2 }}
                      className="block text-lg py-3 px-4 w-full text-left text-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer rounded-lg hover:bg-accent"
                      aria-label={`Scroll to ${item.name}`}
                    >
                      {item.name}
                    </motion.button>
                  ))}

                  <div className="pt-6 border-t border-card-border mt-4">
                    <p className="text-muted-foreground text-sm mb-4">
                      Connect with me
                    </p>
                    <div className="flex space-x-3">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target={social.target}
                          rel={social.rel}
                          onClick={social.onClick}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: (navItems.length + index) * 0.1,
                            duration: 0.2,
                          }}
                          className="p-3 rounded-lg hover:bg-accent transition-colors flex items-center justify-center"
                          aria-label={social.label}
                        >
                          <social.icon size={22} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
