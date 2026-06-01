// src/publishing/index/indexEngine.js
// Portal‑OS Publishing System — Indexing + Archive Layer (v1)
// Indexes products and assets for fast lookup and storefront queries.

let assetIndex = {
  byId: new Map(),
  byType: new Map()
};

let productIndex = {
  byId: new Map(),
  byFormat: new Map()
};

// ASSETS

export function indexAsset(asset) {
  assetIndex.byId.set(asset.id, asset);

  if (!assetIndex.byType.has(asset.type)) {
    assetIndex.byType.set(asset.type, []);
  }
  assetIndex.byType.get(asset.type).push(asset);
}

export function getIndexedAsset(id) {
  return assetIndex.byId.get(id) || null;
}

export function getAssetsByTypeIndexed(type) {
  return assetIndex.byType.get(type) || [];
}

// PRODUCTS

export function indexProduct(product) {
  productIndex.byId.set(product.productId, product);

  if (!productIndex.byFormat.has(product.format)) {
    productIndex.byFormat.set(product.format, []);
  }
  productIndex.byFormat.get(product.format).push(product);
}

export function getIndexedProduct(id) {
  return productIndex.byId.get(id) || null;
}

export function getProductsByFormat(format) {
  return productIndex.byFormat.get(format) || [];
}

// DEV ONLY

export function clearIndex() {
  assetIndex = { byId: new Map(), byType: new Map() };
  productIndex = { byId: new Map(), byFormat: new Map() };
}
