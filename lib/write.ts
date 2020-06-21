import db from "./database.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {
  date_input_formats,
  time_input_formats,
  created_format,
} from "./formats.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { display } from "./display.ts";
import search from "./search.ts";
import regex from "./regex.ts";

async function write_entry(flag: any, subflags: any) {
  let tags: any[] = [];
  let is_tag: any;

  do {
    is_tag = regex.rx_tag.exec(flag);
    if (is_tag) tags.push(is_tag[2]);
  } while (is_tag);
  tags = [...new Set(tags)];

  const store = await db.get("entries");

  const on = subflags.on;
  const at = subflags.at;

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
  const text = flag || subflags.args.join(' ');

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

  display(await search.is_same(date));
}

async function edit_entry(flag: any, args: any) {
  const store = await db.get("entries");
  const entry = store.find((e: any) => e.id === flag);
  if (entry) {
    entry.text = args[0];
    const semi_updated_store = store.filter((e: any) => e.id !== flag);
    const updated_store = [entry, ...semi_updated_store];
    await db.set("entries", updated_store);

    const date = moment(entry.created, created_format);
    display(await search.is_same(date));
  } else console.log("Specified ID is incorrect.");
}

async function remove_entry(flag: any) {
  const store = await db.get("entries");
  const entry = store.find((e: any) => e.id === flag);
  if (entry) {
    const updated_store = store.filter((e: any) => e.id !== flag);
    await db.set("entries", updated_store);

    const date = moment(entry.created, created_format);
    display(await search.is_same(date));
  } else console.log("Specified ID is incorrect.");
}

const _write = {
  write_entry,
  edit_entry,
  remove_entry,
};

export default _write;