<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <h1>Kids Word Search Game</h1>
        <form class="form-inline mb-2">
          <div class="input-group">
            <input class="form-control"
                   type="number"
                   placeholder="Size"
                   v-model="size"
                   v-on:change="rebuildGrid"
                   aria-label="Size">
          </div>
          <button type="button" class="btn btn-primary" v-on:click="rebuildGrid">Rebuild</button>
        </form>
      </div>
    </div>
    <div id="wordsearch_grid" class="container mb-4">
      <div class="row" v-for="(_, row) in sizeInt" :key="row">
        <div class="col border" v-for="(_, col) in sizeInt" :key="col">
          <div :class="['letter-tile', 'letter-tile-' + sizeInt + '-cols' ]">
            <span>{{ griVal(col, row) }}</span>
          </div>
        </div>
      </div>
    </div>
    <ul v-for="word in usedWords" :key="word">
      <li>{{word}}</li>
    </ul>
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
    };
  },
  mounted() {
    this.rebuildGrid();
  },
  computed: {
    sizeInt() {
      return parseInt(this.size, 10);
    },
  },
  methods: {
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
        console.log(word, word.length, this.sizeInt);
        if (word.length > this.sizeInt) {
          console.error('Word wont fit on board');
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
            console.error('Tried to write word 100 times and failed', word);
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
            console.log(`DEBUG: ${err.message}`, word, x, y, dx, dy);
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
