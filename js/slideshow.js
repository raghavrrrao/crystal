export async function showSlideshow() {
    const featuresModal = new bootstrap.Modal(document.getElementById('featuresModal'));
    const slideshowContainer = document.getElementById('slideshow-container');

    const baseImagePath = 'images/slide';
    const imageExtensions = ['.jpeg', '.jpg', '.png', '.webp'];
    const maxAttempts = 65;

    const loadImage = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => resolve(null);
            img.src = url;
        });
    };

    const loadAllImages = async () => {
        const existingImages = [];
        for (let i = 1; i <= maxAttempts; i++) {
            for (const ext of imageExtensions) {
                const url = `${baseImagePath}${i}${ext}`;
                const result = await loadImage(url);
                if (result) {
                    existingImages.push(result);
                    break;
                }
            }
        }
        return existingImages;
    };

    const images = await loadAllImages();

    if (images.length === 0) {
        slideshowContainer.innerHTML = '<p>No images found.</p>';
        return;
    }

    let slidesHTML = '<div class="slideshow">';
    images.forEach((src, index) => {
        slidesHTML += `
            <div class="slide${index === 0 ? ' active' : ''}">
                <img src="${src}" loading="lazy" alt="Feature ${index + 1}">
            </div>
        `;
    });
    slidesHTML += '</div>';

    slidesHTML += `
        <div class="slideshow-controls">
            <button class="prev-slide">Previous</button>
            <span class="current-feature">Feature 1 of ${images.length}</span>
            <button class="next-slide">Next</button>
        </div>
    `;

    slideshowContainer.innerHTML = slidesHTML;
    featuresModal.show();

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const currentFeatureDisplay = document.querySelector('.current-feature');

    function updateSlide() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        currentFeatureDisplay.textContent = `Feature ${currentSlide + 1} of ${slides.length}`;
    }

    document.querySelector('.next-slide')?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    });

    document.querySelector('.prev-slide')?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    });

    document.addEventListener('keydown', (e) => {
        if (featuresModal._isShown) {
            if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlide();
            } else if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateSlide();
            }
        }
    });
}
