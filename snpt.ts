import search from "./lib/search.ts";
import write from "./lib/write.ts";
import import_export from "./lib/import_export.ts";
import extras from "./lib/extras.ts";

import { parse } from "https://deno.land/std/flags/mod.ts";
const flags = parse(Deno.args),
  args = flags._;

//   Display
import { display, init_display } from "./lib/display.ts";
init_display();

// Search
if (flags.s || flags.search)
  display(await search.search_by_text(flags.s || flags.search), flags.s || flags.search);

if (flags.t || flags.tag)
  display(await search.search_by_tag(flags.t || flags.tag), flags.t || flags.tag);

if (flags.d || flags.date) display(await search.is_same(flags.d || flags.date), flags.d || flags.date);

if ((flags.f && flags.u) || (flags.from && flags.until))
  display(
    await search.is_between(
      flags.f ? [flags.f, flags.u] : [flags.from, flags.until]
    ),
    `${flags.f || flags.from} ---> ${flags.u || flags.until}`
  );

if (flags.l || flags.last) display(await search.last(flags.l || flags.last), flags.l || flags.last);

// Write
if (flags.w || flags.write || args.length)
  write.write_entry(flags.w || flags.write, {
    on: flags.on,
    at: flags.at,
    args
  });

if (flags.e || flags.edit) write.edit_entry(flags.e || flags.edit, args);
if (flags.r || flags.remove) write.remove_entry(flags.r || flags.remove, {
  today: flags.today,
  last: flags.l || flags.last,
  date: flags.d || flags.date,
  between: [flags.f || flags.from, flags.u || flags.until],
  all: flags.a || flags.all,
  recent: flags.recent
}, args);

// Export & Import
if (flags.m || flags.markdown)
  import_export.export_entries_md(flags.m || flags.markdown);

if (flags.j || flags.json)
  import_export.export_entries_json(flags.j || flags.json);

if (flags.i || flags.import)
  import_export.import_entries(flags.i || flags.import);

// Extras
if (flags.setview) extras.set_view_mode(flags.setview);
if (flags.c || flags.clear) extras.reset();
if (flags.h || flags.help) extras.help();