gsap.registerPlugin(ScrollTrigger, SplitText);

// Select section and elements
const sixthSection = document.querySelector(".sixth-section");
const quote = sixthSection.querySelector(".book-quote p");
const bookCover = sixthSection.querySelector(".book-cover");
const bookCoverImg = sixthSection.querySelector(".book-cover img");
const sixth_links = sixthSection.querySelectorAll(".circle-link");

// Split heading text (optional – if heading text is added)
let splitQuote;
if (quote && quote.textContent.trim() !== "") {
  splitQuote = new SplitText(quote, {
    type: "chars",
    charsClass: "clip-char",
  });
  gsap.set(splitQuote.chars, { autoAlpha: 0, y: 50 });
}

// Set initial states
gsap.set(bookCover, { yPercent: -100 });
gsap.set(bookCoverImg, { yPercent: 120 });
gsap.set(sixth_links, { autoAlpha: 0, y: 30 });

// Scroll animation
ScrollTrigger.create({
  trigger: sixthSection,
  start: "top 70%",
  onEnter: () => {
    const tl = gsap.timeline().addLabel("sixth_section");

    // Animate heading text
    if (splitQuote) {
      tl.to(
        splitQuote.chars,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.03,
        },
        0
      );
    }

    // Animate book cover
    tl.to(
      bookCover,
      {
        yPercent: 0,
        duration: 2,
        ease: "power2.out",
      },
      "sixth_section+=0.1"
    ).to(
      bookCoverImg,
      {
        yPercent: 0,
        duration: 2,
        ease: "power2.out",
      },
      "sixth_section+=0.1"
    );
    // tl.to(bookCover, {
    //   autoAlpha: 1,
    //   scale: 1,
    //   duration: 1,
    //   ease: "power2.out"
    // }, "-=0.6");

    // Animate links
    tl.to(
      sixth_links,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
      },
      "sixth_section+=0.3"
    );
  },
});
