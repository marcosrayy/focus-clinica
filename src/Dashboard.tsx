import { useState, useEffect, createContext, useContext } from "react";
import type { ReactNode } from "react";
import logoImage from "@/imports/focuslogo.png";

// ─── Theme ────────────────────────────────────────────────────────────────────

const LIGHT = {
  pageBg: "#f5f7fa",
  cardBg: "#ffffff",
  cardHover: "#f8fafc",
  mutedBg: "#f8fafc",
  border: "#f1f5f9",
  borderStrong: "#e2e8f0",
  textPrimary: "#0f172a",
  textSecondary: "#374151",
  textMuted: "#64748b",
  textFaint: "#94a3b8",
  textFaintest: "#cbd5e1",
  inputBg: "#fafafa",
  sidebarBg: "#0a1f1c",
  sidebarText: "rgba(255,255,255,0.45)",
  sidebarActiveText: "#5eead4",
  sidebarActiveBg: "rgba(20,184,166,0.15)",
  sidebarBorder: "rgba(255,255,255,0.06)",
  sidebarUserCard: "rgba(255,255,255,0.05)",
  sidebarUserBorder: "rgba(255,255,255,0.08)",
  sidebarLabel: "rgba(255,255,255,0.25)",
  headerBg: "#0a1f1c",
  headerBorder: "rgba(255,255,255,0.07)",
  headerText: "#e8f4f2",
  headerMuted: "rgba(255,255,255,0.42)",
  headerBtnBg: "rgba(255,255,255,0.08)",
  headerBtnBorder: "rgba(255,255,255,0.12)",
  searchBg: "#f8fafc",
  tableRowHover: "#f8fafc",
  notifHover: "#f8fafc",
  calDayColor: "#374151",
  shadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  shadowModal: "0 24px 64px rgba(0,0,0,0.18)",
  kpiBg: "#ffffff",
};

const DARK = {
  pageBg: "#1a1e1d",
  cardBg: "#222826",
  cardHover: "#293330",
  mutedBg: "#252b29",
  border: "#2e3835",
  borderStrong: "#3a4542",
  textPrimary: "#f0f4f3",
  textSecondary: "#c8d0ce",
  textMuted: "#8fa09c",
  textFaint: "#6b7d79",
  textFaintest: "#435550",
  inputBg: "#252b29",
  sidebarBg: "#0f1614",
  sidebarText: "rgba(255,255,255,0.42)",
  sidebarActiveText: "#5eead4",
  sidebarActiveBg: "rgba(20,184,166,0.16)",
  sidebarBorder: "rgba(255,255,255,0.05)",
  sidebarUserCard: "rgba(255,255,255,0.04)",
  sidebarUserBorder: "rgba(255,255,255,0.07)",
  sidebarLabel: "rgba(255,255,255,0.22)",
  headerBg: "#071210",
  headerBorder: "rgba(255,255,255,0.06)",
  headerText: "#e8f4f2",
  headerMuted: "rgba(255,255,255,0.38)",
  headerBtnBg: "rgba(255,255,255,0.07)",
  headerBtnBorder: "rgba(255,255,255,0.10)",
  searchBg: "#252b29",
  tableRowHover: "#293330",
  notifHover: "#293330",
  calDayColor: "#c8d0ce",
  shadow: "0 1px 3px rgba(0,0,0,0.28), 0 1px 2px rgba(0,0,0,0.18)",
  shadowModal: "0 24px 64px rgba(0,0,0,0.48)",
  kpiBg: "#222826",
};

type Theme = typeof LIGHT;

