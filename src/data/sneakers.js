const cut = (k) => `${process.env.PUBLIC_URL}/images/${k}.webp`;
const photo = (k) => `${process.env.PUBLIC_URL}/images/photo/${k}.jpg`;
const commons = (file) => `https://commons.wikimedia.org/wiki/File:${file}`;

// demo catalogue: prices and stock are sample data for the showcase
const list = [
  {
    key: "aj1",
    name: "Air Jordan 1 High",
    short: "AJ1",
    brand: "Jordan",
    price: 230,
    colorway: "White / Varsity Red / Black",
    swatches: ["#f4f1ea", "#b3121d", "#141414"],
    glow: "#e0262f",
    since: 1985,
    tagline: "The one that started it all.",
    description:
      "A high-top basketball icon turned street staple, with a leather upper, bold colour blocking and the Wings logo on the collar.",
    soldOut: [7, 13],
    credit: { author: "Osyffar", license: "CC0", file: "Nike_Air_Jordan_I.jpg" }
  },
  {
    key: "nb1906r",
    name: "New Balance 1906R",
    short: "1906R",
    brand: "New Balance",
    price: 200,
    colorway: "Silver / Black / Gold",
    swatches: ["#c9ccd1", "#151515", "#c2a25a"],
    glow: "#b9c2cf",
    since: null,
    tagline: "Y2K tech runner, rebuilt.",
    description:
      "Layered mesh and metallic overlays on a cushioned runner sole, a modern take on early-2000s performance design.",
    soldOut: [9],
    credit: { author: "LeDroider", license: "CC0", file: "New_Balance_1906R.jpg" }
  },
  {
    key: "dunk-panda",
    name: "Nike Dunk Low",
    short: "DUNK",
    brand: "Nike",
    price: 140,
    colorway: "White / Black",
    swatches: ["#f5f5f5", "#121212", "#d9d9d9"],
    glow: "#9aa3b5",
    since: 1985,
    tagline: "Two tones. Zero rules.",
    description:
      "A low-cut college basketball classic in the black and white colour blocking everyone calls the Panda.",
    soldOut: [10, 10.5],
    credit: { author: "LeDroider", license: "CC0", file: "Panda_Nike_Dunk.jpg" }
  },
  {
    key: "gazelle-indoor",
    name: "Adidas Gazelle Indoor",
    short: "GAZELLE",
    brand: "Adidas",
    price: 150,
    colorway: "Bright Blue / White / Gum",
    swatches: ["#1f6fd1", "#f2f2f2", "#c99a5b"],
    glow: "#2f7bff",
    since: 1966,
    tagline: "Terrace style on a gum sole.",
    description: "Soft suede, serrated three stripes and a translucent gum outsole inspired by indoor training shoes.",
    soldOut: [],
    credit: { author: "LeDroider", license: "CC0", file: "Adidas_Gazelle_Indoor.jpg" }
  },
  {
    key: "aj4",
    name: "Air Jordan 4 Retro",
    short: "AJ4",
    brand: "Jordan",
    price: 260,
    colorway: "White / Cement Grey / Black",
    swatches: ["#f3f3f1", "#9a9a9a", "#151515"],
    glow: "#8f98a6",
    since: 1989,
    tagline: "Mesh, wings and attitude.",
    description:
      "A late-80s court classic with mesh side panels, moulded wings, speckled cement details and visible Air in the heel.",
    soldOut: [9],
    credit: { author: "Osyffar", license: "CC0", file: "Nike_Air_Jordan_IV.jpg" }
  },
  {
    key: "vomero5",
    name: "Nike Zoom Vomero 5",
    short: "VOMERO",
    brand: "Nike",
    price: 180,
    colorway: "University Red / Silver",
    swatches: ["#d3172b", "#c0c4ca", "#f4f4f4"],
    glow: "#ff2a3d",
    since: null,
    tagline: "A runner built for the street.",
    description: "Breathable mesh, layered overlays and Zoom Air cushioning in a loud all-red colourway.",
    soldOut: [12],
    credit: { author: "LeDroider", license: "CC0", file: "Vomero_5.jpg" }
  },
  {
    key: "cortez",
    name: "Nike Cortez",
    short: "CORTEZ",
    brand: "Nike",
    price: 110,
    colorway: "White / Varsity Red / Blue",
    swatches: ["#f6f4ef", "#d3202e", "#6aa6e8"],
    glow: "#5aa0ff",
    since: 1972,
    tagline: "Nike's first track icon.",
    description: "Smooth leather, a big red Swoosh and the classic blue wedge midsole with a herringbone outsole.",
    soldOut: [8],
    credit: { author: "LeDroider", license: "CC0", file: "Nike_Cortez.jpg" }
  },
  {
    key: "sl72",
    name: "Adidas SL 72 OG",
    short: "SL 72",
    brand: "Adidas",
    price: 120,
    colorway: "Solar Red / White",
    swatches: ["#f2513f", "#f6f6f6", "#e8a7b0"],
    glow: "#ff5a3c",
    since: 1972,
    tagline: "Light, fast and a little retro.",
    description: "A slim nylon and suede runner from the early 70s, back in a bright red with crisp white stripes.",
    soldOut: [],
    credit: { author: "LeDroider", license: "CC0", file: "Adidas_SL_72_OG.jpg" }
  },
  {
    key: "airmax90",
    name: "Nike Air Max 90",
    short: "AM90",
    brand: "Nike",
    price: 170,
    colorway: "Triple Black",
    swatches: ["#141414", "#2a2a2a", "#3c3c3c"],
    glow: "#7a5cff",
    since: 1990,
    tagline: "Visible Air, blacked out.",
    description: "The 1990 runner with its famous Air window, waffle outsole and layered upper, all in black.",
    soldOut: [11, 12],
    credit: { author: "Mfagoaguna1", license: "CC BY-SA 4.0", file: "Nike_Air_Max_90.jpg" }
  },
  {
    key: "nb550",
    name: "New Balance 550",
    short: "550",
    brand: "New Balance",
    price: 130,
    colorway: "White / Burgundy",
    swatches: ["#f4f1ea", "#7b1e2b", "#d8d4cc"],
    glow: "#b3364a",
    since: 1989,
    tagline: "Back from the hardwood.",
    description: "A late-80s basketball shoe with a leather upper, perforated toe and a chunky cupsole.",
    soldOut: [7],
    credit: { author: "LeDroider", license: "CC0", file: "New_Balance_550.jpg" }
  },
  {
    key: "gel1130",
    name: "Asics Gel-1130",
    short: "1130",
    brand: "Asics",
    price: 140,
    colorway: "White / Gold / Black",
    swatches: ["#f3f1ea", "#c8a13a", "#1b1b1b"],
    glow: "#e0b23c",
    since: null,
    tagline: "Late-2000s tech, everyday comfort.",
    description: "Mesh and synthetic overlays, GEL cushioning in the heel and a metallic gold accent.",
    soldOut: [13],
    credit: { author: "LeDroider", license: "CC0", file: "Asics_Gel-1130.jpg" }
  },
  {
    key: "puma-suede",
    name: "Puma Suede Classic",
    short: "SUEDE",
    brand: "Puma",
    price: 90,
    colorway: "Black / White",
    swatches: ["#141414", "#f2f2f2", "#c9a646"],
    glow: "#d9b44a",
    since: 1968,
    tagline: "Suede since '68.",
    description: "A soft suede upper, the Formstrip on the side and a low rubber sole, a b-boy and street favourite.",
    soldOut: [],
    credit: { author: "LeDroider", license: "CC0", file: "Puma_Suede.jpg" }
  }
];

const sneakers = list.map((s, i) => ({
  ...s,
  id: i + 1,
  image: cut(s.key),
  photo: photo(s.key),
  credit: { ...s.credit, source: "Wikimedia Commons", url: commons(s.credit.file) }
}));

export const SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13];

export const formatPrice = (n) => `$${n.toFixed(0)}`;

export const featuredIds = [1, 6, 4];

export default sneakers;
