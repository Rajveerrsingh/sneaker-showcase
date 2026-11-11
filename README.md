# Sole Archive · Sneaker Showcase

A sneaker storefront built with React. Browse a curated set of Nike, Jordan and Adidas classics, filter and search the collection, open a product page, pick a size, and keep a bag and a saved list that stay put between visits.

**Live demo:** https://rajveerrsingh.github.io/sneaker-showcase/

![Sole Archive home page](docs/preview.jpg)

---

## Features

- **Editorial landing page** with large type, a featured drop and a scrolling ticker of every pair
- **Shop the collection**: brand filter chips, live search by name or colourway, and sorting by price, name or year
- **Product pages** with a hover zoom image, colourway swatches, a size picker (sold-out sizes disabled), photo credit, previous / next links and related sneakers
- **Bag and favourites** in a slide-out drawer, with quantities and a subtotal, saved to `localStorage`
- **Dark and light themes** that follow your system setting and remember your choice
- **Smooth motion**: page transitions, scroll reveals, card hover lift and image zoom (turned off for users who prefer reduced motion)
- **Empty states** for no search results, an empty bag, no saved pairs and unknown pages
- **Responsive and accessible**: works from 360px phones up, keyboard friendly, skip link, visible focus rings, alt text on every image, ARIA labels on icon buttons, and focus kept inside the drawer while it is open

Prices and stock are demo data. Nothing is for sale.

## Tech stack

- **React 19** with hooks and Context for the bag, favourites and theme
- **React Router 7** (`HashRouter`, so deep links work on GitHub Pages)
- **Plain CSS** with custom properties for theming, no UI framework
- **IntersectionObserver** for scroll reveal animations
- **Google Fonts**: Space Grotesk and Inter
- **GitHub Pages** for hosting

## Project structure

```
src/
  components/   Navbar, Footer, Drawer, Toast, SneakerCard, SneakerImage, Icons
  pages/        Home, Detail, Saved, NotFound
  hooks/        useReveal (scroll animations)
  data/         sneakers.js (demo catalogue)
  store.js      bag, favourites and theme state (persisted)
public/images/  all product photos, served locally
```

## Run it locally

```bash
git clone https://github.com/Rajveerrsingh/sneaker-showcase
cd sneaker-showcase
npm install
npm start
```

Then open http://localhost:3000

## Deploy

```bash
npm run build
```

Then push the contents of the `build` folder to the `gh-pages` branch.

## Image credits

Photos from Wikimedia Commons, resized for the web:

- Nike Blazer Mid: Corvettec6r, CC0
- Adidas Superstar: Yahoo! Blog, CC BY 2.0
- Air Jordan 1 High: [Mathieu Landretti](https://commons.wikimedia.org/wiki/File:Nike_Air_Jordan.jpg), CC BY-SA 4.0
- Air Jordan 4 Retro: [Jacek Halicki](https://commons.wikimedia.org/wiki/File:2023_Buty_Nike_Air_Jordan.jpg), CC BY-SA 4.0
- Adidas NMD_R1: [LeDroider](https://commons.wikimedia.org/wiki/File:Adidas_NMD_R1.jpg), CC0
- Nike Dunk Low: [William Mucci](https://commons.wikimedia.org/wiki/File:Nike_dunk_low.jpg), CC0

---

Built by [Rajveer Singh](https://github.com/Rajveerrsingh)
