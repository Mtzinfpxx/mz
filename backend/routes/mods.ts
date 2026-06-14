import express, { Request, Response } from "express";
import fs from "fs";
import { v4 as uuid } from "uuid";

const router = express.Router();

const DB = "./backend/db/mods.json";

/* 📖 READ DB */
function readDB() {
  if (!fs.existsSync(DB)) return [];
  return JSON.parse(fs.readFileSync(DB, "utf-8"));
}

/* 💾 WRITE DB */
function writeDB(data: any) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

/* 📥 GET ALL */
router.get("/", (req, res) => {
  res.json(readDB());
});

/* 📥 GET ONE */
router.get("/:id", (req, res) => {
  const mods = readDB();
  const mod = mods.find((m: any) => m.id === req.params.id);

  if (!mod) return res.status(404).json({ error: "Not found" });

  res.json(mod);
});

/* ➕ CREATE */
router.post("/", (req, res) => {
  const mods = readDB();

  const newMod = {
    id: uuid(),
    name: req.body.name,
    description: req.body.description,
    download: req.body.download,
    version: req.body.version || "1.0",
    createdAt: new Date().toISOString()
  };

  mods.push(newMod);
  writeDB(mods);

  res.json(newMod);
});

/* ❌ DELETE */
router.delete("/:id", (req, res) => {
  let mods = readDB();

  mods = mods.filter((m: any) => m.id !== req.params.id);

  writeDB(mods);

  res.json({ success: true });
});

export default router;