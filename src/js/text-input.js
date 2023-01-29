let textInput = document.getElementById('text-input');
let paragraphs = document.querySelectorAll('p');

textInput.addEventListener('keydown', event => {
    switch(event.key) {
        case 'Backspace':
            const sel = window.getSelection();
            if(sel.anchorOffset == 0 && textInput.childElementCount == 1 && paragraphs[0].textContent == '') {
                event.preventDefault();
            }
    }
})