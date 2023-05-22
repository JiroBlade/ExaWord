let editor = document.getElementById('editor');
let paragraphs = editor.querySelectorAll('p');
const { invoke } = window.__TAURI__.tauri;
const { appWindow } = window.__TAURI__.window;

editor.addEventListener('keydown', e => {
    switch(e.key) {
        case 'Backspace':
            const sel = window.getSelection();
            if(sel.anchorOffset == 0 && editor.childElementCount == 1 && paragraphs[0].textContent == '') {
                e.preventDefault();
            }
    }
})

function openFile() {
    invoke('open_file').then(res => {
        if(res[1] == true) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(res[0], 'text/xml').getElementsByTagName('p');

            editor.textContent = '';
            for(var i = 0; i < xmlDoc.length; i++) {
                editor.innerHTML += '<p>' + xmlDoc[i].textContent + '</p>'
            }
        }
    })
}