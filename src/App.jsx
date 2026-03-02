import { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'
import githubIcon from './assets/github-icon.png'
import linkedInIcon from './assets/linkedIn-icon.png'
import mailIcon from './assets/gmail-icon.png'
import darkModeLight from './assets/dark_mode_light.webp'
import darkModeDark from './assets/dark_mode_dark.webp'
import catImg from './assets/cat.png'
import penguinImg from './assets/penguin.png'
import penguImg from './assets/pengu.png'
import airplaneIcon from './assets/airplane.png'
import experienceIcon from './assets/experience.png'
import projectsIcon from './assets/projects.png'
import skillsIcon from './assets/skills.png'
import aboutIcon from './assets/about.png'

const CLI_COMMANDS = {
  help: `available commands:
  about       — learn about me
  skills      — see my technical skills
  projects    — view my projects
  experience  — see my experience
  contact     — how to reach me
  links       — my social links
  clear       — clear the terminal
  exit        — exit terminal mode
  help        — show this help message`,
  about: `Hi! I'm Pelin Sayar, a passionate Computer Science student at the University of Virginia. I enjoy developing creative and efficient solutions, whether solving Sudoku puzzles or tackling complex real-world problems.`,
  skills: `languages: Java, Python, JavaScript, SQL (PostgreSQL, SQLite), HTML/CSS, Lean4
frameworks: React, Node.js, Django, ROS2, Tailwind CSS, JUnit
developer tools: AWS, Git, Docker`,
  projects: `Pawromise — Java, Git (May 2025 - May 2025)
Created a Java program that matches adopters with pets at animal shelters based off on their preferences - Pawromising a great match.
Repo: https://github.com/pelin-sayar/Pawromise`,
  experience: `1) Software Engineering Intern — Soft Edit Skin (Feb. 2026 – April 2026) — Remote
  - Integrated AI-driven personalized meal planning and nutrient tracking, leveraging LLMs to translate visual physiological markers into actionable dietary recommendations.

2) Undergraduate Research Assistant — UVA Engineering - Department of Computer Science (Feb. 2026 – Present) — Charlottesville, VA
  - Research on software modularity & concept-based architecture

3) Software Engineer — theCourseForum (Sept. 2025 – Present) — Charlottesville, VA
  - Maintaining and adding new features to a website used by 20000+ students at the University of Virginia.
  - Designed and implemented a real-time autocomplete API and search feature optimizing query latency and improving content discoverability, using Django REST Framework and PostgreSQL full-text search.

4) Computer Subteam — Mechatronics and Robotics Association at the University of Virginia (Sept. 2025 – Present) — Charlottesville, VA
  - NASA Lunabotics Competition
  - Enhanced April Tag recognition to improve robot autonomy using CV, Python, and ROS2.`,
  contact: `email: pelinsayar25@gmail.com
linkedin: linkedin.com/in/pelin-sayar
github: github.com/pelin-sayar`,
  links: `> LinkedIn: https://www.linkedin.com/in/pelin-sayar
> GitHub: https://github.com/pelin-sayar
> Email: pelinsayar25@gmail.com`,
}

function CommandLine({ onExit, history, setHistory }) {
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let cmd = input.trim().toLowerCase()
    if (!cmd) return

    const newHistory = [...history, { type: 'input', text: cmd }]

    cmd = cmd.replace(/^(ls|cd)\s+/, '')

    if (cmd === 'clear') {
      setHistory([{ type: 'output', text: 'Type "help" to see available commands.' }])
      setInput('')
      return
    }

    if (cmd === 'exit') {
      setHistory([{ type: 'output', text: 'Type "help" to see available commands.' }])
      onExit()
      return
    }

    if (CLI_COMMANDS[cmd]) {
      newHistory.push({ type: 'output', text: CLI_COMMANDS[cmd] })
    } else {
      newHistory.push({ type: 'error', text: `command not found: "${cmd}". type "help" for available commands.` })
    }

    setHistory(newHistory)
    setInput('')
  }

  return (
    <div className="cli-container" onClick={() => inputRef.current?.focus()}>
      <div className="cli-output">
        {history.map((entry, i) => (
          <div key={i} className={`cli-line cli-${entry.type}`}>
            {entry.type === 'input' && <span className="cli-prompt">{'> '}</span>}
            <span className="cli-text">{entry.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="cli-input-row" onSubmit={handleSubmit}>
        <span className="cli-prompt">{'> '}</span>
        <input
          ref={inputRef}
          className="cli-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  )
}

const LINKS = [
  { name: 'LinkedIn', icon: linkedInIcon, url: 'https://www.linkedin.com/in/pelin-sayar'},
    { name: 'github', icon: githubIcon, url: 'https://github.com/pelin-sayar' },
    { name: 'gmail', icon: mailIcon, url: 'mailto:pelinsayar25@gmail.com' },
]

const FAQS = [
  { q: 'what software do you use?', a: 'I mainly use Clip Studio Paint for illustrations and After Effects for animations.' },
  { q: 'are your commissions open?', a: 'Commission status is updated on my Twitter! Check my pinned tweet for the latest info.' },
  { q: "what's your setup?", a: 'I use a Wacom Cintiq 22 with a custom-built PC running Windows 11.' },
  { q: 'where do you get your sound effects?', a: 'Most sound effects come from Freesound.org and some are recorded by me!' },
  { q: 'can i use your work as my icon/dp/header?', a: 'Personal, non-commercial use is fine as long as you credit me. Please do not edit or claim as your own.' },
]

function AboutPanel() {
  return (
    <div className="about-content">
      <div className="about-avatar"></div>
      <h2>About Me</h2>
      <p>
        Hi! I'm Pelin Sayar, a passionate Computer Science student who enjoys developing creative 
        and efficient solutions, whether solving Sudoku puzzles or tackling complex
        real-world problems. Excited to gain technical experience and contribute to 
        impactful projects.
      </p>
    </div>
  )
}

function LinksPanel() {
  return (
    <div className="links-grid">
      {LINKS.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-item"
        >
          {typeof link.icon === 'string' && !link.icon.includes('/') ? (
            <span className="link-icon">{link.icon}</span>
          ) : (
            <img className={`link-icon ${link.iconClass || ''}`} src={link.icon} alt={link.name} />
          )}
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  )
}

function FaqPanel() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="faq-list">
      {FAQS.map((faq, i) => (
        <div key={i} className="faq-item">
          <button
            className="faq-question"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span>{faq.q}</span>
            <span className={`faq-chevron ${openIndex === i ? 'open' : ''}`}>
              ▾
            </span>
          </button>
          {openIndex === i && <div className="faq-answer">{faq.a}</div>}
        </div>
      ))}
    </div>
  )
}

function SkillsPanel() {
  const skills = [
    { category: 'Languages', items: ['Java', 'Python', 'JavaScript', 'SQL (PostgreSQL, SQLite)', 'HTML/CSS', 'Lean4'] },
    { category: 'Frameworks', items: ['React', 'Node.js', 'Django', 'ROS2', 'Tailwind CSS', 'JUnit'] },
    { category: 'Developer Tools', items: ['AWS', 'Git', 'Docker'] },
  ]
  return (
    <div className="skills-content">
      {skills.map((group) => (
        <div key={group.category} className="skill-group">
          <h3>{group.category}:</h3>
          <div className="skill-tags">
            {group.items.map((skill, i) => (
              <span key={skill} className="skill-tag">{skill}{i < group.items.length - 1 ? ', ' : ''}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProjectsPanel() {
  const projects = [
    {
      name: 'Pawromise',
      tech: 'Java, Git',
      period: 'May 2025 - May 2025',
      desc: 'Created a Java program that matches adopters with pets at animal shelters based off on their preferences - Pawromising a great match.',
      repo: 'https://github.com/pelin-sayar/Pawromise',
    },
  ]

  return (
    <div className="projects-content">
      <div className="projects-table">
        {projects.map((proj) => (
          <div key={proj.name} className="project-row">
            <div className="project-top">
              <div className="project-left">
                <div className="project-title">{proj.name}</div>
                <div className="project-tech">{proj.tech}</div>
              </div>
              <div className="project-right">
                <div className="project-period">{proj.period}</div>
                <a
                  className="github-btn"
                  href={proj.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
            <div className="project-desc">{proj.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExperiencePanel() {
  const experiences = [
    {
      role: 'Software Engineering Intern',
      company: 'Soft Edit Skin',
      period: 'Feb. 2026 – April 2026',
      location: 'Remote',
      details: [
        'Integrated AI-driven personalized meal planning and nutrient tracking, leveraging LLMs to translate visual physiological markers into actionable dietary recommendations.'
      ],
    },
    {
      role: "Undergraduate Research Assistant",
      company: 'UVA Engineering - Department of Computer Science',
      period: 'Feb. 2026 – Present',
      location: 'Charlottesville, VA',
      details: [
        'Research on software modularity & concept-based architecture',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'theCourseForum',
      period: 'Sept. 2025 – Present',
      location: 'Charlottesville, VA',
      details: [
        'Maintaining and adding new features to a website used by 20000+ students at the University of Virginia.',
        'Designed and implemented a real-time autocomplete API and search feature optimizing query latency and improving content discoverability, using Django REST Framework and PostgreSQL full-text search.',
      ],
    },
    {
      role: 'Computer Subteam',
      company: 'Mechatronics and Robotics Association at the University of Virginia',
      period: 'Sept. 2025 – Present',
      location: 'Charlottesville, VA',
      details: [
        'NASA Lunabotics Competition',
        'Enhanced April Tag recognition to improve robot autonomy using CV, Python, and ROS2.',
      ],
    },
  ]

  const [open, setOpen] = useState(Array(experiences.length).fill(false))

  const toggle = (i) => setOpen((prev) => prev.map((v, idx) => idx === i ? !v : v))

  return (
    <div className="experience-content">
      {experiences.map((exp, i) => (
        <div key={i} className="experience-item">
          <button className="exp-toggle" onClick={() => toggle(i)}>
            <div className="exp-main">
              <span className="exp-index">{i + 1}.</span>
              <span className="exp-role">{exp.role}</span>
              <span className="exp-sep"> — </span>
              <span className="exp-company">{exp.company}</span>
              <span className="exp-sep"> — </span>
              <span className="exp-period">{exp.period}</span>
            </div>
            <span className={`exp-chevron ${open[i] ? 'open' : ''}`}>▼</span>
          </button>
          {open[i] && (
            <div className="exp-details">
              <p className="exp-location">{exp.location}</p>
              <ul>
                {exp.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ContactPanel() {
  return (
    <div className="links-grid">
      {LINKS.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-item"
        >
          {typeof link.icon === 'string' && !link.icon.includes('/') ? (
            <span className="link-icon">{link.icon}</span>
          ) : (
            <img className={`link-icon ${link.iconClass || ''}`} src={link.icon} alt={link.name} />
          )}
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  )
}

function useDraggable(initialPos) {
  const [pos, setPos] = useState(initialPos)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    dragging.current = true
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    }
    e.preventDefault()
  }, [pos])

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      })
    }
    const onMouseUp = () => {
      dragging.current = false
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return { pos, onMouseDown }
}

function Popup({ title, onClose, children, defaultPos, zIndex, onFocus, size }) {
  const { pos, onMouseDown } = useDraggable(
    defaultPos || {
      x: Math.round(window.innerWidth / 2 - 260),
      y: Math.round(window.innerHeight / 2 - 200),
    }
  )

  const sizeStyle = {}
  if (size?.width) sizeStyle.width = size.width
  if (size?.height) sizeStyle.height = size.height

  return (
    <div
      className="popup-panel"
      style={{ left: pos.x, top: pos.y, zIndex, ...sizeStyle }}
      onMouseDown={onFocus}
    >
      <div className="popup-header" onMouseDown={onMouseDown}>
        <span>{title}</span>
        <button className="close-btn" onClick={onClose}>
          [x]
        </button>
      </div>
      <div className="popup-body">{children}</div>
    </div>
  )
}

const NAV_ITEMS = [
  { id: 'about', icon: aboutIcon, label: 'about' },
  { id: 'skills', icon: skillsIcon, label: 'skills' },
  { id: 'projects', icon: projectsIcon, label: 'projects' },
  { id: 'experience', icon: experienceIcon, label: 'experience' },
  { id: 'contact', icon: airplaneIcon, label: 'contact' },
]

const PANEL_OFFSETS = {
  about:      { x: -40, y: -60 },
  skills:     { x:  20, y: -30 },
  projects:   { x:  80, y:   0 },
  experience: { x: 140, y:  30 },
  contact:    { x: 200, y:  60 },
}

function getDefaultPos(id) {
  const off = PANEL_OFFSETS[id] || { x: 0, y: 0 }
  return {
    x: Math.round(window.innerWidth / 2 - 260 + off.x),
    y: Math.round(window.innerHeight / 2 - 200 + off.y),
  }
}

function App() {
  const [openPanels, setOpenPanels] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [terminalMode, setTerminalMode] = useState(false)
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'welcome to pelin\'s terminal! type "help" for available commands.' },
  ])
  const [_zCounter, setZCounter] = useState(50)
  const [zMap, setZMap] = useState({})
  const prevDarkMode = useRef(false)

  const toggleTerminal = () => {
    if (!terminalMode) {
      prevDarkMode.current = darkMode
      setDarkMode(true)
    } else {
      setDarkMode(prevDarkMode.current)
    }
    setTerminalMode(!terminalMode)
  }

  const openPanel = (id) => {
    if (openPanels.includes(id)) {
      bringToFront(id)
      return
    }
    setOpenPanels((prev) => [...prev, id])
    bringToFront(id)
  }

  const closePanel = (id) => {
    setOpenPanels((prev) => prev.filter((p) => p !== id))
  }

  const bringToFront = (id) => {
    setZCounter((z) => {
      setZMap((prev) => ({ ...prev, [id]: z + 1 }))
      return z + 1
    })
  }

  const panelContent = {
    about:      { title: 'about', component: <AboutPanel />, size: { width: 480, height: 360 } },
    skills:     { title: 'skills', component: <SkillsPanel />, size: { width: 500, height: 380 } },
    projects:   { title: 'projects', component: <ProjectsPanel />, size: { width: 520, height: 400 } },
    experience: { title: 'experience', component: <ExperiencePanel />, size: { width: 700, height: 420 } },
    contact:    { title: 'contact', component: <ContactPanel />, size: { width: 460, height: 260 } },
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="ground" />

      <div className="top-controls">
        <button
          className="icon-btn"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <img src={darkModeDark} alt="Switch to light mode" className="theme-icon" />
          ) : (
            <img src={darkModeLight} alt="Switch to dark mode" className="theme-icon" />
          )}
        </button>
      </div>

      <div className="star-character">
        <img src={darkMode ? penguinImg : catImg} alt="mascot" className="mascot-img" />
      </div>

      <div className={`home-card ${terminalMode ? 'terminal-active' : ''}`}>
        <div className="home-header">
          <span>{terminalMode ? 'terminal' : 'home'}</span>
          <button className="terminal-toggle" onClick={toggleTerminal}>
            {terminalMode ? '[gui]' : '[terminal]'}
          </button>
        </div>
        {terminalMode ? (
          <div className="home-body cli-body">
            <CommandLine onExit={toggleTerminal} history={terminalHistory} setHistory={setTerminalHistory} />
          </div>
        ) : (
          <div className="home-body">
            <h1>hey, <span className="name">i'm Pelin!</span></h1>
            <p className="subtitle">Computer Science Student @ the University of Virginia</p>

            <div className="nav-buttons">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className="nav-btn"
                  onClick={() => openPanel(item.id)}
                >
                  <span className="nav-icon">{typeof item.icon === 'string' && !item.icon.includes('/') ? item.icon : <img src={item.icon} alt={item.label} className={`nav-icon-img nav-icon-${item.id}`} />}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="footer">
        <div className="footer-icons">
          <a href="https://www.linkedin.com/in/pelin-sayar" target="_blank" rel="noopener noreferrer">
            <img src={linkedInIcon} alt="LinkedIn" className="footer-icon-img" />
          </a>
          <a href="https://github.com/pelin-sayar" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" className="footer-icon-img footer-icon-sm" />
          </a>
          <a href="mailto:pelinsayar25@gmail.com">
            <img src={mailIcon} alt="Gmail" className="footer-icon-img" />
          </a>
        </div>
        <p>© 2026 Pelin Sayar</p>
      </div>

      <div className="frog-character">
        <img src={penguImg} alt="pengu" className="frog-img" />
      </div>

      {openPanels.map((id) => (
        <Popup
          key={id}
          title={panelContent[id].title}
          onClose={() => closePanel(id)}
          defaultPos={getDefaultPos(id)}
          zIndex={zMap[id] || 50}
          onFocus={() => bringToFront(id)}
          size={panelContent[id].size}
        >
          {panelContent[id].component}
        </Popup>
      ))}
    </div>
  )
}

export default App
