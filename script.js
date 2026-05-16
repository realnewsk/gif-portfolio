// --- 1. Automation & Quick Add Logic ---

const adminBar = document.getElementById('admin-bar');
const autoInput = document.getElementById('auto-input');
const grid = document.querySelector('.portfolio-grid');

// Toggle Admin Bar with "A" key
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'a' && e.target.tagName !== 'INPUT') {
        adminBar.style.display = adminBar.style.display === 'none' ? 'block' : 'none';
        if(adminBar.style.display === 'block') autoInput.focus();
    }
});

autoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const val = this.value;
        if (!val) return;

        // 1. Extract URL
        const urlMatch = val.match(/\bhttps?:\/\/\S+/gi);
        const url = urlMatch ? urlMatch[0] : "";

        // 2. Extract Hashtags (The Categories)
        const tags = val.match(/#(\w+)/g) || [];
        const cat1 = tags[0] ? tags[0].replace('#', '').toLowerCase() : "ui"; // fallback
        const cat2 = tags[1] ? tags[1].replace('#', '').toLowerCase() : "others";

        // 3. Extract Title (Everything else)
        let title = val.replace(url, '').replace(/#(\w+)/g, '').trim();
        if (!title) title = "New Artwork";

        if (url) {
            addCardToGrid(url, title, cat1, cat2);
            this.value = ""; // Clear input
            adminBar.style.display = 'none'; // Hide bar
        }
    }
});

function addCardToGrid(url, title, category, subtext) {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.setAttribute('data-category', category);
    
    card.innerHTML = `
        <div class="card-inner" onclick="openLightbox(this)">
            <img src="${url}" alt="${title}">
            <div class="card-overlay">
                <h3>${title}</h3>
                <p>${subtext}</p>
            </div>
        </div>
    `;

    // Add to the beginning of the grid
    grid.prepend(card);
}


// --- 2. Existing Filter Logic (Modified for dynamic items) ---

document.querySelector('.filters').addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-item')) {
        const filterValue = e.target.getAttribute('data-filter');
        
        // Update Active Class
        document.querySelectorAll('.filter-item').forEach(li => li.classList.remove('active'));
        e.target.classList.add('active');

        // Filter Cards
        document.querySelectorAll('.portfolio-card').forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (filterValue === 'all' || cardCat === filterValue) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    }
});


// --- 3. Lightbox Logic ---

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(element) {
    const imgSrc = element.querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}
