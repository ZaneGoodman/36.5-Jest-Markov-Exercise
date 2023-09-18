const { MarkovMachine } = require("./markov");

describe("Test markov Class", function () {
  let testMarkov;
  beforeEach(() => {
    testMarkov = new MarkovMachine(
      "the cat in the hat took a bat and hit his bat"
    );
  });

  test("Check if wordChain method returns proper data", () => {
    let wordChain = testMarkov.wordChain;
    expect(wordChain).toEqual({
      the: ["cat", "hat"],
      cat: ["in"],
      in: ["the"],
      hat: ["took"],
      took: ["a"],
      a: ["bat"],
      bat: ["and", null],
      and: ["hit"],
      hit: ["his"],
      his: ["bat"],
    });
  });
});
