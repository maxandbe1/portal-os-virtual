import React from "react";
import { useCommerce } from "../../commerce/CommerceProvider.jsx";
import { useLicensing } from "../../licensing/LicensingProvider.jsx";

export function CheckoutPage({ onBack }) {
  const { cart, total, checkout, lastOrder } = useCommerce();
  const { registerOrder } = useLicensing();

  function handleCheckout() {
    try {
      const order = checkout();
      registerOrder(order);
    } catch (e) {
      console.error(e);
    }
  }

  // ...rest unchanged, but use handleCheckout instead of checkout directly
}

