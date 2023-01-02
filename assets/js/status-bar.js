let statusBar = document.getElementById('status-bar');

document.addEventListener('DOMContentLoaded', event => {
    wordCount();
})

editableArea.addEventListener('input', event => {
    wordCount();
})

function wordCount() {
    var wordCount = editableArea.innerText.split(/\s/);
    wordCount = wordCount.filter(a => a);
    statusBar.innerText = `${wordCount.length} words`
}