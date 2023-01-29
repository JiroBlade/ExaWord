const { invoke } = window.__TAURI__.tauri;

function saveFile() {
    var data = [], paragraphs = textInput.querySelectorAll('p');
    paragraphs.forEach(value => {
        data.push(value.innerText)
    })

    invoke('save_file', { contents: data });
}