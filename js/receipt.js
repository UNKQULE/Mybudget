document.addEventListener('DOMContentLoaded', () => {
    let images = JSON.parse(localStorage.getItem('images')) || [];

    const carouselInner = document.querySelector('.carousel-inner');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const fileInput = document.getElementById('fileInput');
    const addImageButton = document.getElementById('addImageButton');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    let currentIndex = 0;

    function createSlide(imageSrc) {
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');
        slide.innerHTML = `
            <img src="${imageSrc}" alt="Слайд" onclick="openImageModal('${imageSrc}')">
            <button class="delete-receipt" onclick="deleteReceipt('${imageSrc}')">Удалить</button>
        `;
        return slide;
    }

    function loadSlides() {
        carouselInner.innerHTML = '';
        images.forEach(image => {
            const slide = createSlide(image);
            carouselInner.appendChild(slide);
        });
        updateSlides();
    }

    function updateSlides() {
        const slides = document.querySelectorAll('.carousel-item');
        slides.forEach((slide, index) => {
            slide.style.display = index === currentIndex ? 'block' : 'none';
        });
        if (slides[currentIndex]) {
            animateSlide(slides[currentIndex]);
        }
    }

    function animateSlide(slide) {
        slide.classList.add('animate');
        setTimeout(() => {
            slide.classList.remove('animate');
        }, 1000);
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateSlides();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateSlides();
    });

    addImageButton.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                images.push(imageUrl);
                localStorage.setItem('images', JSON.stringify(images));
                loadSlides();
            };
            reader.readAsDataURL(file);
        }
    });

    window.deleteReceipt = function(imageSrc) {
        images = images.filter(image => image !== imageSrc);
        localStorage.setItem('images', JSON.stringify(images));
        loadSlides();
    }

    window.openImageModal = function(imgSrc) {
        modal.style.display = 'block';
        modalImage.src = imgSrc;
    }

    window.closeImageModal = function() {
        modal.style.display = 'none';
    }

    modal.onclick = function(event) {
        if (event.target === modal) {
            closeImageModal();
        }
    }

    loadSlides();
});