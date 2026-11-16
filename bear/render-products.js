export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function productLink(product, placement = 'product') {
  const url = new URL(product.url);
  url.searchParams.set('utm_source', 'bear_website');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'bear_launch');
  url.searchParams.set('utm_content', `${placement}_${product.slug}`);
  return url.href;
}

export function renderProducts(products) {
  return products.map(p => `
  <article class="product-card${p.featured ? ' featured' : ''}" id="${escapeHtml(p.slug)}">
    <div class="product-top"><span class="product-icon" aria-hidden="true">${escapeHtml(p.icon)}</span><span class="product-label">${escapeHtml(p.status)} · v${escapeHtml(p.version)}</span></div>
    <h3>${escapeHtml(p.name)}</h3><p class="product-intro">${escapeHtml(p.description)}</p>
    <ul>${p.features.map(f=>`<li>${escapeHtml(f)}</li>`).join('')}</ul>
    <div class="product-formats">${p.formats.map(f=>`<span>${escapeHtml(f)}</span>`).join('')}</div>
    <p class="product-limit">${escapeHtml(p.limitation)}</p>
    <div class="product-bottom"><div><span class="price">${escapeHtml(p.price)}</span><span class="price-label">${escapeHtml(p.priceLabel)}</span></div><a class="button" data-goatcounter-click="agensi-${escapeHtml(p.slug)}" href="${escapeHtml(productLink(p))}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.cta)} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></div>
  </article>`).join('');
}
