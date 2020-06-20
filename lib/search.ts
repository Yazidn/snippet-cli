import db from "./database.ts";
import { date_input_formats } from "./formats.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import regex from "./regex.ts";

async function is_same(input: any) {
  const is_day = moment(
    input,
    ["YYYY-MM-DD", "DD-MM-YYYY", "DD-MM-YY", "YY-MM-DD", "M-D", "D-M"],
    true
  ).isValid();

  const is_month = moment(input, ["MM-YYYY", "M", "MM"], true).isValid();
  const is_year = moment(input, ["YYYY", "YY", "Y"], true).isValid();

  if (is_day) return await is_same_by(input, "day");
  else if (is_month) return await is_same_by(input, "month");
  else if (is_year) return await is_same_by(input, "year");
}

async function is_same_by(input: any, property: string) {
  const input_to_moment = moment(input, date_input_formats);
  
  const store = await db.get("entries");
  return store.filter((e: any) => {
    if (
      moment(e.created, "dddd, MMMM Do YYYY, h:mm:ss a").isSame(
        input_to_moment,
        property
      )
    )
      return e;
  });
}

async function is_between(input: any) {
  const is_day =
    moment(
      input[0],
      ["YYYY-MM-DD", "DD-MM-YYYY", "DD-MM-YY", "YY-MM-DD", "M-D", "D-M"],
      true
    ).isValid() &&
    moment(
      input[1],
      ["YYYY-MM-DD", "DD-MM-YYYY", "DD-MM-YY", "YY-MM-DD", "M-D", "D-M"],
      true
    ).isValid();

  const is_month =
    moment(input[0], ["MM-YYYY", "M", "MM"], true).isValid() &&
    moment(input[1], ["MM-YYYY", "M", "MM"], true).isValid();

  const is_year =
    moment(input[0], ["YYYY", "YY", "Y"], true).isValid() &&
    moment(input[1], ["YYYY", "YY", "Y"], true).isValid();

  if (is_day) return await is_between_by(input, "day");
  else if (is_month) return await is_between_by(input, "month");
  else if (is_year) return await is_between_by(input, "year");
}

async function is_between_by(input: any, property: string) {
  const first_moment = moment(input[0], date_input_formats);
  const second_moment = moment(input[1], date_input_formats);
  
  const store = await db.get("entries");
  return store.filter((e: any) => {
    if (
      moment(e.created, "dddd, MMMM Do YYYY, h:mm:ss a").isBetween(
        first_moment,
        second_moment,
        property,
        "[]"
      )
    )
      return e;
  });
}

async function last(flag: any) {
  const is_day_of_week = regex.day.exec(flag);
  const is_command = regex.last.exec(flag);

  return await last_by(
    is_day_of_week ? 1 : is_command ? parseInt(is_command[1]) || 1 : 1,
    is_day_of_week ? "week" : is_command ? is_command[2] : flag,
    is_day_of_week ? flag : false
  );
}

async function last_by(number_of: number, what: string, flag?: any) {
  let _moment = !flag ? moment() : moment(flag, ["dddd", "ddd"]);
  
  const store = await db.get("entries");
  return store.filter((e: any) => {
    if (
      moment(e.created, "dddd, MMMM Do YYYY, h:mm:ss a").isSame(
        moment(_moment).subtract(number_of, `${what}s`),
        what
      )
    ) {
      console.log(e);
      return e;
    }
  });
}

async function search_by_text(flag: any) {
  const store = await db.get("entries");
  return store.filter((e: any) => {
    if (e.text.toLowerCase().search(flag.toLowerCase()) !== -1) return e;
  });
}

async function search_by_tag(flag: any) {
  const store = await db.get("entries");
  return store.filter((e: any) => e.tags.includes(flag));
}

const _search = {
  is_between,
  is_same,
  last,
  search_by_tag,
  search_by_text,
};

export default _search;
