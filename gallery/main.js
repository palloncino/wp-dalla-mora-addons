const ITEMS_PER_LOAD = 9;
const array = [
  // Images
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-1.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-2-1.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-3-1.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-4.jpeg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-5-1.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-1.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-2.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-3.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-4.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-6.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-7.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-8-1.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-9.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-10.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-11.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-5.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-6.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-7.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-8.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-9.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-12.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-13.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-14.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-15.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-16-1.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-17.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-10.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-11.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-12.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-13.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-18.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-19.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-20.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-21.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-22.jpg",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-23.png",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-14.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-15.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-16.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/03/lavori-17.mp4"
];

document.addEventListener("DOMContentLoaded", function () {
  if (!document.body.classList.contains('page-id-235')) {
    return;
  }
  const galleryGridContainer = document.querySelector(".gallery-grid-container");
  const previewContainer = document.querySelector(".preview-container");
  const previewContent = document.querySelector(".preview-content");
  const backdrop = document.querySelector(".backdrop");
  
  // Add the Load More button
  const loadMoreBtn = document.createElement("button");
  const loadMoreBtnContainer = document.createElement("div");
  loadMoreBtn.innerText = "Load More";
  loadMoreBtn.className = "load-more-btn";
  loadMoreBtnContainer.className = "load-more-btn-container";
  loadMoreBtnContainer.appendChild(loadMoreBtn);
  galleryGridContainer.insertAdjacentElement('afterend', loadMoreBtnContainer);

  let currentIndex = 0;

  function loadMedia() {
    const maxIndex = currentIndex + ITEMS_PER_LOAD;
    for (let i = currentIndex; i < maxIndex && i < array.length; i++) {
      const url = array[i];
      const imgBox = document.createElement("div");
      imgBox.classList.add("img-box");

      if (url.endsWith(".mp4")) {
        generateThumbnail(url)
        .then((thumbnailUrl) => {
          imgBox.style.backgroundImage = `url(${thumbnailUrl})`; // Set generated thumbnail
        })
        .catch((error) => {
          console.error("Error generating thumbnail:", error);
          imgBox.style.backgroundImage = `url(${videoPlaceholder})`; // Set default thumbnail
        });

      // Create overlay element
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      overlay.innerHTML =
        '<img height="50" src="http://www.gruppodallamora.it/wp-content/uploads/2024/03/play_14441317.png" alt="Play Video" />';
      imgBox.appendChild(overlay);
      } else {
        imgBox.style.backgroundImage = `url(${url})`; // Set image
      }

      imgBox.style.backgroundSize = "cover";
      imgBox.style.backgroundPosition = "center";
      galleryGridContainer.appendChild(imgBox);

      imgBox.addEventListener("click", function () {
        // Check if the URL is for an MP4 or MOV video
      if (url.endsWith(".mp4") || url.endsWith(".mov")) {
        // Assuming modern browsers that can play .mov files with 'video/mp4' MIME type
        // If precise MIME type is needed, add a condition to switch between 'video/mp4' and 'video/quicktime'
        const videoType = url.endsWith(".mov") ? "video/quicktime" : "video/mp4";
        previewContent.innerHTML = `<video controls autoplay style="width: 100%;"><source src="${url}" type="${videoType}"></video>`;
      } else {
        // Handle images
        previewContent.innerHTML = `<img src="${url}" style="max-width: 100%; max-height: 100%;">`;
      }
      previewContainer.style.display = "block";
      backdrop.style.display = "block";
      });
    }
    currentIndex = maxIndex; // Update currentIndex for the next load
    if (currentIndex >= array.length) {
      loadMoreBtn.style.display = "none"; // Hide Load More button if all items are loaded
    }
  }

  loadMedia(); // Initially load the first set of media items

  loadMoreBtn.addEventListener("click", loadMedia);

  backdrop.addEventListener("click", function () {
    previewContainer.style.display = "none";
    backdrop.style.display = "none";
    previewContent.innerHTML = ""; // Clear content
  });

  function generateThumbnail(videoUrl) {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous"; // To avoid CORS issues
      video.src = videoUrl;
      video.preload = "metadata";

      video.onloadedmetadata = function () {
        this.currentTime = Math.min(1, this.duration / 2); // Capture frame at half duration
        this.onseeked = function () {
          const canvas = document.createElement("canvas");
          canvas.width = this.videoWidth;
          canvas.height = this.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL("image/jpeg");
          resolve(thumbnailUrl);
          video.removeEventListener("seeked", this.onseeked);
        };
      };

      video.onerror = function () {
        reject(new Error("Failed to load video"));
      };

      video.load();
    });
  }
});