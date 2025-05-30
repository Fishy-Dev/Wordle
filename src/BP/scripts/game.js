import { Player } from "@minecraft/server";
import { generate, wordsList } from "./libs/random-words/index.js";
import config from "./config";
import letters from "./letters.js";

export { Game };

class Game {
  /**
   *
   * @param {Player} player
   */
  constructor(player) {
    this.player = player;
    this.word = generate({
      minLength: config.wordLength,
      maxLength: config.wordLength,
    });
    this.playedWords = [];
    this.guesses = 0;
    this.end = false;

    console.warn(`gameID: ${this.player.id}, word: ${this.word}`)
    player.sendMessage("You started a game of Wordle\n §rplease use §e!guess <word>§r to guess")
    player.sendMessage(`  ${letters["green_W"]}${letters["green_O"]}${letters["green_R"]}${letters["green_D"]}${letters["green_L"]}${letters["green_E"]}\n§a✦━━━━━━━━━━━━━━━━━━━━━✦`);
  }
  /**
   *
   * @param {string} guessWord
   * @returns {boolean}
   */
  guess(guessWord) {
    this.player.sendMessage("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
    guessWord = guessWord.toLowerCase();
    
    if (!wordsList.includes(guessWord)){
        this.player.sendMessage(
        `§a[§rWordle§a]§r§c The Word you guessed is not in the wordList`
        
      );
      this.player.playSound("note.didgeridoo")
      return
    }
    if (guessWord.length != config.wordLength) {
      this.player.sendMessage(
        `§a[§rWordle§a]§r§c The guessed word must be ${config.wordLength} letters long`
      );
      this.player.playSound("note.didgeridoo")
      return
    }
    this.guesses++;
    if (guessWord == this.word) {
      this.player.sendMessage(
        `§a[§rWordle§a]§r§a You guessed the word right in §6${this.guesses} guesses`
      );
      this.player.playSound("note.chime")
      this.playedWords.push(guessWord);
      this.updateBoard();
      return this.end = true;
    }
    if (this.guesses > config.maxGuesses) {
      this.player.sendMessage(
        `§a[§rWordle§a]§r§c You have ran out of guesses the word was §6${this.word}`
      );
      this.player.playSound("note.didgeridoo")
      return (this.end = true);
    }
    this.playedWords.push(guessWord);

    this.updateBoard();
  }
  updateBoard() {
    const solution = this.word;
    const N = solution.length;

    // precompute letter counts
    const counts = {};
    for (let ch of solution) {
      counts[ch] = (counts[ch] || 0) + 1;
    }

    let boardText =`  ${letters["green_W"]}${letters["green_O"]}${letters["green_R"]}${letters["green_D"]}${letters["green_L"]}${letters["green_E"]}\n§a✦━━━━━━━━━━━━━━━━━━━━━✦\n`;
    for (let word of this.playedWords) {
      // split into arrays
      const guessArr = word.split("");
      const solutionArr = solution.split("");
      const resultRow = Array(N).fill(""); // we’ll fill with color‐glyphs

      // 1) mark greens
      for (let i = 0; i < N; i++) {
        if (guessArr[i] === solutionArr[i]) {
          resultRow[i] = letters[`green_${guessArr[i].toUpperCase()}`];
          counts[guessArr[i]]--;
        }
      }
      // 2) mark yellows and greys
      for (let i = 0; i < N; i++) {
        if (resultRow[i]) continue; // already green
        const ch = guessArr[i];
        if (counts[ch] > 0) {
          resultRow[i] = letters[`yellow_${guessArr[i].toUpperCase()}`];
          counts[ch]--;
        } else {
          resultRow[i] = letters[`black_${guessArr[i].toUpperCase()}`];
        }
      }

      // join the glyphs into one line
      boardText += "  "+ resultRow.join("") + "\n\n";
    }
    boardText += "§a✦━━━━━━━━━━━━━━━━━━━━━✦\n"

    this.player.sendMessage(boardText);
  }
}
