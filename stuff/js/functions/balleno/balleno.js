function translateToBalleno(word) {
    var finalWord = [];
    for (var i = 0; i < word.length; i++) {
        switch (word[i]) {
            case 'a': // if (word[i] === 'a') {
                finalWord = printLetters(word[i], 1, finalWord)
                break;
            case 'o' || 'u': // } else if (word[i] === 'o' || word[i] === 'u') {
                finalWord = printLetters(word[i], 2, finalWord)
                break;
            case 'e': // } else if (word[i] === 'e') {
                finalWord = printLetters(word[i], 3, finalWord)
                break;
            case 'i': // } else if (word[i] === 'i') {
                finalWord = printLetters(word[i], 4, finalWord)
                break;
            default:
                break;
        }
    }

    console.log(finalWord) // => 'eeeooaiiii' / ['e','e','e'...]
}
function printLetters(letter, n, word) { // 'a', 2, []
    var newWord = word
    for (var i = 0; i < n; i++) newWord[newWord.length] = letter

    return newWord
}

translateToBalleno('developer') // => 'eeoe'

