const invoke = window.__TAURI__.invoke;
const parser = new DOMParser();
const br = document.createElement('br');

document.addEventListener('keydown', event => {
    if(event.ctrlKey && event.key == 's') {
        //saveXML();
    }
    if(event.ctrlKey && event.key == 'o') {
        openXML();
    }
})

function newFile() {
    while(editableArea.childNodes.length > 1) {
        editableArea.removeChild(editableArea.lastChild);
    }
    if(editableArea.childElementCount == 1) {
        editableArea.firstElementChild.innerHTML = br
    }
}

function saveXML(){
    var data = new XMLSerializer().serializeToString(editableArea);
    console.log(data)
}

function openXML(){
    invoke('open_xml').then(response => {
        if(response[0] != '') {
            var data = parser.parseFromString(response[1], 'text/xml');
            
            var paragraphs2 = document.getElementsByTagName('p');
            
            console.log(paragraphs2.length)
        }
    })
}