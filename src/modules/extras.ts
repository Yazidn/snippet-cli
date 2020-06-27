import db from "./storage.ts";
import h_help from "./help.ts";
import regex from './regular_expressions.ts';

async function reset() {
  await db.clear();
  await Deno.remove("./journals", { recursive: true });
  console.log("Starting from scratch..!");
}

async function help() {
  console.log(h_help);
}

async function set_view_mode(flag: any) {
  await db.set("view_mode", flag);
  console.log(`Default View Mode is: ${flag}`);
}

function extract_tags(text: string) {
  let tags: string[] = [];
  let is_tag: any;

  do {
    is_tag = regex.rx_tag.exec(text);
    if (is_tag) tags.push(is_tag[2]);
  } while (is_tag);
  tags = [...new Set(tags)];

  return tags;
}

const _extras = {
  set_view_mode,
  reset,
  help,
  extract_tags
};

export default _extras;