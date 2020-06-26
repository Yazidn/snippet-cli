import db from "./storage.ts";
import h_help from "./help.ts";

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

const _extras = {
  set_view_mode,
  reset,
  help,
};

export default _extras;