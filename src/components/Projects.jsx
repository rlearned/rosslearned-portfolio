import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Zap, Code2, Rocket } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'Amazon Elevator Stocks',
    tagline: 'Quantitative Trading Bot',
    icon: Zap,
    color: '#f59e0b',
    description: 'Designed a quantitative trading bot to evaluate if Amazon employees outperform the market, employing statistical analysis and automating trades via Alpaca API',
    techStack: ['Python', 'AWS Lambda', 'Alpaca Trading API', 'Telegram API'],
    highlights: [
      'Statistical analysis using Sharpe ratio, alpha, p-values with automated trade execution',
      'Implemented portfolio optimizations (momentum, post-earnings-announcement drift) achieving 22% annualized return over 6-month period',
      'Developed serverless architecture processing 10K+ market data points/minute with real-time analytics dashboard',
    ],
  },
  {
    id: 2,
    name: 'FreeFly',
    tagline: 'Award Flight Search Engine',
    icon: Rocket,
    color: '#06b6d4',
    dates: 'May 2024 – Present',
    description: 'Full-stack web application for searching award flight availability with real-time search engine and indexed queries for efficient searches across multiple cities',
    techStack: ['Java', 'Spring Boot', 'React', 'RabbitMQ', 'Google Cloud Platform', 'Redis'],
    highlights: [
      'Reduced response times by over 50% through asynchronous processing and caching using Amadeus Flight API and Seats.aero API',
      'Implemented real-time alert system with RabbitMQ & Twilio for SMS/email notifications on flight availability changes',
      'Deployed on GCP (App Engine, Cloud SQL, Storage) ensuring high availability and scalability',
    ],
  },
  {
    id: 3,
    name: 'EcoTracker',
    tagline: 'Sustainable Business Discovery Platform',
    icon: Code2,
    color: '#22c55e',
    dates: 'March 2024 – June 2024',
    role: 'Team Lead',
    description: 'Led team of 5 developers using Scrum methodology to create mobile platform for discovering sustainable businesses with personalized recommendations',
    techStack: ['React Native', 'Node.js', 'OpenStreetMap API', 'Firebase'],
    highlights: [
      'Designed personalized recommendation algorithm that increased user engagement by 30%',
      'Integrated OpenStreetMap API for eco-conscious routes and navigation',
      'Led team coordination, sprint planning, and stand-ups using Scrum methodology',
    ],
  },
]

const ProjectCard = ({ project, index, onClick }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const Icon = project.icon

  return (
    <motion.div
      className="card-3d-container cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={() => onClick(project)}
    >
      <motion.div
        ref={cardRef}
        className="card-3d relative h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="glass-card p-8 h-full relative overflow-hidden"
          animate={{
            boxShadow: isHovered
              ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px ${project.color}20`
              : '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Accent Line */}
          <motion.div
            className="absolute top-0 left-0 h-1 rounded-t-3xl"
            style={{ backgroundColor: project.color }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          />

          {/* Icon */}
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ backgroundColor: `${project.color}20` }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon className="w-7 h-7" style={{ color: project.color }} />
          </motion.div>

          {/* Title */}
          <h3 
            className="text-2xl font-bold mb-2"
            style={{ 
              background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}cc 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {project.name}
          </h3>
          
          <p className="text-white/70 text-sm font-medium mb-4">{project.tagline}</p>

          {/* Description Preview */}
          <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack Preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/70"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/50">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* View More Hint */}
          <motion.div
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: project.color }}
            animate={{ x: isHovered ? 5 : 0 }}
          >
            View Details
            <ChevronRight className="w-4 h-4" />
          </motion.div>

          {/* Hover Glow */}
          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: project.color }}
            animate={{
              opacity: isHovered ? 0.15 : 0,
              scale: isHovered ? 1.2 : 0.8,
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const ProjectModal = ({ project, onClose }) => {
  const Icon = project.icon

  // Lock body scroll and stop Lenis when modal is open
  useEffect(() => {
    // Stop Lenis smooth scroll
    if (window.lenis) {
      window.lenis.stop()
    }
    // Also prevent native scrolling as fallback
    document.body.style.overflow = 'hidden'
    
    return () => {
      // Resume Lenis smooth scroll
      if (window.lenis) {
        window.lenis.start()
      }
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 flex items-start justify-center pt-20 pb-8 px-4 md:px-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ 
        isolation: 'isolate',
        zIndex: 99999,
      }}
    >
      {/* Backdrop - fully opaque base layer */}
      <div 
        className="fixed inset-0 bg-[#0a0a1a]" 
        style={{ zIndex: 1 }}
      />
      {/* Blur overlay */}
      <motion.div
        className="fixed inset-0 bg-deep-navy/90 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 2 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-3xl glass-card p-8 md:p-12 my-auto"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 3 }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        {/* Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ backgroundColor: project.color }}
        />

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${project.color}20` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Icon className="w-8 h-8" style={{ color: project.color }} />
          </motion.div>
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ 
                background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}cc 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {project.name}
            </h2>
            <p className="text-lg text-white/70">{project.tagline}</p>
            {project.role && (
              <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-white/10 text-white/80">
                {project.role}
              </span>
            )}
            {project.dates && (
              <span className="inline-block mt-2 ml-2 px-3 py-1 text-sm rounded-full bg-white/5 text-white/60">
                {project.dates}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <motion.p
          className="text-lg text-white/80 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {project.description}
        </motion.p>

        {/* Tech Stack */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm font-semibold text-accent-purple mb-4 uppercase tracking-wider">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                className="tech-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-sm font-semibold text-accent-purple mb-4 uppercase tracking-wider">
            Key Achievements
          </h3>
          <ul className="space-y-4">
            {project.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-white/80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <ChevronRight 
                  className="w-5 h-5 mt-0.5 shrink-0" 
                  style={{ color: project.color }}
                />
                <span className="leading-relaxed">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 rounded-full bg-cyan-500/5 blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-1/3 h-1/2 rounded-full bg-amber-500/5 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-accent-purple text-sm font-semibold tracking-widest uppercase mb-4 block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Work
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Personal and collaborative projects showcasing full-stack development, cloud architecture, and data-driven solutions
          </motion.p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
