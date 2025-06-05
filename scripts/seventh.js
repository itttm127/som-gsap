gsap.registerPlugin(ScrollTrigger, SplitText);

// Target elements
const seventhSection = document.querySelector(".seventh-section");
const headline = seventhSection.querySelector(".book-quote p");
const description = seventhSection.querySelector(".description");
const circles = seventhSection.querySelectorAll(".circle-item");
const signIn = seventhSection.querySelector(".sign-in");

// Optional SplitText animation for headline
const splitHeadline = new SplitText(headline, {
  type: "chars,words,lines",
  charsClass: "clip-char",
});

// Initial states
gsap.set(splitHeadline.chars, { autoAlpha: 0, y: 50 });
gsap.set(description, { autoAlpha: 0, y: 40 });
gsap.set(circles, { autoAlpha: 0, scale: 0.8 });
gsap.set(signIn, { autoAlpha: 0, y: 30 });

// ScrollTrigger animation
ScrollTrigger.create({
  trigger: seventhSection,
  start: "top 75%",
  onEnter: () => {
    const tl = gsap.timeline();

    // Animate headline
    tl.fromTo(
      splitHeadline.chars,
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
      0.1
    );

    // Animate description
    tl.to(
      description,
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "+=0.1"
    );

    // Animate circle items
    tl.to(
      circles,
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
      },
      "+=0.2"
    );

    // Animate sign-in
    tl.to(
      signIn,
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "+=0.3"
    );
  },
});
