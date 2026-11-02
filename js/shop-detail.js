const productLoading = document.querySelector('[data-product-loading]');
const productContent = document.querySelector('[data-product-content]');
const productError = document.querySelector('[data-product-error]');

const setProductText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
};

const renderProduct = (product, products) => {
  document.title = `${product.name} | X-Tra Shop`;

  const heroImage = document.querySelector('[data-product-hero-image]');
  heroImage.src = product.image;
  heroImage.alt = product.imageAlt;
  heroImage.style.objectPosition = product.heroPosition || product.objectPosition;

  const productImage = document.querySelector('[data-product-image]');
  productImage.src = product.image;
  productImage.alt = product.imageAlt;
  productImage.style.objectPosition = product.objectPosition;
  productImage.style.scale = product.imageScale || '1';
  productImage.style.transformOrigin = product.imageOrigin || 'center';

  setProductText('[data-product-category]', product.category);
  setProductText('[data-product-title]', product.name);
  setProductText('[data-product-tagline]', product.tagline);
  setProductText('[data-product-breadcrumb]', product.name);
  setProductText('[data-product-copy-category]', product.category);
  setProductText('[data-product-heading]', product.name);
  setProductText('[data-product-price]', product.price);
  setProductText('[data-product-description]', product.description);
  setProductText('[data-product-material]', product.material);
  setProductText('[data-product-dimensions]', product.dimensions);
  setProductText('[data-product-finish]', product.finish);

  const features = document.querySelector('[data-product-features]');
  product.features.forEach(feature => {
    const item = document.createElement('li');
    item.textContent = feature;
    features.append(item);
  });

  const enquiry = document.querySelector('[data-product-enquiry]');
  enquiry.href = `mailto:example@gmail.com?subject=${encodeURIComponent(`Question about ${product.name}`)}`;

  const productIndex = products.findIndex(item => item.slug === product.slug);
  const nextProduct = products[(productIndex + 1) % products.length];
  const nextLink = document.querySelector('[data-next-product]');
  nextLink.href = `shop-detail.html?product=${encodeURIComponent(nextProduct.slug)}`;
  nextLink.setAttribute('aria-label', `Next shop item: ${nextProduct.name}`);

  productLoading.hidden = true;
  productContent.hidden = false;
};

const showProductError = error => {
  productLoading.hidden = true;
  productError.hidden = false;
  if (window.location.protocol === 'file:') {
    setProductText('[data-product-error-message]', 'Shop data uses fetch, so this site needs to be opened through a local or hosted web server.');
  }
  console.error(error);
};

const loadProduct = async () => {
  try {
    const response = await fetch('../data/products.json');
    if (!response.ok) throw new Error(`Product data request failed with status ${response.status}.`);

    const products = await response.json();
    const requestedSlug = new URLSearchParams(window.location.search).get('product') || products[0]?.slug;
    const product = products.find(item => item.slug === requestedSlug);
    if (!product) throw new Error(`No product found for slug: ${requestedSlug}`);

    renderProduct(product, products);
  } catch (error) {
    showProductError(error);
  }
};

loadProduct();
