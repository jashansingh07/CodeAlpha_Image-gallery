// Filter functionality
document.querySelectorAll('.filters button').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  };
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const downloadLink = document.getElementById('download-link');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIdx = 0;
let zoomLevel = 1;

function openLightbox(idx) {
  currentIdx = idx;
  zoomLevel = 1;
  const img = galleryItems[idx].querySelector('img');
  const caption = galleryItems[idx].querySelector('.caption').innerText;
  lightboxImg.src = img.src;
  lightboxImg.style.transform = '';
  lightboxCaption.textContent = caption;
  downloadLink.href = img.src;
  lightbox.classList.add('open');
}
function closeLightbox() {
  lightbox.classList.remove('open');
}
function showNext() { openLightbox((currentIdx+1)%galleryItems.length);}
function showPrev() { openLightbox((currentIdx-1+galleryItems.length)%galleryItems.length);}
function zoomIn() {
  zoomLevel += 0.15;
  lightboxImg.style.transform = `scale(${zoomLevel})`;
}
function zoomOut() {
  zoomLevel = Math.max(1, zoomLevel-0.15);
  lightboxImg.style.transform = `scale(${zoomLevel})`;
}
function toggleFullscreen() {
  if (lightboxImg.requestFullscreen) lightboxImg.requestFullscreen();
  else if (lightboxImg.webkitRequestFullscreen) lightboxImg.webkitRequestFullscreen();
  else if (lightboxImg.msRequestFullscreen) lightboxImg.msRequestFullscreen();
}

// Open lightbox on click
galleryItems.forEach((item, idx) => {
  item.querySelector('img').onclick = () => openLightbox(idx);
});

// Lightbox controls
document.querySelector('.lightbox .close').onclick = closeLightbox;
document.getElementById('next-btn').onclick = showNext;
document.getElementById('prev-btn').onclick = showPrev;
document.getElementById('zoom-in-btn').onclick = zoomIn;
document.getElementById('zoom-out-btn').onclick = zoomOut;
document.getElementById('fullscreen-btn').onclick = toggleFullscreen;

// Close on backdrop click
lightbox.onclick = function(e) {
  if (e.target === this) closeLightbox();
};
// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === "ArrowRight") showNext();
  else if (e.key === "ArrowLeft") showPrev();
  else if (e.key === "Escape") closeLightbox();
});
