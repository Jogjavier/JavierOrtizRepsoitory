import { useState, useEffect, useRef } from "react";

const TEACHERS = [
  {
    id: 1,
    nombre: "Dr. Carlos Mendoza",
    rfid: "123456789",
    subjects: [[1, "Programación Web"], [2, "Base de Datos"]],
    career_groups: [[1, "ISC-401"], [2, "ISC-501"]],
    software_type: [[1, "VSCode + Node.js"], [2, "MySQL Workbench"]],
  },
  {
    id: 2,
    nombre: "Mtra. Laura Vázquez",
    rfid: "987654321",
    subjects: [[3, "Redes de Computadoras"], [4, "Sistemas Operativos"]],
    career_groups: [[3, "ISC-301"], [4, "ISC-401"]],
    software_type: [[3, "Cisco Packet Tracer"], [4, "VirtualBox"]],
  },
  {
    id: 3,
    nombre: "Ing. Roberto Flores",
    rfid: "456789123",
    subjects: [[5, "Inteligencia Artificial"], [6, "Minería de Datos"]],
    career_groups: [[5, "ISC-601"], [6, "ISC-701"]],
    software_type: [[5, "Python + Jupyter"], [6, "RapidMiner"]],
  },
];

const SCREENS = {
  MAIN: "main",
  SCANNING: "scanning",
  FOUND: "found",
  FORM: "form",
  CONFIRM: "confirm",
  SUCCESS: "success",
  EXIT_SCAN: "exit_scan",
  EXIT_DONE: "exit_done",
};

function useTypewriter(text, speed = 40, active = true) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(text); return; }
    setDisplayed("");
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, active]);
  return displayed;
}

