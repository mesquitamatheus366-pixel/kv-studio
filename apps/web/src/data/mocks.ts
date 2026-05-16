import type { Client, FormatSpec, Project, KvElement } from "@kv/shared";

export const mockClients: Client[] = [
  { id: "c1", name: "Marlboro", color: "#dc2626", activeProjects: 3 },
  { id: "c2", name: "Natura", color: "#16a34a", activeProjects: 2 },
  { id: "c3", name: "Itaú", color: "#f59e0b", activeProjects: 1 },
];

export const mockProjects: Project[] = [
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
  {
    id: "p3",
    clientId: "c3",
    clientName: "Itaú",
    campaign: "Cartão Black Q2",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    formatCount: 6,
    statusBreakdown: { em_producao: 0, editado: 0, aprovado: 5, revisado_ok: 0, revisora_ajuste: 1 },
  },
];

export const mockFormats: FormatSpec[] = [
  // Sugeridos pela IA (★) — os 5 mais distintos
  { id: "f1", label: "300×600 — Vertical alto", width: 300, height: 600, category: "google_ads", suggested: true },
  { id: "f2", label: "300×250 — Quadrado", width: 300, height: 250, category: "google_ads", suggested: true },
  { id: "f3", label: "728×90 — Horizontal estreito", width: 728, height: 90, category: "google_ads", suggested: true },
  { id: "f4", label: "1080×1920 — Stories", width: 1080, height: 1920, category: "social", suggested: true },
  { id: "f5", label: "970×250 — Horizontal largo", width: 970, height: 250, category: "google_ads", suggested: true },
  // Outros disponíveis
  { id: "f6", label: "336×280", width: 336, height: 280, category: "google_ads" },
  { id: "f7", label: "320×100", width: 320, height: 100, category: "google_ads" },
  { id: "f8", label: "160×600", width: 160, height: 600, category: "google_ads" },
  { id: "f9", label: "1080×1080 — Feed Instagram", width: 1080, height: 1080, category: "social" },
  { id: "f10", label: "1200×628 — LinkedIn", width: 1200, height: 628, category: "social" },
  { id: "f11", label: "1080×1350 — Feed retrato", width: 1080, height: 1350, category: "social" },
  { id: "f12", label: "1920×400 — Hero site", width: 1920, height: 400, category: "site" },
];

export const mockKvElements: KvElement[] = [
  { id: "e1", type: "image", name: "Hero (modelo + produto)", x: 0, y: 0, w: 1080, h: 720, priority: "alta", visible: true },
  { id: "e2", type: "text", name: "Headline — 'Sabor que acompanha'", x: 60, y: 760, w: 960, h: 120, priority: "alta", visible: true },
  { id: "e3", type: "text", name: "Subheadline", x: 60, y: 880, w: 960, h: 60, priority: "media", visible: true },
  { id: "e4", type: "shape", name: "CTA — 'Conheça'", x: 60, y: 980, w: 280, h: 80, priority: "alta", visible: true },
  { id: "e5", type: "logo", name: "Logo Marlboro", x: 900, y: 40, w: 140, h: 60, priority: "alta", visible: true },
  { id: "e6", type: "text", name: "Aviso sanitário", x: 0, y: 1700, w: 1080, h: 220, priority: "alta", locked: true, visible: true },
];

export type ChatMessage = {
  id: string;
  formatLabel: string;
  element: string;
  userInstruction: string;
  aiResponse: string;
};

export const mockDialogo: ChatMessage[] = [
  {
    id: "m1",
    formatLabel: "300×600",
    element: "Hero",
    userInstruction: "priorizar o rosto no crop",
    aiResponse: "Crop reposicionado para enquadrar rosto e produto. Mantive 70% do hero original; reduzi o céu superior.",
  },
  {
    id: "m2",
    formatLabel: "728×90",
    element: "Headline",
    userInstruction: "headline em uma linha só, mesmo que reduza fonte",
    aiResponse: "Texto comprimido para 32px (mínimo legível). Headline 'Sabor que acompanha' em uma única linha; subheadline foi omitida (prioridade média).",
  },
  {
    id: "m3",
    formatLabel: "1080×1920",
    element: "CTA",
    userInstruction: "CTA com altura maior, para mobile",
    aiResponse: "Altura do CTA aumentada para 120px, largura full-bleed com 60px de margem. Posição preservada acima do aviso sanitário.",
  },
];
