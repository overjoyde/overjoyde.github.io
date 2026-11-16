export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function productLink(product, placement = 'product') {
  const url = new URL(product.url);
  url.searchParams.set('utm_source', 'bear_website');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'bear_launch');
  url.searchParams.set('utm_content', `${placement}_${product.slug}`);
  return url.href;
}

const productPresentation = {
  'bear-model-doc-writer': { purpose: 'Document the rule', path: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h4M10 12h5M10 16h5"/>' },
  'tm-scenario-test-designer': { purpose: 'Test the assumptions', path: '<path d="m9 5-6 7 6 7m6-14 6 7-6 7m-2-15-2 16"/>' },
  'bear-transaction-anomaly-analyst': { purpose: 'Inspect the pattern', path: '<circle cx="5" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="12" r="3"/><path d="m7 6 9 5m-9 7 9-5"/>' }
};

export function renderProducts(products) {
  return products.map(p => `
  <article class="product-card${p.featured ? ' featured' : ''}" id="${escapeHtml(p.slug)}">
    <div class="product-top"><span class="product-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${productPresentation[p.slug]?.path || '<path d="M5 5h14v14H5z"/>'}</svg></span><span class="product-label">${escapeHtml(p.status)} · v${escapeHtml(p.version)}</span></div>
    <p class="product-purpose">${escapeHtml(productPresentation[p.slug]?.purpose || 'Explore the skill')}</p><h3>${escapeHtml(p.name)}</h3><p class="product-intro">${escapeHtml(p.description)}</p>
    <ul>${p.features.map(f=>`<li>${escapeHtml(f)}</li>`).join('')}</ul>
    <div class="product-formats">${p.formats.map(f=>`<span>${escapeHtml(f)}</span>`).join('')}</div>
    <p class="product-limit">${escapeHtml(p.limitation)}</p>
    <div class="product-bottom"><div><span class="price">${escapeHtml(p.price)}</span><span class="price-label">${escapeHtml(p.priceLabel)}</span></div><a class="button" data-goatcounter-click="agensi-${escapeHtml(p.slug)}" href="${escapeHtml(productLink(p))}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.cta)} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></div>
  </article>`).join('');
}
