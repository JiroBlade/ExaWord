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

/* const parser = new DOMParser();

function newFile() {
    while(editableArea.childNodes.length > 1) {
        editableArea.removeChild(editableArea.lastChild);
    }
}

function saveXML(){
    var data = new XMLSerializer().serializeToString(editableArea);
    console.log(data)
}

function openXML(){
    invoke('open_xml').then(response => {
        if(response[0] != '') {
            var xmlDoc = parser.parseFromString(response[1], 'text/xml');
            var data = xmlDoc.getElementsByTagName('p');
            
            
        }
    })
} */