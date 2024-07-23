var headerBg = document.querySelector('.header-img');
window.addEventListener("scroll", function () {
    headerBg.style.opacity = 1 - +window.pageYOffset / 550 + '';
    headerBg.style.top = window.pageYOffset / 3 + 'px';
    headerBg.style.backgroundPositionY = - +window.pageYOffset / 3 + 'px';
});