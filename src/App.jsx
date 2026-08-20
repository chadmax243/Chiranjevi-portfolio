

// import myVideo from './assets/intro.mp4'
import myPhoto from './assets/myphoto.jpeg'
import profilePhoto from './assets/pic2.jpeg'
import { motion, AnimatePresence } from "framer-motion"
import { TypeAnimation } from 'react-type-animation'
import { useState, useEffect } from "react"

function TiltCard({ children }) {
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)"
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s ease-out" }}
    >
      {children}
    </div>
  )
}

function FlipCard({ front, back }) {
  return (
    <div className="group [perspective:1000px] h-40">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  )
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", moveCursor)
    return () => window.removeEventListener("mousemove", moveCursor)
  }, [])

  return (
    <div
      className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full bg-red-400/50 pointer-events-none z-[9999] transition-transform duration-100 ease-out"
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
      }}
    ></div>
  )
}

function MagneticButton({ children, className, href, onClick }) {
  const handleMouseMove = (e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btn.style.transform = "translate(" + x * 0.3 + "px, " + y * 0.3 + "px)"
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translate(0px, 0px)"
  }

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: "inline-block", transition: "transform 0.2s ease-out" }}
    >
      {children}
    </a>
  )
}

function Counter({ end }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1500
    const stepTime = Math.max(Math.floor(duration / end), 30)
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [end])

  return <>{count}</>
}

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />

      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-400/60 to-transparent"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-red-500/20 blur-[130px]"
        style={{ top: "10%", left: "5%" }}
        animate={{ x: [0, 100, -50, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-blue-500/15 blur-[130px]"
        style={{ bottom: "5%", right: "10%" }}
        animate={{ x: [0, -80, 60, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-red-400/70"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-red-400/40" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-red-400/40" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-red-400/40" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-red-400/40" />
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "contact"]

    const handleScroll = () => {
      let current = "home"
      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            current = id
          }
        }
      })
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <>
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 1.6 }}
              className="fixed top-0 left-0 w-1/2 h-full z-[10000] bg-slate-900 flex items-center justify-end pr-2 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0em" }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-red-400 relative z-10"
              >
                Port
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 1.6 }}
              className="fixed top-0 right-0 w-1/2 h-full z-[10000] bg-slate-900 flex items-center justify-start pl-2 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0em" }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-red-400 relative z-10"
              >
                folio.
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.6, 0.3], scale: [0.5, 1.3, 1] }}
              transition={{ duration: 1.2, delay: 0.1 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-red-500 blur-[100px] z-[9999] pointer-events-none"
            />

            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="fixed bottom-0 left-0 h-1 bg-red-400 z-[10001]"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.6, times: [0, 0.3, 0.8, 1] }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-xs tracking-widest z-[10001]"
            >
              LOADING PORTFOLIO...
            </motion.p>
          </>
        )}
      </AnimatePresence>

      <div className="min-h-screen text-white">
        <CustomCursor />
        <AnimatedBackground />

        {/* Navbar */}
        <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-5 bg-slate-900/80 backdrop-blur-sm z-50">
          <h1 className="text-xl font-bold text-blue-400">Portfolio.</h1>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#home" className={`hover:text-red-400 transition ${activeSection === "home" ? "text-red-400 font-semibold" : ""}`}>Home</a>
            <a href="#about" className={`hover:text-red-400 transition ${activeSection === "about" ? "text-red-400 font-semibold" : ""}`}>About</a>
            <a href="#skills" className={`hover:text-red-400 transition ${activeSection === "skills" ? "text-red-400 font-semibold" : ""}`}>Skills</a>
            <a href="#projects" className={`hover:text-red-400 transition ${activeSection === "projects" ? "text-red-400 font-semibold" : ""}`}>Projects</a>
            <a href="#contact" className={`hover:text-red-400 transition ${activeSection === "contact" ? "text-red-400 font-semibold" : ""}`}>Contact</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex flex-col md:flex-row items-center pt-20 md:pt-0 overflow-hidden bg-red-600">
          <div className="w-full md:w-1/2 px-8 md:pl-16 text-center md:text-left z-10">
            <p className="text-red-100 mb-2">Hi, my name is</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
             Chiranjeevi H U
            </h1>
            <h2 className="text-2xl md:text-3xl text-red-100 font-semibold mb-6">
              <TypeAnimation
                sequence={[
                  "I'm a Full Stack Developer",
                  2000,
                  "I'm a Problem Solver",
                  2000,
                  "I'm a Tech Enthusiast",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h2>
            <p className="text-red-100 mb-8 max-w-md mx-auto md:mx-0">
              I build fast, scalable and modern web applications using React, Node.js and Tailwind CSS.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <MagneticButton href="#projects" className="bg-red-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg font-medium">
                View My Work
              </MagneticButton>
              <MagneticButton href="#contact" className="border border-blue-400 hover:bg-blue-600 transition px-6 py-3 rounded-lg font-medium">
                Contact Me
              </MagneticButton>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 h-[350px] md:h-screen flex items-center justify-center bg-red-700/40 border-l border-red-400/30 overflow-hidden">
  <img
    src={myPhoto}
    alt="My Profile"
    className="w-full h-full object-cover"
  />
</div>

          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              fill="#0f172a"
              d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative min-h-screen flex flex-col md:flex-row items-center gap-12 px-8 py-20 max-w-5xl mx-auto overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(248,113,113,0.15) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        >
          <div className="absolute top-10 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="relative z-10">
           <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-slate-700 rotate-[-6deg] shadow-2xl shadow-red-500/20 bg-slate-800">
  <img
    src={profilePhoto}
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>
            <div className="absolute -top-4 -right-6 bg-slate-800 p-3 rounded-full shadow-lg rotate-6">
              <span className="text-red-400 text-xl">⚛️</span>
            </div>
            <div className="absolute -bottom-4 -left-6 bg-slate-800 p-3 rounded-full shadow-lg -rotate-6">
              <span className="text-red-400 text-xl">🟨</span>
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-1">
              Hello! <span className="text-red-400">👋</span>
            </h2>
            <div className="w-16 h-1 bg-red-400 rounded mb-4"></div>
            <p className="text-red-400 mb-4 font-medium">
              <span className="text-red-400">01.</span> About Me
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              Hi! I'm a passionate Full Stack Developer who loves building clean, functional, and user-friendly web applications. I enjoy working across the entire stack — from designing intuitive interfaces to building robust backend systems.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              I'm always learning new technologies and looking for opportunities to create impactful projects.
            </p>

            <div className="flex gap-2 flex-wrap mb-6">
              {["React", "Node.js", "Python", "JavaScript"].map((skill) => (
                <span key={skill} className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-red-400">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex gap-8 mb-8">
              <div>
                <h3 className="text-3xl font-bold text-red-400"><Counter end={4} />+</h3>
                <p className="text-slate-400 text-sm">Projects</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-red-400"><Counter end={1} /></h3>
                <p className="text-slate-400 text-sm">Years Learning</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-red-400"><Counter end={6} />+</h3>
                <p className="text-slate-400 text-sm">Technologies</p>
              </div>
            </div>

            <a
              href="/resume.pdf"
              download
              className="inline-block bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-lg font-medium"
            >
              Download Resume
            </a>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative min-h-screen flex flex-col justify-center px-8 py-20 max-w-4xl mx-auto overflow-hidden"
        >
          <div className="absolute top-20 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-10 left-0 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <h2 className="relative z-10 text-3xl font-bold mb-12">
            <span className="text-red-400">02.</span> Technologies I Work With
          </h2>

          <div className="relative z-10 grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-red-400 font-semibold mb-4">Frontend Development</h3>
              <div className="flex flex-wrap gap-3">
                {["JavaScript", "React", "HTML",].map((skill) => (
                  <span key={skill} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm hover:border-red-400 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-red-400 font-semibold mb-4">Backend & Languages</h3>
              <div className="flex flex-wrap gap-3">
                {["Node.js", "Java", "Python"].map((skill) => (
                  <span key={skill} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm hover:border-red-400 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-red-400 font-semibold mb-4">Database</h3>
              <div className="flex flex-wrap gap-3">
                {["SQL"].map((skill) => (
                  <span key={skill} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm hover:border-red-400 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-red-400 font-semibold mb-4">Tools & Others</h3>
              <div className="flex flex-wrap gap-3">
                {["Git"].map((skill) => (
                  <span key={skill} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm hover:border-red-400 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
<motion.section
  id="projects"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.7 }}
  className="relative min-h-screen flex flex-col justify-center px-8 py-20 max-w-5xl mx-auto overflow-hidden"
>
  {/* Background blobs */}
  <div className="absolute bottom-10 left-0 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

  <div className="absolute top-10 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

  {/* Section Title */}
  <h2 className="relative z-10 text-3xl font-bold mb-12">
    <span className="text-red-400">03.</span> Projects
  </h2>

  {/* Project Cards */}
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* Project 1 */}
    <TiltCard>
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-red-400 transition">

        <FlipCard
          front={
            <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-700 flex flex-col items-center justify-center rounded-t-lg">
              <span className="text-red-400 text-4xl mb-2">01</span>
              <span className="text-slate-300 font-medium">
                Student Management
              </span>
            </div>
          }
          back={
            <div className="h-40 bg-red-600 flex items-center justify-center text-white text-sm p-6 text-center rounded-t-lg">
              A web application for managing student records, attendance,
              and academic information.
            </div>
          }
        />

        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2">
            Student Management System
          </h3>

          <p className="text-slate-400 text-sm mb-4">
            A simple web-based system designed to organize student records,
            attendance, and academic details in one place.
          </p>

          <div className="flex gap-2 flex-wrap mb-4">
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">
              React
            </span>
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">
              Node.js
            </span>
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">
              MongoDB
            </span>
          </div>

          <div className="flex gap-4 text-sm">
            <a href="#" className="text-red-400 hover:underline">
              Live Demo
            </a>
            <a href="#" className="text-red-400 hover:underline">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </TiltCard>


    {/* Project 2 */}
    <TiltCard>
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-red-400 transition">

        <FlipCard
          front={
            <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-700 flex flex-col items-center justify-center rounded-t-lg">
              <span className="text-blue-400 text-4xl mb-2">02</span>
              <span className="text-slate-300 font-medium">
                Event Platform
              </span>
            </div>
          }
          back={
            <div className="h-40 bg-blue-600 flex items-center justify-center text-white text-sm p-6 text-center rounded-t-lg">
              An event platform where users can discover events,
              register, and manage their participation.
            </div>
          }
        />

        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2">
            Campus Event Hub
          </h3>

          <p className="text-slate-400 text-sm mb-4">
            A platform for students to discover college events,
            register for activities, and keep track of upcoming programs.
          </p>

          <div className="flex gap-2 flex-wrap mb-4">
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">
              React
            </span>
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">
              Express
            </span>
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">
              MongoDB
            </span>
          </div>

          <div className="flex gap-4 text-sm">
            <a href="#" className="text-red-400 hover:underline">
              Live Demo
            </a>
            <a href="#" className="text-red-400 hover:underline">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </TiltCard>


    {/* Project 3 */}
    <TiltCard>
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-red-400 transition">

        <FlipCard
          front={
            <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-700 flex flex-col items-center justify-center rounded-t-lg">
              <span className="text-purple-400 text-4xl mb-2">03</span>
              <span className="text-slate-300 font-medium">
                Task Manager
              </span>
            </div>
          }
          back={
            <div className="h-40 bg-purple-600 flex items-center justify-center text-white text-sm p-6 text-center rounded-t-lg">
              A productivity application for creating, organizing,
              and tracking daily tasks.
            </div>
          }
        />

        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2">
            Smart Task Manager
          </h3>

          <p className="text-slate-400 text-sm mb-4">
            A clean productivity app that helps users organize tasks,
            track progress, and manage their daily workload.
          </p>

          <div className="flex gap-2 flex-wrap mb-4">
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">
              React
            </span>
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">
              JavaScript
            </span>
            <span className="text-xs bg-slate-700 px-2 py-1 rounded">
              CSS
            </span>
          </div>

          <div className="flex gap-4 text-sm">
            <a href="#" className="text-red-400 hover:underline">
              Live Demo
            </a>
            <a href="#" className="text-red-400 hover:underline">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </TiltCard>

  </div>
</motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative min-h-screen flex flex-col items-center justify-center px-8 py-20 text-center overflow-hidden"
        >
          <div className="absolute top-10 right-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <h2 className="relative z-10 text-3xl font-bold mb-4">
            <span className="text-red-400">04.</span> Get In Touch
          </h2>
          <p className="relative z-10 text-slate-400 max-w-md mb-8">
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>

          <a
            href="mailto:chiranjeevih39@gmail.com"
            className="relative z-10 bg-red-500 hover:bg-red-600 transition px-8 py-3 rounded-lg font-medium mb-8"
          >
            Say Hello
          </a>

          <div className="relative z-10 flex gap-6 text-slate-400">
            <a href="#" className="hover:text-red-400 transition">GitHub</a>
            <a href="#" className="hover:text-red-400 transition">LinkedIn</a>
            <a href="https://www.instagram.com/chir3uu/" className="hover:text-red-400 transition">Instagram</a>
          </div>

          <p className="relative z-10 text-slate-600 text-sm mt-16">
            Built with React & Tailwind CSS
          </p>
        </motion.section>
      </div>
    </>
  )
}

export default App
