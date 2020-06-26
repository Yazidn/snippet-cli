import db from "./storage.ts";
import { jsonTree } from "https://deno.land/x/json_tree/mod.ts";
import { table } from "https://deno.land/x/minitable@v1.0/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import { created_format } from "./date_time_formats.ts";
import input from "./user_input.ts";

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

      if (input.display.view) {
        display_mode = input.display.view;
      } else if (
        ["mini", "compact", "full", "table", "tree"].includes(default_view_mode)
      ) {
        display_mode = default_view_mode;
      }

      console.log(`\n| Displaying: ${context || ""}  as "${display_mode}"\n`);

      switch (display_mode) {
        case "mini":
          console.log(table(output, ["text"]));
          break;
        case "compact":
          console.log(table(output, ["text", "created"]));
          break;
        case "full":
          console.log(table(output, ["text", "created", "id"]));
          break;
        case "table":
          console.table(output);
          break;
        default: {
          const formatted_output = output.map((e: any) => {
            return {
              [e.text]: e.text,
              [e.created]: e.created,
              [`ID: ${e.id}`]: e.id,
            };
          });
          console.log(jsonTree(formatted_output, false));
        }
      }
    } else {
      console.log(`Displaying: ${context || ""}`);
      console.log(jsonTree(output, true));
    }
  }
}

export {
  display,
  display_all_entries,
  display_today_entries,
  display_all_tags,
};