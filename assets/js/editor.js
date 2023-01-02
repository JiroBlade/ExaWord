let toolBar = document.getElementById('tool-bar');
let editableArea = document.getElementById('editable-area');
let paragraphs = document.querySelectorAll('p');

editableArea.addEventListener('input', event => {
    if(!event.target.contains(paragraphs[0])) {
        editableArea.insertBefore(paragraphs[0], editableArea.firstChild);
    }
})