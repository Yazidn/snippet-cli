import search from './lib/search.ts';
import write from './lib/write.ts';
import import_export from './lib/import_export.ts';
import extras from './lib/extras.ts';

import { parse } from "https://deno.land/std/flags/mod.ts";
const flags = parse(Deno.args), args = flags._;

import {display, init_display} from './lib/display.ts';
init_display();

if (flags.s || flags.search) display(await search.search_by_text(flags.s || flags.search));
if (flags.t || flags.tag) display(await search.search_by_tag(flags.t || flags.tag));

if (flags.d || flags.date) display(await search.is_same(flags.d || flags.date));
if (flags.f && flags.t || flags.from && flags.to) display(await search.is_between(flags .f ? [flags.f, flags.t] : [flags.from, flags.to]));
if (flags.l || flags.last) display(await search.last(flags.l || flags.last));

if (flags.w || flags.write) write.write_entry(flags.w || flags.write, {set: flags.set, timeset: flags.timeset});
if (flags.e || flags.edit) write.edit_entry(flags.e || flags.edit, args);
if (flags.r || flags.remove) write.remove_entry(flags.r || flags.remove);

if (flags.m || flags.markdown) import_export.export_entries_md(flags.m || flags.markdown);
if (flags.j || flags.json) import_export.export_entries_json(flags.j || flags.json);

if (flags.i || flags.import) import_export.import_entries(flags.i || flags.import);

if (flags.c || flags.clear) extras.reset();
if (flags.h || flags.help) extras.help();