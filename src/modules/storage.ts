import { Store } from "https://cdn.depjs.com/store/mod.ts";

const init = async () => {
  const default_journal = new Store({ name: "default.json", path: "./journals" });

  if (!(await default_journal.has("entries")))
    await default_journal.set("entries", []);

  if (!(await default_journal.has("tags")))
    await default_journal.set("tags", []);

  if (!(await default_journal.has("view_mode")))
    await default_journal.set("view_mode", "tree");

  return default_journal;
};

const db = await init();
export default db;