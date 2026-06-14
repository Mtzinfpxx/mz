import express, { Request, Response } from "express";
import path from "path";
import { security } from "../middleware/security.js";
import modsRoutes from "../routes/mods.js";
import { __dirname } from "./utils.js";

const app = express();

/* 🛡️ SECURITY */
security(app);

/* 📦 JSON */
app.use(express.json());

/* 🌐 FRONTEND */
app.use(express.static(path.join(__dirname, "../frontend")));

/* 📡 API */
app.use("/api/mods", modsRoutes);

/* 🏠 HOME */
app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* 🚀 START */
app.listen(3000, () => {
  console.log("🚀 Mod Manager Pro rodando em http://localhost:3000");
});