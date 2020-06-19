import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import db from './database.ts';

import { Markdown, ListTypes } from 'https://deno.land/x/deno_markdown/mod.ts';
import { jsonTree } from "https://deno.land/x/json_tree/mod.ts";
import { table } from 'https://deno.land/x/minitable@v1.0/mod.ts';
import {date_input_formats, time_input_formats} from './lib/formats.ts';
import h_help from './lib/help.ts';

import search from './lib/search.ts';
import {display, init_display} from './lib/display.ts';
import write from './lib/write.ts';

const flags = parse(Deno.args), args = flags._;
init_display();




// Display
// if (Object.keys(flags).length !== 1) display.display_entries_default();
// else console.log("Use -h or --help to get started.");
// if (flags.tags) display.display_all_tags();

// Search: Text & Tags
if (flags.s || flags.search) display(await search.search_by_text(flags.s || flags.search));
if (flags.t || flags.tag) display(await search.search_by_tag(flags.t || flags.tag));

// Search: Date
if (flags.d || flags.date) display(await search.is_same(flags.d || flags.date));
if (flags.f && flags.t || flags.from && flags.to) display(await search.is_between(flags .f ? [flags.f, flags.t] : [flags.from, flags.to]));
if (flags.l || flags.last) display(await search.last(flags.l || flags.last));

// Write
if (flags.w || flags.write) write.write_entry(flags.w || flags.write, {set: flags.set, timeset: flags.timeset});
if (flags.e || flags.edit) write.edit_entry(flags.e || flags.edit, args);
if (flags.r || flags.remove) write.remove_entry(flags.r || flags.remove);

// Export
if (flags.m || flags.markdown) export_entries_md(flags.m || flags.markdown);
if (flags.j || flags.json) export_entries_json(flags.j || flags.json);

// Import
if (flags.i || flags.import) import_entries(flags.i || flags.import);

// Extras
if (flags.c || flags.clear) reset();
if (flags.h || flags.help) help();

// Global: Used by functions below.
// let search_results :any[] = [];

// async function display_entries_default() {
//     if (flags.a || flags.all) display_all_entries();
//     else if (flags.today) display_today_entries();
// }

// async function display_today_entries() {
//         const store = await db.get('entries');
//         search_results = store.filter((e: any) => {
//             if (moment(e.created, 'dddd, MMMM Do YYYY, h:mm:ss a').isSame(moment(), 'day')) return e;
//         })
//         display(search_results);
// }

// async function display_all_entries() {
//     const entries = await db.get('entries');
//     if (await db.has('entries')) display(await db.get('entries'));
// }

// async function display_all_tags() { display(await db.get('tags'), true) }

// async function display(output :any, tags? :boolean) {
//     if (output.length === 0) {
//         console.log("Nothing to display!");
//     } else {
//         if (!tags) {
//             if (flags.v === 'table') console.table(output);
//             else if (flags.v === 'mini') console.log(table(output, ['text']));
//             else if (flags.v === 'compact') console.log(table(output, ['text', 'created']));
//             else if (flags.v === 'full') console.log(table(output, ['text', 'created', 'id']));
//             else {
//                 const tbl_no_tags_array = output.map((e :any) => { return {[e.text]: e.text, [e.created]: e.created, [`ID: ${e.id}`]: e.id} })
//                 console.log(jsonTree(tbl_no_tags_array , false));
//             }
//         } else console.log(jsonTree(output, true));
//     }
// }

// async function is_same(input: any) {
//     const is_day = moment(input, ['YYYY-MM-DD', 'DD-MM-YYYY', 'DD-MM-YY', 'YY-MM-DD', 'M-D', 'D-M'], true).isValid();
//     const is_month = moment(input, ['MM-YYYY', 'M', 'MM'], true).isValid();
//     const is_year = moment(input, ['YYYY', 'YY', 'Y'], true).isValid();
    
//     if (is_day) search_results = await is_same_by(input, 'day');
//     else if (is_month) search_results = await is_same_by(input, 'month');
//     else if (is_year) search_results = await is_same_by(input, 'year');

