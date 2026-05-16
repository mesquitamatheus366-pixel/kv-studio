import { useState } from "react";

const SECTIONS = [
  { key: "logo", label: "Logo", emoji: "🅰️", done: true },
  { key: "tipografia", label: "Tipografia", emoji: "🔤", done: true },
  { key: "paleta", label: "Paleta", emoji: "🎨", done: true },
  { key: "docs", label: "Documentos", emoji: "📄", done: false },
  { key: "regras", label: "Regras de uso", emoji: "📐", done: false },
] as const;

const PALETTE = [
  { hex: "#dc2626", role: "Headline", label: "Vermelho Marlboro" },
  { hex: "#1f2937", role: "CTA",       label: "Carvão" },
  { hex: "#fef3c7", role: "Fundo",     label: "Areia" },
  { hex: "#f59e0b", role: "Arco",      label: "Sol" },
];

const RULES = [
  "Arco sempre no topo da composição (10% do canvas)",
  "Logo sempre no canto direito superior, mínimo 60px de largura",
  "Aviso sanitário sempre ocupa ≥20% da área inferior em formatos verticais",
  "Headline em caixa alta para esta marca",
  "Nunca usar fundo branco puro — usar 'Areia' (#fef3c7)",
];

export function BrandStudio() {
  const [active, setActive] = useState<(typeof SECTIONS)[number]["key"]>("paleta");
  const completion = Math.round((SECTIONS.filter((s) => s.done).length / SECTIONS.length) * 100);

  return (
    <div className="flex h-full">
      {/* Nav lateral interna */}
      <nav className="w-56 shrink-0 border-r border-neutral-200 bg-white p-4 space-y-1">
        <div className="px-2 mb-3">
          <h2 className="font-semibold text-sm">Marlboro</h2>
          <p className="text-xs text-neutral-500 mt-1">Brand Kit ativo</p>
        </div>
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={[
              "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm",
              active === s.key
                ? "bg-accent-50 text-accent-700 border-l-2 border-accent-500"
                : "text-neutral-600 hover:bg-neutral-100",
            ].join(" ")}
          >
            <span>{s.emoji} {s.label}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${s.done ? "bg-emerald-500" : "bg-neutral-300"}`} />
          </button>
        ))}
      </nav>

      {/* Conteúdo */}
      <div className="flex-1 overflow-auto scrollbar-thin">
        <div className="p-8 max-w-4xl space-y-6">
          {/* Completude */}
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Completude do brand kit</h3>
              <span className="text-sm text-neutral-600">{completion}%</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-accent-500 transition-all" style={{ width: `${completion}%` }} />
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Falta configurar: {SECTIONS.filter((s) => !s.done).map((s) => s.label).join(", ")}
            </p>
          </div>

          {active === "paleta" && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Paleta — cores com papéis</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {PALETTE.map((c) => (
                  <div key={c.hex} className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
                    <div className="h-20" style={{ background: c.hex }} />
                    <div className="p-3 space-y-1">
                      <div className="text-sm font-medium">{c.label}</div>
                      <div className="text-xs text-neutral-500">{c.hex.toUpperCase()}</div>
                      <div className="text-[11px] inline-block px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                        papel: {c.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {active === "tipografia" && (
            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Tipografia</h3>
              <div className="rounded-lg border border-neutral-200 bg-white p-5">
                <p className="text-xs text-neutral-500 mb-1">Primária</p>
                <p className="text-3xl font-bold tracking-tight">Marlboro Bold</p>
                <p className="text-xs text-neutral-500 mt-4 mb-1">Secundária</p>
                <p className="text-xl">Inter Medium</p>
              </div>
            </section>
          )}

          {active === "regras" && (
            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Regras de uso</h3>
              <ul className="space-y-2">
                {RULES.map((r, i) => (
                  <li key={i} className="rounded-lg border border-neutral-200 bg-white p-3 text-sm flex items-start gap-3">
                    <span className="text-accent-500">✓</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {active === "logo" && (
            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Logo — 4 variações</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {["Principal", "Negativo", "Horizontal", "Ícone"].map((v) => (
                  <div key={v} className="rounded-lg border border-neutral-200 bg-neutral-100 aspect-square flex items-center justify-center">
                    <span className="text-xs text-neutral-500">{v}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {active === "docs" && (
            <section className="space-y-3">
              <h3 className="text-lg font-semibold">Documentos</h3>
              <button className="rounded-lg border-2 border-dashed border-neutral-300 hover:border-accent-500 hover:bg-accent-50 w-full py-10 text-sm text-neutral-500">
                + Anexar brandbook, guia de tom ou especificações (PDF)
              </button>
            </section>
          )}

          {/* Card "Como a IA usa essa configuração" */}
          <aside className="rounded-xl bg-accent-50 border border-accent-200 p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div className="text-sm">
                <h4 className="font-semibold text-accent-700 mb-1">Como a IA usa essa configuração</h4>
                <p className="text-neutral-700 leading-relaxed">
                  A IA consulta este brand kit em <strong>todo desdobramento</strong>. As regras viram restrições
                  duras no motor de layout: se a orientação do designer conflitar com uma regra, o sistema alerta
                  antes de gerar — mas não bloqueia.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
