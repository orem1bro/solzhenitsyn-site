const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <span class="close-modal">&times;</span>
    <img class="modal-content" id="modal-img">
    <div class="modal-caption" id="modal-caption"></div>
`;
document.body.appendChild(modal);

const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('modal-caption');
const closeModal = document.querySelector('.close-modal');

// Находим все картинки в галерее
const galleryImages = document.querySelectorAll('.gallery-table img');

// Добавляем обработчик клика на каждую картинку
galleryImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        // Берём подпись из родительского элемента
        const parentTd = this.closest('td');
        const imgTitle = parentTd.querySelector('p')?.innerText || '';
        const imgYear = parentTd.querySelector('.year')?.innerText || '';
        captionText.innerHTML = `${imgTitle} ${imgYear}`;
    });
});

// Закрытие по клику на крестик
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Закрытие по клику на фон
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
// ========== ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ ПРОКРУТКЕ ==========

// Добавляем класс fade-in нужным элементам
const fadeElements = document.querySelectorAll('.hero, .section, .video-section, .facts-section, .work-card, .fact-card, .quote-block');

fadeElements.forEach(el => {
    el.classList.add('fade-in');
});

// Проверяем, какие элементы видны
function checkVisibility() {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight - 50) {
            el.classList.add('visible');
        }
    });
}

// Запускаем при загрузке и при прокрутке
window.addEventListener('load', checkVisibility);
window.addEventListener('scroll', checkVisibility);