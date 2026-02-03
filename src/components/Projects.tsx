import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Play,
  Code,
  Smartphone,
  Brain,
  Database,
  Server,
  Cloud,
  Box,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface ProjectsProps {
  projectsRef?: React.RefObject<HTMLElement>;
}

// Define types for better type safety
type TechName =
  | "React"
  | "Vite"
  | "Spring Boot"
  | "PostgreSQL"
  | "MySQL"
  | "MongoDB"
  | "Docker"
  | "AWS"
  | "Eureka"
  | "React Hooks"
  | "Routing"
  | "Login"
  | "Signup"
  | "JSX"
  | "CSS"
  | "JavaScript"
  | "HTML5 Canvas"
  | "CSS3"
  | "Game Logic"
  | "TypeScript"
  | "OpenWeatherMap API"
  | "Framer Motion"
  | "Spring Cloud Gateway"
  | "Gemini API"
  | "Next.js"
  | "Prisma"
  | "Tailwind"
  | "Vercel";

interface TechIcon {
  icon: React.ComponentType<any>;
  color: string;
}

interface ProjectLink {
  live: string;
  github: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  tech: TechName[];
  role: string;
  links: ProjectLink;
  icon: React.ComponentType<any>;
  color: string;
  hasImage: boolean;
}

// Tech badges with icons and colors
const techIcons: Record<TechName, TechIcon> = {
  React: { icon: Code, color: "text-blue-400" },
  Vite: { icon: Code, color: "text-purple-400" },
  "Spring Boot": { icon: Server, color: "text-green-600" },
  PostgreSQL: { icon: Database, color: "text-cyan-500" },
  MySQL: { icon: Database, color: "text-blue-500" },
  MongoDB: { icon: Database, color: "text-green-700" },
  Docker: { icon: Box, color: "text-blue-500" },
  AWS: { icon: Cloud, color: "text-yellow-500" },
  Eureka: { icon: Cloud, color: "text-teal-400" },
  "React Hooks": { icon: Code, color: "text-blue-300" },
  Routing: { icon: Code, color: "text-purple-300" },
  Login: { icon: Code, color: "text-green-300" },
  Signup: { icon: Code, color: "text-pink-300" },
  JSX: { icon: Code, color: "text-blue-500" },
  CSS: { icon: Code, color: "text-purple-500" },
  JavaScript: { icon: Code, color: "text-yellow-500" },
  "HTML5 Canvas": { icon: Code, color: "text-orange-500" },
  CSS3: { icon: Code, color: "text-pink-500" },
  "Game Logic": { icon: Brain, color: "text-red-400" },
  TypeScript: { icon: Code, color: "text-blue-600" },
  "OpenWeatherMap API": { icon: Cloud, color: "text-green-500" },
  "Framer Motion": { icon: Code, color: "text-purple-500" },
  "Spring Cloud Gateway": { icon: Server, color: "text-indigo-500" },
  "Gemini API": { icon: Brain, color: "text-amber-500" },
  "Next.js": { icon: Code, color: "text-white" },
  Prisma: { icon: Database, color: "text-indigo-500" },
  Tailwind: { icon: Code, color: "text-cyan-400" },
  Vercel: { icon: Cloud, color: "text-white" }
};

