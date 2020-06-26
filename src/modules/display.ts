import db from "./storage.ts";
import { jsonTree } from "https://deno.land/x/json_tree/mod.ts";
import { table } from "https://deno.land/x/minitable@v1.0/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { created_format } from "./date_time_formats.ts";

import { parse } from "https://deno.land/std/flags/mod.ts";
const flags = parse(Deno.args);

function init() {
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
  display(search_results, "Today");
}

async function display_all_entries() {
  const entries = await db.get("entries");
  if (await db.has("entries")) display(await db.get("entries"), "All");
}

async function display_all_tags() {
  display(await db.get("tags"), "Tags", true);
}

async function display(output: any, context?: string, tags?: boolean) {
  if (output.length === 0) {
    console.log(`Nothing to display for ${context || ""}`);
  } else {
    if (!tags) {
      const default_view_mode = await db.get("view_mode");
      let display_mode = "tree";

      if (flags.v) {
        display_mode = flags.v;
      } else if (
        ["mini", "compact", "full", "table", "tree"].includes(default_view_mode)
      ) {
        display_mode = default_view_mode;
      }

      console.log(`

  | Displaying: ${context || ""}  as "${display_mode}"
  
      `);

      if (display_mode === "mini") console.log(table(output, ["text"]));
      else if (display_mode === "compact")
        console.log(table(output, ["text", "created"]));
      else if (display_mode === "full")
        console.log(table(output, ["text", "created", "id"]));
      else if (display_mode === "table") console.table(output);
      else {
        const formatted_output = output.map((e: any) => {
          return {
            [e.text]: e.text,
            [e.created]: e.created,
            [`ID: ${e.id}`]: e.id,
          };
        });
        console.log(jsonTree(formatted_output, false));
      }
    } else {
      console.log(`Displaying: ${context || ""}`);
      console.log(jsonTree(output, true));
    }
  }
}

export { display, init, display_today_entries };