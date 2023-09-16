/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");
const argType = process.argv[2];
const { MarkovMachine } = require("./markov");

checkIfFileOrURL(argType);

async function checkIfFileOrURL(arg) {
  try {
    if (arg === "url") {
      await printNewTextFromURL(process.argv[3]);

      return;
    }
    if (arg === "file") {
      printNewTextFromFile(process.argv[3]);

      return;
    }
  } catch {
    console.log(err);
    process.kill(1);
  }
}

function printNewTextFromFile(arg) {
  fs.readFile(arg, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR", err);
      process.kill(1);
    }

    let sentence = new MarkovMachine(data);

    console.log(sentence.makeText(50));
  });
}

async function printNewTextFromURL(url) {
  try {
    response = await axios.get(url);

    let sentence = new MarkovMachine(response.data);
    console.log(sentence.makeText(50));
  } catch {
    console.log("ERROR", "Invalid Url");
    process.kill(1);
  }
}
