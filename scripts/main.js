gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  MotionPathPlugin,
  Observer,
  SplitText
);

gsap.to(".wave-img", {
  y: 200,
  ease: "none",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

gsap.to(".wave-img", {
  y: "+=10",
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

// ☀️ Sun rise
gsap.fromTo(
  ".sun-img",
  { y: 100, opacity: 0 },
  {
    y: -555,
    opacity: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "body",
      start: "0% top",
      end: "30% top",
      scrub: true,
    },
  }
);

// 🌊 Waves fade out later
gsap.to(".wave-img", {
  y: -150,
  opacity: 0,
  ease: "power1.out",
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onLeave: () => {
      gsap.to("#animation-section", { autoAlpha: 0, duration: 0.3 });
    },
  },
});

// 🐟 Fish appears after sun
gsap.fromTo(
  ".fish-img",
  { y: 300, opacity: 0 },
  {
    y: -250,
    opacity: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "body",
      start: "30% top",
      end: "60% top",
      scrub: true,
    },
  }
);

// ☁️ Cloud appears last
gsap.fromTo(
  ".cloud-img",
  { y: 400, opacity: 0 },
  {
    y: -200,
    opacity: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "body",
      start: "30% top",
      end: "60% top",
      scrub: true,
    },
  }
);

// Get DOM elements
let sections = gsap.utils.toArray("section"),
  images = gsap.utils.toArray(".book-cover img"),
  quotes = gsap.utils.toArray(".book-quote p"),
  outerWrappers = quotes,
  innerWrappers = quotes,
  splitHeadings = quotes.map(
    (q) =>
      new SplitText(q, {
        type: "chars,words,lines",
        linesClass: "clip-text",
      })
  ),
  currentIndex = -1,
  wrap = gsap.utils.wrap(0, sections.length),
  animating;

//   Menu Animation
const ham = document.querySelector(".hamburger");
const menu = document.querySelector("ul.nav-links");
const links = menu.querySelectorAll("li");

var tl = gsap.timeline({ paused: true, reversed: true });

tl.to(menu, {
  duration: 1,
  opacity: 1,
  height: "30vh", // change this to 100vh for full-height menu
  ease: "expo.inOut",
});
tl.from(
  links,
  {
    duration: 1,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: "expo.inOut",
  },
  "-=0.5"
);

tl.reverse();

ham.addEventListener("click", () => {
  tl.reversed(!tl.reversed());
  if (ham.classList.contains("is-active")) {
    ham.classList.remove("is-active");
  } else {
    ham.classList.add("is-active");
  }
});
//   Menu Animation End

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });

      const index = sections.indexOf(target);
      if (index !== -1) {
        setTimeout(() => animateSection(index, 1), 500);
      }
    }
  });
});
