const toggleModeBtn = document.querySelector('.toggle-mode-btn');
let darkModeOn = false;

toggleModeBtn.addEventListener('click', () => {
    toggleModeBtn.classList.toggle('move-toggle-btn');

    const root = document.querySelector(':root');
    
    if (darkModeOn) {
        darkModeOn = false;
        root.style.setProperty('--primary-color', '#58BC82');
        root.style.setProperty('--secondary-color', '#E4E4E4')
        root.style.setProperty('--accent-color', '#858585')
        root.style.setProperty('--body-bg-color', '#FCFCFC')
        root.style.setProperty('--text-color', '#000')
    } 
    else {
        darkModeOn = true;
        root.style.setProperty('--primary-color', '#117FE6');
        root.style.setProperty('--secondary-color', '#4A4C4B')
        root.style.setProperty('--accent-color', '#fff')
        root.style.setProperty('--body-bg-color', '#777A78')
        root.style.setProperty('--text-color', '#fff')
    }
});