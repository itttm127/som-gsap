gsap.registerPlugin(ScrollTrigger, SplitText);

// Target elements
const fifthSection = document.querySelector(".fifth-section");
const authorImage = fifthSection.querySelector(".author-image");
const authorName = fifthSection.querySelector(".author-name");
const divider = fifthSection.querySelector(".divider");
const authorBio = fifthSection.querySelector(".author-bio");
const prefaceHeading = fifthSection.querySelector(".book-quote p");
const prefaceText = fifthSection.querySelector(".preface-text");

// Split the text
const headingSplit = new SplitText(prefaceHeading, {
  type: "chars",
  charsClass: "clip-char"
});

const prefaceSplit = new SplitText(prefaceText, {
  type: "lines",
  linesClass: "clip-line"
});

// Initial state
gsap.set([authorImage, authorName, divider, authorBio], { autoAlpha: 0, x: -50 });
gsap.set(headingSplit.chars, { autoAlpha: 0, y: 50 });
gsap.set(prefaceSplit.lines, { autoAlpha: 0, y: 30 });

// Animation timeline
ScrollTrigger.create({
  trigger: fifthSection,
  start: "top 70%",
  onEnter: () => {
    const tl = gsap.timeline();

    tl.to(headingSplit.chars, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.02
    }, 0)

    .to([authorImage, authorName, divider, authorBio], {
      autoAlpha: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1
    }, "-=0.6")

    .to(prefaceSplit.lines, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.05
    }, "-=0.4");
  }
});
