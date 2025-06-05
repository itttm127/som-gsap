gsap.registerPlugin(ScrollTrigger, SplitText);

// Target only the second section
const second_section = document.querySelector(".second-section");
const second_outer = second_section.querySelector(".outer");
const second_inner = second_section.querySelector(".inner");
const second_heading = second_section.querySelector(".book-quote p");
const second_bg = second_section.querySelector(".book-cover img");
const second_price = second_section.querySelector(".book-price ");

const second_splitHeading = new SplitText(second_heading, {
  type: "chars,words,lines",
  linesClass: "clip-text",
});

// Set initial state: push it down and hide it
gsap.set(second_section, { autoAlpha: 0 });
gsap.set(second_outer, { yPercent: 100 });
gsap.set(second_inner, { yPercent: -100 });

ScrollTrigger.create({
  trigger: second_section,
  start: "top bottom", // when top of section hits bottom of viewport
  end: "top center", // optional
  scrub: 2, // enables scroll-synced animation
  onUpdate: (self) => {
    if (self.progress > 0 && self.progress < 1) {
      gsap.to(second_section, { autoAlpha: 1, overwrite: true });
    }
  },
  onEnter: () => second_animateIn(),
  onEnterBack: () => second_animateIn(),
});

function second_animateIn() {
  const tl = gsap.timeline();

  gsap.set(second_section, { autoAlpha: 1 });
  tl.addLabel("second_section")
    .fromTo(
      second_splitHeading.chars,
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
      "second_section+=0.1"
    )
    .fromTo(
      second_bg,
      { yPercent: 15 },
      { yPercent: 0, duration: 2, ease: "power2" },
      "second_section+=0.2"
    )
    .fromTo(
      second_price,
      { xPercent: 105, rotate: "360deg" },
      { xPercent: 0, rotate: 0, duration: 2 },
      "second_section+=0.2"
    );
}