//     display(search_results);
// }

// async function is_same_by(input: any, property :string) {
//     const store = await db.get('entries');
//     const input_to_moment = moment(input, date_input_formats);

//     return store.filter((e: any) => {
//         if (moment(e.created, 'dddd, MMMM Do YYYY, h:mm:ss a').isSame(input_to_moment, property)) return e;
//     })
// }


// async function is_between(input :any) {
//     const is_day = moment(input[0],
//         ['YYYY-MM-DD', 'DD-MM-YYYY', 'DD-MM-YY', 'YY-MM-DD', 'M-D', 'D-M'], true).isValid() && moment(input[1],
//         ['YYYY-MM-DD', 'DD-MM-YYYY', 'DD-MM-YY', 'YY-MM-DD', 'M-D', 'D-M'], true).isValid();
    
//     const is_month = moment(input[0], ['MM-YYYY', 'M', 'MM'], true).isValid() && moment(input[1],
//         ['MM-YYYY', 'M', 'MM'], true).isValid();

//     const is_year = moment(input[0], ['YYYY', 'YY', 'Y'], true).isValid() && moment(input[1],
//         ['YYYY', 'YY', 'Y'], true).isValid();

//     if (is_day) search_results = await is_between_by(input, 'day');
//     else if (is_month) search_results = await is_between_by(input, 'month');
//     else if (is_year) search_results = await is_between_by(input, 'year');

//     display(search_results);
// }

// async function is_between_by(input: any, property :string) {
//     const store = await db.get('entries');
//     const first_moment = moment(input[0], date_input_formats);
//     const second_moment = moment(input[1], date_input_formats);

//     return store.filter((e: any) => {
//         if (moment(e.created, 'dddd, MMMM Do YYYY, h:mm:ss a').isBetween(first_moment, second_moment, property, '[]')) return e;
//     })
// }

// async function last(flag :any) {
//     const store = await db.get('entries');
//     const reg_ex = /(\d+)(\w+)/g
//     const n_dmwy = reg_ex.exec(flag);

//     if (flag === 'day' || flag === 'yesterday') search_results = store.filter((e: any) => {
//         if (moment(e.created, 'dddd, MMMM Do YYYY, h:mm:ss a').isSame(moment().subtract(1, 'days'), 'day')) return e;
//     })
//     else if (n_dmwy) search_results = store.filter((e: any) => {
//         if (moment(e.created, 'dddd, MMMM Do YYYY, h:mm:ss a').isSame(moment().subtract(n_dmwy[1], `${n_dmwy[2]}s`), n_dmwy[2])) return e;
//     })
//     else if (flag === 'week') search_results = store.filter((e: any) => {
//         if (moment(e.created, 'dddd, MMMM Do YYYY, h:mm:ss a').isSame(moment().subtract(1, 'weeks'), 'week')) return e;
//     })
//     else if (flag === 'month') search_results = store.filter((e: any) => {
//         if (moment(e.created, 'dddd, MMMM Do YYYY, h:mm:ss a').isSame(moment().subtract(1, 'months'), 'month')) return e;
//     })
//     else if (flag === 'year') search_results = store.filter((e: any) => {
//         if (moment(e.created, 'dddd, MMMM Do YYYY, h:mm:ss a').isSame(moment().subtract(1, 'years'), 'year')) return e;
//     })
//     else if (moment(flag, 'dddd', true).isValid()) search_results = store.filter((e: any) => {
//         if (moment(e.created, 'dddd, MMMM Do YYYY, h:mm:ss a').isSame(moment(flag, 'dddd').subtract(7, 'days'), 'day')) return e;
//     })

//     display(search_results);
// }

// async function search_by_text(flag :any) {
//     const store = await db.get('entries');
//     const search_results = store.filter((e: any) => {
//         if (e.text.toLowerCase().search(flag.toLowerCase()) !== -1) return e;
//     })

//     display(search_results);
// }

