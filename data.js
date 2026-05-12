// Countries curated for kid-friendly recognition.
// Each has a 2-letter ISO code (used for flag + shape images),
// a short display name, a small bag of cultural symbol emojis,
// and a few short kid-language clues used by the Clues mode.
const COUNTRIES = [
  {
    code: "us", name: "United States",
    aliases: ["america", "the united states", "usa", "us", "u s", "u s a", "the us"],
    symbols: ["🗽", "🦅", "🍔"],
    clues: [
      "It has 50 states.",
      "The Statue of Liberty is here.",
      "People love hot dogs and baseball.",
    ],
  },
  {
    code: "jp", name: "Japan",
    aliases: ["nippon"],
    symbols: ["🍣", "🌸", "🗾"],
    clues: [
      "It is a country made of islands in Asia.",
      "Sushi was invented here.",
      "Pretty pink cherry blossoms bloom in spring.",
    ],
  },
  {
    code: "fr", name: "France",
    aliases: [],
    symbols: ["🗼", "🥐", "🧀"],
    clues: [
      "The Eiffel Tower is in its capital, Paris.",
      "People eat croissants for breakfast.",
      "People here speak French.",
    ],
  },
  {
    code: "it", name: "Italy",
    aliases: ["italia"],
    symbols: ["🍕", "🍝", "🏛️"],
    clues: [
      "On a map it looks like a boot!",
      "Pizza and pasta come from here.",
      "It has an old building called the Colosseum.",
    ],
  },
  {
    code: "gb", name: "United Kingdom",
    aliases: ["uk", "u k", "britain", "great britain", "england", "the uk"],
    symbols: ["👑", "☔", "🎡"],
    clues: [
      "It has a king who lives in a big palace.",
      "People here drink lots of tea.",
      "Big Ben is a famous clock tower in London.",
    ],
  },
  {
    code: "de", name: "Germany",
    aliases: ["deutschland"],
    symbols: ["🥨", "🍻", "🚗"],
    clues: [
      "Famous for sausages and twisty pretzels.",
      "Lots of cars are built here.",
      "People here speak German.",
    ],
  },
  {
    code: "br", name: "Brazil",
    aliases: ["brasil"],
    symbols: ["⚽", "🐒", "💃"],
    clues: [
      "The biggest country in South America.",
      "The Amazon rainforest is here.",
      "People love soccer and samba dancing.",
    ],
  },
  {
    code: "mx", name: "Mexico",
    aliases: ["méxico"],
    symbols: ["🌵", "🌮", "🎸"],
    clues: [
      "Tacos and burritos come from here.",
      "Ancient pyramids were built long ago.",
      "People here speak Spanish.",
    ],
  },
  {
    code: "cn", name: "China",
    aliases: [],
    symbols: ["🐼", "🐉", "🥢"],
    clues: [
      "Has the Great Wall, a super long wall.",
      "Cute giant pandas live here.",
      "More people live here than anywhere else.",
    ],
  },
  {
    code: "in", name: "India",
    aliases: [],
    symbols: ["🐘", "🕌", "🍛"],
    clues: [
      "The Taj Mahal is a famous white building here.",
      "Many people love yummy spicy curry.",
      "Elephants and tigers live in the wild.",
    ],
  },
  {
    code: "eg", name: "Egypt",
    aliases: [],
    symbols: ["🐪", "🏜️", "🐈"],
    clues: [
      "Has giant pyramids in the desert.",
      "The long Nile river flows through it.",
      "Camels can walk across the sandy desert.",
    ],
  },
  {
    code: "au", name: "Australia",
    aliases: ["oz", "straya"],
    symbols: ["🦘", "🐨", "🏄"],
    clues: [
      "It is a whole country and a continent!",
      "Hopping kangaroos and koalas live here.",
      "Has a giant coral reef called the Great Barrier Reef.",
    ],
  },
  {
    code: "ca", name: "Canada",
    aliases: [],
    symbols: ["🍁", "🏒", "🦌"],
    clues: [
      "A very big and snowy country.",
      "Famous for sweet maple syrup.",
      "Has a red maple leaf on its flag.",
    ],
  },
  {
    code: "es", name: "Spain",
    aliases: ["españa"],
    symbols: ["💃", "🐂", "🥘"],
    clues: [
      "Famous for flamenco dancing.",
      "People eat a yummy rice dish called paella.",
      "People here speak Spanish.",
    ],
  },
  {
    code: "gr", name: "Greece",
    aliases: [],
    symbols: ["🏛️", "🫒", "🐙"],
    clues: [
      "Has white houses by sparkly blue water.",
      "Home of old stories about gods and heroes.",
      "Famous for olives and feta cheese.",
    ],
  },
  {
    code: "ke", name: "Kenya",
    aliases: [],
    symbols: ["🦁", "🦒", "🐘"],
    clues: [
      "Lions and giraffes live on its grasslands.",
      "Lots of fast runners come from here.",
      "It is in East Africa.",
    ],
  },
  {
    code: "ar", name: "Argentina",
    aliases: [],
    symbols: ["⚽", "🥩", "🐎"],
    clues: [
      "Famous for tango dancing.",
      "People here eat lots of tasty beef.",
      "In South America, next to Brazil.",
    ],
  },
  {
    code: "th", name: "Thailand",
    aliases: [],
    symbols: ["🐘", "🍜", "🗿"],
    clues: [
      "Famous for elephants and golden temples.",
      "Yummy noodles called pad Thai come from here.",
      "It is in Southeast Asia.",
    ],
  },
  {
    code: "za", name: "South Africa",
    aliases: ["south-africa"],
    symbols: ["🦁", "🦓", "🦒"],
    clues: [
      "It is at the bottom of Africa.",
      "Lions, zebras, and giraffes live here.",
      "It has 11 official languages!",
    ],
  },
  {
    code: "ru", name: "Russia",
    aliases: [],
    symbols: ["🐻", "❄️", "🏛️"],
    clues: [
      "The biggest country in the whole world!",
      "Very cold with lots of snow.",
      "Famous for nesting matryoshka dolls.",
    ],
  },
];

const FLAG_URL  = (code) => `https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${code}.svg`;
const SHAPE_URL = (code) => `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code}/vector.svg`;
