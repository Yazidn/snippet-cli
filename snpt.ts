import search from "./lib/search.ts";
import write from "./lib/write.ts";
import { display, init_display } from "./lib/display.ts";
import { remove_entry } from "./lib/remove.ts";
import import_export from "./lib/import_export.ts";
import extras from "./lib/extras.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

let flags = parse(Deno.args),
  args = flags._,
  _f;

_f = {
  modify: {
    _write: {
      write: flags.w || flags.write,
      sub: {
        on: flags.on,
        at: flags.at,
        args,
      },
    },
    edit: flags.e || flags.edit,
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

//   Display
init_display();

// Find
switch (true) {
  // By Text
  case Boolean(_f.find.by_text): {
    display(await search.search_by_text(_f.find.by_text), _f.find.by_text);
    break;
  }

  // By Tag
  case Boolean(_f.find.by_tag): {
    display(await search.search_by_tag(_f.find.by_tag), _f.find.by_tag);
    break;
  }

  // By Date
  case Boolean(_f.find.by_date): {
    display(await search.is_same(_f.find.by_date), _f.find.by_date);
    break;
  }

  // By "Last" Command
  case Boolean(_f.find.by_command): {
    display(await search.last(_f.find.by_command), _f.find.by_command);
    break;
  }

  // By Time Period
  case Boolean(_f.find.by_period.from && _f.find.by_period.until): {
    display(
      await search.is_between([
        _f.find.by_period.from,
        _f.find.by_period.until,
      ]),
      `${_f.find.by_period.from} ---> ${_f.find.by_period.until}`
    );
    break;
  }
}

// Modify
switch (true) {
  // Write
  case Boolean(_f.modify._write.write): {
    write.write_entry(_f.modify._write.write, _f.modify._write.sub);
    break;
  }

  // Edit
  case Boolean(_f.modify.edit): {
    write.edit_entry(_f.modify.edit, args);
    break;
  }

  // Remove
  case Boolean(_f.modify._remove.remove): {
    remove_entry(_f.modify._remove.remove, _f.modify._remove.sub, args);
    break;
  }
}

// Import & Export
switch (true) {
  // Import
  case Boolean(_f.import_export.import): {
    import_export.import_entries(_f.import_export.import);
    break;
  }

  // Export Markdown
  case Boolean(_f.import_export.export_markdown): {
    import_export.export_entries_md(_f.import_export.export_markdown);
    break;
  }

  // Export JSON
  case Boolean(_f.import_export.export_json): {
    import_export.export_entries_json(_f.import_export.export_json);
    break;
  }
}

// Extras
switch (true) {
  // Set Default View
  case Boolean(_f.extras.set_default_view): {
    extras.set_view_mode(_f.extras.set_default_view);
    break;
  }

  // Reset
  case Boolean(_f.extras.clear): {
    extras.reset();
    break;
  }

  // Help
  case Boolean(_f.extras.help): {
    extras.help();
    break;
  }
}