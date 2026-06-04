// Kid-friendly animals for the Animals topic, chosen for variety across
// groups: mammals (savanna, forest, ocean, marsupial, pets), birds,
// reptiles, amphibians, fish, and insects.
//
// Each entry: id, display name, big emoji used as the visual, aliases for
// voice match, the sound the animal makes, its baby's name, and three
// short clues used in Clues mode.
const ANIMALS = [
  // --- Mammals ---
  {
    id: "lion", name: "Lion", emoji: "🦁",
    aliases: ["lions", "the lion"],
    sound: "Roarrr!", baby: "Cub",
    clues: [
      "I am called the king of the jungle.",
      "I live on the African savanna.",
      "My loud roar can be heard from far away.",
    ],
  },
  {
    id: "elephant", name: "Elephant", emoji: "🐘",
    aliases: ["elephants"],
    sound: "Trumpet!", baby: "Calf",
    clues: [
      "I have a long trunk to pick up leaves.",
      "I am the biggest animal on land.",
      "I love taking water baths.",
    ],
  },
  {
    id: "giraffe", name: "Giraffe", emoji: "🦒",
    aliases: ["giraffes"],
    sound: "Hummm!", baby: "Calf",
    clues: [
      "I am the tallest animal in the world.",
      "My neck is super long.",
      "I have spots all over my body.",
    ],
  },
  {
    id: "monkey", name: "Monkey", emoji: "🐒",
    aliases: ["monkeys", "chimp", "chimpanzee"],
    sound: "Ooh ooh ahh!", baby: "Infant",
    clues: [
      "I swing from tree to tree.",
      "I love eating bananas.",
      "I am playful and very clever.",
    ],
  },
  {
    id: "kangaroo", name: "Kangaroo", emoji: "🦘",
    aliases: ["kangaroos", "roo"],
    sound: "Chortle!", baby: "Joey",
    clues: [
      "I hop on my strong back legs.",
      "I carry my baby in a pouch.",
      "I live in Australia.",
    ],
  },
  {
    id: "bear", name: "Bear", emoji: "🐻",
    aliases: ["bears"],
    sound: "Grrrr!", baby: "Cub",
    clues: [
      "I love eating honey.",
      "I sleep all winter long.",
      "I live deep in the forest.",
    ],
  },
  {
    id: "whale", name: "Whale", emoji: "🐳",
    aliases: ["whales"],
    sound: "Whoooo!", baby: "Calf",
    clues: [
      "I am the biggest animal in the ocean.",
      "I spray water from a hole on my back.",
      "I sing long songs in the deep sea.",
    ],
  },
  {
    id: "dolphin", name: "Dolphin", emoji: "🐬",
    aliases: ["dolphins"],
    sound: "Eee eee!", baby: "Calf",
    clues: [
      "I swim in the ocean and love to jump.",
      "I am very smart and friendly.",
      "I talk to my friends with clicks and whistles.",
    ],
  },
  {
    id: "dog", name: "Dog", emoji: "🐶",
    aliases: ["dogs", "puppy", "doggy"],
    sound: "Woof woof!", baby: "Puppy",
    clues: [
      "I am a person's best friend.",
      "I love to wag my tail.",
      "I bark to say hello.",
    ],
  },
  {
    id: "cat", name: "Cat", emoji: "🐱",
    aliases: ["cats", "kitty"],
    sound: "Meow!", baby: "Kitten",
    clues: [
      "I purr when I am happy.",
      "I love chasing little balls of yarn.",
      "I have soft paws and sharp claws.",
    ],
  },
  {
    id: "cow", name: "Cow", emoji: "🐄",
    aliases: ["cows"],
    sound: "Moooo!", baby: "Calf",
    clues: [
      "I live on a farm and eat grass.",
      "I give people yummy milk.",
      "I have spots and four legs.",
    ],
  },

  // --- Birds ---
  {
    id: "penguin", name: "Penguin", emoji: "🐧",
    aliases: ["penguins"],
    sound: "Honk honk!", baby: "Chick",
    clues: [
      "I waddle on the ice.",
      "I cannot fly but I love to swim.",
      "I live where it is super cold.",
    ],
  },
  {
    id: "owl", name: "Owl", emoji: "🦉",
    aliases: ["owls"],
    sound: "Hoot hoot!", baby: "Owlet",
    clues: [
      "I am awake at night while you sleep.",
      "I can turn my head almost all the way around.",
      "I have big round eyes.",
    ],
  },
  {
    id: "eagle", name: "Eagle", emoji: "🦅",
    aliases: ["eagles"],
    sound: "Screech!", baby: "Eaglet",
    clues: [
      "I have sharp eyes and big strong wings.",
      "I build my nest high up on cliffs.",
      "I can swoop down very fast.",
    ],
  },
  {
    id: "duck", name: "Duck", emoji: "🦆",
    aliases: ["ducks", "ducky"],
    sound: "Quack quack!", baby: "Duckling",
    clues: [
      "I swim on a pond.",
      "I have webbed feet for paddling.",
      "My feathers stay dry even when wet.",
    ],
  },

  // --- Reptiles ---
  {
    id: "snake", name: "Snake", emoji: "🐍",
    aliases: ["snakes"],
    sound: "Hisssss!", baby: "Hatchling",
    clues: [
      "I slither on the ground without legs.",
      "I flick my tongue to smell.",
      "Some of us live in the desert.",
    ],
  },
  {
    id: "turtle", name: "Turtle", emoji: "🐢",
    aliases: ["turtles", "tortoise"],
    sound: "(I am very quiet!)", baby: "Hatchling",
    clues: [
      "I carry my home on my back.",
      "I move very, very slowly.",
      "Some of us live in the ocean.",
    ],
  },

  // --- Amphibians ---
  {
    id: "frog", name: "Frog", emoji: "🐸",
    aliases: ["frogs", "froggy"],
    sound: "Ribbit ribbit!", baby: "Tadpole",
    clues: [
      "I hop on lily pads.",
      "I have a long sticky tongue to catch bugs.",
      "I love living near water.",
    ],
  },

  // --- Fish ---
  {
    id: "shark", name: "Shark", emoji: "🦈",
    aliases: ["sharks"],
    sound: "(I am very quiet!)", baby: "Pup",
    clues: [
      "I have many sharp teeth.",
      "I swim in the deep blue ocean.",
      "I never stop swimming.",
    ],
  },

  // --- Insects ---
  {
    id: "bee", name: "Bee", emoji: "🐝",
    aliases: ["bees", "honeybee"],
    sound: "Buzzzz!", baby: "Larva",
    clues: [
      "I make sweet honey.",
      "I have black and yellow stripes.",
      "I fly from flower to flower.",
    ],
  },
  {
    id: "butterfly", name: "Butterfly", emoji: "🦋",
    aliases: ["butterflies"],
    sound: "(I flap my wings quietly!)", baby: "Caterpillar",
    clues: [
      "I started life as a wiggly caterpillar.",
      "I have big colorful wings.",
      "I sip nectar from flowers.",
    ],
  },
];
