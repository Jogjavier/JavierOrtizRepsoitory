import { useState, useEffect, useRef } from "react";
import RFIDSimulator from "./components/RFIDSimulator";

const data = {
  name: "Javier Ortiz Godinez",
  role: "Desarrollador de Software & Software Embebido",
  bio: "Ingeniero en Sistemas Computacionales con enfoque en backend, infraestructura, sistemas embebidos e integración de hardware (IoT). Experiencia en desarrollo backend, despliegue en entornos productivos y comunicación entre dispositivos físicos y servicios en la nube.",
  email: "jog02ortiz@gmail.com",
  phone: "+52 675-106-7857",
  linkedin: "linkedin.com/in/javier-ortiz-godinez-1b292b21a",
  location: "Durango / Zacatecas, México",
  institution: "ITSZO — Ing. en Sistemas Computacionales",
  focus: "IoT · Backend · Sistemas Embebidos · Infraestructura",

  experience: [
    {
      role: "Sistema de Control de Acceso con Raspberry Pi",
      type: "Proyecto Escolar",
      company: "ITSZO",
      location: "Zacatecas, México",
      date: "02/2025 – 06/2025",
      color: "cyan",
      bullets: [
        "Implementación de sistema de control de acceso mediante Raspberry Pi.",
        "Integración de lector RFID (RC522) para autenticación física.",
        "Desarrollo de interfaz gráfica en Python con Tkinter.",
        "Comunicación con base de datos PostgreSQL en la nube.",
        "Comunicación segura entre dispositivo físico y sistema remoto.",
        "Trabajo colaborativo bajo metodología ágil (Scrum + Jira).",
      ],
      tags: ["Raspberry Pi", "RFID RC522", "PostgreSQL", "Python / Tkinter", "Scrum"],
    },
    {
      role: "Sistema de Inventario para Renta de Inmobiliario",
      type: "Freelancer",
      company: "Autónomo",
      location: "Durango, México",
      date: "07/2025 – 12/2025",
      color: "green",
      bullets: [
        "Desarrollo de aplicación móvil y de escritorio para gestión de inventario.",
        "Implementación de backend con Firebase (Firestore + Auth).",
        "Manejo de autenticación y control de acceso.",
        "Generación de reportes en formato Excel.",
        "Integración de funcionalidades tipo punto de venta.",
      ],
      tags: ["Flutter", "Firebase", "Firestore", "Firebase Auth"],
    },
    {
      role: "Sistema de Profesionalización Docente",
      type: "Practicante",
      company: "ITSZO",
      location: "Zacatecas, México",
      date: "09/2025 – 01/2026",
      color: "purple",
      bullets: [
        "Diseño de arquitectura para el sistema de profesionalización docente del ITSZO.",
        "Desarrollo de sistema web para gestión de información académica.",
        "Diseño e implementación de base de datos en PostgreSQL.",
        "Generación de reportes estadísticos y visualización de datos.", 
        "Implementación de autenticación y manejo de roles.",
        "Generación de documentos PDF con códigos QR.",
        "Arquitectura MVC en entorno productivo.",
      ],
      tags: ["Laravel", "React", "PostgreSQL", "MVC", "PDF / QR"],
    },
  ],

  skillGroups: [
    { label: "Lenguajes", items: ["Python", "C#", "PHP", "Dart", "JavaScript"] },
    { label: "Frameworks & Mobile", items: ["Laravel", "React", "Flutter"] },
    { label: "Infraestructura", items: ["Docker", "Linux", "Render", "Plesk", "Git / GitHub", "REST API"] },
    { label: "Bases de Datos", items: ["PostgreSQL", "Firebase", "Firestore"] },
    { label: "Embebidos / IoT", items: ["Raspberry Pi", "ESP32", "RFID RC522", "Sensores"] },
    { label: "Metodologías", items: ["Scrum", "Jira", "MVC", "Clean Architecture"] },
  ],

  projects: [
    { icon: "💧", type: "IoT · Embebido · Mobile", name: "Control de Bombas de Agua Automáticas", desc: "Control automático y remoto de bombas con ESP32. Sensores de flujo y corriente para datos en tiempo real. Monitoreo desde app Flutter con visualización de consumo energético.", tags: ["ESP32", "Flutter", "Sensores", "IoT"] },
    { icon: "🐳", type: "Backend · DevOps", name: "API REST en Contenedores", desc: "API REST con arquitectura limpia, autenticación JWT y control de acceso. Contenedorización con Docker y despliegue en Render. Enfocada en escalabilidad.", tags: ["Docker", "REST API", "Render", "Clean Arch."] },
    { icon: "🔐", type: "Hardware · Python", name: "Control de Acceso RFID", desc: "Sistema físico con Raspberry Pi y módulo RFID RC522. Interfaz Tkinter y PostgreSQL en la nube para registro y gestión de accesos en tiempo real.", tags: ["Raspberry Pi", "RFID", "PostgreSQL", "Python"] },
    { icon: "📦", type: "Full Stack · Mobile", name: "App de Inventario para Renta", desc: "Aplicación multiplataforma (móvil + escritorio) con POS, reportes Excel, autenticación Firebase y control de acceso por roles.", tags: ["Flutter", "Firebase", "Firestore", "Excel"] },
  ],
};

