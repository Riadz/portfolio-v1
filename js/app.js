window.onload = () => {
  // Navigation indication
  // only desktop
  // on mobile only changes header background
  if (!!window.IntersectionObserver) {
    const header = document.getElementById('header-container');

    let options = { threshold: [0.4, 0.7, 1] };

    if (window.innerWidth > 768) {
      const sections = document.querySelectorAll('section');
      const navbarIndicator = document.getElementById('navbar-indicator');

      let observer = new IntersectionObserver(updateHeader, options);

      sections.forEach(section => observer.observe(section));

      function updateHeader(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let targetId = entry.target.id;
            let targetSelector = '#header-navbar a[href="#' + targetId + '"]';
            let target = document.querySelector(targetSelector);

            let cords = target.getBoundingClientRect();

            let leftProp = cords.left;
            let topProp = cords.top + cords.height;
            let widthProp = cords.width;

            navbarIndicator.style.left = leftProp + 'px';
            navbarIndicator.style.top = topProp + 'px';
            navbarIndicator.style.width = widthProp + 'px';

            //style header if the section is the intro
            if (targetId != 'intro')
              header.classList.add('scrolled-header');
            else
              header.classList.remove('scrolled-header');
          }
        }
        );
      }
    }
    else {
      const introSection = document.getElementById('intro');

      let observer = new IntersectionObserver(updateHeader, options);

      observer.observe(introSection);

      function updateHeader(entries) {
        if (!entries[0].isIntersecting)
          header.classList.add('scrolled-header');
        else
          header.classList.remove('scrolled-header');
      }
    }
  }

  // Projects popup
  const readBtns = document.querySelectorAll('.toggle-project-popup');
  readBtns.forEach(readBtn =>
    readBtn.addEventListener(
      'click',
      () => showPopup(readBtn.dataset.target)
    )
  );

  //Mobile navigation
  document
    .getElementById('header-navbar-btn')
    .addEventListener('click', showNavbar);

  document
    .getElementById('header-navbar')
    .addEventListener('click', showNavbar);
};

function showNavbar() {
  document
    .getElementById('header-navbar')
    .classList.toggle('visible');

  document
    .getElementById('header-navbar-btn')
    .classList.toggle('navbar-btn-toggle-icons');
}

function showPopup(targetId) {
  document
    .getElementById(targetId)
    .classList.toggle('project-popup-show');

  document
    .querySelector('body')
    .classList.toggle('popup-shown');
}

// Contact form
