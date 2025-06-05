gsap.registerPlugin(ScrollTrigger, SplitText);

// Select elements
const fourth_section = document.querySelector(".fourth-section");
const fourth_outer = fourth_section.querySelector(".outer");
const fourth_inner = fourth_section.querySelector(".inner");
const fourth_heading = fourth_section.querySelector(".book-quote p");
const fourth_slides = fourth_section.querySelector(".slides");
const fourth_slideItems = fourth_section.querySelectorAll(".slide_item");
const fourth_slide_descriptions = fourth_section.querySelector(
  ".slide_item .description p"
);

const fourth_splitHeading = new SplitText(fourth_heading, {
  type: "chars,words,lines",
  linesClass: "clip-text",
});

const fourth_slide_description = new SplitText(fourth_slide_descriptions, {
  type: "lines",
  linesClass: "clip-text",
});

// Set states
gsap.set(fourth_section, { autoAlpha: 0 });
gsap.set(fourth_outer, { yPercent: 100 });
gsap.set(fourth_inner, { yPercent: -100 });

// Reveal heading on scroll
ScrollTrigger.create({
  trigger: fourth_section,
  start: "top bottom",
  end: "top center",
  scrub: 2,
  onUpdate: (self) => {
    if (self.progress > 0 && self.progress < 1) {
      gsap.to(fourth_section, { autoAlpha: 1, overwrite: true });
    }
  },
  onEnter: () => fourth_animateIn(),
  onEnterBack: () => fourth_animateIn(),
});

function fourth_animateIn() {
  const tl = gsap.timeline();
  gsap.set(fourth_section, { autoAlpha: 1 });

  tl.addLabel("fourth_section").fromTo(
    fourth_splitHeading.chars,
    { autoAlpha: 0, yPercent: 150 },
    {
      autoAlpha: 1,
      yPercent: 0,
      duration: 1,
      ease: "power2",
      stagger: {
        each: 0.02,
        from: "random",
      },
    },
    "fourth_section+=0.1"
  );
}

// --- Horizontal scroll for slides in sets of 3 ---

const groups = Math.ceil(fourth_slideItems.length / 3);
const slideWidth = fourth_slideItems[0].offsetWidth; // assuming fixed width
const totalScrollWidth = slideWidth * fourth_slideItems.length;

// Animate slides by `x`
gsap.to(fourth_slides, {
  x: () => `-${slideWidth * 3 * (groups - 1)}px`, // move 3 at a time
  ease: "none",
  scrollTrigger: {
    trigger: fourth_section,
    start: "top top",
    end: () => `+=${window.innerHeight * groups}`, // each group takes a screen height
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

// === Hover Animation for Description Lines ===
document.querySelectorAll(".slide_item").forEach((item) => {
  const p = item.querySelector(".description p");
  if (!p) return;

  const split = new SplitText(p, {
    type: "lines",
    linesClass: "clip-line",
  });

  // Hide all lines initially
  gsap.set(split.lines, { autoAlpha: 0, y: 30 });

  item.addEventListener("mouseenter", () => {
    gsap.to(split.lines, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(split.lines, {
      autoAlpha: 0,
      y: 30,
      duration: 0.3,
      stagger: 0.1,
    });
  });
});
