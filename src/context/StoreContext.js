import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import usePersistedState from "../hooks/usePersistedState";

const StoreContext = createContext(null);

const MAX_QTY = 9;
const MAX_COMPARE = 2;
const TOAST_MS = 2600;

const systemTheme = () => (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export function StoreProvider({ children }) {
  const [cart, setCart] = usePersistedState("sa_cart", []);
  const [favorites, setFavorites] = usePersistedState("sa_favorites", []);
  const [theme, setTheme] = usePersistedState("sa_theme", systemTheme);
  const [bagOpen, setBagOpen] = useState(false);
  const [compare, setCompare] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0f0f10" : "#f6f5f2");
  }, [theme]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = useCallback((message, image) => {
    clearTimeout(toastTimer.current);
    setToast({ message, image, key: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), TOAST_MS);
  }, []);

  const addToCart = useCallback(
    (sneaker, size) => {
      setCart((items) => {
        const existing = items.find((i) => i.id === sneaker.id && i.size === size);
        if (existing) {
          return items.map((i) => (i === existing ? { ...i, qty: Math.min(i.qty + 1, MAX_QTY) } : i));
        }
        return [...items, { id: sneaker.id, size, qty: 1 }];
      });
      notify(`Added to bag · US ${size}`, sneaker.imageSmall);
    },
    [setCart, notify]
  );

  const updateQty = useCallback(
    (id, size, qty) =>
      setCart((items) =>
        qty <= 0
          ? items.filter((i) => !(i.id === id && i.size === size))
          : items.map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.min(qty, MAX_QTY) } : i))
      ),
    [setCart]
  );

  const toggleFavorite = useCallback(
    (sneaker) => {
      const saved = favorites.includes(sneaker.id);
      setFavorites((ids) => (saved ? ids.filter((x) => x !== sneaker.id) : [...ids, sneaker.id]));
      notify(saved ? "Removed from saved" : "Saved for later", sneaker.imageSmall);
    },
    [favorites, setFavorites, notify]
  );

  const toggleCompare = useCallback(
    (sneaker) => {
      if (compare.includes(sneaker.id)) {
        setCompare((ids) => ids.filter((x) => x !== sneaker.id));
        return;
      }
      if (compare.length >= MAX_COMPARE) notify("Compare holds two pairs, so the first one was replaced");
      setCompare((ids) => [...ids, sneaker.id].slice(-MAX_COMPARE));
    },
    [compare, notify]
  );

  const clearCompare = useCallback(() => {
    setCompare([]);
    setCompareOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartCount: cart.reduce((n, i) => n + i.qty, 0),
      addToCart,
      updateQty,
      clearCart: () => setCart([]),
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite,
      compare,
      isComparing: (id) => compare.includes(id),
      toggleCompare,
      clearCompare,
      compareOpen,
      setCompareOpen,
      bagOpen,
      setBagOpen,
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      toast,
      notify
    }),
    [
      cart,
      addToCart,
      updateQty,
      setCart,
      favorites,
      toggleFavorite,
      compare,
      toggleCompare,
      clearCompare,
      compareOpen,
      bagOpen,
      theme,
      setTheme,
      toast,
      notify
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
