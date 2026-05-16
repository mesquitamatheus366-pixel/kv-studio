import { Link } from "react-router-dom";
import { mockProjects } from "../data/mocks";
import { StatusDot, STATUS_LEGEND } from "../components/StatusDot";
import type { FormatStatus } from "@kv/shared";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.round(diff / 3600_000);
  if (h < 24) return `${h}h atrás`;
  return `${Math.round(h / 24)}d atrás`;
}

export function Repositorio() {
  return (
    <div className="p-8 space-y-6 max-w-7xl">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Olá, Matheus 👋</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Você tem {mockProjects.length} projetos ativos.
          </p>
        </div>
        <button className="px-4 py-2 rounded-md bg-accent-500 text-white text-sm font-medium hover:bg-accent-600">
          + Novo projeto
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Card "novo projeto" — primeiro item */}
        <button className="aspect-[4/3] rounded-xl border-2 border-dashed border-neutral-300 hover:border-accent-500 hover:bg-accent-50 text-neutral-500 hover:text-accent-700 flex flex-col items-center justify-center gap-2 transition">
          <span className="text-3xl">+</span>
          <span className="text-sm font-medium">Novo projeto</span>
        </button>

        {mockProjects.map((p) => {
          const total = p.formatCount;
          return (
            <Link
              key={p.id}
              to={`/projeto/${p.id}/kv`}
              className="block rounded-xl border border-neutral-200 bg-white hover:shadow-md transition overflow-hidden"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 relative">
                <div className="absolute top-3 left-3 px-2 py-0.5 text-[11px] font-medium bg-white/90 rounded-full text-neutral-700">
                  {p.clientName}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="font-medium text-sm text-neutral-900 truncate">{p.campaign}</div>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{timeAgo(p.updatedAt)}</span>
                  <span>{total} formatos</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  {(Object.entries(p.statusBreakdown) as [FormatStatus, number][])
                    .filter(([, n]) => n > 0)
                    .map(([s, n]) => (
                      <div key={s} className="flex items-center gap-1">
                        <StatusDot status={s} />
                        <span className="text-[11px] text-neutral-500">{n}</span>
                      </div>
                    ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <footer className="pt-4 flex items-center gap-4 text-xs text-neutral-400">
        <span className="font-medium uppercase tracking-wide">Legenda:</span>
        {STATUS_LEGEND.map((s) => (
          <StatusDot key={s.status} status={s.status} withLabel />
        ))}
      </footer>
    </div>
  );
}
