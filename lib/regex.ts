const _regex = {
    tag: /(@|#)(\w+)/g,
    last: /(\d*)(?<![A-Za-z])(day|week|month|year)/g,
    day: /(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/gi
};

export default _regex;