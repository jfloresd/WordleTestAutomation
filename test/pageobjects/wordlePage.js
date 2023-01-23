class WordlePage {
    
    //dynamic selector to test the existing divs
    divInputBox (row,boxNumber) {
        return $('div.row:nth-child('+row+') > div:nth-child('+boxNumber+')');
    }

    //get selector for the h1 message
    get modalH1 () {
        return $('div.modal h1');
    }
}

export default new WordlePage();