function RFIDCard({ teacher, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: selected ? "#1d127a" : "rgba(29,18,122,0.08)",
        border: `2px solid ${selected ? "#1d127a" : "rgba(29,18,122,0.25)"}`,
        borderRadius: 12,
        padding: "12px 16px",
        cursor: "pointer",
        transition: "all .2s",
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        textAlign: "left",
      }}
    >
      <div style={{
        width: 44, height: 30,
        background: selected ? "rgba(255,255,255,0.2)" : "rgba(29,18,122,0.15)",
        borderRadius: 6,
        border: `1.5px solid ${selected ? "rgba(255,255,255,0.4)" : "rgba(29,18,122,0.3)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, flexShrink: 0,
      }}>🪪</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: selected ? "#fff" : "#1d127a", fontFamily: "'DM Mono', monospace" }}>{teacher.nombre}</div>
        <div style={{ fontSize: 11, color: selected ? "rgba(255,255,255,0.7)" : "#666", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>
          RFID: {teacher.rfid}
        </div>
      </div>
    </button>
  );
}

function Screen({ children, bg = "#f5e0e0" }) {
  return (
    <div style={{
      background: bg,
      borderRadius: 16,
      padding: "28px 32px",
      minHeight: 340,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Top bar like Tkinter */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 28,
        background: "#1d127a",
        borderRadius: "16px 16px 0 0",
        display: "flex", alignItems: "center", gap: 6, padding: "0 12px",
      }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginLeft: 6, fontFamily: "'DM Mono', monospace" }}>
          Laboratorio de MAC
        </span>
      </div>
      <div style={{ marginTop: 20 }}>{children}</div>
    </div>
  );
}

function Logo() {
  return (
    <div style={{
      width: 52, height: 52,
      background: "#1d127a",
      borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 22,
      flexShrink: 0,
      boxShadow: "0 2px 8px rgba(29,18,122,0.25)",
    }}>🎓</div>
  );
}

function Title({ text = "Laboratorio de MAC" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <Logo />
      <div style={{ fontSize: 18, fontWeight: 700, color: "#1d127a", fontFamily: "'Syne', sans-serif" }}>{text}</div>
    </div>
  );
}

function Btn({ children, onClick, disabled, variant = "primary", small }) {
  const bg = variant === "primary" ? "#1d127a" : variant === "danger" ? "#c0392b" : "#555";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#ccc" : bg,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: small ? "7px 16px" : "10px 24px",
        fontSize: small ? 12 : 14,
        fontWeight: 700,
        fontFamily: "'Syne', sans-serif",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "opacity .15s, transform .1s",
        opacity: disabled ? 0.6 : 1,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = ".85"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
    >
      {children}
    </button>
  );
}

function Field({ label, value, onChange, type = "text", options }) {
  const shared = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 6,
    border: "1.5px solid rgba(29,18,122,0.25)",
    fontFamily: "'DM Mono', monospace",
    fontSize: 13,
    background: "#fff",
    color: "#1d127a",
    outline: "none",
    boxSizing: "border-box",
    marginTop: 4,
  };
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#1d127a", fontFamily: "'Syne', sans-serif", display: "block" }}>{label}</label>
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={shared}>
          <option value="">-- Seleccionar --</option>
          {options.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} style={shared} />
      )}
    </div>
  );
}

function ScanAnimation({ label, onDone, delay = 2000 }) {
  const [dots, setDots] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const d = setInterval(() => setDots(p => (p + 1) % 4), 400);
    const p = setInterval(() => setProgress(v => Math.min(v + 3, 100)), delay / 33);
    const t = setTimeout(onDone, delay);
    return () => { clearInterval(d); clearInterval(p); clearTimeout(t); };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <div style={{
        width: 80, height: 80, margin: "0 auto 16px",
        borderRadius: "50%",
        border: "3px solid rgba(29,18,122,0.15)",
        borderTop: "3px solid #1d127a",
        animation: "spin 1s linear infinite",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 32,
      }}>
        <span style={{ animation: "none" }}>📡</span>
      </div>
      <div style={{ fontSize: 14, color: "#1d127a", fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
        {label}{"...".slice(0, dots + 1)}
      </div>
      <div style={{ marginTop: 16, background: "rgba(29,18,122,0.1)", borderRadius: 99, height: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "#1d127a", borderRadius: 99, width: `${progress}%`, transition: "width .1s" }} />
      </div>
    </div>
  );
}

function DataRow({ label, value }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "7px 12px",
      background: "#fff",
      borderRadius: 6,
      marginBottom: 6,
    }}>
      <span style={{ fontSize: 12, color: "#666", fontFamily: "'DM Mono', monospace" }}>{label}</span>
      <span style={{ fontSize: 12, color: "#1d127a", fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{value}</span>
    </div>
  );
}

function DBLog({ entries }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [entries]);
  return (
    <div ref={ref} style={{
      background: "#0d1117",
      borderRadius: 8,
      padding: "10px 14px",
      fontFamily: "'DM Mono', monospace",
      fontSize: 11,
      color: "#00ff88",
      maxHeight: 120,
      overflowY: "auto",
      lineHeight: 1.8,
    }}>
      {entries.map((e, i) => (
        <div key={i} style={{ color: e.color || "#00ff88" }}>{e.text}</div>
      ))}
    </div>
  );
}

export default function RFIDSimulator() {
  const [screen, setScreen] = useState(SCREENS.MAIN);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [form, setForm] = useState({ alumnos: "", materia: "", grupo: "", software: "" });
  const [record, setRecord] = useState(null);
  const [dbLog, setDbLog] = useState([
    { text: "-- PostgreSQL 14.2 on 216.225.200.190:5432", color: "#8a9bb0" },
    { text: "-- Database: IDSentinel | Status: Connected ✓", color: "#00d4ff" },
  ]);

  const addLog = (text, color) => setDbLog(prev => [...prev, { text, color }]);

  const now = () => {
    const d = new Date();
    return {
      fecha: d.toLocaleDateString("es-MX"),
      hora: d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const handleScan = () => {
    if (!selectedTeacher) return;
    setScreen(SCREENS.SCANNING);
    addLog(`> SELECT * FROM teachers WHERE rfid = '${selectedTeacher.rfid}';`, "#ffb347");
  };

  const handleScanDone = () => {
    const t = TEACHERS.find(t => t.id === selectedTeacher.id);
    setTeacher(t);
    addLog(`< 1 row: id=${t.id}, nombre="${t.nombre}"`, "#00ff88");
    addLog(`< Fetching subjects, groups, software...`, "#8a9bb0");
    setScreen(SCREENS.FOUND);
  };

  const handleContinue = () => {
    addLog(`< Asignaciones cargadas (${teacher.subjects.length} materias)`, "#00ff88");
    setScreen(SCREENS.FORM);
  };

  const formValid = form.alumnos && parseInt(form.alumnos) > 0 && form.materia && form.grupo && form.software;

  const handleConfirm = () => {
    if (!formValid) return;
    const t = now();
    setRecord({
      docente: teacher.nombre,
      materia: teacher.subjects.find(s => s[0] == form.materia)?.[1] || "",
      grupo: teacher.career_groups.find(g => g[0] == form.grupo)?.[1] || "",
      software: teacher.software_type.find(s => s[0] == form.software)?.[1] || "",
      alumnos: form.alumnos,
      ...t,
    });
    setScreen(SCREENS.CONFIRM);
  };

  const handleRegister = () => {
    const t = now();
    addLog(`> INSERT INTO access_records (teacher_id, rfid, subject_id, ...)`, "#ffb347");
    addLog(`  VALUES (${teacher.id}, '${teacher.rfid}', ${form.materia}, ...) RETURNING id;`, "#ffb347");
    addLog(`< INSERT 0 1 — estado: 'ocupado', hora_entrada: ${t.hora}`, "#00ff88");
    setScreen(SCREENS.SUCCESS);
  };

  const handleExitScan = () => {
    setScreen(SCREENS.EXIT_SCAN);
    addLog(`> Leyendo RFID para salida...`, "#8a9bb0");
  };

  const handleExitDone = () => {
    const t = now();
    addLog(`> SELECT ar.id FROM access_records ar WHERE t.rfid='${teacher.rfid}' AND hora_salida IS NULL LIMIT 1;`, "#ffb347");
    addLog(`< UPDATE access_records SET hora_salida='${t.hora}', estado='libre' WHERE id=...`, "#ffb347");
    addLog(`< UPDATE 1 — Lab libre ✓`, "#00ff88");
    setScreen(SCREENS.EXIT_DONE);
  };

  const handleReset = () => {
    setScreen(SCREENS.MAIN);
    setSelectedTeacher(null);
    setTeacher(null);
    setForm({ alumnos: "", materia: "", grupo: "", software: "" });
    setRecord(null);
    addLog(`> -- Nueva sesión iniciada`, "#8a9bb0");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(29,18,122,0.3)} 50%{box-shadow:0 0 0 10px rgba(29,18,122,0)} }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{
        fontFamily: "'Syne', sans-serif",
        background: "#0a0e1a",
        borderRadius: 20,
        padding: "24px",
        maxWidth: 860,
        margin: "0 auto",
      }}>
        {/* Header */}
        <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: ".15em", color: "#00d4ff", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", marginBottom: 4 }}>
              Sistema de Control de Acceso
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#e8edf2" }}>Laboratorio de MAC — Simulación RFID</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.25)", borderRadius: 6, padding: "5px 12px" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00ff88", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 11, color: "#00ff88", fontFamily: "'DM Mono', monospace" }}>Raspberry Pi — Online</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {/* Left: Simulator */}
          <div style={{ animation: "fadeIn .4s ease" }}>

            {/* MAIN */}
            {screen === SCREENS.MAIN && (
              <Screen>
                <Title />
                <div style={{ fontSize: 13, color: "#555", marginBottom: 14, fontFamily: "'DM Mono', monospace" }}>
                  Selecciona una tarjeta para simular la lectura RFID:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                  {TEACHERS.map(t => (
                    <RFIDCard key={t.id} teacher={t} selected={selectedTeacher?.id === t.id} onClick={() => setSelectedTeacher(t)} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Btn onClick={handleScan} disabled={!selectedTeacher}>
                    📡 Aproximar tarjeta
                  </Btn>
                </div>
              </Screen>
            )}

            {/* SCANNING */}
            {screen === SCREENS.SCANNING && (
              <Screen>
                <Title />
                <ScanAnimation label="Leyendo módulo RFID RC522" onDone={handleScanDone} delay={2200} />
                <div style={{ textAlign: "center", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#888", marginTop: 8 }}>
                  rfid: {selectedTeacher?.rfid}
                </div>
              </Screen>
            )}

            {/* FOUND */}
            {screen === SCREENS.FOUND && teacher && (
              <Screen>
                <Title />
                <div style={{ background: "rgba(0,200,100,0.1)", border: "1.5px solid rgba(0,200,100,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>✅</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1d127a", fontFamily: "'Syne', sans-serif" }}>Docente encontrado</div>
                    <div style={{ fontSize: 12, color: "#444", fontFamily: "'DM Mono', monospace" }}>{teacher.nombre}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>
                  {teacher.subjects.length} mat · {teacher.career_groups.length} grupos · {teacher.software_type.length} software
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Btn onClick={handleContinue}>Continuar →</Btn>
                </div>
              </Screen>
            )}

            {/* FORM */}
            {screen === SCREENS.FORM && teacher && (
              <Screen>
                <Title />
                <div style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#1d127a", marginBottom: 12, fontWeight: 600 }}>
                  {teacher.nombre}
                </div>
                <Field label="Total de alumnos" value={form.alumnos} onChange={v => setForm(f => ({ ...f, alumnos: v }))} type="number" />
                <Field label="Materia" value={form.materia} onChange={v => setForm(f => ({ ...f, materia: v }))} options={teacher.subjects} />
                <Field label="Grupo" value={form.grupo} onChange={v => setForm(f => ({ ...f, grupo: v }))} options={teacher.career_groups} />
                <Field label="Software" value={form.software} onChange={v => setForm(f => ({ ...f, software: v }))} options={teacher.software_type} />
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
                  <Btn onClick={() => setScreen(SCREENS.FOUND)} variant="secondary" small>← Atrás</Btn>
                  <Btn onClick={handleConfirm} disabled={!formValid} small>Continuar →</Btn>
                </div>
              </Screen>
            )}

            {/* CONFIRM */}
            {screen === SCREENS.CONFIRM && record && (
              <Screen>
                <Title />
                <div style={{ marginBottom: 12 }}>
                  <DataRow label="Docente" value={record.docente} />
                  <DataRow label="Materia" value={record.materia} />
                  <DataRow label="Grupo" value={record.grupo} />
                  <DataRow label="Software" value={record.software} />
                  <DataRow label="Total Alumnos" value={record.alumnos} />
                  <DataRow label="Fecha" value={record.fecha} />
                  <DataRow label="Hora Entrada" value={record.hora} />
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <Btn onClick={() => setScreen(SCREENS.FORM)} variant="secondary" small>← Atrás</Btn>
                  <Btn onClick={handleRegister} small>Confirmar ✓</Btn>
                </div>
              </Screen>
            )}

            {/* SUCCESS */}
            {screen === SCREENS.SUCCESS && (
              <Screen>
                <Title />
                <div style={{ textAlign: "center", padding: "12px 0 20px" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                  <div style={{ background: "#00c864", borderRadius: 8, padding: "10px 24px", display: "inline-block", color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Syne', sans-serif" }}>
                    Registro Exitoso
                  </div>
                  <div style={{ fontSize: 12, color: "#555", fontFamily: "'DM Mono', monospace", marginTop: 10 }}>
                    Estado del lab: <strong style={{ color: "#c0392b" }}>OCUPADO</strong>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Btn onClick={handleExitScan} variant="danger">Registrar Salida 🚪</Btn>
                </div>
              </Screen>
            )}

            {/* EXIT SCAN */}
            {screen === SCREENS.EXIT_SCAN && (
              <Screen>
                <Title text="Registrar Salida" />
                <ScanAnimation label="Aproxime su tarjeta" onDone={handleExitDone} delay={2000} />
              </Screen>
            )}

            {/* EXIT DONE */}
            {screen === SCREENS.EXIT_DONE && (
              <Screen>
                <Title />
                <div style={{ textAlign: "center", padding: "12px 0 20px" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                  <div style={{ fontSize: 14, color: "#1d127a", fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 6 }}>
                    Salida Registrada
                  </div>
                  <div style={{ fontSize: 12, color: "#555", fontFamily: "'DM Mono', monospace" }}>
                    Estado del lab: <strong style={{ color: "#00c864" }}>LIBRE</strong>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Btn onClick={handleReset}>↩ Nueva sesión</Btn>
                </div>
              </Screen>
            )}
          </div>

          {/* Right: DB Log + Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* DB Console */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: ".12em", color: "#8a9bb0", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", marginBottom: 6 }}>
                PostgreSQL Console — IDSentinel
              </div>
              <DBLog entries={dbLog} />
            </div>

            {/* Stack */}
            <div style={{ background: "#111820", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, letterSpacing: ".12em", color: "#8a9bb0", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", marginBottom: 10 }}>
                Stack del proyecto
              </div>
              {[
                { icon: "🍓", label: "Raspberry Pi 4", sub: "Hardware central" },
                { icon: "📡", label: "Módulo RFID RC522", sub: "Autenticación física" },
                { icon: "🐍", label: "Python + Tkinter", sub: "GUI de escritorio" },
                { icon: "🐘", label: "PostgreSQL (Nube)", sub: "216.225.200.190:5432" },
                { icon: "🔒", label: "Scrum + Jira", sub: "Metodología ágil" },
              ].map(({ icon, label, sub }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
                  <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: "#e8edf2", fontFamily: "'DM Mono', monospace" }}>{label}</div>
                    <div style={{ fontSize: 10, color: "#4a5a6a", fontFamily: "'DM Mono', monospace" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Flow */}
            <div style={{ background: "#111820", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, letterSpacing: ".12em", color: "#8a9bb0", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", marginBottom: 10 }}>
                Flujo del sistema
              </div>
              {[
                ["📡", "Lectura RFID", screen === SCREENS.SCANNING || screen === SCREENS.FOUND],
                ["🔍", "Consulta BD", screen === SCREENS.FOUND || screen === SCREENS.FORM],
                ["📝", "Registro entrada", screen === SCREENS.CONFIRM || screen === SCREENS.SUCCESS],
                ["🚪", "Registro salida", screen === SCREENS.EXIT_SCAN || screen === SCREENS.EXIT_DONE],
              ].map(([icon, label, active]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: active ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                    transition: "all .3s",
                  }}>{icon}</div>
                  <span style={{ fontSize: 12, color: active ? "#00d4ff" : "#4a5a6a", fontFamily: "'DM Mono', monospace", transition: "color .3s" }}>
                    {label}
                  </span>
                  {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4ff", animation: "pulse 1.5s infinite", marginLeft: "auto" }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}