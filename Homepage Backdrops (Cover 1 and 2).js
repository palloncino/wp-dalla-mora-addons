window.addEventListener("DOMContentLoaded", function () {
  const coverSection1 = document.querySelector(".homepage-cover-1");
  const backdrop1_dark = document.createElement("div");
  if (coverSection1) {
    backdrop1_dark.classList.add("backdrop", "backdrop--dark");
    coverSection1.appendChild(backdrop1_dark);
  }
  const coverSection2 = document.querySelector(".homepage-cover-2");
	console.log(1, {coverSection2})
  const backdrop2_light = document.createElement("div");
  if (coverSection2) {
	  	console.log(2, {backdrop2_light, coverSection2})
    backdrop2_light.classList.add("backdrop", "backdrop--light");
    coverSection2.appendChild(backdrop2_light);
  }
});
