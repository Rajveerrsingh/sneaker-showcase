// src/data/sneakers.js
const img = (file) => `${process.env.PUBLIC_URL}/images/${file}`;

const sneakers = [
  {
    id: 1,
    name: "Nike Air Max",
    brand: "Nike",
    price: "$150",
    image: img("air-max.jpg"),
    description: "Stylish cushioning and breathable comfort."
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    brand: "Adidas",
    price: "$180",
    image: img("ultraboost.jpg"),
    description: "Primeknit upper and energy-return boost midsole."
  },
  {
    id: 3,
    name: "Nike Blazer Mid",
    brand: "Nike",
    price: "$120",
    image: img("blazer-mid.jpg"),
    description: "Retro-inspired mid-top for daily wear."
  },
  {
    id: 4,
    name: "Adidas Superstar",
    brand: "Adidas",
    price: "$110",
    image: img("superstar.jpg"),
    description: "Classic street icon with shell-toe style."
  },
  {
    id: 5,
    name: "Nike Revolution",
    brand: "Nike",
    price: "$140",
    image: img("revolution.jpg"),
    description: "Minimalist design for lightweight running."
  },
  {
    id: 6,
    name: "Adidas NMD_R1",
    brand: "Adidas",
    price: "$130",
    image: img("nmd-r1.jpg"),
    description: "Urban comfort with a future-forward look."
  }
];

export default sneakers;
