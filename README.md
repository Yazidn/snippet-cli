# snippet-cli
An entry based journaling application for your terminal built in [Deno](https://deno.land).

### Latest code 
Check out the **[unstable](https://github.com/Yazidn/snippet-cli/tree/unstable)** branch.

## Installation
1. You will need [Deno](https://deno.land) to install and run snippet.

2. Once you have Deno. Install snippet-cli by running the following command:
    - **`deno install --allow-read --allow-write -n snpt https://raw.githubusercontent.com/Yazidn/snippet-cli/master/bundle/install.ts`**

3. After you've added **.deno/bin** to your **$PATH**, you should be able to run `snpt` and see the following:
    - `Use -h or --help to get started.`

## Usage
- `snpt [OPTIONS] [INPUT]`

### Display
- Display today's entries. `--today`
    - **e.g. `snpt --today`**

- Display all entries since day one. `-a, --all`
    - **e.g. snpt --all**

- Specify how to display your entries *(Optional)*. `-v <option>, --view <option>`
    - **Options:**
        - mini
        - compact
        - full
        - table
        - tree (default)
    - **e.g. `snpt --today -v mini`**

- Display a list of all your tags. `--tags`
    - **e.g. `snpt --today`**

### Write
- Write a new entry. `<entry>` *(Without using the -w flag)*
    - **e.g. `snpt Writing a quick entry!`** or **e.g. `snpt "Writing a quick entry!"`**
    - Note that when you don't don't wrap your entry in "<entry>" or '<entry>', you need to manually escape special characters like the apostrophe or a hash symbol when using tags. **(e.g. snpt i\'m writing an \#entry)**

- Write a new entry. `-w <entry>, --write <entry>`
    - **e.g. `snpt -w "snpt is awesome!"`**

- Create and use tags inside your entries. `@snippet, #snippet`
    - **e.g. `snpt -w "snpt is awesome! #snippet @great_apps"`**

- Set the date and/or time of an entry. `--on <date>, --at <time>`
    - **e.g. `snpt --w "Hello, world!" --on 12-2017 --at 8pm`**

- Edit an entry. `-e, --edit <entry_id> <updated_entry_text>`
    - **e.g. `snpt -e 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d "Hello again, world!"`**

- Edit the most recent entry. `-e --recent, --edit --recent <updated_entry_text>`
    - **e.g. `snpt -e --recent "Hello again, world!"`**

- Edit a tag. `-e @<tag> <updated_tag>, --edit @<tag> <updated_tag>`
    - **e.g. `snpt -e @summer winter`**

### Remove
- Remove an entry. `-r, --remove <entry_id>`
    - **e.g. `snpt -r 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d`**

- Remove latest entries. `-r --recent <number_of_entries>`
    - **e.g. `snpt -r --recent 1`**

- Remove today entries. `-r --today`
    - **e.g. `snpt -r --today`**

- Remove all entries. `-r --all`
    - **e.g. `snpt -r --all`**

- Remove entries from a specific date. `-r --date <date>`
    - **e.g. `snpt -r --date 6-2020`** *(Removes all entries from june 2020.)*
    - **e.g. `snpt -r --date 6-12`** *(Removes all entries from june 12th, 2020.)*

- Remove entries between 2 dates. `-r, --from <first_date> --until <second_date>`
    - **e.g. `snpt -r -f 1-2020 -u 3-2020`**

- Remove entries using --last command discussed below. `-r, --last <command>`
    - **e.g. `snpt -r --last thursday`**

### Search
- Display entries for a specified date *(See date formats below)*. `-d, --date`
    - **e.g. `snpt -d 2020-01-01`**

- Search for an entry. `-s <text>, --search <text>`
    - **e.g. `snpt -s hello`**

- Filter entries by tag. `-t <tag> <tag_2>.., --tag <tag_1> <tag_2>..`
    - **e.g. `snpt -t great_apps`**

- Display entries between two specified dates. (See date formats below). `-f <date>, --from <date> & -u <date>, --until <date>`
    - **e.g. `snpt --from 01-01 --until`01-16**

- See entries from a specific day or any number of days, weeks, months or years back. `-l <option>, --last <option>`
    - **Options:**
        - sunday, Monday, TUESDAY, and so on.
        - day, yeserday, 1day, 2day, 10day, 36day and so on.
        - week, 1week, 10week, 8week and so on.
        - month, 1month, 2month, 9month and so on.
        - year, 1year, 2year, 5year and so on.
    - **e.g. `snpt -l 11day`**
    - **e.g. `snpt --last monday`**

### Import & Export
- Export your entries to a styled markdown file. `-m, --markdown`
    - **e.g. `snpt --markdown`**

- Export your entries to a plain text file. (.txt) `-m, --markdown`
    - **e.g. `snpt --text`**

- Export your entries to a restorable JSON file. `-j, --json`
    - **e.g. `snpt --json`**

- Import your entries back. (You can only export and import entries at the moment, no tags.) `-i, --import <file>`
    - **e.g. `snpt -i backup.json`**

### Extras
- Clear everything and reset snippet. `-c, --clear`
    - **e.g. `snpt -c`**

- Display help to get started. `-h, --help`
    - **e.g. `snpt -h`**

### Date Formats & Time Formats
- YYYY-MM-DD **(e.g. 2020-01-01)**
- DD-MM-YYYY **(e.g. 01-01-2020)**
- DD-MM-YY **(e.g. 01-01-20)**
- YY-MM-DD **(e.g. 20-01-01)**
- M-D **(e.g. 1-01, 01-01)**
- MM-YYYY **(e.g. 01-2020, 01-2020)**
- M **(e.g. 1, 01, 12)**
- YYYY **(e.g. 2020, 2011)**
- YY **(e.g. 20, 18, 14, 99)**
- h a **(e.g. 6 am, 5pm)**
- h:mm a **(e.g. 5:02 am)**
- h:mm **(e.g. 16:04)**
- h:mm:ss a **(e.g. 11:22:22 pm)**
