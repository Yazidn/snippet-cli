import db from './database.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import {date_input_formats, time_input_formats} from './formats.ts';
import { moment } from "https://deno.land/x/moment/moment.ts";
import search from './search.ts';
import {display} from './display.ts';

async function write_entry(flag :any, subflags :any) {
    let tags :any[] = [];
    let reg_ex = /(@|#)(\w+)/g;
    let tag :any;

    do {
        tag = reg_ex.exec(flag);
        if (tag) tags.push(tag[2]);
    } while (tag);
    tags = [...new Set(tags)];
    
    const store = await db.get('entries');

    const set = subflags.set;
    const timeset = subflags.timeset;
  
    const write_moment = moment();
    const date = set
      ? moment(set, date_input_formats).format("YYYY-MM-DD")
      : write_moment.format("YYYY-MM-DD");
    const time = timeset
      ? moment(timeset, time_input_formats).format("h:mm:ss a")
      : write_moment.format("h:mm:ss a");
  
    const created = moment(`${date} ${time}`, "YYYY-MM-DD h:mm:ss a").format(
      "dddd, MMMM Do YYYY, h:mm:ss a",
    );

    const new_entry = { id: v4.generate(), text: flag, created, tags }
    const updated_store = [new_entry, ...store];
    await db.set('entries', updated_store);

    if (tags.length !== 0) {
        const tags_store = await db.get('tags');
        tags.forEach(t => {
            if (tags_store.includes(t)) tags = tags.filter(_t => _t !== t);
        })
        const updated_tags_store = [...tags, ...tags_store];
        await db.set('tags', updated_tags_store); 
    }

    display(await search.is_same(date));
}

async function edit_entry(flag :any, args :any) {
    const store = await db.get('entries');
    const entry = store.find((e: any) => e.id === flag);
    if (entry) {
        entry.text = args[0];
        const semi_updated_store = store.filter((e: any) => e.id !== flag);
        const updated_store =[entry, ...semi_updated_store];
        await db.set('entries', updated_store);
        
        const date = moment(entry.created, 'dddd, MMMM Do YYYY, h:mm:ss a');
        display(await search.is_same(date));
    } else console.log('Specified ID is incorrect.');
}

async function remove_entry(flag :any) {
    const store = await db.get('entries');
    const entry = store.find((e: any) => e.id === flag);
    if (entry) {
        const updated_store = store.filter((e: any) => e.id !== flag);
        await db.set('entries', updated_store);
        
        const date = moment(entry.created, 'dddd, MMMM Do YYYY, h:mm:ss a');
        display(await search.is_same(date));
        
    } else console.log('Specified ID is incorrect.');
}

const _write = {
    write_entry,
    edit_entry,
    remove_entry
};

export default _write;