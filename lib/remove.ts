import db from "./database.ts";
import search from "./search.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { created_format } from "./formats.ts";
import { display } from "./display.ts";

async function remove_entry(flag: any, subflags: any, args: any) {
  const store = await db.get("entries");
  const { all, today, last, date, between, recent, tag } = subflags;

  if (tag) remove_tag(tag);
  else if (all) await db.set("entries", []);
  else if (recent) remove_recent(parseInt(recent));
  else if (today) remove_by(await search.is_same(moment()));
  else if (last) remove_by(await search.last(last));
  else if (date) remove_by(await search.is_same(date));
  else if (between[0] && between[1])
    remove_by(await search.is_between(between));
  else if (flag) {
    const entry = store.find((e: any) => e.id === flag);
    if (entry) {
      const updated_store = store.filter((e: any) => e.id !== flag);
      await db.set("entries", updated_store);

      const date = moment(entry.created, created_format).format("YYYY-MM-DD");
      display(await search.is_same(date), date);
    } else console.log("Specified ID is incorrect.");
  }
}

async function remove_by(input: any) {
  const store = await db.get("entries");
  const updated_store = store.filter((e: any) => !input.includes(e));
  await db.set("entries", updated_store);
}

async function remove_recent(input: any) {
  const store = await db.get("entries");
  const updated_store = store.filter((e: any, index: number) => index >= input);
  await db.set("entries", updated_store);
}

async function remove_tag(input: any) {
  const store = await db.get("tags");
  const tag = store.find((t: any) => t === input);
  if (tag) {
    const updated_store = store.filter((t: any) => t !== tag);
    await db.set("tags", updated_store);
  }
}

export { remove_entry };