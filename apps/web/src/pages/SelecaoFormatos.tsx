import { Link, useParams } from "react-router-dom";
import { mockFormats } from "../data/mocks";
import { useUI, isFormatPickable } from "../lib/store";

export function SelecaoFormatos() {
  const { id } = useParams();
  const { selectedFormatIds, toggleFormat } = useUI();
  const sugeridos = mockFormats.filter((f) => f.suggested);
  const outros = mockFormats.filter((f) => !f.suggested);

  const count = selectedFormatIds.length;

  return (
    <div className="p-8 max-w-6xl space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Seleção de formatos</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Escolha até <strong>5 formatos âncora</strong> para wireframe. O resto será derivado automaticamente.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${count === 5 ? "text-accent-700" : "text-neutral-500"}`}>
            {count} de 5 selecionados
          </span>
          <Link
            to={`/projeto/${id}/wireframe`}
            className={[
              "px-4 py-2 rounded-md text-sm font-medium transition",
              count >= 1 ? "bg-accent-500 text-white hover:bg-accent-600" : "bg-neutral-200 text-neutral-400 cursor-not-allowed",
            ].join(" ")}
          >
            Gerar wireframes →
          </Link>
        </div>
      </header>

      <section>
        <h2 className="text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
          <span className="text-accent-500">★</span> Sugeridos pela IA
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {sugeridos.map((f) => (
            <FormatCard
              key={f.id}
              format={f}
              selected={selectedFormatIds.includes(f.id)}
              disabled={!isFormatPickable(selectedFormatIds, f.id)}
              onClick={() => toggleFormat(f.id)}
              starred
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-neutral-700 mb-3">Outros formatos disponíveis</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {outros.map((f) => (
            <FormatCard
              key={f.id}
              format={f}
              selected={selectedFormatIds.includes(f.id)}
              disabled={!isFormatPickable(selectedFormatIds, f.id)}
              onClick={() => toggleFormat(f.id)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-xl border-2 border-dashed border-neutral-300 p-5 flex items-center gap-4">
        <span className="text-2xl">📐</span>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">Formato personalizado</h3>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <input type="number" placeholder="largura" className="w-24 border border-neutral-300 rounded px-2 py-1" />
            <span>×</span>
            <input type="number" placeholder="altura" className="w-24 border border-neutral-300 rounded px-2 py-1" />
            <button className="px-3 py-1 rounded-md bg-neutral-900 text-white text-xs">Adicionar</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormatCard({
  format,
  selected,
  disabled,
  onClick,
  starred,
}: {
  format: { id: string; label: string; width: number; height: number };
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
  starred?: boolean;
}) {
  const aspect = format.width / format.height;
  return (
    <button
      onClick={onClick}
      disabled={disabled && !selected}
      className={[
        "rounded-lg border-2 p-3 text-left transition relative",
        selected ? "border-accent-500 bg-accent-50" : "border-neutral-200 bg-white hover:border-neutral-300",
        disabled && !selected && "opacity-40 cursor-not-allowed",
      ].join(" ")}
    >
      {starred && <span className="absolute top-2 right-2 text-accent-500 text-xs">★</span>}
      {selected && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent-500 text-white text-xs flex items-center justify-center">
          ✓
        </span>
      )}
      <div className="bg-neutral-100 rounded mb-2 flex items-center justify-center" style={{ aspectRatio: aspect, maxHeight: 80 }}>
        <span className="text-[10px] text-neutral-500">{format.width}×{format.height}</span>
      </div>
      <div className="text-xs font-medium text-neutral-700 truncate">{format.label}</div>
    </button>
  );
}
