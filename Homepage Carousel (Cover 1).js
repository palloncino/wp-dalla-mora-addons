window.addEventListener("DOMContentLoaded", function () {
  const images_array = [
    "http://localhost/dalla-mora/wp-content/uploads/2024/02/foto-7b.jpg",
    "http://localhost/dalla-mora/wp-content/uploads/2024/02/foto-2.jpg",
    "http://localhost/dalla-mora/wp-content/uploads/2024/02/foto-4.jpg",
    "http://localhost/dalla-mora/wp-content/uploads/2024/02/F3_cave.jpg",
    "http://localhost/dalla-mora/wp-content/uploads/2024/02/fote-3.jpg",
    "http://localhost/dalla-mora/wp-content/uploads/2024/02/foto-5.jpg",
    "http://localhost/dalla-mora/wp-content/uploads/2024/02/foto-7.jpg",
  ];

  let currentIndex = 0;
  let isAnimating = false; // Flag to track if animation is in progress

  const leftArrow = document.createElement("div");
  leftArrow.classList.add("arrow", "left-arrow");

  const rightArrow = document.createElement("div");
  rightArrow.classList.add("arrow", "right-arrow");

  // Append arrows to the cover section
  const coverSection = document.querySelector(".homepage-cover-1");

  coverSection.appendChild(leftArrow);
  coverSection.appendChild(rightArrow);

  // Get the image element
  let image = document.querySelector(".wp-block-cover__image-background");
  image.style.transition = "transform 0.5s"; // Adjusted transition duration

  // Add event listener for left arrow
  leftArrow.addEventListener("click", function () {
    if (!isAnimating) {
      currentIndex = currentIndex === 0 ? images_array.length - 1 : currentIndex - 1;
      switchImage(images_array[currentIndex], "right");
    }
  });

  // Add event listener for right arrow
  rightArrow.addEventListener("click", function () {
    if (!isAnimating) {
      currentIndex = currentIndex === images_array.length - 1 ? 0 : currentIndex + 1;
      switchImage(images_array[currentIndex], "left");
    }
  });

  // Function to switch image with animation
  function switchImage(src, direction) {
    isAnimating = true; // Set flag to indicate animation is in progress

    const newImage = document.createElement("img");
    newImage.src = src;
    newImage.classList.add("wp-block-cover__image-background");

    // Set initial position based on direction
    image.style.transform = direction === "left" ? "translateX(100%)" : "translateX(-100%)";
    newImage.style.transform = "translateX(0)";

    // Insert the new image before the current image
    coverSection.insertBefore(newImage, image);

    image.style.transition = "transform .5s linear"; // Adjusted transition duration
    image.style.transform = direction === "left" ? "translateX(-100%)" : "translateX(100%)";

    // Animate the transition for the new image after a brief delay
    setTimeout(function () {
      newImage.style.transition = "transform .5s linear"; // Adjusted transition duration
      newImage.style.transform = "translateX(0)";

      // Remove the old image after the transition completes
      setTimeout(function () {
        coverSection.removeChild(image);
        image = newImage; // Update image to the new one
        isAnimating = false; // Reset flag after animation completes
      }, 500); // Adjusted transition duration in milliseconds
    }, 100); // Delay for setting transition property for the new image
  }
});
