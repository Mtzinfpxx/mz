import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

import { security } from "./middleware/security.js";
import modsRoutes from "./routes/mods.js";

/* ES Modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

/* Caminho da pasta frontend */
const FRONTEND_PATH =  "frontend";

console.log("📂 Frontend:", FRONTEND_PATH);

/* Segurança */
security(app);

/* JSON */
app.use(express.json());

/* Arquivos estáticos */
app.use(express.static(FRONTEND_PATH));

/* API */
app.use("/api/mods", modsRoutes);

/* Página inicial */
app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

/* Dashboard */
app.get("/dashboard", (_req: Request, res: Response) => {
  res.sendFile(path.join(FRONTEND_PATH, "dashboard.html"));
});

/* Health Check */
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "online",
    port: PORT
  });
});

/* 404 */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada"
  });
});

/* Inicialização */
app.listen(PORT, () => {
  console.log("====================================");
  console.log("🚀 Mod Manager Pro iniciado");
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`📁 Frontend: ${FRONTEND_PATH}`);
  console.log("====================================");
});