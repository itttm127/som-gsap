gsap.registerPlugin(ScrollTrigger, Observer, SplitText);

const second_section = document.querySelector(".second-section");
const second_outer = second_section.querySelector(".outer");
const second_inner = second_section.querySelector(".inner");
const second_heading = second_section.querySelector(".book-quote p");
const second_bg = second_section.querySelector(".book-cover img");
const second_price = second_section.querySelector(".book-price");

const second_splitHeading = new SplitText(second_heading, {
  type: "chars,words,lines",
  linesClass: "clip-text",
});

// Initial state
gsap.set(second_section, { autoAlpha: 0 });
gsap.set(second_outer, { yPercent: 100 });
gsap.set(second_inner, { yPercent: -100 });

let currentDirection = 1;

// Detect scroll direction only
Observer.create({
  type: "wheel,touch,pointer",
  onUp: () => (currentDirection = -1),
  onDown: () => (currentDirection = 1),
  tolerance: 10,
  preventDefault: false,
});

// ScrollTrigger that triggers every time section enters view
ScrollTrigger.create({
  trigger: second_section,
  start: "top 75%",
  end: "bottom 25%",
  onEnter: () => second_animateIn(currentDirection),
  onEnterBack: () => second_animateIn(currentDirection),
});

function second_animateIn(direction) {
  const d = direction === -1 ? -1 : 1;
  const tl = gsap.timeline();

  gsap.fromTo(
    second_section,
    { autoAlpha: 0, yPercent: 50 * d },
    {
      autoAlpha: 1,
      yPercent: direction === -1 ? 25 : -25,
      duration: 2,
      ease: "power2",
    }
  );

  tl.addLabel("start")
    .fromTo(
      second_splitHeading.chars,
      { autoAlpha: 0, yPercent: 150 * d },
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
      "start+=0.1"
    )
    .fromTo(
      second_bg,
      { yPercent: 15 * d },
      { yPercent: 0, duration: 2, ease: "power2" },
      "start+=0.2"
    )
    .fromTo(
      second_price,
      { xPercent: 105, rotate: "360deg" },
      { xPercent: 0, rotate: 0, duration: 2 },
      "start+=0.2"
    );
}
