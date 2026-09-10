import { useState } from "react";
import bgImage from "@/imports/image-3.png";
import Dashboard from "@/Dashboard";

const floatingIcons = [
  {
    pos: "top-[18%] left-[8%]",
    delay: "0s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    pos: "top-[38%] left-[5%]",
    delay: "0.4s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" strokeLinecap="round" />
        <path d="M12 11v4M10 13h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    pos: "top-[15%] right-[10%]",
    delay: "0.2s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    pos: "top-[42%] right-[7%]",
    delay: "0.6s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    pos: "bottom-[22%] left-[9%]",
    delay: "0.8s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    pos: "bottom-[20%] right-[9%]",
    delay: "1s",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function App() {
  const [view, setView] = useState<"hero" | "login" | "register" | "dashboard">("hero");

  if (view === "dashboard") {
    return <Dashboard onLogout={() => setView("login")} />;
  }

  return (
    <div
      className="relative min-h-full w-full overflow-hidden flex flex-col"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: "blur(8px) brightness(0.72)",
          transform: "scale(1.08)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,31,28,0.74) 0%, rgba(10,31,28,0.56) 50%, rgba(10,31,28,0.40) 100%)",
        }}
      />

      {/* Decorative shapes */}
      <div
        className="absolute bottom-16 left-8 w-28 h-28 rounded-full opacity-25"
        style={{ background: "rgba(6,78,59,0.7)" }}
      />
      <div
        className="absolute bottom-10 right-14 opacity-20"
        style={{ color: "white", fontSize: "1.2rem", letterSpacing: "6px", lineHeight: "1.6" }}
      >
        {"• • •\n• • •\n• • •"}
      </div>
      <div
        className="absolute bottom-8 right-52 opacity-30"
        style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.4rem" }}
      >
        ✕
      </div>

      {/* Floating icon bubbles */}
      {floatingIcons.map((fi, i) => (
        <div
          key={i}
          className={`absolute ${fi.pos} w-14 h-14 rounded-full flex items-center justify-center`}
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.35)",
            color: "white",
            animation: `float 4s ease-in-out infinite`,
            animationDelay: fi.delay,
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          }}
        >
          {fi.icon}
        </div>
      ))}


      {/* Hero / Login / Register Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8 py-16 w-full max-w-7xl mx-auto">
        {view === "hero" && (
          <>
            {/* Eyebrow */}
            <span
              className="text-xs font-600 tracking-widest uppercase px-3 py-1 rounded-full mb-6"
              style={{
                background: "rgba(94,234,212,0.2)",
                color: "#5eead4",
                border: "1px solid rgba(94,234,212,0.35)",
                letterSpacing: "0.15em",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.65rem",
              }}
            >
              Sistema de gestão clínica
            </span>

            {/* Main heading */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-700 text-white leading-tight mb-6"
              style={{
                fontWeight: 700,
                lineHeight: 1.08,
                textShadow: "0 2px 24px rgba(0,0,0,0.22)",
              }}
            >
              Clin Focus
            </h1>

            {/* Subtitle */}
            <p
              className="text-base md:text-lg leading-relaxed mb-10 max-w-md"
              style={{
                color: "rgba(255,255,255,0.72)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
              }}
            >
              Gerencie agendamentos, consultas e informações de saúde com praticidade e segurança.
            </p>

            {/* CTA button */}
            <button
              onClick={() => setView("login")}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-600 transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1.5px solid rgba(255,255,255,0.45)",
                color: "white",
                fontWeight: 600,
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.95rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.28)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                <circle cx="10" cy="7" r="3.5" />
                <path d="M3 18c0-3.5 3.1-6 7-6s7 2.5 7 6" strokeLinecap="round" />
              </svg>
              Acesso do cliente
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
        
        {view === "login" && (
          <div
            className="w-full max-w-md p-8 md:p-10 rounded-3xl flex flex-col text-left transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-700 text-white font-['Outfit']">
                Acesse sua conta
              </h2>
              <button
                onClick={() => setView("hero")}
                className="text-white/60 hover:text-white transition-colors cursor-pointer p-2 -mr-2"
                aria-label="Voltar"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-white/90 text-sm mb-2 font-['Inter'] font-500">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-300/50 transition-all font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm mb-2 font-['Inter'] font-500">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-300/50 transition-all font-['Inter']"
                />
                <div className="flex justify-end mt-2">
                  <a href="#" className="text-teal-200/80 hover:text-teal-200 text-xs font-['Inter'] transition-colors">
                    Esqueceu a senha?
                  </a>
                </div>
              </div>

              <button
                onClick={() => setView("dashboard")}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 mt-2 rounded-xl text-sm font-600 transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "white",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Entrar
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="mt-4 text-center">
                <span className="text-white/70 text-sm font-['Inter']">Não tem uma conta? </span>
                <button
                  onClick={() => setView("register")}
                  className="text-teal-200 font-500 text-sm font-['Inter'] hover:text-white transition-colors cursor-pointer"
                >
                  Faça o seu cadastro
                </button>
              </div>
            </div>
          </div>
        )}

        {view === "register" && (
          <div
            className="w-full max-w-md p-8 md:p-10 rounded-3xl flex flex-col text-left transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-700 text-white font-['Outfit']">
                Crie sua conta
              </h2>
              <button
                onClick={() => setView("hero")}
                className="text-white/60 hover:text-white transition-colors cursor-pointer p-2 -mr-2"
                aria-label="Voltar"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-white/90 text-sm mb-2 font-['Inter'] font-500">
                  Nome completo
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-300/50 transition-all font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm mb-2 font-['Inter'] font-500">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-300/50 transition-all font-['Inter']"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm mb-2 font-['Inter'] font-500">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-300/50 transition-all font-['Inter']"
                />
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 px-8 py-4 mt-2 rounded-xl text-sm font-600 transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "white",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Cadastrar
              </button>

              <div className="mt-4 text-center">
                <span className="text-white/70 text-sm font-['Inter']">Já possui uma conta? </span>
                <button
                  onClick={() => setView("login")}
                  className="text-teal-200 font-500 text-sm font-['Inter'] hover:text-white transition-colors cursor-pointer"
                >
                  Faça login
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tagline — bem abaixo */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            className="text-xs tracking-widest uppercase"
            style={{
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.2em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Mais organização para uma saúde melhor
          </span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
