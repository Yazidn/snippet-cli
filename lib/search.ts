import db from "./database.ts";
import { date_input_formats } from "./formats.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import regex from './regex.ts';

async function is_same(input: any) {
  let search_results: any[] = [];

  const is_day = moment(
    input,
    ["YYYY-MM-DD", "DD-MM-YYYY", "DD-MM-YY", "YY-MM-DD", "M-D", "D-M"],
    true
  ).isValid();

  const is_month = moment(input, ["MM-YYYY", "M", "MM"], true).isValid();
  const is_year = moment(input, ["YYYY", "YY", "Y"], true).isValid();

  if (is_day) search_results = await is_same_by(input, "day");
  else if (is_month) search_results = await is_same_by(input, "month");
  else if (is_year) search_results = await is_same_by(input, "year");

  return search_results;
}

async function is_same_by(input: any, property: string) {
  const store = await db.get("entries");
  const input_to_moment = moment(input, date_input_formats);

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
  let search_results: any[] = [];

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

  if (is_day) search_results = await is_between_by(input, "day");
  else if (is_month) search_results = await is_between_by(input, "month");
  else if (is_year) search_results = await is_between_by(input, "year");

  return search_results;
}

async function is_between_by(input: any, property: string) {
  const store = await db.get("entries");
  const first_moment = moment(input[0], date_input_formats);
  const second_moment = moment(input[1], date_input_formats);

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
  let search_results: any[] = [];

  let last_reg_ex = regex.last;
  let matches = last_reg_ex.exec(flag);
  let count;
  let property;

  if (matches ) {
    count = parseInt(matches[1]);
    property = matches[2];
    search_results = await last_by(false, count || 1, property + 's', property);
  } 

  const _day_reg_ex = regex.day;
  const day_matches = _day_reg_ex.exec(flag);
  let day;

  if (day_matches) {
    day = day_matches[0];
    search_results = await last_by(true, 7, 'days', 'day', flag);
  } 

  return search_results;
}

async function last_by(day :boolean, count: number, what: string, property: any, flag? :any) {
  const store = await db.get("entries");
  let _moment = !day? moment(): moment(flag, "dddd");

  console.log(count || 1, property + ('(s)'), 'ago');

  return store.filter((e: any) => {
    if (
      moment(e.created, "dddd, MMMM Do YYYY, h:mm:ss a").isSame(
        _moment.subtract(count, what),
        property
      )
    )
      return e;
  });
}

async function search_by_text(flag: any) {
  const store = await db.get("entries");
  let search_results: any[] = [];

  search_results = store.filter((e: any) => {
    if (e.text.toLowerCase().search(flag.toLowerCase()) !== -1) return e;
  });

  return search_results;
}

async function search_by_tag(flag: any) {
  let tagged_entries: any[] = [];

  const store = await db.get("entries");
  tagged_entries = store.filter((e: any) => e.tags.includes(flag));
  if (tagged_entries.length) return tagged_entries;
  else console.log(`Couldn't find the tag "${flag}" anywhere.`);
}

const _search = {
  is_between,
  is_same,
  last,
  search_by_tag,
  search_by_text,
};

export default _search;
