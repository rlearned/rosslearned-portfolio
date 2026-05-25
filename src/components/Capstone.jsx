import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Ghost, Target, Users, Lightbulb, ArrowRight, Brain, TrendingUp } from 'lucide-react'

const accent = '#a855f7'

const goals = [
  'Build an iOS app that lets retail traders log "ghost trades" — trades they considered but never executed',
  'Track what would have happened if those trades had been placed using real market data',
  'Surface behavioral patterns around hesitation, regret, and overconfidence',
  'Translate behavioral finance research into a reflective, low-pressure user experience',
]

const teamWork = [
  'Defined the problem space and ran early discovery interviews with retail traders to validate the "missed trade" hypothesis',
  'Scoped P0/P1/P2 features together and aligned on a research-backed product narrative around hesitation and regret aversion',
  'Worked through wireframes and high-fidelity Figma mockups as a group, iterating after each round of usability feedback',
  'Split work across iOS frontend (SwiftUI), Java/Spring Boot backend, and AWS serverless infrastructure',
  'Ran weekly syncs to integrate work, unblock teammates, and review research findings',
]

const myWork = [
  'Owned backend architecture: designed Java/Spring Boot services on AWS Lambda with DynamoDB for ghost trade storage and performance tracking',
  'Integrated the Twelve Data API to back-fill historical prices and compute "what would have happened" outcomes for each ghost trade',
  'Built the hesitation-tax aggregation logic that turns raw ghost trades into the descriptive insights surfaced on the dashboard',
  'Contributed to SwiftUI screens for the logging flow and the Ghost Performance Dashboard',
  'Set up infrastructure-as-code (AWS CDK) so the team could deploy and tear down environments consistently',
]

const takeaways = [
  'Behavioral framing matters as much as the feature itself — calling something a "ghost trade" changed how testers talked about their own decisions',
  'Designing for reflection (not optimization) requires resisting the urge to add scores, rankings, and leaderboards',
  'Serverless was the right call for a small team: we shipped P0 and P1 without anyone owning ops full-time',
  'Pairing user research with backend instrumentation early made later behavioral-pattern features much easier to build',
]

const nextSteps = [
  'Finish polish on the Investor DNA Profile and tag/notes flows (remaining P1 work)',
  'Run a second round of usability testing focused on the dashboard insights, not just the logging flow',
  'Explore P2 concepts — Ghost Sharing and the Ghost Density Map — as design artifacts even if they do not ship',
  'Prepare the final demo, write-up, and a clean case study for this portfolio',
]

const techStack = [
  'Swift / SwiftUI',
  'Java',
  'Spring Boot',
  'AWS Lambda',
  'DynamoDB',
  'AWS CDK',
  'Twelve Data API',
  'MapLibre',
  'Figma',
]

const team = [
  'Kiyomi Komatsu',
  'Lyrisse Faith Samson',
  'Ross Learned',
  'Thien Tran',
  'Tony Li',
]

const Section = ({ icon: Icon, title, items, delay = 0 }) => (
  <motion.div
    className="glass-card p-6 md:p-8 h-full"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accent}20` }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-white/75 text-sm md:text-base leading-relaxed">
          <ArrowRight
            className="w-4 h-4 mt-1 shrink-0"
            style={{ color: accent }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
)

const Capstone = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="capstone"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-1/2 rounded-full bg-purple-500/10 blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 rounded-full bg-violet-500/10 blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            Capstone — In Progress
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="gradient-text">Phantom</span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A trading psychology iOS app that lets users log the trades they
            <em className="text-white/90 not-italic font-medium"> almost made </em>
            but never executed. Phantom tracks what would have happened, surfaces
            patterns in hesitation and regret, and helps traders make more
            intentional decisions over time.
          </motion.p>
        </motion.div>

        <motion.div
          className="glass-card p-8 md:p-10 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-8 md:items-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accent}20` }}
            >
              <Ghost className="w-8 h-8" style={{ color: accent }} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                The Problem
              </h3>
              <p className="text-white/70 leading-relaxed">
                Retail traders rarely reflect on the trades they hesitate on or
                skip — even though behavioral finance research shows those
                moments shape future confidence and decision-making more than
                executed trades do. Existing journaling tools focus on execution
                and performance and ignore the psychological side entirely.
                Phantom makes hesitation visible.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Section icon={Target} title="Goals" items={goals} delay={0} />
          <Section icon={Users} title="Team Process" items={teamWork} delay={0.1} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Section icon={Brain} title="My Contributions" items={myWork} delay={0} />
          <Section icon={Lightbulb} title="Takeaways" items={takeaways} delay={0.1} />
        </div>

        <div className="grid md:grid-cols-1 gap-6 mb-12">
          <Section icon={TrendingUp} title="Next Steps" items={nextSteps} delay={0} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="glass-card p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-accent-purple mb-4 uppercase tracking-wider">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-accent-purple mb-4 uppercase tracking-wider">
              Team
            </h3>
            <div className="flex flex-wrap gap-2">
              {team.map((name) => (
                <span
                  key={name}
                  className={`px-3 py-1.5 text-sm rounded-full border ${
                    name === 'Ross Learned'
                      ? 'bg-accent-purple/20 border-accent-purple/40 text-white font-medium'
                      : 'bg-white/5 border-white/10 text-white/70'
                  }`}
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-4">
              Information Systems Capstone · University of Washington
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Capstone
