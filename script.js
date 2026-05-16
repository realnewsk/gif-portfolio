// Filter Logic
const filterItems = document.querySelectorAll('.filter-item');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterItems.forEach(filter => {
    filter.addEventListener('click', function() {
        // Update active class
        filterItems.forEach(item => item.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => { card.style.opacity = '1'; }, 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    });
});

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(element) {
    const imgSrc = element.querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});