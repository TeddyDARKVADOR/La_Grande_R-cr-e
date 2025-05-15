// === UTILS ===
const getLocal = (key, fallback = []) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};
const setLocal = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// === CAROUSEL MARQUES ===
(() => {
  const container = document.querySelector('.brands-container');
  if (!container) return;

  document.querySelector('.next-brand')?.addEventListener('click', () =>
    container.scrollBy({ left: 200, behavior: 'smooth' })
  );
  document.querySelector('.prev-brand')?.addEventListener('click', () =>
    container.scrollBy({ left: -200, behavior: 'smooth' })
  );
})();

// === PANIER SVG + BADGE + INCRÉMENTATION ===
(() => {
  const badge = document.getElementById('cart-count');

  const updateBadge = () => {
    const cart = getLocal('cart');
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (badge) {
      badge.textContent = total;
      badge.style.display = total > 0 ? 'flex' : 'none';
    }
  };

  const animateBadge = () => {
    if (!badge) return;
    badge.classList.remove('bounce');
    void badge.offsetWidth;
    badge.classList.add('bounce');
    setTimeout(() => badge.classList.remove('bounce'), 250);
  };

  const addToCart = (card) => {
    const id = card.dataset.id;
    let cart = getLocal('cart');
    let item = cart.find(p => p.id === id);

    if (item) item.qty += 1;
    else {
      const { name, image, price } = card.dataset;
      cart.push({ id, name, image, price, qty: 1 });
    }

    setLocal('cart', cart);
    updateBadge();
    animateBadge();
  };

  const setupCartButtons = () => {
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-cart') || e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest('.product-card');
        if (card) addToCart(card);
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateBadge();
    setupCartButtons();
  });
})();

// === FAVORIS ===
(() => {
  const addFavorite = (card) => {
    const { id, name, image, category } = card.dataset;
    let favorites = getLocal('favorites');
    if (!favorites.some(p => p.id === id)) {
      favorites.push({ id, name, image, category });
      setLocal('favorites', favorites);
    }
  };

  const renderFavorites = () => {
    const list = document.getElementById('favorites-list');
    const noFav = document.getElementById('no-favorites');
    const favorites = getLocal('favorites');

    if (!list) return;
    list.innerHTML = '';

    if (favorites.length === 0) {
      noFav?.style.setProperty('display', 'block');
    } else {
      noFav?.style.setProperty('display', 'none');
      favorites.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <div>${product.category || ''}</div>
        `;
        list.appendChild(card);
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const id = e.target.dataset.id;

      if (e.target.classList.contains('add-favorite') && card) addFavorite(card);
    });

    if (window.location.pathname.includes('favoris.html')) {
      renderFavorites();
    }
  });
})();

// === MODALE PANIER (sans bouton supprimer/vider, avec total) ===
(() => {
  const renderCartModal = () => {
    const modal = document.getElementById('cart-modal');
    const list = document.getElementById('cart-items-list');
    const empty = document.getElementById('cart-empty-message');
    const cart = getLocal('cart');

    if (!modal || !list || !empty) return;
    list.innerHTML = '';
    empty.style.display = cart.length === 0 ? 'block' : 'none';

    let totalPrice = 0;

    cart.forEach(item => {
      totalPrice += parseFloat(item.price) * item.qty;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div>
          <div>${item.name}</div>
          <div>Quantité : ${item.qty}</div>
          <div>Prix unitaire : ${item.price} €</div>
        </div>
      `;
      list.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.style.marginTop = '1rem';
    totalDiv.style.fontWeight = 'bold';
    totalDiv.textContent = `Total : ${totalPrice.toFixed(2)} €`;
    list.appendChild(totalDiv);
  };

  const toggleCartModal = (show) => {
    const modal = document.getElementById('cart-modal');
    if (modal) {
      modal.style.display = show ? 'flex' : 'none';
      document.body.style.overflow = show ? 'hidden' : '';
      if (show) renderCartModal();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cart-icon')?.addEventListener('click', () => toggleCartModal(true));
    document.getElementById('close-cart-modal')?.addEventListener('click', () => toggleCartModal(false));
    document.getElementById('cart-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'cart-modal') toggleCartModal(false);
    });
  });
})();
