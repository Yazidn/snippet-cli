import { parse } from "https://deno.land/std/flags/mod.ts";

let flags = parse(Deno.args),
  args = flags._,
  input: any;

input = {
  display: {
    today: flags.today,
    all: flags.a || flags.all,
    tags: flags.tags,
    view: flags.v || flags.view
  },
  modify: {
    _write: {
      write: flags.w || flags.write,
      sub: {
        on: flags.on,
        at: flags.at,
        args,
      },
    },
    _edit: {
      edit: flags.e || flags.edit,
      args,
    },
    _remove: {
      remove: flags.r || flags.remove,
      sub: {
        today: flags.today,
        last: flags.l || flags.last,
        date: flags.d || flags.date,
        between: [flags.f || flags.from, flags.u || flags.until],
        all: flags.a || flags.all,
        recent: flags.recent,
        tag: flags.t || flags.tag,
        args,
      },
    },
  },
  find: {
    by_text: flags.s || flags.search,
    by_tag: flags.t || flags.tag,
    by_date: flags.d || flags.date,
    by_period: {
      from: flags.f || flags.from,
      until: flags.u || flags.until,
    },
    by_command: flags.l || flags.last,
  },
  import_export: {
    import: flags.i || flags.import,
    export_markdown: flags.m || flags.markdown,
    export_json: flags.j || flags.json,
  },
  extras: {
    set_default_view: flags.setview,
    help: flags.h || flags.help,
    clear: flags.c || flags.clear,
  },
};

export default input;