interface ThemeCtx {
  t: Theme;
  dark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx>({ t: LIGHT, dark: false, toggle: () => {} });
const useTheme = () => useContext(ThemeContext);

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = "home" | "agendamentos" | "tipos" | "config";
interface DashboardProps { onLogout: () => void; }

// ─── Responsive hook ──────────────────────────────────────────────────────────

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconHome({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" /><path d="M9 21V12h6v9" /></svg>;
}
function IconCalendar({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
}
function IconStethoscope({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 2.5v7a4.5 4.5 0 009 0v-1a4 4 0 014 4v1a3 3 0 106 0v-4" /><circle cx="19.5" cy="13.5" r="1.5" /><path d="M4.5 2.5h3" /></svg>;
}
function IconSettings({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>;
}
function IconLogout({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></svg>;
}
function IconBell({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>;
}
function IconChevronDown({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>;
}
function IconChevronRight({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>;
}
function IconChevronLeft({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>;
}
function IconUsers({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>;
}
function IconClock({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
}
function IconCalendarCheck({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" /></svg>;
}
function IconPlus({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>;
}
function IconX({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>;
}
function IconArrowRight({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}
function IconEdit({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
}

function IconMenu({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>;
}
function IconMoon({ size = 17 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>;
}
function IconSun({ size = 17 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>;
}

// ─── Logo Mark ────────────────────────────────────────────────────────────────

function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <img
      src={logoImage}
      alt="Focus Clínica"
      style={{
        width: size * 1.8,
        height: size * 1.8,
        objectFit: "cover",
        display: "block",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    />
  );
}

// ─── Specialty Icons ──────────────────────────────────────────────────────────

function SpecialtyIcon({ type, size = 28 }: { type: string; size?: number }) {
  const icons: Record<string, ReactNode> = {
    pediatria: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4" /><path d="M5.5 20.5c.5-3.5 3.3-6 6.5-6s6 2.5 6.5 6" /><path d="M9 7h6" /></svg>,
    clinica: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2M12 11v4M10 13h4" /></svg>,
    cardiologia: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /><path d="M3 12h4l2-3 2 6 2-3h4" /></svg>,
    dermatologia: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>,
    psicologia: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z" /><path d="M9 21h6M10 17v4M14 17v4" /></svg>,
    nutricao: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19.52L5.71 21l1-1C7.63 19.43 9 19 10 19c2 0 2 2 4 2s2-2 4-2c1 0 1.5.5 2.5 1.5l1.71-1.5C20 16 18 13 17 8z" /><path d="M17 8l-1.68-1.68A2 2 0 0014 5.77V2" /></svg>,
  };
  return <>{icons[type] || icons.clinica}</>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const APPOINTMENTS = [
  { time: "09:30", patient: "Maria Silva", doctor: "Dra. Ana Souza", type: "Pediatria", status: "Confirmado" },
  { time: "11:00", patient: "João Pereira", doctor: "Dra. Ana Souza", type: "Pediatria", status: "Pendente" },
  { time: "13:30", patient: "Lucas Almeida", doctor: "Dra. Ana Souza", type: "Pediatria", status: "Confirmado" },
  { time: "16:00", patient: "Fernanda Lima", doctor: "Dra. Beatriz Alves", type: "Dermatologia", status: "Cancelado" },
];

const COMPLETED = [
  { time: "08:00", patient: "Carlos Mendes", doctor: "Dr. Rafael Lima", type: "Clínica Geral", status: "Finalizado" },
  { time: "10:30", patient: "Juliana Costa", doctor: "Dra. Beatriz Alves", type: "Psicologia", status: "Finalizado" },
  { time: "14:00", patient: "Pedro Santos", doctor: "Dr. Carlos Mendes", type: "Pediatria", status: "Finalizado" },
];

// Cor institucional única para todas as especialidades
const BRAND = { color: "#0d9488", lightBg: "#f0fdf9", darkBg: "#0d2e2a" };

const SPECIALTIES = [
  { key: "pediatria", name: "Pediatria", desc: "Acompanha o crescimento e desenvolvimento de crianças e adolescentes.", doctor: "Dra. Ana Souza", role: "Pediatra", longDesc: "A pediatria é a especialidade médica dedicada à saúde integral de crianças e adolescentes, do nascimento até os 18 anos. Inclui acompanhamento do crescimento, vacinação, desenvolvimento neuropsicomotor e tratamento de doenças infantis.", ...BRAND },
  { key: "clinica", name: "Clínica Geral", desc: "Atendimento para adultos, com foco na prevenção, diagnóstico e tratamento.", doctor: "Dr. Carlos Mendes", role: "Clínico Geral", longDesc: "A clínica geral oferece atendimento abrangente para adultos, abordando desde doenças comuns até condições crônicas. O clínico geral coordena o cuidado do paciente e realiza encaminhamentos especializados quando necessário.", ...BRAND },
  { key: "cardiologia", name: "Cardiologia", desc: "Cuida da saúde do coração e do sistema circulatório.", doctor: "Dr. Rafael Lima", role: "Cardiologista", longDesc: "A cardiologia é dedicada ao diagnóstico e tratamento de doenças do coração e dos vasos sanguíneos. Inclui eletrocardiograma, ecocardiograma e acompanhamento de hipertensão, arritmias e insuficiência cardíaca.", ...BRAND },
  { key: "dermatologia", name: "Dermatologia", desc: "Trata doenças da pele, cabelos, unhas e mucosas.", doctor: "Dra. Beatriz Alves", role: "Dermatologista", longDesc: "A dermatologia trata condições como acne, dermatite, psoríase e alergias cutâneas. Realiza rastreamento de lesões suspeitas de câncer de pele, além de procedimentos estéticos e cuidados preventivos.", ...BRAND },
  { key: "psicologia", name: "Psicologia", desc: "Apoio emocional e comportamental para todas as idades.", doctor: "Dra. Juliana Costa", role: "Psicóloga", longDesc: "A psicologia clínica oferece suporte para questões emocionais, ansiedade, depressão, relacionamentos e saúde mental em geral. O acompanhamento psicológico promove qualidade de vida e equilíbrio emocional.", ...BRAND },
  { key: "nutricao", name: "Nutrição", desc: "Orientação alimentar personalizada para mais saúde e qualidade de vida.", doctor: "Dra. Camila Rocha", role: "Nutricionista", longDesc: "A nutrição clínica avalia o estado nutricional e elabora planos alimentares individualizados. Auxilia no controle de peso, no manejo de doenças crônicas como diabetes e hipertensão, e na promoção de hábitos saudáveis.", ...BRAND },
];

const NOTIFICATIONS_DATA = [
  { title: "Nova consulta agendada", desc: "Maria Silva · 10/09 · Clínica Geral", time: "12 min", color: "#0d9488" },
  { title: "Consulta confirmada", desc: "João Pereira · 10/09 · Pediatria", time: "25 min", color: "#3b82f6" },
  { title: "Lembrete de amanhã", desc: "Ana Costa · 09:30 · Dermatologia", time: "1 h", color: "#f59e0b" },
  { title: "Novo paciente cadastrado", desc: "Fernanda Lima registrada no sistema", time: "1 h", color: "#8b5cf6" },
];

const CAL_EVENTS: Record<number, string> = { 9: "#0d9488", 10: "#0d9488", 11: "#f59e0b", 15: "#3b82f6", 22: "#0d9488" };

function buildCalendar(): (number | null)[] {
  const cells: (number | null)[] = Array(2).fill(null);
  for (let d = 1; d <= 30; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ─── Shared Components ────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; darkBg: string; color: string; dot: string }> = {
    Confirmado: { bg: "#dcfce7", darkBg: "#14532d30", color: "#22c55e", dot: "#22c55e" },
    Pendente: { bg: "#fef9c3", darkBg: "#78350f30", color: "#eab308", dot: "#eab308" },
    Cancelado: { bg: "#fee2e2", darkBg: "#7f1d1d30", color: "#ef4444", dot: "#ef4444" },
    Finalizado: { bg: "#e0f2fe", darkBg: "#0c4a6e30", color: "#38bdf8", dot: "#38bdf8" },
  };
  const { dark } = useTheme();
  const s = map[status] ?? { bg: "#f1f5f9", darkBg: "#1e293b", color: "#94a3b8", dot: "#94a3b8" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: dark ? s.darkBg : s.bg, color: s.color, border: `1px solid ${s.color}30` }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

function Avatar({ name, sizePx = 32, color }: { name: string; sizePx?: number; color?: string }) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
      style={{
        width: sizePx, height: sizePx,
        background: color || "linear-gradient(135deg, #0d9488, #059669)",
        fontSize: sizePx < 34 ? "0.65rem" : sizePx < 44 ? "0.8rem" : "1rem",
      }}
    >
      {initials}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button" role="switch" aria-checked={value}
      onClick={() => onChange(!value)}
      className="relative rounded-full cursor-pointer flex-shrink-0"
      style={{ width: 46, height: 26, background: value ? "#0d9488" : "#6b7a76", transition: "background 220ms ease" }}
    >
      <span
        className="absolute rounded-full bg-white"
        style={{
          width: 20,
          height: 20,
          top: 3,
          left: 0,
          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          transform: value ? "translateX(23px)" : "translateX(3px)",
          transition: "transform 220ms ease",
        }}
      />
    </button>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  page, setPage, onLogout, open, onClose,
}: {
  page: Page; setPage: (p: Page) => void; onLogout: () => void; open: boolean; onClose: () => void;
}) {
  const { t } = useTheme();
  const isMobile = useIsMobile();

  const nav: { key: Page; label: string; icon: ReactNode }[] = [
    { key: "home", label: "Home", icon: <IconHome /> },
    { key: "agendamentos", label: "Agendamentos", icon: <IconCalendar /> },
    { key: "tipos", label: "Tipos de consulta", icon: <IconStethoscope /> },
    { key: "config", label: "Configurações", icon: <IconSettings /> },
  ];

  const handleNav = (key: Page) => {
    setPage(key);
    if (isMobile) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside
        className={isMobile ? "sidebar-drawer" + (open ? " open" : "") : ""}
        style={{
          width: 248,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          background: t.sidebarBg,
          borderRight: `1px solid ${t.sidebarBorder}`,
          position: isMobile ? "fixed" : "relative",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex-shrink-0 flex items-center">
            <LogoMark size={30} />
          </div>
          <div>
            <span className="font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", letterSpacing: "-0.01em" }}>Focus Clínica</span>
            <p className="text-xs" style={{ color: t.sidebarLabel, marginTop: 1 }}>Sistema clínico</p>
          </div>
          {isMobile && (
            <button onClick={onClose} className="ml-auto cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }}>
              <IconX size={18} />
            </button>
          )}
        </div>

        <div style={{ height: 1, background: t.sidebarBorder, margin: "0 20px" }} />

        <p className="px-5 pt-5 pb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: t.sidebarLabel, fontSize: "0.6rem" }}>Menu</p>

        <nav className="flex-1 px-3 flex flex-col gap-0.5">
          {nav.map(({ key, label, icon }) => {
            const active = page === key;
            return (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm cursor-pointer"
                style={
                  active
                    ? { background: t.sidebarActiveBg, color: t.sidebarActiveText, fontWeight: 600, boxShadow: "inset 0 0 0 1px rgba(20,184,166,0.2)" }
                    : { color: t.sidebarText, fontWeight: 400, background: "transparent" }
                }
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{ opacity: active ? 1 : 0.7 }}>{icon}</span>
                {label}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#14b8a6" }} />}
              </button>
            );
          })}
        </nav>

        <div className="m-3 p-4 rounded-2xl" style={{ background: t.sidebarUserCard, border: `1px solid ${t.sidebarUserBorder}` }}>
          <div className="flex items-center gap-3 mb-3">
            <Avatar name="Focus Tech" sizePx={36} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">Focus Tech</p>
              <p className="text-xs" style={{ color: t.sidebarLabel }}>Usuário</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-xs cursor-pointer w-full px-2 py-2 rounded-lg"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#f87171"; (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <IconLogout />
            Sair da conta
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { t, dark, toggle } = useTheme();

  return (
    <header
      className="flex items-center justify-between px-4 md:px-6 flex-shrink-0"
      style={{ height: 64, background: t.headerBg, borderBottom: `1px solid ${t.headerBorder}` }}
    >
      <div className="flex items-center gap-3">
        {/* Hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer"
          style={{ background: t.headerBtnBg, color: t.headerMuted }}
          onClick={onMenuClick}
        >
          <IconMenu />
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Date badge */}
        <span
          className="hidden md:block text-xs font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(20,184,166,0.2)", color: "#5eead4", border: "1px solid rgba(20,184,166,0.25)" }}
        >
          Qui, 10 set. 2026
        </span>

        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer"
          title={dark ? "Modo claro" : "Modo escuro"}
          style={{ background: t.headerBtnBg, border: `1px solid ${t.headerBtnBorder}`, color: t.headerMuted }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.15)"; (e.currentTarget as HTMLElement).style.color = "#5eead4"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = t.headerBtnBg; (e.currentTarget as HTMLElement).style.color = t.headerMuted; }}
        >
          {dark ? <IconSun /> : <IconMoon />}
        </button>

        {/* Bell */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer"
          style={{ background: t.headerBtnBg, border: `1px solid ${t.headerBtnBorder}`, color: t.headerMuted }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(20,184,166,0.15)"; (e.currentTarget as HTMLElement).style.color = "#5eead4"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = t.headerBtnBg; (e.currentTarget as HTMLElement).style.color = t.headerMuted; }}
        >
          <IconBell />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center font-bold" style={{ background: "#ef4444", fontSize: "9px" }}>2</span>
        </button>

        {/* User */}
        <div
          className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-xl cursor-pointer"
          style={{ border: `1px solid ${t.headerBtnBorder}` }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          <Avatar name="Focus Tech" sizePx={30} />
          <div className="hidden md:block">
            <p className="text-xs font-semibold leading-tight" style={{ color: t.headerText }}>Focus Tech</p>
            <p style={{ fontSize: "10px", color: t.headerMuted }}>Usuário</p>
          </div>
          <span style={{ color: t.headerMuted }} className="hidden md:block"><IconChevronDown /></span>
        </div>
      </div>
    </header>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sublabel, icon, accentColor, trend }: {
  label: string; value: string; sublabel: string; icon: ReactNode; accentColor: string; trend?: string;
}) {
  const { t } = useTheme();
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden h-full"
      style={{ background: t.kpiBg, boxShadow: t.shadow, border: `1px solid ${t.border}` }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accentColor }} />
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: accentColor + "18", color: accentColor }}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(13,148,136,0.12)", color: "#0d9488" }}>{trend}</span>
        )}
      </div>
      <div>
        <p className="text-xs font-medium mb-1" style={{ color: t.textFaint }}>{label}</p>
        <p className="text-3xl font-bold leading-none mb-1.5" style={{ color: t.textPrimary, fontFamily: "'Outfit', sans-serif" }}>{value}</p>
        <p className="text-xs" style={{ color: t.textFaint }}>{sublabel}</p>
      </div>
    </div>
  );
}

// ─── Calendar ────────────────────────────────────────────────────────────────

function CalendarWidget() {
  const { t } = useTheme();
  const cells = buildCalendar();
  const today = 10;
  const dayLabels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="rounded-2xl flex flex-col" style={{ background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <div>
          <h3 className="font-semibold text-sm" style={{ color: t.textPrimary }}>Calendário</h3>
          <p className="text-xs mt-0.5" style={{ color: t.textFaint }}>Setembro 2026</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer" style={{ color: t.textFaint }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = t.mutedBg; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}><IconChevronLeft /></button>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer" style={{ color: t.textFaint }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = t.mutedBg; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}><IconChevronRight /></button>
          <button className="px-3 py-1 text-xs font-semibold rounded-lg cursor-pointer ml-1 hover:opacity-80" style={{ background: "#0d9488", color: "white" }}>Hoje</button>
        </div>
      </div>

      <div style={{ height: 1, background: t.border, margin: "0 24px" }} />

      <div className="px-4 pt-3 pb-5">
        <div className="grid grid-cols-7 mb-2">
          {dayLabels.map((d) => (
            <div key={d} className="text-center py-1 font-semibold" style={{ color: t.textFaintest, fontSize: "0.62rem" }}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, i) => {
            const isToday = day === today;
            const dot = day !== null ? CAL_EVENTS[day] : null;
            return (
              <div key={i} className="flex flex-col items-center gap-0.5 py-0.5">
                {day !== null ? (
                  <>
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer transition-transform hover:scale-105"
                      style={isToday ? { background: "#0d9488", color: "white", fontWeight: 700, boxShadow: "0 2px 8px rgba(13,148,136,0.4)" } : { color: t.calDayColor }}
                    >
                      {day}
                    </div>
                    {dot ? <div className="w-1 h-1 rounded-full" style={{ background: dot }} /> : <div className="w-1 h-1" />}
                  </>
                ) : <div className="w-8 h-8" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Notifications Panel ──────────────────────────────────────────────────────

function NotificationsPanel() {
  const { t } = useTheme();
  return (
    <div className="rounded-2xl flex flex-col" style={{ background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <div>
          <h3 className="font-semibold text-sm" style={{ color: t.textPrimary }}>Notificações</h3>
          <p className="text-xs mt-0.5" style={{ color: t.textFaint }}>4 novas alertas</p>
        </div>
        <button className="text-xs font-semibold cursor-pointer hover:opacity-70" style={{ color: "#0d9488" }}>Ver todas →</button>
      </div>
      <div style={{ height: 1, background: t.border, margin: "0 24px" }} />
      <div className="flex flex-col p-3 gap-1.5 flex-1">
        {NOTIFICATIONS_DATA.map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3.5 rounded-xl cursor-pointer"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = t.notifHover; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: n.color + "20" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: n.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug" style={{ color: t.textPrimary }}>{n.title}</p>
              <p className="text-xs mt-0.5" style={{ color: t.textFaint }}>{n.desc}</p>
            </div>
            <span className="text-xs flex-shrink-0 mt-0.5 font-medium" style={{ color: t.textFaintest }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Appointment Table ────────────────────────────────────────────────────────

function AppointmentTable({ rows, title, count }: { rows: typeof APPOINTMENTS; title: string; count: number }) {
  const { t } = useTheme();
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-2.5">
          <h2 className="font-semibold text-sm" style={{ color: t.textPrimary }}>{title}</h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#f0fdf9", color: "#0d9488" }}>{count}</span>
        </div>
        <button className="text-xs font-semibold cursor-pointer hover:opacity-70" style={{ color: "#0d9488" }}>Ver todas →</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full" style={{ minWidth: 600 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${t.border}` }}>
              {["Horário", "Paciente", "Profissional", "Especialidade", "Status", ""].map((h) => (
                <th key={h} className="px-6 py-3 text-left font-semibold uppercase tracking-wide" style={{ color: t.textFaintest, fontSize: "0.62rem" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((apt, i) => (
              <tr
                key={i}
                className="cursor-pointer"
                style={{ borderBottom: i < rows.length - 1 ? `1px solid ${t.border}` : "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = t.tableRowHover; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <td className="px-6 py-4">
                  <span className="text-xs font-bold px-2.5 py-1.5 rounded-lg" style={{ background: "#f0fdf9", color: "#0d9488", fontFamily: "monospace" }}>{apt.time}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={apt.patient} sizePx={30} />
                    <span className="text-sm font-medium" style={{ color: t.textPrimary }}>{apt.patient}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: t.textMuted }}>{apt.doctor}</td>
                <td className="px-6 py-4 text-sm" style={{ color: t.textMuted }}>{apt.type}</td>
                <td className="px-6 py-4"><StatusBadge status={apt.status} /></td>
                <td className="px-6 py-4">
                  <button
                    className="w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer"
                    style={{ color: t.textFaintest }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#0d9488"; (e.currentTarget as HTMLElement).style.background = "#f0fdf9"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = t.textFaintest; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <IconChevronRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function HomePage() {
  const { t } = useTheme();
  return (
    <div className="flex flex-col gap-6 md:gap-7">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: t.textPrimary, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.01em" }}>
            Bem vindo, Focus!
          </h1>
          <p className="text-sm mt-1" style={{ color: t.textFaint }}>Segunda-feira, 15 de setembro de 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium" style={{ color: t.textFaint }}>Sistema operacional</span>
        </div>
      </div>

      {/* KPI row — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Próxima Consulta" value="09:30" sublabel="Maria Silva · Clínica Geral" icon={<IconCalendarCheck />} accentColor="#0d9488" />
        <KpiCard label="Consultas este mês" value="3" sublabel="2 realizadas • 1 próxima" icon={<IconCalendar />} accentColor="#0d9488" />
        <KpiCard label="Histórico de Consultas" value="5" sublabel="Consultas realizadas" icon={<IconCalendarCheck />} accentColor="#0d9488" />
        <KpiCard label="Agendar próxima consulta" value="NOVO" sublabel="Marcar consulta com especialista" icon={<IconClock />} accentColor="#0d9488" />
      </div>

      {/* Calendar + Notifications — stack on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ minHeight: 0 }}>
        <CalendarWidget />
        <NotificationsPanel />
      </div>
    </div>
  );
}

function AgendamentosPage({ onNovoAtendimento, onConsultarAgenda }: { onNovoAtendimento: () => void; onConsultarAgenda: () => void }) {
  const { t } = useTheme();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold" style={{ color: t.textPrimary, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.01em" }}>Agendamentos</h1>
          <p className="text-sm mt-1" style={{ color: t.textFaint }}>Visualize e organize as consultas da clínica.</p>
        </div>
        <button
          onClick={onNovoAtendimento}
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #0d9488, #059669)", boxShadow: "0 4px 12px rgba(13,148,136,0.3)" }}
        >
          <IconPlus />
          <span className="hidden sm:inline">Novo atendimento</span>
          <span className="sm:hidden">Novo</span>
        </button>
      </div>

      {/* Consultar agenda card */}
      <div
        className="rounded-2xl p-4 md:p-5 flex items-center justify-between cursor-pointer group"
        style={{ background: "linear-gradient(135deg, #0a1f1c, #0d3d35)", boxShadow: "0 4px 20px rgba(13,148,136,0.15)" }}
        onClick={onConsultarAgenda}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(13,148,136,0.25)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(13,148,136,0.15)"; }}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(20,184,166,0.2)" }}>
            <span style={{ color: "#5eead4" }}><IconCalendar size={20} /></span>
          </div>
          <div>
            <p className="font-bold text-white text-sm">Consultar agenda completa</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Veja a agenda dos profissionais, filtre por data e horário</p>
          </div>
        </div>
        <span style={{ color: "rgba(255,255,255,0.3)" }}><IconChevronRight size={20} /></span>
      </div>

      <AppointmentTable rows={APPOINTMENTS} title="Consultas de hoje" count={APPOINTMENTS.length} />
      <AppointmentTable rows={COMPLETED} title="Consultas realizadas" count={12} />
    </div>
  );
}

function TiposPage({ onConhecerMais }: { onConhecerMais: (key: string) => void }) {
  const { t, dark } = useTheme();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold" style={{ color: t.textPrimary, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.01em" }}>Tipos de consulta</h1>
        <p className="text-sm mt-1" style={{ color: t.textFaint }}>Especialidades disponíveis na clínica.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {SPECIALTIES.map((s) => {
          const bg = dark ? s.darkBg : s.lightBg;
          return (
            <div
              key={s.key}
              className="rounded-2xl p-5 md:p-6 flex flex-col gap-4 md:gap-5"
              style={{ background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow, transition: "all 200ms" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${s.color}22`; (e.currentTarget as HTMLElement).style.borderColor = s.color + "35"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = t.shadow; (e.currentTarget as HTMLElement).style.borderColor = t.border; (e.currentTarget as HTMLElement).style.transform = ""; }}
            >
              <div className="flex items-start justify-between">
                <div className="w-13 h-13 rounded-2xl flex items-center justify-center" style={{ width: 52, height: 52, background: bg, color: s.color }}>
                  <SpecialtyIcon type={s.key} size={26} />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: bg, color: s.color }}>Disponível</span>
              </div>
              <div>
                <h3 className="font-bold text-base mb-1.5" style={{ color: t.textPrimary, fontFamily: "'Outfit', sans-serif" }}>{s.name}</h3>
                <p className="text-sm leading-relaxed" style={{ color: t.textMuted }}>{s.desc}</p>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl" style={{ background: t.mutedBg }}>
                <Avatar name={s.doctor} sizePx={32} color={`linear-gradient(135deg, ${s.color}, ${s.color}99)`} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: t.textPrimary }}>{s.doctor}</p>
                  <p className="text-xs" style={{ color: t.textFaint }}>{s.role}</p>
                </div>
              </div>
              <button
                onClick={() => onConhecerMais(s.key)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer hover:opacity-90"
                style={{ background: s.color, color: "white", boxShadow: `0 4px 12px ${s.color}30` }}
              >
                Conhecer mais <IconArrowRight />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConfigPage() {
  const { t, dark, toggle } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl md:text-2xl font-bold" style={{ color: t.textPrimary, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.01em" }}>Configurações</h1>
        <p className="text-sm mt-1" style={{ color: t.textFaint }}>Personalize o sistema da sua clínica.</p>
      </div>

      {/* Perfil */}
      <div className="rounded-2xl p-5 md:p-6" style={{ background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf9", color: "#0d9488" }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-sm" style={{ color: t.textPrimary }}>Perfil</h2>
              <p className="text-xs" style={{ color: t.textFaint }}>Informações pessoais</p>
            </div>
          </div>
          <button className="text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer" style={{ color: "#0d9488", background: "#f0fdf9" }}>Editar</button>
        </div>

        <div className="flex items-start md:items-center gap-4 md:gap-6 flex-wrap md:flex-nowrap">
          <div className="relative flex-shrink-0">
            <Avatar name="Focus Tech" sizePx={64} />
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)", border: "1.5px solid #e2e8f0", color: "#0d9488" }}>
              <IconEdit size={11} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 w-full">
            {[
              { label: "Nome", value: "Focus Tech", extra: <span className="text-xs px-2 py-0.5 rounded-full mt-1.5 inline-block" style={{ background: "#f0fdf9", color: "#0d9488", fontWeight: 600 }}>Usuário</span> },
              { label: "E-mail", value: "seuemail@gmail.com" },
              { label: "Telefone", value: "(85) 98068-7777" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: t.textFaint, fontSize: "0.6rem" }}>{item.label}</p>
                <p className="text-sm font-semibold" style={{ color: t.textPrimary }}>{item.value}</p>
                {item.extra}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clínica */}
      <div className="rounded-2xl p-5 md:p-6" style={{ background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf9", color: "#0d9488" }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" /><path d="M9 21V12h6v9" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-sm" style={{ color: t.textPrimary }}>Clínica</h2>
              <p className="text-xs" style={{ color: t.textFaint }}>Dados do estabelecimento</p>
            </div>
          </div>
          <button className="text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer" style={{ color: "#0d9488", background: "#f0fdf9" }}>Editar</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Nome da clínica", value: "Focus Clínica" },
            { label: "Endereço", value: "Av. Beira Mar, 123 – Fortaleza, CE" },
            { label: "Telefone", value: "(85) 4002-9922" },
            { label: "Horário", value: "Seg–Sex 07h–19h · Sáb 07h–13h" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: t.textFaint, fontSize: "0.6rem" }}>{item.label}</p>
              <p className="text-sm" style={{ color: t.textSecondary }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Preferências */}
      <div className="rounded-2xl p-5 md:p-6" style={{ background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf9", color: "#0d9488" }}>
            <IconSettings size={18} />
          </div>
          <div>
            <h2 className="font-bold text-sm" style={{ color: t.textPrimary }}>Preferências</h2>
            <p className="text-xs" style={{ color: t.textFaint }}>Personalize sua experiência</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Notificações por e-mail", sub: "Receba alertas de novos agendamentos", control: <Toggle value={notifications} onChange={setNotifications} /> },
            { label: "Lembretes de consulta", sub: "Notifique pacientes antes da consulta", control: <Toggle value={reminders} onChange={setReminders} /> },
            { label: "Modo escuro", sub: "Tema escuro para o sistema", control: <Toggle value={dark} onChange={() => toggle()} /> },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 rounded-xl" style={{ background: t.mutedBg, border: `1px solid ${t.border}` }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: t.textPrimary }}>{item.label}</p>
                <p className="text-xs mt-0.5" style={{ color: t.textFaint }}>{item.sub}</p>
              </div>
              {item.control}
            </div>
          ))}
          <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: t.mutedBg, border: `1px solid ${t.border}` }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: t.textPrimary }}>Idioma</p>
              <p className="text-xs mt-0.5" style={{ color: t.textFaint }}>Idioma da plataforma</p>
            </div>
            <select className="text-sm border rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer" style={{ borderColor: t.borderStrong, color: t.textSecondary, fontFamily: "inherit", background: t.cardBg, minWidth: 140 }}>
              <option>Português (BR)</option>
              <option>English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Segurança */}
      <div className="rounded-2xl overflow-hidden" style={{ background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow }}>
        <div className="flex items-center gap-3 px-5 md:px-6 py-5" style={{ borderBottom: `1px solid ${t.border}` }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#fef2f2", color: "#ef4444" }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </div>
          <div>
            <h2 className="font-bold text-sm" style={{ color: t.textPrimary }}>Segurança</h2>
            <p className="text-xs" style={{ color: t.textFaint }}>Senha e acesso</p>
          </div>
        </div>
        {[
          { label: "Alterar senha", sub: "Última alteração há 30 dias" },
          { label: "Sessões ativas", sub: "2 dispositivos conectados" },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-5 md:px-6 py-4 cursor-pointer"
            style={{ borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = t.tableRowHover; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <div>
              <p className="text-sm font-medium" style={{ color: t.textPrimary }}>{item.label}</p>
              <p className="text-xs mt-0.5" style={{ color: t.textFaint }}>{item.sub}</p>
            </div>
            <span style={{ color: t.textFaintest }}><IconChevronRight /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Modals ───────────────────────────────────────────────────────────────────

function ModalOverlay({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const { dark } = useTheme();
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: dark ? "rgba(0,0,0,0.6)" : "rgba(10,20,18,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {children}
    </div>
  );
}

function NovoAtendimentoModal({ onClose }: { onClose: () => void }) {
  const { t } = useTheme();
  const inputStyle = { borderColor: t.borderStrong, color: t.textSecondary, fontFamily: "inherit", background: t.inputBg };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(13,148,136,0.15)";
    (e.currentTarget as HTMLElement).style.borderColor = "#0d9488";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    (e.currentTarget as HTMLElement).style.boxShadow = "none";
    (e.currentTarget as HTMLElement).style.borderColor = t.borderStrong;
  };
  const cls = "w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none";

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl"
        style={{ background: t.cardBg, boxShadow: t.shadowModal, maxHeight: "92vh", overflowY: "auto" }}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-5" style={{ borderBottom: `1px solid ${t.border}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf9", color: "#0d9488" }}>
              <IconCalendar size={18} />
            </div>
            <div>
              <h2 className="font-bold" style={{ color: t.textPrimary }}>Novo atendimento</h2>
              <p className="text-xs mt-0.5" style={{ color: t.textFaint }}>Preencha os dados da consulta</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer" style={{ color: t.textMuted }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = t.mutedBg; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <IconX />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: t.textFaint, fontSize: "0.62rem" }}>Paciente</label>
            <input type="text" placeholder="Nome do paciente" className={cls} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: t.textFaint, fontSize: "0.62rem" }}>Data</label>
              <input type="date" defaultValue="2026-09-10" className={cls} style={{ ...inputStyle, cursor: "pointer" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: t.textFaint, fontSize: "0.62rem" }}>Horário</label>
              <input type="time" className={cls} style={{ ...inputStyle, cursor: "pointer" }} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: t.textFaint, fontSize: "0.62rem" }}>Profissional</label>
            <select className={cls} style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
              <option>Dra. Ana Souza</option><option>Dr. Carlos Mendes</option><option>Dr. Rafael Lima</option>
              <option>Dra. Beatriz Alves</option><option>Dra. Juliana Costa</option><option>Dra. Camila Rocha</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: t.textFaint, fontSize: "0.62rem" }}>Especialidade</label>
            <select className={cls} style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
              <option>Pediatria</option><option>Clínica Geral</option><option>Cardiologia</option>
              <option>Dermatologia</option><option>Psicologia</option><option>Nutrição</option>
            </select>
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-semibold cursor-pointer" style={{ color: t.textMuted, border: `1px solid ${t.borderStrong}` }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = t.mutedBg; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>Cancelar</button>
            <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white cursor-pointer hover:opacity-90" style={{ background: "linear-gradient(135deg, #0d9488, #059669)", boxShadow: "0 4px 12px rgba(13,148,136,0.3)" }}>Salvar consulta</button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}

const AGENDA_BY_DAY: Record<string, { time: string; patient: string; type: string }[]> = {
  "Seg 07/09": [],
  "Ter 08/09": [],
  "Qua 09/09": [{ time: "09:30", patient: "Maria Silva", type: "Clínica Geral" }],
  "Qui 10/09": [{ time: "09:30", patient: "João Pereira", type: "Pediatria" }, { time: "11:00", patient: "Lucas Almeida", type: "Pediatria" }],
  "Sex 11/09": [{ time: "09:30", patient: "Ana Costa", type: "Dermatologia" }, { time: "13:30", patient: "Fernanda Lima", type: "Dermatologia" }, { time: "16:00", patient: "Carlos Mendes", type: "Clínica Geral" }],
};

function ConsultarAgendaModal({ onClose }: { onClose: () => void }) {
  const { t } = useTheme();
  const days = Object.keys(AGENDA_BY_DAY);
  return (
    <ModalOverlay onClose={onClose}>
      <div className="w-full sm:max-w-3xl rounded-t-2xl sm:rounded-2xl" style={{ background: t.cardBg, boxShadow: t.shadowModal, maxHeight: "90vh", overflowY: "auto" }}>
        <div className="flex items-center justify-between px-6 pt-6 pb-5 sticky top-0" style={{ background: t.cardBg, borderBottom: `1px solid ${t.border}`, zIndex: 1 }}>
          <div>
            <h2 className="font-bold" style={{ color: t.textPrimary }}>Agenda completa</h2>
            <p className="text-xs mt-0.5" style={{ color: t.textFaint }}>Semana de 07 a 11 de setembro de 2026</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer" style={{ color: t.textMuted }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = t.mutedBg; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <IconX />
          </button>
        </div>
        <div className="p-4 md:p-6 overflow-x-auto">
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(130px, 1fr))` }}>
            {days.map((day) => {
              const events = AGENDA_BY_DAY[day];
              const isToday = day === "Qui 10/09";
              return (
                <div key={day}>
                  <div className="text-center text-xs font-bold py-2 mb-2.5 rounded-lg" style={isToday ? { background: "#0d9488", color: "white", fontSize: "0.7rem" } : { background: t.mutedBg, color: t.textFaint, fontSize: "0.7rem" }}>
                    {day}
                  </div>
                  <div className="flex flex-col gap-2">
                    {events.length === 0
                      ? <div className="py-8 text-center text-xs" style={{ color: t.textFaintest }}>Livre</div>
                      : events.map((ev, i) => (
                        <div key={i} className="p-2.5 rounded-xl text-xs" style={{ background: t.mutedBg, borderLeft: "3px solid #0d9488" }}>
                          <p className="font-bold" style={{ color: "#0d9488", fontFamily: "monospace" }}>{ev.time}</p>
                          <p className="font-semibold mt-0.5" style={{ color: t.textPrimary }}>{ev.patient}</p>
                          <p className="mt-0.5" style={{ color: t.textFaint }}>{ev.type}</p>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}

function ConhecerMaisModal({ specialtyKey, onClose }: { specialtyKey: string; onClose: () => void }) {
  const { t, dark } = useTheme();
  const s = SPECIALTIES.find((x) => x.key === specialtyKey);
  if (!s) return null;
  const bg = dark ? s.darkBg : s.lightBg;
  return (
    <ModalOverlay onClose={onClose}>
      <div className="w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl" style={{ background: t.cardBg, boxShadow: t.shadowModal }}>
        <div className="px-6 pt-6 pb-5 rounded-t-2xl" style={{ background: bg, borderBottom: `1px solid ${s.color}25` }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: t.cardBg, color: s.color, boxShadow: `0 4px 12px ${s.color}25` }}>
                <SpecialtyIcon type={s.key} size={26} />
              </div>
              <div>
                <h2 className="font-bold" style={{ color: t.textPrimary }}>{s.name}</h2>
                <span className="text-xs font-semibold" style={{ color: s.color }}>{s.role}</span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer" style={{ color: t.textMuted }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.08)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              <IconX />
            </button>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{s.longDesc}</p>
          <div className="p-4 rounded-2xl flex items-center gap-3" style={{ background: t.mutedBg, border: `1px solid ${t.border}` }}>
            <Avatar name={s.doctor} sizePx={44} color={`linear-gradient(135deg, ${s.color}, ${s.color}bb)`} />
            <div>
              <p className="font-bold" style={{ color: t.textPrimary }}>{s.doctor}</p>
              <p className="text-sm" style={{ color: t.textFaint }}>{s.role}</p>
              <div className="flex items-center gap-1 mt-1">
                {"★★★★★".split("").map((star, i) => <span key={i} style={{ color: "#f59e0b", fontSize: "0.7rem" }}>{star}</span>)}
                <span className="text-xs ml-1" style={{ color: t.textFaint }}>5.0</span>
              </div>
            </div>
          </div>
          <button
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white cursor-pointer hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: s.color, boxShadow: `0 4px 16px ${s.color}30` }}
            onClick={onClose}
          >
            Agendar consulta <IconArrowRight />
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

// ─── Dashboard Root ────────────────────────────────────────────────────────────

type ModalState = null | "novo-atendimento" | "consultar-agenda" | { type: "conhecer-mais"; key: string };

export default function Dashboard({ onLogout }: DashboardProps) {
  const [page, setPage] = useState<Page>("home");
  const [modal, setModal] = useState<ModalState>(null);
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const themeCtx: ThemeCtx = { t: dark ? DARK : LIGHT, dark, toggle: () => setDark((d) => !d) };

  return (
    <ThemeContext.Provider value={themeCtx}>
      <div
        className="dashboard-shell flex h-full w-full"
        style={{ fontFamily: "'Inter', sans-serif", background: themeCtx.t.pageBg }}
      >
        <Sidebar
          page={page}
          setPage={setPage}
          onLogout={onLogout}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuClick={() => setSidebarOpen((o) => !o)} />
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-7">
            {page === "home" && <HomePage />}
            {page === "agendamentos" && (
              <AgendamentosPage
                onNovoAtendimento={() => setModal("novo-atendimento")}
                onConsultarAgenda={() => setModal("consultar-agenda")}
              />
            )}
            {page === "tipos" && <TiposPage onConhecerMais={(key) => setModal({ type: "conhecer-mais", key })} />}
            {page === "config" && <ConfigPage />}
          </main>
        </div>

        {modal === "novo-atendimento" && <NovoAtendimentoModal onClose={() => setModal(null)} />}
        {modal === "consultar-agenda" && <ConsultarAgendaModal onClose={() => setModal(null)} />}
        {modal !== null && typeof modal === "object" && modal.type === "conhecer-mais" && (
          <ConhecerMaisModal specialtyKey={modal.key} onClose={() => setModal(null)} />
        )}
      </div>
    </ThemeContext.Provider>
  );
}
