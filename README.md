# Sole Archive · Sneaker Showcase

An interactive sneaker storefront built with React and Framer Motion. The hero shoe tilts in 3D and follows your cursor, cards morph into the product page, filters reflow with animation, and you can drag through featured drops, zoom in with a lens, compare two pairs head to head, and keep a bag and saved list between visits.

**Live demo:** https://rajveerrsingh.github.io/sneaker-showcase/

![Sole Archive home page](docs/preview.jpg)

---

## Highlights

- **3D tilt hero**: the featured shoe, its colour glow and the outlined model name move at different depths as you move the cursor. It rotates through three featured pairs, and you can pick one from the thumbnails.
- **Shared element transitions**: the shoe on a product card animates into place on the product page
- **Animated filtering**: brand chips with a sliding pill, live search and sorting, and the grid reflows smoothly (Framer Motion `layout` + `AnimatePresence`)
- **Draggable featured rail** with arrow buttons and keyboard support
- **Next drop countdown**: a live demo timer to the next Saturday 10:00 release
- **Product page**: a hover zoom lens, studio cut-out or original photo views, an animated size picker, colourway swatches, photo credit, previous/next links and related pairs
- **Compare mode**: pick any two pairs and open a head to head modal with price, year, colourway and stock
- **Bag and favourites** in a slide-out drawer, saved to `localStorage`, with animated toasts
- **Little touches**: magnetic buttons, count-up stats, colour-matched glows behind every shoe, skeleton shimmer while images load, scroll reveals
- **Dark and light themes** that follow your system and remember your choice
- **Accessible**: keyboard friendly, skip link, focus rings, alt text, ARIA labels, focus kept in dialogs, and all motion respects `prefers-reduced-motion`
- **Responsive** from small phones up

Prices and stock are demo data. Nothing is for sale.

## Tech stack

- **React 19** with hooks and Context (bag, favourites, compare, theme)
- **Framer Motion 11** for layout animations, shared transitions, springs and gestures
- **React Router 7** (`HashRouter`, so deep links work on GitHub Pages)
- **Plain CSS** with custom properties and `color-mix()` for theming, no UI framework
- **Google Fonts**: Space Grotesk and Inter
- **GitHub Pages** for hosting

## Project structure

```
src/
  components/   Hero, Carousel, Countdown, Compare, SneakerCard, SneakerImage,
                Magnetic, Counter, Reveal, Navbar, Footer, Drawer, Toast, Icons
  pages/        Home, Detail, Saved, NotFound
  data/         sneakers.js (demo catalogue)
  store.js      bag, favourites, compare and theme state
public/images/  studio cut-outs (.webp) and original photos (photo/*.jpg)
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

All photos come from Wikimedia Commons. The studio views are the same photos with the background removed and resized.

| Sneaker | Photographer | Licence | Source |
| --- | --- | --- | --- |
| Air Jordan 1 High | Osyffar | CC0 | [Nike_Air_Jordan_I.jpg](https://commons.wikimedia.org/wiki/File:Nike_Air_Jordan_I.jpg) |
| Air Jordan 4 Retro | Osyffar | CC0 | [Nike_Air_Jordan_IV.jpg](https://commons.wikimedia.org/wiki/File:Nike_Air_Jordan_IV.jpg) |
| New Balance 1906R | LeDroider | CC0 | [New_Balance_1906R.jpg](https://commons.wikimedia.org/wiki/File:New_Balance_1906R.jpg) |
| New Balance 550 | LeDroider | CC0 | [New_Balance_550.jpg](https://commons.wikimedia.org/wiki/File:New_Balance_550.jpg) |
| Nike Dunk Low | LeDroider | CC0 | [Panda_Nike_Dunk.jpg](https://commons.wikimedia.org/wiki/File:Panda_Nike_Dunk.jpg) |
| Nike Zoom Vomero 5 | LeDroider | CC0 | [Vomero_5.jpg](https://commons.wikimedia.org/wiki/File:Vomero_5.jpg) |
| Nike Cortez | LeDroider | CC0 | [Nike_Cortez.jpg](https://commons.wikimedia.org/wiki/File:Nike_Cortez.jpg) |
| Nike Air Max 90 | Mfagoaguna1 | CC BY-SA 4.0 | [Nike_Air_Max_90.jpg](https://commons.wikimedia.org/wiki/File:Nike_Air_Max_90.jpg) |
| Adidas Gazelle Indoor | LeDroider | CC0 | [Adidas_Gazelle_Indoor.jpg](https://commons.wikimedia.org/wiki/File:Adidas_Gazelle_Indoor.jpg) |
| Adidas SL 72 OG | LeDroider | CC0 | [Adidas_SL_72_OG.jpg](https://commons.wikimedia.org/wiki/File:Adidas_SL_72_OG.jpg) |
| Asics Gel-1130 | LeDroider | CC0 | [Asics_Gel-1130.jpg](https://commons.wikimedia.org/wiki/File:Asics_Gel-1130.jpg) |
| Puma Suede Classic | LeDroider | CC0 | [Puma_Suede.jpg](https://commons.wikimedia.org/wiki/File:Puma_Suede.jpg) |

The edited Air Max 90 images are shared under the same CC BY-SA 4.0 licence.

---

Built by [Rajveer Singh](https://github.com/Rajveerrsingh)
