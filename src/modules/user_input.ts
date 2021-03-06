import { parse } from "https://deno.land/std/flags/mod.ts";

let flags = parse(Deno.args),
  args = flags._,
  input: any;

input = {
  display: {
    today: flags.today || flags.now,
    all: flags.a || flags.all,
    tags: flags.tags,
    view: flags.v || flags.view,
  },
  modify: {
    _write: {
      write: flags.w || flags.write,
      sub: {
        on: flags.on || flags.o,
        at: flags.at || flags.a,
        args,
      },
    },
    _edit: {
      edit: flags.e || flags.edit,
      sub: {
        recent: flags.recent,
        args,
      },
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
    _by_tag: {
      by_tag: flags.t || flags.tag,
      args,
    },
    by_date: flags.d || flags.date || flags.o || flags.on,
    by_period: {
      from: flags.f || flags.from,
      until: flags.u || flags.until,
    },
    by_command: flags.l || flags.last,
  },
  import_export: {
    import: flags.i || flags.import,
    export_markdown: flags.m || flags.markdown,
    export_text: flags.text,
    export_json: flags.j || flags.json,
  },
  extras: {
    set_default_view: flags.setview,
    help: flags.h || flags.help,
    clear: flags.c || flags.clear,
  },
};

export default input;