function translateToBalleno(word) {
    var finalWord = '';
    for (var i = 0; i < word.length; i++) {
        if (word[i] === 'a' || word[i] === 'e' || word[i] === 'i' || word[i] === 'o' || word[i] === 'u') {
            if (finalWord.length) {
                finalWord += word[i]
            } else {
                finalWord = word[i]
            }
        }
    }

    console.log(finalWord) // => 
}

translateToBalleno('developer') // => 'eeoe'