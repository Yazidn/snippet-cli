import { Store } from "https://cdn.depjs.com/store/mod.ts";

const initialize = async () => {
  const db = new Store({ name: "snpt", path: "./db" });
  if (!(await db.has("entries"))) await db.set("entries", []);
  if (!(await db.has("tags"))) await db.set("tags", []);

  return db;
};

const db = await initialize();
export default db;