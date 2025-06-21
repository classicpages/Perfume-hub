const backgrounds = [
  '/images/pexels-koprivakart-7075055.jpg',
  '/images/pexels-pic-matti-450440252-29805437.jpg',
  '/images/pexels-roman-koval-428095504-15271715.jpg',
  '/images/pexels-valeriya-965989 (1).jpg'
];

let current = 0;

function changeBackground() {
  const slideshow = document.querySelector('.slideshow-bg');
  if (slideshow) {
    slideshow.style.backgroundImage = `url(${backgrounds[current]})`;
    slideshow.style.backgroundSize = 'cover';
    slideshow.style.backgroundPosition = 'center';
    current = (current + 1) % backgrounds.length;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Start slideshow
  changeBackground();
  setInterval(changeBackground, 5000);

  // Cart logic
  const cart = [];
  const cartItems = document.getElementById('cart-items');
  const emptyMessage = document.getElementById('empty-cart') || document.getElementById('empty-cart-message');

  function updateCart() {
    cartItems.innerHTML = '';
    if (cart.length === 0) {
      emptyMessage.style.display = 'block';
    } else {
      emptyMessage.style.display = 'none';
      cart.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.name} - GHc ${item.price}`;
        cartItems.appendChild(div);
      });
    }
  }

  const buttons = document.querySelectorAll('.buy-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = 45;
      cart.push({ name, price });
      updateCart();
      window.location.href = '#cart';
    });
  });

  // Contact form
  const contactForm = document.getElementById('contact-form') || document.querySelector("form");
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your responds, this may take a while, we will get back to u soon. Stay Tuned');
    contactForm.reset();
  });
});
