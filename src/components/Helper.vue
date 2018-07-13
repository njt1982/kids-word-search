<template>
  <div class="container">
    <div class="row">
      <div id="wordsearch_grid" class="col-md-9 m-3">
        <div class="row" v-for="(_, row) in sizeInt" :key="row">
          <div class="col border" v-for="(_, col) in sizeInt" :key="col">
            <div :class="['letter-tile', isTileActive(col, row) ? 'letter-tile-selected' : '']"
                  v-on:click="clickLetter(col, row)">
              <svg width="100%" height="100%" viewBox="0 0 18 18">
                <text x="50%" y="15" text-anchor="middle">{{ griVal(col, row) }}</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <h2 class="mt-3">Guess</h2>
        <pre>{{guessedWord}}</pre>
        <button :v-if="guess.length > 0"
                class="btn btn-sm btn-primary"
                v-on:click="guess = []">Clear</button>

        <h2>Words</h2>
        <ul class="list-group" v-for="word in usedWords" :key="word">
          <li class="list-group-item">{{word}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Helper',
  data() {
    return {
      size: 8,
      words: [
        'air',
        'bare',
        'dare',
        'summer',
        'scared',
      ],
      usedWords: [],
      letterGrid: [[]],
      guess: [],
    };
  },
  mounted() {
    this.rebuildGrid();
  },
  computed: {
    sizeInt() {
      return parseInt(this.size, 10);
    },
    guessedWord() {
      return this.guess.map(l => this.griVal(l.x, l.y)).join('');
    },
  },
  methods: {
    isTileActive(x, y) {
      for (let i = 0; i < this.guess.length; i += 1) {
        if (this.guess[i].x === x && this.guess[i].y === y) {
          return true;
        }
      }
      return false;
    },
    clickLetter(x, y) {
      if (!this.isTileActive(x, y)) {
        this.guess.push({ x, y });
      }
    },
    griVal(x, y) {
      if (typeof this.letterGrid[y] !== 'undefined') {
        if (typeof this.letterGrid[y][x] !== 'undefined') {
          return this.letterGrid[y][x];
        }
      }
      return '';
    },
    rebuildGrid() {
      // Init letterGrid...
      this.letterGrid = [...Array(this.sizeInt)].map(() => Array(this.sizeInt));
      this.usedWords = [];

      // Build letterGrid.
      this.words.forEach((word) => {
        if (word.length > this.sizeInt) {
          console.error('Word wont fit on board'); // eslint-disable-line no-console
          return;
        }
        let isValid = false;
        let x = 0;
        let y = 0;
        let dx = 0;
        let dy = 0;
        let itterationCount = 0;

        do {
          itterationCount += 1;
          if (itterationCount > 100) {
            console.error('Tried to write word 100 times and failed', word); // eslint-disable-line no-console
            return;
          }

          x = Math.floor(Math.random() * this.sizeInt);
          y = Math.floor(Math.random() * this.sizeInt);
          dx = 0;
          dy = 0;
          isValid = false; // Assume invalid until proven OK.

          const direction = Math.floor(Math.random() * 8);
          if (direction > 0 && direction < 4) {
            dx = 1;
          } else if (direction > 4 && direction < 8) {
            dx = -1;
          }
          if (direction < 2 || direction > 6) {
            dy = -1;
          } else if (direction > 2 && direction < 6) {
            dy = 1;
          }

          try {
            const endX = x + (dx * word.length);
            if (endX < 0 || endX > this.sizeInt) {
              throw new Error('Word exceeds width');
            }
            const endY = y + (dy * word.length);
            if (endY < 0 || endY > this.sizeInt) {
              throw new Error('Word exceeds height');
            }
            // If we have got here, then it fits on the grid!
            // Simulate laying it to check for overlap.
            for (let cIndex = 0; cIndex < word.length; cIndex += 1) {
              const xCord = x + (cIndex * dx);
              const yCord = y + (cIndex * dy);
              if (this.letterGrid[yCord][xCord] !== undefined) {
                if (this.letterGrid[yCord][xCord] !== word[cIndex]) {
                  throw new Error('Letter Overlap');
                }
              }
            }

            isValid = true;
          } catch (err) {
            console.log(`DEBUG: ${err.message}`, word, x, y, dx, dy); // eslint-disable-line no-console
            isValid = false;
          }
        } while (!isValid);

        // Has been found valid, so write it in.
        this.usedWords.push(word);
        for (let cIndex = 0; cIndex < word.length; cIndex += 1) {
          const xCord = x + (cIndex * dx);
          const yCord = y + (cIndex * dy);
          this.letterGrid[yCord][xCord] = word[cIndex];
        }
      });

      // Now fille in the rest of the grid.
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      for (let y = 0; y < this.sizeInt; y += 1) {
        for (let x = 0; x < this.sizeInt; x += 1) {
          if (this.letterGrid[y][x] === undefined) {
            this.letterGrid[y][x] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
          }
        }
      }
    },
  },
};
</script>
