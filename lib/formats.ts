// All
const date_input_formats = [
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
const time_input_formats = ["h a", "h:mm a", "h:mm", "h:mm:ss a"];

// Specific
const created_format = "dddd, MMMM Do YYYY, h:mm:ss a";

// Search
const is_day_formats = ["YYYY-MM-DD", "DD-MM-YYYY", "DD-MM-YY", "YY-MM-DD", "M-D", "D-M"];
const is_month_formats = ["MM-YYYY", "M", "MM"];
const is_year_formats = ["YYYY", "YY", "Y"];

export {
  date_input_formats,
  time_input_formats,
  created_format,
  is_day_formats,
  is_month_formats,
  is_year_formats
};