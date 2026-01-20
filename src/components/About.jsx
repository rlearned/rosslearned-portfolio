import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Award, MapPin, Briefcase } from 'lucide-react'

const techStack = {
  languages: ['Java', 'Python', 'C++', 'SQL', 'Bash', 'Swift', 'JavaScript', 'HTML/CSS'],
  frameworks: ['Spring', 'Spring Data JPA', 'Hibernate', 'React', 'Node.js', 'JUnit'],
  cloud: ['AWS Lambda', 'API Gateway', 'ECS/EC2', 'S3', 'SQS/SNS', 'CloudWatch', 'IAM', 'VPC', 'CloudFormation', 'CDK', 'GCP', 'Docker', 'Kubernetes'],
  tools: ['DynamoDB', 'Redis', 'RabbitMQ', 'Postman', 'Git/GitHub', 'Jenkins', 'Linux', 'Bloomberg Terminal'],
}

const TechBadge = ({ name }) => (
  <motion.span
    className="tech-badge"
    whileHover={{ scale: 1.05, y: -2 }}
  >
    {name}
  </motion.span>
)

const TechCategory = ({ title, items, delay }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <h4 className="text-sm font-semibold text-accent-purple mb-3 uppercase tracking-wider">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <TechBadge key={item} name={item} delay={delay + index * 0.05} />
        ))}
      </div>
    </motion.div>
  )
}

const About = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent-purple/10 blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent-violet/10 blur-[120px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            About Me
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="gradient-text">Who I Am</span>
          </motion.h2>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Column - Bio & Education */}
          <motion.div variants={itemVariants}>
            <div className="glass-card p-8 h-full">
              {/* Bio */}
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                I'm an Informatics and Finance student at the University of Washington, 
                expected to graduate in June 2026. I'm passionate about building innovative, 
                scalable software solutions that have real-world impact.
              </p>

              {/* Education Card */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6 text-accent-purple" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      University of Washington
                    </h3>
                    <p className="text-white/70 mb-1">
                      Bachelor of Science in Informatics
                    </p>
                    <p className="text-white/70 mb-3">
                      Bachelor of Arts in Finance
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center gap-1.5 text-sm text-white/60">
                        <MapPin className="w-4 h-4" />
                        Seattle, WA
                      </span>
                      <span className="text-sm text-white/60">
                        June 2026
                      </span>
                    </div>
                  </div>
                </div>

                {/* GPA Badge */}
                <motion.div
                  className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-accent-purple/10 to-accent-violet/10 border border-accent-purple/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">3.7 GPA</p>
                    <p className="text-sm text-white/60">Dean's List — All Quarters</p>
                  </div>
                </motion.div>

                {/* Current Position */}
                <div className="flex items-start gap-4 mt-6">
                  <div className="w-12 h-12 rounded-xl bg-amazon-orange/20 flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6 text-amazon-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Amazon
                    </h3>
                    <p className="text-white/70 mb-3">
                      Jr. Software Development Engineer III
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center gap-1.5 text-sm text-white/60">
                        <MapPin className="w-4 h-4" />
                        Seattle, WA
                      </span>
                      <span className="text-sm text-white/60">
                        Nov 2024 – Present
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tech Stack */}
          <motion.div variants={itemVariants}>
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-8">
                Technical <span className="gradient-text">Expertise</span>
              </h3>

              <TechCategory
                title="Languages"
                items={techStack.languages}
                delay={0}
              />
              <TechCategory
                title="Frameworks & Libraries"
                items={techStack.frameworks}
                delay={0.1}
              />
              <TechCategory
                title="Cloud & DevOps"
                items={techStack.cloud}
                delay={0.2}
              />
              <TechCategory
                title="Databases & Tools"
                items={techStack.tools}
                delay={0.3}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
