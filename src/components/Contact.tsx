import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Safe environment variable access with fallbacks
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || "demo_service_id",
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "demo_template_id",
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "demo_public_key",
};

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isTurnstileLoaded, setIsTurnstileLoaded] = useState(false);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load Turnstile script only if site key is available
  useEffect(() => {
    if (
      TURNSTILE_SITE_KEY &&
      TURNSTILE_SITE_KEY !== "1x00000000000000000000AA"
    ) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => setIsTurnstileLoaded(true);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  // Initialize Turnstile when script loads and container is ready
  useEffect(() => {
    if (isTurnstileLoaded && turnstileContainerRef.current) {
      // @ts-ignore - Turnstile is loaded globally
      if (window.turnstile) {
        // @ts-ignore
        turnstileWidgetId.current = window.turnstile.render(
          turnstileContainerRef.current,
          {
            sitekey: TURNSTILE_SITE_KEY,
            callback: (token: string) => {
              setTurnstileToken(token);
            },
            "expired-callback": () => {
              setTurnstileToken(null);
            },
            "error-callback": () => {
              setTurnstileToken(null);
            },
          }
        );
      }
    }

    return () => {
      if (turnstileWidgetId.current) {
        // @ts-ignore
        window.turnstile?.remove(turnstileWidgetId.current);
      }
    };
  }, [isTurnstileLoaded]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Skip Turnstile validation if using demo key
    const isDemoMode = TURNSTILE_SITE_KEY === "1x00000000000000000000AA";

    if (!isDemoMode && !turnstileToken) {
      toast({
        title: "Verification required",
        description: "Please complete the CAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Skip actual email sending in demo mode
      const isEmailDemo = EMAILJS_CONFIG.PUBLIC_KEY === "demo_public_key";

      if (isEmailDemo) {
        // Simulate email sending
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Demo mode - Form data:", formData);
      } else {
        // Send email via EmailJS
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          turnstile_token: turnstileToken,
        };

        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
      }

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTurnstileToken(null);

      // Reset Turnstile if not in demo mode
      if (!isDemoMode && turnstileWidgetId.current) {
        // @ts-ignore
        window.turnstile?.reset(turnstileWidgetId.current);
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "njabulophiri36@icloud.com",
      href: "mailto:njabulophiri36@icloud.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+27 76 540 2126",
      href: "tel:+27765402126",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Johannesburg, GP",
      href: "#",
      onClick: (e: React.MouseEvent) => e.preventDefault(),
    },
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
      href: "https://linkedin.com/in/njabulophiri36",
      label: "LinkedIn",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const isDemoMode = TURNSTILE_SITE_KEY === "1x00000000000000000000AA";

  return (
    <section id="contact" className="py-16 md:py-20 relative">
      {" "}
      {/* Better padding */}
      <div className="container mx-auto px-4 sm:px-6">
        {" "}
        {/* Better padding */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 md:mb-16"
          >
            {" "}
            {/* Better spacing */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4 md:mb-6">
              {" "}
              {/* Better text scaling */}
              Let's Work Together
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              {" "}
              {/* Better text scaling */}
              Got a project idea? I'd love to hear it. Let's build something
              incredible together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {" "}
            {/* Better gap */}
            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 md:space-y-8"
            >
              {" "}
              {/* Better spacing */}
              <div className="glass rounded-2xl p-6 md:p-8">
                {" "}
                {/* Better padding */}
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
                  {" "}
                  {/* Better text scaling */}
                  Get in Touch
                </h3>
                <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base">
                  {" "}
                  {/* Better text scaling */}
                  I'm always open to discussing new opportunities, creative
                  projects, or potential collaborations. Don't hesitate to reach
                  out!
                </p>
                <div className="space-y-4 md:space-y-6">
                  {" "}
                  {/* Better spacing */}
                  {contactInfo.map((info) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      onClick={info.onClick}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center p-3 md:p-4 rounded-lg glass hover-glow transition-all duration-300 group cursor-pointer"
                    >
                      <div className="p-2 md:p-3 rounded-lg bg-gradient-primary mr-3 md:mr-4 group-hover:scale-110 transition-transform">
                        {" "}
                        {/* Better padding */}
                        <info.icon size={18} className="text-white" />{" "}
                        {/* Better icon sizing */}
                      </div>
                      <div>
                        <div className="text-xs md:text-sm text-muted-foreground">
                          {" "}
                          {/* Better text scaling */}
                          {info.label}
                        </div>
                        <div className="font-medium text-sm md:text-base group-hover:text-primary transition-colors">
                          {" "}
                          {/* Better text scaling */}
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
                {/* Social Links */}
                <div className="pt-6 md:pt-8 border-t border-card-border mt-6">
                  <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
                    {" "}
                    {/* Better text scaling */}
                    Find Me On
                  </h4>
                  <div className="flex space-x-3 md:space-x-4">
                    {" "}
                    {/* Better spacing */}
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target={social.target}
                        rel={social.rel}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="p-2 md:p-3 rounded-lg glass hover-glow transition-all duration-300 group"
                        aria-label={social.label}
                      >
                        <social.icon
                          size={18}
                          className="group-hover:text-primary transition-colors"
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-6 md:p-8 space-y-4 md:space-y-6"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
                  {" "}
                  {/* Better text scaling */}
                  Send a Message
                </h3>

                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  {" "}
                  {/* Better gap */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm md:text-base">
                      Name
                    </Label>{" "}
                    {/* Better text scaling */}
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background-secondary border-card-border focus:border-primary text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm md:text-base">
                      Email
                    </Label>{" "}
                    {/* Better text scaling */}
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background-secondary border-card-border focus:border-primary text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm md:text-base">
                    Subject
                  </Label>{" "}
                  {/* Better text scaling */}
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-background-secondary border-card-border focus:border-primary text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm md:text-base">
                    Message
                  </Label>{" "}
                  {/* Better text scaling */}
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-background-secondary border-card-border focus:border-primary resize-none text-sm md:text-base"
                  />
                </div>

                {/* Turnstile CAPTCHA - Only show if not in demo mode */}
                {!isDemoMode && (
                  <div className="space-y-2">
                    <Label className="text-sm md:text-base">Verification</Label>{" "}
                    {/* Better text scaling */}
                    <div
                      ref={turnstileContainerRef}
                      className="flex justify-center py-2"
                    />
                  </div>
                )}

                {/* Demo mode notice */}
                {isDemoMode && (
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-xs text-yellow-600 text-center">
                      Demo mode: Form validation only. No actual emails will be
                      sent.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || (!isDemoMode && !turnstileToken)}
                  className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />{" "}
                      {/* Better icon sizing */}
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
