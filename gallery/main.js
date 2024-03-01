const array = [
  "./video-1.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/cover-civile-1536x570.png",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/cave-1024x768.jpeg",
  "./video-2.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/cave-1536x1152.jpeg",
  "./video-1.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/cover-civile-1536x570.png",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/cave-1024x768.jpeg",
  "./video-2.mp4",
  "http://www.gruppodallamora.it/wp-content/uploads/2024/02/cave-1536x1152.jpeg",
];

document.addEventListener("DOMContentLoaded", function () {
	if (!document.body.classList.contains('page-id-235')) {
		return;
	}
  const galleryGridContainer = document.querySelector(".gallery-grid-container");
  const previewContainer = document.querySelector(".preview-container");
  const previewContent = document.querySelector(".preview-content");
  const backdrop = document.querySelector(".backdrop");

  array.forEach((url) => {
    const imgBox = document.createElement("div");
    imgBox.classList.add("img-box");

    // Check if the URL is for a video or an image
    if (url.endsWith(".mp4")) {
      // Generate thumbnail on the fly
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
      overlay.innerHTML = '<img height="50" src="http://www.gruppodallamora.it/wp-content/uploads/2024/02/video_11383324.png" alt="video" />';
      imgBox.appendChild(overlay);
    } else {
      imgBox.style.backgroundImage = `url(${url})`; // Set image
    }

    imgBox.style.backgroundSize = "cover";
    imgBox.style.backgroundPosition = "center";
    galleryGridContainer.appendChild(imgBox);

    imgBox.addEventListener("click", function () {
      if (url.endsWith(".mp4")) {
        previewContent.innerHTML = `<video controls autoplay style="width: 100%;"><source src="${url}" type="video/mp4"></video>`;
      } else {
        previewContent.innerHTML = `<img src="${url}" style="max-width: 100%; max-height: 100%;">`;
      }
      previewContainer.style.display = "block";
      backdrop.style.display = "block";
    });
});


  // Close preview when clicking backdrop
  backdrop.addEventListener("click", function () {
    previewContainer.style.display = "none";
    backdrop.style.display = "none";
    previewContent.innerHTML = ""; // Clear content
  });

  // Function to generate thumbnail from video
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
