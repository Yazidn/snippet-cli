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

  display(await search.is_same(date), date);
}

async function edit_entry(flag: any, args: any) {
  const store = await db.get("entries");
  const entry = store.find((e: any) => e.id === flag);
  if (entry) {
    entry.text = args[0];
    const semi_updated_store = store.filter((e: any) => e.id !== flag);

    // BUG AROUND HERE
    const updated_store = [entry, ...semi_updated_store];
    await db.set("entries", updated_store);

    const date = moment(entry.created, created_format).format("YYYY-MM-DD");
    display(await search.is_same(date), date);
  } else console.log("Specified ID is incorrect.");
}

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

const _write = {
  write_entry,
  edit_entry,
  remove_entry,
};

export default _write;
