import { motion } from "framer-motion";
import { Code, Coffee, Gamepad2, Music, MapPin, Calendar } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Code, label: "Years of Experience", value: "2+" },
    { icon: Coffee, label: "Projects Completed", value: "10+" },
    { icon: Gamepad2, label: "Technologies Learned", value: "5-8" },
    { icon: Music, label: "Happy Clients", value: "5+" },
  ];

  const journey = [
    {
      year: "2019",
      events: [
        {
          title: "Enrolled at Southern Federal University (Russia)",
          description:
            "I received a full scholarship to study in Russia through an intergovernmental partnership between Russia and South Africa. This was an in-person study program in the city of Rostov-on-Don.",
        },
      ],
    },
    {
      year: "2020",
      events: [
        {
          title: "Started Development Journey",
          description:
            "Began learning out of curiosity about how the web works; exploring HTML, CSS and JavaScript.",
        },
      ],
    },
    {
      year: "2021",
      events: [
        {
          title: "Web Development Deep Dive",
          description:
            "Built small projects to practice HTML, CSS and JavaScript skills.",
        },
      ],
    },
    {
      year: "2022",
      events: [
        {
          title: "React & Node.js",
          description:
            "Started learning React and Node.js by building web applications and experimenting with APIs.",
        },
      ],
    },
    {
      year: "2023",
      events: [
        {
          title: "Java & Spring Boot",
          description:
            "Explored backend development using Java and the Spring Boot framework.",
        },
        {
          title: "Graduation",
          description:
            "Graduated with an Honors degree in Computer Science and IT, with a research project in Authorship Attribution using Software and Statistical Methods.",
        },
      ],
    },
    {
      year: "2024 - Current",
      events: [
        {
          title: "Junior Developer",
          description:
            "Focusing on improving my full-stack skills, exploring AI integration and building production-ready applications.",
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-16 md:py-20 relative">
      {" "}
      <div className="container mx-auto px-4 sm:px-6">
        {" "}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Better viewport detection
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 md:mb-16"
          >
            {" "}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4 md:mb-6">
              {" "}
              About Me
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              {" "}
              Junior full-stack developer passionate about learning, building
              web applications and creating meaningful digital experiences.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {" "}
            {/* Personal Info */}
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
                  Hello, I'm Njabulo 👋
                </h3>
                <div className="space-y-3 md:space-y-4 text-muted-foreground text-sm md:text-base">
                  {" "}
                  {/* Better spacing */}
                  <p>
                    I'm a web developer driven by curiosity and a passion for
                    crafting seamless digital experiences. My journey began with
                    a fascination for the web and today I thrive on tackling
                    complex challenges and delivering clean, efficient
                    solutions.
                  </p>
                  <p>
                    I specialize in modern JavaScript frameworks,
                    enterprise-grade Java applications and exploring AI-powered
                    integrations. I dedicate myself to writing maintainable code
                    and building user experiences that make a real impact.
                  </p>
                  <p>
                    Outside of coding, I enjoy experimenting with new tools,
                    contributing to open-source projects and continuously
                    expanding my skill set. I'm always eager to grow and
                    collaborate on projects that push boundaries.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-primary flex-shrink-0" />
                    <span>Johannesburg, GP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar
                      size={16}
                      className="text-secondary flex-shrink-0"
                    />
                    <span>Open To Work</span>
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="glass rounded-xl p-4 md:p-6 text-center group hover-glow"
                  >
                    <stat.icon
                      size={20}
                      className="mx-auto mb-2 md:mb-3 text-primary group-hover:scale-110 transition-transform"
                    />
                    <div className="text-xl md:text-2xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Journey Timeline */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
                My Journey
              </h3>{" "}
              {/* Better text scaling */}
              <div className="relative">
                {/* Timeline line - hidden on mobile, visible on tablet+ */}
                <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-primary opacity-30 hidden sm:block" />

                <div className="space-y-6 md:space-y-8">
                  {" "}
                  {/* Better spacing */}
                  {journey.map((item, index) => (
                    <motion.div
                      key={`${item.year}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-50px" }} // Better viewport detection
                      className="relative flex items-start"
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4 md:mr-6">
                        {" "}
                        {/* Better sizing */}
                        <span className="text-xs md:text-sm font-bold text-white">
                          {" "}
                          {/* Better text scaling */}
                          {item.year.slice(0, 4)}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 glass rounded-lg p-4 md:p-6 hover-lift min-w-0">
                        {" "}
                        {/* Better padding, min-width */}
                        <div className="text-xs md:text-sm text-primary font-semibold mb-2 md:mb-3">
                          {" "}
                          {/* Better text scaling */}
                          {item.year}
                        </div>
                        {item.events.map((event, idx) => (
                          <div key={idx} className="mb-3 md:mb-4 last:mb-0">
                            {" "}
                            {/* Better spacing */}
                            <h4 className="font-semibold text-sm md:text-base mb-1 md:mb-2">
                              {" "}
                              {/* Better text scaling */}
                              {event.title}
                            </h4>
                            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                              {" "}
                              {/* Better text scaling */}
                              {event.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
