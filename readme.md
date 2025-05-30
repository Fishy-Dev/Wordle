```markdown
# Minecraft Bedrock Wordle Add-On

A simple “Wordle”–style mini-game for Minecraft Bedrock Edition, built with the official JavaScript Scripting API. Players can start a new Wordle game in chat, then guess letters against a hidden word of configurable length. Colored glyphs (green, yellow, black) display feedback exactly like classic Wordle.

---

## 📦 Features

- **Chat Commands**:  
  - `!wordle` — start a new game  
  - `!guess <word>` — submit a guess  
- **Configurable**:  
  - Word length and max guesses via `config.js`  
  - Custom color/glyph mappings via `letters.js`  
- **Visual Feedback**:  
  - Unicode glyphs colored per‐letter (green/yellow/black)  
  - Two‐pass algorithm ensures correct handling of repeated letters  
- **Per‐Player Games**:  
  - Each player can run their own concurrent game  

---

## 📋 Prerequisites

- **Minecraft Bedrock Edition** (1.20+ recommended)  
- **Bedrock Dedicated Server** or local Bedrock development with scripting enabled  
- **Node.js** (optional—for tooling if you want to build/transpile)  

---

1. **Configure** `scripts/config.js` if you want to change:

   ```js
   export default {
     wordLength: 5,
     maxGuesses: 6,
     // ...other settings
   };
   ```

2. **Launch** Minecraft Bedrock, enable “Beta-Api” on this pack in your world’s Add-On settings, then enter the world.

---

## 🎮 Usage

* **Start a game**
  In chat, type:

  ```
  !wordle
  ```

  You’ll see a “You started a game of Wordle” message.

* **Make a guess**
  Type:

  ```
  !guess crane
  ```

  You’ll receive a colored glyph row showing which letters are correct (green), present (yellow), or absent (black).

* **Game over**
  You win if you guess in ≤ maxGuesses. You lose if you exceed maxGuesses—then the correct word is revealed. After the game ends, you can start a new one with `!wordle`.

---

## ⚙️ Configuration

Edit `scripts/config.js` to adjust:

```js
export default {
  wordLength: 5,      // number of letters per word
  maxGuesses: 6,      // maximum attempts allowed
  // you can add more settings here…
};
```

To change the glyphs or colors, edit `scripts/letters.js`—replace the `"\uExxx"` mappings with your own font or Unicode symbols.

---

## 🛠️ Development

* **Module imports**
  Uses Bedrock’s `import { system, world } from "@minecraft/server"`
* **Event hooks**

  * `world.afterEvents.worldLoad` to initialize
  * `world.beforeEvents.chatSend` to intercept `!wordle` and `!guess` commands
* **Game management**
  A `Map<playerId, Game>` keeps per‐player game instances.

Feel free to fork, extend with GUI dialogs, or integrate with custom fonts and textures!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

```
```