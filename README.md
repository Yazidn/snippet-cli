# snippet-cli
An entry based journaling application for your console/terminal built in [Deno](https://deno.land).

## Installation
1. You will need [Deno](https://deno.land) to install and run snippet.
2. Once you have Deno. Install snippet-cli by running the following command:
    - `deno install --allow-read --allow-write -n snpt https://raw.githubusercontent.com/Yazidn/snippet-cli/master/bundle/install.ts`
3. After you've added **.deno/bin** to your **$PATH**, you should be able to run `snpt` and see the following:
    - `Use -h or --help to get started.`

## Usage
- `snpt [OPTIONS] [INPUT]`

### Display
- Display today's entries. `--today`
- Display all entries since day one. `-a, --all`
- Specify how to display your entries. `-v, --view mini, compact, table, tree (default)`
- Display a list of all your tags. `--tags`

### Write
- Write a new entry. `-w, --write`
- Create and use tags. `@snippet, #snippet`
- Set the date and/or time of an entry. `--on <date>, --at <time>`
- Edit an entry. `-e, --edit <entry_id> <updated_entry_text>`
- Remove an entry. `-r, --remove <entry_id>`

### Search
- Display entries for a specified date *(See date formats below)*. `-d, --date`
- Search for an entry. `-s, --search`
- Filter entries by tag. `-t, --tag`
- Display entries between two specified dates. (See date formats below). `-f <date>, --from <date> & -u <date>, --until <date>`
- See entries from a specific day or any number of days, weeks, months or years back. `-l <option>, --last <option>`
    - Options:
        - sunday, Monday, TUESDAY, and so on.
        - day, yeserday, 1day, 2day, 10day, 36day and so on.
        - week, 1week, 10week, 8week and so on.
        - month, 1month, 2month, 9month and so on.
        - year, 1year, 2year, 5year and so on.

### Import & Export
- Export your entries to a styled markdown file. `-m, --markdown`
- Export your entries to a restorable JSON file. `-j, --json`
- Import your entries back. (You can only export and import entries at the moment, no tags.) `-i, --import <file>`

### Extras
- Clear everything and reset snippet. `-c, --clear`
- Display help to get started. `-h, --help`

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
- h a **(e.g. 6 am, 5pm)**
- h:mm a **(e.g. 5:02 am)**
- h:mm **(e.g. 16:04)**
- h:mm:ss a **(e.g. 11:22:22 pm)**

## Notes
- It is in active development, new features and fixes are being added regularly.
- A GUI version is in the works.