// Projects data with public folder paths
const projectsData: Project[] = [
  {
    title: "PacMan JS Game",
    description:
      "Classic PacMan game built with vanilla JavaScript, featuring smooth animations, collision detection, and progressive difficulty levels.",
    image: "/pacman-screenshot.png",
    tech: ["JavaScript", "HTML5 Canvas", "CSS3", "Game Logic"],
    role: "Frontend Developer",
    links: {
      live: "https://teal-biscuit-1e547f.netlify.app/",
      github: "https://github.com/njabulophiri-dev/PacMan-Game",
    },
    icon: Play,
    color: "from-yellow-500 to-orange-500",
    hasImage: true,
  },
  {
    title: "React Weather App",
    description:
      "Real-time weather application with location services, weather forecasts, and animated UI components.",
    image: "/weather-screenshot.png",
    tech: ["React", "TypeScript", "OpenWeatherMap API", "Framer Motion"],
    role: "Frontend Developer",
    links: {
      live: "https://jaydonweather.netlify.app/",
      github: "https://github.com/njabulophiri-dev/Weather-App",
    },
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    hasImage: true,
  },
  {
    title: "Food Delivery E-commerce",
    description:
      "Frontend made with React + Vite. Features React Hooks, Components, Routing, Login/Signup, CSS styling, and JSX.",
    image: "/food-delivery-screenshot.png",
    tech: [
      "React",
      "Vite",
      "React Hooks",
      "Routing",
      "Login",
      "Signup",
      "CSS",
      "JSX",
    ],
    role: "Frontend Developer",
    links: {
      live: "https://react-delivery.netlify.app/",
      github: "https://github.com/njabulophiri-dev/react-food-delivery",
    },
    icon: Smartphone,
    color: "from-green-500 to-emerald-500",
    hasImage: true,
  },
  {
    title: "LoadShare Pro",
    description:
      "A production-grade web platform helping users discover businesses with backup power during load-shedding. Built with a backend-first approach, focusing on domain modeling, data integrity and scalable architecture.",
    image: "/loadshare-pro-screenshot.png", // add later when UI exists
    tech: ["Next.js", "PostgreSQL", "Prisma", "Tailwind", "Vercel", "Routing", "Login", "Signup", "TypeScript"],
    role: "Full-Stack Developer",
    links: {
      live: "#", // will become real later
      github: "https://github.com/njabulophiri-dev/loadshare-pro",
    },
    icon: Cloud,
    color: "from-orange-500 to-red-500",
    hasImage: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const badgeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// ProjectCard component for better separation of concerns
const ProjectCard = ({ project }: { project: Project }) => {
  const isComingSoon = project.links.live === "#";
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -6,
        boxShadow: "0px 15px 30px rgba(0,0,0,0.15)",
      }}
      className="group flex"
    >
      <Card className="glass border-card-border overflow-hidden hover-glow transition-all duration-500 flex flex-col h-full w-full">
        <div className="relative flex-1 flex flex-col">
          {/* Project Image */}
          <div className="aspect-video relative overflow-hidden group bg-gradient-to-br from-gray-900 to-gray-800">          
            {project.hasImage && !imageError ? (
              <motion.img
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                className="object-cover w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                onError={handleImageError}
              />
            ) : (

            <div className="w-full h-full flex items-center justify-center">
              <project.icon size={40} className="text-white/80" />
            </div>
            )}

            {/* Hover Buttons / Coming Soon */}
            <motion.div
              className={`absolute inset-0 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4 ${
                isComingSoon
                  ? "bg-black/70"
                  : "bg-black/0 group-hover:bg-black/40 opacity-0 group-hover:opacity-100"
              }`}
              initial={{ scale: 0.95 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isComingSoon ? (
                <>
                  <motion.div className="text-white text-base md:text-lg font-semibold tracking-wider relative z-10 animate-pulse text-center">
                    Coming Soon
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Brain size={60} className="text-white/20" />
                  </motion.div>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-xs md:text-sm"
                    asChild
                  >
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      <ExternalLink size={14} className="mr-1 md:mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/20 text-xs md:text-sm"
                    asChild
                  >
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code of ${project.title}`}
                    >
                      <Github size={14} className="mr-1 md:mr-2" />
                      View Code
                    </a>
                  </Button>
                </>
              )}
            </motion.div>
          </div>

          {/* Card Content */}
          <CardContent className="p-4 md:p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-2 italic">
                {project.role}
              </p>
              <p className="text-muted-foreground text-sm md:text-base mb-3 md:mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech badges */}
              <motion.div
                variants={badgeContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4"
              >
                {project.tech.map((tech) => {
                  const TechIcon = techIcons[tech]?.icon || Code;
                  const colorClass = techIcons[tech]?.color || "text-white";
                  const isMainTech = [
                    "React",
                    "Spring Boot",
                    "Docker",
                    "AWS",
                    "PostgreSQL",
                    "MongoDB",
                    "MySQL",
                    "Eureka",
                    "JavaScript",
                    "TypeScript",
                  ].includes(tech);

                  return (
                    <motion.span
                      key={tech}
                      variants={badgeVariants}
                      className={`flex items-center gap-1 px-2 md:px-3 py-1 text-[10px] md:text-xs font-medium rounded-full border border-card-border transition-colors ${
                        isMainTech
                          ? "bg-gradient-to-r from-primary to-secondary text-white hover:scale-105"
                          : "bg-accent text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {TechIcon && (
                        <TechIcon size={10} className={colorClass} />
                      )}
                      {tech}
                    </motion.span>
                  );
                })}
              </motion.div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

const Projects = ({ projectsRef }: ProjectsProps) => {
  return (
    <section
      id="projects"
      ref={projectsRef}
      className="py-16 md:py-20 relative"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4 md:mb-6"
          >
            Project Highlights
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
          >
            A selection of projects that demonstrate my skills in frontend and
            full-stack development, from interactive games to enterprise-grade
            applications.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 md:mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 hover:border-primary hover:bg-primary/10 px-6 md:px-8 text-sm md:text-base"
            asChild
          >
            <a
              href="https://github.com/njabulophiri-dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View all projects on GitHub"
            >
              <Github size={16} className="mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
