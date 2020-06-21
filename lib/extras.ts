import db from "./database.ts";
import h_help from "./help.ts";

async function reset() {
  await db.clear();
}

async function help() {
  console.log(h_help);
}

async function set_view_mode(flag :any) {
  await db.set("view_mode", flag);
  console.log(`Default View Mode is: ${flag}`)
} 

const _extras = {
  set_view_mode,
  reset,
  help,
};

export default _extras;