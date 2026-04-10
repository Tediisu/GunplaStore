const slider = document.querySelector('.scroll-container');
let isDragging = false;
let hasMoved = false;
let startX = 0;
let scrollLeft = 0;

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    hasMoved = false;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.style.cursor = 'grabbing';
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) {
        hasMoved = true;
        slider.scrollLeft = scrollLeft - walk;
    }
});

slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.style.cursor = 'grab';
});

slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.style.cursor = 'grab';
});

slider.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (hasMoved) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
});