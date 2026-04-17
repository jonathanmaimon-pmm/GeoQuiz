// Countries curated for kid-friendly recognition.
// Each has a 2-letter ISO code (used for flag + shape images),
// a short display name, and a small bag of cultural symbol emojis.
const COUNTRIES = [
  { code: "us", name: "United States",  symbols: ["\uD83D\uDDFD", "\uD83E\uDD85", "\uD83C\uDF54"] },
  { code: "jp", name: "Japan",          symbols: ["\uD83C\uDF63", "\uD83C\uDF38", "\uD83D\uDDFE"] },
  { code: "fr", name: "France",         symbols: ["\uD83D\uDDFC", "\uD83E\uDD50", "\uD83E\uDDC0"] },
  { code: "it", name: "Italy",          symbols: ["\uD83C\uDF55", "\uD83C\uDF5D", "\uD83C\uDFDB\uFE0F"] },
  { code: "gb", name: "United Kingdom", symbols: ["\uD83D\uDC51", "\u2614", "\uD83C\uDFA1"] },
  { code: "de", name: "Germany",        symbols: ["\uD83E\uDD68", "\uD83C\uDF7B", "\uD83D\uDE97"] },
  { code: "br", name: "Brazil",         symbols: ["\u26BD", "\uD83D\uDC12", "\uD83D\uDC83"] },
  { code: "mx", name: "Mexico",         symbols: ["\uD83C\uDF35", "\uD83C\uDF2E", "\uD83C\uDFB8"] },
  { code: "cn", name: "China",          symbols: ["\uD83D\uDC3C", "\uD83D\uDC09", "\uD83E\uDD62"] },
  { code: "in", name: "India",          symbols: ["\uD83D\uDC18", "\uD83D\uDD4C", "\uD83C\uDF5B"] },
  { code: "eg", name: "Egypt",          symbols: ["\uD83D\uDC2A", "\uD83C\uDFDC\uFE0F", "\uD83D\uDC08"] },
  { code: "au", name: "Australia",      symbols: ["\uD83E\uDD98", "\uD83D\uDC28", "\uD83C\uDFC4"] },
  { code: "ca", name: "Canada",         symbols: ["\uD83C\uDF41", "\uD83C\uDFD2", "\uD83E\uDD8C"] },
  { code: "es", name: "Spain",          symbols: ["\uD83D\uDC83", "\uD83D\uDC02", "\uD83E\uDD58"] },
  { code: "gr", name: "Greece",         symbols: ["\uD83C\uDFDB\uFE0F", "\uD83E\uDED2", "\uD83D\uDC19"] },
  { code: "ke", name: "Kenya",          symbols: ["\uD83E\uDD81", "\uD83E\uDD92", "\uD83D\uDC18"] },
  { code: "ar", name: "Argentina",      symbols: ["\u26BD", "\uD83E\uDD69", "\uD83D\uDC0E"] },
  { code: "th", name: "Thailand",       symbols: ["\uD83D\uDC18", "\uD83C\uDF5C", "\uD83D\uDDFF"] },
  { code: "za", name: "South Africa",   symbols: ["\uD83E\uDD81", "\uD83E\uDD93", "\uD83E\uDD92"] },
  { code: "ru", name: "Russia",         symbols: ["\uD83D\uDC3B", "\u2744\uFE0F", "\uD83C\uDFDB\uFE0F"] },
];

const FLAG_URL  = (code) => `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${code}.svg`;
const SHAPE_URL = (code) => `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code}/vector.svg`;
