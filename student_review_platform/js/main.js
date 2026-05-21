const searchButtons = document.querySelectorAll('[data-reveal-target]');

searchButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.revealTarget);
    if (!target) return;
    target.classList.remove('d-none');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const ratingGroups = document.querySelectorAll('[data-rating-group]');

ratingGroups.forEach((group) => {
  const buttons = Array.from(group.querySelectorAll('button'));

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach((star, starIndex) => {
        star.classList.toggle('active', starIndex <= index);
      });

      const output = group.querySelector('output');
      if (output) output.textContent = `${index + 1} out of 5`;
    });
  });
});

const sortButtons = document.querySelectorAll('[data-sort-reviews]');

sortButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const list = document.querySelector(button.dataset.sortReviews);
    if (!list) return;

    const reviews = Array.from(list.querySelectorAll('[data-review-rating]'));
    const descending = button.dataset.order !== 'desc';

    reviews.sort((a, b) => {
      const ratingA = Number(a.dataset.reviewRating);
      const ratingB = Number(b.dataset.reviewRating);
      return descending ? ratingB - ratingA : ratingA - ratingB;
    });

    reviews.forEach((review) => list.appendChild(review));
    button.dataset.order = descending ? 'desc' : 'asc';
    button.textContent = descending ? 'Sort: highest first' : 'Sort: lowest first';
  });
});

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const alertBox = document.querySelector('#contact-alert');
    if (alertBox) {
      alertBox.classList.remove('d-none');
      alertBox.focus();
    }
    contactForm.reset();
  });
}
