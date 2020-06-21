import db from "./database.ts";
import { jsonTree } from "https://deno.land/x/json_tree/mod.ts";
import { table } from "https://deno.land/x/minitable@v1.0/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { created_format } from "./formats.ts";

import { parse } from "https://deno.land/std/flags/mod.ts";
const flags = parse(Deno.args);

function init_display() {
  if (Object.keys(flags).length !== 1) display_entries_default();
  else console.log("Use -h or --help to get started.");
  if (flags.tags) display_all_tags();
}

async function display_entries_default() {
  if (flags.a || flags.all) display_all_entries();
  else if (flags.today) display_today_entries();
}

async function display_today_entries() {
  let search_results: any[] = [];

  const store = await db.get("entries");
  search_results = store.filter((e: any) => {
    if (moment(e.created, created_format).isSame(moment(), "day")) return e;
  });
  display(search_results);
}

async function display_all_entries() {
  const entries = await db.get("entries");
  if (await db.has("entries")) display(await db.get("entries"));
}

async function display_all_tags() {
  display(await db.get("tags"), true);
}

async function display(output: any, tags?: boolean) {
  if (output.length === 0) {
    console.log("Nothing to display!");
  } else {
    if (!tags) {
      const view_mode = await db.get("view_mode");

      if (flags.v === "table" || view_mode === "table") console.table(output);
      else if (flags.v === "mini" || view_mode === "mini") console.log(table(output, ["text"]));
      else if (flags.v === "compact" || view_mode === "compact")
        console.log(table(output, ["text", "created"]));
      else if (flags.v === "full" || view_mode === "full")
        console.log(table(output, ["text", "created", "id"]));
      else {
        const tbl_no_tags_array = output.map((e: any) => {
          return {
            [e.text]: e.text,
            [e.created]: e.created,
            [`ID: ${e.id}`]: e.id,
          };
        });
        console.log(jsonTree(tbl_no_tags_array, false));
      }
    } else console.log(jsonTree(output, true));
  }
}

export { display, init_display, display_today_entries };