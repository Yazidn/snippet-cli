import db from "./storage.ts";
import {
  date_input_formats,
  created_format,
  is_day_formats,
  is_month_formats,
  is_year_formats,
} from "./date_time_formats.ts";
import { moment } from "https://deno.land/x/moment/moment.ts";
import regex from "./regular_expressions.ts";

async function is_same(input: any) {
  const is_day = moment(input, is_day_formats, true).isValid();
  const is_month = moment(input, is_month_formats, true).isValid();
  const is_year = moment(input, is_year_formats, true).isValid();

  if (is_day) return await is_same_by(input, "day");
  else if (is_month) return await is_same_by(input, "month");
  else if (is_year) return await is_same_by(input, "year");
}

async function is_same_by(input: any, property: string) {
  const input_to_moment = moment(input, date_input_formats);

  const store = await db.get("entries");
  return store.filter((e: any) => {
    if (moment(e.created, created_format).isSame(input_to_moment, property))
      return e;
  });
}

async function is_between(input: any) {
  const is_day =
    moment(input[0], is_day_formats, true).isValid() &&
    moment(input[1], is_day_formats, true).isValid();

  const is_month =
    moment(input[0], is_month_formats, true).isValid() &&
    moment(input[1], is_month_formats, true).isValid();

  const is_year =
    moment(input[0], is_year_formats, true).isValid() &&
    moment(input[1], is_year_formats, true).isValid();

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
      moment(e.created, created_format).isBetween(
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
  const is_day_of_week = regex.rx_day_of_week.exec(flag);
  const is_command = regex.rx_command.exec(flag);

  return await last_by(
    is_day_of_week ? 7 : is_command ? parseInt(is_command[1]) || 1 : 1,
    is_day_of_week ? "day" : is_command ? is_command[2] : flag,
    is_day_of_week ? flag : false
  );
}

async function last_by(number_of: number, what: string, flag?: any) {
  const store = await db.get("entries");
  return store.filter((e: any) => {
    if (
      moment(e.created, created_format).isSame(
        moment(flag || [], flag ? ["dddd", "ddd"] : null).subtract(
          number_of,
          `${what}s`
        ),
        what
      )
    )
      return e;
  });
}

async function by_text(flag: any) {
  const store = await db.get("entries");
  return store.filter((e: any) => {
    if (e.text.toLowerCase().search(String(flag).toLowerCase()) !== -1)
      return e;
  });
}

async function by_tag(flag: any, args?: any) {
  const store = await db.get("entries");

  return store.filter((e: any) =>
    e.tags.some((t: string) => [flag, ...args].includes(t))
  );
}

const _search = {
  is_between,
  is_same,
  last,
  by_tag,
  by_text,
};

export default _search;