/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 100,
         reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 200 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 20 });


let lastX = 0;
let lastY = 0;
let lastTime = performance.now();

document.addEventListener("mousemove", (e) => {
    const now = performance.now();
    const timeDiff = now - lastTime; // in ms

    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;

    // Scale movement based on speed and direction
    const velocityScale = 1.5; // tweak this value for sensitivity
    const moveX = (deltaX / timeDiff) * velocityScale;
    const moveY = (deltaY / timeDiff) * velocityScale;

    const image1 = document.getElementById("circleUpper");
    const image2 = document.getElementById("circleLower");

    if (Math.abs(moveX)<15 && Math.abs(moveY) <15){
        image1.style.transform = `translate(${moveX}px, ${moveY}px)`;
        image2.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = now;
});

const element = document.getElementById('typing');
const words = ['Computer Engineer.', 'Developer', 'Full Stack Developer.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let delay = 100;

function type() {
  const current = words[wordIndex % words.length];

  if (isDeleting) {
    charIndex--;
    element.textContent = current.substring(0, charIndex);
  } else {
    charIndex++;
    element.textContent = current.substring(0, charIndex);
  }

  // If the word is NOT the "Developer" (mistype) word,
  // pause at the end before deleting
  if (!isDeleting && charIndex === current.length) {
    if (current !== 'Developer') {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 1000); // 1 second pause for normal words
      return;
    } else {
      // For "Develo", no pause, start deleting immediately
      isDeleting = true;
    }
  }

  // If deleting and word fully erased
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(type, isDeleting ? 60 : delay);
}

type();


// === DARK MODE TOGGLE ===
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
localStorage.setItem('theme', 'dark');
// Load theme preference from localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  themeIcon.classList.remove('bx-moon');
  themeIcon.classList.add('bx-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // Toggle icon
  if (document.body.classList.contains('dark-theme')) {
    themeIcon.classList.remove('bx-moon');
    themeIcon.classList.add('bx-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('bx-sun');
    themeIcon.classList.add('bx-moon');
    localStorage.setItem('theme', 'light');
  }
});
