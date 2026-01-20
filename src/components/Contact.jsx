import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react'

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/ross-learned',
    icon: Linkedin,
    color: '#0A66C2',
    username: 'ross-learned',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/rlearned',
    icon: Github,
    color: '#ffffff',
    username: 'rlearned',
  },
]

const SocialLink = ({ link, index }) => {
  const Icon = link.icon

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 p-4 rounded-2xl glass overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: 5 }}
      style={{ position: 'relative', zIndex: 50 }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 bg-white/5 group-hover:bg-opacity-20"
        style={{ 
          '--hover-color': `${link.color}20`,
        }}
      >
        <Icon 
          className="w-6 h-6 transition-colors duration-300 text-white/70 group-hover:text-white" 
          style={{ '--link-color': link.color }}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white group-hover:text-white/90 transition-colors">
          {link.name}
        </p>
        <p className="text-sm text-white/50">{link.username}</p>
      </div>

      <div className="w-5 h-5 flex-shrink-0 pointer-events-none">
        <ExternalLink className="w-5 h-5 text-white/50 transition-all duration-300 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
    </motion.a>
  )
}

const Contact = () => {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)

  // 3D tilt effect for main card - smoother spring config to prevent flickering
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 50, damping: 30, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-accent-purple/10 blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-1/3 h-1/2 rounded-full bg-accent-violet/10 blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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
            Get In Touch
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="gradient-text">Let's Connect</span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Interested in collaborating or just want to say hello? I'd love to hear from you.
          </motion.p>
        </motion.div>

        {/* Main Contact Card */}
        <motion.div
          className="card-3d-container"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            ref={cardRef}
            className="card-3d"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              className="p-8 md:p-12 rounded-3xl"
              initial={false}
              animate={{
                background: isHovered 
                  ? 'rgba(255, 255, 255, 0.06)' 
                  : 'rgba(255, 255, 255, 0.03)',
                borderColor: isHovered 
                  ? 'rgba(139, 92, 246, 0.3)' 
                  : 'rgba(255, 255, 255, 0.08)',
                boxShadow: isHovered
                  ? '0 16px 48px rgba(0, 0, 0, 0.4), 0 0 60px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid',
              }}
            >
              <div className="grid md:grid-cols-2 gap-12">
                {/* Left Column - Contact Info */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-8">
                    Contact <span className="gradient-text">Information</span>
                  </h3>

                  {/* Email */}
                  <motion.a
                    href="mailto:ross.c.learned@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-2xl glass group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'relative', zIndex: 50 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-accent-purple" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50 mb-1">Email</p>
                      <p className="font-medium text-white group-hover:text-accent-purple transition-colors">
                        ross.c.learned@gmail.com
                      </p>
                    </div>
                  </motion.a>
                </div>

                {/* Right Column - Social Links */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-8">
                    Social <span className="gradient-text">Links</span>
                  </h3>

                  <div className="space-y-3">
                    {socialLinks.map((link, index) => (
                      <SocialLink key={link.name} link={link} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />
          
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Ross Learned. All rights reserved.
          </p>
          
          <motion.p
            className="text-white/20 text-xs mt-2"
            whileHover={{ color: 'rgba(139, 92, 246, 0.6)' }}
          >
            Built with React, Three.js & Framer Motion
          </motion.p>
        </motion.footer>
      </div>
    </section>
  )
}

export default Contact
