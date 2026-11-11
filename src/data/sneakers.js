const img = (file) => `${process.env.PUBLIC_URL}/images/${file}`;

// demo catalogue - prices and stock are made up for the showcase
const sneakers = [
  {
    id: 1,
    name: "Air Jordan 1 High",
    brand: "Jordan",
    price: 230,
    image: img("jordan-1-high.jpg"),
    colorway: "Black / Red / White",
    swatches: ["#111111", "#c8102e", "#f5f5f5"],
    since: 1985,
    tagline: "The one that started it all.",
    description:
      "A high-top basketball icon turned street staple. Leather upper, bold colour blocking and the Wings logo on the collar.",
    soldOut: [7, 13],
    credit: { author: "Mathieu Landretti", license: "CC BY-SA 4.0", file: "Nike_Air_Jordan.jpg" }
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    brand: "Adidas",
    price: 180,
    image: img("ultraboost.jpg"),
    colorway: "Silver / Black / Red",
    swatches: ["#d9dde2", "#111111", "#e4002b"],
    since: 2015,
    tagline: "Energy return, every stride.",
    description: "Primeknit upper and a full-length Boost midsole built for long runs and longer days.",
    soldOut: [12]
  },
  {
    id: 3,
    name: "Nike Air Max 1",
    brand: "Nike",
    price: 150,
    image: img("air-max.jpg"),
    colorway: "White / Grey / Mint",
    swatches: ["#f4f4f4", "#a9b2ae", "#6f8f86"],
    since: 1987,
    tagline: "Visible air. Timeless shape.",
    description: "Stylish cushioning and breathable comfort with the window that put air on display.",
    soldOut: [8]
  },
  {
    id: 4,
    name: "Adidas NMD_R1",
    brand: "Adidas",
    price: 130,
    image: img("nmd-r1.jpg"),
    colorway: "Core Black / Red",
    swatches: ["#141414", "#2b3a55", "#d0021b"],
    since: 2015,
    tagline: "Built for the city.",
    description: "Urban comfort with a sock-like knit upper, Boost cushioning and the signature midsole plugs.",
    soldOut: [],
    credit: { author: "LeDroider", license: "CC0", file: "Adidas_NMD_R1.jpg" }
  },
  {
    id: 5,
    name: "Nike Blazer Mid",
    brand: "Nike",
    price: 120,
    image: img("blazer-mid.jpg"),
    colorway: "Navy Suede / White",
    swatches: ["#2c3e66", "#f4f1ea", "#e46a1f"],
    since: 1973,
    tagline: "Old-school court style.",
    description: "Retro-inspired mid-top for daily wear, with a soft suede upper and an oversized Swoosh.",
    soldOut: [10, 11],
    credit: { author: "Corvettec6r", license: "CC0", file: null }
  },
  {
    id: 6,
    name: "Air Jordan 4 Retro",
    brand: "Jordan",
    price: 260,
    image: img("jordan-4.jpg"),
    colorway: "White / Seafoam / Black",
    swatches: ["#f5f5f2", "#9cb59a", "#151515"],
    since: 1989,
    tagline: "Mesh, wings and attitude.",
    description:
      "A late-80s court classic with mesh side panels, moulded wings and visible Air in the heel.",
    soldOut: [9],
    credit: { author: "Jacek Halicki", license: "CC BY-SA 4.0", file: "2023_Buty_Nike_Air_Jordan.jpg" }
  },
  {
    id: 7,
    name: "Adidas Superstar",
    brand: "Adidas",
    price: 110,
    image: img("superstar.jpg"),
    colorway: "Cloud White / Core Black",
    swatches: ["#fafafa", "#111111", "#c9a24b"],
    since: 1969,
    tagline: "The shell toe. Still on top.",
    description: "Classic street icon with the rubber shell toe and three serrated stripes.",
    soldOut: [],
    credit: { author: "Yahoo! Blog", license: "CC BY 2.0", file: null }
  },
  {
    id: 8,
    name: "Nike Dunk Low",
    brand: "Nike",
    price: 140,
    image: img("dunk-low.jpg"),
    colorway: "Varsity Red / Grey",
    swatches: ["#b3122e", "#a7a9ac", "#ffffff"],
    since: 1985,
    tagline: "From the court to the skatepark.",
    description: "A low-cut college basketball classic with a padded collar and a grippy rubber cupsole.",
    soldOut: [12, 13],
    credit: { author: "William Mucci", license: "CC0", file: "Nike_dunk_low.jpg" }
  }
];

export const SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13];

export const formatPrice = (n) => `$${n.toFixed(0)}`;

export default sneakers;
