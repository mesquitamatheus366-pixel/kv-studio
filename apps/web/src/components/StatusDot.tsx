import type { FormatStatus } from "@kv/shared";

const map: Record<FormatStatus, { color: string; label: string }> = {
  em_producao:      { color: "bg-status-producao", label: "Em produção" },
  editado:          { color: "bg-status-editado",  label: "Editado / Pendente" },
  aprovado:         { color: "bg-status-aprovado", label: "Aprovado" },
  revisado_ok:      { color: "bg-status-revisado", label: "Revisado ok" },
  revisora_ajuste:  { color: "bg-status-ajuste",   label: "Revisora: ajuste" },
};

export function StatusDot({ status, withLabel = false }: { status: FormatStatus; withLabel?: boolean }) {
  const cfg = map[status];
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${cfg.color}`} title={cfg.label} />
      {withLabel && <span className="text-xs text-neutral-600">{cfg.label}</span>}
    </span>
  );
}

export const STATUS_LEGEND: { status: FormatStatus; label: string }[] = [
  { status: "em_producao", label: "Em produção" },
  { status: "editado", label: "Editado" },
  { status: "aprovado", label: "Aprovado" },
  { status: "revisado_ok", label: "Revisado ok" },
  { status: "revisora_ajuste", label: "Revisora: ajuste" },
];
