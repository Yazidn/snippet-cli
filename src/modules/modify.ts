import db from "./storage.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {
  date_input_formats,
  time_input_formats,
  created_format,
} from "./date_time_formats.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import display from "./display.ts";
import find from "./find.ts";
import regex from "./regular_expressions.ts";
import extras from "./extras.ts";

async function write(flag: any, subflags: any) {
  let tags: string[] = extras.extract_tags(flag);
  const store = await db.get("entries");
  const { on, at } = subflags;

  const write_moment = moment();

  const date = on
    ? moment(on, date_input_formats).format("YYYY-MM-DD")
    : write_moment.format("YYYY-MM-DD");
  const time = at
    ? moment(at, time_input_formats).format("h:mm:ss a")
    : write_moment.format("h:mm:ss a");
  const created = moment(`${date} ${time}`, "YYYY-MM-DD h:mm:ss a").format(
    created_format
  );
  const text = flag || subflags.args.join(" ");

  const new_entry = { id: v4.generate(), text, created, tags };
  const updated_store = [new_entry, ...store];
  await db.set("entries", updated_store);

  if (tags.length !== 0) {
    const tags_store = await db.get("tags");
    tags.forEach((t) => {
      if (tags_store.includes(t)) tags = tags.filter((_t) => _t !== t);
    });
    const updated_tags_store = [...tags, ...tags_store];
    await db.set("tags", updated_tags_store);
  }

  display.render(await find.is_same(date), date);
}

async function edit(flag: any, subflags: any) {
  const store = await db.get("entries");
  const t_store = await db.get("tags");
  const { recent, args } = subflags;
  const is_tag: any = regex.rx_tag.exec(flag);

  switch (true) {
    case Boolean(recent): {
      const entry = store.find((e: any, index: number) => index === 0);
      let tags: string[] = extras.extract_tags(recent);
      if (entry) {
        entry.text = recent;
        entry.tags = tags;
        const semi_updated_store = store.filter(
          (e: any, index: number) => index !== 0
        );

        after_edit(entry, semi_updated_store);
      } else console.log("Didn't find any recent entries.");
      break;
    }

    case Boolean(is_tag): {
      const _tag = is_tag[2];
      let tag = t_store.find((t: string) => t === _tag);
      if (tag) {
        tag = args[0];
        const semi_updated_tag_store = t_store.filter(
          (t: string) => t !== _tag
        );
        await db.set("tags", [tag, ...semi_updated_tag_store]);

        const rx_tag_dynamic = new RegExp(`(@|#)${_tag}`, "g");
        const entries_with_said_tag = await find.by_tag(_tag);
        const modified_entries = entries_with_said_tag.map((e: any) => {
          e.tags = e.tags.filter((t: string) => t !== _tag);
          e.tags.push(args[0]);
          e.text = e.text.replace(rx_tag_dynamic, `${is_tag[1]}${args[0]}`);
          return e;
        });

        const updated_store = store.filter((e: any) => !e.tags.includes(_tag));

        await db.set("entries", updated_store);
      }
      break;
    }

    default: {
      const entry = store.find((e: any) => e.id === flag);
      let tags: string[] = extras.extract_tags(args[0]);
      if (entry) {
        entry.text = args[0];
        entry.tags = tags;
        const semi_updated_store = store.filter((e: any) => e.id !== flag);

        after_edit(entry, semi_updated_store);
      } else console.log("Specified ID is incorrect.");
    }
  }
}

async function after_edit(entry: any, semi_updated_store: any) {
  const updated_store = [entry, ...semi_updated_store];
  await db.set("entries", []); // Temporary
  await db.set("entries", updated_store);

  const date = moment(entry.created, created_format).format("YYYY-MM-DD");
  display.render(await find.is_same(date), date);
}

const _write = {
  write,
  edit,
};

export default _write;
