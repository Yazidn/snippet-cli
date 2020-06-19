import db from "./database.ts";
import h_help from "./help.ts";

async function reset() {
  await db.clear();
}

async function help() {
  console.log(h_help);
}

const _extras = {
  reset,
  help,
};

export default _extras;