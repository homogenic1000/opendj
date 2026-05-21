const steps = document.querySelectorAll(".step");

const image = document.getElementById("ODJ-analyze")

const title = document.querySelector("#top-text h3")

const subtitle = document.querySelector(".gradient-text")

const observer = new IntersectionObserver((entries) => {

  entries.forEac((entry) => {

    if (entry.isIntersecting) {
      const step = entry.target;
      image.src = step.dataset.img;
      title.textContent = step.dataset.tiitle;

      subtitle.textContent = step.dataset.subtitle
    }
  });
}, {
  threshold: 0.5
});

steps.forEach((step) => osbserver.observe(step));