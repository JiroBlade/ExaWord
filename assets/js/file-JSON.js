function saveJSON(){
    let file_path = sessionStorage.getItem('file_path');
    let lines = textInput.innerText.split('\n');
    console.log(lines)

    for(i = lines.length - 1; i >= 0; i--){
        if(lines[i].length == 0){
            lines.pop(lines[i])
        } else {
            break;
        }
    }
    for(i = 0; i < lines.length; i++){
        lines[i] += '\n';
    }
    invoke('save_json', {path: file_path, data: lines});
}

function openJSON(){
    invoke('open_json').then(path => {
        if(path != ''){
            sessionStorage.setItem('file_path', path);
            invoke('read_json', {path:path}).then(response => {
                for(i = 0; i < response.paragraphs.length; i++){
                    textInput.innerHTML += response.paragraphs[i];
                }
            })
        }
    })
}