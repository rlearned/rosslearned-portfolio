import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MapPin, Calendar, Briefcase, ChevronRight } from 'lucide-react'

const experiences = [
  {
    id: 1,
    company: 'Amazon',
    title: 'Jr. Software Development Engineer III',
    location: 'Seattle, WA',
    dates: 'Nov 2024 – Present',
    color: '#FF9900',
    highlights: [
      'Built and maintain global serverless feature (Lambda + API Gateway) serving 60MM+ requests/day with p99 latency under 200ms; authored design docs/runbooks and led shadow → canary → GA rollout. Managed full SDLC and reduced cold start latency 71% (7s→2s) via SnapStart while optimizing cost.',
      'Participated in on-call rotation managing high-severity events; lead operational reviews, sprint planning, and daily stand-ups to drive reliability improvements',
      'Built real-time observability systems leveraging CloudWatch, cutting system downtime via automated scaling, anomaly detection, and alerting',
      'Designed and deployed global CI/CD pipelines with automated integration tests across all regions',
    ],
  },
  {
    id: 2,
    company: 'ZTRAMarketing',
    title: 'Founder',
    location: 'Seattle, WA',
    dates: 'June 2018 – February 2024',
    color: '#8b5cf6',
    highlights: [
      'Founded and ran tech-focused digital marketing company, achieving over $650k in client revenue with clients including Bitcoin.com and Fortune 500 founders',
      'Engineered Instagram content scheduler and analytics tool with Python and Instagram API, reducing manual workload by 40% and increasing engagement rates by 20%',
      'Strategically grew Instagram accounts to 12M+ followers through data-driven strategies, audience analysis, and influencer partnerships',
      'Launched and scaled e-commerce business to over $400K in revenue; achieved 50M+ organic video views across Instagram & TikTok',
    ],
  },
]

const ExperienceCard = ({ experience, index }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations for tilt
  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

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

  return (
    <motion.div
      className="card-3d-container w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <motion.div
        ref={cardRef}
        className="card-3d relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="glass-card p-8 md:p-10 relative overflow-hidden"
          animate={{
            boxShadow: isHovered
              ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 80px ${experience.color}25`
              : '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Company Accent Line */}
          <motion.div
            className="absolute top-0 left-0 h-1 rounded-t-3xl"
            style={{ backgroundColor: experience.color }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${experience.color}20` }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Briefcase className="w-6 h-6" style={{ color: experience.color }} />
                </motion.div>
                <div>
                  <h3 
                    className="text-2xl md:text-3xl font-bold"
                    style={{ 
                      background: `linear-gradient(135deg, ${experience.color} 0%, ${experience.color}cc 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {experience.company}
                  </h3>
                  <p className="text-lg text-white/90 font-medium">{experience.title}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {experience.dates}
              </span>
            </div>
          </div>

          {/* Highlights */}
          <ul className="space-y-4">
            {experience.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-white/80"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 }}
              >
                <ChevronRight 
                  className="w-5 h-5 mt-0.5 shrink-0" 
                  style={{ color: experience.color }}
                />
                <span className="leading-relaxed">{highlight}</span>
              </motion.li>
            ))}
          </ul>

          {/* Floating decorative element on hover */}
          <motion.div
            className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: experience.color }}
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

const Experience = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-amazon-orange/5 blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-1/3 h-1/2 rounded-full bg-accent-purple/10 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
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
            Work History
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Building scalable systems and leading impactful projects at world-class organizations
          </motion.p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
