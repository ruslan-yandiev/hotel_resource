const iconMenu = document.querySelector('.icon-menu');

iconMenu.addEventListener('click', () => {
    iconMenu.classList.toggle('_active');
    document.querySelector('.menu__body').classList.toggle('_active');
    document.querySelector('body').classList.toggle('_lock');
});
