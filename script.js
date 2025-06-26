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
  // Slideshow
  changeBackground();
  setInterval(changeBackground, 5000);

  // Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

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
      const price = 45; // You might want to update this to pull actual prices
      cart.push({ name, price });
      updateCart();
      window.location.href = '#cart';
    });
  });

  // Contact Form (only handles forms that exist)
  const contactForm = document.getElementById('contact-form') || document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action || '#', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert('Your request has been granted, we will notify you soon.');
          contactForm.reset();
        } else {
          alert('Oops! Something went wrong. Please try again later.');
        }
      } catch (err) {
        alert('Network error. Please check your connection and try again.');
      }
    });
  }
});
