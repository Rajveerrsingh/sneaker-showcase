import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const StoreContext = createContext(null);

function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : typeof initial === "function" ? initial() : initial;
    } catch {
      return typeof initial === "function" ? initial() : initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or blocked */
    }
  }, [key, value]);
  return [value, setValue];
}

const preferredTheme = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

export function StoreProvider({ children }) {
  const [cart, setCart] = usePersisted("ss_cart", []);
  const [favorites, setFavorites] = usePersisted("ss_favorites", []);
  const [theme, setTheme] = usePersisted("ss_theme", preferredTheme);
  const [drawer, setDrawer] = useState(null); // "bag" | "saved" | null
  const [compare, setCompare] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f4f1ec" : "#0c0c0e");
  }, [theme]);

  const notify = useCallback((message, image) => {
    clearTimeout(toastTimer.current);
    setToast({ message, image, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback(
    (sneaker, size) => {
      setCart((items) => {
        const found = items.find((i) => i.id === sneaker.id && i.size === size);
        if (found) return items.map((i) => (i === found ? { ...i, qty: Math.min(i.qty + 1, 9) } : i));
        return [...items, { id: sneaker.id, size, qty: 1 }];
      });
      notify(`${sneaker.name} (US ${size}) added to your bag`, sneaker.image);
    },
    [setCart, notify]
  );

  const updateQty = useCallback(
    (id, size, qty) =>
      setCart((items) =>
        qty <= 0
          ? items.filter((i) => !(i.id === id && i.size === size))
          : items.map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.min(qty, 9) } : i))
      ),
    [setCart]
  );

  const toggleFavorite = useCallback(
    (sneaker) => {
      const has = favorites.includes(sneaker.id);
      setFavorites((ids) => (has ? ids.filter((x) => x !== sneaker.id) : [...ids, sneaker.id]));
      notify(has ? `Removed ${sneaker.name} from saved` : `Saved ${sneaker.name}`, sneaker.image);
    },
    [favorites, setFavorites, notify]
  );

  const toggleCompare = useCallback(
    (sneaker) => {
      const has = compare.includes(sneaker.id);
      if (has) {
        setCompare((ids) => ids.filter((x) => x !== sneaker.id));
        return;
      }
      setCompare((ids) => [...ids, sneaker.id].slice(-2));
      if (compare.length >= 2) notify("Compare holds two pairs, so the oldest one was swapped out");
    },
    [compare, notify]
  );

  const value = useMemo(
    () => ({
      cart,
      favorites,
      theme,
      drawer,
      toast,
      cartCount: cart.reduce((n, i) => n + i.qty, 0),
      addToCart,
      updateQty,
      clearCart: () => setCart([]),
      toggleFavorite,
      isFavorite: (id) => favorites.includes(id),
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      compare,
      compareOpen,
      toggleCompare,
      isComparing: (id) => compare.includes(id),
      clearCompare: () => {
        setCompare([]);
        setCompareOpen(false);
      },
      setCompareOpen,
      notify,
      openDrawer: setDrawer,
      closeDrawer: () => setDrawer(null)
    }),
    [cart, favorites, theme, drawer, toast, compare, compareOpen, addToCart, updateQty, toggleFavorite, toggleCompare, notify, setCart, setTheme]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
