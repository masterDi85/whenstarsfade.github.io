
const track = document.getElementById("galleryTrack");
const count = document.getElementById("galleryCount");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");


/* LOAD PHOTO GALLERY */

async function loadGallery() {
  try {
    const response = await fetch("assets/photos/gallery.json");

    if (!response.ok) {
      throw new Error("Gallery file not found");
    }

    const photos = await response.json();

    if (!Array.isArray(photos) || photos.length === 0) {
      track.innerHTML = '<p class="placeholder">Photos coming soon.</p>';
      count.textContent = "0 photos";
      return;
    }

    track.innerHTML = "";

    photos.forEach(photo => {
      const slide = document.createElement("div");
      slide.className = "gallery-slide";

      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt || "When Stars Fade";
      img.loading = "lazy";

      slide.appendChild(img);
      track.appendChild(slide);
    });

    count.textContent = `${photos.length} photos`;

  } catch (error) {
    track.innerHTML =
      '<p class="placeholder">Gallery is currently unavailable.</p>';

    count.textContent = "";
    console.error("Gallery error:", error);
  }
}


/* GALLERY NAVIGATION */

document.getElementById("galleryPrev").addEventListener("click", () => {
  track.scrollBy({
    left: -track.clientWidth * 0.75,
    behavior: "smooth"
  });
});

document.getElementById("galleryNext").addEventListener("click", () => {
  track.scrollBy({
    left: track.clientWidth * 0.75,
    behavior: "smooth"
  });
});


/* LIGHTBOX */

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || "When Stars Fade photograph";

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  lightboxImage.src = "";
}


// Open photo when clicking it in gallery

track.addEventListener("click", event => {
  const img = event.target.closest(".gallery-slide img");

  if (img) {
    openLightbox(img.src, img.alt);
  }
});


// Close by clicking X

lightboxClose.addEventListener("click", closeLightbox);


// Close by clicking outside the enlarged photo

lightbox.addEventListener("click", event => {
  if (event.target !== lightboxImage) {
    closeLightbox();
  }
});


// Close with Escape key

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});


/* START */

loadGallery();
