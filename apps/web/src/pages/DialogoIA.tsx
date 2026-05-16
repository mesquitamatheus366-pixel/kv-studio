import { Link, useParams } from "react-router-dom";
import { mockDialogo } from "../data/mocks";

export function DialogoIA() {
  const { id } = useParams();
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Diálogo com a IA</h1>
        <p className="text-sm text-neutral-500 mt-1">
          A IA releu suas orientações e confirma como vai aplicar cada uma. Revise antes de gerar os formatos.
        </p>
      </header>

      <div className="space-y-4">
        {mockDialogo.map((m) => (
          <div key={m.id} className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
            <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-2 flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-neutral-200 font-medium">{m.formatLabel}</span>
              <span className="text-neutral-500">/ {m.element}</span>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-xs shrink-0">MM</div>
                <div className="flex-1">
                  <p className="text-xs text-neutral-500 mb-1">Você</p>
                  <p className="text-sm text-neutral-800">"{m.userInstruction}"</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-accent-500 flex items-center justify-center text-xs text-white shrink-0">🤖</div>
                <div className="flex-1">
                  <p className="text-xs text-accent-700 mb-1">kv.ai</p>
                  <p className="text-sm text-neutral-800 leading-relaxed">{m.aiResponse}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 p-4">
        <p className="text-sm text-amber-800">
          ⚠️ Só após confirmar a IA gera os formatos. Você pode voltar e ajustar qualquer orientação.
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <Link
          to={`/projeto/${id}/wireframe`}
          className="px-4 py-2 rounded-md border border-neutral-300 text-sm font-medium hover:bg-neutral-50"
        >
          ← Voltar e ajustar
        </Link>
        <Link
          to={`/projeto/${id}/revisao`}
          className="px-4 py-2 rounded-md bg-accent-500 text-white text-sm font-medium hover:bg-accent-600"
        >
          Confirmar e gerar →
        </Link>
      </div>
    </div>
  );
}
