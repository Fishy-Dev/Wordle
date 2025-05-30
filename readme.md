Here’s a cleaned-up and corrected version of your `README.md`:

````markdown
# 🟩 Minecraft Bedrock Wordle Add-On

A simple **Wordle-style mini-game** for Minecraft Bedrock Edition, built using the JavaScript Scripting API. Players can start a game from chat, guess words, and receive visual feedback via colored glyphs—just like the classic Wordle.

---

## 📦 Features

- **Chat Commands**  
  - `!wordle` — Start a new Wordle game  
  - `!guess <word>` — Submit a guess

- **Customizable Settings**  
  - Configure word length and max guesses in `config.js`  
  - Customize glyphs and color mappings in `letters.js`

- **Per-Player Game Sessions**  
  - Each player runs their own independent Wordle game

- **Visual Feedback**  
  - Colored Unicode glyphs show per-letter feedback  
  - Accurate handling of repeated letters (green/yellow/black logic)

---

## 📋 Prerequisites

- **Minecraft Bedrock Edition** (1.20+ recommended)  
- **Bedrock Dedicated Server** or a local world with scripting enabled  
- **Node.js** (optional — for development tooling)

---

## 🚀 Installation

1. Clone or download this repo into your behavior pack’s `scripts/` folder  
2. Make sure your `manifest.json` includes:
   ```json
   {
     "modules": [
       {
         "type": "script",
         "language": "javascript",
         "entry": "scripts/index.js"
       }
     ]
   }
````

3. Enable "Beta APIs" in your world’s Experimental settings
4. Launch the world with this behavior pack enabled

---

## 🎮 Usage

**Start a game**
In chat, type:

```
!wordle
```

**Submit a guess**

```
!guess crane
```

You'll receive feedback with colored glyphs:

* 🟩 Green = correct letter in correct spot
* 🟨 Yellow = correct letter in wrong spot
* ⬛ Black = letter not in the word

**Game End**

* You win by guessing the word in the allowed attempts
* If you fail, the correct word is revealed
* Use `!wordle` again to start a new game

---

## ⚙️ Configuration

Edit `scripts/config.js` to customize:

```js
export default {
  wordLength: 5,      // number of letters per word
  maxGuesses: 6       // maximum allowed guesses
};
```

To change the glyphs (fonts/colors), edit `scripts/letters.js`:

```js
export default {
  yellow_A: "\uE300",
  black_A: "\uE340",
  green_A: "\uE370",
  // ...and so on
};
```

Ensure your font pack supports these glyphs if you're using custom ones.

---

## 🛠️ Development Notes

* Built with:

  * `@minecraft/server` scripting module
  * Bedrock’s event system (`afterEvents`, `beforeEvents`)

* Main logic:

  * `Game` class handles gameplay per player
  * Uses a `Map` to store active player sessions

* Glyph display:

  * Dynamically built per-letter from `letters.js` mapping

Feel free to fork and expand with UI, animations, or multiplayer enhancements!

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---
