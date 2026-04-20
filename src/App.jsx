import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = [
  "Home",
  "About",
  "Skills",
  "Experience",
  "Education",
  "Contact",
];

function getLiveDuration() {
  const start = new Date("2023-04-12");
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${rem}m`;
  if (rem === 0) return `${years}y`;
  return `${years}y ${rem}m`;
}

const EXPERIENCE = [
  {
    role: "React Native Developer",
    company: "Panalink Infotech Limited",
    location: "New Delhi, India",
    period: "12 Apr 2023 – Present",
    desc: "Leading cross-platform mobile development for production Android & iOS applications. Architecting scalable component libraries, integrating complex native APIs, optimising performance bottlenecks, and mentoring junior developers within an agile delivery team.",
    current: true,
  },
  {
    role: "Mobile App Developer",
    company: "Whizkey (OPC) Pvt. Ltd.",
    location: "Pune, India",
    period: "2021 – Apr 2023",
    desc: "Owned end-to-end development of React Native applications from concept to Play Store / App Store delivery. Drove architecture decisions, implemented CI/CD pipelines, and collaborated directly with clients on product roadmaps.",
    current: false,
  },
];

const EDUCATION = [
  {
    degree: "B.Sc. Computer Science",
    institute: "T.C. College, Baramati",
    university: "Savitribai Phule Pune University",
    year: "2018",
  },
  {
    degree: "M.Sc. Computer Science",
    institute: "Sinhgad College of Science, Pune",
    university: "Savitribai Phule Pune University",
    year: "2021",
  },
  {
    degree: "Internship — React.js & React Native",
    institute: "C-Infotech, Dhankawadi, Pune",
    university: "Jan 2021 – Mar 2021",
    year: "2021",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function LiveDot() {
  const [dur, setDur] = useState(getLiveDuration());
  useEffect(() => {
    const t = setInterval(() => setDur(getLiveDuration()), 60000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="live-badge">
      <span className="live-dot" />
      <span className="live-text">LIVE · {dur}</span>
    </span>
  );
}

function Section({ id, children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`section ${inView ? "section--visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

function GlitchText({ text }) {
  return (
    <span className="glitch" data-text={text}>
      {text}
    </span>
  );
}

function AndroidUI() {
  return (
    <div className="ui-android">
      <div className="ui-header">
        <span className="ui-avatar">NK</span>
        <div>
          <div className="ui-hello">Good morning,</div>
          <div className="ui-name">Nilesh 👋</div>
        </div>
        <div className="ui-bell">🔔</div>
      </div>
      <div className="ui-card ui-card--green">
        <div className="ui-card-label">Active Projects</div>
        <div className="ui-card-num">4</div>
        <div className="ui-spark-row">
          {[60, 80, 50, 90, 70, 85, 65].map((h, i) => (
            <div
              key={i}
              className="ui-spark"
              style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
      <div className="ui-row">
        <div className="ui-mini-card">
          <span className="ui-mini-icon">📱</span>
          <span className="ui-mini-label">Apps</span>
          <span className="ui-mini-val">12</span>
        </div>
        <div className="ui-mini-card">
          <span className="ui-mini-icon">🚀</span>
          <span className="ui-mini-label">Shipped</span>
          <span className="ui-mini-val">10</span>
        </div>
      </div>
      <div className="ui-list">
        {["Integrate Maps SDK", "Push notifications", "UI review"].map(
          (t, i) => (
            <div
              key={i}
              className="ui-list-item"
              style={{ animationDelay: `${i * 0.2 + 0.4}s` }}
            >
              <span className="ui-check" />
              <span>{t}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function IosUI() {
  return (
    <div className="ui-ios">
      <div className="ui-ios-top">
        <div className="ui-ios-title">Dashboard</div>
        <div className="ui-ios-sub">React Native</div>
      </div>
      <div className="ui-ios-grid">
        {[
          { icon: "📦", label: "Builds", val: "98%" },
          { icon: "⚡", label: "Speed", val: "Fast" },
          { icon: "🎨", label: "UI", val: "Pro" },
          { icon: "🔒", label: "Secure", val: "✓" },
        ].map((c, i) => (
          <div
            key={i}
            className="ui-ios-tile"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="ui-ios-tile-icon">{c.icon}</span>
            <span className="ui-ios-tile-val">{c.val}</span>
            <span className="ui-ios-tile-label">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="ui-ios-bar-wrap">
        <div className="ui-ios-bar-label">
          <span>Performance</span>
          <span className="ui-ios-pct">94%</span>
        </div>
        <div className="ui-ios-track">
          <div className="ui-ios-fill" style={{ width: "94%" }} />
        </div>
      </div>
      <div className="ui-ios-bar-wrap" style={{ marginTop: "0.5rem" }}>
        <div className="ui-ios-bar-label">
          <span>Test Coverage</span>
          <span className="ui-ios-pct">87%</span>
        </div>
        <div className="ui-ios-track">
          <div
            className="ui-ios-fill"
            style={{ width: "87%", animationDelay: "0.3s" }}
          />
        </div>
      </div>
      <div className="ui-ios-tabs">
        <span className="ui-ios-tab active">Home</span>
        <span className="ui-ios-tab">Analytics</span>
        <span className="ui-ios-tab">Settings</span>
      </div>
    </div>
  );
}

function PhoneMockup({ platform }) {
  const isAndroid = platform === "android";
  return (
    <div className={`phone-wrap ${isAndroid ? "phone-android" : "phone-ios"}`}>
      <div className="phone-shell">
        <div className="phone-status">
          <span className="ps-time">9:41</span>
          <div className="ps-icons">
            {isAndroid ? (
              <>
                <span className="ps-icon">▲</span>
                <span className="ps-icon">▌▌</span>
                <span className="ps-icon">▮</span>
              </>
            ) : (
              <>
                <span className="ps-icon">●●</span>
                <span className="ps-icon">▮▮▮</span>
              </>
            )}
          </div>
        </div>
        {isAndroid ? (
          <div className="android-punch" />
        ) : (
          <div className="ios-island" />
        )}
        <div className="phone-screen">
          {isAndroid ? <AndroidUI /> : <IosUI />}
        </div>
        {!isAndroid && <div className="ios-home-bar" />}
        {isAndroid && (
          <div className="android-nav">
            <span>◀</span>
            <span>⬤</span>
            <span>▮</span>
          </div>
        )}
      </div>
      <div
        className={`phone-badge ${isAndroid ? "badge-android" : "badge-ios"}`}
      >
        {isAndroid ? "🤖 Android" : "🍎 iOS"}
      </div>
      <div
        className={`phone-glow ${isAndroid ? "glow-android" : "glow-ios"}`}
      />
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="cursor" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div
        className="cursor-dot"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
      <ParticleBg />

      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav-brand" onClick={() => scrollTo("Home")}>
          <span className="nav-logo">NK</span>
          <span className="nav-name">Nilesh Kumbhar</span>
        </div>
        <div className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`nav-link ${activeNav === l ? "nav-link--active" : ""}`}
              onClick={() => scrollTo(l)}
            >
              {l}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen((p) => !p)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="hero-greeting">Hello, World 👋</p>
            <h1 className="hero-name">
              <GlitchText text="Nilesh Kumbhar" />
            </h1>
            <div className="hero-role">
              <TypeWriter
                words={[
                  "React Native Developer",
                  "Android & iOS Engineer",
                  "Cross-Platform Specialist",
                  "n8n Automation Dev",
                ]}
              />
            </div>
            <p className="hero-tagline">
              4+ years crafting production-grade mobile apps for Android & iOS.
              <br />
              Currently building at{" "}
              <span className="highlight">Panalink Infotech Ltd.</span>, New
              Delhi.
            </p>
            <div className="hero-ctas">
              <button
                className="btn btn--primary"
                onClick={() => scrollTo("Experience")}
              >
                View Experience
              </button>
              <button
                className="btn btn--outline"
                onClick={() => scrollTo("Contact")}
              >
                Let's Connect
              </button>
            </div>
          </div>
          <div className="hero-avatar-wrap">
            <div className="avatar-ring" />
            <div className="avatar-ring avatar-ring--2" />
            <div className="avatar-img-wrap">
              <img
                src="https://s.gravatar.com/avatar/b6c07acf6cad04a7b77308acc3bc5c1e?s=480&r=pg&d=https%3A%2F%2Fstorage.googleapis.com%2Fexpo-website-default-avatars%2Fn-2x.png"
                alt="Nilesh Kumbhar"
                className="avatar-img"
              />
            </div>
            <div className="avatar-badge">💻 React Native Dev</div>
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about">
          <div className="section-label">// WHO AM I</div>
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a{" "}
                <span className="highlight">
                  React Native Developer with 4+ years
                </span>{" "}
                of hands-on experience building and shipping production mobile
                applications on both Android and iOS. Currently contributing at
                Panalink Infotech Limited, New Delhi.
              </p>
              <p>
                I specialize in cross-platform mobile architecture,
                pixel-perfect UI implementation, native API integration, and
                workflow automation. I take ownership from architecture to App
                Store submission — and everything in between.
              </p>
              <p>
                My approach is pragmatic and product-focused: clean code, fast
                delivery, zero compromises on quality.
              </p>
              <div className="about-tags">
                {[
                  "React Native",
                  "Android",
                  "iOS",
                  "React.js",
                  "Next.js",
                  "n8n",
                  "Firebase",
                  "MongoDB",
                  "MySQL",
                ].map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="about-cards">
              <div className="stat-card">
                <span className="stat-num">4+</span>
                <span className="stat-label">Years Exp</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">10+</span>
                <span className="stat-label">Apps Shipped</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">2</span>
                <span className="stat-label">Companies</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">2</span>
                <span className="stat-label">Platforms</span>
              </div>
            </div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills">
          <div className="section-label">// WHAT I BUILD</div>
          <h2 className="section-title">Skills & Platforms</h2>

          <div className="phones-showcase">
            <PhoneMockup platform="android" />
            <div className="phones-center-label">
              <div className="pcl-rn-logo">⚛️</div>
              <div className="pcl-title">React Native</div>
              <div className="pcl-sub">
                One codebase.
                <br />
                Two platforms.
              </div>
            </div>
            <PhoneMockup platform="ios" />
          </div>

          <div className="skill-cards-grid">
            {[
              {
                icon: "🤖",
                name: "Android App Development",
                desc: "Material You, Jetpack-ready RN apps",
              },
              {
                icon: "🍎",
                name: "iOS App Development",
                desc: "SwiftUI-compatible, App Store ready",
              },
              {
                icon: "📱",
                name: "Cross Platform (React Native)",
                desc: "One codebase, both platforms",
              },
              {
                icon: "🌐",
                name: "Web — React / Next.js",
                desc: "SSR, static sites, dashboards",
              },
              {
                icon: "⚡",
                name: "Automation — n8n",
                desc: "No-code/low-code workflow automation",
              },
            ].map((s) => (
              <div key={s.name} className="skill-card glass">
                <span className="skill-card-icon">{s.icon}</span>
                <div>
                  <span className="skill-card-name">{s.name}</span>
                  <span className="skill-card-desc">{s.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="skills-bottom-row">
            <div className="skills-block">
              <h3 className="sub-title">Languages</h3>
              <div className="lang-chips">
                {[
                  { name: "Marathi", flag: "🇮🇳" },
                  { name: "Hindi", flag: "🇮🇳" },
                  { name: "English", flag: "🇬🇧" },
                ].map((l) => (
                  <div key={l.name} className="lang-chip glass">
                    <span>{l.flag}</span>
                    <span className="lang-chip-name">{l.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="skills-block">
              <h3 className="sub-title">Tech Stack</h3>
              <div className="pills-grid">
                {[
                  "React Native",
                  "React.js",
                  "Next.js",
                  "Node.js",
                  "n8n",
                  "Firebase",
                  "MongoDB",
                  "MySQL",
                  "Android",
                  "iOS",
                  "Git",
                  "Expo",
                  "TypeScript",
                  "Photoshop",
                ].map((t) => (
                  <div key={t} className="pill">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience">
          <div className="section-label">// WHERE I'VE WORKED</div>
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            {EXPERIENCE.map((e, i) => (
              <div
                key={i}
                className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}
              >
                <div
                  className={`timeline-card glass ${e.current ? "timeline-card--active" : ""}`}
                >
                  <div className="timeline-top">
                    <span className="timeline-role">{e.role}</span>
                    {e.current && <LiveDot />}
                  </div>
                  <span className="timeline-company">{e.company}</span>
                  {e.location && (
                    <span className="timeline-location">📍 {e.location}</span>
                  )}
                  <span className="timeline-period">🗓 {e.period}</span>
                  <p className="timeline-desc">{e.desc}</p>
                </div>
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education">
          <div className="section-label">// MY BACKGROUND</div>
          <h2 className="section-title">Education</h2>
          <div className="edu-grid">
            {EDUCATION.map((e, i) => (
              <div key={i} className="edu-card glass">
                <div className="edu-year">{e.year}</div>
                <h3 className="edu-degree">{e.degree}</h3>
                <p className="edu-institute">{e.institute}</p>
                <p className="edu-uni">{e.university}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact">
          <div className="section-label">// GET IN TOUCH</div>
          <h2 className="section-title">Contact</h2>
          <div className="contact-wrap">
            <div className="contact-info">
              <p className="contact-desc">
                Feel free to reach out for collaborations, project discussions,
                or just to connect professionally. I'm always happy to talk
                mobile development.
              </p>
              <div className="contact-items">
                <a
                  href="mailto:kumbharnilesh4@mail.com"
                  className="contact-item glass"
                >
                  <span className="contact-icon">📧</span>
                  <div>
                    <span className="ci-label">Email</span>
                    <span className="ci-val">kumbharnilesh4@mail.com</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="social-links">
              <p className="social-title">Find me on</p>
              {[{ icon: "🔗", label: "LinkedIn", href: "#" }].map((s) => (
                <a key={s.label} href={s.href} className="social-btn glass">
                  <span>{s.icon}</span> {s.label}
                </a>
              ))}
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <p>
          Designed & Built by <span className="highlight">Nilesh Kumbhar</span>
        </p>
        <p className="footer-sub">React · Vite · Vercel</p>
      </footer>
    </>
  );
}

function TypeWriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    let t;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        75,
      );
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 2000);
    else if (deleting && displayed.length > 0)
      t = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length - 1)),
        38,
      );
    else {
      setDeleting(false);
      setIdx((p) => p + 1);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, idx, words]);
  return (
    <span className="typewriter">
      {displayed}
      <span className="cursor-blink">|</span>
    </span>
  );
}

function ParticleBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const N = 60;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,229,255,0.45)";
        ctx.fill();
      });
      for (let i = 0; i < N; i++)
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x,
            dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.13 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" />;
}
