// src/App.jsx

import React, { useState } from "react";
import { CommerceProvider } from "./commerce/CommerceProvider.jsx";
import { StorefrontPage } from "./storefront/pages/StorefrontPage.jsx";
import { ProductDetailPage } from "./storefront/pages/ProductDetailPage.jsx";
import { CheckoutPage } from "./storefront/pages/CheckoutPage.jsx";
// src/App.jsx

import { SubscriptionProvider } from "./subscriptions/SubscriptionProvider.jsx";
import { SubscriptionPage } from "./storefront/pages/SubscriptionPage.jsx";

// in App component:
const [view, setView] = useState("storefront");

function goSubscription() {
  setView("subscription");
}

return (
  <SubscriptionProvider>
    <CommerceProvider>
      {/* existing views */}
      {view === "subscription" && (
        <SubscriptionPage onBack={goStorefront} />
      )}
    </CommerceProvider>
  </SubscriptionProvider>
);


export function App() {
  const [view, setView] = useState("storefront");
  const [selectedProduct, setSelectedProduct] = useState(null);

  function goStorefront() {
    setView("storefront");
    setSelectedProduct(null);
  }

  function goDetail(product) {
    setSelectedProduct(product);
    setView("detail");
  }

  function goCheckout() {
    setView("checkout");
  }

  return (
    <CommerceProvider>
      {view === "storefront" && (
        <>
          <button onClick={goCheckout} style={{ position: "absolute", right: 16, top: 16 }}>
            Cart / Checkout
          </button>
          <StorefrontPage onSelect={goDetail} />
        </>
      )}
      {view === "detail" && (
        <ProductDetailPage product={selectedProduct} onBack={goStorefront} />
      )}
      {view === "checkout" && <CheckoutPage onBack={goStorefront} />}
    </CommerceProvider>
  );
}