const tagColors = {
  cyan:   { bg: "rgba(0,212,255,0.1)",   color: "#00d4ff", border: "rgba(0,212,255,0.25)" },
  green:  { bg: "rgba(0,255,136,0.08)",  color: "#00ff88", border: "rgba(0,255,136,0.2)" },
  purple: { bg: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "rgba(167,139,250,0.25)" },
  amber:  { bg: "rgba(255,179,71,0.1)",  color: "#ffb347", border: "rgba(255,179,71,0.2)" },
};

const accentColor = {
  cyan:   "#00d4ff",
  green:  "#00ff88",
  purple: "#a78bfa",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity .6s ${delay}s ease, transform .6s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Tag({ label, color = "cyan" }) {
  const c = tagColors[color] || tagColors.cyan;
  return (
    <span style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: 10,
      padding: "3px 8px",
      borderRadius: 3,
      background: c.bg,
      color: c.color,
      border: `1px solid ${c.border}`,
      letterSpacing: ".04em",
    }}>{label}</span>
  );
}

function SectionHeader({ num, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00d4ff", letterSpacing: ".1em" }}>{num}</span>
      <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-.02em", color: "#e8edf2", margin: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: "#1f2d40" }} />
    </div>
  );
}

function Nav({ active }) {
  const links = ["Perfil", "Experiencia", "Skills", "Proyectos", "Contacto"];
  const ids    = ["about", "experience", "skills", "projects", "contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.1rem clamp(1.5rem, 5vw, 3rem)",
      background: "rgba(8,11,15,0.88)", backdropFilter: "blur(14px)",
      borderBottom: "1px solid #1f2d40",
    }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#00d4ff", letterSpacing: ".08em" }}>JOG.dev</span>
      <div style={{ display: "flex", gap: 28 }}>
        {links.map((l, i) => (
          <a key={l} href={`#${ids[i]}`} style={{
            fontFamily: "'Space Mono', monospace", fontSize: 12,
            color: active === ids[i] ? "#00d4ff" : "#8a9bb0",
            textDecoration: "none", letterSpacing: ".06em",
            transition: "color .2s",
          }}>{l}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem clamp(1.5rem,5vw,3rem) 4rem", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#00d4ff", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: 24, display: "flex", alignItems: "center", gap: 8, animation: "fadeUp .6s ease both" }}>
        <span style={{ display: "inline-block", width: 28, height: 1, background: "#00d4ff" }} />
        Disponible para nuevas oportunidades
      </div>
      <h1 style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-.02em", color: "#e8edf2", margin: "0 0 12px", animation: "fadeUp .6s .1s ease both" }}>
        Javier<br />Ortiz <span style={{ color: "#00d4ff" }}>Godinez</span>
      </h1>
      <p style={{ fontSize: "1.05rem", color: "#8a9bb0", marginBottom: 20, animation: "fadeUp .6s .2s ease both" }}>{data.role}</p>
      <p style={{ maxWidth: 640, color: "#8a9bb0", lineHeight: 1.78, fontSize: ".95rem", marginBottom: 32, animation: "fadeUp .6s .3s ease both" }}>{data.bio}</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp .6s .4s ease both" }}>
        <a href="#projects" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: ".7rem 1.5rem", borderRadius: 4, background: "#00d4ff", color: "#000", fontFamily: "'Space Mono', monospace", fontSize: 12, textDecoration: "none", fontWeight: 700, transition: "background .2s" }}>Ver proyectos →</a>
        <a href="#contact"  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: ".7rem 1.5rem", borderRadius: 4, background: "transparent", color: "#8a9bb0", border: "1px solid #243346", fontFamily: "'Space Mono', monospace", fontSize: 12, textDecoration: "none", transition: "all .2s" }}>Contactar</a>
      </div>
      <div style={{ display: "flex", gap: 40, marginTop: 56, paddingTop: 32, borderTop: "1px solid #1f2d40", flexWrap: "wrap", animation: "fadeUp .6s .5s ease both" }}>
        {[["3+", "Proyectos completados"], ["IoT", "Especialización embebida"], ["Full", "Stack developer"]].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.8rem", fontWeight: 700, color: "#00d4ff", lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 12, color: "#4a5a6a", marginTop: 4, letterSpacing: ".04em" }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const contacts = [
    { icon: "✉", label: data.email, href: `mailto:${data.email}` },
    { icon: "📞", label: data.phone, href: `tel:${data.phone.replace(/\s/g,"")}` },
    { icon: "in", label: data.linkedin, href: `https://${data.linkedin}` },
  ];
  const cards = [
    ["Titulación", data.institution],
    ["Ubicación", data.location],
    ["Enfoque", data.focus],
  ];
  return (
    <section id="about" style={{ background: "#0d1117" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem clamp(1.5rem,5vw,3rem)" }}>
        <FadeUp><SectionHeader num="01" title="Perfil" /></FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
          <FadeUp>
            <div>
              {["Soy Ingeniero en Sistemas Computacionales con pasión por construir sistemas que conectan el mundo físico con el digital.", "Me especializo en soluciones IoT, sistemas embebidos y aplicaciones backend robustas, integrando sensores y hardware con la nube.", "Disfruto resolver problemas complejos desde el firmware hasta el frontend."].map((p, i) => (
                <p key={i} style={{ color: "#8a9bb0", lineHeight: 1.8, marginBottom: 12, fontSize: ".95rem" }}>{p}</p>
              ))}
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                {contacts.map(c => (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#8a9bb0", textDecoration: "none" }}>
                    <span style={{ width: 32, height: 32, borderRadius: 4, background: "rgba(0,212,255,0.08)", border: "1px solid #243346", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{c.icon}</span>
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cards.map(([label, value]) => (
                <div key={label} style={{ background: "#141c26", border: "1px solid #1f2d40", borderRadius: 8, padding: "1.1rem 1.25rem" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00d4ff", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: ".95rem", color: "#e8edf2", fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState(null);
  return (
    <section id="experience" style={{ background: "#080b0f" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem clamp(1.5rem,5vw,3rem)" }}>
        <FadeUp><SectionHeader num="02" title="Experiencia" /></FadeUp>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {data.experience.map((exp, i) => {
            const isOpen = open === i;
            const accent = accentColor[exp.color] || "#00d4ff";
            const tagC = exp.color;
            return (
              <FadeUp key={i} delay={i * 0.1}>
                <div onClick={() => setOpen(isOpen ? null : i)} style={{
                  background: "#141c26", border: `1px solid ${isOpen ? accent : "#1f2d40"}`,
                  borderLeft: `3px solid ${isOpen ? accent : "#1f2d40"}`,
                  borderRadius: 8, padding: "1.6rem", cursor: "pointer",
                  transition: "border-color .25s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#e8edf2" }}>{exp.role}</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#4a5a6a", letterSpacing: ".04em" }}>{exp.date}</span>
                  </div>
                  <div style={{ fontSize: ".85rem", color: accent, marginBottom: isOpen ? 16 : 0, display: "flex", alignItems: "center", gap: 6 }}>
                    {exp.type} <span style={{ color: "#4a5a6a" }}>·</span> {exp.company} <span style={{ color: "#4a5a6a" }}>·</span> {exp.location}
                  </div>
                  {isOpen && (
                    <>
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} style={{ fontSize: ".875rem", color: "#8a9bb0", paddingLeft: "1rem", position: "relative", lineHeight: 1.6 }}>
                            <span style={{ position: "absolute", left: 0, color: accent }}>›</span>{b}
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {exp.tags.map(t => <Tag key={t} label={t} color={tagC} />)}
                      </div>
                    </>
                  )}
                  <div style={{ marginTop: isOpen ? 12 : 2, textAlign: "right", fontSize: 11, color: "#4a5a6a", fontFamily: "'Space Mono', monospace", letterSpacing: ".04em" }}>
                    {isOpen ? "▲ cerrar" : "▼ ver detalle"}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ background: "#0d1117" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem clamp(1.5rem,5vw,3rem)" }}>
        <FadeUp><SectionHeader num="03" title="Habilidades" /></FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {data.skillGroups.map((g, i) => (
            <FadeUp key={g.label} delay={i * 0.07}>
              <div style={{ background: "#141c26", border: "1px solid #1f2d40", borderRadius: 8, padding: "1.4rem" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#4a5a6a", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  {g.label}
                  <span style={{ flex: 1, height: 1, background: "#1f2d40", display: "inline-block" }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {g.items.map(item => (
                    <span key={item} style={{ fontSize: 13, padding: ".32rem .7rem", borderRadius: 4, border: "1px solid #243346", color: "#8a9bb0", background: "#0d1117", transition: "all .2s", cursor: "default" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff"; e.currentTarget.style.color = "#00d4ff"; e.currentTarget.style.background = "rgba(0,212,255,0.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#243346"; e.currentTarget.style.color = "#8a9bb0"; e.currentTarget.style.background = "#0d1117"; }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ onDemo }) {
  return (
    <section id="projects" style={{ background: "#080b0f" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem clamp(1.5rem,5vw,3rem)" }}>
        <FadeUp><SectionHeader num="04" title="Proyectos Destacados" /></FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 14 }}>
          {data.projects.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.08}>
              <div style={{ background: "#141c26", border: "1px solid #1f2d40", borderRadius: 8, padding: "1.6rem", display: "flex", flexDirection: "column", gap: 14, transition: "border-color .25s, transform .25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1f2d40"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#00d4ff", letterSpacing: ".08em", marginBottom: 4 }}>{p.type}</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "#e8edf2" }}>{p.name}</div>
                  </div>
                  <span style={{ width: 42, height: 42, borderRadius: 8, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{p.icon}</span>
                </div>
                <p style={{ fontSize: ".875rem", color: "#8a9bb0", lineHeight: 1.65, margin: 0, flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map(t => <Tag key={t} label={t} color="cyan" />)}
                </div>
                {p.icon === "🔐" && (
                  <button
                    onClick={onDemo}
                    style={{
                      marginTop: 4,
                      padding: "8px 16px",
                      background: "rgba(0,212,255,0.08)",
                      border: "1px solid rgba(0,212,255,0.3)",
                      borderRadius: 4,
                      color: "#00d4ff",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 11,
                      cursor: "pointer",
                      letterSpacing: ".06em",
                      transition: "all .2s",
                      alignSelf: "flex-start",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.15)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,212,255,0.08)"; }}
                  >
                    ▶ Ver demo interactiva
                  </button>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { icon: "✉", label: "Email", value: data.email, href: `mailto:${data.email}` },
    { icon: "📱", label: "Teléfono", value: data.phone, href: `tel:${data.phone.replace(/\s/g,"")}` },
    { icon: "in", label: "LinkedIn", value: "javier-ortiz-godinez", href: `https://${data.linkedin}` },
    { icon: "📍", label: "Ubicación", value: data.location, href: null },
  ];
  return (
    <section id="contact" style={{ background: "#0d1117" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "6rem clamp(1.5rem,5vw,3rem)" }}>
        <FadeUp><SectionHeader num="05" title="Contacto" /></FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
          <FadeUp>
            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e8edf2", marginBottom: 14 }}>¿Tienes un proyecto en mente?</h3>
              <p style={{ color: "#8a9bb0", fontSize: ".95rem", lineHeight: 1.8, marginBottom: 28 }}>Estoy disponible para nuevas oportunidades y proyectos freelance</p>
              <a href={`mailto:${data.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: ".7rem 1.5rem", borderRadius: 4, background: "#00d4ff", color: "#000", fontFamily: "'Space Mono', monospace", fontSize: 12, textDecoration: "none", fontWeight: 700 }}>Enviar mensaje →</a>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map(l => {
                const inner = (
                  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "1rem 1.25rem", background: "#141c26", border: "1px solid #1f2d40", borderRadius: 8, textDecoration: "none", transition: "all .2s" }}
                    onMouseEnter={e => { if (l.href) { e.currentTarget.style.borderColor = "#00d4ff"; e.currentTarget.style.background = "rgba(0,212,255,0.08)"; }}}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#1f2d40"; e.currentTarget.style.background = "#141c26"; }}>
                    <span style={{ width: 36, height: 36, borderRadius: 6, background: "#080b0f", border: "1px solid #243346", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{l.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#4a5a6a", letterSpacing: ".06em", textTransform: "uppercase" }}>{l.label}</div>
                      <div style={{ fontSize: ".9rem", color: "#e8edf2", fontWeight: 500 }}>{l.value}</div>
                    </div>
                  </div>
                );
                return l.href
                  ? <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} style={{ textDecoration: "none" }}>{inner}</a>
                  : <div key={l.label}>{inner}</div>;
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("hero");
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const ids = ["hero", "about", "experience", "skills", "projects", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.3 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #080b0f; font-family: 'Syne', sans-serif; overflow-x: hidden; }
        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none; z-index: 0;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        section { position: relative; z-index: 1; }
        a { transition: color .2s; }
      `}</style>

      <Nav active={active} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects onDemo={() => setShowDemo(true)} />
      <Contact />
      {showDemo && (
        <div 
          onClick={() => setShowDemo(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
            overflowY: "auto", display: "flex", padding: "40px 20px"
          }}
        >
          <button 
            onClick={() => setShowDemo(false)}
            style={{
              position: "fixed", top: 20, right: 20,
              background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", fontSize: 24, cursor: "pointer",
              width: 44, height: 44, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1001, transition: "background 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,0,0,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; }}
          >
            ✕
          </button>
          <div 
            onClick={e => e.stopPropagation()}
            style={{ margin: "auto", width: "100%", maxWidth: 900, position: "relative" }}
          >
            <RFIDSimulator />
          </div>
        </div>
      )}
    </>
  );
}