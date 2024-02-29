const array = [
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/CAVE_cover.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/CAVE_cover.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/WhatsApp-Video-2023-12-21-at-09.08.27.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/CAVE_cover.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/CAVE_cover.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/WhatsApp-Video-2023-12-21-at-09.08.27.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/CAVE_cover.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/CAVE_cover.jpg"
];

// Assuming this is your video placeholder
const videoPlaceholder = "./video-thumbnail.png";

document.addEventListener("DOMContentLoaded", function() {
  const galleryGridContainer = document.querySelector('.gallery-grid-container');
  const backdrop = document.querySelector('.backdrop');
  const previewContainer = document.querySelector('.preview-container');
  const previewContent = document.querySelector('.preview-content');

  array.forEach(url => {
    const imgBox = document.createElement('div');
    imgBox.classList.add('img-box');

    // Check if the URL is for a video or an image
    if (url.endsWith('.mp4')) {
      imgBox.style.backgroundImage = `url(${videoPlaceholder})`; // Set video placeholder
    } else {
      imgBox.style.backgroundImage = `url(${url})`; // Set image
    }

    imgBox.style.backgroundSize = 'cover';
    imgBox.style.backgroundPosition = 'center';

    imgBox.addEventListener('click', function() {
      if (url.endsWith('.mp4')) {
        previewContent.innerHTML = `<video src="${url}" controls autoplay></video>`;
      } else {
        previewContent.innerHTML = `<img src="${url}" alt="Preview Image">`;
      }
      backdrop.style.display = 'block';
      previewContainer.style.display = 'block';
    });

    galleryGridContainer.appendChild(imgBox);
  });

  backdrop.addEventListener('click', function() {
    backdrop.style.display = 'none';
    previewContainer.style.display = 'none';
    previewContent.innerHTML = '';
  });
});
