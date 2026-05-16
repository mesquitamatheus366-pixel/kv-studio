import type { FastifyInstance } from "fastify";
import type { Project } from "@kv/shared";

// Mock — substituir por Supabase no Mês 1.
const mockProjects: Project[] = [
  {
    id: "p1",
    clientId: "c1",
    clientName: "Marlboro",
    campaign: "Verão 2026 — Lançamento",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    formatCount: 12,
    statusBreakdown: { em_producao: 4, editado: 2, aprovado: 5, revisado_ok: 1, revisora_ajuste: 0 },
  },
  {
    id: "p2",
    clientId: "c2",
    clientName: "Natura",
    campaign: "Dia das Mães",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    formatCount: 8,
    statusBreakdown: { em_producao: 0, editado: 1, aprovado: 6, revisado_ok: 1, revisora_ajuste: 0 },
  },
];

export async function projectsRoutes(app: FastifyInstance) {
  app.get("/projects", async () => mockProjects);
  app.get<{ Params: { id: string } }>("/projects/:id", async (req, reply) => {
    const project = mockProjects.find((p) => p.id === req.params.id);
    if (!project) return reply.code(404).send({ error: "not_found" });
    return project;
  });
}
