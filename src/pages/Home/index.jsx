// ============================================================
//  PORTFOLIO — index.jsx
//
//  Dependências necessárias (instale antes):
//    npm install bootstrap bootstrap-icons aos
//
//  No seu main.jsx (ou index.js), adicione:
//    import 'bootstrap/dist/css/bootstrap.min.css'
//    import 'bootstrap-icons/font/bootstrap-icons.css'
//    import 'aos/dist/aos.css'
//    import './index.css'
// ============================================================

import { useState, useEffect, useRef } from "react";
import AOS from "aos";
import emailjs from "@emailjs/browser";

// ─── DATA ────────────────────────────────────────────────────

const SKILLS = [
  { name: "HTML [semântico] / CSS", pct: 92, width: 0.92 },
  { name: "JavaScript", pct: 85, width: 0.85 },
  { name: "CSS / Tailwind/Bootstrap", pct: 90, width: 0.9 },
  { name: "Node.js / APIs / ReactJs ", pct: 60, width: 0.6 },
  { name: "UI/UX Design", pct: 80, width: 0.8 },
  { name: "Testing / CI", pct: 70, width: 0.7 },
];

const PROJECTS = [
  {
    id: 3,
    emoji: "⚽",
    image: "./images/Testcar.png",
    title: "TestCar",
    desc: "A TestCar é uma solução de consulta veicular que une mais de 15 anos de experiência em análise de risco com tecnologia e equipe especializada. Realiza verificações completas de veículos e proprietários, oferecendo mais segurança, agilidade e confiança para lojas e revendas nas negociações.",
    tags: ["fullstack", "react"],
    tech: [
      "RubyonRails",
      "Bootstrap",
      "HTML",
      "JavaScript",
      "CSS",
      "PhpMyAdmin",
    ],
    featured: true,
    overlayStyle:
      "linear-gradient(135deg,rgba(0,212,170,0.1),rgba(124,92,252,0.06))",
    github: "https://sistema.layscore.com.br/",
    demo: "https://testcar.com.br/",
  },
  {
    id: 1,
    emoji: "",
    image: "./images/mybox.png",
    title: "MyBox",
    desc: "Plataforma de distribuições completa, pagamentos e painel de gestão.",
    tags: ["react", "ui"],
    tech: [
      "RubyonRails",
      "Bootstrap",
      "HTML",
      "JavaScript",
      "CSS",
      "PhpMyAdmin",
    ],
    featured: false,
    overlayStyle:
      "linear-gradient(135deg,rgba(124,92,252,0.12),rgba(0,212,170,0.08))",
    github: "https://myboxpoint.com.br/",
    demo: "https://myboxpoint.com.br/",
  },
  {
    id: 2,
    emoji: "⚽",
    image: "./images/layscore2.png",
    title: "Layscore",
    desc: "Dashboard analítico em tempo real com gráficos interativos, sistema web personalizado desenvolvido especialmente para atender as necessidades do cliente no segmento esportivo e de análise de partidas.",
    tags: ["fullstack", "react"],
    tech: [
      "RubyonRails",
      "Bootstrap",
      "HTML",
      "JavaScript",
      "CSS",
      "PhpMyAdmin",
    ],
    featured: false,
    overlayStyle:
      "linear-gradient(135deg,rgba(0,212,170,0.1),rgba(124,92,252,0.06))",
    github: "https://sistema.layscore.com.br/",
    demo: "https://sistema.layscore.com.br/",
  },
];

const SOCIALS = [
  {
    icon: "bi-github",
    label: "GitHub",
    handle: "@R1cardo-Dev",
    href: "https://github.com/R1cardo-Dev",
  },
  {
    icon: "bi-linkedin",
    label: "LinkedIn",
    handle: "in/pauloricardosilva-",
    href: "https://www.linkedin.com/in/pauloricardosilva-/",
  },

  {
    icon: "bi-instagram",
    label: "Instagram",
    handle: "@p4ulo.bsb",
    href: "https://www.instagram.com/p4ulo.bsb/",
  },
];

// ─── HOOKS ───────────────────────────────────────────────────

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function useSkillsAnimation(ref) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return animated;
}

