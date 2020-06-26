import { Store } from "https://cdn.depjs.com/store/mod.ts";

const initialize = async () => {
  const db = new Store({ name: "default.json", path: "./journals" });

  if (!(await db.has("entries"))) await db.set("entries", []);
  if (!(await db.has("tags"))) await db.set("tags", []);
  if (!(await db.has("view_mode"))) await db.set("view_mode", "tree");

  return db;
};

const db = await initialize();
export default db;