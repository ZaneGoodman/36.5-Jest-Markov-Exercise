/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n . ,]+/);
    this.words = words.filter((c) => c !== "");
    this.wordChain = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let obj = {};
    let words = this.words;
    for (let i = 0; i < words.length; i++) {
      let key = words[i];
      let wordToAdd = words[i + 1];

      let checkKeys = Object.keys(obj).some((value) => {
        return value === key;
      });

      if (wordToAdd === undefined) {
        wordToAdd = null;
      }

      checkKeys === true ? obj[key].push(wordToAdd) : (obj[key] = [wordToAdd]);
    }
    return obj;
  }

  getRandomIndex(range) {
    let randomIndex = Math.floor(Math.random() * range);
    return randomIndex;
  }

  makeText(numWords = 100) {
    let word;

    let wordChain = this.wordChain;
    let keys = Object.keys(this.wordChain);

    let randKeyIndex = this.getRandomIndex(keys.length);
    let startWord = keys[randKeyIndex];
    let newSentence = "";
    newSentence = newSentence + " " + startWord;

    word = startWord;
    for (let i = 0; i < numWords; i++) {
      word =
        wordChain[word][
          this.getRandomIndex(Object.values(wordChain[word]).length)
        ];
      if (word !== null) {
        newSentence = newSentence + " " + word;
      } else {
        console.log(newSentence);
        return newSentence;
      }
    }
    return newSentence;
  }
}

module.exports = { MarkovMachine };
