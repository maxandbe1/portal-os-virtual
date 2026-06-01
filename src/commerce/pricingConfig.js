// src/commerce/pricingConfig.js
// Static pricing rules for v1

export const DEFAULT_CURRENCY = "USD";

export function getBasePriceForFormat(format) {
  switch (format) {
    case "poster":
      return 39;
    case "pack":
      return 29;
    case "sequence":
      return 79;
    case "card":
      return 19;
    default:
      return 25;
  }
}

export function applyEditionMultiplier(basePrice, editionSize) {
  if (!editionSize || editionSize <= 0) return basePrice;
  if (editionSize <= 10) return basePrice * 3;
  if (editionSize <= 50) return basePrice * 2;
  return basePrice * 1.3;
}

export function getProductPrice(product) {
  const base = getBasePriceForFormat(product.format);
  const editionSize = product.edition?.size ?? null;
  const finalPrice = applyEditionMultiplier(base, editionSize);
  return {
    amount: Math.round(finalPrice),
    currency: DEFAULT_CURRENCY
  };
}
