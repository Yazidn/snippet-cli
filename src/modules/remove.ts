import db from "./storage.ts";
import search from "./find.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { created_format } from "./date_time_formats.ts";
import { display } from "./display.ts";

async function remove(flag: any, subflags: any) {
  const store = await db.get("entries");
  const t_store = await db.get("tags");

  const { all, today, last, date, between, recent, tag, args } = subflags;

  // General
  switch (true) {
    
    // Tag
    case Boolean(tag): {
      const _tag = t_store.find((t: any) => t === tag);
      if (_tag) {
        const updated_store = t_store.filter((t: any) => t !== _tag);
        await db.set("tags", updated_store);
      }
      break;
    }

    // All
    case Boolean(all): {
      await db.set("entries", []);
      break;
    }

    // Recent
    case Boolean(recent): {
      const updated_store = store.filter(
        (e: any, index: number) => index >= parseInt(recent)
      );
      await db.set("entries", updated_store);
      break;
    }

    // ID
    case Boolean(flag): {
      const entry = store.find((e: any) => e.id === flag);
      if (entry) {
        const updated_store = store.filter((e: any) => e.id !== flag);
        await db.set("entries", updated_store);

        const date = moment(entry.created, created_format).format("YYYY-MM-DD");
        display(await search.is_same(date), date);
      } else console.log("Specified ID is incorrect.");
      break;
    }
  }

  // By Find
  switch (true) {
    // Today
    case Boolean(today): {
      by(await search.is_same(moment()));
      break;
    }

    // By "Last" Command
    case Boolean(last): {
      by(await search.last(last));
      break;
    }

    // By Date
    case Boolean(date): {
      by(await search.is_same(date));
      break;
    }

    // By Time Period
    case Boolean(between[0] && between[1]): {
      by(await search.is_between(between));
      break;
    }
  }
}

async function by(input: any) {
  const store = await db.get("entries");
  const updated_store = store.filter((e: any) => !input.includes(e));
  await db.set("entries", updated_store);
}

export { remove };