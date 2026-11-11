import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store";
import sneakers, { formatPrice } from "../data/sneakers";
import SneakerImage from "./SneakerImage";
import { CloseIcon, HeartIcon, BagIcon } from "./Icons";

const byId = (id) => sneakers.find((s) => s.id === id);

function Drawer() {
  const { drawer, closeDrawer, openDrawer, cart, favorites, updateQty, toggleFavorite, clearCart } = useStore();
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const open = drawer !== null;

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    closeRef.current?.focus();
    document.body.classList.add("no-scroll");
    const onKey = (e) => {
      if (e.key === "Escape") closeDrawer();
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll("a[href], button:not([disabled])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
      prev && prev.focus && prev.focus();
    };
  }, [open, closeDrawer]);

  const items = cart.map((i) => ({ ...i, sneaker: byId(i.id) })).filter((i) => i.sneaker);
  const subtotal = items.reduce((n, i) => n + i.sneaker.price * i.qty, 0);
  const saved = favorites.map(byId).filter(Boolean);

  return (
    <div className={`drawer-root ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer-backdrop" onClick={closeDrawer} />
      <aside
        ref={panelRef}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={drawer === "saved" ? "Saved sneakers" : "Shopping bag"}
        inert={!open}
      >
        <div className="drawer-head">
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={drawer === "bag"} className={drawer === "bag" ? "active" : ""} onClick={() => openDrawer("bag")}>
              Bag ({items.reduce((n, i) => n + i.qty, 0)})
            </button>
            <button role="tab" aria-selected={drawer === "saved"} className={drawer === "saved" ? "active" : ""} onClick={() => openDrawer("saved")}>
              Saved ({saved.length})
            </button>
          </div>
          <button ref={closeRef} className="icon-btn" onClick={closeDrawer} aria-label="Close panel">
            <CloseIcon />
          </button>
        </div>

        {drawer === "saved" ? (
          saved.length === 0 ? (
            <Empty icon={<HeartIcon width={28} height={28} />} title="Nothing saved yet" text="Tap the heart on any pair to keep it here." />
          ) : (
            <ul className="drawer-list">
              {saved.map((s) => (
                <li key={s.id} className="line">
                  <Link to={`/sneaker/${s.id}`} onClick={closeDrawer} className="line-media">
                    <SneakerImage src={s.image} alt={s.name} className="line-img" />
                  </Link>
                  <div className="line-info">
                    <Link to={`/sneaker/${s.id}`} onClick={closeDrawer} className="line-title">{s.name}</Link>
                    <span className="muted">{s.colorway}</span>
                    <span className="line-price">{formatPrice(s.price)}</span>
                  </div>
                  <button className="text-btn" onClick={() => toggleFavorite(s)} aria-label={`Remove ${s.name} from saved`}>Remove</button>
                </li>
              ))}
            </ul>
          )
        ) : items.length === 0 ? (
          <Empty icon={<BagIcon width={28} height={28} />} title="Your bag is empty" text="Pick a size on any product page to add it here." />
        ) : (
          <>
            <ul className="drawer-list">
              {items.map((i) => (
                <li key={`${i.id}-${i.size}`} className="line">
                  <Link to={`/sneaker/${i.id}`} onClick={closeDrawer} className="line-media">
                    <SneakerImage src={i.sneaker.image} alt={i.sneaker.name} className="line-img" />
                  </Link>
                  <div className="line-info">
                    <Link to={`/sneaker/${i.id}`} onClick={closeDrawer} className="line-title">{i.sneaker.name}</Link>
                    <span className="muted">US {i.size}</span>
                    <div className="qty" aria-label={`Quantity for ${i.sneaker.name}`}>
                      <button onClick={() => updateQty(i.id, i.size, i.qty - 1)} aria-label="Decrease quantity">−</button>
                      <span aria-live="polite">{i.qty}</span>
                      <button onClick={() => updateQty(i.id, i.size, i.qty + 1)} aria-label="Increase quantity" disabled={i.qty >= 9}>+</button>
                    </div>
                  </div>
                  <span className="line-price">{formatPrice(i.sneaker.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <div className="subtotal">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <button className="btn btn-primary btn-block" disabled title="This is a demo store">
                Checkout (demo)
              </button>
              <button className="text-btn" onClick={clearCart}>Clear bag</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Empty({ icon, title, text }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon}</div>
      <p className="empty-title">{title}</p>
      <p className="muted">{text}</p>
    </div>
  );
}

export { Empty };
export default Drawer;