// ─── SUBCOMPONENTS ───────────────────────────────────────────

function Loader({ hidden }) {
  return (
    <div className={`loader-overlay${hidden ? " hidden" : ""}`}>
      <div className="loader-ring" />
    </div>
  );
}

function Navbar({ isDark, onToggleTheme }) {
  const scrolled = useScrolled();
  const active = useActiveSection(["hero", "about", "projects", "contact"]);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "#about", label: "Sobre" },
    { href: "#projects", label: "Projetos" },
    { href: "#contact", label: "Contato" },
  ];

  return (
    <nav className={`navbar-custom${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <a href="#hero" className="nav-logo">
            Dev<span>.</span>Paulo Ricardo
          </a>

          <div className="d-flex align-items-center gap-2">
            {/* Desktop links */}
            <div className="d-none d-md-flex align-items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`nav-link-custom${active === l.href.slice(1) ? " active" : ""}`}
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              className="btn-theme-toggle"
              onClick={onToggleTheme}
              title="Alternar tema"
            >
              <i className={`bi ${isDark ? "bi-sun-fill" : "bi-moon-fill"}`} />
            </button>

            {/* Mobile hamburger */}
            <button
              className="d-md-none btn-theme-toggle"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="d-md-none d-flex flex-column gap-1 pt-3 pb-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link-custom"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />

      <div className="container position-relative">
        <div className="row align-items-center g-5">
          {/* Left column */}
          <div className="col-lg-7" data-aos="fade-up" data-aos-duration="700">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Disponível para projetos
            </div>

            <h1 className="hero-title">
              Olá, eu sou
              <br />
              <span className="hero-title-accent ">Paulo Ricardo</span>
              <span className="cursor-blink" />
            </h1>

            <p className="hero-desc">
              Desenvolvedor Front-End apaixonado por criar experiências digitais
              que unem performance, acessibilidade e design impecável.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary-custom">
                <i className="bi bi-grid-3x3-gap-fill" />
                Ver Projetos
              </a>
              <a href="#contact" className="btn-outline-custom">
                <i className="bi bi-send-fill" />
                Fale Comigo
              </a>
            </div>
          </div>

          {/* Right column — decorative code card */}
          <div
            className="col-lg-5 d-none d-lg-flex justify-content-center"
            data-aos="fade-left"
            data-aos-duration="900"
            data-aos-delay="200"
          >
            <div style={{ position: "relative", width: 340 }}>
              <div className="hero-code-card">
                <div className="hero-code-dots">
                  <span className="code-dot code-dot-red" />
                  <span className="code-dot code-dot-yellow" />
                  <span className="code-dot code-dot-green" />
                </div>
                <div>
                  <span className="code-purple">const</span>{" "}
                  <span className="code-teal">developer</span> = {"{"}
                </div>
                <div className="code-indent">
                  name: <span className="code-orange">'Paulo Ricardo'</span>,
                </div>
                <div className="code-indent">
                  role: <span className="code-orange">'Front-End Dev'</span>,
                </div>

                <div className="code-indent">
                  coffee: <span className="code-purple">Infinity</span>,
                </div>
                <div className="code-indent">
                  open: <span className="code-purple">true</span>
                </div>
                <div>{"}"}</div>
              </div>

              <div className="hero-float-badge badge-bottom">
                <span className="float-badge-emoji">⚡</span>
                <div>
                  <div className="float-badge-title">+1 anos</div>
                  <div className="float-badge-sub">de experiência</div>
                </div>
              </div>

              <div className="hero-float-badge badge-top">
                <span className="float-badge-emoji">🚀</span>
                <div>
                  <div className="float-badge-title">10+ projetos reais</div>
                  <div className="float-badge-sub">entregues</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll-hint">
        <span>scroll</span>
        <i className="bi bi-arrow-down-short" style={{ fontSize: "1.1rem" }} />
      </a>
    </section>
  );
}

function SkillBar({ name, pct, width, animated }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div
          className={`skill-fill${animated ? " animated" : ""}`}
          style={{ transform: animated ? `scaleX(${width})` : "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

function About() {
  const skillsRef = useRef(null);
  const animated = useSkillsAnimation(skillsRef);
  const leftSkills = SKILLS.slice(0, 3);
  const rightSkills = SKILLS.slice(3);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Image column */}
          <div
            className="col-lg-4 text-center"
            data-aos="fade-right"
            data-aos-duration="700"
          >
            <div className="about-img-wrap d-inline-block">
              <div className="about-img">👨‍💻</div>
              <div className="about-img-frame" />
            </div>

            <div className="row g-2 mt-4  ">
              {[
                { num: "19", label: "Anos de idade" },
                { num: "10+", label: "Sites Publicados" },
                { num: "1+", label: "anos de experiência" },
              ].map((s) => (
                <div key={s.label} className="col-4">
                  <div className="about-stat-card ">
                    <div className="about-stat-num ">{s.num}</div>
                    <div className="about-stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content column */}
          <div
            className="col-lg-8"
            data-aos="fade-left"
            data-aos-duration="700"
            data-aos-delay="150"
          >
            <p className="section-label">Sobre mim</p>
            <h2 className="section-title">
              Código que conta
              <br />
              uma história.
            </h2>
            <p className=" mb-4">
              Sou um desenvolvedor Front-End com planos de se tornar um
              fullstack de 19 anos e estudante de Engenharia de Software na
              Universidade Católica de Brasília (UCB), apaixonado por tecnologia
              e pela construção de produtos digitais que geram impacto real.
              Tenho experiência profissional trabalhando remotamente como
              desenvolvedor front-end, participando da criação e evolução de
              interfaces web modernas, responsivas e focadas na experiência do
              usuário. Ao longo da minha jornada, trabalhei com tecnologias como
              WordPress, Bootstrap, Ruby on Rails e MySQL, sempre buscando
              escrever código limpo, escalável e eficiente. Sou movido por
              aprendizado constante, desafios técnicos e colaboração em equipe.
            </p>
            <p
              className="mb-5"
              style={{
                color: "var(--c-muted)",
                fontSize: "0.9rem",
                lineHeight: 1.8,
              }}
            >
              Acredito que ótimo software nasce da intersecção entre tecnologia
              sólida e empatia com o usuário. Já colaborei com startups e
              empresas — entregando produtos que realmente importam.
            </p>

            {/* Skill bars */}
            <div className="row g-3" ref={skillsRef}>
              <div className="col-md-6">
                {leftSkills.map((s) => (
                  <SkillBar key={s.name} {...s} animated={animated} />
                ))}
              </div>
              <div className="col-md-6">
                {rightSkills.map((s) => (
                  <SkillBar key={s.name} {...s} animated={animated} />
                ))}
              </div>
            </div>
            <div className="d-flex mt-4 justify-content-between">
              <div>
                <p className="  fw-bold ">
                  Baixe meu currículo para saber mais sobre minha experiência e
                  habilidades:
                </p>
              </div>

              <div className="float-badge float-badge-bottom">
                <a
                  href="/PAULO_RICARDO_currículo.pdf"
                  download
                  className="btn-outline-custom"
                  style={{ fontSize: "0.85rem", padding: "0.6rem 1.4rem" }}
                >
                  <i className="bi bi-file-earmark-arrow-down" />
                  Baixar CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-thumb">
        {project.featured && (
          <span className="project-featured-badge">⭐ Destaque</span>
        )}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="project-thumb-img"
          />
        )}
        <div
          className="project-thumb-overlay"
          style={{ background: project.overlayStyle }}
        />
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>

        <div>
          {project.tech.map((t, index) => (
            <span key={`${project.id}-${index}`} className="tech-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <a
            href={project.demo}
            className="btn-sm-project filled"
            target="_blank"
          >
            <i className="bi bi-box-arrow-up-right" /> Link do Site
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [activeFilter] = useState("all");

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-7" data-aos="fade-up">
            <p className="section-label">Portfólio</p>
            <h2 className="section-title">Projetos publicados em destaque</h2>
            <p className="section-sub">
              Uma seleção dos trabalhos que atuei na parte do Front-End — cada
              um com um desafio único.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="row g-4">
          {PROJECTS.map((project, i) => {
            const isVisible =
              activeFilter === "all" || project.tags.includes(activeFilter);
            return (
              <div
                key={project.id}
                className={`col-md-6 col-lg-4 project-item${!isVisible ? " hidden" : ""}`}
                data-aos="fade-up"
                data-aos-delay={String((i % 3) * 80)}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const form = useRef();
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("loading");

    emailjs
      .sendForm(
        "service_9bx0o7d",
        "template_5x5zu6c",
        form.current,
        "F7LES1y4BQpXQI5lv",
      )
      .then(
        () => {
          setStatus("success");
          form.current.reset();
        },
        () => {
          alert("Erro ao enviar mensagem.");
          setStatus("idle");
        },
      );
  };

  if (status === "success") {
    return (
      <div className="form-success">
        <i className="bi bi-check-circle-fill form-success-icon" />
        Mensagem enviada com sucesso!
        <br />
        <span style={{ color: "var(--c-muted)", fontSize: "0.85rem" }}>
          Te responderei em até 24h.
        </span>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-sm-6">
          <label className="form-label-custom">Nome</label>
          <input
            type="text"
            name="user_name"
            className="form-input-custom"
            placeholder="Seu nome"
            required
          />
        </div>

        <div className="col-sm-6">
          <label className="form-label-custom">Email</label>
          <input
            type="email"
            name="user_email"
            className="form-input-custom"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label-custom">Assunto</label>
          <input
            type="text"
            name="subject"
            className="form-input-custom"
            placeholder="Sobre o projeto..."
          />
        </div>

        <div className="col-12">
          <label className="form-label-custom">Mensagem</label>
          <textarea
            name="user_message"
            className="form-input-custom"
            rows={5}
            placeholder="Descreva seu projeto ou ideia..."
            required
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn-primary-custom w-100 justify-content-center"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <i className="bi bi-hourglass-split" /> Enviando...
              </>
            ) : (
              <>
                <i className="bi bi-send-fill" /> Enviar mensagem
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6 text-center" data-aos="fade-up">
            <p className="section-label">Contato</p>
            <h2 className="section-title">
              Vamos trabalhar
              <br />
              juntos?
            </h2>
            <p className="section-sub mx-auto">
              Estou disponível para freelas, projetos de longo prazo e posições
              CLT/PJ.
            </p>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Form */}
          <div
            className="col-lg-6"
            data-aos="fade-right"
            data-aos-duration="700"
          >
            <div className="contact-card">
              <ContactForm />
            </div>
          </div>

          {/* Info + socials */}
          <div
            className="col-lg-4"
            data-aos="fade-left"
            data-aos-duration="700"
            data-aos-delay="150"
          >
            <p className="contact-info-label">Email</p>
            <p className="contact-info-value">pauloricardoworked@gmail.com</p>

            <p className="contact-info-label">Localização</p>
            <p className="contact-info-value">Brasília DF, Brasil 🇧🇷</p>

            <p className="contact-info-label">Disponibilidade</p>
            <p className="contact-available">✦ Disponível agora</p>

            <p className="section-label mt-3 mb-3">Redes sociais</p>

            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="social-link"
                target="_blank"
              >
                <i className={`bi ${s.icon}`} />
                {s.label}
                <span className="social-handle">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-custom">
      <div className="container">
        <p className="footer-copy">
          © 2025 <a href="#">Paulo Ricardo</a>. Feito com ☕ e muito React.
          <span className="footer-divider">·</span>
          <a href="#">Política de Privacidade</a>
        </p>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`back-top-btn${visible ? " visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Voltar ao topo"
    >
      <i className="bi bi-arrow-up" />
    </button>
  );
}

// ─── ROOT COMPONENT ──────────────────────────────────────────

export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Init AOS
  useEffect(() => {
    AOS.init({ once: true, offset: 60, easing: "ease-out-cubic" });
  }, []);

  // Hide loader after page load
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 700);
    return () => clearTimeout(timer);
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
  }, [isDark]);

  return (
    <>
      <Loader hidden={loaded} />

      <Navbar isDark={isDark} onToggleTheme={() => setIsDark((d) => !d)} />

      <main>
        <Hero />
        <hr className="section-divider" />
        <About />
        <hr className="section-divider" />
        <Projects />
        <hr className="section-divider" />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
