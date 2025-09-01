import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-8 md:py-12 border-t border-card-border">
      {" "}
      {/* Better padding */}
      <div className="container mx-auto px-4 sm:px-6">
        {" "}
        {/* Better padding */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {" "}
          {/* Better gap */}
          {/* Left */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-muted-foreground text-center md:text-left order-2 md:order-1" /* Better text scaling & order */
          >
            Fueled by ☕ & &lt;/&gt;
          </motion.p>
          {/* Center */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-muted-foreground text-center order-1 md:order-2" /* Better text scaling & order */
          >
            © 2025 Njabulo Phiri. All Rights Reserved
          </motion.p>
          {/* Right: Back to top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3 }}
            className="flex items-center order-3" /* Fixed order */
          >
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="icon"
              className="border-primary/30 hover:border-primary hover:bg-primary/10 w-10 h-10" /* Fixed size for consistency */
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} /> {/* Better icon sizing */}
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
