import { Link, useLocation } from "react-router-dom";

const STEPS = [
  { key: "kv", label: "Brand Studio" },     // tratado como pré-fase
  { key: "kv", label: "KV master" },
  { key: "formatos", label: "Formatos" },
  { key: "wireframe", label: "Wireframe" },
  { key: "dialogo", label: "Diálogo IA" },
  { key: "revisao", label: "Revisão" },
  { key: "aprovacao", label: "Aprovação" },
] as const;

const ORDER = ["kv", "formatos", "wireframe", "dialogo", "revisao", "aprovacao"];

export function Stepper({ projectId }: { projectId: string }) {
  const { pathname } = useLocation();
  const currentSlug = pathname.split("/").pop() ?? "";
  const currentIdx = ORDER.indexOf(currentSlug);

  return (
    <div className="border-b border-neutral-200 bg-white px-6 py-3">
      <ol className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
        {STEPS.map((s, i) => {
          const stepOrderIdx = i === 0 ? -1 : ORDER.indexOf(s.key) + (s.label === "KV master" ? 0 : 0);
          // Para Brand Studio (i==0) só destaca se estiver na rota /brand-studio
          const isBrand = i === 0;
          const linkTo = isBrand ? `/brand-studio` : `/projeto/${projectId}/${s.key}`;
          // Simplificação: marcar atual conforme posição relativa
          const active =
            (isBrand && pathname.startsWith("/brand-studio")) ||
            (!isBrand && currentIdx === ORDER.indexOf(s.key) && currentIdx >= 0);
          const done = !isBrand && currentIdx > ORDER.indexOf(s.key);
          return (
            <li key={i} className="flex items-center gap-2 shrink-0">
              <Link
                to={linkTo}
                className={[
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition",
                  active && "bg-accent-50 text-accent-700",
                  done && "text-neutral-500 hover:bg-neutral-100",
                  !active && !done && "text-neutral-500 hover:bg-neutral-100",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span
                  className={[
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold",
                    active ? "bg-accent-500 text-white" : done ? "bg-emerald-500 text-white" : "bg-neutral-200 text-neutral-600",
                  ].join(" ")}
                >
                  {done ? "✓" : i + 1}
                </span>
                {s.label}
              </Link>
              {i < STEPS.length - 1 && <span className="text-neutral-300">›</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
