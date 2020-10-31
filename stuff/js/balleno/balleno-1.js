function translateToBalleno(word) {
    var finalWord = '';
    for (var i = 0; i < word.length; i++) {
        if (word[i] === 'a') {
            finalWord = printLetters(word[i], 1, finalWord)
        } else if (word[i] === 'o' || word[i] === 'u') {
            finalWord = printLetters(word[i], 2, finalWord)
        } else if (word[i] === 'e') {
            finalWord = printLetters(word[i], 3, finalWord)
        } else if (word[i] === 'i') {
            finalWord = printLetters(word[i], 4, finalWord)
        }
    }

    console.log(finalWord) // => 
}
function printLetters(letter, n, word) {
    var newWord = word
    if (word.length) {
        for (var i = 0; i < n; i++) newWord += letter
    } else {
        newWord = letter
        if (n > 1) {
            for (var i = 0; i < n - 1; i++) newWord += letter
        }
    }
    return newWord
}

translateToBalleno('developer') // => 'eeoe'