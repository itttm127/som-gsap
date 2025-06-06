gsap.registerPlugin(ScrollTrigger, SplitText);

// Target only the third section
const third_section = document.querySelector(".third-section");
const third_outer = third_section.querySelector(".outer");
const third_inner = third_section.querySelector(".inner");
const third_heading = third_section.querySelector(".book-quote p");
const third_bg = third_section.querySelector(".book-cover img");
const third_price = third_section.querySelector(".book-price ");

const third_splitHeading = new SplitText(third_heading, {
  type: "chars,words,lines",
  linesClass: "clip-text",
});

// Set initial state: push it down and hide it
gsap.set(third_section, { autoAlpha: 0 });
gsap.set(third_outer, { yPercent: 100 });
gsap.set(third_inner, { yPercent: -100 });

ScrollTrigger.create({
  trigger: third_section,
  start: "top bottom", // when top of section hits bottom of viewport
  end: "top center", // optional
  scrub: 2, // enables scroll-synced animation
  onUpdate: (self) => {
    if (self.progress > 0 && self.progress < 1) {
      gsap.to(third_section, { autoAlpha: 1, overwrite: true });
    }
  },
  onEnter: () => third_animateIn(),
  onEnterBack: () => third_animateIn(),
});

function third_animateIn() {
  const tl = gsap.timeline();

  gsap.fromTo(
    third_section,
    { autoAlpha: 0, yPercent: 100 },
    { autoAlpha: 1, yPercent: 0, duration: 1.5, ease: "none" }
  );

  tl.addLabel("third_section")
    .fromTo(
      third_splitHeading.chars,
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
      "third_section+=0.1"
    )
    .fromTo(
      third_bg,
      { yPercent: 15 },
      { yPercent: 0, duration: 2, ease: "power2" },
      "third_section+=0.2"
    )
    .fromTo(
      third_price,
      { xPercent: 105, rotate: "360deg" },
      { xPercent: 0, rotate: 0, duration: 2 },
      "third_section+=0.2"
    );
}
