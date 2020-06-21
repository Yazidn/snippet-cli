const _regex = {
    rx_tag: /(@|#)(\w+)/g,
    rx_command: /(\d*)(?<![A-Za-z])(day|week|month|year)/g,
    rx_day_of_week: /(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/gi
};

export default _regex;