import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../../context/StoreContext";
import { formatPrice, getSneaker } from "../../data/sneakers";
import useDialog from "../../hooks/useDialog";
import { CloseIcon } from "../Icons/Icons";
import "./BagDrawer.css";

const ease = [0.22, 1, 0.36, 1];

function BagDrawer() {
  const { bagOpen, setBagOpen, cart, updateQty, clearCart, notify } = useStore();
  const close = React.useCallback(() => setBagOpen(false), [setBagOpen]);
  const panelRef = useDialog(bagOpen, close);

  const items = cart.map((item) => ({ ...item, sneaker: getSneaker(item.id) })).filter((item) => item.sneaker);
  const subtotal = items.reduce((sum, item) => sum + item.sneaker.price * item.qty, 0);

  const checkout = () => {
    clearCart();
    close();
    notify("Demo checkout complete. Nothing was charged.");
  };

  return (
    <AnimatePresence>
      {bagOpen && (
        <div className="drawer" key="bag">
          <motion.div
            className="drawer__overlay"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.aside
            ref={panelRef}
            className="drawer__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease }}
          >
            <header className="drawer__header">
              <h2 id="bag-title" className="drawer__title">
                Bag <span className="muted tabular">{items.reduce((n, i) => n + i.qty, 0)}</span>
              </h2>
              <button type="button" className="icon-button" onClick={close} aria-label="Close bag">
                <CloseIcon />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="drawer__empty">
                <p>Your bag is empty.</p>
                <p className="muted">Pick a pair and a size to see it here.</p>
                <Link to="/" state={{ scrollTo: "archive" }} className="button button--secondary" onClick={close}>
                  Browse the archive
                </Link>
              </div>
            ) : (
              <>
                <ul className="drawer__items">
                  {items.map(({ sneaker, size, qty }) => (
                    <li key={`${sneaker.id}-${size}`} className="bag-item">
                      <Link to={`/sneaker/${sneaker.id}`} className="bag-item__thumb" onClick={close}>
                        <img src={sneaker.imageSmall} width="640" height="480" alt="" />
                      </Link>
                      <div className="bag-item__info">
                        <Link to={`/sneaker/${sneaker.id}`} className="bag-item__name" onClick={close}>
                          {sneaker.name}
                        </Link>
                        <p className="muted">US {size}</p>
                        <div className="stepper" role="group" aria-label={`Quantity of ${sneaker.name}`}>
                          <button
                            type="button"
                            onClick={() => updateQty(sneaker.id, size, qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="tabular" aria-live="polite">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(sneaker.id, size, qty + 1)}
                            disabled={qty >= 9}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="bag-item__end">
                        <p className="tabular">{formatPrice(sneaker.price * qty)}</p>
                        <button
                          type="button"
                          className="text-link muted"
                          onClick={() => updateQty(sneaker.id, size, 0)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <footer className="drawer__footer">
                  <div className="drawer__row">
                    <span>Subtotal</span>
                    <span className="tabular">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="muted drawer__note">
                    Shipping is free. This is a demo, so checkout just clears the bag.
                  </p>
                  <button type="button" className="button button--primary button--block" onClick={checkout}>
                    Checkout
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default BagDrawer;
