window.addEventListener("DOMContentLoaded", function () {
  
  // Create backdrop dark
  const backdrop1_dark = document.createElement("div");
  backdrop1_dark.classList.add("backdrop", "backdrop--dark");

  // Create backdrop light
  const backdrop2_light = document.createElement("div");
  backdrop2_light.classList.add("backdrop", "backdrop--light");

  // Select backdrop targets
  const homepage_cover_1 = document.querySelector(".homepage-cover-1");
  const homepage_cover_2 = document.querySelector(".homepage-cover-2");
  const servizi_cover_1 = document.querySelector(".servizi-cover-1");

  // Apply backdrops to covers (full screen backgrounds)

  if (homepage_cover_1) {
    homepage_cover_1.appendChild(backdrop1_dark);
  }

  if (homepage_cover_2) {
    homepage_cover_2.appendChild(backdrop2_light);
  }

  if (servizi_cover_1) {
    servizi_cover_1.appendChild(backdrop1_dark);
  }
});
