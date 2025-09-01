import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Cloud,
  Smartphone,
  Palette,
  Brain,
  Server,
  GitBranch,
  Terminal,
  Zap,
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const categoryVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// Badge logic
const getProficiencyLabel = (level: number) => {
  if (level >= 85)
    return {
      label: "Expert",
      color: "bg-gradient-to-r from-green-400 to-green-600",
    };
  if (level >= 70)
    return {
      label: "Intermediate",
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    };
  return {
    label: "Beginner",
    color: "bg-gradient-to-r from-red-400 to-red-600",
  };
};

// SkillBar component
const SkillBar = ({ name, level }: { name: string; level: number }) => {
  const { label, color } = getProficiencyLabel(level);

  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm md:text-base">{name}</span>{" "}
        {/* Better text scaling */}
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm text-muted-foreground font-mono">
            {" "}
            {/* Better text scaling */}
            {level}%
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full text-white ${color}`}
          >
            {label}
          </span>
        </div>
      </div>
      <div className="h-2 bg-accent rounded-full overflow-hidden">
        <motion.div
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="h-full bg-gradient-primary rounded-full relative"
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse-glow rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// SkillCategory component
const SkillCategory = ({
  title,
  icon: Icon,
  skills,
}: {
  title: string;
  icon: any;
  skills: { name: string; level: number }[];
}) => (
  <motion.section
    aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
    variants={itemVariants}
    className="glass rounded-2xl p-6 md:p-8 hover-lift group"
  >
    <div className="flex items-center mb-4 md:mb-6">
      {" "}
      {/* Better spacing */}
      <div className="p-2 md:p-3 rounded-xl bg-gradient-primary mr-3 md:mr-4 group-hover:scale-110 transition-transform">
        {" "}
        {/* Better sizing */}
        <Icon
          size={20}
          className="text-white"
          aria-label={`${title} icon`}
        />{" "}
        {/* Better icon sizing */}
      </div>
      <h3
        id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
        className="text-lg md:text-xl font-semibold"
      >
        {title}
      </h3>
    </div>
    <motion.div
      variants={categoryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className="space-y-3 md:space-y-4"
    >
      {skills.map((skill) => (
        <SkillBar key={skill.name} name={skill.name} level={skill.level} />
      ))}
    </motion.div>
  </motion.section>
);

// ToolCard component
const ToolCard = ({ icon: Icon, name, color, level }: any) => {
  const { label, color: badgeColor } = getProficiencyLabel(level);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center p-3 md:p-4 rounded-xl glass hover-glow transition-all duration-300 group"
    >
      <Icon
        size={28}
        className={`${color} mb-2 group-hover:animate-bounce`}
        aria-label={`${name} icon`}
      />
      <span className="text-xs md:text-sm font-medium text-center">{name}</span>{" "}
      {/* Better text scaling */}
      <span
        className={`mt-1 text-xs px-2 py-0.5 rounded-full text-white ${badgeColor}`}
      >
        {label}
      </span>
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Backend Development",
      icon: Server,
      skills: [
        { name: "Java (Core & Advanced)", level: 95 },
        { name: "Spring Boot", level: 90 },
        { name: "Spring MVC", level: 85 },
        { name: "Hibernate/JPA", level: 80 },
        { name: "JUnit & Mockito", level: 75 },
        { name: "REST API Design", level: 85 },
      ],
    },
    {
      title: "Frontend Development",
      icon: Code2,
      skills: [
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "React.js", level: 90 },
        { name: "HTML5 & CSS3", level: 95 },
        { name: "TailwindCSS", level: 90 },
        { name: "Responsive Design", level: 85 },
      ],
    },
    {
      title: "Databases & Cloud",
      icon: Database,
      skills: [
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "Redis", level: 70 },
        { name: "Docker", level: 80 },
        { name: "AWS Basics", level: 70 },
      ],
    },
    {
      title: "Development Tools",
      icon: Brain,
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "Postman & Swagger", level: 80 },
        { name: "CI/CD (GitHub Actions)", level: 75 },
        { name: "IntelliJ IDEA / VS Code", level: 85 },
        { name: "Linux/Unix Basics", level: 70 },
        { name: "Agile/Scrum", level: 80 },
      ],
    },
  ];

  const tools = [
    { icon: GitBranch, name: "Git", color: "text-orange-500", level: 90 },
    { icon: Cloud, name: "AWS", color: "text-yellow-500", level: 70 },
    { icon: Database, name: "PostgreSQL", color: "text-cyan-500", level: 80 },
    { icon: Code2, name: "React.js", color: "text-blue-400", level: 90 },
    { icon: Server, name: "Spring Boot", color: "text-red-500", level: 90 },
    { icon: Terminal, name: "CLI", color: "text-green-500", level: 75 },
    { icon: Smartphone, name: "Mobile", color: "text-blue-500", level: 70 },
    { icon: Palette, name: "Design", color: "text-pink-500", level: 65 },
    { icon: Zap, name: "Performance", color: "text-purple-500", level: 80 },
  ];

  return (
    <section id="skills" className="py-16 md:py-20 relative">
      {" "}
      {/* Better padding */}
      <div className="container mx-auto px-4 sm:px-6">
        {" "}
        {/* Better padding */}
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
            Skills & Expertise
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
          >
            A comprehensive toolkit for building modern, scalable applications
          </motion.p>
        </motion.div>
        {/* Skill Categories */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category) => (
            <SkillCategory key={category.title} {...category} />
          ))}
        </motion.div>
        {/* Tools & Technologies */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mt-12 md:mt-16 text-center"
        >
          <motion.h3
            variants={itemVariants}
            className="text-xl md:text-2xl font-semibold mb-6 md:mb-8"
          >
            Tools & Technologies
          </motion.h3>
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {tools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
