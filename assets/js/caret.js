const caret = {
    index: function(sel) {
        var index;
        if(sel.type == 'Caret') {
            index = sel.anchorOffset;
        }
        return index;
    },
    strAfter: function(sel) {
        var line = sel.anchorNode.textContent, after;
        if(sel.type == 'Caret') {
            after = line.substring(caret.index(sel), line.length)
            if(after.length == 0) {
                after = '\xa0'
            }
        }
        return after;
    },
    move: function(sel, index) {
        
    }
}