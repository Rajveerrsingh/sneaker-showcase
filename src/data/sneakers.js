const asset = (path) => `${process.env.PUBLIC_URL}/images/${path}`;
const commonsPage = (file) => `https://commons.wikimedia.org/wiki/File:${file}`;

// Demo catalogue. Prices and stock are sample data; colourway names are descriptive.
// Release years are only listed where they are well documented.
const catalogue = [
  {
    slug: "cortez",
    name: "Nike Cortez",
    brand: "Nike",
    price: 110,
    year: 1972,
    colorway: "White / Varsity Red / Blue",
    swatches: ["#f4f1ea", "#d3202e", "#6aa6e8"],
    tagline: "Nike's first track icon.",
    description: "Smooth leather, a big red Swoosh and the classic blue wedge midsole on a serrated rubber outsole.",
    soldOut: [8],
    credit: { author: "LeDroider", license: "CC0", file: "Nike_Cortez.jpg" }
  },
  {
    slug: "airmax90",
    name: "Nike Air Max 90",
    brand: "Nike",
    price: 170,
    year: 1990,
    colorway: "Triple Black",
    swatches: ["#141414", "#2a2a2a", "#3c3c3c"],
    tagline: "Visible Air, blacked out.",
    description: "The 1990 runner with its famous Air window, waffle outsole and layered upper, all in black.",
    soldOut: [11, 12],
    credit: { author: "Mfagoaguna1", license: "CC BY-SA 4.0", file: "Nike_Air_Max_90.jpg" }
  },
  {
    slug: "dunk-panda",
    name: "Nike Dunk Low",
    brand: "Nike",
    price: 140,
    year: 1985,
    colorway: "White / Black",
    swatches: ["#f5f5f5", "#121212", "#d9d9d9"],
    tagline: "Two tones, zero rules.",
    description:
      "A low-cut college basketball classic in the black and white colour blocking everyone calls the Panda.",
    soldOut: [10, 10.5],
    credit: { author: "LeDroider", license: "CC0", file: "Panda_Nike_Dunk.jpg" }
  },
  {
    slug: "sl72",
    name: "Adidas SL 72 OG",
    brand: "Adidas",
    price: 120,
    year: 1972,
    colorway: "Solar Red / White",
    swatches: ["#f2513f", "#f6f6f6", "#e8a7b0"],
    tagline: "Light, fast and a little retro.",
    description: "A slim nylon and suede runner from the early 70s, back in a bright red with crisp white stripes.",
    soldOut: [],
    credit: { author: "LeDroider", license: "CC0", file: "Adidas_SL_72_OG.jpg" }
  },
  {
    slug: "puma-suede",
    name: "Puma Suede Classic",
    brand: "Puma",
    price: 90,
    year: 1968,
    colorway: "Black / White",
    swatches: ["#141414", "#f2f2f2", "#c9a646"],
    tagline: "Suede since '68.",
    description:
      "A soft suede upper, the Formstrip on the side and a low rubber cupsole. A b-boy and street favourite.",
    soldOut: [],
    credit: { author: "LeDroider", license: "CC0", file: "Puma_Suede.jpg" }
  },
  {
    slug: "gel1130",
    name: "Asics Gel-1130",
    brand: "Asics",
    price: 140,
    year: null,
    colorway: "White / Gold / Black",
    swatches: ["#f3f1ea", "#c8a13a", "#1b1b1b"],
    tagline: "Late-2000s tech, everyday comfort.",
    description: "Mesh and synthetic overlays, GEL cushioning in the heel and a metallic gold accent.",
    soldOut: [13],
    credit: { author: "LeDroider", license: "CC0", file: "Asics_Gel-1130.jpg" }
  },
  {
    slug: "gelnyc2",
    name: "Asics Gel-NYC 2",
    brand: "Asics",
    price: 150,
    year: null,
    colorway: "Grey / White / Blue",
    swatches: ["#b9bcc2", "#f2f2f0", "#2f4fb5"],
    tagline: "Archive running details, city ready.",
    description:
      "Layered mesh and synthetic overlays in cool greys, with cobalt GEL details showing through the midsole.",
    soldOut: [7],
    credit: { author: "LeDroider", license: "CC0", file: "Asics_Gel-NYC_2.jpg" }
  }
];

const sneakers = catalogue.map((item, index) => ({
  ...item,
  id: index + 1,
  image: asset(`${item.slug}.webp`),
  imageSmall: asset(`${item.slug}-640.webp`),
  photo: asset(`photo/${item.slug}.jpg`),
  credit: { ...item.credit, source: "Wikimedia Commons", url: commonsPage(item.credit.file) }
}));

export const BRANDS = ["All", ...new Set(sneakers.map((s) => s.brand))];

export const SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13];

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name" }
];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const formatPrice = (amount) => currency.format(amount);

export const getSneaker = (id) => sneakers.find((s) => s.id === Number(id));

export default sneakers;
