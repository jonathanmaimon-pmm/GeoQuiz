// Animals topic — kid-recognizable but not "lion/dog/cat" obvious.
// Mix of trendy lesser-known animals (Capybara, Axolotl, Quokka, Pangolin,
// Narwhal…) and recognizable favorites across mammals, birds, reptiles,
// amphibians, fish, cephalopods, and insects.
//
// Each entry:
//   id, name, emoji (closest match, used in Babies/Clue choice cards),
//   wiki    — Wikipedia article title used to fetch a real photo at runtime,
//   group   — used by distractor logic to prefer same-group answers,
//   habitat — matched against HABITATS in Habitat mode,
//   aliases — extra phrases the voice matcher accepts,
//   baby    — used by Babies mode,
//   clues   — 3 kid-friendly facts for Clue mode.
const ANIMALS = [
  // --- Mammals ---
  {
    id: "capybara", name: "Capybara", emoji: "🐹",
    wiki: "Capybara", group: "mammal", habitat: "Wetland",
    aliases: ["capybaras"],
    baby: "Pup",
    clues: [
      "I am the world's biggest rodent — like a giant guinea pig.",
      "I love swimming in rivers and lakes in South America.",
      "I am so chill that other animals love sitting on my back.",
    ],
  },
  {
    id: "sloth", name: "Sloth", emoji: "🦥",
    wiki: "Sloth", group: "mammal", habitat: "Rainforest",
    aliases: ["sloths"],
    baby: "Cub",
    clues: [
      "I am the slowest animal in the rainforest.",
      "I spend most of my life hanging upside down from trees.",
      "It can take me a whole month to digest one leaf!",
    ],
  },
  {
    id: "red_panda", name: "Red Panda", emoji: "🐼",
    wiki: "Red_panda", group: "mammal", habitat: "Forest",
    aliases: ["red pandas", "firefox"],
    baby: "Cub",
    clues: [
      "I have a fluffy striped tail and a reddish coat.",
      "I live in the mountain forests of Asia.",
      "I love eating bamboo, but I am much smaller than a giant panda.",
    ],
  },
  {
    id: "narwhal", name: "Narwhal", emoji: "🐳",
    wiki: "Narwhal", group: "mammal", habitat: "Polar",
    aliases: ["narwhals", "unicorn whale"],
    baby: "Calf",
    clues: [
      "People call me the unicorn of the sea.",
      "I have a long pointy tusk growing from my head.",
      "I live in the icy cold waters of the Arctic.",
    ],
  },
  {
    id: "sea_otter", name: "Sea Otter", emoji: "🦦",
    wiki: "Sea_otter", group: "mammal", habitat: "Ocean",
    aliases: ["sea otters", "otter", "otters"],
    baby: "Pup",
    clues: [
      "I float on my back and crack shells open on my belly.",
      "I hold paws with my friends so we don't drift apart while we sleep.",
      "I have the thickest fur of any animal in the world.",
    ],
  },
  {
    id: "hedgehog", name: "Hedgehog", emoji: "🦔",
    wiki: "Hedgehog", group: "mammal", habitat: "Garden",
    aliases: ["hedgehogs", "hedgie"],
    baby: "Hoglet",
    clues: [
      "I am covered in sharp little spikes called quills.",
      "I roll into a tight prickly ball when I feel scared.",
      "At night I snuffle around looking for bugs and worms.",
    ],
  },
  {
    id: "platypus", name: "Platypus", emoji: "🦫",
    wiki: "Platypus", group: "mammal", habitat: "Wetland",
    aliases: ["platypuses", "platypi"],
    baby: "Puggle",
    clues: [
      "I have a duck's bill, a beaver's tail, and otter feet.",
      "I am a mammal — but I lay eggs!",
      "I live in rivers and creeks in Australia.",
    ],
  },
  {
    id: "quokka", name: "Quokka", emoji: "🐰",
    wiki: "Quokka", group: "mammal", habitat: "Forest",
    aliases: ["quokkas"],
    baby: "Joey",
    clues: [
      "People call me the happiest animal — I always look like I'm smiling!",
      "I hop on two legs like a tiny kangaroo.",
      "I live on islands in Australia.",
    ],
  },
  {
    id: "pangolin", name: "Pangolin", emoji: "🦔",
    wiki: "Pangolin", group: "mammal", habitat: "Forest",
    aliases: ["pangolins"],
    baby: "Pangopup",
    clues: [
      "My body is covered in scales, like a walking pinecone.",
      "I roll into a tight scaly ball when I feel scared.",
      "I have a long sticky tongue that slurps up ants.",
    ],
  },

  // --- Birds ---
  {
    id: "penguin", name: "Penguin", emoji: "🐧",
    wiki: "Penguin", group: "bird", habitat: "Polar",
    aliases: ["penguins"],
    baby: "Chick",
    clues: [
      "I waddle on the ice in my black-and-white tuxedo.",
      "I can't fly, but I am super fast at swimming.",
      "I live where it is very, very cold.",
    ],
  },
  {
    id: "toucan", name: "Toucan", emoji: "🦜",
    wiki: "Toucan", group: "bird", habitat: "Rainforest",
    aliases: ["toucans"],
    baby: "Chick",
    clues: [
      "I have a giant colorful beak almost as big as my body.",
      "I live high in the rainforest and love to eat fruit.",
      "You might see me on a cereal box!",
    ],
  },
  {
    id: "flamingo", name: "Flamingo", emoji: "🦩",
    wiki: "Flamingo", group: "bird", habitat: "Wetland",
    aliases: ["flamingos", "flamingoes"],
    baby: "Chick",
    clues: [
      "I am bright pink because of the tiny shrimp I eat.",
      "I can stand on just one leg for a long, long time.",
      "I live in big groups near salty lakes.",
    ],
  },
  {
    id: "hummingbird", name: "Hummingbird", emoji: "🐦",
    wiki: "Hummingbird", group: "bird", habitat: "Garden",
    aliases: ["hummingbirds", "humming bird"],
    baby: "Chick",
    clues: [
      "I am the tiniest bird in the world.",
      "I can flap my wings 50 times in just one second!",
      "I love drinking sweet nectar from flowers.",
    ],
  },

  // --- Reptiles ---
  {
    id: "chameleon", name: "Chameleon", emoji: "🦎",
    wiki: "Chameleon", group: "reptile", habitat: "Rainforest",
    aliases: ["chameleons"],
    baby: "Hatchling",
    clues: [
      "I can change my color to match where I am sitting.",
      "My sticky tongue is longer than my whole body.",
      "My eyes can look in two different directions at once!",
    ],
  },
  {
    id: "tortoise", name: "Tortoise", emoji: "🐢",
    wiki: "Tortoise", group: "reptile", habitat: "Desert",
    aliases: ["tortoises", "land turtle"],
    baby: "Hatchling",
    clues: [
      "I carry my hard shell home on my back wherever I go.",
      "I can live longer than your grandma and grandpa!",
      "I walk slowly on big sturdy legs.",
    ],
  },

  // --- Amphibians ---
  {
    id: "axolotl", name: "Axolotl", emoji: "🦎",
    wiki: "Axolotl", group: "amphibian", habitat: "Wetland",
    aliases: ["axolotls", "axie"],
    baby: "Larva",
    clues: [
      "I am a salamander that stays a baby my whole life.",
      "I can grow back my arms and legs if I lose them.",
      "I live in lakes in Mexico.",
    ],
  },

  // --- Cephalopod / Fish ---
  {
    id: "octopus", name: "Octopus", emoji: "🐙",
    wiki: "Octopus", group: "ocean", habitat: "Ocean",
    aliases: ["octopuses", "octopi"],
    baby: "Larva",
    clues: [
      "I have eight wiggly arms covered in suckers.",
      "I can squirt black ink to escape from danger.",
      "I am one of the smartest creatures in the ocean.",
    ],
  },
  {
    id: "seahorse", name: "Seahorse", emoji: "🐠",
    wiki: "Seahorse", group: "ocean", habitat: "Ocean",
    aliases: ["seahorses", "sea horse"],
    baby: "Fry",
    clues: [
      "I look like a tiny horse swimming in the sea.",
      "The daddies in my family carry the babies, not the mommies!",
      "I curl my tail around seaweed to hold on tight.",
    ],
  },

  // --- Insects ---
  {
    id: "bee", name: "Bee", emoji: "🐝",
    wiki: "Honey_bee", group: "insect", habitat: "Garden",
    aliases: ["bees", "honeybee"],
    baby: "Larva",
    clues: [
      "I make sweet honey for everyone to enjoy.",
      "I have black and yellow stripes.",
      "I do a wiggle dance to tell my friends where flowers are.",
    ],
  },
  {
    id: "butterfly", name: "Butterfly", emoji: "🦋",
    wiki: "Butterfly", group: "insect", habitat: "Garden",
    aliases: ["butterflies"],
    baby: "Caterpillar",
    clues: [
      "I started life as a wiggly caterpillar inside a cocoon.",
      "I have big colorful wings covered in tiny scales.",
      "I sip sweet nectar through a long curly straw-tongue.",
    ],
  },
];

// Habitat answer choices used by the Habitat mode.
const HABITATS = [
  { name: "Rainforest", emoji: "🌴", aliases: ["the rainforest", "jungle"] },
  { name: "Ocean",      emoji: "🌊", aliases: ["the ocean", "sea", "the sea"] },
  { name: "Polar",      emoji: "❄️", aliases: ["arctic", "antarctica", "the arctic", "polar regions", "cold places"] },
  { name: "Wetland",    emoji: "🪷", aliases: ["wetlands", "pond", "river", "lake", "swamp"] },
  { name: "Forest",     emoji: "🌲", aliases: ["the forest", "woods", "the woods"] },
  { name: "Garden",     emoji: "🌷", aliases: ["gardens", "the garden", "backyard"] },
  { name: "Desert",     emoji: "🏜️", aliases: ["the desert", "deserts"] },
];
