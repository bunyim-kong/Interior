const shopLoading = document.querySelector('[data-shop-loading]');
const shopGrid = document.querySelector('[data-shop-grid]');
const shopError = document.querySelector('[data-shop-error]');

const createShopCard = product => {
  const card = document.createElement('a');
  card.className = 'shop-card';
  card.href = `shop-detail.html?product=${encodeURIComponent(product.slug)}`;
  card.setAttribute('aria-label', `View details for ${product.name}`);

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.imageAlt;
  image.loading = 'lazy';
  image.style.objectPosition = product.objectPosition || 'center';

  const body = document.createElement('div');
  body.className = 'shop-card__body';

  const category = document.createElement('span');
  category.className = 'tag';
  category.textContent = product.category;

  const title = document.createElement('h3');
  title.textContent = product.name;

  const price = document.createElement('strong');
  price.textContent = product.price;

  const description = document.createElement('p');
  description.textContent = product.cardDescription || product.tagline;

  const action = document.createElement('span');
  action.className = 'text-link shop-card__action';
  action.textContent = 'View Details ';
  const arrow = document.createElement('span');
  arrow.innerHTML = '<i class="fa-solid fa-angle-right" aria-hidden="true"></i>';
  action.append(arrow);

  body.append(category, title, price, description, action);
  card.append(image, body);
  return card;
};

const loadShop = async () => {
  try {
    const response = await fetch('../data/products.json');
    if (!response.ok) throw new Error(`Product data request failed with status ${response.status}.`);

    const products = await response.json();
    products.forEach(product => shopGrid.append(createShopCard(product)));
    shopLoading.hidden = true;
    shopGrid.hidden = false;
  } catch (error) {
    shopLoading.hidden = true;
    shopError.hidden = false;
    console.error(error);
  }
};

loadShop();
