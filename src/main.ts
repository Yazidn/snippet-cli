import find from "./modules/find.ts";
import modify from "./modules/modify.ts";
import display from "./modules/display.ts";
import { remove } from "./modules/remove.ts";
import import_export from "./modules/import_export.ts";
import extras from "./modules/extras.ts";
import input from "./modules/user_input.ts";

switch (true) {
  case Boolean(input.find.by_text): {
    display.render(await find.by_text(input.find.by_text), input.find.by_text);
    break;
  }

  case Boolean(input.modify._edit.edit): {
    modify.edit(input.modify._edit.edit, input.modify._edit.sub);
    break;
  }

  case Boolean(input.find._by_tag.by_tag): {
    display.render(
      await find.by_tag(input.find._by_tag.by_tag, input.find._by_tag.args),
      input.find._by_tag.by_tag
    );
    break;
  }

  case Boolean(input.find.by_date): {
    display.render(await find.is_same(input.find.by_date), input.find.by_date);
    break;
  }

  case Boolean(input.find.by_command): {
    display.render(
      await find.last(input.find.by_command),
      input.find.by_command
    );
    break;
  }

  case Boolean(input.find.by_period.from && input.find.by_period.until): {
    display.render(
      await find.is_between([
        input.find.by_period.from,
        input.find.by_period.until,
      ]),
      `${input.find.by_period.from} ---> ${input.find.by_period.until}`
    );
    break;
  }

  case Boolean(
    input.modify._write.write || input.modify._write.sub.args.length
  ): {
    modify.write(input.modify._write.write, input.modify._write.sub);
    break;
  }

  case Boolean(input.modify._remove.remove): {
    remove(input.modify._remove.remove, input.modify._remove.sub);
    break;
  }

  case Boolean(input.display.all): {
    display.all();
    break;
  }

  case Boolean(input.display.today): {
    display.today();
    break;
  }

  case Boolean(input.display.tags): {
    display.tags();
    break;
  }

  case Boolean(input.import_export.import): {
    import_export.import_entries(input.import_export.import);
    break;
  }

  case Boolean(input.import_export.export_markdown): {
    import_export.export_entries_md(input.import_export.export_markdown);
    break;
  }

  case Boolean(input.import_export.export_text): {
    import_export.export_entries_text(input.import_export.export_text);
    break;
  }

  case Boolean(input.import_export.export_json): {
    import_export.export_entries_json(input.import_export.export_json);
    break;
  }

  case Boolean(input.extras.set_default_view): {
    extras.set_view_mode(input.extras.set_default_view);
    break;
  }

  case Boolean(input.extras.clear): {
    extras.reset();
    break;
  }

  case Boolean(input.extras.help): {
    extras.help();
    break;
  }

  default: {
    console.log("Use -h or --help to get started.");
    break;
  }
}
