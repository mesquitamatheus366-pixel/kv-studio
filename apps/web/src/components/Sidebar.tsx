import { NavLink } from "react-router-dom";
import { mockClients } from "../data/mocks";

function navClass({ isActive }: { isActive: boolean }) {
  return [
    "block px-3 py-2 rounded-md text-sm transition",
    isActive
      ? "bg-accent-50 text-accent-700 border-l-2 border-accent-500"
      : "text-neutral-600 hover:bg-neutral-100",
  ].join(" ");
}

export function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-neutral-200 bg-white flex flex-col overflow-y-auto scrollbar-thin">
      <div className="p-4 space-y-6">
        <Section title="Designer">
          <NavLink to="/repositorio" className={navClass}>📁 Projetos</NavLink>
          <NavLink to="/brand-studio" className={navClass}>🎨 Brand Studio</NavLink>
        </Section>

        <Section
          title="Clientes"
          action={<button className="text-xs text-accent-600 hover:underline">+ novo</button>}
        >
          {mockClients.map((c) => (
            <button
              key={c.id}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-neutral-600 hover:bg-neutral-100"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                {c.name}
              </span>
              <span className="text-xs text-neutral-400">{c.activeProjects}</span>
            </button>
          ))}
        </Section>

        <Section title="Atalhos">
          <NavLink to="/aprovacoes" className={navClass}>✅ Aprovações</NavLink>
          <NavLink to="/historico" className={navClass}>🕓 Histórico</NavLink>
          <NavLink to="/spike" className={navClass}>⚡ Konva spike</NavLink>
        </Section>
      </div>
    </aside>
  );
}

function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
          {title}
        </h3>
        {action}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
