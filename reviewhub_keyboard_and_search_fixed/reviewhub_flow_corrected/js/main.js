function getStoredList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function saveStoredItem(key, item) {
  const list = getStoredList(key);
  list.unshift(item);
  localStorage.setItem(key, JSON.stringify(list.slice(0, 20)));
}

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/* Reveal result sections by clicking a button */
document.querySelectorAll('[data-reveal-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.revealTarget);

    if (!target) return;

    target.classList.remove('d-none');
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

/* Search forms work with both mouse click and Enter key */
document.querySelectorAll('form[data-reveal-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const target = document.querySelector(form.dataset.revealForm);

    if (!target) return;

    target.classList.remove('d-none');
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

/* Star rating interaction */
document.querySelectorAll('[data-rating-group]').forEach((group) => {
  const stars = [...group.querySelectorAll('button')];

  stars.forEach((button, index) => {
    button.addEventListener('click', () => {
      stars.forEach((star, i) => {
        star.classList.toggle('active', i <= index);
      });
    });
  });
});

/* Sort review cards */
document.querySelectorAll('[data-sort-reviews]').forEach((button) => {
  button.addEventListener('click', () => {
    const list = document.querySelector(button.dataset.sortReviews);

    if (!list) return;

    const reviews = [...list.querySelectorAll('[data-review-rating]')];
    const desc = button.dataset.order !== 'desc';

    reviews.sort((a, b) => {
      const ratingA = Number(a.dataset.reviewRating);
      const ratingB = Number(b.dataset.reviewRating);

      return desc ? ratingB - ratingA : ratingA - ratingB;
    });

    reviews.forEach((review) => {
      list.appendChild(review);
    });

    button.dataset.order = desc ? 'desc' : 'asc';
    button.textContent = desc ? 'Sort: highest first' : 'Sort: lowest first';
  });
});

function avgStars(form) {
  const groups = [...form.querySelectorAll('[data-rating-group]')];

  if (!groups.length) return 4;

  const values = groups.map((group) => {
    return group.querySelectorAll('button.active').length || 0;
  });

  const average = values.reduce((a, b) => a + b, 0) / values.length;

  return Math.max(1, Math.round(average));
}

function handleReviewSubmit(button) {
  const form = button.closest('form');
  const textarea = form ? form.querySelector('textarea') : null;

  const text = textarea && textarea.value.trim()
    ? textarea.value.trim()
    : 'No written review was provided.';

  const isProgramme = location.pathname.includes('programme');
  const key = isProgramme
    ? 'vero_programme_reviews'
    : 'vero_professor_reviews';

  const rating = form ? avgStars(form) : 4;

  saveStoredItem(key, {
    title: isProgramme ? 'New programme review' : 'New professor review',
    rating,
    text,
    date: new Date().toLocaleDateString()
  });

  window.location.href = `submitted.html?type=${isProgramme ? 'programme-review' : 'professor-review'}`;
}

function handleRegisterSubmit(button) {
  const label = button.textContent.toLowerCase();
  let type = 'register';

  if (label.includes('school')) {
    type = 'register-school';
  }

  if (label.includes('professor')) {
    type = 'register-professor';
  }

  if (label.includes('programme') || label.includes('program')) {
    type = 'register-programme';
  }

  window.location.href = `submitted.html?type=${type}`;
}

/* Submit buttons */
document.querySelectorAll('button').forEach((button) => {
  const label = button.textContent.trim().toLowerCase();

  if (label.includes('submit review')) {
    button.addEventListener('click', () => {
      handleReviewSubmit(button);
    });
  }

  if (
    label.includes('submit school') ||
    label.includes('submit professor') ||
    label.includes('submit programme') ||
    label.includes('submit program')
  ) {
    button.addEventListener('click', () => {
      handleRegisterSubmit(button);
    });
  }
});

function renderSavedReviews(key, selector) {
  const container = document.querySelector(selector);

  if (!container) return;

  getStoredList(key).forEach((review) => {
    const article = document.createElement('article');

    article.className = 'panel p-3 mb-3 submission-note';
    article.dataset.reviewRating = review.rating || 4;

    article.innerHTML = `
      <h3 class="h5">
        ${esc(review.title)}
        <span class="new-review-badge">submitted</span>
      </h3>
      <p class="mb-1">
        Rating: ${esc(review.rating || 4)}/5 · ${esc(review.date || '')}
      </p>
      <p class="mb-0">${esc(review.text)}</p>
    `;

    container.prepend(article);
  });
}

renderSavedReviews('vero_professor_reviews', '#professor-review-list');
renderSavedReviews('vero_programme_reviews', '#programme-review-list');

function configureSubmittedPage() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');

  const title = document.querySelector('#submitted-title');
  const msg = document.querySelector('#submitted-message');
  const primary = document.querySelector('#submitted-primary-link');

  if (!title || !msg || !primary) return;

  const map = {
    'professor-review': [
      'Professor review submitted',
      'Your professor review has been saved in this browser and will appear on the professor profile page.',
      'professor-detail.html',
      'View professor profile'
    ],
    'programme-review': [
      'Programme review submitted',
      'Your programme review has been saved in this browser and will appear on the programme profile page.',
      'programme-detail.html',
      'View programme profile'
    ],
    'register-school': [
      'School submitted',
      'The school registration form has been submitted successfully for this prototype.',
      'school-search.html',
      'Back to school search'
    ],
    'register-professor': [
      'Professor submitted',
      'The professor registration form has been submitted successfully for this prototype.',
      'professors.html',
      'Back to professor search'
    ],
    'register-programme': [
      'Programme submitted',
      'The programme registration form has been submitted successfully for this prototype.',
      'programmes.html',
      'Back to programme search'
    ]
  };

  const selected = map[type] || [
    'Submitted',
    'Your information has been submitted successfully.',
    'index.html',
    'Back to Home'
  ];

  title.textContent = selected[0];
  msg.textContent = selected[1];
  primary.href = selected[2];
  primary.textContent = selected[3];
}

configureSubmittedPage();

/* Contact form feedback */
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