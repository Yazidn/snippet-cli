import search from "./modules/find.ts";
import write from "./modules/modify.ts";
import { display, init_display } from "./modules/display.ts";
import { remove } from "./modules/remove.ts";
import import_export from "./modules/import_export.ts";
import extras from "./modules/extras.ts";
import _f from './modules/user_input.ts';

//   Display
init_display();

// Find
switch (true) {
  // By Text
  case Boolean(_f.find.by_text): {
    display(await search.by_text(_f.find.by_text), _f.find.by_text);
    break;
  }

  // By Tag
  case Boolean(_f.find.by_tag): {
    display(await search.by_tag(_f.find.by_tag), _f.find.by_tag);
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
    write.edit_entry(_f.modify._edit.edit, _f.modify._edit.args);
    break;
  }

  // Remove
  case Boolean(_f.modify._remove.remove): {
    remove(_f.modify._remove.remove, _f.modify._remove.sub);
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