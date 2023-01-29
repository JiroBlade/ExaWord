const { appWindow } = window.__TAURI__.window;
let titlebar = document.getElementById('titlebar');
let menuButtons = document.querySelectorAll('.menu-button');
let windowControls = document.querySelectorAll('#window-controls > div');

titlebar.addEventListener('contextmenu', e => {
    e.preventDefault();
})

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        var submenu = button.querySelector('.submenu');
        if(submenu.style.display == 'none') {
            submenu.style.display = 'block';
        } else {
            submenu.style.display = 'none';
        }
    })
})

windowControls[0].addEventListener('click', () => appWindow.minimize());
windowControls[1].addEventListener('click', () => appWindow.toggleMaximize());
windowControls[2].addEventListener('click', () => appWindow.close());