// async function search_by_tag(flag :any) {
//     const store = await db.get('entries');
//     const tagged_entries = store.filter((e: any) => e.tags.includes(flag));
//     if (tagged_entries.length) display(tagged_entries);
//     else console.log(`Couldn't find the tag "${flag}" anywhere.`);
// }

// Write
// async function write_entry(flag :any) {
//     let tags :any[] = [];
//     let reg_ex = /(@|#)(\w+)/g;
//     let tag :any;

//     do {
//         tag = reg_ex.exec(flag);
//         if (tag) tags.push(tag[2]);
//     } while (tag);
//     tags = [...new Set(tags)];
    
//     const store = await db.get('entries');

//     const set = flags.set;
//     const timeset = flags.timeset;
  
//     const write_moment = moment();
//     const date = set
//       ? moment(set, date_input_formats).format("YYYY-MM-DD")
//       : write_moment.format("YYYY-MM-DD");
//     const time = timeset
//       ? moment(timeset, time_input_formats).format("h:mm:ss a")
//       : write_moment.format("h:mm:ss a");
  
//     const created = moment(`${date} ${time}`, "YYYY-MM-DD h:mm:ss a").format(
//       "dddd, MMMM Do YYYY, h:mm:ss a",
//     );

//     const new_entry = { id: v4.generate(), text: flag, created, tags }
//     const updated_store = [new_entry, ...store];
//     await db.set('entries', updated_store);

//     if (tags.length !== 0) {
//         const tags_store = await db.get('tags');
//         tags.forEach(t => {
//             if (tags_store.includes(t)) tags = tags.filter(_t => _t !== t);
//         })
//         const updated_tags_store = [...tags, ...tags_store];
//         await db.set('tags', updated_tags_store); 
//     }

//     // display_today_entries();
//     display(await search.is_same(date));
//     // search for day where entry was added
// }

// async function edit_entry(flag :any) {
//     const store = await db.get('entries');
//     const entry = store.find((e: any) => e.id === flag);
//     if (entry) {
//         entry.text = args[0];
//         const semi_updated_store = store.filter((e: any) => e.id !== flag);
//         const updated_store =[entry, ...semi_updated_store];
//         await db.set('entries', updated_store);
        
//         // display_today_entries();
//         const date = moment(entry.created, 'dddd, MMMM Do YYYY, h:mm:ss a');
//         display(await search.is_same(date));
//         // search for day where entry was edited
//     } else console.log('Specified ID is incorrect.');
// }

// async function delete_entry(flag :any) {
//     const store = await db.get('entries');
//     const entry = store.find((e: any) => e.id === flag);
//     if (entry) {
//         const updated_store = store.filter((e: any) => e.id !== flag);
//         await db.set('entries', updated_store);
        
//         // display_today_entries();
//         // search for day where entry was deleted
//         const date = moment(entry.created, 'dddd, MMMM Do YYYY, h:mm:ss a');
//         display(await search.is_same(date));

//     } else console.log('Specified ID is incorrect.');
// }

// Export
// async function export_entries_md(flag :any) {
//     let markdown = new Markdown();
    
//     const export_time = moment().format('MMMM_Do_YYYY_h_mm_a');
//     const entries = await db.get('entries');
//     const entries_to_export = entries.map((e :any) => `[${e.created}]: ${e.text}.`)

//     await markdown
//         .header('Entries', 1)
//         .header(export_time, 3)
//         .list(entries_to_export, ListTypes.Ordered)
//         .quote('Generated by snippet-cli.')
//         .write('./', `snippet_cli_export_${export_time}`);
// }

// async function export_entries_json(flag: any) {
//     const export_time = moment().format('MMMM_Do_YYYY_h_mm_a');
//     await Deno.writeTextFile(`snippet_cli_export_${export_time}.json`, JSON.stringify(await db.get('entries')));
// }

// // Import
// async function import_entries(flag :any) {
//     await db.set('entries', JSON.parse(await Deno.readTextFile(flag)));
// }

// Extras
async function reset() { await db.clear() }

async function help() { console.log(h_help) }