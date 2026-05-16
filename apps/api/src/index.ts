import Fastify from "fastify";
import cors from "@fastify/cors";
import { healthRoutes } from "./routes/health.js";
import { projectsRoutes } from "./routes/projects.js";
import { env } from "./lib/env.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });
await app.register(healthRoutes);
await app.register(projectsRoutes, { prefix: "/api" });

try {
  await app.listen({ port: env.PORT, host: "0.0.0.0" });
  app.log.info(`kv.studio api up on http://localhost:${env.PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
