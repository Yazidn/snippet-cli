// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

// @ts-nocheck
/* eslint-disable */
let System, __instantiateAsync, __instantiate;

(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };

  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }

  __instantiateAsync = async (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExpA(m);
  };

  __instantiate = (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExp(m);
  };
})();

"use strict";
System.register(
  "https://deno.land/std@0.54.0/path/interface",
  [],
  function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register(
  "https://deno.land/std@0.54.0/path/_constants",
  [],
  function (exports_2, context_2) {
    "use strict";
    var build,
      CHAR_UPPERCASE_A,
      CHAR_LOWERCASE_A,
      CHAR_UPPERCASE_Z,
      CHAR_LOWERCASE_Z,
      CHAR_DOT,
      CHAR_FORWARD_SLASH,
      CHAR_BACKWARD_SLASH,
      CHAR_VERTICAL_LINE,
      CHAR_COLON,
      CHAR_QUESTION_MARK,
      CHAR_UNDERSCORE,
      CHAR_LINE_FEED,
      CHAR_CARRIAGE_RETURN,
      CHAR_TAB,
      CHAR_FORM_FEED,
      CHAR_EXCLAMATION_MARK,
      CHAR_HASH,
      CHAR_SPACE,
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_RIGHT_SQUARE_BRACKET,
      CHAR_LEFT_ANGLE_BRACKET,
      CHAR_RIGHT_ANGLE_BRACKET,
      CHAR_LEFT_CURLY_BRACKET,
      CHAR_RIGHT_CURLY_BRACKET,
      CHAR_HYPHEN_MINUS,
      CHAR_PLUS,
      CHAR_DOUBLE_QUOTE,
      CHAR_SINGLE_QUOTE,
      CHAR_PERCENT,
      CHAR_SEMICOLON,
      CHAR_CIRCUMFLEX_ACCENT,
      CHAR_GRAVE_ACCENT,
      CHAR_AT,
      CHAR_AMPERSAND,
      CHAR_EQUAL,
      CHAR_0,
      CHAR_9,
      isWindows,
      SEP,
      SEP_PATTERN;
    var __moduleName = context_2 && context_2.id;
    return {
      setters: [],
      execute: function () {
        build = Deno.build;
        // Alphabet chars.
        exports_2("CHAR_UPPERCASE_A", CHAR_UPPERCASE_A = 65); /* A */
        exports_2("CHAR_LOWERCASE_A", CHAR_LOWERCASE_A = 97); /* a */
        exports_2("CHAR_UPPERCASE_Z", CHAR_UPPERCASE_Z = 90); /* Z */
        exports_2("CHAR_LOWERCASE_Z", CHAR_LOWERCASE_Z = 122); /* z */
        // Non-alphabetic chars.
        exports_2("CHAR_DOT", CHAR_DOT = 46); /* . */
        exports_2("CHAR_FORWARD_SLASH", CHAR_FORWARD_SLASH = 47); /* / */
        exports_2("CHAR_BACKWARD_SLASH", CHAR_BACKWARD_SLASH = 92); /* \ */
        exports_2("CHAR_VERTICAL_LINE", CHAR_VERTICAL_LINE = 124); /* | */
        exports_2("CHAR_COLON", CHAR_COLON = 58); /* : */
        exports_2("CHAR_QUESTION_MARK", CHAR_QUESTION_MARK = 63); /* ? */
        exports_2("CHAR_UNDERSCORE", CHAR_UNDERSCORE = 95); /* _ */
        exports_2("CHAR_LINE_FEED", CHAR_LINE_FEED = 10); /* \n */
        exports_2("CHAR_CARRIAGE_RETURN", CHAR_CARRIAGE_RETURN = 13); /* \r */
        exports_2("CHAR_TAB", CHAR_TAB = 9); /* \t */
        exports_2("CHAR_FORM_FEED", CHAR_FORM_FEED = 12); /* \f */
        exports_2("CHAR_EXCLAMATION_MARK", CHAR_EXCLAMATION_MARK = 33); /* ! */
        exports_2("CHAR_HASH", CHAR_HASH = 35); /* # */
        exports_2("CHAR_SPACE", CHAR_SPACE = 32); /*   */
        exports_2(
          "CHAR_NO_BREAK_SPACE",
          CHAR_NO_BREAK_SPACE = 160,
        ); /* \u00A0 */
        exports_2(
          "CHAR_ZERO_WIDTH_NOBREAK_SPACE",
          CHAR_ZERO_WIDTH_NOBREAK_SPACE = 65279,
        ); /* \uFEFF */
        exports_2(
          "CHAR_LEFT_SQUARE_BRACKET",
          CHAR_LEFT_SQUARE_BRACKET = 91,
        ); /* [ */
        exports_2(
          "CHAR_RIGHT_SQUARE_BRACKET",
          CHAR_RIGHT_SQUARE_BRACKET = 93,
        ); /* ] */
        exports_2(
          "CHAR_LEFT_ANGLE_BRACKET",
          CHAR_LEFT_ANGLE_BRACKET = 60,
        ); /* < */
        exports_2(
          "CHAR_RIGHT_ANGLE_BRACKET",
          CHAR_RIGHT_ANGLE_BRACKET = 62,
        ); /* > */
        exports_2(
          "CHAR_LEFT_CURLY_BRACKET",
          CHAR_LEFT_CURLY_BRACKET = 123,
        ); /* { */
        exports_2(
          "CHAR_RIGHT_CURLY_BRACKET",
          CHAR_RIGHT_CURLY_BRACKET = 125,
        ); /* } */
        exports_2("CHAR_HYPHEN_MINUS", CHAR_HYPHEN_MINUS = 45); /* - */
        exports_2("CHAR_PLUS", CHAR_PLUS = 43); /* + */
        exports_2("CHAR_DOUBLE_QUOTE", CHAR_DOUBLE_QUOTE = 34); /* " */
        exports_2("CHAR_SINGLE_QUOTE", CHAR_SINGLE_QUOTE = 39); /* ' */
        exports_2("CHAR_PERCENT", CHAR_PERCENT = 37); /* % */
        exports_2("CHAR_SEMICOLON", CHAR_SEMICOLON = 59); /* ; */
        exports_2(
          "CHAR_CIRCUMFLEX_ACCENT",
          CHAR_CIRCUMFLEX_ACCENT = 94,
        ); /* ^ */
        exports_2("CHAR_GRAVE_ACCENT", CHAR_GRAVE_ACCENT = 96); /* ` */
        exports_2("CHAR_AT", CHAR_AT = 64); /* @ */
        exports_2("CHAR_AMPERSAND", CHAR_AMPERSAND = 38); /* & */
        exports_2("CHAR_EQUAL", CHAR_EQUAL = 61); /* = */
        // Digits
        exports_2("CHAR_0", CHAR_0 = 48); /* 0 */
        exports_2("CHAR_9", CHAR_9 = 57); /* 9 */
        isWindows = build.os == "windows";
        exports_2("SEP", SEP = isWindows ? "\\" : "/");
        exports_2("SEP_PATTERN", SEP_PATTERN = isWindows ? /[\\/]+/ : /\/+/);
      },
    };
  },
);
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register(
  "https://deno.land/std@0.54.0/path/_util",
  ["https://deno.land/std@0.54.0/path/_constants"],
  function (exports_3, context_3) {
    "use strict";
    var _constants_ts_1;
    var __moduleName = context_3 && context_3.id;
    function assertPath(path) {
      if (typeof path !== "string") {
        throw new TypeError(
          `Path must be a string. Received ${JSON.stringify(path)}`,
        );
      }
    }
    exports_3("assertPath", assertPath);
    function isPosixPathSeparator(code) {
      return code === _constants_ts_1.CHAR_FORWARD_SLASH;
    }
    exports_3("isPosixPathSeparator", isPosixPathSeparator);
    function isPathSeparator(code) {
      return isPosixPathSeparator(code) ||
        code === _constants_ts_1.CHAR_BACKWARD_SLASH;
    }
    exports_3("isPathSeparator", isPathSeparator);
    function isWindowsDeviceRoot(code) {
      return ((code >= _constants_ts_1.CHAR_LOWERCASE_A &&
        code <= _constants_ts_1.CHAR_LOWERCASE_Z) ||
        (code >= _constants_ts_1.CHAR_UPPERCASE_A &&
          code <= _constants_ts_1.CHAR_UPPERCASE_Z));
    }
    exports_3("isWindowsDeviceRoot", isWindowsDeviceRoot);
    // Resolves . and .. elements in a path with directory names
    function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
      let res = "";
      let lastSegmentLength = 0;
      let lastSlash = -1;
      let dots = 0;
      let code;
      for (let i = 0, len = path.length; i <= len; ++i) {
        if (i < len) {
          code = path.charCodeAt(i);
        } else if (isPathSeparator(code)) {
          break;
        } else {
          code = _constants_ts_1.CHAR_FORWARD_SLASH;
        }
        if (isPathSeparator(code)) {
          if (lastSlash === i - 1 || dots === 1) {
            // NOOP
          } else if (lastSlash !== i - 1 && dots === 2) {
            if (
              res.length < 2 ||
              lastSegmentLength !== 2 ||
              res.charCodeAt(res.length - 1) !== _constants_ts_1.CHAR_DOT ||
              res.charCodeAt(res.length - 2) !== _constants_ts_1.CHAR_DOT
            ) {
              if (res.length > 2) {
                const lastSlashIndex = res.lastIndexOf(separator);
                if (lastSlashIndex === -1) {
                  res = "";
                  lastSegmentLength = 0;
                } else {
                  res = res.slice(0, lastSlashIndex);
                  lastSegmentLength = res.length - 1 -
                    res.lastIndexOf(separator);
                }
                lastSlash = i;
                dots = 0;
                continue;
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0) {
                res += `${separator}..`;
              } else {
                res = "..";
              }
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0) {
              res += separator + path.slice(lastSlash + 1, i);
            } else {
              res = path.slice(lastSlash + 1, i);
            }
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === _constants_ts_1.CHAR_DOT && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    exports_3("normalizeString", normalizeString);
    function _format(sep, pathObject) {
      const dir = pathObject.dir || pathObject.root;
      const base = pathObject.base ||
        (pathObject.name || "") + (pathObject.ext || "");
      if (!dir) {
        return base;
      }
      if (dir === pathObject.root) {
        return dir + base;
      }
      return dir + sep + base;
    }
    exports_3("_format", _format);
    return {
      setters: [
        function (_constants_ts_1_1) {
          _constants_ts_1 = _constants_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
 * on npm.
 *
 * ```
 * import { bgBlue, red, bold } from "https://deno.land/std/fmt/colors.ts";
 * console.log(bgBlue(red(bold("Hello world!"))));
 * ```
 *
 * This module supports `NO_COLOR` environmental variable disabling any coloring
 * if `NO_COLOR` is set.
 *
 * This module is browser compatible. */
System.register(
  "https://deno.land/std@0.54.0/fmt/colors",
  [],
  function (exports_4, context_4) {
    "use strict";
    var noColor, enabled, ANSI_PATTERN;
    var __moduleName = context_4 && context_4.id;
    function setColorEnabled(value) {
      if (noColor) {
        return;
      }
      enabled = value;
    }
    exports_4("setColorEnabled", setColorEnabled);
    function getColorEnabled() {
      return enabled;
    }
    exports_4("getColorEnabled", getColorEnabled);
    function code(open, close) {
      return {
        open: `\x1b[${open.join(";")}m`,
        close: `\x1b[${close}m`,
        regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
      };
    }
    function run(str, code) {
      return enabled
        ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
        : str;
    }
    function reset(str) {
      return run(str, code([0], 0));
    }
    exports_4("reset", reset);
    function bold(str) {
      return run(str, code([1], 22));
    }
    exports_4("bold", bold);
    function dim(str) {
      return run(str, code([2], 22));
    }
    exports_4("dim", dim);
    function italic(str) {
      return run(str, code([3], 23));
    }
    exports_4("italic", italic);
    function underline(str) {
      return run(str, code([4], 24));
    }
    exports_4("underline", underline);
    function inverse(str) {
      return run(str, code([7], 27));
    }
    exports_4("inverse", inverse);
    function hidden(str) {
      return run(str, code([8], 28));
    }
    exports_4("hidden", hidden);
    function strikethrough(str) {
      return run(str, code([9], 29));
    }
    exports_4("strikethrough", strikethrough);
    function black(str) {
      return run(str, code([30], 39));
    }
    exports_4("black", black);
    function red(str) {
      return run(str, code([31], 39));
    }
    exports_4("red", red);
    function green(str) {
      return run(str, code([32], 39));
    }
    exports_4("green", green);
    function yellow(str) {
      return run(str, code([33], 39));
    }
    exports_4("yellow", yellow);
    function blue(str) {
      return run(str, code([34], 39));
    }
    exports_4("blue", blue);
    function magenta(str) {
      return run(str, code([35], 39));
    }
    exports_4("magenta", magenta);
    function cyan(str) {
      return run(str, code([36], 39));
    }
    exports_4("cyan", cyan);
    function white(str) {
      return run(str, code([37], 39));
    }
    exports_4("white", white);
    function gray(str) {
      return run(str, code([90], 39));
    }
    exports_4("gray", gray);
    function bgBlack(str) {
      return run(str, code([40], 49));
    }
    exports_4("bgBlack", bgBlack);
    function bgRed(str) {
      return run(str, code([41], 49));
    }
    exports_4("bgRed", bgRed);
    function bgGreen(str) {
      return run(str, code([42], 49));
    }
    exports_4("bgGreen", bgGreen);
    function bgYellow(str) {
      return run(str, code([43], 49));
    }
    exports_4("bgYellow", bgYellow);
    function bgBlue(str) {
      return run(str, code([44], 49));
    }
    exports_4("bgBlue", bgBlue);
    function bgMagenta(str) {
      return run(str, code([45], 49));
    }
    exports_4("bgMagenta", bgMagenta);
    function bgCyan(str) {
      return run(str, code([46], 49));
    }
    exports_4("bgCyan", bgCyan);
    function bgWhite(str) {
      return run(str, code([47], 49));
    }
    exports_4("bgWhite", bgWhite);
    /* Special Color Sequences */
    function clampAndTruncate(n, max = 255, min = 0) {
      return Math.trunc(Math.max(Math.min(n, max), min));
    }
    /** Set text color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit */
    function rgb8(str, color) {
      return run(str, code([38, 5, clampAndTruncate(color)], 39));
    }
    exports_4("rgb8", rgb8);
    /** Set background color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit */
    function bgRgb8(str, color) {
      return run(str, code([48, 5, clampAndTruncate(color)], 49));
    }
    exports_4("bgRgb8", bgRgb8);
    /** Set text color using 24bit rgb.
     * `color` can be a number in range `0x000000` to `0xffffff` or
     * an `Rgb`.
     *
     * To produce the color magenta:
     *
     *      rgba24("foo", 0xff00ff);
     *      rgba24("foo", {r: 255, g: 0, b: 255});
     */
    function rgb24(str, color) {
      if (typeof color === "number") {
        return run(
          str,
          code(
            [38, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff],
            39,
          ),
        );
      }
      return run(
        str,
        code([
          38,
          2,
          clampAndTruncate(color.r),
          clampAndTruncate(color.g),
          clampAndTruncate(color.b),
        ], 39),
      );
    }
    exports_4("rgb24", rgb24);
    /** Set background color using 24bit rgb.
     * `color` can be a number in range `0x000000` to `0xffffff` or
     * an `Rgb`.
     *
     * To produce the color magenta:
     *
     *      bgRgba24("foo", 0xff00ff);
     *      bgRgba24("foo", {r: 255, g: 0, b: 255});
     */
    function bgRgb24(str, color) {
      if (typeof color === "number") {
        return run(
          str,
          code(
            [48, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff],
            49,
          ),
        );
      }
      return run(
        str,
        code([
          48,
          2,
          clampAndTruncate(color.r),
          clampAndTruncate(color.g),
          clampAndTruncate(color.b),
        ], 49),
      );
    }
    exports_4("bgRgb24", bgRgb24);
    function stripColor(string) {
      return string.replace(ANSI_PATTERN, "");
    }
    exports_4("stripColor", stripColor);
    return {
      setters: [],
      execute: function () {
        noColor = globalThis.Deno?.noColor ?? true;
        enabled = !noColor;
        // https://github.com/chalk/ansi-regex/blob/2b56fb0c7a07108e5b54241e8faec160d393aedb/index.js
        ANSI_PATTERN = new RegExp(
          [
            "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
            "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
          ].join("|"),
          "g",
        );
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** This module is browser compatible. */
System.register(
  "https://deno.land/std@0.54.0/testing/diff",
  [],
  function (exports_5, context_5) {
    "use strict";
    var DiffType, REMOVED, COMMON, ADDED;
    var __moduleName = context_5 && context_5.id;
    function createCommon(A, B, reverse) {
      const common = [];
      if (A.length === 0 || B.length === 0) {
        return [];
      }
      for (let i = 0; i < Math.min(A.length, B.length); i += 1) {
        if (
          A[reverse ? A.length - i - 1 : i] ===
            B[reverse ? B.length - i - 1 : i]
        ) {
          common.push(A[reverse ? A.length - i - 1 : i]);
        } else {
          return common;
        }
      }
      return common;
    }
    function diff(A, B) {
      const prefixCommon = createCommon(A, B);
      const suffixCommon = createCommon(
        A.slice(prefixCommon.length),
        B.slice(prefixCommon.length),
        true,
      ).reverse();
      A = suffixCommon.length
        ? A.slice(prefixCommon.length, -suffixCommon.length)
        : A.slice(prefixCommon.length);
      B = suffixCommon.length
        ? B.slice(prefixCommon.length, -suffixCommon.length)
        : B.slice(prefixCommon.length);
      const swapped = B.length > A.length;
      [A, B] = swapped ? [B, A] : [A, B];
      const M = A.length;
      const N = B.length;
      if (!M && !N && !suffixCommon.length && !prefixCommon.length) {
        return [];
      }
      if (!N) {
        return [
          ...prefixCommon.map((c) => ({ type: DiffType.common, value: c })),
          ...A.map((a) => ({
            type: swapped ? DiffType.added : DiffType.removed,
            value: a,
          })),
          ...suffixCommon.map((c) => ({ type: DiffType.common, value: c })),
        ];
      }
      const offset = N;
      const delta = M - N;
      const size = M + N + 1;
      const fp = new Array(size).fill({ y: -1 });
      /**
         * INFO:
         * This buffer is used to save memory and improve performance.
         * The first half is used to save route and last half is used to save diff
         * type.
         * This is because, when I kept new uint8array area to save type,performance
         * worsened.
         */
      const routes = new Uint32Array((M * N + size + 1) * 2);
      const diffTypesPtrOffset = routes.length / 2;
      let ptr = 0;
      let p = -1;
      function backTrace(A, B, current, swapped) {
        const M = A.length;
        const N = B.length;
        const result = [];
        let a = M - 1;
        let b = N - 1;
        let j = routes[current.id];
        let type = routes[current.id + diffTypesPtrOffset];
        while (true) {
          if (!j && !type) {
            break;
          }
          const prev = j;
          if (type === REMOVED) {
            result.unshift({
              type: swapped ? DiffType.removed : DiffType.added,
              value: B[b],
            });
            b -= 1;
          } else if (type === ADDED) {
            result.unshift({
              type: swapped ? DiffType.added : DiffType.removed,
              value: A[a],
            });
            a -= 1;
          } else {
            result.unshift({ type: DiffType.common, value: A[a] });
            a -= 1;
            b -= 1;
          }
          j = routes[prev];
          type = routes[prev + diffTypesPtrOffset];
        }
        return result;
      }
      function createFP(slide, down, k, M) {
        if (slide && slide.y === -1 && down && down.y === -1) {
          return { y: 0, id: 0 };
        }
        if (
          (down && down.y === -1) ||
          k === M ||
          (slide && slide.y) > (down && down.y) + 1
        ) {
          const prev = slide.id;
          ptr++;
          routes[ptr] = prev;
          routes[ptr + diffTypesPtrOffset] = ADDED;
          return { y: slide.y, id: ptr };
        } else {
          const prev = down.id;
          ptr++;
          routes[ptr] = prev;
          routes[ptr + diffTypesPtrOffset] = REMOVED;
          return { y: down.y + 1, id: ptr };
        }
      }
      function snake(k, slide, down, _offset, A, B) {
        const M = A.length;
        const N = B.length;
        if (k < -N || M < k) {
          return { y: -1, id: -1 };
        }
        const fp = createFP(slide, down, k, M);
        while (fp.y + k < M && fp.y < N && A[fp.y + k] === B[fp.y]) {
          const prev = fp.id;
          ptr++;
          fp.id = ptr;
          fp.y += 1;
          routes[ptr] = prev;
          routes[ptr + diffTypesPtrOffset] = COMMON;
        }
        return fp;
      }
      while (fp[delta + offset].y < N) {
        p = p + 1;
        for (let k = -p; k < delta; ++k) {
          fp[k + offset] = snake(
            k,
            fp[k - 1 + offset],
            fp[k + 1 + offset],
            offset,
            A,
            B,
          );
        }
        for (let k = delta + p; k > delta; --k) {
          fp[k + offset] = snake(
            k,
            fp[k - 1 + offset],
            fp[k + 1 + offset],
            offset,
            A,
            B,
          );
        }
        fp[delta + offset] = snake(
          delta,
          fp[delta - 1 + offset],
          fp[delta + 1 + offset],
          offset,
          A,
          B,
        );
      }
      return [
        ...prefixCommon.map((c) => ({ type: DiffType.common, value: c })),
        ...backTrace(A, B, fp[delta + offset], swapped),
        ...suffixCommon.map((c) => ({ type: DiffType.common, value: c })),
      ];
    }
    exports_5("default", diff);
    return {
      setters: [],
      execute: function () {
        (function (DiffType) {
          DiffType["removed"] = "removed";
          DiffType["common"] = "common";
          DiffType["added"] = "added";
        })(DiffType || (DiffType = {}));
        exports_5("DiffType", DiffType);
        REMOVED = 1;
        COMMON = 2;
        ADDED = 3;
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** This module is browser compatible. Do not rely on good formatting of values
 * for AssertionError messages in browsers. */
System.register(
  "https://deno.land/std@0.54.0/testing/asserts",
  [
    "https://deno.land/std@0.54.0/fmt/colors",
    "https://deno.land/std@0.54.0/testing/diff",
  ],
  function (exports_6, context_6) {
    "use strict";
    var colors_ts_1, diff_ts_1, CAN_NOT_DISPLAY, AssertionError;
    var __moduleName = context_6 && context_6.id;
    function format(v) {
      let string = globalThis.Deno ? Deno.inspect(v) : String(v);
      if (typeof v == "string") {
        string = `"${string.replace(/(?=["\\])/g, "\\")}"`;
      }
      return string;
    }
    function createColor(diffType) {
      switch (diffType) {
        case diff_ts_1.DiffType.added:
          return (s) => colors_ts_1.green(colors_ts_1.bold(s));
        case diff_ts_1.DiffType.removed:
          return (s) => colors_ts_1.red(colors_ts_1.bold(s));
        default:
          return colors_ts_1.white;
      }
    }
    function createSign(diffType) {
      switch (diffType) {
        case diff_ts_1.DiffType.added:
          return "+   ";
        case diff_ts_1.DiffType.removed:
          return "-   ";
        default:
          return "    ";
      }
    }
    function buildMessage(diffResult) {
      const messages = [];
      messages.push("");
      messages.push("");
      messages.push(
        `    ${colors_ts_1.gray(colors_ts_1.bold("[Diff]"))} ${
          colors_ts_1.red(colors_ts_1.bold("Actual"))
        } / ${colors_ts_1.green(colors_ts_1.bold("Expected"))}`,
      );
      messages.push("");
      messages.push("");
      diffResult.forEach((result) => {
        const c = createColor(result.type);
        messages.push(c(`${createSign(result.type)}${result.value}`));
      });
      messages.push("");
      return messages;
    }
    function isKeyedCollection(x) {
      return [Symbol.iterator, "size"].every((k) => k in x);
    }
    function equal(c, d) {
      const seen = new Map();
      return (function compare(a, b) {
        // Have to render RegExp & Date for string comparison
        // unless it's mistreated as object
        if (
          a &&
          b &&
          ((a instanceof RegExp && b instanceof RegExp) ||
            (a instanceof Date && b instanceof Date))
        ) {
          return String(a) === String(b);
        }
        if (Object.is(a, b)) {
          return true;
        }
        if (a && typeof a === "object" && b && typeof b === "object") {
          if (seen.get(a) === b) {
            return true;
          }
          if (Object.keys(a || {}).length !== Object.keys(b || {}).length) {
            return false;
          }
          if (isKeyedCollection(a) && isKeyedCollection(b)) {
            if (a.size !== b.size) {
              return false;
            }
            let unmatchedEntries = a.size;
            for (const [aKey, aValue] of a.entries()) {
              for (const [bKey, bValue] of b.entries()) {
                /* Given that Map keys can be references, we need
                             * to ensure that they are also deeply equal */
                if (
                  (aKey === aValue && bKey === bValue && compare(aKey, bKey)) ||
                  (compare(aKey, bKey) && compare(aValue, bValue))
                ) {
                  unmatchedEntries--;
                }
              }
            }
            return unmatchedEntries === 0;
          }
          const merged = { ...a, ...b };
          for (const key in merged) {
            if (!compare(a && a[key], b && b[key])) {
              return false;
            }
          }
          seen.set(a, b);
          return true;
        }
        return false;
      })(c, d);
    }
    exports_6("equal", equal);
    /** Make an assertion, if not `true`, then throw. */
    function assert(expr, msg = "") {
      if (!expr) {
        throw new AssertionError(msg);
      }
    }
    exports_6("assert", assert);
    /**
     * Make an assertion that `actual` and `expected` are equal, deeply. If not
     * deeply equal, then throw.
     */
    function assertEquals(actual, expected, msg) {
      if (equal(actual, expected)) {
        return;
      }
      let message = "";
      const actualString = format(actual);
      const expectedString = format(expected);
      try {
        const diffResult = diff_ts_1.default(
          actualString.split("\n"),
          expectedString.split("\n"),
        );
        const diffMsg = buildMessage(diffResult).join("\n");
        message = `Values are not equal:\n${diffMsg}`;
      } catch (e) {
        message = `\n${colors_ts_1.red(CAN_NOT_DISPLAY)} + \n\n`;
      }
      if (msg) {
        message = msg;
      }
      throw new AssertionError(message);
    }
    exports_6("assertEquals", assertEquals);
    /**
     * Make an assertion that `actual` and `expected` are not equal, deeply.
     * If not then throw.
     */
    function assertNotEquals(actual, expected, msg) {
      if (!equal(actual, expected)) {
        return;
      }
      let actualString;
      let expectedString;
      try {
        actualString = String(actual);
      } catch (e) {
        actualString = "[Cannot display]";
      }
      try {
        expectedString = String(expected);
      } catch (e) {
        expectedString = "[Cannot display]";
      }
      if (!msg) {
        msg = `actual: ${actualString} expected: ${expectedString}`;
      }
      throw new AssertionError(msg);
    }
    exports_6("assertNotEquals", assertNotEquals);
    /**
     * Make an assertion that `actual` and `expected` are strictly equal.  If
     * not then throw.
     */
    function assertStrictEq(actual, expected, msg) {
      if (actual === expected) {
        return;
      }
      let message;
      if (msg) {
        message = msg;
      } else {
        const actualString = format(actual);
        const expectedString = format(expected);
        if (actualString === expectedString) {
          const withOffset = actualString
            .split("\n")
            .map((l) => `     ${l}`)
            .join("\n");
          message =
            `Values have the same structure but are not reference-equal:\n\n${
              colors_ts_1.red(withOffset)
            }\n`;
        } else {
          try {
            const diffResult = diff_ts_1.default(
              actualString.split("\n"),
              expectedString.split("\n"),
            );
            const diffMsg = buildMessage(diffResult).join("\n");
            message = `Values are not strictly equal:\n${diffMsg}`;
          } catch (e) {
            message = `\n${colors_ts_1.red(CAN_NOT_DISPLAY)} + \n\n`;
          }
        }
      }
      throw new AssertionError(message);
    }
    exports_6("assertStrictEq", assertStrictEq);
    /**
     * Make an assertion that actual contains expected. If not
     * then thrown.
     */
    function assertStrContains(actual, expected, msg) {
      if (!actual.includes(expected)) {
        if (!msg) {
          msg = `actual: "${actual}" expected to contain: "${expected}"`;
        }
        throw new AssertionError(msg);
      }
    }
    exports_6("assertStrContains", assertStrContains);
    /**
     * Make an assertion that `actual` contains the `expected` values
     * If not then thrown.
     */
    function assertArrayContains(actual, expected, msg) {
      const missing = [];
      for (let i = 0; i < expected.length; i++) {
        let found = false;
        for (let j = 0; j < actual.length; j++) {
          if (equal(expected[i], actual[j])) {
            found = true;
            break;
          }
        }
        if (!found) {
          missing.push(expected[i]);
        }
      }
      if (missing.length === 0) {
        return;
      }
      if (!msg) {
        msg = `actual: "${actual}" expected to contain: "${expected}"`;
        msg += "\n";
        msg += `missing: ${missing}`;
      }
      throw new AssertionError(msg);
    }
    exports_6("assertArrayContains", assertArrayContains);
    /**
     * Make an assertion that `actual` match RegExp `expected`. If not
     * then thrown
     */
    function assertMatch(actual, expected, msg) {
      if (!expected.test(actual)) {
        if (!msg) {
          msg = `actual: "${actual}" expected to match: "${expected}"`;
        }
        throw new AssertionError(msg);
      }
    }
    exports_6("assertMatch", assertMatch);
    /**
     * Forcefully throws a failed assertion
     */
    function fail(msg) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      assert(false, `Failed assertion${msg ? `: ${msg}` : "."}`);
    }
    exports_6("fail", fail);
    /** Executes a function, expecting it to throw.  If it does not, then it
     * throws.  An error class and a string that should be included in the
     * error message can also be asserted.
     */
    function assertThrows(fn, ErrorClass, msgIncludes = "", msg) {
      let doesThrow = false;
      let error = null;
      try {
        fn();
      } catch (e) {
        if (
          ErrorClass && !(Object.getPrototypeOf(e) === ErrorClass.prototype)
        ) {
          msg =
            `Expected error to be instance of "${ErrorClass.name}", but was "${e.constructor.name}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        if (msgIncludes && !e.message.includes(msgIncludes)) {
          msg =
            `Expected error message to include "${msgIncludes}", but got "${e.message}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        doesThrow = true;
        error = e;
      }
      if (!doesThrow) {
        msg = `Expected function to throw${msg ? `: ${msg}` : "."}`;
        throw new AssertionError(msg);
      }
      return error;
    }
    exports_6("assertThrows", assertThrows);
    async function assertThrowsAsync(fn, ErrorClass, msgIncludes = "", msg) {
      let doesThrow = false;
      let error = null;
      try {
        await fn();
      } catch (e) {
        if (
          ErrorClass && !(Object.getPrototypeOf(e) === ErrorClass.prototype)
        ) {
          msg =
            `Expected error to be instance of "${ErrorClass.name}", but got "${e.name}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        if (msgIncludes && !e.message.includes(msgIncludes)) {
          msg =
            `Expected error message to include "${msgIncludes}", but got "${e.message}"${
              msg ? `: ${msg}` : "."
            }`;
          throw new AssertionError(msg);
        }
        doesThrow = true;
        error = e;
      }
      if (!doesThrow) {
        msg = `Expected function to throw${msg ? `: ${msg}` : "."}`;
        throw new AssertionError(msg);
      }
      return error;
    }
    exports_6("assertThrowsAsync", assertThrowsAsync);
    /** Use this to stub out methods that will throw when invoked. */
    function unimplemented(msg) {
      throw new AssertionError(msg || "unimplemented");
    }
    exports_6("unimplemented", unimplemented);
    /** Use this to assert unreachable code. */
    function unreachable() {
      throw new AssertionError("unreachable");
    }
    exports_6("unreachable", unreachable);
    return {
      setters: [
        function (colors_ts_1_1) {
          colors_ts_1 = colors_ts_1_1;
        },
        function (diff_ts_1_1) {
          diff_ts_1 = diff_ts_1_1;
        },
      ],
      execute: function () {
        CAN_NOT_DISPLAY = "[Cannot display]";
        AssertionError = class AssertionError extends Error {
          constructor(message) {
            super(message);
            this.name = "AssertionError";
          }
        };
        exports_6("AssertionError", AssertionError);
      },
    };
  },
);
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register(
  "https://deno.land/std@0.54.0/path/win32",
  [
    "https://deno.land/std@0.54.0/path/_constants",
    "https://deno.land/std@0.54.0/path/_util",
    "https://deno.land/std@0.54.0/testing/asserts",
  ],
  function (exports_7, context_7) {
    "use strict";
    var cwd, env, _constants_ts_2, _util_ts_1, asserts_ts_1, sep, delimiter;
    var __moduleName = context_7 && context_7.id;
    function resolve(...pathSegments) {
      let resolvedDevice = "";
      let resolvedTail = "";
      let resolvedAbsolute = false;
      for (let i = pathSegments.length - 1; i >= -1; i--) {
        let path;
        if (i >= 0) {
          path = pathSegments[i];
        } else if (!resolvedDevice) {
          path = cwd();
        } else {
          // Windows has the concept of drive-specific current working
          // directories. If we've resolved a drive letter but not yet an
          // absolute path, get cwd for that drive, or the process cwd if
          // the drive cwd is not available. We're sure the device is not
          // a UNC path at this points, because UNC paths are always absolute.
          path = env.get(`=${resolvedDevice}`) || cwd();
          // Verify that a cwd was found and that it actually points
          // to our drive. If not, default to the drive's root.
          if (
            path === undefined ||
            path.slice(0, 3).toLowerCase() !==
              `${resolvedDevice.toLowerCase()}\\`
          ) {
            path = `${resolvedDevice}\\`;
          }
        }
        _util_ts_1.assertPath(path);
        const len = path.length;
        // Skip empty entries
        if (len === 0) {
          continue;
        }
        let rootEnd = 0;
        let device = "";
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        // Try to match a root
        if (len > 1) {
          if (_util_ts_1.isPathSeparator(code)) {
            // Possible UNC root
            // If we started with a separator, we know we at least have an
            // absolute path of some kind (UNC or otherwise)
            isAbsolute = true;
            if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
              // Matched double path separator at beginning
              let j = 2;
              let last = j;
              // Match 1 or more non-path separators
              for (; j < len; ++j) {
                if (_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                  break;
                }
              }
              if (j < len && j !== last) {
                const firstPart = path.slice(last, j);
                // Matched!
                last = j;
                // Match 1 or more path separators
                for (; j < len; ++j) {
                  if (!_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                    break;
                  }
                }
                if (j < len && j !== last) {
                  // Matched!
                  last = j;
                  // Match 1 or more non-path separators
                  for (; j < len; ++j) {
                    if (_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                      break;
                    }
                  }
                  if (j === len) {
                    // We matched a UNC root only
                    device = `\\\\${firstPart}\\${path.slice(last)}`;
                    rootEnd = j;
                  } else if (j !== last) {
                    // We matched a UNC root with leftovers
                    device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                    rootEnd = j;
                  }
                }
              }
            } else {
              rootEnd = 1;
            }
          } else if (_util_ts_1.isWindowsDeviceRoot(code)) {
            // Possible device root
            if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
              device = path.slice(0, 2);
              rootEnd = 2;
              if (len > 2) {
                if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
                  // Treat separator following drive name as an absolute path
                  // indicator
                  isAbsolute = true;
                  rootEnd = 3;
                }
              }
            }
          }
        } else if (_util_ts_1.isPathSeparator(code)) {
          // `path` contains just a path separator
          rootEnd = 1;
          isAbsolute = true;
        }
        if (
          device.length > 0 &&
          resolvedDevice.length > 0 &&
          device.toLowerCase() !== resolvedDevice.toLowerCase()
        ) {
          // This path points to another device so it is not applicable
          continue;
        }
        if (resolvedDevice.length === 0 && device.length > 0) {
          resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
          resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
          resolvedAbsolute = isAbsolute;
        }
        if (resolvedAbsolute && resolvedDevice.length > 0) {
          break;
        }
      }
      // At this point the path should be resolved to a full absolute path,
      // but handle relative paths to be safe (might happen when process.cwd()
      // fails)
      // Normalize the tail path
      resolvedTail = _util_ts_1.normalizeString(
        resolvedTail,
        !resolvedAbsolute,
        "\\",
        _util_ts_1.isPathSeparator,
      );
      return resolvedDevice + (resolvedAbsolute ? "\\" : "") + resolvedTail ||
        ".";
    }
    exports_7("resolve", resolve);
    function normalize(path) {
      _util_ts_1.assertPath(path);
      const len = path.length;
      if (len === 0) {
        return ".";
      }
      let rootEnd = 0;
      let device;
      let isAbsolute = false;
      const code = path.charCodeAt(0);
      // Try to match a root
      if (len > 1) {
        if (_util_ts_1.isPathSeparator(code)) {
          // Possible UNC root
          // If we started with a separator, we know we at least have an absolute
          // path of some kind (UNC or otherwise)
          isAbsolute = true;
          if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
            // Matched double path separator at beginning
            let j = 2;
            let last = j;
            // Match 1 or more non-path separators
            for (; j < len; ++j) {
              if (_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                break;
              }
            }
            if (j < len && j !== last) {
              const firstPart = path.slice(last, j);
              // Matched!
              last = j;
              // Match 1 or more path separators
              for (; j < len; ++j) {
                if (!_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                  break;
                }
              }
              if (j < len && j !== last) {
                // Matched!
                last = j;
                // Match 1 or more non-path separators
                for (; j < len; ++j) {
                  if (_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                    break;
                  }
                }
                if (j === len) {
                  // We matched a UNC root only
                  // Return the normalized version of the UNC root since there
                  // is nothing left to process
                  return `\\\\${firstPart}\\${path.slice(last)}\\`;
                } else if (j !== last) {
                  // We matched a UNC root with leftovers
                  device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                  rootEnd = j;
                }
              }
            }
          } else {
            rootEnd = 1;
          }
        } else if (_util_ts_1.isWindowsDeviceRoot(code)) {
          // Possible device root
          if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
            device = path.slice(0, 2);
            rootEnd = 2;
            if (len > 2) {
              if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
                // Treat separator following drive name as an absolute path
                // indicator
                isAbsolute = true;
                rootEnd = 3;
              }
            }
          }
        }
      } else if (_util_ts_1.isPathSeparator(code)) {
        // `path` contains just a path separator, exit early to avoid unnecessary
        // work
        return "\\";
      }
      let tail;
      if (rootEnd < len) {
        tail = _util_ts_1.normalizeString(
          path.slice(rootEnd),
          !isAbsolute,
          "\\",
          _util_ts_1.isPathSeparator,
        );
      } else {
        tail = "";
      }
      if (tail.length === 0 && !isAbsolute) {
        tail = ".";
      }
      if (
        tail.length > 0 &&
        _util_ts_1.isPathSeparator(path.charCodeAt(len - 1))
      ) {
        tail += "\\";
      }
      if (device === undefined) {
        if (isAbsolute) {
          if (tail.length > 0) {
            return `\\${tail}`;
          } else {
            return "\\";
          }
        } else if (tail.length > 0) {
          return tail;
        } else {
          return "";
        }
      } else if (isAbsolute) {
        if (tail.length > 0) {
          return `${device}\\${tail}`;
        } else {
          return `${device}\\`;
        }
      } else if (tail.length > 0) {
        return device + tail;
      } else {
        return device;
      }
    }
    exports_7("normalize", normalize);
    function isAbsolute(path) {
      _util_ts_1.assertPath(path);
      const len = path.length;
      if (len === 0) {
        return false;
      }
      const code = path.charCodeAt(0);
      if (_util_ts_1.isPathSeparator(code)) {
        return true;
      } else if (_util_ts_1.isWindowsDeviceRoot(code)) {
        // Possible device root
        if (len > 2 && path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
          if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
            return true;
          }
        }
      }
      return false;
    }
    exports_7("isAbsolute", isAbsolute);
    function join(...paths) {
      const pathsCount = paths.length;
      if (pathsCount === 0) {
        return ".";
      }
      let joined;
      let firstPart = null;
      for (let i = 0; i < pathsCount; ++i) {
        const path = paths[i];
        _util_ts_1.assertPath(path);
        if (path.length > 0) {
          if (joined === undefined) {
            joined = firstPart = path;
          } else {
            joined += `\\${path}`;
          }
        }
      }
      if (joined === undefined) {
        return ".";
      }
      // Make sure that the joined path doesn't start with two slashes, because
      // normalize() will mistake it for an UNC path then.
      //
      // This step is skipped when it is very clear that the user actually
      // intended to point at an UNC path. This is assumed when the first
      // non-empty string arguments starts with exactly two slashes followed by
      // at least one more non-slash character.
      //
      // Note that for normalize() to treat a path as an UNC path it needs to
      // have at least 2 components, so we don't filter for that here.
      // This means that the user can use join to construct UNC paths from
      // a server name and a share name; for example:
      //   path.join('//server', 'share') -> '\\\\server\\share\\')
      let needsReplace = true;
      let slashCount = 0;
      asserts_ts_1.assert(firstPart != null);
      if (_util_ts_1.isPathSeparator(firstPart.charCodeAt(0))) {
        ++slashCount;
        const firstLen = firstPart.length;
        if (firstLen > 1) {
          if (_util_ts_1.isPathSeparator(firstPart.charCodeAt(1))) {
            ++slashCount;
            if (firstLen > 2) {
              if (_util_ts_1.isPathSeparator(firstPart.charCodeAt(2))) {
                ++slashCount;
              } else {
                // We matched a UNC path in the first part
                needsReplace = false;
              }
            }
          }
        }
      }
      if (needsReplace) {
        // Find any more consecutive slashes we need to replace
        for (; slashCount < joined.length; ++slashCount) {
          if (!_util_ts_1.isPathSeparator(joined.charCodeAt(slashCount))) {
            break;
          }
        }
        // Replace the slashes if needed
        if (slashCount >= 2) {
          joined = `\\${joined.slice(slashCount)}`;
        }
      }
      return normalize(joined);
    }
    exports_7("join", join);
    // It will solve the relative path from `from` to `to`, for instance:
    //  from = 'C:\\orandea\\test\\aaa'
    //  to = 'C:\\orandea\\impl\\bbb'
    // The output of the function should be: '..\\..\\impl\\bbb'
    function relative(from, to) {
      _util_ts_1.assertPath(from);
      _util_ts_1.assertPath(to);
      if (from === to) {
        return "";
      }
      const fromOrig = resolve(from);
      const toOrig = resolve(to);
      if (fromOrig === toOrig) {
        return "";
      }
      from = fromOrig.toLowerCase();
      to = toOrig.toLowerCase();
      if (from === to) {
        return "";
      }
      // Trim any leading backslashes
      let fromStart = 0;
      let fromEnd = from.length;
      for (; fromStart < fromEnd; ++fromStart) {
        if (
          from.charCodeAt(fromStart) !== _constants_ts_2.CHAR_BACKWARD_SLASH
        ) {
          break;
        }
      }
      // Trim trailing backslashes (applicable to UNC paths only)
      for (; fromEnd - 1 > fromStart; --fromEnd) {
        if (
          from.charCodeAt(fromEnd - 1) !== _constants_ts_2.CHAR_BACKWARD_SLASH
        ) {
          break;
        }
      }
      const fromLen = fromEnd - fromStart;
      // Trim any leading backslashes
      let toStart = 0;
      let toEnd = to.length;
      for (; toStart < toEnd; ++toStart) {
        if (to.charCodeAt(toStart) !== _constants_ts_2.CHAR_BACKWARD_SLASH) {
          break;
        }
      }
      // Trim trailing backslashes (applicable to UNC paths only)
      for (; toEnd - 1 > toStart; --toEnd) {
        if (to.charCodeAt(toEnd - 1) !== _constants_ts_2.CHAR_BACKWARD_SLASH) {
          break;
        }
      }
      const toLen = toEnd - toStart;
      // Compare paths to find the longest common path from root
      const length = fromLen < toLen ? fromLen : toLen;
      let lastCommonSep = -1;
      let i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (
              to.charCodeAt(toStart + i) === _constants_ts_2.CHAR_BACKWARD_SLASH
            ) {
              // We get here if `from` is the exact base path for `to`.
              // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
              return toOrig.slice(toStart + i + 1);
            } else if (i === 2) {
              // We get here if `from` is the device root.
              // For example: from='C:\\'; to='C:\\foo'
              return toOrig.slice(toStart + i);
            }
          }
          if (fromLen > length) {
            if (
              from.charCodeAt(fromStart + i) ===
                _constants_ts_2.CHAR_BACKWARD_SLASH
            ) {
              // We get here if `to` is the exact base path for `from`.
              // For example: from='C:\\foo\\bar'; to='C:\\foo'
              lastCommonSep = i;
            } else if (i === 2) {
              // We get here if `to` is the device root.
              // For example: from='C:\\foo\\bar'; to='C:\\'
              lastCommonSep = 3;
            }
          }
          break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) {
          break;
        } else if (fromCode === _constants_ts_2.CHAR_BACKWARD_SLASH) {
          lastCommonSep = i;
        }
      }
      // We found a mismatch before the first common path separator was seen, so
      // return the original `to`.
      if (i !== length && lastCommonSep === -1) {
        return toOrig;
      }
      let out = "";
      if (lastCommonSep === -1) {
        lastCommonSep = 0;
      }
      // Generate the relative path based on the path difference between `to` and
      // `from`
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (
          i === fromEnd ||
          from.charCodeAt(i) === _constants_ts_2.CHAR_BACKWARD_SLASH
        ) {
          if (out.length === 0) {
            out += "..";
          } else {
            out += "\\..";
          }
        }
      }
      // Lastly, append the rest of the destination (`to`) path that comes after
      // the common path parts
      if (out.length > 0) {
        return out + toOrig.slice(toStart + lastCommonSep, toEnd);
      } else {
        toStart += lastCommonSep;
        if (
          toOrig.charCodeAt(toStart) === _constants_ts_2.CHAR_BACKWARD_SLASH
        ) {
          ++toStart;
        }
        return toOrig.slice(toStart, toEnd);
      }
    }
    exports_7("relative", relative);
    function toNamespacedPath(path) {
      // Note: this will *probably* throw somewhere.
      if (typeof path !== "string") {
        return path;
      }
      if (path.length === 0) {
        return "";
      }
      const resolvedPath = resolve(path);
      if (resolvedPath.length >= 3) {
        if (
          resolvedPath.charCodeAt(0) === _constants_ts_2.CHAR_BACKWARD_SLASH
        ) {
          // Possible UNC root
          if (
            resolvedPath.charCodeAt(1) === _constants_ts_2.CHAR_BACKWARD_SLASH
          ) {
            const code = resolvedPath.charCodeAt(2);
            if (
              code !== _constants_ts_2.CHAR_QUESTION_MARK &&
              code !== _constants_ts_2.CHAR_DOT
            ) {
              // Matched non-long UNC root, convert the path to a long UNC path
              return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
            }
          }
        } else if (_util_ts_1.isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
          // Possible device root
          if (
            resolvedPath.charCodeAt(1) === _constants_ts_2.CHAR_COLON &&
            resolvedPath.charCodeAt(2) === _constants_ts_2.CHAR_BACKWARD_SLASH
          ) {
            // Matched device root, convert the path to a long UNC path
            return `\\\\?\\${resolvedPath}`;
          }
        }
      }
      return path;
    }
    exports_7("toNamespacedPath", toNamespacedPath);
    function dirname(path) {
      _util_ts_1.assertPath(path);
      const len = path.length;
      if (len === 0) {
        return ".";
      }
      let rootEnd = -1;
      let end = -1;
      let matchedSlash = true;
      let offset = 0;
      const code = path.charCodeAt(0);
      // Try to match a root
      if (len > 1) {
        if (_util_ts_1.isPathSeparator(code)) {
          // Possible UNC root
          rootEnd = offset = 1;
          if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
            // Matched double path separator at beginning
            let j = 2;
            let last = j;
            // Match 1 or more non-path separators
            for (; j < len; ++j) {
              if (_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                break;
              }
            }
            if (j < len && j !== last) {
              // Matched!
              last = j;
              // Match 1 or more path separators
              for (; j < len; ++j) {
                if (!_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                  break;
                }
              }
              if (j < len && j !== last) {
                // Matched!
                last = j;
                // Match 1 or more non-path separators
                for (; j < len; ++j) {
                  if (_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                    break;
                  }
                }
                if (j === len) {
                  // We matched a UNC root only
                  return path;
                }
                if (j !== last) {
                  // We matched a UNC root with leftovers
                  // Offset by 1 to include the separator after the UNC root to
                  // treat it as a "normal root" on top of a (UNC) root
                  rootEnd = offset = j + 1;
                }
              }
            }
          }
        } else if (_util_ts_1.isWindowsDeviceRoot(code)) {
          // Possible device root
          if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
            rootEnd = offset = 2;
            if (len > 2) {
              if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
                rootEnd = offset = 3;
              }
            }
          }
        }
      } else if (_util_ts_1.isPathSeparator(code)) {
        // `path` contains just a path separator, exit early to avoid
        // unnecessary work
        return path;
      }
      for (let i = len - 1; i >= offset; --i) {
        if (_util_ts_1.isPathSeparator(path.charCodeAt(i))) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          // We saw the first non-path separator
          matchedSlash = false;
        }
      }
      if (end === -1) {
        if (rootEnd === -1) {
          return ".";
        } else {
          end = rootEnd;
        }
      }
      return path.slice(0, end);
    }
    exports_7("dirname", dirname);
    function basename(path, ext = "") {
      if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
      }
      _util_ts_1.assertPath(path);
      let start = 0;
      let end = -1;
      let matchedSlash = true;
      let i;
      // Check for a drive letter prefix so as not to mistake the following
      // path separator as an extra separator at the end of the path that can be
      // disregarded
      if (path.length >= 2) {
        const drive = path.charCodeAt(0);
        if (_util_ts_1.isWindowsDeviceRoot(drive)) {
          if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
            start = 2;
          }
        }
      }
      if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) {
          return "";
        }
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= start; --i) {
          const code = path.charCodeAt(i);
          if (_util_ts_1.isPathSeparator(code)) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              // We saw the first non-path separator, remember this index in case
              // we need it if the extension ends up not matching
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              // Try to match the explicit extension
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  // We matched the extension, so mark this as the end of our path
                  // component
                  end = i;
                }
              } else {
                // Extension does not match, so our result is the entire path
                // component
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) {
          end = firstNonSlashEnd;
        } else if (end === -1) {
          end = path.length;
        }
        return path.slice(start, end);
      } else {
        for (i = path.length - 1; i >= start; --i) {
          if (_util_ts_1.isPathSeparator(path.charCodeAt(i))) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            // We saw the first non-path separator, mark this as the end of our
            // path component
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1) {
          return "";
        }
        return path.slice(start, end);
      }
    }
    exports_7("basename", basename);
    function extname(path) {
      _util_ts_1.assertPath(path);
      let start = 0;
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      // Track the state of characters (if any) we see before our first dot and
      // after any path separator we find
      let preDotState = 0;
      // Check for a drive letter prefix so as not to mistake the following
      // path separator as an extra separator at the end of the path that can be
      // disregarded
      if (
        path.length >= 2 &&
        path.charCodeAt(1) === _constants_ts_2.CHAR_COLON &&
        _util_ts_1.isWindowsDeviceRoot(path.charCodeAt(0))
      ) {
        start = startPart = 2;
      }
      for (let i = path.length - 1; i >= start; --i) {
        const code = path.charCodeAt(i);
        if (_util_ts_1.isPathSeparator(code)) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // extension
          matchedSlash = false;
          end = i + 1;
        }
        if (code === _constants_ts_2.CHAR_DOT) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          // We saw a non-dot and non-path separator before our dot, so we should
          // have a good chance at having a non-empty extension
          preDotState = -1;
        }
      }
      if (
        startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 && startDot === end - 1 &&
          startDot === startPart + 1)
      ) {
        return "";
      }
      return path.slice(startDot, end);
    }
    exports_7("extname", extname);
    function format(pathObject) {
      /* eslint-disable max-len */
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(
          `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`,
        );
      }
      return _util_ts_1._format("\\", pathObject);
    }
    exports_7("format", format);
    function parse(path) {
      _util_ts_1.assertPath(path);
      const ret = { root: "", dir: "", base: "", ext: "", name: "" };
      const len = path.length;
      if (len === 0) {
        return ret;
      }
      let rootEnd = 0;
      let code = path.charCodeAt(0);
      // Try to match a root
      if (len > 1) {
        if (_util_ts_1.isPathSeparator(code)) {
          // Possible UNC root
          rootEnd = 1;
          if (_util_ts_1.isPathSeparator(path.charCodeAt(1))) {
            // Matched double path separator at beginning
            let j = 2;
            let last = j;
            // Match 1 or more non-path separators
            for (; j < len; ++j) {
              if (_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                break;
              }
            }
            if (j < len && j !== last) {
              // Matched!
              last = j;
              // Match 1 or more path separators
              for (; j < len; ++j) {
                if (!_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                  break;
                }
              }
              if (j < len && j !== last) {
                // Matched!
                last = j;
                // Match 1 or more non-path separators
                for (; j < len; ++j) {
                  if (_util_ts_1.isPathSeparator(path.charCodeAt(j))) {
                    break;
                  }
                }
                if (j === len) {
                  // We matched a UNC root only
                  rootEnd = j;
                } else if (j !== last) {
                  // We matched a UNC root with leftovers
                  rootEnd = j + 1;
                }
              }
            }
          }
        } else if (_util_ts_1.isWindowsDeviceRoot(code)) {
          // Possible device root
          if (path.charCodeAt(1) === _constants_ts_2.CHAR_COLON) {
            rootEnd = 2;
            if (len > 2) {
              if (_util_ts_1.isPathSeparator(path.charCodeAt(2))) {
                if (len === 3) {
                  // `path` contains just a drive root, exit early to avoid
                  // unnecessary work
                  ret.root = ret.dir = path;
                  return ret;
                }
                rootEnd = 3;
              }
            } else {
              // `path` contains just a drive root, exit early to avoid
              // unnecessary work
              ret.root = ret.dir = path;
              return ret;
            }
          }
        }
      } else if (_util_ts_1.isPathSeparator(code)) {
        // `path` contains just a path separator, exit early to avoid
        // unnecessary work
        ret.root = ret.dir = path;
        return ret;
      }
      if (rootEnd > 0) {
        ret.root = path.slice(0, rootEnd);
      }
      let startDot = -1;
      let startPart = rootEnd;
      let end = -1;
      let matchedSlash = true;
      let i = path.length - 1;
      // Track the state of characters (if any) we see before our first dot and
      // after any path separator we find
      let preDotState = 0;
      // Get non-dir info
      for (; i >= rootEnd; --i) {
        code = path.charCodeAt(i);
        if (_util_ts_1.isPathSeparator(code)) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // extension
          matchedSlash = false;
          end = i + 1;
        }
        if (code === _constants_ts_2.CHAR_DOT) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          // We saw a non-dot and non-path separator before our dot, so we should
          // have a good chance at having a non-empty extension
          preDotState = -1;
        }
      }
      if (
        startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 && startDot === end - 1 &&
          startDot === startPart + 1)
      ) {
        if (end !== -1) {
          ret.base = ret.name = path.slice(startPart, end);
        }
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
        ret.ext = path.slice(startDot, end);
      }
      // If the directory is the root, use the entire root as the `dir` including
      // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
      // trailing slash (`C:\abc\def` -> `C:\abc`).
      if (startPart > 0 && startPart !== rootEnd) {
        ret.dir = path.slice(0, startPart - 1);
      } else {
        ret.dir = ret.root;
      }
      return ret;
    }
    exports_7("parse", parse);
    /** Converts a file URL to a path string.
     *
     *      fromFileUrl("file:///C:/Users/foo"); // "C:\\Users\\foo"
     *      fromFileUrl("file:///home/foo"); // "\\home\\foo"
     *
     * Note that non-file URLs are treated as file URLs and irrelevant components
     * are ignored.
     */
    function fromFileUrl(url) {
      return new URL(url).pathname
        .replace(/^\/*([A-Za-z]:)(\/|$)/, "$1/")
        .replace(/\//g, "\\");
    }
    exports_7("fromFileUrl", fromFileUrl);
    return {
      setters: [
        function (_constants_ts_2_1) {
          _constants_ts_2 = _constants_ts_2_1;
        },
        function (_util_ts_1_1) {
          _util_ts_1 = _util_ts_1_1;
        },
        function (asserts_ts_1_1) {
          asserts_ts_1 = asserts_ts_1_1;
        },
      ],
      execute: function () {
        cwd = Deno.cwd, env = Deno.env;
        exports_7("sep", sep = "\\");
        exports_7("delimiter", delimiter = ";");
      },
    };
  },
);
// Copyright the Browserify authors. MIT License.
// Ported from https://github.com/browserify/path-browserify/
System.register(
  "https://deno.land/std@0.54.0/path/posix",
  [
    "https://deno.land/std@0.54.0/path/_constants",
    "https://deno.land/std@0.54.0/path/_util",
  ],
  function (exports_8, context_8) {
    "use strict";
    var cwd, _constants_ts_3, _util_ts_2, sep, delimiter;
    var __moduleName = context_8 && context_8.id;
    // path.resolve([from ...], to)
    function resolve(...pathSegments) {
      let resolvedPath = "";
      let resolvedAbsolute = false;
      for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        let path;
        if (i >= 0) {
          path = pathSegments[i];
        } else {
          path = cwd();
        }
        _util_ts_2.assertPath(path);
        // Skip empty entries
        if (path.length === 0) {
          continue;
        }
        resolvedPath = `${path}/${resolvedPath}`;
        resolvedAbsolute =
          path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
      }
      // At this point the path should be resolved to a full absolute path, but
      // handle relative paths to be safe (might happen when process.cwd() fails)
      // Normalize the path
      resolvedPath = _util_ts_2.normalizeString(
        resolvedPath,
        !resolvedAbsolute,
        "/",
        _util_ts_2.isPosixPathSeparator,
      );
      if (resolvedAbsolute) {
        if (resolvedPath.length > 0) {
          return `/${resolvedPath}`;
        } else {
          return "/";
        }
      } else if (resolvedPath.length > 0) {
        return resolvedPath;
      } else {
        return ".";
      }
    }
    exports_8("resolve", resolve);
    function normalize(path) {
      _util_ts_2.assertPath(path);
      if (path.length === 0) {
        return ".";
      }
      const isAbsolute =
        path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
      const trailingSeparator =
        path.charCodeAt(path.length - 1) === _constants_ts_3.CHAR_FORWARD_SLASH;
      // Normalize the path
      path = _util_ts_2.normalizeString(
        path,
        !isAbsolute,
        "/",
        _util_ts_2.isPosixPathSeparator,
      );
      if (path.length === 0 && !isAbsolute) {
        path = ".";
      }
      if (path.length > 0 && trailingSeparator) {
        path += "/";
      }
      if (isAbsolute) {
        return `/${path}`;
      }
      return path;
    }
    exports_8("normalize", normalize);
    function isAbsolute(path) {
      _util_ts_2.assertPath(path);
      return path.length > 0 &&
        path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
    }
    exports_8("isAbsolute", isAbsolute);
    function join(...paths) {
      if (paths.length === 0) {
        return ".";
      }
      let joined;
      for (let i = 0, len = paths.length; i < len; ++i) {
        const path = paths[i];
        _util_ts_2.assertPath(path);
        if (path.length > 0) {
          if (!joined) {
            joined = path;
          } else {
            joined += `/${path}`;
          }
        }
      }
      if (!joined) {
        return ".";
      }
      return normalize(joined);
    }
    exports_8("join", join);
    function relative(from, to) {
      _util_ts_2.assertPath(from);
      _util_ts_2.assertPath(to);
      if (from === to) {
        return "";
      }
      from = resolve(from);
      to = resolve(to);
      if (from === to) {
        return "";
      }
      // Trim any leading backslashes
      let fromStart = 1;
      const fromEnd = from.length;
      for (; fromStart < fromEnd; ++fromStart) {
        if (from.charCodeAt(fromStart) !== _constants_ts_3.CHAR_FORWARD_SLASH) {
          break;
        }
      }
      const fromLen = fromEnd - fromStart;
      // Trim any leading backslashes
      let toStart = 1;
      const toEnd = to.length;
      for (; toStart < toEnd; ++toStart) {
        if (to.charCodeAt(toStart) !== _constants_ts_3.CHAR_FORWARD_SLASH) {
          break;
        }
      }
      const toLen = toEnd - toStart;
      // Compare paths to find the longest common path from root
      const length = fromLen < toLen ? fromLen : toLen;
      let lastCommonSep = -1;
      let i = 0;
      for (; i <= length; ++i) {
        if (i === length) {
          if (toLen > length) {
            if (
              to.charCodeAt(toStart + i) === _constants_ts_3.CHAR_FORWARD_SLASH
            ) {
              // We get here if `from` is the exact base path for `to`.
              // For example: from='/foo/bar'; to='/foo/bar/baz'
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
              // We get here if `from` is the root
              // For example: from='/'; to='/foo'
              return to.slice(toStart + i);
            }
          } else if (fromLen > length) {
            if (
              from.charCodeAt(fromStart + i) ===
                _constants_ts_3.CHAR_FORWARD_SLASH
            ) {
              // We get here if `to` is the exact base path for `from`.
              // For example: from='/foo/bar/baz'; to='/foo/bar'
              lastCommonSep = i;
            } else if (i === 0) {
              // We get here if `to` is the root.
              // For example: from='/foo'; to='/'
              lastCommonSep = 0;
            }
          }
          break;
        }
        const fromCode = from.charCodeAt(fromStart + i);
        const toCode = to.charCodeAt(toStart + i);
        if (fromCode !== toCode) {
          break;
        } else if (fromCode === _constants_ts_3.CHAR_FORWARD_SLASH) {
          lastCommonSep = i;
        }
      }
      let out = "";
      // Generate the relative path based on the path difference between `to`
      // and `from`
      for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
        if (
          i === fromEnd ||
          from.charCodeAt(i) === _constants_ts_3.CHAR_FORWARD_SLASH
        ) {
          if (out.length === 0) {
            out += "..";
          } else {
            out += "/..";
          }
        }
      }
      // Lastly, append the rest of the destination (`to`) path that comes after
      // the common path parts
      if (out.length > 0) {
        return out + to.slice(toStart + lastCommonSep);
      } else {
        toStart += lastCommonSep;
        if (to.charCodeAt(toStart) === _constants_ts_3.CHAR_FORWARD_SLASH) {
          ++toStart;
        }
        return to.slice(toStart);
      }
    }
    exports_8("relative", relative);
    function toNamespacedPath(path) {
      // Non-op on posix systems
      return path;
    }
    exports_8("toNamespacedPath", toNamespacedPath);
    function dirname(path) {
      _util_ts_2.assertPath(path);
      if (path.length === 0) {
        return ".";
      }
      const hasRoot = path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
      let end = -1;
      let matchedSlash = true;
      for (let i = path.length - 1; i >= 1; --i) {
        if (path.charCodeAt(i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          // We saw the first non-path separator
          matchedSlash = false;
        }
      }
      if (end === -1) {
        return hasRoot ? "/" : ".";
      }
      if (hasRoot && end === 1) {
        return "//";
      }
      return path.slice(0, end);
    }
    exports_8("dirname", dirname);
    function basename(path, ext = "") {
      if (ext !== undefined && typeof ext !== "string") {
        throw new TypeError('"ext" argument must be a string');
      }
      _util_ts_2.assertPath(path);
      let start = 0;
      let end = -1;
      let matchedSlash = true;
      let i;
      if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
        if (ext.length === path.length && ext === path) {
          return "";
        }
        let extIdx = ext.length - 1;
        let firstNonSlashEnd = -1;
        for (i = path.length - 1; i >= 0; --i) {
          const code = path.charCodeAt(i);
          if (code === _constants_ts_3.CHAR_FORWARD_SLASH) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
            if (firstNonSlashEnd === -1) {
              // We saw the first non-path separator, remember this index in case
              // we need it if the extension ends up not matching
              matchedSlash = false;
              firstNonSlashEnd = i + 1;
            }
            if (extIdx >= 0) {
              // Try to match the explicit extension
              if (code === ext.charCodeAt(extIdx)) {
                if (--extIdx === -1) {
                  // We matched the extension, so mark this as the end of our path
                  // component
                  end = i;
                }
              } else {
                // Extension does not match, so our result is the entire path
                // component
                extIdx = -1;
                end = firstNonSlashEnd;
              }
            }
          }
        }
        if (start === end) {
          end = firstNonSlashEnd;
        } else if (end === -1) {
          end = path.length;
        }
        return path.slice(start, end);
      } else {
        for (i = path.length - 1; i >= 0; --i) {
          if (path.charCodeAt(i) === _constants_ts_3.CHAR_FORWARD_SLASH) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
            // We saw the first non-path separator, mark this as the end of our
            // path component
            matchedSlash = false;
            end = i + 1;
          }
        }
        if (end === -1) {
          return "";
        }
        return path.slice(start, end);
      }
    }
    exports_8("basename", basename);
    function extname(path) {
      _util_ts_2.assertPath(path);
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      // Track the state of characters (if any) we see before our first dot and
      // after any path separator we find
      let preDotState = 0;
      for (let i = path.length - 1; i >= 0; --i) {
        const code = path.charCodeAt(i);
        if (code === _constants_ts_3.CHAR_FORWARD_SLASH) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // extension
          matchedSlash = false;
          end = i + 1;
        }
        if (code === _constants_ts_3.CHAR_DOT) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          // We saw a non-dot and non-path separator before our dot, so we should
          // have a good chance at having a non-empty extension
          preDotState = -1;
        }
      }
      if (
        startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 && startDot === end - 1 &&
          startDot === startPart + 1)
      ) {
        return "";
      }
      return path.slice(startDot, end);
    }
    exports_8("extname", extname);
    function format(pathObject) {
      /* eslint-disable max-len */
      if (pathObject === null || typeof pathObject !== "object") {
        throw new TypeError(
          `The "pathObject" argument must be of type Object. Received type ${typeof pathObject}`,
        );
      }
      return _util_ts_2._format("/", pathObject);
    }
    exports_8("format", format);
    function parse(path) {
      _util_ts_2.assertPath(path);
      const ret = { root: "", dir: "", base: "", ext: "", name: "" };
      if (path.length === 0) {
        return ret;
      }
      const isAbsolute =
        path.charCodeAt(0) === _constants_ts_3.CHAR_FORWARD_SLASH;
      let start;
      if (isAbsolute) {
        ret.root = "/";
        start = 1;
      } else {
        start = 0;
      }
      let startDot = -1;
      let startPart = 0;
      let end = -1;
      let matchedSlash = true;
      let i = path.length - 1;
      // Track the state of characters (if any) we see before our first dot and
      // after any path separator we find
      let preDotState = 0;
      // Get non-dir info
      for (; i >= start; --i) {
        const code = path.charCodeAt(i);
        if (code === _constants_ts_3.CHAR_FORWARD_SLASH) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // extension
          matchedSlash = false;
          end = i + 1;
        }
        if (code === _constants_ts_3.CHAR_DOT) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          // We saw a non-dot and non-path separator before our dot, so we should
          // have a good chance at having a non-empty extension
          preDotState = -1;
        }
      }
      if (
        startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 && startDot === end - 1 &&
          startDot === startPart + 1)
      ) {
        if (end !== -1) {
          if (startPart === 0 && isAbsolute) {
            ret.base = ret.name = path.slice(1, end);
          } else {
            ret.base = ret.name = path.slice(startPart, end);
          }
        }
      } else {
        if (startPart === 0 && isAbsolute) {
          ret.name = path.slice(1, startDot);
          ret.base = path.slice(1, end);
        } else {
          ret.name = path.slice(startPart, startDot);
          ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
      }
      if (startPart > 0) {
        ret.dir = path.slice(0, startPart - 1);
      } else if (isAbsolute) {
        ret.dir = "/";
      }
      return ret;
    }
    exports_8("parse", parse);
    /** Converts a file URL to a path string.
     *
     *      fromFileUrl("file:///home/foo"); // "/home/foo"
     *
     * Note that non-file URLs are treated as file URLs and irrelevant components
     * are ignored.
     */
    function fromFileUrl(url) {
      return new URL(url).pathname;
    }
    exports_8("fromFileUrl", fromFileUrl);
    return {
      setters: [
        function (_constants_ts_3_1) {
          _constants_ts_3 = _constants_ts_3_1;
        },
        function (_util_ts_2_1) {
          _util_ts_2 = _util_ts_2_1;
        },
      ],
      execute: function () {
        cwd = Deno.cwd;
        exports_8("sep", sep = "/");
        exports_8("delimiter", delimiter = ":");
      },
    };
  },
);
System.register(
  "https://deno.land/std@0.54.0/path/separator",
  [],
  function (exports_9, context_9) {
    "use strict";
    var isWindows, SEP, SEP_PATTERN;
    var __moduleName = context_9 && context_9.id;
    return {
      setters: [],
      execute: function () {
        // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
        isWindows = Deno.build.os == "windows";
        exports_9("SEP", SEP = isWindows ? "\\" : "/");
        exports_9("SEP_PATTERN", SEP_PATTERN = isWindows ? /[\\/]+/ : /\/+/);
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register(
  "https://deno.land/std@0.54.0/path/common",
  ["https://deno.land/std@0.54.0/path/separator"],
  function (exports_10, context_10) {
    "use strict";
    var separator_ts_1;
    var __moduleName = context_10 && context_10.id;
    /** Determines the common path from a set of paths, using an optional separator,
     * which defaults to the OS default separator.
     *
     *       import { common } from "https://deno.land/std/path/mod.ts";
     *       const p = common([
     *         "./deno/std/path/mod.ts",
     *         "./deno/std/fs/mod.ts",
     *       ]);
     *       console.log(p); // "./deno/std/"
     *
     */
    function common(paths, sep = separator_ts_1.SEP) {
      const [first = "", ...remaining] = paths;
      if (first === "" || remaining.length === 0) {
        return first.substring(0, first.lastIndexOf(sep) + 1);
      }
      const parts = first.split(sep);
      let endOfPrefix = parts.length;
      for (const path of remaining) {
        const compare = path.split(sep);
        for (let i = 0; i < endOfPrefix; i++) {
          if (compare[i] !== parts[i]) {
            endOfPrefix = i;
          }
        }
        if (endOfPrefix === 0) {
          return "";
        }
      }
      const prefix = parts.slice(0, endOfPrefix).join(sep);
      return prefix.endsWith(sep) ? prefix : `${prefix}${sep}`;
    }
    exports_10("common", common);
    return {
      setters: [
        function (separator_ts_1_1) {
          separator_ts_1 = separator_ts_1_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
// This file is ported from globrex@0.1.2
// MIT License
// Copyright (c) 2018 Terkel Gjervig Nielsen
System.register(
  "https://deno.land/std@0.54.0/path/_globrex",
  [],
  function (exports_11, context_11) {
    "use strict";
    var isWin,
      SEP,
      SEP_ESC,
      SEP_RAW,
      GLOBSTAR,
      WILDCARD,
      GLOBSTAR_SEGMENT,
      WILDCARD_SEGMENT;
    var __moduleName = context_11 && context_11.id;
    /**
     * Convert any glob pattern to a JavaScript Regexp object
     * @param glob Glob pattern to convert
     * @param opts Configuration object
     * @returns Converted object with string, segments and RegExp object
     */
    function globrex(
      glob,
      {
        extended = false,
        globstar = false,
        strict = false,
        filepath = false,
        flags = "",
      } = {},
    ) {
      const sepPattern = new RegExp(`^${SEP}${strict ? "" : "+"}$`);
      let regex = "";
      let segment = "";
      let pathRegexStr = "";
      const pathSegments = [];
      // If we are doing extended matching, this boolean is true when we are inside
      // a group (eg {*.html,*.js}), and false otherwise.
      let inGroup = false;
      let inRange = false;
      // extglob stack. Keep track of scope
      const ext = [];
      // Helper function to build string and segments
      function add(str, options = { split: false, last: false, only: "" }) {
        const { split, last, only } = options;
        if (only !== "path") {
          regex += str;
        }
        if (filepath && only !== "regex") {
          pathRegexStr += str.match(sepPattern) ? SEP : str;
          if (split) {
            if (last) {
              segment += str;
            }
            if (segment !== "") {
              // change it 'includes'
              if (!flags.includes("g")) {
                segment = `^${segment}$`;
              }
              pathSegments.push(new RegExp(segment, flags));
            }
            segment = "";
          } else {
            segment += str;
          }
        }
      }
      let c, n;
      for (let i = 0; i < glob.length; i++) {
        c = glob[i];
        n = glob[i + 1];
        if (["\\", "$", "^", ".", "="].includes(c)) {
          add(`\\${c}`);
          continue;
        }
        if (c.match(sepPattern)) {
          add(SEP, { split: true });
          if (n != null && n.match(sepPattern) && !strict) {
            regex += "?";
          }
          continue;
        }
        if (c === "(") {
          if (ext.length) {
            add(`${c}?:`);
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === ")") {
          if (ext.length) {
            add(c);
            const type = ext.pop();
            if (type === "@") {
              add("{1}");
            } else if (type === "!") {
              add(WILDCARD);
            } else {
              add(type);
            }
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === "|") {
          if (ext.length) {
            add(c);
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === "+") {
          if (n === "(" && extended) {
            ext.push(c);
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === "@" && extended) {
          if (n === "(") {
            ext.push(c);
            continue;
          }
        }
        if (c === "!") {
          if (extended) {
            if (inRange) {
              add("^");
              continue;
            }
            if (n === "(") {
              ext.push(c);
              add("(?!");
              i++;
              continue;
            }
            add(`\\${c}`);
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === "?") {
          if (extended) {
            if (n === "(") {
              ext.push(c);
            } else {
              add(".");
            }
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === "[") {
          if (inRange && n === ":") {
            i++; // skip [
            let value = "";
            while (glob[++i] !== ":") {
              value += glob[i];
            }
            if (value === "alnum") {
              add("(?:\\w|\\d)");
            } else if (value === "space") {
              add("\\s");
            } else if (value === "digit") {
              add("\\d");
            }
            i++; // skip last ]
            continue;
          }
          if (extended) {
            inRange = true;
            add(c);
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === "]") {
          if (extended) {
            inRange = false;
            add(c);
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === "{") {
          if (extended) {
            inGroup = true;
            add("(?:");
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === "}") {
          if (extended) {
            inGroup = false;
            add(")");
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === ",") {
          if (inGroup) {
            add("|");
            continue;
          }
          add(`\\${c}`);
          continue;
        }
        if (c === "*") {
          if (n === "(" && extended) {
            ext.push(c);
            continue;
          }
          // Move over all consecutive "*"'s.
          // Also store the previous and next characters
          const prevChar = glob[i - 1];
          let starCount = 1;
          while (glob[i + 1] === "*") {
            starCount++;
            i++;
          }
          const nextChar = glob[i + 1];
          if (!globstar) {
            // globstar is disabled, so treat any number of "*" as one
            add(".*");
          } else {
            // globstar is enabled, so determine if this is a globstar segment
            const isGlobstar = starCount > 1 && // multiple "*"'s
              // from the start of the segment
              [SEP_RAW, "/", undefined].includes(prevChar) &&
              // to the end of the segment
              [SEP_RAW, "/", undefined].includes(nextChar);
            if (isGlobstar) {
              // it's a globstar, so match zero or more path segments
              add(GLOBSTAR, { only: "regex" });
              add(GLOBSTAR_SEGMENT, { only: "path", last: true, split: true });
              i++; // move over the "/"
            } else {
              // it's not a globstar, so only match one path segment
              add(WILDCARD, { only: "regex" });
              add(WILDCARD_SEGMENT, { only: "path" });
            }
          }
          continue;
        }
        add(c);
      }
      // When regexp 'g' flag is specified don't
      // constrain the regular expression with ^ & $
      if (!flags.includes("g")) {
        regex = `^${regex}$`;
        segment = `^${segment}$`;
        if (filepath) {
          pathRegexStr = `^${pathRegexStr}$`;
        }
      }
      const result = { regex: new RegExp(regex, flags) };
      // Push the last segment
      if (filepath) {
        pathSegments.push(new RegExp(segment, flags));
        result.path = {
          regex: new RegExp(pathRegexStr, flags),
          segments: pathSegments,
          globstar: new RegExp(
            !flags.includes("g") ? `^${GLOBSTAR_SEGMENT}$` : GLOBSTAR_SEGMENT,
            flags,
          ),
        };
      }
      return result;
    }
    exports_11("globrex", globrex);
    return {
      setters: [],
      execute: function () {
        isWin = Deno.build.os === "windows";
        SEP = isWin ? `(?:\\\\|\\/)` : `\\/`;
        SEP_ESC = isWin ? `\\\\` : `/`;
        SEP_RAW = isWin ? `\\` : `/`;
        GLOBSTAR = `(?:(?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
        WILDCARD = `(?:[^${SEP_ESC}/]*)`;
        GLOBSTAR_SEGMENT = `((?:[^${SEP_ESC}/]*(?:${SEP_ESC}|\/|$))*)`;
        WILDCARD_SEGMENT = `(?:[^${SEP_ESC}/]*)`;
      },
    };
  },
);
System.register(
  "https://deno.land/std@0.54.0/path/glob",
  [
    "https://deno.land/std@0.54.0/path/separator",
    "https://deno.land/std@0.54.0/path/_globrex",
    "https://deno.land/std@0.54.0/path/mod",
    "https://deno.land/std@0.54.0/testing/asserts",
  ],
  function (exports_12, context_12) {
    "use strict";
    var separator_ts_2, _globrex_ts_1, mod_ts_1, asserts_ts_2;
    var __moduleName = context_12 && context_12.id;
    /**
     * Generate a regex based on glob pattern and options
     * This was meant to be using the the `fs.walk` function
     * but can be used anywhere else.
     * Examples:
     *
     *     Looking for all the `ts` files:
     *     walkSync(".", {
     *       match: [globToRegExp("*.ts")]
     *     })
     *
     *     Looking for all the `.json` files in any subfolder:
     *     walkSync(".", {
     *       match: [globToRegExp(join("a", "**", "*.json"),{
     *         flags: "g",
     *         extended: true,
     *         globstar: true
     *       })]
     *     })
     *
     * @param glob - Glob pattern to be used
     * @param options - Specific options for the glob pattern
     * @returns A RegExp for the glob pattern
     */
    function globToRegExp(glob, { extended = false, globstar = true } = {}) {
      const result = _globrex_ts_1.globrex(glob, {
        extended,
        globstar,
        strict: false,
        filepath: true,
      });
      asserts_ts_2.assert(result.path != null);
      return result.path.regex;
    }
    exports_12("globToRegExp", globToRegExp);
    /** Test whether the given string is a glob */
    function isGlob(str) {
      const chars = { "{": "}", "(": ")", "[": "]" };
      /* eslint-disable-next-line max-len */
      const regex =
        /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
      if (str === "") {
        return false;
      }
      let match;
      while ((match = regex.exec(str))) {
        if (match[2]) {
          return true;
        }
        let idx = match.index + match[0].length;
        // if an open bracket/brace/paren is escaped,
        // set the index to the next closing character
        const open = match[1];
        const close = open ? chars[open] : null;
        if (open && close) {
          const n = str.indexOf(close, idx);
          if (n !== -1) {
            idx = n + 1;
          }
        }
        str = str.slice(idx);
      }
      return false;
    }
    exports_12("isGlob", isGlob);
    /** Like normalize(), but doesn't collapse "**\/.." when `globstar` is true. */
    function normalizeGlob(glob, { globstar = false } = {}) {
      if (!!glob.match(/\0/g)) {
        throw new Error(`Glob contains invalid characters: "${glob}"`);
      }
      if (!globstar) {
        return mod_ts_1.normalize(glob);
      }
      const s = separator_ts_2.SEP_PATTERN.source;
      const badParentPattern = new RegExp(
        `(?<=(${s}|^)\\*\\*${s})\\.\\.(?=${s}|$)`,
        "g",
      );
      return mod_ts_1.normalize(glob.replace(badParentPattern, "\0")).replace(
        /\0/g,
        "..",
      );
    }
    exports_12("normalizeGlob", normalizeGlob);
    /** Like join(), but doesn't collapse "**\/.." when `globstar` is true. */
    function joinGlobs(globs, { extended = false, globstar = false } = {}) {
      if (!globstar || globs.length == 0) {
        return mod_ts_1.join(...globs);
      }
      if (globs.length === 0) {
        return ".";
      }
      let joined;
      for (const glob of globs) {
        const path = glob;
        if (path.length > 0) {
          if (!joined) {
            joined = path;
          } else {
            joined += `${separator_ts_2.SEP}${path}`;
          }
        }
      }
      if (!joined) {
        return ".";
      }
      return normalizeGlob(joined, { extended, globstar });
    }
    exports_12("joinGlobs", joinGlobs);
    return {
      setters: [
        function (separator_ts_2_1) {
          separator_ts_2 = separator_ts_2_1;
        },
        function (_globrex_ts_1_1) {
          _globrex_ts_1 = _globrex_ts_1_1;
        },
        function (mod_ts_1_1) {
          mod_ts_1 = mod_ts_1_1;
        },
        function (asserts_ts_2_1) {
          asserts_ts_2 = asserts_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
// Copyright the Browserify authors. MIT License.
// Ported mostly from https://github.com/browserify/path-browserify/
System.register(
  "https://deno.land/std@0.54.0/path/mod",
  [
    "https://deno.land/std@0.54.0/path/win32",
    "https://deno.land/std@0.54.0/path/posix",
    "https://deno.land/std@0.54.0/path/common",
    "https://deno.land/std@0.54.0/path/separator",
    "https://deno.land/std@0.54.0/path/interface",
    "https://deno.land/std@0.54.0/path/glob",
  ],
  function (exports_13, context_13) {
    "use strict";
    var _win32,
      _posix,
      isWindows,
      path,
      win32,
      posix,
      basename,
      delimiter,
      dirname,
      extname,
      format,
      fromFileUrl,
      isAbsolute,
      join,
      normalize,
      parse,
      relative,
      resolve,
      sep,
      toNamespacedPath;
    var __moduleName = context_13 && context_13.id;
    var exportedNames_1 = {
      "win32": true,
      "posix": true,
      "basename": true,
      "delimiter": true,
      "dirname": true,
      "extname": true,
      "format": true,
      "fromFileUrl": true,
      "isAbsolute": true,
      "join": true,
      "normalize": true,
      "parse": true,
      "relative": true,
      "resolve": true,
      "sep": true,
      "toNamespacedPath": true,
      "SEP": true,
      "SEP_PATTERN": true,
    };
    function exportStar_1(m) {
      var exports = {};
      for (var n in m) {
        if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) {
          exports[n] = m[n];
        }
      }
      exports_13(exports);
    }
    return {
      setters: [
        function (_win32_1) {
          _win32 = _win32_1;
        },
        function (_posix_1) {
          _posix = _posix_1;
        },
        function (common_ts_1_1) {
          exportStar_1(common_ts_1_1);
        },
        function (separator_ts_3_1) {
          exports_13({
            "SEP": separator_ts_3_1["SEP"],
            "SEP_PATTERN": separator_ts_3_1["SEP_PATTERN"],
          });
        },
        function (interface_ts_1_1) {
          exportStar_1(interface_ts_1_1);
        },
        function (glob_ts_1_1) {
          exportStar_1(glob_ts_1_1);
        },
      ],
      execute: function () {
        isWindows = Deno.build.os == "windows";
        path = isWindows ? _win32 : _posix;
        exports_13("win32", win32 = _win32);
        exports_13("posix", posix = _posix);
        exports_13("basename", basename = path.basename),
          exports_13("delimiter", delimiter = path.delimiter),
          exports_13("dirname", dirname = path.dirname),
          exports_13("extname", extname = path.extname),
          exports_13("format", format = path.format),
          exports_13("fromFileUrl", fromFileUrl = path.fromFileUrl),
          exports_13("isAbsolute", isAbsolute = path.isAbsolute),
          exports_13("join", join = path.join),
          exports_13("normalize", normalize = path.normalize),
          exports_13("parse", parse = path.parse),
          exports_13("relative", relative = path.relative),
          exports_13("resolve", resolve = path.resolve),
          exports_13("sep", sep = path.sep),
          exports_13(
            "toNamespacedPath",
            toNamespacedPath = path.toNamespacedPath,
          );
      },
    };
  },
);
System.register(
  "https://cdn.depjs.com/store@1.0.1/utils",
  [],
  function (exports_14, context_14) {
    "use strict";
    var directoryExists, mkdir;
    var __moduleName = context_14 && context_14.id;
    return {
      setters: [],
      execute: function () {
        exports_14(
          "directoryExists",
          directoryExists = async (dir, parent) => {
            for await (const entry of Deno.readDir(parent)) {
              if (entry.isDirectory && entry.name === dir) {
                return true;
              }
            }
            return false;
          },
        );
        exports_14(
          "mkdir",
          mkdir = async (path) => {
            const parent = Deno.cwd();
            const segments = path.replace(parent, "").split("/");
            let exists = true;
            for (let i = 0; i < segments.length; i++) {
              const s = segments[i];
              if (!s || !i && s === ".") {
                continue;
              } else if (s === "..") {
                return;
              }
              if (
                !await directoryExists(
                  s,
                  parent + segments.slice(0, i).join("/"),
                )
              ) {
                exists = false;
                break;
              }
            }
            if (!exists) {
              await Deno.mkdir(path, {
                recursive: true,
              });
              return path;
            }
          },
        );
      },
    };
  },
);
System.register(
  "https://cdn.depjs.com/store@1.0.1/mod",
  [
    "https://deno.land/std@0.54.0/path/mod",
    "https://cdn.depjs.com/store@1.0.1/utils",
  ],
  function (exports_15, context_15) {
    "use strict";
    var mod_ts_2, utils_ts_1, Store;
    var __moduleName = context_15 && context_15.id;
    return {
      setters: [
        function (mod_ts_2_1) {
          mod_ts_2 = mod_ts_2_1;
        },
        function (utils_ts_1_1) {
          utils_ts_1 = utils_ts_1_1;
        },
      ],
      execute: function () {
        Store = class Store {
          constructor(opts) {
            if (typeof opts === "string") {
              opts = {
                name: opts,
              };
            }
            const { name = ".datastore", path = "." } = opts || {};
            this.name = name;
            this.path = path.startsWith("/") ? path
            : mod_ts_2.join(Deno.cwd(), path);
            this.filePath = mod_ts_2.join(this.path, name);
            this.dirExists = false;
          }
          isNullOrEmptyData() {
            return !this.data || !Object.keys(this.data).length;
          }
          async load() {
            let data = this.data;
            if (data) {
              return data;
            }
            try {
              const content = new TextDecoder().decode(
                await Deno.readFile(this.filePath),
              );
              data = content && JSON.parse(content);
              this.dirExists = true;
            } catch (e) {
              if (e.name !== "NotFound") {
                throw e;
              }
            }
            data = data || {};
            this.data = data;
            return data;
          }
          async save() {
            const { data, filePath } = this;
            if (!this.data) {
              return;
            }
            if (!this.dirExists) {
              await utils_ts_1.mkdir(this.path);
            }
            try {
              await Deno.writeFile(
                filePath,
                new TextEncoder().encode(JSON.stringify(data)),
                {
                  mode: 0o0600,
                },
              );
            } catch (e) {
              throw e;
            }
          }
          async get(key) {
            await this.load();
            return this.data[key];
          }
          async set(key, val) {
            await this.load();
            let dataChanged = false;
            if (typeof key === "string") {
              const oldVal = this.data[key];
              if (oldVal !== val) {
                this.data[key] = val;
                dataChanged = true;
              }
            } else {
              const keys = Object.keys(key);
              for (const k of keys) {
                const oldVal = this.data[k];
                const val = key[k];
                if (oldVal !== val) {
                  this.data[k] = val;
                  dataChanged = true;
                }
              }
            }
            if (dataChanged) {
              await this.save();
              return true;
            }
            return false;
          }
          async has(key) {
            await this.load();
            return this.data.hasOwnProperty(key);
          }
          async delete(key) {
            if (this.isNullOrEmptyData()) {
              return false;
            }
            await this.load();
            let dataChanged = false;
            if (typeof key === "string") {
              key = [key];
            }
            for (const k of key) {
              if (this.has(k)) {
                delete this.data[k];
                dataChanged = true;
              }
            }
            if (dataChanged) {
              await this.save();
              return true;
            }
            return false;
          }
          async clear() {
            if (this.isNullOrEmptyData()) {
              return;
            }
            this.data = {};
            await this.save();
          }
          async toObject() {
            return this.data || await this.load();
          }
        };
        exports_15("Store", Store);
      },
    };
  },
);
System.register(
  "file:///home/yazid/Documents/projects/snippet-cli/lib/database",
  ["https://cdn.depjs.com/store@1.0.1/mod"],
  function (exports_16, context_16) {
    "use strict";
    var mod_ts_3, initialize, db;
    var __moduleName = context_16 && context_16.id;
    return {
      setters: [
        function (mod_ts_3_1) {
          mod_ts_3 = mod_ts_3_1;
        },
      ],
      execute: async function () {
        initialize = async () => {
          const db = new mod_ts_3.Store({ name: "snpt.json", path: "./db" });
          if (!(await db.has("entries"))) {
            await db.set("entries", []);
          }
          if (!(await db.has("tags"))) {
            await db.set("tags", []);
          }
          if (!(await db.has("view_mode"))) {
            await db.set("view_mode", "tree");
          }
          return db;
        };
        db = await initialize();
        exports_16("default", db);
      },
    };
  },
);
System.register(
  "file:///home/yazid/Documents/projects/snippet-cli/lib/formats",
  [],
  function (exports_17, context_17) {
    "use strict";
    var date_input_formats,
      time_input_formats,
      created_format,
      is_day_formats,
      is_month_formats,
      is_year_formats;
    var __moduleName = context_17 && context_17.id;
    return {
      setters: [],
      execute: function () {
        // All
        date_input_formats = [
          "YYYY-MM-DD",
          "DD-MM-YYYY",
          "DD-MM-YY",
          "YY-MM-DD",
          "M-D",
          "D-M",
          "MM-YYYY",
          "M",
          "MM",
          "YYYY",
          "YY",
          "Y",
        ];
        exports_17("date_input_formats", date_input_formats);
        time_input_formats = ["h a", "h:mm a", "h:mm", "h:mm:ss a"];
        exports_17("time_input_formats", time_input_formats);
        // Specific
        created_format = "dddd, MMMM Do YYYY, h:mm:ss a";
        exports_17("created_format", created_format);
        // Search
        is_day_formats = [
          "YYYY-MM-DD",
          "DD-MM-YYYY",
          "DD-MM-YY",
          "YY-MM-DD",
          "M-D",
          "D-M",
        ];
        exports_17("is_day_formats", is_day_formats);
        is_month_formats = ["MM-YYYY", "M", "MM"];
        exports_17("is_month_formats", is_month_formats);
        is_year_formats = ["YYYY", "YY", "Y"];
        exports_17("is_year_formats", is_year_formats);
      },
    };
  },
);// This file is copied from moment@2.24.0
//! moment.js
//! version : 2.24.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? module.exports = factory()
    : typeof define === "function" && define.amd
    ? define(factory)
    : global.moment = factory();
}(
  window || this,
  (function () {
    "use strict";
    var hookCallback;
    function hooks() {
      return hookCallback.apply(null, arguments);
    }
    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
      hookCallback = callback;
    }
    function isArray(input) {
      return input instanceof Array ||
        Object.prototype.toString.call(input) === "[object Array]";
    }
    function isObject(input) {
      // IE8 will treat undefined and null as object if it wasn't for
      // input != null
      return input != null &&
        Object.prototype.toString.call(input) === "[object Object]";
    }
    function isObjectEmpty(obj) {
      if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
      } else {
        var k;
        for (k in obj) {
          if (obj.hasOwnProperty(k)) {
            return false;
          }
        }
        return true;
      }
    }
    function isUndefined(input) {
      return input === void 0;
    }
    function isNumber(input) {
      return typeof input === "number" ||
        Object.prototype.toString.call(input) === "[object Number]";
    }
    function isDate(input) {
      return input instanceof Date ||
        Object.prototype.toString.call(input) === "[object Date]";
    }
    function map(arr, fn) {
      var res = [], i;
      for (i = 0; i < arr.length; ++i) {
        res.push(fn(arr[i], i));
      }
      return res;
    }
    function hasOwnProp(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    }
    function extend(a, b) {
      for (var i in b) {
        if (hasOwnProp(b, i)) {
          a[i] = b[i];
        }
      }
      if (hasOwnProp(b, "toString")) {
        a.toString = b.toString;
      }
      if (hasOwnProp(b, "valueOf")) {
        a.valueOf = b.valueOf;
      }
      return a;
    }
    function createUTC(input, format, locale, strict) {
      return createLocalOrUTC(input, format, locale, strict, true).utc();
    }
    function defaultParsingFlags() {
      // We need to deep clone this object.
      return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        meridiem: null,
        rfc2822: false,
        weekdayMismatch: false,
      };
    }
    function getParsingFlags(m) {
      if (m._pf == null) {
        m._pf = defaultParsingFlags();
      }
      return m._pf;
    }
    var some;
    if (Array.prototype.some) {
      some = Array.prototype.some;
    } else {
      some = function (fun) {
        var t = Object(this);
        var len = t.length >>> 0;
        for (var i = 0; i < len; i++) {
          if (i in t && fun.call(this, t[i], i, t)) {
            return true;
          }
        }
        return false;
      };
    }
    function isValid(m) {
      if (m._isValid == null) {
        var flags = getParsingFlags(m);
        var parsedParts = some.call(flags.parsedDateParts, function (i) {
          return i != null;
        });
        var isNowValid = !isNaN(m._d.getTime()) &&
          flags.overflow < 0 &&
          !flags.empty &&
          !flags.invalidMonth &&
          !flags.invalidWeekday &&
          !flags.weekdayMismatch &&
          !flags.nullInput &&
          !flags.invalidFormat &&
          !flags.userInvalidated &&
          (!flags.meridiem || (flags.meridiem && parsedParts));
        if (m._strict) {
          isNowValid = isNowValid &&
            flags.charsLeftOver === 0 &&
            flags.unusedTokens.length === 0 &&
            flags.bigHour === undefined;
        }
        if (Object.isFrozen == null || !Object.isFrozen(m)) {
          m._isValid = isNowValid;
        } else {
          return isNowValid;
        }
      }
      return m._isValid;
    }
    function createInvalid(flags) {
      var m = createUTC(NaN);
      if (flags != null) {
        extend(getParsingFlags(m), flags);
      } else {
        getParsingFlags(m).userInvalidated = true;
      }
      return m;
    }
    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];
    function copyConfig(to, from) {
      var i, prop, val;
      if (!isUndefined(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
      }
      if (!isUndefined(from._i)) {
        to._i = from._i;
      }
      if (!isUndefined(from._f)) {
        to._f = from._f;
      }
      if (!isUndefined(from._l)) {
        to._l = from._l;
      }
      if (!isUndefined(from._strict)) {
        to._strict = from._strict;
      }
      if (!isUndefined(from._tzm)) {
        to._tzm = from._tzm;
      }
      if (!isUndefined(from._isUTC)) {
        to._isUTC = from._isUTC;
      }
      if (!isUndefined(from._offset)) {
        to._offset = from._offset;
      }
      if (!isUndefined(from._pf)) {
        to._pf = getParsingFlags(from);
      }
      if (!isUndefined(from._locale)) {
        to._locale = from._locale;
      }
      if (momentProperties.length > 0) {
        for (i = 0; i < momentProperties.length; i++) {
          prop = momentProperties[i];
          val = from[prop];
          if (!isUndefined(val)) {
            to[prop] = val;
          }
        }
      }
      return to;
    }
    var updateInProgress = false;
    // Moment prototype object
    function Moment(config) {
      copyConfig(this, config);
      this._d = new Date(config._d != null ? config._d.getTime() : NaN);
      if (!this.isValid()) {
        this._d = new Date(NaN);
      }
      // Prevent infinite loop in case updateOffset creates new moment
      // objects.
      if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
      }
    }
    function isMoment(obj) {
      return obj instanceof Moment ||
        (obj != null && obj._isAMomentObject != null);
    }
    function absFloor(number) {
      if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
      } else {
        return Math.floor(number);
      }
    }
    function toInt(argumentForCoercion) {
      var coercedNumber = +argumentForCoercion, value = 0;
      if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
      }
      return value;
    }
    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
      var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
      for (i = 0; i < len; i++) {
        if (
          (dontConvert && array1[i] !== array2[i]) ||
          (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
        ) {
          diffs++;
        }
      }
      return diffs + lengthDiff;
    }
    function warn(msg) {
      if (
        hooks.suppressDeprecationWarnings === false &&
        (typeof console !== "undefined") && console.warn
      ) {
        console.warn("Deprecation warning: " + msg);
      }
    }
    function deprecate(msg, fn) {
      var firstTime = true;
      return extend(function () {
        if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
          var args = [];
          var arg;
          for (var i = 0; i < arguments.length; i++) {
            arg = "";
            if (typeof arguments[i] === "object") {
              arg += "\n[" + i + "] ";
              for (var key in arguments[0]) {
                arg += key + ": " + arguments[0][key] + ", ";
              }
              arg = arg.slice(0, -2); // Remove trailing comma and space
            } else {
              arg = arguments[i];
            }
            args.push(arg);
          }
          warn(
            msg + "\nArguments: " + Array.prototype.slice.call(args).join("") +
              "\n" + (new Error()).stack,
          );
          firstTime = false;
        }
        return fn.apply(this, arguments);
      }, fn);
    }
    var deprecations = {};
    function deprecateSimple(name, msg) {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
      }
      if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
      }
    }
    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;
    function isFunction(input) {
      return input instanceof Function ||
        Object.prototype.toString.call(input) === "[object Function]";
    }
    function set(config) {
      var prop, i;
      for (i in config) {
        prop = config[i];
        if (isFunction(prop)) {
          this[i] = prop;
        } else {
          this["_" + i] = prop;
        }
      }
      this._config = config;
      // Lenient ordinal parsing accepts just a number in addition to
      // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
      // TODO: Remove "ordinalParse" fallback in next major release.
      this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
          "|" + (/\d{1,2}/).source,
      );
    }
    function mergeConfigs(parentConfig, childConfig) {
      var res = extend({}, parentConfig), prop;
      for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
          if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
            res[prop] = {};
            extend(res[prop], parentConfig[prop]);
            extend(res[prop], childConfig[prop]);
          } else if (childConfig[prop] != null) {
            res[prop] = childConfig[prop];
          } else {
            delete res[prop];
          }
        }
      }
      for (prop in parentConfig) {
        if (
          hasOwnProp(parentConfig, prop) &&
          !hasOwnProp(childConfig, prop) &&
          isObject(parentConfig[prop])
        ) {
          // make sure changes to properties don't modify parent config
          res[prop] = extend({}, res[prop]);
        }
      }
      return res;
    }
    function Locale(config) {
      if (config != null) {
        this.set(config);
      }
    }
    var keys;
    if (Object.keys) {
      keys = Object.keys;
    } else {
      keys = function (obj) {
        var i, res = [];
        for (i in obj) {
          if (hasOwnProp(obj, i)) {
            res.push(i);
          }
        }
        return res;
      };
    }
    var defaultCalendar = {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L",
    };
    function calendar(key, mom, now) {
      var output = this._calendar[key] || this._calendar["sameElse"];
      return isFunction(output) ? output.call(mom, now) : output;
    }
    var defaultLongDateFormat = {
      LTS: "h:mm:ss A",
      LT: "h:mm A",
      L: "MM/DD/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY h:mm A",
      LLLL: "dddd, MMMM D, YYYY h:mm A",
    };
    function longDateFormat(key) {
      var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];
      if (format || !formatUpper) {
        return format;
      }
      this._longDateFormat[key] = formatUpper.replace(
        /MMMM|MM|DD|dddd/g,
        function (val) {
          return val.slice(1);
        },
      );
      return this._longDateFormat[key];
    }
    var defaultInvalidDate = "Invalid date";
    function invalidDate() {
      return this._invalidDate;
    }
    var defaultOrdinal = "%d";
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;
    function ordinal(number) {
      return this._ordinal.replace("%d", number);
    }
    var defaultRelativeTime = {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    };
    function relativeTime(number, withoutSuffix, string, isFuture) {
      var output = this._relativeTime[string];
      return (isFunction(output))
        ? output(number, withoutSuffix, string, isFuture)
        : output.replace(/%d/i, number);
    }
    function pastFuture(diff, output) {
      var format = this._relativeTime[diff > 0 ? "future" : "past"];
      return isFunction(format) ? format(output)
      : format.replace(/%s/i, output);
    }
    var aliases = {};
    function addUnitAlias(unit, shorthand) {
      var lowerCase = unit.toLowerCase();
      aliases[lowerCase] = aliases[lowerCase + "s"] = aliases[shorthand] = unit;
    }
    function normalizeUnits(units) {
      return typeof units === "string"
        ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }
    function normalizeObjectUnits(inputObject) {
      var normalizedInput = {}, normalizedProp, prop;
      for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
          normalizedProp = normalizeUnits(prop);
          if (normalizedProp) {
            normalizedInput[normalizedProp] = inputObject[prop];
          }
        }
      }
      return normalizedInput;
    }
    var priorities = {};
    function addUnitPriority(unit, priority) {
      priorities[unit] = priority;
    }
    function getPrioritizedUnits(unitsObj) {
      var units = [];
      for (var u in unitsObj) {
        units.push({ unit: u, priority: priorities[u] });
      }
      units.sort(function (a, b) {
        return a.priority - b.priority;
      });
      return units;
    }
    function zeroFill(number, targetLength, forceSign) {
      var absNumber = "" + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
      return (sign ? (forceSign ? "+" : "") : "-") +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }
    var formattingTokens =
      /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;
    var formatFunctions = {};
    var formatTokenFunctions = {};
    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
      var func = callback;
      if (typeof callback === "string") {
        func = function () {
          return this[callback]();
        };
      }
      if (token) {
        formatTokenFunctions[token] = func;
      }
      if (padded) {
        formatTokenFunctions[padded[0]] = function () {
          return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
      }
      if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
          return this.localeData().ordinal(func.apply(this, arguments), token);
        };
      }
    }
    function removeFormattingTokens(input) {
      if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, "");
      }
      return input.replace(/\\/g, "");
    }
    function makeFormatFunction(format) {
      var array = format.match(formattingTokens), i, length;
      for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
          array[i] = formatTokenFunctions[array[i]];
        } else {
          array[i] = removeFormattingTokens(array[i]);
        }
      }
      return function (mom) {
        var output = "", i;
        for (i = 0; i < length; i++) {
          output += isFunction(array[i])
            ? array[i].call(mom, format)
            : array[i];
        }
        return output;
      };
    }
    // format date using native date object
    function formatMoment(m, format) {
      if (!m.isValid()) {
        return m.localeData().invalidDate();
      }
      format = expandFormat(format, m.localeData());
      formatFunctions[format] = formatFunctions[format] ||
        makeFormatFunction(format);
      return formatFunctions[format](m);
    }
    function expandFormat(format, locale) {
      var i = 5;
      function replaceLongDateFormatTokens(input) {
        return locale.longDateFormat(input) || input;
      }
      localFormattingTokens.lastIndex = 0;
      while (i >= 0 && localFormattingTokens.test(format)) {
        format = format.replace(
          localFormattingTokens,
          replaceLongDateFormatTokens,
        );
        localFormattingTokens.lastIndex = 0;
        i -= 1;
      }
      return format;
    }
    var match1 = /\d/; //       0 - 9
    var match2 = /\d\d/; //      00 - 99
    var match3 = /\d{3}/; //     000 - 999
    var match4 = /\d{4}/; //    0000 - 9999
    var match6 = /[+-]?\d{6}/; // -999999 - 999999
    var match1to2 = /\d\d?/; //       0 - 99
    var match3to4 = /\d\d\d\d?/; //     999 - 9999
    var match5to6 = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3 = /\d{1,3}/; //       0 - 999
    var match1to4 = /\d{1,4}/; //       0 - 9999
    var match1to6 = /[+-]?\d{1,6}/; // -999999 - 999999
    var matchUnsigned = /\d+/; //       0 - inf
    var matchSigned = /[+-]?\d+/; //    -inf - inf
    var matchOffset = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z
    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123
    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord =
      /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
    var regexes = {};
    function addRegexToken(token, regex, strictRegex) {
      regexes[token] = isFunction(regex) ? regex
      : function (isStrict, localeData) {
        return (isStrict && strictRegex) ? strictRegex : regex;
      };
    }
    function getParseRegexForToken(token, config) {
      if (!hasOwnProp(regexes, token)) {
        return new RegExp(unescapeFormat(token));
      }
      return regexes[token](config._strict, config._locale);
    }
    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
      return regexEscape(
        s.replace("\\", "").replace(
          /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
          function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
          },
        ),
      );
    }
    function regexEscape(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    var tokens = {};
    function addParseToken(token, callback) {
      var i, func = callback;
      if (typeof token === "string") {
        token = [token];
      }
      if (isNumber(callback)) {
        func = function (input, array) {
          array[callback] = toInt(input);
        };
      }
      for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
      }
    }
    function addWeekParseToken(token, callback) {
      addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
      });
    }
    function addTimeToArrayFromToken(token, input, config) {
      if (input != null && hasOwnProp(tokens, token)) {
        tokens[token](input, config._a, config, token);
      }
    }
    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;
    // FORMATTING
    addFormatToken("Y", 0, 0, function () {
      var y = this.year();
      return y <= 9999 ? "" + y : "+" + y;
    });
    addFormatToken(0, ["YY", 2], 0, function () {
      return this.year() % 100;
    });
    addFormatToken(0, ["YYYY", 4], 0, "year");
    addFormatToken(0, ["YYYYY", 5], 0, "year");
    addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
    // ALIASES
    addUnitAlias("year", "y");
    // PRIORITIES
    addUnitPriority("year", 1);
    // PARSING
    addRegexToken("Y", matchSigned);
    addRegexToken("YY", match1to2, match2);
    addRegexToken("YYYY", match1to4, match4);
    addRegexToken("YYYYY", match1to6, match6);
    addRegexToken("YYYYYY", match1to6, match6);
    addParseToken(["YYYYY", "YYYYYY"], YEAR);
    addParseToken("YYYY", function (input, array) {
      array[YEAR] = input.length === 2
        ? hooks.parseTwoDigitYear(input)
        : toInt(input);
    });
    addParseToken("YY", function (input, array) {
      array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken("Y", function (input, array) {
      array[YEAR] = parseInt(input, 10);
    });
    // HELPERS
    function daysInYear(year) {
      return isLeapYear(year) ? 366 : 365;
    }
    function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    // HOOKS
    hooks.parseTwoDigitYear = function (input) {
      return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };
    // MOMENTS
    var getSetYear = makeGetSet("FullYear", true);
    function getIsLeapYear() {
      return isLeapYear(this.year());
    }
    function makeGetSet(unit, keepTime) {
      return function (value) {
        if (value != null) {
          set$1(this, unit, value);
          hooks.updateOffset(this, keepTime);
          return this;
        } else {
          return get(this, unit);
        }
      };
    }
    function get(mom, unit) {
      return mom.isValid() ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]()
      : NaN;
    }
    function set$1(mom, unit, value) {
      if (mom.isValid() && !isNaN(value)) {
        if (
          unit === "FullYear" && isLeapYear(mom.year()) &&
          mom.month() === 1 && mom.date() === 29
        ) {
          mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
            value,
            mom.month(),
            daysInMonth(value, mom.month()),
          );
        } else {
          mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
        }
      }
    }
    // MOMENTS
    function stringGet(units) {
      units = normalizeUnits(units);
      if (isFunction(this[units])) {
        return this[units]();
      }
      return this;
    }
    function stringSet(units, value) {
      if (typeof units === "object") {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units);
        for (var i = 0; i < prioritized.length; i++) {
          this[prioritized[i].unit](units[prioritized[i].unit]);
        }
      } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
          return this[units](value);
        }
      }
      return this;
    }
    function mod(n, x) {
      return ((n % x) + x) % x;
    }
    var indexOf;
    if (Array.prototype.indexOf) {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function (o) {
        // I know
        var i;
        for (i = 0; i < this.length; ++i) {
          if (this[i] === o) {
            return i;
          }
        }
        return -1;
      };
    }
    function daysInMonth(year, month) {
      if (isNaN(year) || isNaN(month)) {
        return NaN;
      }
      var modMonth = mod(month, 12);
      year += (month - modMonth) / 12;
      return modMonth === 1 ? (isLeapYear(year) ? 29 : 28)
      : (31 - modMonth % 7 % 2);
    }
    // FORMATTING
    addFormatToken("M", ["MM", 2], "Mo", function () {
      return this.month() + 1;
    });
    addFormatToken("MMM", 0, 0, function (format) {
      return this.localeData().monthsShort(this, format);
    });
    addFormatToken("MMMM", 0, 0, function (format) {
      return this.localeData().months(this, format);
    });
    // ALIASES
    addUnitAlias("month", "M");
    // PRIORITY
    addUnitPriority("month", 8);
    // PARSING
    addRegexToken("M", match1to2);
    addRegexToken("MM", match1to2, match2);
    addRegexToken("MMM", function (isStrict, locale) {
      return locale.monthsShortRegex(isStrict);
    });
    addRegexToken("MMMM", function (isStrict, locale) {
      return locale.monthsRegex(isStrict);
    });
    addParseToken(["M", "MM"], function (input, array) {
      array[MONTH] = toInt(input) - 1;
    });
    addParseToken(["MMM", "MMMM"], function (input, array, config, token) {
      var month = config._locale.monthsParse(input, token, config._strict);
      // if we didn't find a month name, mark the date as invalid.
      if (month != null) {
        array[MONTH] = month;
      } else {
        getParsingFlags(config).invalidMonth = input;
      }
    });
    // LOCALES
    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths =
      "January_February_March_April_May_June_July_August_September_October_November_December"
        .split("_");
    function localeMonths(m, format) {
      if (!m) {
        return isArray(this._months) ? this._months
        : this._months["standalone"];
      }
      return isArray(this._months) ? this._months[m.month()]
      : this._months[
        (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
          ? "format"
          : "standalone"
      ][m.month()];
    }
    var defaultLocaleMonthsShort =
      "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
    function localeMonthsShort(m, format) {
      if (!m) {
        return isArray(this._monthsShort)
          ? this._monthsShort
          : this._monthsShort["standalone"];
      }
      return isArray(this._monthsShort)
        ? this._monthsShort[m.month()]
        : this
          ._monthsShort[
          MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"
        ][m.month()];
    }
    function handleStrictParse(monthName, format, strict) {
      var i, ii, mom, llc = monthName.toLocaleLowerCase();
      if (!this._monthsParse) {
        // this is not used
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
          mom = createUTC([2000, i]);
          this._shortMonthsParse[i] = this.monthsShort(mom, "")
            .toLocaleLowerCase();
          this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
        }
      }
      if (strict) {
        if (format === "MMM") {
          ii = indexOf.call(this._shortMonthsParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._longMonthsParse, llc);
          return ii !== -1 ? ii : null;
        }
      } else {
        if (format === "MMM") {
          ii = indexOf.call(this._shortMonthsParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._longMonthsParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._longMonthsParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortMonthsParse, llc);
          return ii !== -1 ? ii : null;
        }
      }
    }
    function localeMonthsParse(monthName, format, strict) {
      var i, mom, regex;
      if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format, strict);
      }
      if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
      }
      // TODO: add sorting
      // Sorting makes sure if one month (or abbr) is a prefix of another
      // see sorting in computeMonthsParse
      for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
          this._longMonthsParse[i] = new RegExp(
            "^" + this.months(mom, "").replace(".", "") + "$",
            "i",
          );
          this._shortMonthsParse[i] = new RegExp(
            "^" + this.monthsShort(mom, "").replace(".", "") + "$",
            "i",
          );
        }
        if (!strict && !this._monthsParse[i]) {
          regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
          this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
        }
        // test the regex
        if (
          strict && format === "MMMM" &&
          this._longMonthsParse[i].test(monthName)
        ) {
          return i;
        } else if (
          strict && format === "MMM" &&
          this._shortMonthsParse[i].test(monthName)
        ) {
          return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
          return i;
        }
      }
    }
    // MOMENTS
    function setMonth(mom, value) {
      var dayOfMonth;
      if (!mom.isValid()) {
        // No op
        return mom;
      }
      if (typeof value === "string") {
        if (/^\d+$/.test(value)) {
          value = toInt(value);
        } else {
          value = mom.localeData().monthsParse(value);
          // TODO: Another silent failure?
          if (!isNumber(value)) {
            return mom;
          }
        }
      }
      dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
      mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](value, dayOfMonth);
      return mom;
    }
    function getSetMonth(value) {
      if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
      } else {
        return get(this, "Month");
      }
    }
    function getDaysInMonth() {
      return daysInMonth(this.year(), this.month());
    }
    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex(isStrict) {
      if (this._monthsParseExact) {
        if (!hasOwnProp(this, "_monthsRegex")) {
          computeMonthsParse.call(this);
        }
        if (isStrict) {
          return this._monthsShortStrictRegex;
        } else {
          return this._monthsShortRegex;
        }
      } else {
        if (!hasOwnProp(this, "_monthsShortRegex")) {
          this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict
          ? this._monthsShortStrictRegex : this._monthsShortRegex;
      }
    }
    var defaultMonthsRegex = matchWord;
    function monthsRegex(isStrict) {
      if (this._monthsParseExact) {
        if (!hasOwnProp(this, "_monthsRegex")) {
          computeMonthsParse.call(this);
        }
        if (isStrict) {
          return this._monthsStrictRegex;
        } else {
          return this._monthsRegex;
        }
      } else {
        if (!hasOwnProp(this, "_monthsRegex")) {
          this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex
        : this._monthsRegex;
      }
    }
    function computeMonthsParse() {
      function cmpLenRev(a, b) {
        return b.length - a.length;
      }
      var shortPieces = [], longPieces = [], mixedPieces = [], i, mom;
      for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        shortPieces.push(this.monthsShort(mom, ""));
        longPieces.push(this.months(mom, ""));
        mixedPieces.push(this.months(mom, ""));
        mixedPieces.push(this.monthsShort(mom, ""));
      }
      // Sorting makes sure if one month (or abbr) is a prefix of another it
      // will match the longer piece.
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      for (i = 0; i < 12; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
      }
      for (i = 0; i < 24; i++) {
        mixedPieces[i] = regexEscape(mixedPieces[i]);
      }
      this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._monthsShortRegex = this._monthsRegex;
      this._monthsStrictRegex = new RegExp(
        "^(" + longPieces.join("|") + ")",
        "i",
      );
      this._monthsShortStrictRegex = new RegExp(
        "^(" + shortPieces.join("|") + ")",
        "i",
      );
    }
    function createDate(y, m, d, h, M, s, ms) {
      // can't just apply() to create a date:
      // https://stackoverflow.com/q/181348
      var date;
      // the date constructor remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
        // preserve leap years using a full 400 year cycle, then reset
        date = new Date(y + 400, m, d, h, M, s, ms);
        if (isFinite(date.getFullYear())) {
          date.setFullYear(y);
        }
      } else {
        date = new Date(y, m, d, h, M, s, ms);
      }
      return date;
    }
    function createUTCDate(y) {
      var date;
      // the Date.UTC function remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
        var args = Array.prototype.slice.call(arguments);
        // preserve leap years using a full 400 year cycle, then reset
        args[0] = y + 400;
        date = new Date(Date.UTC.apply(null, args));
        if (isFinite(date.getUTCFullYear())) {
          date.setUTCFullYear(y);
        }
      } else {
        date = new Date(Date.UTC.apply(null, arguments));
      }
      return date;
    }
    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
      var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
      fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
      return -fwdlw + fwd - 1;
    }
    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
      var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear,
        resDayOfYear;
      if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
      } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
      } else {
        resYear = year;
        resDayOfYear = dayOfYear;
      }
      return {
        year: resYear,
        dayOfYear: resDayOfYear,
      };
    }
    function weekOfYear(mom, dow, doy) {
      var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek,
        resYear;
      if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
      } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
      } else {
        resYear = mom.year();
        resWeek = week;
      }
      return {
        week: resWeek,
        year: resYear,
      };
    }
    function weeksInYear(year, dow, doy) {
      var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
      return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }
    // FORMATTING
    addFormatToken("w", ["ww", 2], "wo", "week");
    addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
    // ALIASES
    addUnitAlias("week", "w");
    addUnitAlias("isoWeek", "W");
    // PRIORITIES
    addUnitPriority("week", 5);
    addUnitPriority("isoWeek", 5);
    // PARSING
    addRegexToken("w", match1to2);
    addRegexToken("ww", match1to2, match2);
    addRegexToken("W", match1to2);
    addRegexToken("WW", match1to2, match2);
    addWeekParseToken(
      ["w", "ww", "W", "WW"],
      function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
      },
    );
    // HELPERS
    // LOCALES
    function localeWeek(mom) {
      return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }
    var defaultLocaleWeek = {
      dow: 0,
      doy: 6, // The week that contains Jan 6th is the first week of the year.
    };
    function localeFirstDayOfWeek() {
      return this._week.dow;
    }
    function localeFirstDayOfYear() {
      return this._week.doy;
    }
    // MOMENTS
    function getSetWeek(input) {
      var week = this.localeData().week(this);
      return input == null ? week : this.add((input - week) * 7, "d");
    }
    function getSetISOWeek(input) {
      var week = weekOfYear(this, 1, 4).week;
      return input == null ? week : this.add((input - week) * 7, "d");
    }
    // FORMATTING
    addFormatToken("d", 0, "do", "day");
    addFormatToken("dd", 0, 0, function (format) {
      return this.localeData().weekdaysMin(this, format);
    });
    addFormatToken("ddd", 0, 0, function (format) {
      return this.localeData().weekdaysShort(this, format);
    });
    addFormatToken("dddd", 0, 0, function (format) {
      return this.localeData().weekdays(this, format);
    });
    addFormatToken("e", 0, 0, "weekday");
    addFormatToken("E", 0, 0, "isoWeekday");
    // ALIASES
    addUnitAlias("day", "d");
    addUnitAlias("weekday", "e");
    addUnitAlias("isoWeekday", "E");
    // PRIORITY
    addUnitPriority("day", 11);
    addUnitPriority("weekday", 11);
    addUnitPriority("isoWeekday", 11);
    // PARSING
    addRegexToken("d", match1to2);
    addRegexToken("e", match1to2);
    addRegexToken("E", match1to2);
    addRegexToken("dd", function (isStrict, locale) {
      return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken("ddd", function (isStrict, locale) {
      return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken("dddd", function (isStrict, locale) {
      return locale.weekdaysRegex(isStrict);
    });
    addWeekParseToken(
      ["dd", "ddd", "dddd"],
      function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(
          input,
          token,
          config._strict,
        );
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
          week.d = weekday;
        } else {
          getParsingFlags(config).invalidWeekday = input;
        }
      },
    );
    addWeekParseToken(["d", "e", "E"], function (input, week, config, token) {
      week[token] = toInt(input);
    });
    // HELPERS
    function parseWeekday(input, locale) {
      if (typeof input !== "string") {
        return input;
      }
      if (!isNaN(input)) {
        return parseInt(input, 10);
      }
      input = locale.weekdaysParse(input);
      if (typeof input === "number") {
        return input;
      }
      return null;
    }
    function parseIsoWeekday(input, locale) {
      if (typeof input === "string") {
        return locale.weekdaysParse(input) % 7 || 7;
      }
      return isNaN(input) ? null : input;
    }
    // LOCALES
    function shiftWeekdays(ws, n) {
      return ws.slice(n, 7).concat(ws.slice(0, n));
    }
    var defaultLocaleWeekdays =
      "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
    function localeWeekdays(m, format) {
      var weekdays = isArray(this._weekdays) ? this._weekdays
      : this
        ._weekdays[
        (m && m !== true && this._weekdays.isFormat.test(format)) ? "format"
        : "standalone"
      ];
      return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
      : (m) ? weekdays[m.day()] : weekdays;
    }
    var defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
    function localeWeekdaysShort(m) {
      return (m === true)
        ? shiftWeekdays(this._weekdaysShort, this._week.dow)
        : (m)
        ? this._weekdaysShort[m.day()]
        : this._weekdaysShort;
    }
    var defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    function localeWeekdaysMin(m) {
      return (m === true)
        ? shiftWeekdays(this._weekdaysMin, this._week.dow)
        : (m)
        ? this._weekdaysMin[m.day()]
        : this._weekdaysMin;
    }
    function handleStrictParse$1(weekdayName, format, strict) {
      var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
      if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];
        for (i = 0; i < 7; ++i) {
          mom = createUTC([2000, 1]).day(i);
          this._minWeekdaysParse[i] = this.weekdaysMin(mom, "")
            .toLocaleLowerCase();
          this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "")
            .toLocaleLowerCase();
          this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
        }
      }
      if (strict) {
        if (format === "dddd") {
          ii = indexOf.call(this._weekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else if (format === "ddd") {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        }
      } else {
        if (format === "dddd") {
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else if (format === "ddd") {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._minWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        }
      }
    }
    function localeWeekdaysParse(weekdayName, format, strict) {
      var i, mom, regex;
      if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format, strict);
      }
      if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
      }
      for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
          this._fullWeekdaysParse[i] = new RegExp(
            "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
            "i",
          );
          this._shortWeekdaysParse[i] = new RegExp(
            "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
            "i",
          );
          this._minWeekdaysParse[i] = new RegExp(
            "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
            "i",
          );
        }
        if (!this._weekdaysParse[i]) {
          regex = "^" + this.weekdays(mom, "") + "|^" +
            this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
          this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
        }
        // test the regex
        if (
          strict && format === "dddd" &&
          this._fullWeekdaysParse[i].test(weekdayName)
        ) {
          return i;
        } else if (
          strict && format === "ddd" &&
          this._shortWeekdaysParse[i].test(weekdayName)
        ) {
          return i;
        } else if (
          strict && format === "dd" &&
          this._minWeekdaysParse[i].test(weekdayName)
        ) {
          return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
          return i;
        }
      }
    }
    // MOMENTS
    function getSetDayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, "d");
      } else {
        return day;
      }
    }
    function getSetLocaleDayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return input == null ? weekday : this.add(input - weekday, "d");
    }
    function getSetISODayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      // behaves the same as moment#day except
      // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
      // as a setter, sunday should belong to the previous week.
      if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
      } else {
        return this.day() || 7;
      }
    }
    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysStrictRegex;
        } else {
          return this._weekdaysRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex
        : this._weekdaysRegex;
      }
    }
    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysShortStrictRegex;
        } else {
          return this._weekdaysShortRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysShortRegex")) {
          this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict
          ? this._weekdaysShortStrictRegex
          : this._weekdaysShortRegex;
      }
    }
    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysMinStrictRegex;
        } else {
          return this._weekdaysMinRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysMinRegex")) {
          this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict
          ? this._weekdaysMinStrictRegex
          : this._weekdaysMinRegex;
      }
    }
    function computeWeekdaysParse() {
      function cmpLenRev(a, b) {
        return b.length - a.length;
      }
      var minPieces = [],
        shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom,
        minp,
        shortp,
        longp;
      for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, "");
        shortp = this.weekdaysShort(mom, "");
        longp = this.weekdays(mom, "");
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
      }
      // Sorting makes sure if one weekday (or abbr) is a prefix of another it
      // will match the longer piece.
      minPieces.sort(cmpLenRev);
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
      }
      this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._weekdaysShortRegex = this._weekdaysRegex;
      this._weekdaysMinRegex = this._weekdaysRegex;
      this._weekdaysStrictRegex = new RegExp(
        "^(" + longPieces.join("|") + ")",
        "i",
      );
      this._weekdaysShortStrictRegex = new RegExp(
        "^(" + shortPieces.join("|") + ")",
        "i",
      );
      this._weekdaysMinStrictRegex = new RegExp(
        "^(" + minPieces.join("|") + ")",
        "i",
      );
    }
    // FORMATTING
    function hFormat() {
      return this.hours() % 12 || 12;
    }
    function kFormat() {
      return this.hours() || 24;
    }
    addFormatToken("H", ["HH", 2], 0, "hour");
    addFormatToken("h", ["hh", 2], 0, hFormat);
    addFormatToken("k", ["kk", 2], 0, kFormat);
    addFormatToken("hmm", 0, 0, function () {
      return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });
    addFormatToken("hmmss", 0, 0, function () {
      return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
    });
    addFormatToken("Hmm", 0, 0, function () {
      return "" + this.hours() + zeroFill(this.minutes(), 2);
    });
    addFormatToken("Hmmss", 0, 0, function () {
      return "" + this.hours() + zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2);
    });
    function meridiem(token, lowercase) {
      addFormatToken(token, 0, 0, function () {
        return this.localeData().meridiem(
          this.hours(),
          this.minutes(),
          lowercase,
        );
      });
    }
    meridiem("a", true);
    meridiem("A", false);
    // ALIASES
    addUnitAlias("hour", "h");
    // PRIORITY
    addUnitPriority("hour", 13);
    // PARSING
    function matchMeridiem(isStrict, locale) {
      return locale._meridiemParse;
    }
    addRegexToken("a", matchMeridiem);
    addRegexToken("A", matchMeridiem);
    addRegexToken("H", match1to2);
    addRegexToken("h", match1to2);
    addRegexToken("k", match1to2);
    addRegexToken("HH", match1to2, match2);
    addRegexToken("hh", match1to2, match2);
    addRegexToken("kk", match1to2, match2);
    addRegexToken("hmm", match3to4);
    addRegexToken("hmmss", match5to6);
    addRegexToken("Hmm", match3to4);
    addRegexToken("Hmmss", match5to6);
    addParseToken(["H", "HH"], HOUR);
    addParseToken(["k", "kk"], function (input, array, config) {
      var kInput = toInt(input);
      array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(["a", "A"], function (input, array, config) {
      config._isPm = config._locale.isPM(input);
      config._meridiem = input;
    });
    addParseToken(["h", "hh"], function (input, array, config) {
      array[HOUR] = toInt(input);
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("hmm", function (input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("hmmss", function (input, array, config) {
      var pos1 = input.length - 4;
      var pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("Hmm", function (input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken("Hmmss", function (input, array, config) {
      var pos1 = input.length - 4;
      var pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
    });
    // LOCALES
    function localeIsPM(input) {
      // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
      // Using charAt should be more compatible.
      return ((input + "").toLowerCase().charAt(0) === "p");
    }
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem(hours, minutes, isLower) {
      if (hours > 11) {
        return isLower ? "pm" : "PM";
      } else {
        return isLower ? "am" : "AM";
      }
    }
    // MOMENTS
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet("Hours", true);
    var baseConfig = {
      calendar: defaultCalendar,
      longDateFormat: defaultLongDateFormat,
      invalidDate: defaultInvalidDate,
      ordinal: defaultOrdinal,
      dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
      relativeTime: defaultRelativeTime,
      months: defaultLocaleMonths,
      monthsShort: defaultLocaleMonthsShort,
      week: defaultLocaleWeek,
      weekdays: defaultLocaleWeekdays,
      weekdaysMin: defaultLocaleWeekdaysMin,
      weekdaysShort: defaultLocaleWeekdaysShort,
      meridiemParse: defaultLocaleMeridiemParse,
    };
    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;
    function normalizeLocale(key) {
      return key ? key.toLowerCase().replace("_", "-") : key;
    }
    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
      var i = 0, j, next, locale, split;
      while (i < names.length) {
        split = normalizeLocale(names[i]).split("-");
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split("-") : null;
        while (j > 0) {
          locale = loadLocale(split.slice(0, j).join("-"));
          if (locale) {
            return locale;
          }
          if (
            next && next.length >= j &&
            compareArrays(split, next, true) >= j - 1
          ) {
            //the next array item is better than a shallower substring of this one
            break;
          }
          j--;
        }
        i++;
      }
      return globalLocale;
    }
    function loadLocale(name) {
      var oldLocale = null;
      // TODO: Find a better way to register and load all the locales in Node
      if (
        !locales[name] && (typeof module !== "undefined") &&
        module && module.exports
      ) {
        try {
          oldLocale = globalLocale._abbr;
          var aliasedRequire = require;
          aliasedRequire("./locale/" + name);
          getSetGlobalLocale(oldLocale);
        } catch (e) {}
      }
      return locales[name];
    }
    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
      var data;
      if (key) {
        if (isUndefined(values)) {
          data = getLocale(key);
        } else {
          data = defineLocale(key, values);
        }
        if (data) {
          // moment.duration._locale = moment._locale = data;
          globalLocale = data;
        } else {
          if ((typeof console !== "undefined") && console.warn) {
            //warn user if arguments are passed but the locale could not be set
            console.warn(
              "Locale " + key + " not found. Did you forget to load it?",
            );
          }
        }
      }
      return globalLocale._abbr;
    }
    function defineLocale(name, config) {
      if (config !== null) {
        var locale, parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
          deprecateSimple(
            "defineLocaleOverride",
            "use moment.updateLocale(localeName, config) to change " +
              "an existing locale. moment.defineLocale(localeName, " +
              "config) should only be used for creating a new locale " +
              "See http://momentjs.com/guides/#/warnings/define-locale/ for more info.",
          );
          parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
          if (locales[config.parentLocale] != null) {
            parentConfig = locales[config.parentLocale]._config;
          } else {
            locale = loadLocale(config.parentLocale);
            if (locale != null) {
              parentConfig = locale._config;
            } else {
              if (!localeFamilies[config.parentLocale]) {
                localeFamilies[config.parentLocale] = [];
              }
              localeFamilies[config.parentLocale].push({
                name: name,
                config: config,
              });
              return null;
            }
          }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));
        if (localeFamilies[name]) {
          localeFamilies[name].forEach(function (x) {
            defineLocale(x.name, x.config);
          });
        }
        // backwards compat for now: also set the locale
        // make sure we set the locale AFTER all child locales have been
        // created, so we won't end up with the child locale set.
        getSetGlobalLocale(name);
        return locales[name];
      } else {
        // useful for testing
        delete locales[name];
        return null;
      }
    }
    function updateLocale(name, config) {
      if (config != null) {
        var locale, tmpLocale, parentConfig = baseConfig;
        // MERGE
        tmpLocale = loadLocale(name);
        if (tmpLocale != null) {
          parentConfig = tmpLocale._config;
        }
        config = mergeConfigs(parentConfig, config);
        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;
        // backwards compat for now: also set the locale
        getSetGlobalLocale(name);
      } else {
        // pass null for config to unupdate, useful for tests
        if (locales[name] != null) {
          if (locales[name].parentLocale != null) {
            locales[name] = locales[name].parentLocale;
          } else if (locales[name] != null) {
            delete locales[name];
          }
        }
      }
      return locales[name];
    }
    // returns locale data
    function getLocale(key) {
      var locale;
      if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
      }
      if (!key) {
        return globalLocale;
      }
      if (!isArray(key)) {
        //short-circuit everything else
        locale = loadLocale(key);
        if (locale) {
          return locale;
        }
        key = [key];
      }
      return chooseLocale(key);
    }
    function listLocales() {
      return keys(locales);
    }
    function checkOverflow(m) {
      var overflow;
      var a = m._a;
      if (a && getParsingFlags(m).overflow === -2) {
        overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH
        : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
        ? DATE
        : a[HOUR] < 0 || a[HOUR] > 24 ||
          (a[HOUR] === 24 &&
            (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0))
        ? HOUR
        : a[MINUTE] < 0 || a[MINUTE] > 59
        ? MINUTE
        : a[SECOND] < 0 || a[SECOND] > 59
        ? SECOND
        : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
        ? MILLISECOND
        : -1;
        if (
          getParsingFlags(m)._overflowDayOfYear &&
          (overflow < YEAR || overflow > DATE)
        ) {
          overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
          overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
          overflow = WEEKDAY;
        }
        getParsingFlags(m).overflow = overflow;
      }
      return m;
    }
    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
      if (a != null) {
        return a;
      }
      if (b != null) {
        return b;
      }
      return c;
    }
    function currentDateArray(config) {
      // hooks is actually the exported moment object
      var nowValue = new Date(hooks.now());
      if (config._useUTC) {
        return [
          nowValue.getUTCFullYear(),
          nowValue.getUTCMonth(),
          nowValue.getUTCDate(),
        ];
      }
      return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }
    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
      var i, date, input = [], currentDate, expectedWeekday, yearToUse;
      if (config._d) {
        return;
      }
      currentDate = currentDateArray(config);
      //compute day of the year from weeks and weekdays
      if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
      }
      //if the day of the year is set, figure out what it is
      if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
        if (
          config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0
        ) {
          getParsingFlags(config)._overflowDayOfYear = true;
        }
        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
      }
      // Default to current date.
      // * if no year, month, day of month are given, default to today
      // * if day of month is given, default month and year
      // * if month is given, default only year
      // * if year is given, don't default anything
      for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
      }
      // Zero out whatever was not defaulted, including time
      for (; i < 7; i++) {
        config._a[i] = input[i] = (config._a[i] == null)
          ? (i === 2 ? 1 : 0)
          : config._a[i];
      }
      // Check for 24:00:00.000
      if (
        config._a[HOUR] === 24 &&
        config._a[MINUTE] === 0 &&
        config._a[SECOND] === 0 &&
        config._a[MILLISECOND] === 0
      ) {
        config._nextDay = true;
        config._a[HOUR] = 0;
      }
      config._d = (config._useUTC ? createUTCDate : createDate).apply(
        null,
        input,
      );
      expectedWeekday = config._useUTC
        ? config._d.getUTCDay()
        : config._d.getDay();
      // Apply timezone offset from input. The actual utcOffset can be changed
      // with parseZone.
      if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
      }
      if (config._nextDay) {
        config._a[HOUR] = 24;
      }
      // check for mismatching day of week
      if (
        config._w && typeof config._w.d !== "undefined" &&
        config._w.d !== expectedWeekday
      ) {
        getParsingFlags(config).weekdayMismatch = true;
      }
    }
    function dayOfYearFromWeekInfo(config) {
      var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
      w = config._w;
      if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;
        // TODO: We need to take the current isoWeekYear, but that depends on
        // how we interpret now (local, utc, fixed offset). So create
        // a now version of current config (take local/utc/offset flags, and
        // create now).
        weekYear = defaults(
          w.GG,
          config._a[YEAR],
          weekOfYear(createLocal(), 1, 4).year,
        );
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
          weekdayOverflow = true;
        }
      } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;
        var curWeek = weekOfYear(createLocal(), dow, doy);
        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
        // Default to current week.
        week = defaults(w.w, curWeek.week);
        if (w.d != null) {
          // weekday -- low day numbers are considered next week
          weekday = w.d;
          if (weekday < 0 || weekday > 6) {
            weekdayOverflow = true;
          }
        } else if (w.e != null) {
          // local weekday -- counting starts from beginning of week
          weekday = w.e + dow;
          if (w.e < 0 || w.e > 6) {
            weekdayOverflow = true;
          }
        } else {
          // default to beginning of week
          weekday = dow;
        }
      }
      if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
      } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
      } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
      }
    }
    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex =
      /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex =
      /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
    var isoDates = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
      ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
      ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
      ["YYYY-DDD", /\d{4}-\d{3}/],
      ["YYYY-MM", /\d{4}-\d\d/, false],
      ["YYYYYYMMDD", /[+-]\d{10}/],
      ["YYYYMMDD", /\d{8}/],
      // YYYYMM is NOT allowed by the standard
      ["GGGG[W]WWE", /\d{4}W\d{3}/],
      ["GGGG[W]WW", /\d{4}W\d{2}/, false],
      ["YYYYDDD", /\d{7}/],
    ];
    // iso time formats and regexes
    var isoTimes = [
      ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
      ["HH:mm:ss", /\d\d:\d\d:\d\d/],
      ["HH:mm", /\d\d:\d\d/],
      ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
      ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
      ["HHmmss", /\d\d\d\d\d\d/],
      ["HHmm", /\d\d\d\d/],
      ["HH", /\d\d/],
    ];
    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
    // date from iso format
    function configFromISO(config) {
      var i,
        l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime,
        dateFormat,
        timeFormat,
        tzFormat;
      if (match) {
        getParsingFlags(config).iso = true;
        for (i = 0, l = isoDates.length; i < l; i++) {
          if (isoDates[i][1].exec(match[1])) {
            dateFormat = isoDates[i][0];
            allowTime = isoDates[i][2] !== false;
            break;
          }
        }
        if (dateFormat == null) {
          config._isValid = false;
          return;
        }
        if (match[3]) {
          for (i = 0, l = isoTimes.length; i < l; i++) {
            if (isoTimes[i][1].exec(match[3])) {
              // match[2] should be 'T' or space
              timeFormat = (match[2] || " ") + isoTimes[i][0];
              break;
            }
          }
          if (timeFormat == null) {
            config._isValid = false;
            return;
          }
        }
        if (!allowTime && timeFormat != null) {
          config._isValid = false;
          return;
        }
        if (match[4]) {
          if (tzRegex.exec(match[4])) {
            tzFormat = "Z";
          } else {
            config._isValid = false;
            return;
          }
        }
        config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
        configFromStringAndFormat(config);
      } else {
        config._isValid = false;
      }
    }
    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 =
      /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
    function extractFromRFC2822Strings(
      yearStr,
      monthStr,
      dayStr,
      hourStr,
      minuteStr,
      secondStr,
    ) {
      var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10),
      ];
      if (secondStr) {
        result.push(parseInt(secondStr, 10));
      }
      return result;
    }
    function untruncateYear(yearStr) {
      var year = parseInt(yearStr, 10);
      if (year <= 49) {
        return 2000 + year;
      } else if (year <= 999) {
        return 1900 + year;
      }
      return year;
    }
    function preprocessRFC2822(s) {
      // Remove comments and folding whitespace and replace multiple-spaces with a single space
      return s.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ")
        .replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    }
    function checkWeekday(weekdayStr, parsedInput, config) {
      if (weekdayStr) {
        // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
          weekdayActual = new Date(
            parsedInput[0],
            parsedInput[1],
            parsedInput[2],
          ).getDay();
        if (weekdayProvided !== weekdayActual) {
          getParsingFlags(config).weekdayMismatch = true;
          config._isValid = false;
          return false;
        }
      }
      return true;
    }
    var obsOffsets = {
      UT: 0,
      GMT: 0,
      EDT: -4 * 60,
      EST: -5 * 60,
      CDT: -5 * 60,
      CST: -6 * 60,
      MDT: -6 * 60,
      MST: -7 * 60,
      PDT: -7 * 60,
      PST: -8 * 60,
    };
    function calculateOffset(obsOffset, militaryOffset, numOffset) {
      if (obsOffset) {
        return obsOffsets[obsOffset];
      } else if (militaryOffset) {
        // the only allowed military tz is Z
        return 0;
      } else {
        var hm = parseInt(numOffset, 10);
        var m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
      }
    }
    // date and time from ref 2822 format
    function configFromRFC2822(config) {
      var match = rfc2822.exec(preprocessRFC2822(config._i));
      if (match) {
        var parsedArray = extractFromRFC2822Strings(
          match[4],
          match[3],
          match[2],
          match[5],
          match[6],
          match[7],
        );
        if (!checkWeekday(match[1], parsedArray, config)) {
          return;
        }
        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);
        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        getParsingFlags(config).rfc2822 = true;
      } else {
        config._isValid = false;
      }
    }
    // date from iso format or fallback
    function configFromString(config) {
      var matched = aspNetJsonRegex.exec(config._i);
      if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
      }
      configFromISO(config);
      if (config._isValid === false) {
        delete config._isValid;
      } else {
        return;
      }
      configFromRFC2822(config);
      if (config._isValid === false) {
        delete config._isValid;
      } else {
        return;
      }
      // Final attempt, use Input Fallback
      hooks.createFromInputFallback(config);
    }
    hooks.createFromInputFallback = deprecate(
      "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), " +
        "which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are " +
        "discouraged and will be removed in an upcoming major release. Please refer to " +
        "http://momentjs.com/guides/#/warnings/js-date/ for more info.",
      function (config) {
        config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
      },
    );
    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};
    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};
    // date from string and format string
    function configFromStringAndFormat(config) {
      // TODO: Move this to another part of the creation flow to prevent circular deps
      if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
      }
      if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
      }
      config._a = [];
      getParsingFlags(config).empty = true;
      // This array is used to make a Date, either with `new Date` or `Date.UTC`
      var string = "" + config._i,
        i,
        parsedInput,
        tokens,
        token,
        skipped,
        stringLength = string.length,
        totalParsedInputLength = 0;
      tokens =
        expandFormat(config._f, config._locale).match(formattingTokens) || [];
      for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput =
          (string.match(getParseRegexForToken(token, config)) || [])[0];
        // console.log('token', token, 'parsedInput', parsedInput,
        //         'regex', getParseRegexForToken(token, config));
        if (parsedInput) {
          skipped = string.substr(0, string.indexOf(parsedInput));
          if (skipped.length > 0) {
            getParsingFlags(config).unusedInput.push(skipped);
          }
          string = string.slice(
            string.indexOf(parsedInput) + parsedInput.length,
          );
          totalParsedInputLength += parsedInput.length;
        }
        // don't parse if it's not a known token
        if (formatTokenFunctions[token]) {
          if (parsedInput) {
            getParsingFlags(config).empty = false;
          } else {
            getParsingFlags(config).unusedTokens.push(token);
          }
          addTimeToArrayFromToken(token, parsedInput, config);
        } else if (config._strict && !parsedInput) {
          getParsingFlags(config).unusedTokens.push(token);
        }
      }
      // add remaining unparsed input length to the string
      getParsingFlags(config).charsLeftOver = stringLength -
        totalParsedInputLength;
      if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
      }
      // clear _12h flag if hour is <= 12
      if (
        config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0
      ) {
        getParsingFlags(config).bigHour = undefined;
      }
      getParsingFlags(config).parsedDateParts = config._a.slice(0);
      getParsingFlags(config).meridiem = config._meridiem;
      // handle meridiem
      config._a[HOUR] = meridiemFixWrap(
        config._locale,
        config._a[HOUR],
        config._meridiem,
      );
      configFromArray(config);
      checkOverflow(config);
    }
    function meridiemFixWrap(locale, hour, meridiem) {
      var isPm;
      if (meridiem == null) {
        // nothing to do
        return hour;
      }
      if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
      } else if (locale.isPM != null) {
        // Fallback
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
          hour += 12;
        }
        if (!isPm && hour === 12) {
          hour = 0;
        }
        return hour;
      } else {
        // this is not supposed to happen
        return hour;
      }
    }
    // date from string and array of format strings
    function configFromStringAndArray(config) {
      var tempConfig, bestMoment, scoreToBeat, i, currentScore;
      if (config._f.length === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
      }
      for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
          tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);
        if (!isValid(tempConfig)) {
          continue;
        }
        // if there is any input that was not parsed add a penalty for that format
        currentScore += getParsingFlags(tempConfig).charsLeftOver;
        //or tokens
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
        getParsingFlags(tempConfig).score = currentScore;
        if (scoreToBeat == null || currentScore < scoreToBeat) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;
        }
      }
      extend(config, bestMoment || tempConfig);
    }
    function configFromObject(config) {
      if (config._d) {
        return;
      }
      var i = normalizeObjectUnits(config._i);
      config._a = map(
        [
          i.year,
          i.month,
          i.day || i.date,
          i.hour,
          i.minute,
          i.second,
          i.millisecond,
        ],
        function (obj) {
          return obj && parseInt(obj, 10);
        },
      );
      configFromArray(config);
    }
    function createFromConfig(config) {
      var res = new Moment(checkOverflow(prepareConfig(config)));
      if (res._nextDay) {
        // Adding is smart enough around DST
        res.add(1, "d");
        res._nextDay = undefined;
      }
      return res;
    }
    function prepareConfig(config) {
      var input = config._i, format = config._f;
      config._locale = config._locale || getLocale(config._l);
      if (input === null || (format === undefined && input === "")) {
        return createInvalid({ nullInput: true });
      }
      if (typeof input === "string") {
        config._i = input = config._locale.preparse(input);
      }
      if (isMoment(input)) {
        return new Moment(checkOverflow(input));
      } else if (isDate(input)) {
        config._d = input;
      } else if (isArray(format)) {
        configFromStringAndArray(config);
      } else if (format) {
        configFromStringAndFormat(config);
      } else {
        configFromInput(config);
      }
      if (!isValid(config)) {
        config._d = null;
      }
      return config;
    }
    function configFromInput(config) {
      var input = config._i;
      if (isUndefined(input)) {
        config._d = new Date(hooks.now());
      } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
      } else if (typeof input === "string") {
        configFromString(config);
      } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
          return parseInt(obj, 10);
        });
        configFromArray(config);
      } else if (isObject(input)) {
        configFromObject(config);
      } else if (isNumber(input)) {
        // from milliseconds
        config._d = new Date(input);
      } else {
        hooks.createFromInputFallback(config);
      }
    }
    function createLocalOrUTC(input, format, locale, strict, isUTC) {
      var c = {};
      if (locale === true || locale === false) {
        strict = locale;
        locale = undefined;
      }
      if (
        (isObject(input) && isObjectEmpty(input)) ||
        (isArray(input) && input.length === 0)
      ) {
        input = undefined;
      }
      // object construction must be done this way.
      // https://github.com/moment/moment/issues/1423
      c._isAMomentObject = true;
      c._useUTC = c._isUTC = isUTC;
      c._l = locale;
      c._i = input;
      c._f = format;
      c._strict = strict;
      return createFromConfig(c);
    }
    function createLocal(input, format, locale, strict) {
      return createLocalOrUTC(input, format, locale, strict, false);
    }
    var prototypeMin = deprecate(
      "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
          return other < this ? this : other;
        } else {
          return createInvalid();
        }
      },
    );
    var prototypeMax = deprecate(
      "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
          return other > this ? this : other;
        } else {
          return createInvalid();
        }
      },
    );
    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
      var res, i;
      if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
      }
      if (!moments.length) {
        return createLocal();
      }
      res = moments[0];
      for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
          res = moments[i];
        }
      }
      return res;
    }
    // TODO: Use [].sort instead?
    function min() {
      var args = [].slice.call(arguments, 0);
      return pickBy("isBefore", args);
    }
    function max() {
      var args = [].slice.call(arguments, 0);
      return pickBy("isAfter", args);
    }
    var now = function () {
      return Date.now ? Date.now() : +(new Date());
    };
    var ordering = [
      "year",
      "quarter",
      "month",
      "week",
      "day",
      "hour",
      "minute",
      "second",
      "millisecond",
    ];
    function isDurationValid(m) {
      for (var key in m) {
        if (
          !(indexOf.call(ordering, key) !== -1 &&
            (m[key] == null || !isNaN(m[key])))
        ) {
          return false;
        }
      }
      var unitHasDecimal = false;
      for (var i = 0; i < ordering.length; ++i) {
        if (m[ordering[i]]) {
          if (unitHasDecimal) {
            return false; // only allow non-integers for smallest unit
          }
          if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
            unitHasDecimal = true;
          }
        }
      }
      return true;
    }
    function isValid$1() {
      return this._isValid;
    }
    function createInvalid$1() {
      return createDuration(NaN);
    }
    function Duration(duration) {
      var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;
      this._isValid = isDurationValid(normalizedInput);
      // representation for dateAddRemove
      this._milliseconds = +milliseconds +
        seconds * 1e3 + // 1000
        minutes * 6e4 + // 1000 * 60
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
      // Because of dateAddRemove treats 24 hours as different from a
      // day when working around DST, we need to store them separately
      this._days = +days +
        weeks * 7;
      // It is impossible to translate months into days without knowing
      // which months you are are talking about, so we have to store
      // it separately.
      this._months = +months +
        quarters * 3 +
        years * 12;
      this._data = {};
      this._locale = getLocale();
      this._bubble();
    }
    function isDuration(obj) {
      return obj instanceof Duration;
    }
    function absRound(number) {
      if (number < 0) {
        return Math.round(-1 * number) * -1;
      } else {
        return Math.round(number);
      }
    }
    // FORMATTING
    function offset(token, separator) {
      addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = "+";
        if (offset < 0) {
          offset = -offset;
          sign = "-";
        }
        return sign + zeroFill(~~(offset / 60), 2) + separator +
          zeroFill(~~(offset) % 60, 2);
      });
    }
    offset("Z", ":");
    offset("ZZ", "");
    // PARSING
    addRegexToken("Z", matchShortOffset);
    addRegexToken("ZZ", matchShortOffset);
    addParseToken(["Z", "ZZ"], function (input, array, config) {
      config._useUTC = true;
      config._tzm = offsetFromString(matchShortOffset, input);
    });
    // HELPERS
    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;
    function offsetFromString(matcher, string) {
      var matches = (string || "").match(matcher);
      if (matches === null) {
        return null;
      }
      var chunk = matches[matches.length - 1] || [];
      var parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
      var minutes = +(parts[1] * 60) + toInt(parts[2]);
      return minutes === 0 ? 0 : parts[0] === "+" ? minutes : -minutes;
    }
    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
      var res, diff;
      if (model._isUTC) {
        res = model.clone();
        diff =
          (isMoment(input) || isDate(input)
            ? input.valueOf()
            : createLocal(input).valueOf()) - res.valueOf();
        // Use low-level api, because this fn is low-level api.
        res._d.setTime(res._d.valueOf() + diff);
        hooks.updateOffset(res, false);
        return res;
      } else {
        return createLocal(input).local();
      }
    }
    function getDateOffset(m) {
      // On Firefox.24 Date#getTimezoneOffset returns a floating point.
      // https://github.com/moment/moment/pull/1871
      return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }
    // HOOKS
    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};
    // MOMENTS
    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
      var offset = this._offset || 0, localAdjust;
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      if (input != null) {
        if (typeof input === "string") {
          input = offsetFromString(matchShortOffset, input);
          if (input === null) {
            return this;
          }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
          input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
          localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
          this.add(localAdjust, "m");
        }
        if (offset !== input) {
          if (!keepLocalTime || this._changeInProgress) {
            addSubtract(this, createDuration(input - offset, "m"), 1, false);
          } else if (!this._changeInProgress) {
            this._changeInProgress = true;
            hooks.updateOffset(this, true);
            this._changeInProgress = null;
          }
        }
        return this;
      } else {
        return this._isUTC ? offset : getDateOffset(this);
      }
    }
    function getSetZone(input, keepLocalTime) {
      if (input != null) {
        if (typeof input !== "string") {
          input = -input;
        }
        this.utcOffset(input, keepLocalTime);
        return this;
      } else {
        return -this.utcOffset();
      }
    }
    function setOffsetToUTC(keepLocalTime) {
      return this.utcOffset(0, keepLocalTime);
    }
    function setOffsetToLocal(keepLocalTime) {
      if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;
        if (keepLocalTime) {
          this.subtract(getDateOffset(this), "m");
        }
      }
      return this;
    }
    function setOffsetToParsedOffset() {
      if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
      } else if (typeof this._i === "string") {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
          this.utcOffset(tZone);
        } else {
          this.utcOffset(0, true);
        }
      }
      return this;
    }
    function hasAlignedHourOffset(input) {
      if (!this.isValid()) {
        return false;
      }
      input = input ? createLocal(input).utcOffset() : 0;
      return (this.utcOffset() - input) % 60 === 0;
    }
    function isDaylightSavingTime() {
      return (this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset());
    }
    function isDaylightSavingTimeShifted() {
      if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
      }
      var c = {};
      copyConfig(c, this);
      c = prepareConfig(c);
      if (c._a) {
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() &&
          compareArrays(c._a, other.toArray()) > 0;
      } else {
        this._isDSTShifted = false;
      }
      return this._isDSTShifted;
    }
    function isLocal() {
      return this.isValid() ? !this._isUTC : false;
    }
    function isUtcOffset() {
      return this.isValid() ? this._isUTC : false;
    }
    function isUtc() {
      return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }
    // ASP.NET json date format regex
    var aspNetRegex =
      /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;
    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex =
      /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function createDuration(input, key) {
      var duration = input,
        // matching against regexp is expensive, do it on demand
        match = null,
        sign,
        ret,
        diffRes;
      if (isDuration(input)) {
        duration = {
          ms: input._milliseconds,
          d: input._days,
          M: input._months,
        };
      } else if (isNumber(input)) {
        duration = {};
        if (key) {
          duration[key] = input;
        } else {
          duration.milliseconds = input;
        }
      } else if (!!(match = aspNetRegex.exec(input))) {
        sign = (match[1] === "-") ? -1 : 1;
        duration = {
          y: 0,
          d: toInt(match[DATE]) * sign,
          h: toInt(match[HOUR]) * sign,
          m: toInt(match[MINUTE]) * sign,
          s: toInt(match[SECOND]) * sign,
          ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
        };
      } else if (!!(match = isoRegex.exec(input))) {
        sign = (match[1] === "-") ? -1 : 1;
        duration = {
          y: parseIso(match[2], sign),
          M: parseIso(match[3], sign),
          w: parseIso(match[4], sign),
          d: parseIso(match[5], sign),
          h: parseIso(match[6], sign),
          m: parseIso(match[7], sign),
          s: parseIso(match[8], sign),
        };
      } else if (duration == null) { // checks for null or undefined
        duration = {};
      } else if (
        typeof duration === "object" &&
        ("from" in duration || "to" in duration)
      ) {
        diffRes = momentsDifference(
          createLocal(duration.from),
          createLocal(duration.to),
        );
        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
      }
      ret = new Duration(duration);
      if (isDuration(input) && hasOwnProp(input, "_locale")) {
        ret._locale = input._locale;
      }
      return ret;
    }
    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;
    function parseIso(inp, sign) {
      // We'd normally use ~~inp for this, but unfortunately it also
      // converts floats to ints.
      // inp may be undefined, so careful calling replace on it.
      var res = inp && parseFloat(inp.replace(",", "."));
      // apply sign while we're at it
      return (isNaN(res) ? 0 : res) * sign;
    }
    function positiveMomentsDifference(base, other) {
      var res = {};
      res.months = other.month() - base.month() +
        (other.year() - base.year()) * 12;
      if (base.clone().add(res.months, "M").isAfter(other)) {
        --res.months;
      }
      res.milliseconds = +other - +(base.clone().add(res.months, "M"));
      return res;
    }
    function momentsDifference(base, other) {
      var res;
      if (!(base.isValid() && other.isValid())) {
        return { milliseconds: 0, months: 0 };
      }
      other = cloneWithOffset(other, base);
      if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
      } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
      }
      return res;
    }
    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
      return function (val, period) {
        var dur, tmp;
        //invert the arguments, but complain about it
        if (period !== null && !isNaN(+period)) {
          deprecateSimple(
            name,
            "moment()." + name +
              "(period, number) is deprecated. Please use moment()." + name +
              "(number, period). " +
              "See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.",
          );
          tmp = val;
          val = period;
          period = tmp;
        }
        val = typeof val === "string" ? +val : val;
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
      };
    }
    function addSubtract(mom, duration, isAdding, updateOffset) {
      var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);
      if (!mom.isValid()) {
        // No op
        return;
      }
      updateOffset = updateOffset == null ? true : updateOffset;
      if (months) {
        setMonth(mom, get(mom, "Month") + months * isAdding);
      }
      if (days) {
        set$1(mom, "Date", get(mom, "Date") + days * isAdding);
      }
      if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
      }
      if (updateOffset) {
        hooks.updateOffset(mom, days || months);
      }
    }
    var add = createAdder(1, "add");
    var subtract = createAdder(-1, "subtract");
    function getCalendarFormat(myMoment, now) {
      var diff = myMoment.diff(now, "days", true);
      return diff < -6 ? "sameElse"
      : diff < -1 ? "lastWeek" : diff < 0 ? "lastDay" : diff < 1
      ? "sameDay"
      : diff < 2
      ? "nextDay"
      : diff < 7
      ? "nextWeek"
      : "sameElse";
    }
    function calendar$1(time, formats) {
      // We want to compare the start of today, vs this.
      // Getting start-of-today depends on whether we're local/utc/offset or not.
      var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf("day"),
        format = hooks.calendarFormat(this, sod) || "sameElse";
      var output = formats && (isFunction(formats[format])
        ? formats[format].call(this, now)
        : formats[format]);
      return this.format(
        output || this.localeData().calendar(format, this, createLocal(now)),
      );
    }
    function clone() {
      return new Moment(this);
    }
    function isAfter(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() > localInput.valueOf();
      } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
      }
    }
    function isBefore(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() < localInput.valueOf();
      } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
      }
    }
    function isBetween(from, to, units, inclusivity) {
      var localFrom = isMoment(from) ? from : createLocal(from),
        localTo = isMoment(to) ? to : createLocal(to);
      if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
        return false;
      }
      inclusivity = inclusivity || "()";
      return (inclusivity[0] === "("
        ? this.isAfter(localFrom, units)
        : !this.isBefore(localFrom, units)) &&
        (inclusivity[1] === ")" ? this.isBefore(localTo, units)
        : !this.isAfter(localTo, units));
    }
    function isSame(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input), inputMs;
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() === localInput.valueOf();
      } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs &&
          inputMs <= this.clone().endOf(units).valueOf();
      }
    }
    function isSameOrAfter(input, units) {
      return this.isSame(input, units) || this.isAfter(input, units);
    }
    function isSameOrBefore(input, units) {
      return this.isSame(input, units) || this.isBefore(input, units);
    }
    function diff(input, units, asFloat) {
      var that, zoneDelta, output;
      if (!this.isValid()) {
        return NaN;
      }
      that = cloneWithOffset(input, this);
      if (!that.isValid()) {
        return NaN;
      }
      zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
      units = normalizeUnits(units);
      switch (units) {
        case "year":
          output = monthDiff(this, that) / 12;
          break;
        case "month":
          output = monthDiff(this, that);
          break;
        case "quarter":
          output = monthDiff(this, that) / 3;
          break;
        case "second":
          output = (this - that) / 1e3;
          break; // 1000
        case "minute":
          output = (this - that) / 6e4;
          break; // 1000 * 60
        case "hour":
          output = (this - that) / 36e5;
          break; // 1000 * 60 * 60
        case "day":
          output = (this - that - zoneDelta) / 864e5;
          break; // 1000 * 60 * 60 * 24, negate dst
        case "week":
          output = (this - that - zoneDelta) / 6048e5;
          break; // 1000 * 60 * 60 * 24 * 7, negate dst
        default:
          output = this - that;
      }
      return asFloat ? output : absFloor(output);
    }
    function monthDiff(a, b) {
      // difference in months
      var wholeMonthDiff = ((b.year() - a.year()) * 12) +
          (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
        anchor = a.clone().add(wholeMonthDiff, "months"),
        anchor2,
        adjust;
      if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
        // linear across the month
        adjust = (b - anchor) / (anchor - anchor2);
      } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
        // linear across the month
        adjust = (b - anchor) / (anchor2 - anchor);
      }
      //check for negative zero, return zero if negative zero
      return -(wholeMonthDiff + adjust) || 0;
    }
    hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    function toString() {
      return this.clone().locale("en").format(
        "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ",
      );
    }
    function toISOString(keepOffset) {
      if (!this.isValid()) {
        return null;
      }
      var utc = keepOffset !== true;
      var m = utc ? this.clone().utc() : this;
      if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(
          m,
          utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
          : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ",
        );
      }
      if (isFunction(Date.prototype.toISOString)) {
        // native implementation is ~50x faster, use it when we can
        if (utc) {
          return this.toDate().toISOString();
        } else {
          return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
            .toISOString().replace("Z", formatMoment(m, "Z"));
        }
      }
      return formatMoment(
        m,
        utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ",
      );
    }
    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
      if (!this.isValid()) {
        return "moment.invalid(/* " + this._i + " */)";
      }
      var func = "moment";
      var zone = "";
      if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
        zone = "Z";
      }
      var prefix = "[" + func + '("]';
      var year = (0 <= this.year() && this.year() <= 9999) ? "YYYY" : "YYYYYY";
      var datetime = "-MM-DD[T]HH:mm:ss.SSS";
      var suffix = zone + '[")]';
      return this.format(prefix + year + datetime + suffix);
    }
    function format(inputString) {
      if (!inputString) {
        inputString = this.isUtc()
          ? hooks.defaultFormatUtc
          : hooks.defaultFormat;
      }
      var output = formatMoment(this, inputString);
      return this.localeData().postformat(output);
    }
    function from(time, withoutSuffix) {
      if (
        this.isValid() &&
        ((isMoment(time) && time.isValid()) ||
          createLocal(time).isValid())
      ) {
        return createDuration({ to: this, from: time }).locale(this.locale())
          .humanize(!withoutSuffix);
      } else {
        return this.localeData().invalidDate();
      }
    }
    function fromNow(withoutSuffix) {
      return this.from(createLocal(), withoutSuffix);
    }
    function to(time, withoutSuffix) {
      if (
        this.isValid() &&
        ((isMoment(time) && time.isValid()) ||
          createLocal(time).isValid())
      ) {
        return createDuration({ from: this, to: time }).locale(this.locale())
          .humanize(!withoutSuffix);
      } else {
        return this.localeData().invalidDate();
      }
    }
    function toNow(withoutSuffix) {
      return this.to(createLocal(), withoutSuffix);
    }
    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
      var newLocaleData;
      if (key === undefined) {
        return this._locale._abbr;
      } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
          this._locale = newLocaleData;
        }
        return this;
      }
    }
    var lang = deprecate(
      "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
      function (key) {
        if (key === undefined) {
          return this.localeData();
        } else {
          return this.locale(key);
        }
      },
    );
    function localeData() {
      return this._locale;
    }
    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
      return (dividend % divisor + divisor) % divisor;
    }
    function localStartOfDate(y, m, d) {
      // the date constructor remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
        // preserve leap years using a full 400 year cycle, then reset
        return new Date(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
        return new Date(y, m, d).valueOf();
      }
    }
    function utcStartOfDate(y, m, d) {
      // Date.UTC remaps years 0-99 to 1900-1999
      if (y < 100 && y >= 0) {
        // preserve leap years using a full 400 year cycle, then reset
        return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
        return Date.UTC(y, m, d);
      }
    }
    function startOf(units) {
      var time;
      units = normalizeUnits(units);
      if (units === undefined || units === "millisecond" || !this.isValid()) {
        return this;
      }
      var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
      switch (units) {
        case "year":
          time = startOfDate(this.year(), 0, 1);
          break;
        case "quarter":
          time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
          break;
        case "month":
          time = startOfDate(this.year(), this.month(), 1);
          break;
        case "week":
          time = startOfDate(
            this.year(),
            this.month(),
            this.date() - this.weekday(),
          );
          break;
        case "isoWeek":
          time = startOfDate(
            this.year(),
            this.month(),
            this.date() - (this.isoWeekday() - 1),
          );
          break;
        case "day":
        case "date":
          time = startOfDate(this.year(), this.month(), this.date());
          break;
        case "hour":
          time = this._d.valueOf();
          time -= mod$1(
            time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
            MS_PER_HOUR,
          );
          break;
        case "minute":
          time = this._d.valueOf();
          time -= mod$1(time, MS_PER_MINUTE);
          break;
        case "second":
          time = this._d.valueOf();
          time -= mod$1(time, MS_PER_SECOND);
          break;
      }
      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
    }
    function endOf(units) {
      var time;
      units = normalizeUnits(units);
      if (units === undefined || units === "millisecond" || !this.isValid()) {
        return this;
      }
      var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
      switch (units) {
        case "year":
          time = startOfDate(this.year() + 1, 0, 1) - 1;
          break;
        case "quarter":
          time =
            startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) -
            1;
          break;
        case "month":
          time = startOfDate(this.year(), this.month() + 1, 1) - 1;
          break;
        case "week":
          time =
            startOfDate(
              this.year(),
              this.month(),
              this.date() - this.weekday() + 7,
            ) - 1;
          break;
        case "isoWeek":
          time =
            startOfDate(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1) + 7,
            ) - 1;
          break;
        case "day":
        case "date":
          time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
          break;
        case "hour":
          time = this._d.valueOf();
          time += MS_PER_HOUR - mod$1(
            time + (this._isUTC
              ? 0
              : this.utcOffset() * MS_PER_MINUTE),
            MS_PER_HOUR,
          ) - 1;
          break;
        case "minute":
          time = this._d.valueOf();
          time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
          break;
        case "second":
          time = this._d.valueOf();
          time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
          break;
      }
      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
    }
    function valueOf() {
      return this._d.valueOf() - ((this._offset || 0) * 60000);
    }
    function unix() {
      return Math.floor(this.valueOf() / 1000);
    }
    function toDate() {
      return new Date(this.valueOf());
    }
    function toArray() {
      var m = this;
      return [
        m.year(),
        m.month(),
        m.date(),
        m.hour(),
        m.minute(),
        m.second(),
        m.millisecond(),
      ];
    }
    function toObject() {
      var m = this;
      return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds(),
      };
    }
    function toJSON() {
      // new Date(NaN).toJSON() === null
      return this.isValid() ? this.toISOString() : null;
    }
    function isValid$2() {
      return isValid(this);
    }
    function parsingFlags() {
      return extend({}, getParsingFlags(this));
    }
    function invalidAt() {
      return getParsingFlags(this).overflow;
    }
    function creationData() {
      return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict,
      };
    }
    // FORMATTING
    addFormatToken(0, ["gg", 2], 0, function () {
      return this.weekYear() % 100;
    });
    addFormatToken(0, ["GG", 2], 0, function () {
      return this.isoWeekYear() % 100;
    });
    function addWeekYearFormatToken(token, getter) {
      addFormatToken(0, [token, token.length], 0, getter);
    }
    addWeekYearFormatToken("gggg", "weekYear");
    addWeekYearFormatToken("ggggg", "weekYear");
    addWeekYearFormatToken("GGGG", "isoWeekYear");
    addWeekYearFormatToken("GGGGG", "isoWeekYear");
    // ALIASES
    addUnitAlias("weekYear", "gg");
    addUnitAlias("isoWeekYear", "GG");
    // PRIORITY
    addUnitPriority("weekYear", 1);
    addUnitPriority("isoWeekYear", 1);
    // PARSING
    addRegexToken("G", matchSigned);
    addRegexToken("g", matchSigned);
    addRegexToken("GG", match1to2, match2);
    addRegexToken("gg", match1to2, match2);
    addRegexToken("GGGG", match1to4, match4);
    addRegexToken("gggg", match1to4, match4);
    addRegexToken("GGGGG", match1to6, match6);
    addRegexToken("ggggg", match1to6, match6);
    addWeekParseToken(
      ["gggg", "ggggg", "GGGG", "GGGGG"],
      function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
      },
    );
    addWeekParseToken(["gg", "GG"], function (input, week, config, token) {
      week[token] = hooks.parseTwoDigitYear(input);
    });
    // MOMENTS
    function getSetWeekYear(input) {
      return getSetWeekYearHelper.call(
        this,
        input,
        this.week(),
        this.weekday(),
        this.localeData()._week.dow,
        this.localeData()._week.doy,
      );
    }
    function getSetISOWeekYear(input) {
      return getSetWeekYearHelper.call(
        this,
        input,
        this.isoWeek(),
        this.isoWeekday(),
        1,
        4,
      );
    }
    function getISOWeeksInYear() {
      return weeksInYear(this.year(), 1, 4);
    }
    function getWeeksInYear() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }
    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
      var weeksTarget;
      if (input == null) {
        return weekOfYear(this, dow, doy).year;
      } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
          week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
      }
    }
    function setWeekAll(weekYear, week, weekday, dow, doy) {
      var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
      this.year(date.getUTCFullYear());
      this.month(date.getUTCMonth());
      this.date(date.getUTCDate());
      return this;
    }
    // FORMATTING
    addFormatToken("Q", 0, "Qo", "quarter");
    // ALIASES
    addUnitAlias("quarter", "Q");
    // PRIORITY
    addUnitPriority("quarter", 7);
    // PARSING
    addRegexToken("Q", match1);
    addParseToken("Q", function (input, array) {
      array[MONTH] = (toInt(input) - 1) * 3;
    });
    // MOMENTS
    function getSetQuarter(input) {
      return input == null ? Math.ceil((this.month() + 1) / 3)
      : this.month((input - 1) * 3 + this.month() % 3);
    }
    // FORMATTING
    addFormatToken("D", ["DD", 2], "Do", "date");
    // ALIASES
    addUnitAlias("date", "D");
    // PRIORITY
    addUnitPriority("date", 9);
    // PARSING
    addRegexToken("D", match1to2);
    addRegexToken("DD", match1to2, match2);
    addRegexToken("Do", function (isStrict, locale) {
      // TODO: Remove "ordinalParse" fallback in next major release.
      return isStrict
        ? (locale._dayOfMonthOrdinalParse || locale._ordinalParse)
        : locale._dayOfMonthOrdinalParseLenient;
    });
    addParseToken(["D", "DD"], DATE);
    addParseToken("Do", function (input, array) {
      array[DATE] = toInt(input.match(match1to2)[0]);
    });
    // MOMENTS
    var getSetDayOfMonth = makeGetSet("Date", true);
    // FORMATTING
    addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
    // ALIASES
    addUnitAlias("dayOfYear", "DDD");
    // PRIORITY
    addUnitPriority("dayOfYear", 4);
    // PARSING
    addRegexToken("DDD", match1to3);
    addRegexToken("DDDD", match3);
    addParseToken(["DDD", "DDDD"], function (input, array, config) {
      config._dayOfYear = toInt(input);
    });
    // HELPERS
    // MOMENTS
    function getSetDayOfYear(input) {
      var dayOfYear =
        Math.round(
          (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5,
        ) + 1;
      return input == null ? dayOfYear : this.add((input - dayOfYear), "d");
    }
    // FORMATTING
    addFormatToken("m", ["mm", 2], 0, "minute");
    // ALIASES
    addUnitAlias("minute", "m");
    // PRIORITY
    addUnitPriority("minute", 14);
    // PARSING
    addRegexToken("m", match1to2);
    addRegexToken("mm", match1to2, match2);
    addParseToken(["m", "mm"], MINUTE);
    // MOMENTS
    var getSetMinute = makeGetSet("Minutes", false);
    // FORMATTING
    addFormatToken("s", ["ss", 2], 0, "second");
    // ALIASES
    addUnitAlias("second", "s");
    // PRIORITY
    addUnitPriority("second", 15);
    // PARSING
    addRegexToken("s", match1to2);
    addRegexToken("ss", match1to2, match2);
    addParseToken(["s", "ss"], SECOND);
    // MOMENTS
    var getSetSecond = makeGetSet("Seconds", false);
    // FORMATTING
    addFormatToken("S", 0, 0, function () {
      return ~~(this.millisecond() / 100);
    });
    addFormatToken(0, ["SS", 2], 0, function () {
      return ~~(this.millisecond() / 10);
    });
    addFormatToken(0, ["SSS", 3], 0, "millisecond");
    addFormatToken(0, ["SSSS", 4], 0, function () {
      return this.millisecond() * 10;
    });
    addFormatToken(0, ["SSSSS", 5], 0, function () {
      return this.millisecond() * 100;
    });
    addFormatToken(0, ["SSSSSS", 6], 0, function () {
      return this.millisecond() * 1000;
    });
    addFormatToken(0, ["SSSSSSS", 7], 0, function () {
      return this.millisecond() * 10000;
    });
    addFormatToken(0, ["SSSSSSSS", 8], 0, function () {
      return this.millisecond() * 100000;
    });
    addFormatToken(0, ["SSSSSSSSS", 9], 0, function () {
      return this.millisecond() * 1000000;
    });
    // ALIASES
    addUnitAlias("millisecond", "ms");
    // PRIORITY
    addUnitPriority("millisecond", 16);
    // PARSING
    addRegexToken("S", match1to3, match1);
    addRegexToken("SS", match1to3, match2);
    addRegexToken("SSS", match1to3, match3);
    var token;
    for (token = "SSSS"; token.length <= 9; token += "S") {
      addRegexToken(token, matchUnsigned);
    }
    function parseMs(input, array) {
      array[MILLISECOND] = toInt(("0." + input) * 1000);
    }
    for (token = "S"; token.length <= 9; token += "S") {
      addParseToken(token, parseMs);
    }
    // MOMENTS
    var getSetMillisecond = makeGetSet("Milliseconds", false);
    // FORMATTING
    addFormatToken("z", 0, 0, "zoneAbbr");
    addFormatToken("zz", 0, 0, "zoneName");
    // MOMENTS
    function getZoneAbbr() {
      return this._isUTC ? "UTC" : "";
    }
    function getZoneName() {
      return this._isUTC ? "Coordinated Universal Time" : "";
    }
    var proto = Moment.prototype;
    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
      "dates accessor is deprecated. Use date instead.",
      getSetDayOfMonth,
    );
    proto.months = deprecate(
      "months accessor is deprecated. Use month instead",
      getSetMonth,
    );
    proto.years = deprecate(
      "years accessor is deprecated. Use year instead",
      getSetYear,
    );
    proto.zone = deprecate(
      "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
      getSetZone,
    );
    proto.isDSTShifted = deprecate(
      "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
      isDaylightSavingTimeShifted,
    );
    function createUnix(input) {
      return createLocal(input * 1000);
    }
    function createInZone() {
      return createLocal.apply(null, arguments).parseZone();
    }
    function preParsePostFormat(string) {
      return string;
    }
    var proto$1 = Locale.prototype;
    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;
    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;
    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;
    function get$1(format, index, field, setter) {
      var locale = getLocale();
      var utc = createUTC().set(setter, index);
      return locale[field](utc, format);
    }
    function listMonthsImpl(format, index, field) {
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }
      format = format || "";
      if (index != null) {
        return get$1(format, index, field, "month");
      }
      var i;
      var out = [];
      for (i = 0; i < 12; i++) {
        out[i] = get$1(format, i, field, "month");
      }
      return out;
    }
    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
      if (typeof localeSorted === "boolean") {
        if (isNumber(format)) {
          index = format;
          format = undefined;
        }
        format = format || "";
      } else {
        format = localeSorted;
        index = format;
        localeSorted = false;
        if (isNumber(format)) {
          index = format;
          format = undefined;
        }
        format = format || "";
      }
      var locale = getLocale(), shift = localeSorted ? locale._week.dow : 0;
      if (index != null) {
        return get$1(format, (index + shift) % 7, field, "day");
      }
      var i;
      var out = [];
      for (i = 0; i < 7; i++) {
        out[i] = get$1(format, (i + shift) % 7, field, "day");
      }
      return out;
    }
    function listMonths(format, index) {
      return listMonthsImpl(format, index, "months");
    }
    function listMonthsShort(format, index) {
      return listMonthsImpl(format, index, "monthsShort");
    }
    function listWeekdays(localeSorted, format, index) {
      return listWeekdaysImpl(localeSorted, format, index, "weekdays");
    }
    function listWeekdaysShort(localeSorted, format, index) {
      return listWeekdaysImpl(localeSorted, format, index, "weekdaysShort");
    }
    function listWeekdaysMin(localeSorted, format, index) {
      return listWeekdaysImpl(localeSorted, format, index, "weekdaysMin");
    }
    getSetGlobalLocale("en", {
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (number) {
        var b = number % 10,
          output = (toInt(number % 100 / 10) === 1)
            ? "th"
            : (b === 1)
            ? "st"
            : (b === 2)
            ? "nd"
            : (b === 3)
            ? "rd"
            : "th";
        return number + output;
      },
    });
    // Side effect imports
    hooks.lang = deprecate(
      "moment.lang is deprecated. Use moment.locale instead.",
      getSetGlobalLocale,
    );
    hooks.langData = deprecate(
      "moment.langData is deprecated. Use moment.localeData instead.",
      getLocale,
    );
    var mathAbs = Math.abs;
    function abs() {
      var data = this._data;
      this._milliseconds = mathAbs(this._milliseconds);
      this._days = mathAbs(this._days);
      this._months = mathAbs(this._months);
      data.milliseconds = mathAbs(data.milliseconds);
      data.seconds = mathAbs(data.seconds);
      data.minutes = mathAbs(data.minutes);
      data.hours = mathAbs(data.hours);
      data.months = mathAbs(data.months);
      data.years = mathAbs(data.years);
      return this;
    }
    function addSubtract$1(duration, input, value, direction) {
      var other = createDuration(input, value);
      duration._milliseconds += direction * other._milliseconds;
      duration._days += direction * other._days;
      duration._months += direction * other._months;
      return duration._bubble();
    }
    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
      return addSubtract$1(this, input, value, 1);
    }
    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
      return addSubtract$1(this, input, value, -1);
    }
    function absCeil(number) {
      if (number < 0) {
        return Math.floor(number);
      } else {
        return Math.ceil(number);
      }
    }
    function bubble() {
      var milliseconds = this._milliseconds;
      var days = this._days;
      var months = this._months;
      var data = this._data;
      var seconds, minutes, hours, years, monthsFromDays;
      // if we have a mix of positive and negative values, bubble down first
      // check: https://github.com/moment/moment/issues/2166
      if (
        !((milliseconds >= 0 && days >= 0 && months >= 0) ||
          (milliseconds <= 0 && days <= 0 && months <= 0))
      ) {
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
        days = 0;
        months = 0;
      }
      // The following code bubbles up values, see the tests for
      // examples of what that means.
      data.milliseconds = milliseconds % 1000;
      seconds = absFloor(milliseconds / 1000);
      data.seconds = seconds % 60;
      minutes = absFloor(seconds / 60);
      data.minutes = minutes % 60;
      hours = absFloor(minutes / 60);
      data.hours = hours % 24;
      days += absFloor(hours / 24);
      // convert days to months
      monthsFromDays = absFloor(daysToMonths(days));
      months += monthsFromDays;
      days -= absCeil(monthsToDays(monthsFromDays));
      // 12 months -> 1 year
      years = absFloor(months / 12);
      months %= 12;
      data.days = days;
      data.months = months;
      data.years = years;
      return this;
    }
    function daysToMonths(days) {
      // 400 years have 146097 days (taking into account leap year rules)
      // 400 years have 12 months === 4800
      return days * 4800 / 146097;
    }
    function monthsToDays(months) {
      // the reverse of daysToMonths
      return months * 146097 / 4800;
    }
    function as(units) {
      if (!this.isValid()) {
        return NaN;
      }
      var days;
      var months;
      var milliseconds = this._milliseconds;
      units = normalizeUnits(units);
      if (units === "month" || units === "quarter" || units === "year") {
        days = this._days + milliseconds / 864e5;
        months = this._months + daysToMonths(days);
        switch (units) {
          case "month":
            return months;
          case "quarter":
            return months / 3;
          case "year":
            return months / 12;
        }
      } else {
        // handle milliseconds separately because of floating point math errors (issue #1867)
        days = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
          case "week":
            return days / 7 + milliseconds / 6048e5;
          case "day":
            return days + milliseconds / 864e5;
          case "hour":
            return days * 24 + milliseconds / 36e5;
          case "minute":
            return days * 1440 + milliseconds / 6e4;
          case "second":
            return days * 86400 + milliseconds / 1000;
          // Math.floor prevents floating point math errors here
          case "millisecond":
            return Math.floor(days * 864e5) + milliseconds;
          default:
            throw new Error("Unknown unit " + units);
        }
      }
    }
    // TODO: Use this.as('ms')?
    function valueOf$1() {
      if (!this.isValid()) {
        return NaN;
      }
      return (this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        toInt(this._months / 12) * 31536e6);
    }
    function makeAs(alias) {
      return function () {
        return this.as(alias);
      };
    }
    var asMilliseconds = makeAs("ms");
    var asSeconds = makeAs("s");
    var asMinutes = makeAs("m");
    var asHours = makeAs("h");
    var asDays = makeAs("d");
    var asWeeks = makeAs("w");
    var asMonths = makeAs("M");
    var asQuarters = makeAs("Q");
    var asYears = makeAs("y");
    function clone$1() {
      return createDuration(this);
    }
    function get$2(units) {
      units = normalizeUnits(units);
      return this.isValid() ? this[units + "s"]() : NaN;
    }
    function makeGetter(name) {
      return function () {
        return this.isValid() ? this._data[name] : NaN;
      };
    }
    var milliseconds = makeGetter("milliseconds");
    var seconds = makeGetter("seconds");
    var minutes = makeGetter("minutes");
    var hours = makeGetter("hours");
    var days = makeGetter("days");
    var months = makeGetter("months");
    var years = makeGetter("years");
    function weeks() {
      return absFloor(this.days() / 7);
    }
    var round = Math.round;
    var thresholds = {
      ss: 44,
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      M: 11, // months to year
    };
    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(
      string,
      number,
      withoutSuffix,
      isFuture,
      locale,
    ) {
      return locale.relativeTime(
        number || 1,
        !!withoutSuffix,
        string,
        isFuture,
      );
    }
    function relativeTime$1(posNegDuration, withoutSuffix, locale) {
      var duration = createDuration(posNegDuration).abs();
      var seconds = round(duration.as("s"));
      var minutes = round(duration.as("m"));
      var hours = round(duration.as("h"));
      var days = round(duration.as("d"));
      var months = round(duration.as("M"));
      var years = round(duration.as("y"));
      var a = seconds <= thresholds.ss && ["s", seconds] ||
        seconds < thresholds.s && ["ss", seconds] ||
        minutes <= 1 && ["m"] ||
        minutes < thresholds.m && ["mm", minutes] ||
        hours <= 1 && ["h"] ||
        hours < thresholds.h && ["hh", hours] ||
        days <= 1 && ["d"] ||
        days < thresholds.d && ["dd", days] ||
        months <= 1 && ["M"] ||
        months < thresholds.M && ["MM", months] ||
        years <= 1 && ["y"] || ["yy", years];
      a[2] = withoutSuffix;
      a[3] = +posNegDuration > 0;
      a[4] = locale;
      return substituteTimeAgo.apply(null, a);
    }
    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
      if (roundingFunction === undefined) {
        return round;
      }
      if (typeof (roundingFunction) === "function") {
        round = roundingFunction;
        return true;
      }
      return false;
    }
    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
      if (thresholds[threshold] === undefined) {
        return false;
      }
      if (limit === undefined) {
        return thresholds[threshold];
      }
      thresholds[threshold] = limit;
      if (threshold === "s") {
        thresholds.ss = limit - 1;
      }
      return true;
    }
    function humanize(withSuffix) {
      if (!this.isValid()) {
        return this.localeData().invalidDate();
      }
      var locale = this.localeData();
      var output = relativeTime$1(this, !withSuffix, locale);
      if (withSuffix) {
        output = locale.pastFuture(+this, output);
      }
      return locale.postformat(output);
    }
    var abs$1 = Math.abs;
    function sign(x) {
      return ((x > 0) - (x < 0)) || +x;
    }
    function toISOString$1() {
      // for ISO strings we do not use the normal bubbling rules:
      //  * milliseconds bubble up until they become hours
      //  * days do not bubble at all
      //  * months bubble up until they become years
      // This is because there is no context-free conversion between hours and days
      // (think of clock changes)
      // and also not between days and months (28-31 days per month)
      if (!this.isValid()) {
        return this.localeData().invalidDate();
      }
      var seconds = abs$1(this._milliseconds) / 1000;
      var days = abs$1(this._days);
      var months = abs$1(this._months);
      var minutes, hours, years;
      // 3600 seconds -> 60 minutes -> 1 hour
      minutes = absFloor(seconds / 60);
      hours = absFloor(minutes / 60);
      seconds %= 60;
      minutes %= 60;
      // 12 months -> 1 year
      years = absFloor(months / 12);
      months %= 12;
      // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
      var Y = years;
      var M = months;
      var D = days;
      var h = hours;
      var m = minutes;
      var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, "") : "";
      var total = this.asSeconds();
      if (!total) {
        // this is the same as C#'s (Noda) and python (isodate)...
        // but not other JS (goog.date)
        return "P0D";
      }
      var totalSign = total < 0 ? "-" : "";
      var ymSign = sign(this._months) !== sign(total) ? "-" : "";
      var daysSign = sign(this._days) !== sign(total) ? "-" : "";
      var hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
      return totalSign + "P" +
        (Y ? ymSign + Y + "Y" : "") +
        (M ? ymSign + M + "M" : "") +
        (D ? daysSign + D + "D" : "") +
        ((h || m || s) ? "T" : "") +
        (h ? hmsSign + h + "H" : "") +
        (m ? hmsSign + m + "M" : "") +
        (s ? hmsSign + s + "S" : "");
    }
    var proto$2 = Duration.prototype;
    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;
    proto$2.toIsoString = deprecate(
      "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
      toISOString$1,
    );
    proto$2.lang = lang;
    // Side effect imports
    // FORMATTING
    addFormatToken("X", 0, 0, "unix");
    addFormatToken("x", 0, 0, "valueOf");
    // PARSING
    addRegexToken("x", matchSigned);
    addRegexToken("X", matchTimestamp);
    addParseToken("X", function (input, array, config) {
      config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken("x", function (input, array, config) {
      config._d = new Date(toInt(input));
    });
    // Side effect imports
    hooks.version = "2.24.0";
    setHookCallback(createLocal);
    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;
    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
      DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
      DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
      DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
      DATE: "YYYY-MM-DD",
      TIME: "HH:mm",
      TIME_SECONDS: "HH:mm:ss",
      TIME_MS: "HH:mm:ss.SSS",
      WEEK: "GGGG-[W]WW",
      MONTH: "YYYY-MM", // <input type="month" />
    };
    return hooks;
  }),
));
System.register(
  "https://deno.land/x/moment/moment",
  ["https://deno.land/x/moment/vendor/moment"],
  function (exports_18, context_18) {
    "use strict";
    var moment;
    var __moduleName = context_18 && context_18.id;
    return {
      setters: [
        function (_1) {
        },
      ],
      execute: function () {
        moment = window.moment;
        exports_18("moment", moment);
      },
    };
  },
);
System.register(
  "file:///home/yazid/Documents/projects/snippet-cli/lib/regex",
  [],
  function (exports_19, context_19) {
    "use strict";
    var _regex;
    var __moduleName = context_19 && context_19.id;
    return {
      setters: [],
      execute: function () {
        _regex = {
          rx_tag: /(@|#)(\w+)/g,
          rx_command: /(\d*)(?<![A-Za-z])(day|week|month|year)/g,
          rx_day_of_week:
            /(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/gi,
        };
        exports_19("default", _regex);
      },
    };
  },
);
System.register(
  "file:///home/yazid/Documents/projects/snippet-cli/lib/search",
  [
    "file:///home/yazid/Documents/projects/snippet-cli/lib/database",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/formats",
    "https://deno.land/x/moment/moment",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/regex",
  ],
  function (exports_20, context_20) {
    "use strict";
    var database_ts_1, formats_ts_1, moment_ts_1, regex_ts_1, _search;
    var __moduleName = context_20 && context_20.id;
    async function is_same(input) {
      const is_day = moment_ts_1.moment(
        input,
        formats_ts_1.is_day_formats,
        true,
      ).isValid();
      const is_month = moment_ts_1.moment(
        input,
        formats_ts_1.is_month_formats,
        true,
      ).isValid();
      const is_year = moment_ts_1.moment(
        input,
        formats_ts_1.is_year_formats,
        true,
      ).isValid();
      if (is_day) {
        return await is_same_by(input, "day");
      } else if (is_month) {
        return await is_same_by(input, "month");
      } else if (is_year) {
        return await is_same_by(input, "year");
      }
    }
    async function is_same_by(input, property) {
      const input_to_moment = moment_ts_1.moment(
        input,
        formats_ts_1.date_input_formats,
      );
      const store = await database_ts_1.default.get("entries");
      return store.filter((e) => {
        if (
          moment_ts_1.moment(e.created, formats_ts_1.created_format).isSame(
            input_to_moment,
            property,
          )
        ) {
          return e;
        }
      });
    }
    async function is_between(input) {
      const is_day =
        moment_ts_1.moment(input[0], formats_ts_1.is_day_formats, true)
          .isValid() &&
        moment_ts_1.moment(input[1], formats_ts_1.is_day_formats, true)
          .isValid();
      const is_month =
        moment_ts_1.moment(input[0], formats_ts_1.is_month_formats, true)
          .isValid() &&
        moment_ts_1.moment(input[1], formats_ts_1.is_month_formats, true)
          .isValid();
      const is_year =
        moment_ts_1.moment(input[0], formats_ts_1.is_year_formats, true)
          .isValid() &&
        moment_ts_1.moment(input[1], formats_ts_1.is_year_formats, true)
          .isValid();
      if (is_day) {
        return await is_between_by(input, "day");
      } else if (is_month) {
        return await is_between_by(input, "month");
      } else if (is_year) {
        return await is_between_by(input, "year");
      }
    }
    async function is_between_by(input, property) {
      const first_moment = moment_ts_1.moment(
        input[0],
        formats_ts_1.date_input_formats,
      );
      const second_moment = moment_ts_1.moment(
        input[1],
        formats_ts_1.date_input_formats,
      );
      const store = await database_ts_1.default.get("entries");
      return store.filter((e) => {
        if (
          moment_ts_1.moment(e.created, formats_ts_1.created_format).isBetween(
            first_moment,
            second_moment,
            property,
            "[]",
          )
        ) {
          return e;
        }
      });
    }
    async function last(flag) {
      const is_day_of_week = regex_ts_1.default.rx_day_of_week.exec(flag);
      const is_command = regex_ts_1.default.rx_command.exec(flag);
      return await last_by(
        is_day_of_week ? 7 : is_command ? parseInt(is_command[1]) || 1 : 1,
        is_day_of_week ? "day" : is_command ? is_command[2] : flag,
        is_day_of_week ? flag : false,
      );
    }
    async function last_by(number_of, what, flag) {
      const store = await database_ts_1.default.get("entries");
      return store.filter((e) => {
        if (
          moment_ts_1.moment(e.created, formats_ts_1.created_format).isSame(
            moment_ts_1.moment(flag || [], flag ? ["dddd", "ddd"] : null)
              .subtract(number_of, `${what}s`),
            what,
          )
        ) {
          return e;
        }
      });
    }
    async function search_by_text(flag) {
      const store = await database_ts_1.default.get("entries");
      return store.filter((e) => {
        if (e.text.toLowerCase().search(String(flag).toLowerCase()) !== -1) {
          return e;
        }
      });
    }
    async function search_by_tag(flag) {
      const store = await database_ts_1.default.get("entries");
      return store.filter((e) => e.tags.includes(flag));
    }
    return {
      setters: [
        function (database_ts_1_1) {
          database_ts_1 = database_ts_1_1;
        },
        function (formats_ts_1_1) {
          formats_ts_1 = formats_ts_1_1;
        },
        function (moment_ts_1_1) {
          moment_ts_1 = moment_ts_1_1;
        },
        function (regex_ts_1_1) {
          regex_ts_1 = regex_ts_1_1;
        },
      ],
      execute: function () {
        _search = {
          is_between,
          is_same,
          last,
          search_by_tag,
          search_by_text,
        };
        exports_20("default", _search);
      },
    };
  },
);
System.register(
  "https://deno.land/std/uuid/_common",
  [],
  function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    // Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
    function bytesToUuid(bytes) {
      const bits = [...bytes].map((bit) => {
        const s = bit.toString(16);
        return bit < 0x10 ? "0" + s : s;
      });
      return [
        ...bits.slice(0, 4),
        "-",
        ...bits.slice(4, 6),
        "-",
        ...bits.slice(6, 8),
        "-",
        ...bits.slice(8, 10),
        "-",
        ...bits.slice(10, 16),
      ].join("");
    }
    exports_21("bytesToUuid", bytesToUuid);
    function uuidToBytes(uuid) {
      const bytes = [];
      uuid.replace(/[a-fA-F0-9]{2}/g, (hex) => {
        bytes.push(parseInt(hex, 16));
        return "";
      });
      return bytes;
    }
    exports_21("uuidToBytes", uuidToBytes);
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = new Array(str.length);
      for (let i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
      }
      return bytes;
    }
    exports_21("stringToBytes", stringToBytes);
    function createBuffer(content) {
      const arrayBuffer = new ArrayBuffer(content.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < content.length; i++) {
        uint8Array[i] = content[i];
      }
      return arrayBuffer;
    }
    exports_21("createBuffer", createBuffer);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register(
  "https://deno.land/std/uuid/v1",
  ["https://deno.land/std/uuid/_common"],
  function (exports_22, context_22) {
    "use strict";
    var _common_ts_1, UUID_RE, _nodeId, _clockseq, _lastMSecs, _lastNSecs;
    var __moduleName = context_22 && context_22.id;
    function validate(id) {
      return UUID_RE.test(id);
    }
    exports_22("validate", validate);
    function generate(options, buf, offset) {
      let i = (buf && offset) || 0;
      const b = buf || [];
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== undefined ? options.clockseq
      : _clockseq;
      if (node == null || clockseq == null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const seedBytes = options.random ||
          options.rng ||
          crypto.getRandomValues(new Uint8Array(16));
        if (node == null) {
          node = _nodeId = [
            seedBytes[0] | 0x01,
            seedBytes[1],
            seedBytes[2],
            seedBytes[3],
            seedBytes[4],
            seedBytes[5],
          ];
        }
        if (clockseq == null) {
          clockseq = _clockseq = ((seedBytes[6] << 8) | seedBytes[7]) & 0x3fff;
        }
      }
      let msecs = options.msecs !== undefined
        ? options.msecs
        : new Date().getTime();
      let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;
      if (dt < 0 && options.clockseq === undefined) {
        clockseq = (clockseq + 1) & 0x3fff;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
      }
      if (nsecs >= 10000) {
        throw new Error("Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 12219292800000;
      const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
      b[i++] = (tl >>> 24) & 0xff;
      b[i++] = (tl >>> 16) & 0xff;
      b[i++] = (tl >>> 8) & 0xff;
      b[i++] = tl & 0xff;
      const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
      b[i++] = (tmh >>> 8) & 0xff;
      b[i++] = tmh & 0xff;
      b[i++] = ((tmh >>> 24) & 0xf) | 0x10;
      b[i++] = (tmh >>> 16) & 0xff;
      b[i++] = (clockseq >>> 8) | 0x80;
      b[i++] = clockseq & 0xff;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf ? buf : _common_ts_1.bytesToUuid(b);
    }
    exports_22("generate", generate);
    return {
      setters: [
        function (_common_ts_1_1) {
          _common_ts_1 = _common_ts_1_1;
        },
      ],
      execute: function () {
        UUID_RE = new RegExp(
          "^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
          "i",
        );
        _lastMSecs = 0;
        _lastNSecs = 0;
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register(
  "https://deno.land/std/uuid/v4",
  ["https://deno.land/std/uuid/_common"],
  function (exports_23, context_23) {
    "use strict";
    var _common_ts_2, UUID_RE;
    var __moduleName = context_23 && context_23.id;
    function validate(id) {
      return UUID_RE.test(id);
    }
    exports_23("validate", validate);
    function generate() {
      const rnds = crypto.getRandomValues(new Uint8Array(16));
      rnds[6] = (rnds[6] & 0x0f) | 0x40; // Version 4
      rnds[8] = (rnds[8] & 0x3f) | 0x80; // Variant 10
      return _common_ts_2.bytesToUuid(rnds);
    }
    exports_23("generate", generate);
    return {
      setters: [
        function (_common_ts_2_1) {
          _common_ts_2 = _common_ts_2_1;
        },
      ],
      execute: function () {
        UUID_RE = new RegExp(
          "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
          "i",
        );
      },
    };
  },
);
/*
 * [js-sha1]{@link https://github.com/emn178/js-sha1}
 *
 * @version 0.6.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
System.register(
  "https://deno.land/std/hash/sha1",
  [],
  function (exports_24, context_24) {
    "use strict";
    var HEX_CHARS, EXTRA, SHIFT, blocks, Sha1;
    var __moduleName = context_24 && context_24.id;
    return {
      setters: [],
      execute: function () {
        HEX_CHARS = "0123456789abcdef".split("");
        EXTRA = [-2147483648, 8388608, 32768, 128];
        SHIFT = [24, 16, 8, 0];
        blocks = [];
        Sha1 = class Sha1 {
          constructor(sharedMemory = false) {
            this.#h0 = 0x67452301;
            this.#h1 = 0xefcdab89;
            this.#h2 = 0x98badcfe;
            this.#h3 = 0x10325476;
            this.#h4 = 0xc3d2e1f0;
            this.#lastByteIndex = 0;
            if (sharedMemory) {
              blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
                blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] =
                  blocks[9] = blocks[10] = blocks[11] = blocks[12] =
                    blocks[13] = blocks[14] = blocks[15] = 0;
              this.#blocks = blocks;
            } else {
              this.#blocks = [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
              ];
            }
            this.#h0 = 0x67452301;
            this.#h1 = 0xefcdab89;
            this.#h2 = 0x98badcfe;
            this.#h3 = 0x10325476;
            this.#h4 = 0xc3d2e1f0;
            this.#block = this.#start = this.#bytes = this.#hBytes = 0;
            this.#finalized = this.#hashed = false;
          }
          #blocks;
          #block;
          #start;
          #bytes;
          #hBytes;
          #finalized;
          #hashed;
          #h0;
          #h1;
          #h2;
          #h3;
          #h4;
          #lastByteIndex;
          update(message) {
            if (this.#finalized) {
              return this;
            }
            let msg;
            if (message instanceof ArrayBuffer) {
              msg = new Uint8Array(message);
            } else {
              msg = message;
            }
            let index = 0;
            const length = msg.length;
            const blocks = this.#blocks;
            while (index < length) {
              let i;
              if (this.#hashed) {
                this.#hashed = false;
                blocks[0] = this.#block;
                blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] =
                  blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] =
                    blocks[10] = blocks[11] = blocks[12] = blocks[13] =
                      blocks[14] = blocks[15] = 0;
              }
              if (typeof msg !== "string") {
                for (i = this.#start; index < length && i < 64; ++index) {
                  blocks[i >> 2] |= msg[index] << SHIFT[i++ & 3];
                }
              } else {
                for (i = this.#start; index < length && i < 64; ++index) {
                  let code = msg.charCodeAt(index);
                  if (code < 0x80) {
                    blocks[i >> 2] |= code << SHIFT[i++ & 3];
                  } else if (code < 0x800) {
                    blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                  } else if (code < 0xd800 || code >= 0xe000) {
                    blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) <<
                      SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                  } else {
                    code = 0x10000 +
                      (((code & 0x3ff) << 10) |
                        (msg.charCodeAt(++index) & 0x3ff));
                    blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) <<
                      SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) <<
                      SHIFT[i++ & 3];
                    blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                  }
                }
              }
              this.#lastByteIndex = i;
              this.#bytes += i - this.#start;
              if (i >= 64) {
                this.#block = blocks[16];
                this.#start = i - 64;
                this.hash();
                this.#hashed = true;
              } else {
                this.#start = i;
              }
            }
            if (this.#bytes > 4294967295) {
              this.#hBytes += (this.#bytes / 4294967296) >>> 0;
              this.#bytes = this.#bytes >>> 0;
            }
            return this;
          }
          finalize() {
            if (this.#finalized) {
              return;
            }
            this.#finalized = true;
            const blocks = this.#blocks;
            const i = this.#lastByteIndex;
            blocks[16] = this.#block;
            blocks[i >> 2] |= EXTRA[i & 3];
            this.#block = blocks[16];
            if (i >= 56) {
              if (!this.#hashed) {
                this.hash();
              }
              blocks[0] = this.#block;
              blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] =
                blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] =
                  blocks[10] = blocks[11] = blocks[12] = blocks[13] =
                    blocks[14] = blocks[15] = 0;
            }
            blocks[14] = (this.#hBytes << 3) | (this.#bytes >>> 29);
            blocks[15] = this.#bytes << 3;
            this.hash();
          }
          hash() {
            let a = this.#h0;
            let b = this.#h1;
            let c = this.#h2;
            let d = this.#h3;
            let e = this.#h4;
            let f;
            let j;
            let t;
            const blocks = this.#blocks;
            for (j = 16; j < 80; ++j) {
              t = blocks[j - 3] ^ blocks[j - 8] ^ blocks[j - 14] ^
                blocks[j - 16];
              blocks[j] = (t << 1) | (t >>> 31);
            }
            for (j = 0; j < 20; j += 5) {
              f = (b & c) | (~b & d);
              t = (a << 5) | (a >>> 27);
              e = (t + f + e + 1518500249 + blocks[j]) >>> 0;
              b = (b << 30) | (b >>> 2);
              f = (a & b) | (~a & c);
              t = (e << 5) | (e >>> 27);
              d = (t + f + d + 1518500249 + blocks[j + 1]) >>> 0;
              a = (a << 30) | (a >>> 2);
              f = (e & a) | (~e & b);
              t = (d << 5) | (d >>> 27);
              c = (t + f + c + 1518500249 + blocks[j + 2]) >>> 0;
              e = (e << 30) | (e >>> 2);
              f = (d & e) | (~d & a);
              t = (c << 5) | (c >>> 27);
              b = (t + f + b + 1518500249 + blocks[j + 3]) >>> 0;
              d = (d << 30) | (d >>> 2);
              f = (c & d) | (~c & e);
              t = (b << 5) | (b >>> 27);
              a = (t + f + a + 1518500249 + blocks[j + 4]) >>> 0;
              c = (c << 30) | (c >>> 2);
            }
            for (; j < 40; j += 5) {
              f = b ^ c ^ d;
              t = (a << 5) | (a >>> 27);
              e = (t + f + e + 1859775393 + blocks[j]) >>> 0;
              b = (b << 30) | (b >>> 2);
              f = a ^ b ^ c;
              t = (e << 5) | (e >>> 27);
              d = (t + f + d + 1859775393 + blocks[j + 1]) >>> 0;
              a = (a << 30) | (a >>> 2);
              f = e ^ a ^ b;
              t = (d << 5) | (d >>> 27);
              c = (t + f + c + 1859775393 + blocks[j + 2]) >>> 0;
              e = (e << 30) | (e >>> 2);
              f = d ^ e ^ a;
              t = (c << 5) | (c >>> 27);
              b = (t + f + b + 1859775393 + blocks[j + 3]) >>> 0;
              d = (d << 30) | (d >>> 2);
              f = c ^ d ^ e;
              t = (b << 5) | (b >>> 27);
              a = (t + f + a + 1859775393 + blocks[j + 4]) >>> 0;
              c = (c << 30) | (c >>> 2);
            }
            for (; j < 60; j += 5) {
              f = (b & c) | (b & d) | (c & d);
              t = (a << 5) | (a >>> 27);
              e = (t + f + e - 1894007588 + blocks[j]) >>> 0;
              b = (b << 30) | (b >>> 2);
              f = (a & b) | (a & c) | (b & c);
              t = (e << 5) | (e >>> 27);
              d = (t + f + d - 1894007588 + blocks[j + 1]) >>> 0;
              a = (a << 30) | (a >>> 2);
              f = (e & a) | (e & b) | (a & b);
              t = (d << 5) | (d >>> 27);
              c = (t + f + c - 1894007588 + blocks[j + 2]) >>> 0;
              e = (e << 30) | (e >>> 2);
              f = (d & e) | (d & a) | (e & a);
              t = (c << 5) | (c >>> 27);
              b = (t + f + b - 1894007588 + blocks[j + 3]) >>> 0;
              d = (d << 30) | (d >>> 2);
              f = (c & d) | (c & e) | (d & e);
              t = (b << 5) | (b >>> 27);
              a = (t + f + a - 1894007588 + blocks[j + 4]) >>> 0;
              c = (c << 30) | (c >>> 2);
            }
            for (; j < 80; j += 5) {
              f = b ^ c ^ d;
              t = (a << 5) | (a >>> 27);
              e = (t + f + e - 899497514 + blocks[j]) >>> 0;
              b = (b << 30) | (b >>> 2);
              f = a ^ b ^ c;
              t = (e << 5) | (e >>> 27);
              d = (t + f + d - 899497514 + blocks[j + 1]) >>> 0;
              a = (a << 30) | (a >>> 2);
              f = e ^ a ^ b;
              t = (d << 5) | (d >>> 27);
              c = (t + f + c - 899497514 + blocks[j + 2]) >>> 0;
              e = (e << 30) | (e >>> 2);
              f = d ^ e ^ a;
              t = (c << 5) | (c >>> 27);
              b = (t + f + b - 899497514 + blocks[j + 3]) >>> 0;
              d = (d << 30) | (d >>> 2);
              f = c ^ d ^ e;
              t = (b << 5) | (b >>> 27);
              a = (t + f + a - 899497514 + blocks[j + 4]) >>> 0;
              c = (c << 30) | (c >>> 2);
            }
            this.#h0 = (this.#h0 + a) >>> 0;
            this.#h1 = (this.#h1 + b) >>> 0;
            this.#h2 = (this.#h2 + c) >>> 0;
            this.#h3 = (this.#h3 + d) >>> 0;
            this.#h4 = (this.#h4 + e) >>> 0;
          }
          hex() {
            this.finalize();
            const h0 = this.#h0;
            const h1 = this.#h1;
            const h2 = this.#h2;
            const h3 = this.#h3;
            const h4 = this.#h4;
            return (HEX_CHARS[(h0 >> 28) & 0x0f] +
              HEX_CHARS[(h0 >> 24) & 0x0f] +
              HEX_CHARS[(h0 >> 20) & 0x0f] +
              HEX_CHARS[(h0 >> 16) & 0x0f] +
              HEX_CHARS[(h0 >> 12) & 0x0f] +
              HEX_CHARS[(h0 >> 8) & 0x0f] +
              HEX_CHARS[(h0 >> 4) & 0x0f] +
              HEX_CHARS[h0 & 0x0f] +
              HEX_CHARS[(h1 >> 28) & 0x0f] +
              HEX_CHARS[(h1 >> 24) & 0x0f] +
              HEX_CHARS[(h1 >> 20) & 0x0f] +
              HEX_CHARS[(h1 >> 16) & 0x0f] +
              HEX_CHARS[(h1 >> 12) & 0x0f] +
              HEX_CHARS[(h1 >> 8) & 0x0f] +
              HEX_CHARS[(h1 >> 4) & 0x0f] +
              HEX_CHARS[h1 & 0x0f] +
              HEX_CHARS[(h2 >> 28) & 0x0f] +
              HEX_CHARS[(h2 >> 24) & 0x0f] +
              HEX_CHARS[(h2 >> 20) & 0x0f] +
              HEX_CHARS[(h2 >> 16) & 0x0f] +
              HEX_CHARS[(h2 >> 12) & 0x0f] +
              HEX_CHARS[(h2 >> 8) & 0x0f] +
              HEX_CHARS[(h2 >> 4) & 0x0f] +
              HEX_CHARS[h2 & 0x0f] +
              HEX_CHARS[(h3 >> 28) & 0x0f] +
              HEX_CHARS[(h3 >> 24) & 0x0f] +
              HEX_CHARS[(h3 >> 20) & 0x0f] +
              HEX_CHARS[(h3 >> 16) & 0x0f] +
              HEX_CHARS[(h3 >> 12) & 0x0f] +
              HEX_CHARS[(h3 >> 8) & 0x0f] +
              HEX_CHARS[(h3 >> 4) & 0x0f] +
              HEX_CHARS[h3 & 0x0f] +
              HEX_CHARS[(h4 >> 28) & 0x0f] +
              HEX_CHARS[(h4 >> 24) & 0x0f] +
              HEX_CHARS[(h4 >> 20) & 0x0f] +
              HEX_CHARS[(h4 >> 16) & 0x0f] +
              HEX_CHARS[(h4 >> 12) & 0x0f] +
              HEX_CHARS[(h4 >> 8) & 0x0f] +
              HEX_CHARS[(h4 >> 4) & 0x0f] +
              HEX_CHARS[h4 & 0x0f]);
          }
          toString() {
            return this.hex();
          }
          digest() {
            this.finalize();
            const h0 = this.#h0;
            const h1 = this.#h1;
            const h2 = this.#h2;
            const h3 = this.#h3;
            const h4 = this.#h4;
            return [
              (h0 >> 24) & 0xff,
              (h0 >> 16) & 0xff,
              (h0 >> 8) & 0xff,
              h0 & 0xff,
              (h1 >> 24) & 0xff,
              (h1 >> 16) & 0xff,
              (h1 >> 8) & 0xff,
              h1 & 0xff,
              (h2 >> 24) & 0xff,
              (h2 >> 16) & 0xff,
              (h2 >> 8) & 0xff,
              h2 & 0xff,
              (h3 >> 24) & 0xff,
              (h3 >> 16) & 0xff,
              (h3 >> 8) & 0xff,
              h3 & 0xff,
              (h4 >> 24) & 0xff,
              (h4 >> 16) & 0xff,
              (h4 >> 8) & 0xff,
              h4 & 0xff,
            ];
          }
          array() {
            return this.digest();
          }
          arrayBuffer() {
            this.finalize();
            const buffer = new ArrayBuffer(20);
            const dataView = new DataView(buffer);
            dataView.setUint32(0, this.#h0);
            dataView.setUint32(4, this.#h1);
            dataView.setUint32(8, this.#h2);
            dataView.setUint32(12, this.#h3);
            dataView.setUint32(16, this.#h4);
            return buffer;
          }
        };
        exports_24("Sha1", Sha1);
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
//
// Adapted from Node.js. Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
System.register(
  "https://deno.land/std/node/_util/_util_promisify",
  [],
  function (exports_25, context_25) {
    "use strict";
    var kCustomPromisifiedSymbol,
      kCustomPromisifyArgsSymbol,
      NodeInvalidArgTypeError;
    var __moduleName = context_25 && context_25.id;
    function promisify(original) {
      if (typeof original !== "function") {
        throw new NodeInvalidArgTypeError("original", "Function", original);
      }
      // @ts-ignore TypeScript (as of 3.7) does not support indexing namespaces by symbol
      if (original[kCustomPromisifiedSymbol]) {
        // @ts-ignore TypeScript (as of 3.7) does not support indexing namespaces by symbol
        const fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new NodeInvalidArgTypeError(
            "util.promisify.custom",
            "Function",
            fn,
          );
        }
        return Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true,
        });
      }
      // Names to create an object from in case the callback receives multiple
      // arguments, e.g. ['bytesRead', 'buffer'] for fs.read.
      // @ts-ignore TypeScript (as of 3.7) does not support indexing namespaces by symbol
      const argumentNames = original[kCustomPromisifyArgsSymbol];
      function fn(...args) {
        return new Promise((resolve, reject) => {
          // @ts-ignore: 'this' implicitly has type 'any' because it does not have a type annotation
          original.call(this, ...args, (err, ...values) => {
            if (err) {
              return reject(err);
            }
            if (argumentNames !== undefined && values.length > 1) {
              const obj = {};
              for (let i = 0; i < argumentNames.length; i++) {
                // @ts-ignore TypeScript
                obj[argumentNames[i]] = values[i];
              }
              resolve(obj);
            } else {
              resolve(values[0]);
            }
          });
        });
      }
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true,
      });
      return Object.defineProperties(
        fn,
        Object.getOwnPropertyDescriptors(original),
      );
    }
    exports_25("promisify", promisify);
    return {
      setters: [],
      execute: function () {
        // In addition to being accessible through util.promisify.custom,
        // this symbol is registered globally and can be accessed in any environment as Symbol.for('nodejs.util.promisify.custom')
        kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom");
        // This is an internal Node symbol used by functions returning multiple arguments
        // e.g. ['bytesRead', 'buffer'] for fs.read.
        kCustomPromisifyArgsSymbol = Symbol.for(
          "deno.nodejs.util.promisify.customArgs",
        );
        NodeInvalidArgTypeError = class NodeInvalidArgTypeError
          extends TypeError {
          constructor(argumentName, type, received) {
            super(
              `The "${argumentName}" argument must be of type ${type}. Received ${typeof received}`,
            );
            this.code = "ERR_INVALID_ARG_TYPE";
          }
        };
        promisify.custom = kCustomPromisifiedSymbol;
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
//
// Adapted from Node.js. Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
System.register(
  "https://deno.land/std/node/_util/_util_callbackify",
  [],
  function (exports_26, context_26) {
    "use strict";
    var NodeFalsyValueRejectionError, NodeInvalidArgTypeError;
    var __moduleName = context_26 && context_26.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new NodeInvalidArgTypeError('"original"');
      }
      const callbackified = function (...args) {
        const maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new NodeInvalidArgTypeError("last");
        }
        const cb = (...args) => {
          maybeCb.apply(this, args);
        };
        original.apply(this, args).then((ret) => {
          queueMicrotask(cb.bind(this, null, ret));
        }, (rej) => {
          rej = rej || new NodeFalsyValueRejectionError(rej);
          queueMicrotask(cb.bind(this, rej));
        });
      };
      const descriptors = Object.getOwnPropertyDescriptors(original);
      // It is possible to manipulate a functions `length` or `name` property. This
      // guards against the manipulation.
      if (typeof descriptors.length.value === "number") {
        descriptors.length.value++;
      }
      if (typeof descriptors.name.value === "string") {
        descriptors.name.value += "Callbackified";
      }
      Object.defineProperties(callbackified, descriptors);
      return callbackified;
    }
    exports_26("callbackify", callbackify);
    return {
      setters: [],
      execute: function () {
        // These are simplified versions of the "real" errors in Node.
        NodeFalsyValueRejectionError = class NodeFalsyValueRejectionError
          extends Error {
          constructor(reason) {
            super("Promise was rejected with falsy value");
            this.code = "ERR_FALSY_VALUE_REJECTION";
            this.reason = reason;
          }
        };
        NodeInvalidArgTypeError = class NodeInvalidArgTypeError
          extends TypeError {
          constructor(argumentName) {
            super(`The ${argumentName} argument must be of type function.`);
            this.code = "ERR_INVALID_ARG_TYPE";
          }
        };
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
//
// Adapted from Node.js. Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
System.register(
  "https://deno.land/std/node/_util/_util_types",
  [],
  function (exports_27, context_27) {
    "use strict";
    var _toString, _isObjectLike, _isFunctionLike;
    var __moduleName = context_27 && context_27.id;
    function isAnyArrayBuffer(value) {
      return (_isObjectLike(value) &&
        (_toString.call(value) === "[object ArrayBuffer]" ||
          _toString.call(value) === "[object SharedArrayBuffer]"));
    }
    exports_27("isAnyArrayBuffer", isAnyArrayBuffer);
    function isArrayBufferView(value) {
      return ArrayBuffer.isView(value);
    }
    exports_27("isArrayBufferView", isArrayBufferView);
    function isArgumentsObject(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object Arguments]";
    }
    exports_27("isArgumentsObject", isArgumentsObject);
    function isArrayBuffer(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object ArrayBuffer]");
    }
    exports_27("isArrayBuffer", isArrayBuffer);
    function isAsyncFunction(value) {
      return (_isFunctionLike(value) &&
        _toString.call(value) === "[object AsyncFunction]");
    }
    exports_27("isAsyncFunction", isAsyncFunction);
    function isBigInt64Array(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object BigInt64Array]");
    }
    exports_27("isBigInt64Array", isBigInt64Array);
    function isBigUint64Array(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object BigUint64Array]");
    }
    exports_27("isBigUint64Array", isBigUint64Array);
    function isBooleanObject(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object Boolean]";
    }
    exports_27("isBooleanObject", isBooleanObject);
    function isBoxedPrimitive(value) {
      return (isBooleanObject(value) ||
        isStringObject(value) ||
        isNumberObject(value) ||
        isSymbolObject(value) ||
        isBigIntObject(value));
    }
    exports_27("isBoxedPrimitive", isBoxedPrimitive);
    function isDataView(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object DataView]";
    }
    exports_27("isDataView", isDataView);
    function isDate(value) {
      return _isObjectLike(value) && _toString.call(value) === "[object Date]";
    }
    exports_27("isDate", isDate);
    // isExternal: Not implemented
    function isFloat32Array(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object Float32Array]");
    }
    exports_27("isFloat32Array", isFloat32Array);
    function isFloat64Array(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object Float64Array]");
    }
    exports_27("isFloat64Array", isFloat64Array);
    function isGeneratorFunction(value) {
      return (_isFunctionLike(value) &&
        _toString.call(value) === "[object GeneratorFunction]");
    }
    exports_27("isGeneratorFunction", isGeneratorFunction);
    function isGeneratorObject(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object Generator]";
    }
    exports_27("isGeneratorObject", isGeneratorObject);
    function isInt8Array(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object Int8Array]";
    }
    exports_27("isInt8Array", isInt8Array);
    function isInt16Array(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object Int16Array]");
    }
    exports_27("isInt16Array", isInt16Array);
    function isInt32Array(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object Int32Array]");
    }
    exports_27("isInt32Array", isInt32Array);
    function isMap(value) {
      return _isObjectLike(value) && _toString.call(value) === "[object Map]";
    }
    exports_27("isMap", isMap);
    function isMapIterator(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object Map Iterator]");
    }
    exports_27("isMapIterator", isMapIterator);
    function isModuleNamespaceObject(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object Module]";
    }
    exports_27("isModuleNamespaceObject", isModuleNamespaceObject);
    function isNativeError(value) {
      return _isObjectLike(value) && _toString.call(value) === "[object Error]";
    }
    exports_27("isNativeError", isNativeError);
    function isNumberObject(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object Number]";
    }
    exports_27("isNumberObject", isNumberObject);
    function isBigIntObject(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object BigInt]";
    }
    exports_27("isBigIntObject", isBigIntObject);
    function isPromise(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object Promise]";
    }
    exports_27("isPromise", isPromise);
    function isRegExp(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object RegExp]";
    }
    exports_27("isRegExp", isRegExp);
    function isSet(value) {
      return _isObjectLike(value) && _toString.call(value) === "[object Set]";
    }
    exports_27("isSet", isSet);
    function isSetIterator(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object Set Iterator]");
    }
    exports_27("isSetIterator", isSetIterator);
    function isSharedArrayBuffer(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object SharedArrayBuffer]");
    }
    exports_27("isSharedArrayBuffer", isSharedArrayBuffer);
    function isStringObject(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object String]";
    }
    exports_27("isStringObject", isStringObject);
    function isSymbolObject(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object Symbol]";
    }
    exports_27("isSymbolObject", isSymbolObject);
    // Adapted from Lodash
    function isTypedArray(value) {
      /** Used to match `toStringTag` values of typed arrays. */
      const reTypedTag =
        /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;
      return _isObjectLike(value) && reTypedTag.test(_toString.call(value));
    }
    exports_27("isTypedArray", isTypedArray);
    function isUint8Array(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object Uint8Array]");
    }
    exports_27("isUint8Array", isUint8Array);
    function isUint8ClampedArray(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object Uint8ClampedArray]");
    }
    exports_27("isUint8ClampedArray", isUint8ClampedArray);
    function isUint16Array(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object Uint16Array]");
    }
    exports_27("isUint16Array", isUint16Array);
    function isUint32Array(value) {
      return (_isObjectLike(value) &&
        _toString.call(value) === "[object Uint32Array]");
    }
    exports_27("isUint32Array", isUint32Array);
    function isWeakMap(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object WeakMap]";
    }
    exports_27("isWeakMap", isWeakMap);
    function isWeakSet(value) {
      return _isObjectLike(value) &&
        _toString.call(value) === "[object WeakSet]";
    }
    exports_27("isWeakSet", isWeakSet);
    return {
      setters: [],
      execute: function () {
        _toString = Object.prototype.toString;
        _isObjectLike = (value) => value !== null && typeof value === "object";
        _isFunctionLike = (value) =>
          value !== null && typeof value === "function";
      },
    };
  },
);
System.register(
  "https://deno.land/std/node/_utils",
  [],
  function (exports_28, context_28) {
    "use strict";
    var _TextDecoder, _TextEncoder;
    var __moduleName = context_28 && context_28.id;
    function notImplemented(msg) {
      const message = msg ? `Not implemented: ${msg}` : "Not implemented";
      throw new Error(message);
    }
    exports_28("notImplemented", notImplemented);
    function intoCallbackAPI(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      func,
      cb,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args
    ) {
      func(...args)
        .then((value) => cb && cb(null, value))
        .catch((err) => cb && cb(err, null));
    }
    exports_28("intoCallbackAPI", intoCallbackAPI);
    function intoCallbackAPIWithIntercept(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      func,
      interceptor,
      cb,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args
    ) {
      func(...args)
        .then((value) => cb && cb(null, interceptor(value)))
        .catch((err) => cb && cb(err, null));
    }
    exports_28("intoCallbackAPIWithIntercept", intoCallbackAPIWithIntercept);
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++) {
        list[index] = list[index + 1];
      }
      list.pop();
    }
    exports_28("spliceOne", spliceOne);
    return {
      setters: [],
      execute: function () {
        exports_28("_TextDecoder", _TextDecoder = TextDecoder);
        exports_28("_TextEncoder", _TextEncoder = TextEncoder);
      },
    };
  },
);
System.register(
  "https://deno.land/std/node/util",
  [
    "https://deno.land/std/node/_util/_util_promisify",
    "https://deno.land/std/node/_util/_util_callbackify",
    "https://deno.land/std/node/_util/_util_types",
    "https://deno.land/std/node/_utils",
  ],
  function (exports_29, context_29) {
    "use strict";
    var types, _utils_ts_1, TextDecoder, TextEncoder;
    var __moduleName = context_29 && context_29.id;
    function isArray(value) {
      return Array.isArray(value);
    }
    exports_29("isArray", isArray);
    function isBoolean(value) {
      return typeof value === "boolean" || value instanceof Boolean;
    }
    exports_29("isBoolean", isBoolean);
    function isNull(value) {
      return value === null;
    }
    exports_29("isNull", isNull);
    function isNullOrUndefined(value) {
      return value === null || value === undefined;
    }
    exports_29("isNullOrUndefined", isNullOrUndefined);
    function isNumber(value) {
      return typeof value === "number" || value instanceof Number;
    }
    exports_29("isNumber", isNumber);
    function isString(value) {
      return typeof value === "string" || value instanceof String;
    }
    exports_29("isString", isString);
    function isSymbol(value) {
      return typeof value === "symbol";
    }
    exports_29("isSymbol", isSymbol);
    function isUndefined(value) {
      return value === undefined;
    }
    exports_29("isUndefined", isUndefined);
    function isObject(value) {
      return value !== null && typeof value === "object";
    }
    exports_29("isObject", isObject);
    function isError(e) {
      return e instanceof Error;
    }
    exports_29("isError", isError);
    function isFunction(value) {
      return typeof value === "function";
    }
    exports_29("isFunction", isFunction);
    function isRegExp(value) {
      return value instanceof RegExp;
    }
    exports_29("isRegExp", isRegExp);
    function isPrimitive(value) {
      return (value === null ||
        (typeof value !== "object" && typeof value !== "function"));
    }
    exports_29("isPrimitive", isPrimitive);
    function validateIntegerRange(
      value,
      name,
      min = -2147483648,
      max = 2147483647,
    ) {
      // The defaults for min and max correspond to the limits of 32-bit integers.
      if (!Number.isInteger(value)) {
        throw new Error(`${name} must be 'an integer' but was ${value}`);
      }
      if (value < min || value > max) {
        throw new Error(
          `${name} must be >= ${min} && <= ${max}.  Value was ${value}`,
        );
      }
    }
    exports_29("validateIntegerRange", validateIntegerRange);
    return {
      setters: [
        function (_util_promisify_ts_1_1) {
          exports_29({
            "promisify": _util_promisify_ts_1_1["promisify"],
          });
        },
        function (_util_callbackify_ts_1_1) {
          exports_29({
            "callbackify": _util_callbackify_ts_1_1["callbackify"],
          });
        },
        function (types_1) {
          types = types_1;
        },
        function (_utils_ts_1_1) {
          _utils_ts_1 = _utils_ts_1_1;
        },
      ],
      execute: function () {
        exports_29("types", types);
        exports_29("TextDecoder", TextDecoder = _utils_ts_1._TextDecoder);
        exports_29("TextEncoder", TextEncoder = _utils_ts_1._TextEncoder);
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register(
  "https://deno.land/std/_util/assert",
  [],
  function (exports_30, context_30) {
    "use strict";
    var DenoStdInternalError;
    var __moduleName = context_30 && context_30.id;
    /** Make an assertion, if not `true`, then throw. */
    function assert(expr, msg = "") {
      if (!expr) {
        throw new DenoStdInternalError(msg);
      }
    }
    exports_30("assert", assert);
    return {
      setters: [],
      execute: function () {
        DenoStdInternalError = class DenoStdInternalError extends Error {
          constructor(message) {
            super(message);
            this.name = "DenoStdInternalError";
          }
        };
        exports_30("DenoStdInternalError", DenoStdInternalError);
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register(
  "https://deno.land/std/uuid/v5",
  [
    "https://deno.land/std/uuid/_common",
    "https://deno.land/std/hash/sha1",
    "https://deno.land/std/node/util",
    "https://deno.land/std/_util/assert",
  ],
  function (exports_31, context_31) {
    "use strict";
    var _common_ts_3, sha1_ts_1, util_ts_1, assert_ts_1, UUID_RE;
    var __moduleName = context_31 && context_31.id;
    function validate(id) {
      return UUID_RE.test(id);
    }
    exports_31("validate", validate);
    function generate(options, buf, offset) {
      const i = (buf && offset) || 0;
      let { value, namespace } = options;
      if (util_ts_1.isString(value)) {
        value = _common_ts_3.stringToBytes(value);
      }
      if (util_ts_1.isString(namespace)) {
        namespace = _common_ts_3.uuidToBytes(namespace);
      }
      assert_ts_1.assert(
        namespace.length === 16,
        "namespace must be uuid string or an Array of 16 byte values",
      );
      const content = namespace.concat(value);
      const bytes = new sha1_ts_1.Sha1().update(
        _common_ts_3.createBuffer(content),
      ).digest();
      bytes[6] = (bytes[6] & 0x0f) | 0x50;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      if (buf) {
        for (let idx = 0; idx < 16; ++idx) {
          buf[i + idx] = bytes[idx];
        }
      }
      return buf || _common_ts_3.bytesToUuid(bytes);
    }
    exports_31("generate", generate);
    return {
      setters: [
        function (_common_ts_3_1) {
          _common_ts_3 = _common_ts_3_1;
        },
        function (sha1_ts_1_1) {
          sha1_ts_1 = sha1_ts_1_1;
        },
        function (util_ts_1_1) {
          util_ts_1 = util_ts_1_1;
        },
        function (assert_ts_1_1) {
          assert_ts_1 = assert_ts_1_1;
        },
      ],
      execute: function () {
        UUID_RE =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      },
    };
  },
);
System.register(
  "https://deno.land/std/uuid/mod",
  [
    "https://deno.land/std/uuid/v1",
    "https://deno.land/std/uuid/v4",
    "https://deno.land/std/uuid/v5",
  ],
  function (exports_32, context_32) {
    "use strict";
    var v1, v4, v5, NIL_UUID, NOT_IMPLEMENTED, v3;
    var __moduleName = context_32 && context_32.id;
    function isNil(val) {
      return val === NIL_UUID;
    }
    exports_32("isNil", isNil);
    return {
      setters: [
        function (v1_1) {
          v1 = v1_1;
        },
        function (v4_1) {
          v4 = v4_1;
        },
        function (v5_1) {
          v5 = v5_1;
        },
      ],
      execute: function () {
        exports_32("v1", v1);
        exports_32("v4", v4);
        exports_32("v5", v5);
        exports_32(
          "NIL_UUID",
          NIL_UUID = "00000000-0000-0000-0000-000000000000",
        );
        NOT_IMPLEMENTED = {
          generate() {
            throw new Error("Not implemented");
          },
          validate() {
            throw new Error("Not implemented");
          },
        };
        // TODO Implement
        exports_32("v3", v3 = NOT_IMPLEMENTED);
      },
    };
  },
);
System.register(
  "https://deno.land/x/json_tree/mod",
  [],
  function (exports_33, context_33) {
    "use strict";
    var jsonTree;
    var __moduleName = context_33 && context_33.id;
    function makePrefix(key, last) {
      let str = (last ? "└" : "├");
      if (key) {
        str += "─ ";
      } else {
        str += "──┐";
      }
      return str;
    }
    function filterKeys(obj, hideFunctions) {
      let keys = [];
      for (let branch in obj) {
        if (!obj.hasOwnProperty(branch)) {
          continue;
        }
        if (hideFunctions && ((typeof obj[branch]) === "function")) {
          continue;
        }
        keys.push(branch);
      }
      return keys;
    }
    function growBranch(
      key,
      root,
      last,
      lastStates,
      showValues,
      hideFunctions,
      callback,
    ) {
      let line = "",
        index = 0,
        lastKey,
        circular,
        lastStatesCopy = lastStates.slice(0);
      if (lastStatesCopy.push([root, last]) && lastStates.length > 0) {
        lastStates.forEach(function (lastState, idx) {
          if (idx > 0) {
            line += (lastState[1] ? " " : "│") + "  ";
          }
          if (!circular && lastState[0] === root) {
            circular = true;
          }
        });
        line += makePrefix(key, last) + key;
        showValues && (typeof root !== "object" || root instanceof Date) &&
          (line += ": " + root);
        circular && (line += " (circular ref.)");
        callback(line);
      }
      if (!circular && typeof root === "object") {
        let keys = filterKeys(root, hideFunctions);
        keys.forEach(function (branch) {
          lastKey = ++index === keys.length;
          growBranch(
            branch,
            root[branch],
            lastKey,
            lastStatesCopy,
            showValues,
            hideFunctions,
            callback,
          );
        });
      }
    }
    return {
      setters: [],
      execute: function () {
        jsonTree = function (obj, showValues, hideFunctions) {
          let tree = "";
          growBranch(
            ".",
            obj,
            false,
            [],
            showValues,
            hideFunctions,
            function (line) {
              tree += line + "\n";
            },
          );
          return tree;
        };
        exports_33("jsonTree", jsonTree);
      },
    };
  },
);
System.register(
  "https://deno.land/x/minitable@v1.0/mod",
  [],
  function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    /**
     * Build a flexible table from a list of objects
     * @param data Data to print
     * @param header Desired header of the table
     * @param options Modify the padding, upcase the header, set empty-values replacer
     */
    function table(data, header, opts) {
      const pad = opts?.padding || 2;
      const upcase = opts?.upcaseHeader || false;
      const empty = opts?.emptyReplacer || "";
      if (!data.length || !header.length) {
        return header.join(" ".repeat(pad));
      }
      const validHeader = intersect(Object.keys(data[0]), header);
      if (!validHeader.length) {
        throw new Error("Given header does not match any datum property!");
      }
      const cols = takeCols(data, validHeader, upcase, empty);
      const rows = makeRows(cols, pad);
      return rows.map((x) => x.trimEnd()).join("\n");
    }
    exports_34("table", table);
    /*
      HELPERS
    */
    function intersect(props, header) {
      // keep original order of `header`
      const propsSet = new Set(props);
      const intersection = new Set(header.filter((prop) => propsSet.has(prop)));
      return Array.from(intersection);
    }
    function takeCols(data, header, upcase, empty) {
      const cols = [];
      header.forEach((key, idx) => {
        const keyMod = upcase ? key.toUpperCase() : key;
        cols.push([keyMod]);
        for (const datum of data) {
          if (datum.hasOwnProperty(key)) {
            cols[idx].push(datum[key]?.toString() || empty);
          } else {
            throw new Error(`No property '${key}' in one of the given data!`);
          }
        }
      });
      return cols;
    }
    function makeRows(cols, pad) {
      const maxWidths = cols.map((col) =>
        Math.max(...col.map((x) => x.length))
      );
      const rowsCount = cols[0].length;
      const rows = [];
      for (let row = 0; row < rowsCount; row++) {
        rows.push(
          cols
            .map((col) => col[row])
            .reduce(
              (
                memo,
                value,
                colIdx,
              ) => (memo += value.padEnd(maxWidths[colIdx] + pad)),
              "",
            ),
        );
      }
      return rows;
    }
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
System.register(
  "https://deno.land/std/flags/mod",
  ["https://deno.land/std/_util/assert"],
  function (exports_35, context_35) {
    "use strict";
    var assert_ts_2;
    var __moduleName = context_35 && context_35.id;
    function get(obj, key) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return obj[key];
      }
    }
    function getForce(obj, key) {
      const v = get(obj, key);
      assert_ts_2.assert(v != null);
      return v;
    }
    function isNumber(x) {
      if (typeof x === "number") {
        return true;
      }
      if (/^0x[0-9a-f]+$/i.test(String(x))) {
        return true;
      }
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(String(x));
    }
    function hasKey(obj, keys) {
      let o = obj;
      keys.slice(0, -1).forEach((key) => {
        o = (get(o, key) ?? {});
      });
      const key = keys[keys.length - 1];
      return key in o;
    }
    /** Take a set of command line arguments, with an optional set of options, and
     * return an object representation of those argument.
     *
     *      const parsedArgs = parse(Deno.args);
     */
    function parse(
      args,
      {
        "--": doubleDash = false,
        alias = {},
        boolean = false,
        default: defaults = {},
        stopEarly = false,
        string = [],
        unknown = (i) => i,
      } = {},
    ) {
      const flags = {
        bools: {},
        strings: {},
        unknownFn: unknown,
        allBools: false,
      };
      if (boolean !== undefined) {
        if (typeof boolean === "boolean") {
          flags.allBools = !!boolean;
        } else {
          const booleanArgs = typeof boolean === "string" ? [boolean] : boolean;
          for (const key of booleanArgs.filter(Boolean)) {
            flags.bools[key] = true;
          }
        }
      }
      const aliases = {};
      if (alias !== undefined) {
        for (const key in alias) {
          const val = getForce(alias, key);
          if (typeof val === "string") {
            aliases[key] = [val];
          } else {
            aliases[key] = val;
          }
          for (const alias of getForce(aliases, key)) {
            aliases[alias] = [key].concat(
              aliases[key].filter((y) => alias !== y),
            );
          }
        }
      }
      if (string !== undefined) {
        const stringArgs = typeof string === "string" ? [string] : string;
        for (const key of stringArgs.filter(Boolean)) {
          flags.strings[key] = true;
          const alias = get(aliases, key);
          if (alias) {
            for (const al of alias) {
              flags.strings[al] = true;
            }
          }
        }
      }
      const argv = { _: [] };
      function argDefined(key, arg) {
        return ((flags.allBools && /^--[^=]+$/.test(arg)) ||
          get(flags.bools, key) ||
          !!get(flags.strings, key) ||
          !!get(aliases, key));
      }
      function setKey(obj, keys, value) {
        let o = obj;
        keys.slice(0, -1).forEach(function (key) {
          if (get(o, key) === undefined) {
            o[key] = {};
          }
          o = get(o, key);
        });
        const key = keys[keys.length - 1];
        if (
          get(o, key) === undefined ||
          get(flags.bools, key) ||
          typeof get(o, key) === "boolean"
        ) {
          o[key] = value;
        } else if (Array.isArray(get(o, key))) {
          o[key].push(value);
        } else {
          o[key] = [get(o, key), value];
        }
      }
      function setArg(key, val, arg = undefined) {
        if (arg && flags.unknownFn && !argDefined(key, arg)) {
          if (flags.unknownFn(arg, key, val) === false) {
            return;
          }
        }
        const value = !get(flags.strings, key) && isNumber(val) ? Number(val)
        : val;
        setKey(argv, key.split("."), value);
        const alias = get(aliases, key);
        if (alias) {
          for (const x of alias) {
            setKey(argv, x.split("."), value);
          }
        }
      }
      function aliasIsBoolean(key) {
        return getForce(aliases, key).some((x) =>
          typeof get(flags.bools, x) === "boolean"
        );
      }
      for (const key of Object.keys(flags.bools)) {
        setArg(key, defaults[key] === undefined ? false : defaults[key]);
      }
      let notFlags = [];
      // all args after "--" are not parsed
      if (args.includes("--")) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
      }
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (/^--.+=/.test(arg)) {
          const m = arg.match(/^--([^=]+)=(.*)$/s);
          assert_ts_2.assert(m != null);
          const [, key, value] = m;
          if (flags.bools[key]) {
            const booleanValue = value !== "false";
            setArg(key, booleanValue, arg);
          } else {
            setArg(key, value, arg);
          }
        } else if (/^--no-.+/.test(arg)) {
          const m = arg.match(/^--no-(.+)/);
          assert_ts_2.assert(m != null);
          setArg(m[1], false, arg);
        } else if (/^--.+/.test(arg)) {
          const m = arg.match(/^--(.+)/);
          assert_ts_2.assert(m != null);
          const [, key] = m;
          const next = args[i + 1];
          if (
            next !== undefined &&
            !/^-/.test(next) &&
            !get(flags.bools, key) &&
            !flags.allBools &&
            (get(aliases, key) ? !aliasIsBoolean(key) : true)
          ) {
            setArg(key, next, arg);
            i++;
          } else if (/^(true|false)$/.test(next)) {
            setArg(key, next === "true", arg);
            i++;
          } else {
            setArg(key, get(flags.strings, key) ? "" : true, arg);
          }
        } else if (/^-[^-]+/.test(arg)) {
          const letters = arg.slice(1, -1).split("");
          let broken = false;
          for (let j = 0; j < letters.length; j++) {
            const next = arg.slice(j + 2);
            if (next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
              setArg(letters[j], next.split("=")[1], arg);
              broken = true;
              break;
            }
            if (
              /[A-Za-z]/.test(letters[j]) &&
              /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)
            ) {
              setArg(letters[j], next, arg);
              broken = true;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg);
              broken = true;
              break;
            } else {
              setArg(
                letters[j],
                get(flags.strings, letters[j]) ? "" : true,
                arg,
              );
            }
          }
          const [key] = arg.slice(-1);
          if (!broken && key !== "-") {
            if (
              args[i + 1] &&
              !/^(-|--)[^-]/.test(args[i + 1]) &&
              !get(flags.bools, key) &&
              (get(aliases, key) ? !aliasIsBoolean(key) : true)
            ) {
              setArg(key, args[i + 1], arg);
              i++;
            } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
              setArg(key, args[i + 1] === "true", arg);
              i++;
            } else {
              setArg(key, get(flags.strings, key) ? "" : true, arg);
            }
          }
        } else {
          if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
            argv._.push(
              flags.strings["_"] ?? !isNumber(arg) ? arg : Number(arg),
            );
          }
          if (stopEarly) {
            argv._.push(...args.slice(i + 1));
            break;
          }
        }
      }
      for (const key of Object.keys(defaults)) {
        if (!hasKey(argv, key.split("."))) {
          setKey(argv, key.split("."), defaults[key]);
          if (aliases[key]) {
            for (const x of aliases[key]) {
              setKey(argv, x.split("."), defaults[key]);
            }
          }
        }
      }
      if (doubleDash) {
        argv["--"] = [];
        for (const key of notFlags) {
          argv["--"].push(key);
        }
      } else {
        for (const key of notFlags) {
          argv._.push(key);
        }
      }
      return argv;
    }
    exports_35("parse", parse);
    return {
      setters: [
        function (assert_ts_2_1) {
          assert_ts_2 = assert_ts_2_1;
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "file:///home/yazid/Documents/projects/snippet-cli/lib/display",
  [
    "file:///home/yazid/Documents/projects/snippet-cli/lib/database",
    "https://deno.land/x/json_tree/mod",
    "https://deno.land/x/minitable@v1.0/mod",
    "https://deno.land/x/moment/moment",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/formats",
    "https://deno.land/std/flags/mod",
  ],
  function (exports_36, context_36) {
    "use strict";
    var database_ts_2,
      mod_ts_4,
      mod_ts_5,
      moment_ts_2,
      formats_ts_2,
      mod_ts_6,
      flags;
    var __moduleName = context_36 && context_36.id;
    function init_display() {
      if (Object.keys(flags).length !== 1) {
        display_entries_default();
      } else {
        console.log("Use -h or --help to get started.");
      }
      if (flags.tags) {
        display_all_tags();
      }
    }
    exports_36("init_display", init_display);
    async function display_entries_default() {
      if (flags.a || flags.all) {
        display_all_entries();
      } else if (flags.today) {
        display_today_entries();
      }
    }
    async function display_today_entries() {
      let search_results = [];
      const store = await database_ts_2.default.get("entries");
      search_results = store.filter((e) => {
        if (
          moment_ts_2.moment(e.created, formats_ts_2.created_format).isSame(
            moment_ts_2.moment(),
            "day",
          )
        ) {
          return e;
        }
      });
      display(search_results, "Today");
    }
    exports_36("display_today_entries", display_today_entries);
    async function display_all_entries() {
      const entries = await database_ts_2.default.get("entries");
      if (await database_ts_2.default.has("entries")) {
        display(await database_ts_2.default.get("entries"), "All");
      }
    }
    async function display_all_tags() {
      display(await database_ts_2.default.get("tags"), "Tags", true);
    }
    async function display(output, context, tags) {
      if (output.length === 0) {
        console.log(`Nothing to display for ${context || ""}`);
      } else {
        if (!tags) {
          const default_view_mode = await database_ts_2.default.get(
            "view_mode",
          );
          let display_mode = "tree";
          if (flags.v) {
            display_mode = flags.v;
          } else if (
            ["mini", "compact", "full", "table", "tree"].includes(
              default_view_mode,
            )
          ) {
            display_mode = default_view_mode;
          }
          console.log(`

  | Displaying: ${context || ""}  as "${display_mode}"
  
      `);
          if (display_mode === "mini") {
            console.log(mod_ts_5.table(output, ["text"]));
          } else if (display_mode === "compact") {
            console.log(mod_ts_5.table(output, ["text", "created"]));
          } else if (display_mode === "full") {
            console.log(mod_ts_5.table(output, ["text", "created", "id"]));
          } else if (display_mode === "table") {
            console.table(output);
          } else {
            const formatted_output = output.map((e) => {
              return {
                [e.text]: e.text,
                [e.created]: e.created,
                [`ID: ${e.id}`]: e.id,
              };
            });
            console.log(mod_ts_4.jsonTree(formatted_output, false));
          }
        } else {
          console.log(`Displaying: ${context || ""}`);
          console.log(mod_ts_4.jsonTree(output, true));
        }
      }
    }
    exports_36("display", display);
    return {
      setters: [
        function (database_ts_2_1) {
          database_ts_2 = database_ts_2_1;
        },
        function (mod_ts_4_1) {
          mod_ts_4 = mod_ts_4_1;
        },
        function (mod_ts_5_1) {
          mod_ts_5 = mod_ts_5_1;
        },
        function (moment_ts_2_1) {
          moment_ts_2 = moment_ts_2_1;
        },
        function (formats_ts_2_1) {
          formats_ts_2 = formats_ts_2_1;
        },
        function (mod_ts_6_1) {
          mod_ts_6 = mod_ts_6_1;
        },
      ],
      execute: function () {
        flags = mod_ts_6.parse(Deno.args);
      },
    };
  },
);
System.register(
  "file:///home/yazid/Documents/projects/snippet-cli/lib/write",
  [
    "file:///home/yazid/Documents/projects/snippet-cli/lib/database",
    "https://deno.land/std/uuid/mod",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/formats",
    "https://deno.land/x/moment/moment",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/display",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/search",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/regex",
  ],
  function (exports_37, context_37) {
    "use strict";
    var database_ts_3,
      mod_ts_7,
      formats_ts_3,
      moment_ts_3,
      display_ts_1,
      search_ts_1,
      regex_ts_2,
      _write;
    var __moduleName = context_37 && context_37.id;
    async function write_entry(flag, subflags) {
      let tags = [];
      let is_tag;
      do {
        is_tag = regex_ts_2.default.rx_tag.exec(flag);
        if (is_tag) {
          tags.push(is_tag[2]);
        }
      } while (is_tag);
      tags = [...new Set(tags)];
      const store = await database_ts_3.default.get("entries");
      const on = subflags.on;
      const at = subflags.at;
      const write_moment = moment_ts_3.moment();
      const date = on
        ? moment_ts_3.moment(on, formats_ts_3.date_input_formats).format(
          "YYYY-MM-DD",
        )
        : write_moment.format("YYYY-MM-DD");
      const time = at
        ? moment_ts_3.moment(at, formats_ts_3.time_input_formats).format(
          "h:mm:ss a",
        )
        : write_moment.format("h:mm:ss a");
      const created = moment_ts_3.moment(
        `${date} ${time}`,
        "YYYY-MM-DD h:mm:ss a",
      ).format(formats_ts_3.created_format);
      const text = flag || subflags.args.join(" ");
      const new_entry = { id: mod_ts_7.v4.generate(), text, created, tags };
      const updated_store = [new_entry, ...store];
      await database_ts_3.default.set("entries", updated_store);
      if (tags.length !== 0) {
        const tags_store = await database_ts_3.default.get("tags");
        tags.forEach((t) => {
          if (tags_store.includes(t)) {
            tags = tags.filter((_t) => _t !== t);
          }
        });
        const updated_tags_store = [...tags, ...tags_store];
        await database_ts_3.default.set("tags", updated_tags_store);
      }
      display_ts_1.display(await search_ts_1.default.is_same(date), date);
    }
    async function edit_entry(flag, args) {
      const store = await database_ts_3.default.get("entries");
      const entry = store.find((e) => e.id === flag);
      if (entry) {
        entry.text = args[0];
        const semi_updated_store = store.filter((e) => e.id !== flag);
        const updated_store = [entry, ...semi_updated_store];
        await database_ts_3.default.set("entries", []); // Temporary
        await database_ts_3.default.set("entries", updated_store);
        const date = moment_ts_3.moment(
          entry.created,
          formats_ts_3.created_format,
        ).format("YYYY-MM-DD");
        display_ts_1.display(await search_ts_1.default.is_same(date), date);
      } else {
        console.log("Specified ID is incorrect.");
      }
    }
    async function remove_entry(flag, subflags, args) {
      const store = await database_ts_3.default.get("entries");
      const { all, today, last, date, between, recent, tag } = subflags;
      if (tag) {
        remove_tag(tag);
      } else if (all) {
        await database_ts_3.default.set("entries", []);
      } else if (recent) {
        remove_recent(parseInt(recent));
      } else if (today) {
        remove_by(await search_ts_1.default.is_same(moment_ts_3.moment()));
      } else if (last) {
        remove_by(await search_ts_1.default.last(last));
      } else if (date) {
        remove_by(await search_ts_1.default.is_same(date));
      } else if (between[0] && between[1]) {
        remove_by(await search_ts_1.default.is_between(between));
      } else if (flag) {
        const entry = store.find((e) => e.id === flag);
        if (entry) {
          const updated_store = store.filter((e) => e.id !== flag);
          await database_ts_3.default.set("entries", updated_store);
          const date = moment_ts_3.moment(
            entry.created,
            formats_ts_3.created_format,
          ).format("YYYY-MM-DD");
          display_ts_1.display(await search_ts_1.default.is_same(date), date);
        } else {
          console.log("Specified ID is incorrect.");
        }
      }
    }
    async function remove_by(input) {
      const store = await database_ts_3.default.get("entries");
      const updated_store = store.filter((e) => !input.includes(e));
      await database_ts_3.default.set("entries", updated_store);
    }
    async function remove_recent(input) {
      const store = await database_ts_3.default.get("entries");
      const updated_store = store.filter((e, index) => index >= input);
      await database_ts_3.default.set("entries", updated_store);
    }
    async function remove_tag(input) {
      const store = await database_ts_3.default.get("tags");
      const tag = store.find((t) => t === input);
      if (tag) {
        const updated_store = store.filter((t) => t !== tag);
        await database_ts_3.default.set("tags", updated_store);
      }
    }
    return {
      setters: [
        function (database_ts_3_1) {
          database_ts_3 = database_ts_3_1;
        },
        function (mod_ts_7_1) {
          mod_ts_7 = mod_ts_7_1;
        },
        function (formats_ts_3_1) {
          formats_ts_3 = formats_ts_3_1;
        },
        function (moment_ts_3_1) {
          moment_ts_3 = moment_ts_3_1;
        },
        function (display_ts_1_1) {
          display_ts_1 = display_ts_1_1;
        },
        function (search_ts_1_1) {
          search_ts_1 = search_ts_1_1;
        },
        function (regex_ts_2_1) {
          regex_ts_2 = regex_ts_2_1;
        },
      ],
      execute: function () {
        _write = {
          write_entry,
          edit_entry,
          remove_entry,
        };
        exports_37("default", _write);
      },
    };
  },
);
System.register(
  "https://deno.land/x/deno_markdown/src/enums/list_types",
  [],
  function (exports_38, context_38) {
    "use strict";
    var ListTypes;
    var __moduleName = context_38 && context_38.id;
    return {
      setters: [],
      execute: function () {
        (function (ListTypes) {
          ListTypes[ListTypes["Ordered"] = 1] = "Ordered";
          ListTypes[ListTypes["UnOrdered"] = 2] = "UnOrdered";
        })(ListTypes || (ListTypes = {}));
        exports_38("ListTypes", ListTypes);
      },
    };
  },
);
// (The MIT License)
System.register(
  "https://deno.land/x/deno_markdown/src/table",
  [],
  function (exports_39, context_39) {
    "use strict";
    var trailingWhitespace,
      space,
      lineFeed,
      dash,
      colon,
      verticalBar,
      x,
      C,
      L,
      R,
      c,
      l,
      r;
    var __moduleName = context_39 && context_39.id;
    // Create a table from a matrix of strings.
    function markdownTable(table, options) {
      var settings = options || {};
      var padding = settings.padding !== false;
      var start = settings.delimiterStart !== false;
      var end = settings.delimiterEnd !== false;
      var align = (settings.align || []).concat();
      var alignDelimiters = settings.alignDelimiters !== false;
      var alignments = [];
      var stringLength = settings.stringLength || defaultStringLength;
      var rowIndex = -1;
      var rowLength = table.length;
      var cellMatrix = [];
      var sizeMatrix = [];
      var row = [];
      var sizes = [];
      var longestCellByColumn = [];
      var mostCellsPerRow = 0;
      var cells;
      var columnIndex;
      var columnLength;
      var largest;
      var size;
      var cell;
      var lines;
      var line;
      var before;
      var after;
      var code;
      // This is a superfluous loop if we don’t align delimiters, but otherwise we’d
      // do superfluous work when aligning, so optimize for aligning.
      while (++rowIndex < rowLength) {
        cells = table[rowIndex];
        columnIndex = -1;
        columnLength = cells.length;
        row = [];
        sizes = [];
        if (columnLength > mostCellsPerRow) {
          mostCellsPerRow = columnLength;
        }
        while (++columnIndex < columnLength) {
          cell = serialize(cells[columnIndex]);
          if (alignDelimiters === true) {
            size = stringLength(cell);
            sizes[columnIndex] = size;
            largest = longestCellByColumn[columnIndex];
            if (largest === undefined || size > largest) {
              longestCellByColumn[columnIndex] = size;
            }
          }
          row.push(cell);
        }
        cellMatrix[rowIndex] = row;
        sizeMatrix[rowIndex] = sizes;
      }
      // Figure out which alignments to use.
      columnIndex = -1;
      columnLength = mostCellsPerRow;
      if (typeof align === "object" && "length" in align) {
        while (++columnIndex < columnLength) {
          alignments[columnIndex] = toAlignment(align[columnIndex]);
        }
      } else {
        code = toAlignment(align);
        while (++columnIndex < columnLength) {
          alignments[columnIndex] = code;
        }
      }
      // Inject the alignment row.
      columnIndex = -1;
      columnLength = mostCellsPerRow;
      row = [];
      sizes = [];
      while (++columnIndex < columnLength) {
        code = alignments[columnIndex];
        before = "";
        after = "";
        if (code === l) {
          before = colon;
        } else if (code === r) {
          after = colon;
        } else if (code === c) {
          before = colon;
          after = colon;
        }
        // There *must* be at least one hyphen-minus in each alignment cell.
        size = alignDelimiters
          ? Math.max(
            1,
            longestCellByColumn[columnIndex] - before.length - after.length,
          )
          : 1;
        cell = before + dash.repeat(size) + after;
        if (alignDelimiters === true) {
          size = before.length + size + after.length;
          if (size > longestCellByColumn[columnIndex]) {
            longestCellByColumn[columnIndex] = size;
          }
          sizes[columnIndex] = size;
        }
        row[columnIndex] = cell;
      }
      // Inject the alignment row.
      cellMatrix.splice(1, 0, row);
      sizeMatrix.splice(1, 0, sizes);
      rowIndex = -1;
      rowLength = cellMatrix.length;
      lines = [];
      while (++rowIndex < rowLength) {
        row = cellMatrix[rowIndex];
        sizes = sizeMatrix[rowIndex];
        columnIndex = -1;
        columnLength = mostCellsPerRow;
        line = [];
        while (++columnIndex < columnLength) {
          cell = row[columnIndex] || "";
          before = "";
          after = "";
          if (alignDelimiters === true) {
            size = longestCellByColumn[columnIndex] - (sizes[columnIndex] || 0);
            code = alignments[columnIndex];
            if (code === r) {
              before = space.repeat(size);
            } else if (code === c) {
              if (size % 2 === 0) {
                before = space.repeat(size / 2);
                after = before;
              } else {
                before = space.repeat(size / 2 + 0.5);
                after = space.repeat(size / 2 - 0.5);
              }
            } else {
              after = space.repeat(size);
            }
          }
          if (start === true && columnIndex === 0) {
            line.push(verticalBar);
          }
          if (
            padding === true &&
            // Don’t add the opening space if we’re not aligning and the cell is
            // empty: there will be a closing space.
            !(alignDelimiters === false && cell === "") &&
            (start === true || columnIndex !== 0)
          ) {
            line.push(space);
          }
          if (alignDelimiters === true) {
            line.push(before);
          }
          line.push(cell);
          if (alignDelimiters === true) {
            line.push(after);
          }
          if (padding === true) {
            line.push(space);
          }
          if (end === true || columnIndex !== columnLength - 1) {
            line.push(verticalBar);
          }
        }
        line = line.join("");
        if (end === false) {
          line = line.replace(trailingWhitespace, "");
        }
        lines.push(line);
      }
      return lines.join(lineFeed);
    }
    exports_39("default", markdownTable);
    function serialize(value) {
      return value === null || value === undefined ? "" : String(value);
    }
    function defaultStringLength(value) {
      return value.length;
    }
    function toAlignment(value) {
      var code = typeof value === "string" ? value.charCodeAt(0) : x;
      return code === L || code === l ? l : code === R || code === r
      ? r
      : code === C || code === c
      ? c
      : x;
    }
    return {
      setters: [],
      execute: function () {
        // Copyright(c) 2014 Titus Wormer < tituswormer@gmail.com>
        //   Permission is hereby granted, free of charge, to any person obtaining
        // a copy of this software and associated documentation files(the
        // 'Software'), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        //   distribute, sublicense, and / or sell copies of the Software, and to
        // permit persons to whom the Software is furnished to do so, subject to
        // the following conditions:
        // The above copyright notice and this permission notice shall be
        // included in all copies or substantial portions of the Software.
        // THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
        //   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        // IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        // CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        //   TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        // SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        trailingWhitespace = / +$/;
        // Characters.
        space = " ";
        lineFeed = "\n";
        dash = "-";
        colon = ":";
        verticalBar = "|";
        x = 0;
        C = 67;
        L = 76;
        R = 82;
        c = 99;
        l = 108;
        r = 114;
      },
    };
  },
);
System.register(
  "https://deno.land/x/deno_markdown/src/main",
  [
    "https://deno.land/x/deno_markdown/src/enums/list_types",
    "https://deno.land/x/deno_markdown/src/table",
  ],
  function (exports_40, context_40) {
    "use strict";
    var list_types_ts_1, table_ts_1, Markdown;
    var __moduleName = context_40 && context_40.id;
    return {
      setters: [
        function (list_types_ts_1_1) {
          list_types_ts_1 = list_types_ts_1_1;
        },
        function (table_ts_1_1) {
          table_ts_1 = table_ts_1_1;
        },
      ],
      execute: function () {
        /** Create Markdown content and files. */
        Markdown = class Markdown {
          constructor() {
            this.content = "";
          }
          /**
                * Adds a markdown header string from 1-6 to the content
                * @param text Header text
                * @param value Header weight e.g 1-6
                */
          header(text, value) {
            if (value > 6) {
              throw new Error("Header weight can only be between 1-6");
            }
            const markdownHeaderCharacter = "#";
            this.content += `${
              markdownHeaderCharacter.repeat(value)
            } ${text}\n\n`;
            return this;
          }
          /**
                * Adds an markdown list either ordered or unordered to the content
                * @param textArray Array of items to bue put into a list
                * @param listType Ordered or Unordered list defaults to unordered
                * @param character Desired character for unordered list defaults to `-`
                */
          list(
            textArray,
            listType = list_types_ts_1.ListTypes.UnOrdered,
            character = "-",
            subList,
          ) {
            if (listType === list_types_ts_1.ListTypes.Ordered) {
              textArray.map((item, index) => {
                this.content += `${subList ? "\t" : ""}${index + 1}. ${item}\n`;
              });
              this.content += "\n";
              return this;
            }
            const unorderedListCharacters = ["-", "+", "*"];
            if (!unorderedListCharacters.includes(character)) {
              throw new Error(
                "Please supply a valid markdown character for unordered lists",
              );
            }
            textArray.map((item) => {
              this.content += `${subList ? "\t" : ""}${character} ${item}\n`;
            });
            this.content += "\n";
            return this;
          }
          /**
                * Adds a markdown quote to the content
                * @param text content you wish to be quoted
                */
          quote(text, nested = false) {
            nested ? this.content += `>> ${text}\n`
            : this.content += `> ${text}\n`;
            return this;
          }
          /**
                * Adds a paragraph of text to the content
                * @param text content you wish to be written out
                */
          paragraph(text) {
            this.content += `${text}\n\n`;
            return this;
          }
          /**
                * Adds a code block to the content
                * @param code code you wish to be added
                * @param language determines the syntax highlighting for the code
                */
          codeBlock(code, language = "") {
            this.content += `\`\`\`${language}\n${code}\n\`\`\`\n\n`;
            return this;
          }
          /**
                * Adds a task list to the content
                * @param tasks an array of tasks you wish to add
                */
          taskList(tasks) {
            if (tasks.length === 0) {
              throw new Error("Please ensure there is at least 1 task");
            }
            tasks.map((task) => {
              this.content += `- [] ${task}\n`;
            });
            this.content += "\n";
            return this;
          }
          /**
                * Adds a markdown table to the  content
                * @param tableContent The content you wish to be added to the table
                * @param options optional options for styling the table
                */
          table(tableContent, options = {}) {
            let table = table_ts_1.default(tableContent, options);
            this.content += table + "\n\n";
            return this;
          }
          /**
                * Adds a markdown horizontal rule
                */
          horizontalRule(style = "---") {
            const markdownHorizontalRuleCharacters = ["---", "***", "___"];
            if (!markdownHorizontalRuleCharacters.includes(style)) {
              throw new Error(
                "Please use the correct markdown characters for horizontal rules",
              );
            }
            this.content += `${style}\n\n`;
            return this;
          }
          /**
                * Writes the content to a markdown file you do not need to supply a .md
                * @param path Location you wish to create the file
                * @param fileName The name of the file
                * @param content The content you wish to write to the file. This defaults to the chained content
                */
          async write(path, fileName, content = this.content) {
            const file = await Deno.create(`${path}${fileName}.md`);
            const encoder = new TextEncoder();
            const data = encoder.encode(content);
            await Deno.write(file.rid, data); // 11
            Deno.close(file.rid);
          }
        };
        exports_40("Markdown", Markdown);
      },
    };
  },
);
System.register(
  "https://deno.land/x/deno_markdown/src/extensions",
  [],
  function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    /**
    * Creates a block of inline code
    * @param code
    */
    function inlineCode(code) {
      return `\`${code}\``;
    }
    exports_41("inlineCode", inlineCode);
    /**
    * Creates a string with italics
    * @param text The text you wish to be made italic
    * @param style The style you wish to use for italics defaults to `_`
    * @returns {string} A string value with italic markdown characters on both sides
    */
    function italics(text, style = "_") {
      const markdownItalicCharacters = ["_", "*"];
      if (!markdownItalicCharacters.includes(style)) {
        throw new Error("Please use the correct markdown characters");
      }
      return style + text + style;
    }
    exports_41("italics", italics);
    /**
    * Creates a string with bold
    * @param text The text you wish to be made bold
    * @param style The style you wish to use for bold defaults to `**`
    * @returns {string} A string value with bold markdown characters on both sides
    */
    function bold(text, style = "**") {
      const markdownBoldCharacters = ["**", "__"];
      if (!markdownBoldCharacters.includes(style)) {
        throw new Error("Please use the correct markdown characters");
      }
      return style + text + style;
    }
    exports_41("bold", bold);
    /**
    * Creates a string with a strike through
    * @param text The text you wish to be have a strike through
    * @returns {string} A string value with strike markdown characters on both sides
    */
    function strike(text) {
      return "~~" + text + "~~";
    }
    exports_41("strike", strike);
    /**
    * Creates a markdown link block
    * @param altText The alt text of the link
    * @param link
    * @returns {string} Markdown block with alt text and a link
    */
    function link(altText, link, title) {
      return `[${altText}](${link}${
        title === undefined ? "" : ' "' + title + '"'
      })`;
    }
    exports_41("link", link);
    /**
    * Creates a markdown image block
    * @param altText The alt text of the image
    * @param link Link to the image
    * @returns {string} Markdown block with alt text and image link
    */
    function image(altText, imageLink, title) {
      return `!${link(altText, imageLink, title)}`;
    }
    exports_41("image", image);
    return {
      setters: [],
      execute: function () {
      },
    };
  },
);
// Copyright 2018-2020 Jason Hughes. All rights reserved. MIT license.
System.register(
  "https://deno.land/x/deno_markdown/mod",
  [
    "https://deno.land/x/deno_markdown/src/enums/list_types",
    "https://deno.land/x/deno_markdown/src/main",
    "https://deno.land/x/deno_markdown/src/extensions",
  ],
  function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var exportedNames_2 = {
      "ListTypes": true,
      "Markdown": true,
    };
    function exportStar_2(m) {
      var exports = {};
      for (var n in m) {
        if (n !== "default" && !exportedNames_2.hasOwnProperty(n)) {
          exports[n] = m[n];
        }
      }
      exports_42(exports);
    }
    return {
      setters: [
        function (list_types_ts_2_1) {
          exports_42({
            "ListTypes": list_types_ts_2_1["ListTypes"],
          });
        },
        function (main_ts_1_1) {
          exports_42({
            "Markdown": main_ts_1_1["Markdown"],
          });
        },
        function (extensions_ts_1_1) {
          exportStar_2(extensions_ts_1_1);
        },
      ],
      execute: function () {
      },
    };
  },
);
System.register(
  "file:///home/yazid/Documents/projects/snippet-cli/lib/import_export",
  [
    "file:///home/yazid/Documents/projects/snippet-cli/lib/database",
    "https://deno.land/x/deno_markdown/mod",
    "https://deno.land/x/moment/moment",
  ],
  function (exports_43, context_43) {
    "use strict";
    var database_ts_4, mod_ts_8, moment_ts_4, _impexp;
    var __moduleName = context_43 && context_43.id;
    async function export_entries_md(flag) {
      let markdown = new mod_ts_8.Markdown();
      const export_time = moment_ts_4.moment().format("MMMM_Do_YYYY_h_mm_a");
      const entries = await database_ts_4.default.get("entries");
      const entries_to_export = entries.map((e) =>
        `[${e.created}]: ${e.text}.`
      );
      await markdown
        .header("Entries", 1)
        .header(export_time, 3)
        .list(entries_to_export, mod_ts_8.ListTypes.Ordered)
        .quote("Generated by snippet-cli.")
        .write("./", `snippet_cli_export_${export_time}`);
    }
    async function export_entries_json(flag) {
      const export_time = moment_ts_4.moment().format("MMMM_Do_YYYY_h_mm_a");
      await Deno.writeTextFile(
        `snippet_cli_export_${export_time}.json`,
        JSON.stringify(await database_ts_4.default.get("entries")),
      );
    }
    async function import_entries(flag) {
      await database_ts_4.default.set(
        "entries",
        JSON.parse(await Deno.readTextFile(flag)),
      );
    }
    return {
      setters: [
        function (database_ts_4_1) {
          database_ts_4 = database_ts_4_1;
        },
        function (mod_ts_8_1) {
          mod_ts_8 = mod_ts_8_1;
        },
        function (moment_ts_4_1) {
          moment_ts_4 = moment_ts_4_1;
        },
      ],
      execute: function () {
        _impexp = {
          import_entries,
          export_entries_json,
          export_entries_md,
        };
        exports_43("default", _impexp);
      },
    };
  },
);
System.register(
  "file:///home/yazid/Documents/projects/snippet-cli/lib/help",
  [],
  function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    return {
      setters: [],
      execute: function () {
        exports_44(
          "default",
          `
snippet-cli 0.1
An entry based journaling application.

USAGE:

    snpt [OPTIONS] [INPUT]

OPTIONS:

    DISPLAY:

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

    WRITE:

        -w, --write <entry>
            Write a new entry

        @ or #
            Use @ or # to create and use tags in your entries. (e.g. @deno #new_tag)

        --set, -a <entry> --set <date>
            Specify a date when writing an entry.

        -e, --edit <entry_id> <updated_entry_text>
            Edit an existing entry

        -r, --remove <entry_id>
            Remove an entry, provide the ID

    SEARCH:

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

    EXPORT/IMPORT:

        -m, --markdown
            Export your entries to a styled markdown file.

        -j, --json
            Export your entries to a restorable JSON file.

        -i, --import <json_file_path>
            Export your entries to a restorable JSON file.

    EXTRA:

        -c, --clear
            Clear everything and reset snippet.

        -h, --help
            Display help to get started.

    DATE FORMATS:

        YYYY-MM-DD (e.g. 2020-06-16)
        DD-MM-YYYY (e.g. 16-06-2020)
        DD-MM-YY (e.g. 16-06-20)
        YY-MM-DD (e.g. 20-06-16)
        M-D (e.g. 6-17, 06-17)
        MM-YYYY (e.g. 6-2020, 06-2020)
        M (e.g. 6, 06, 2, 4, 09, 12)
        YYYY (e.g. 2020, 2016)
        YY (e.g. 20, 18, 14, 98)
        `,
        );
      },
    };
  },
);
System.register(
  "file:///home/yazid/Documents/projects/snippet-cli/lib/extras",
  [
    "file:///home/yazid/Documents/projects/snippet-cli/lib/database",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/help",
  ],
  function (exports_45, context_45) {
    "use strict";
    var database_ts_5, help_ts_1, _extras;
    var __moduleName = context_45 && context_45.id;
    async function reset() {
      await database_ts_5.default.clear();
      console.log("Starting from scratch..!");
    }
    async function help() {
      console.log(help_ts_1.default);
    }
    async function set_view_mode(flag) {
      await database_ts_5.default.set("view_mode", flag);
      console.log(`Default View Mode is: ${flag}`);
    }
    return {
      setters: [
        function (database_ts_5_1) {
          database_ts_5 = database_ts_5_1;
        },
        function (help_ts_1_1) {
          help_ts_1 = help_ts_1_1;
        },
      ],
      execute: function () {
        _extras = {
          set_view_mode,
          reset,
          help,
        };
        exports_45("default", _extras);
      },
    };
  },
);
System.register(
  "file:///home/yazid/Documents/projects/snippet-cli/snpt",
  [
    "file:///home/yazid/Documents/projects/snippet-cli/lib/search",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/write",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/import_export",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/extras",
    "https://deno.land/std/flags/mod",
    "file:///home/yazid/Documents/projects/snippet-cli/lib/display",
  ],
  function (exports_46, context_46) {
    "use strict";
    var search_ts_2,
      write_ts_1,
      import_export_ts_1,
      extras_ts_1,
      mod_ts_9,
      flags,
      args,
      display_ts_2;
    var __moduleName = context_46 && context_46.id;
    return {
      setters: [
        function (search_ts_2_1) {
          search_ts_2 = search_ts_2_1;
        },
        function (write_ts_1_1) {
          write_ts_1 = write_ts_1_1;
        },
        function (import_export_ts_1_1) {
          import_export_ts_1 = import_export_ts_1_1;
        },
        function (extras_ts_1_1) {
          extras_ts_1 = extras_ts_1_1;
        },
        function (mod_ts_9_1) {
          mod_ts_9 = mod_ts_9_1;
        },
        function (display_ts_2_1) {
          display_ts_2 = display_ts_2_1;
        },
      ],
      execute: async function () {
        flags = mod_ts_9.parse(Deno.args), args = flags._;
        display_ts_2.init_display();
        // Search
        if (flags.s || flags.search) {
          display_ts_2.display(
            await search_ts_2.default.search_by_text(flags.s || flags.search),
            flags.s || flags.search,
          );
        }
        if (flags.t || flags.tag) {
          display_ts_2.display(
            await search_ts_2.default.search_by_tag(flags.t || flags.tag),
            flags.t || flags.tag,
          );
        }
        if (flags.d || flags.date) {
          display_ts_2.display(
            await search_ts_2.default.is_same(flags.d || flags.date),
            flags.d || flags.date,
          );
        }
        if ((flags.f && flags.u) || (flags.from && flags.until)) {
          display_ts_2.display(
            await search_ts_2.default.is_between(
              flags.f
                ? [flags.f, flags.u]
                : [flags.from, flags.until],
            ),
            `${flags.f || flags.from} ---> ${flags.u || flags.until}`,
          );
        }
        if (flags.l || flags.last) {
          display_ts_2.display(
            await search_ts_2.default.last(flags.l || flags.last),
            flags.l || flags.last,
          );
        }
        // Write
        if (flags.w || flags.write || args.length) {
          write_ts_1.default.write_entry(flags.w || flags.write, {
            on: flags.on,
            at: flags.at,
            args,
          });
        }
        if (flags.e || flags.edit) {
          write_ts_1.default.edit_entry(flags.e || flags.edit, args);
        }
        if (flags.r || flags.remove) {
          write_ts_1.default.remove_entry(flags.r || flags.remove, {
            today: flags.today,
            last: flags.l || flags.last,
            date: flags.d || flags.date,
            between: [flags.f || flags.from, flags.u || flags.until],
            all: flags.a || flags.all,
            recent: flags.recent,
            tag: flags.t || flags.tag,
          }, args);
        }
        // Export & Import
        if (flags.m || flags.markdown) {
          import_export_ts_1.default.export_entries_md(
            flags.m || flags.markdown,
          );
        }
        if (flags.j || flags.json) {
          import_export_ts_1.default.export_entries_json(flags.j || flags.json);
        }
        if (flags.i || flags.import) {
          import_export_ts_1.default.import_entries(flags.i || flags.import);
        }
        // Extras
        if (flags.setview) {
          extras_ts_1.default.set_view_mode(flags.setview);
        }
        if (flags.c || flags.clear) {
          extras_ts_1.default.reset();
        }
        if (flags.h || flags.help) {
          extras_ts_1.default.help();
        }
      },
    };
  },
);

await __instantiateAsync(
  "file:///home/yazid/Documents/projects/snippet-cli/snpt",
);
