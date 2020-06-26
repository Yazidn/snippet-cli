import find from "./modules/find.ts";
import modify from "./modules/modify.ts";
import { display, init_display } from "./modules/display.ts";
import { remove } from "./modules/remove.ts";
import import_export from "./modules/import_export.ts";
import extras from "./modules/extras.ts";
import input from './modules/user_input.ts';

//   Display
init_display();

// Find
switch (true) {
  // By Text
  case Boolean(input.find.by_text): {
    display(await find.by_text(input.find.by_text), input.find.by_text);
    break;
  }

  // By Tag
  case Boolean(input.find.by_tag): {
    display(await find.by_tag(input.find.by_tag), input.find.by_tag);
    break;
  }

  // By Date
  case Boolean(input.find.by_date): {
    display(await find.is_same(input.find.by_date), input.find.by_date);
    break;
  }

  // By "Last" Command
  case Boolean(input.find.by_command): {
    display(await find.last(input.find.by_command), input.find.by_command);
    break;
  }

  // By Time Period
  case Boolean(input.find.by_period.from && input.find.by_period.until): {
    display(
      await find.is_between([
        input.find.by_period.from,
        input.find.by_period.until,
      ]),
      `${input.find.by_period.from} ---> ${input.find.by_period.until}`
    );
    break;
  }
}

// Modify
switch (true) {
  // Write
  case Boolean(input.modify._write.write): {
    modify.write(input.modify._write.write, input.modify._write.sub);
    break;
  }

  // Edit
  case Boolean(input.modify.edit): {
    modify.edit(input.modify._edit.edit, input.modify._edit.args);
    break;
  }

  // Remove
  case Boolean(input.modify._remove.remove): {
    remove(input.modify._remove.remove, input.modify._remove.sub);
    break;
  }
}

// Import & Export
switch (true) {
  
  // Import
  case Boolean(input.import_export.import): {
    import_export.import_entries(input.import_export.import);
    break;
  }

  // Export Markdown
  case Boolean(input.import_export.export_markdown): {
    import_export.export_entries_md(input.import_export.export_markdown);
    break;
  }

  // Export JSON
  case Boolean(input.import_export.export_json): {
    import_export.export_entries_json(input.import_export.export_json);
    break;
  }
}

// Extras
switch (true) {
  // Set Default View
  case Boolean(input.extras.set_default_view): {
    extras.set_view_mode(input.extras.set_default_view);
    break;
  }

  // Reset
  case Boolean(input.extras.clear): {
    extras.reset();
    break;
  }

  // Help
  case Boolean(input.extras.help): {
    extras.help();
    break;
  }
}