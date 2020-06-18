# snippet-cli
An entry based journaling application for your console/terminal built in [Deno](https://deno.land).

# Usage
`snpt [OPTIONS] [INPUT]`

# Options
### Display
--today, --today
    Display today's entries.

-a, --all
    Display all entries since day one.

-v, --view <option>
    Specify how to display your entries.
    OPTIONS:
        - mini
        - compact
        - table
        - tree (default)

--tags, --tags
    Display a list of all your tags.

### Write
-w, --write <entry>
    Write a new entry

@ or #
    Use @ or # to create and use tags in your entries. (e.g. @deno #new_tag)

--set, -w <entry> --set <date>
    Specify a date when writing an entry.
    
--timeset, -w <entry> --timeset <time>
    Specify a time when writing an entry

-e, --edit <entry_id> <updated_entry_text>
    Edit an existing entry

-r, --remove <entry_id>
    Remove an entry, provide the ID

### Search
-d, --date
    Display entries for a specified date (See date formats below).

-s, --search
    Search entries by text.

-t, --tag
    Search entries by tag.

-f and -t, --from and --to
    Display entries between two specified dates. (See date formats below).

-l, --last
    A flexible way to go back in time to a specific day or any number of days, weeks, months or years.
    OPTIONS:
        - sunday, Monday, TUESDAY, and so on.
        - day, yeserday, 1day, 2day, 10day, 36day and so on.
        - week, 1week, 10week, 8week and so on.
        - month, 1month, 2month, 9month and so on.
        - year, 1year, 2year, 5year and so on.

### Import & Export
-m, --markdown
    Export your entries to a styled markdown file.

-j, --json
    Export your entries to a restorable JSON file.

-i, --import <json_file_path>
    Export your entries to a restorable JSON file.

### Extras
-c, --clear
    Clear everything and reset snippet.

-h, --help
    Display help to get started.

### Date Formats

- YYYY-MM-DD **(e.g. 2020-04-14)**
- DD-MM-YYYY **(e.g. 16-06-2020)**
- DD-MM-YY **(e.g. 16-06-20)**
- YY-MM-DD **(e.g. 20-06-16)**
- M-D **(e.g. 6-17, 06-17)**
- MM-YYYY **(e.g. 6-2020, 06-2020)**
- M **(e.g. 6, 06, 2, 4, 09, 12)**
- YYYY **(e.g. 2020, 2016)**
- YY **(e.g. 20, 18, 14, 98)**

### Time Formats
- h a (e.g. 6 am, 5pm)
- h:mm a (e.g. 5:02 am)
- h:mm (e.g. 16:04)
- h:mm:ss a (11:22:22 pm)

## Notes
- It is in active development, new features and fixes are being added regularly.
- A GUI version is in the works.
