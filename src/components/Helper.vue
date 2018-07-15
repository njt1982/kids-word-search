<template>
  <div id="wrapper">
    <div class="container">
      <div class="row mt-3">
        <div id="wordsearch_grid" class="col-auto mt-1 mb-4 px-4 pl-sm-5 pr-sm-3 px-md-0 mx-auto">
          <div class="row justify-content-center" v-for="(_, row) in sizeInt" :key="row">
            <div class="col border" v-for="(_, col) in sizeInt" :key="`${row}_${col}`">
              <div :class="letterTileClasses(col, row)"
                    :data-x="col" :data-y="row"
                    @mousedown.prevent="wordSelectStart"
                    @mouseup="wordSelectUpdate"
                    @mousemove="wordSelectUpdate"
                    @touchstart.prevent="wordSelectStart"
                    @touchend="wordSelectUpdate"
                    @touchmove="wordSelectUpdate"
                    >
                <svg width="100%" height="100%" viewBox="0 0 18 18">
                  <text x="50%" y="13" text-anchor="middle">{{ gridVal(col, row) }}</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="col mb-5">
          <h2>Words</h2>
          <div class="words">
            <span :class="wordListClasses(word)"
                  v-for="word in usedWords"
                  :key="word">{{word}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="settings_modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Settings</h5>
          </div>
          <div class="modal-body">
            <form>
              <label for="words-settings">Words:</label>

              <div class="form-group form-inline">
                <div class="input-group input-group-sm mr-2 mb-2"
                     v-for="(word, index) in words"
                     :key="index">
                  <input type="text"
                         class="form-control"
                         v-model.lazy="words[index]" />
                  <div class="input-group-append">
                    <div class="btn btn-danger" @click="removeWord(index)">-</div>
                  </div>
                </div>

                <div class="btn btn-success btn-sm mr-2 mb-2" @click="addWord()">+</div>
              </div>

              <label for="size-settings">Size:</label>
              <div class="form-group">
                <input type="number"
                       v-model.lazy="size"
                       name="size-settings"
                       class="form-control-sm" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                    @click="rebuildGrid()">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Helper',
  data() {
    return {
      debugEnabled: false,
      size: 8,
      words: [
        'air',
        'bare',
        'dare',
        'summer',
        'scared',
      ],
      usedWords: [],
      foundWords: [],
      letterGrid: [[]],
      foundTiles: [],
      guess: [],
      selectedRange: {
        start: undefined,
        end: undefined,
      },
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
      return this.guess.map(l => this.gridVal(l.x, l.y)).join('');
    },
  },
  methods: {
    removeWord(index) {
      this.words.splice(index, 1);
    },
    addWord() {
      this.words.push('');
    },
    wordListClasses(word) {
      const classes = ['badge', 'badge-pill', 'badge-primary'];
      if (this.foundWords.indexOf(word) !== -1) {
        classes.push('badge-success');
      }
      return classes;
    },
    isTileActive(x, y) {
      for (let i = 0; i < this.guess.length; i += 1) {
        if (this.guess[i].x === x && this.guess[i].y === y) {
          return true;
        }
      }
      return false;
    },
    isTileHighlighted(x, y) {
      if (this.selectedRange.start && this.selectedRange.end) {
        const r = this.selectedRange;

        const minX = Math.min(r.start.x, r.end.x);
        const maxX = Math.max(r.start.x, r.end.x);
        const minY = Math.min(r.start.y, r.end.y);
        const maxY = Math.max(r.start.y, r.end.y);

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          // in range. If X or Y are equal then it's a straight line, otherwise
          // Work out diagonal logic.
          return (
            r.start.x === r.end.x ||
            r.start.y === r.end.y ||
            (Math.abs(r.start.x - x) === Math.abs(r.start.y - y))
          );
        }
      }
      return false;
    },
    isTileAFoundWordTile(x, y) {
      for (let i = 0; i < this.foundTiles.length; i += 1) {
        if (this.foundTiles[i].x === x && this.foundTiles[i].y === y) {
          return true;
        }
      }
      return false;
    },
    letterTileClasses(x, y) {
      const classes = ['letter-tile'];

      if (this.isTileActive(x, y)) {
        classes.push('letter-tile-selected');
      }

      if (this.isTileHighlighted(x, y)) {
        classes.push('letter-tile-highlighted');
      }

      if (this.isTileAFoundWordTile(x, y)) {
        classes.push('letter-tile-found');
      }

      return classes;
    },
    wordSelectStart(event) {
      const touchedElement = event.target.closest('div.letter-tile');
      if (touchedElement && touchedElement.dataset && touchedElement.dataset.x) {
        this.selectedRange.start = {
          x: parseInt(touchedElement.dataset.x, 10),
          y: parseInt(touchedElement.dataset.y, 10),
        };
        return true;
      }
      return false;
    },
    wordSelectUpdate(event) {
      // We never started selecting, bail early.
      if (this.selectedRange.start === undefined) {
        return false;
      }
      let touch = event;

      if (event.type.indexOf('touch') === 0) {
        touch = event.changedTouches.item(0);
      }

      const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY).closest('div.letter-tile');

      if (touchedElement && touchedElement.dataset && touchedElement.dataset.x) {
        const x = parseInt(touchedElement.dataset.x, 10);
        const y = parseInt(touchedElement.dataset.y, 10);

        const dx = Math.abs(x - this.selectedRange.start.x);
        const dy = Math.abs(y - this.selectedRange.start.y);

        // Verify the end is valid.
        // If dy (change in y) or dx (change in x) is zero, then it is horizontal/vertcal == OK.
        // Or if dx === dy, then it is diagonal.
        if ((dy === 0 && dx > 0) ||
            (dx === 0 && dy > 0) ||
            (dx === dy)) {
          this.selectedRange.end = { x, y };

          // If it's mouseup, then we finished the dragging a range
          if (event.type === 'mouseup' || event.type === 'touchend') {
            console.log(JSON.stringify(this.selectedRange)); // eslint-disable-line no-console

            this.guess = [];
            // Build guess!
            const sx = this.selectedRange.start.x;
            const sy = this.selectedRange.start.y;
            const ex = this.selectedRange.end.x;
            const ey = this.selectedRange.end.y;

            if (dx === 0) {
              // Vertical
              const step = ey > sy ? 1 : -1;
              for (let i = sy; step > 0 ? (i <= ey) : (i >= ey); i += step) {
                this.guess.push({ x: sx, y: i });
              }
            } else if (dy === 0) {
              // Horizontal
              const step = ex > sx ? 1 : -1;
              for (let i = sx; step > 0 ? (i <= ex) : (i >= ex); i += step) {
                this.guess.push({ x: i, y: sy });
              }
            } else {
              // Diagonal
              const stepX = ex > sx ? 1 : -1;
              const stepY = ey > sy ? 1 : -1;
              for (
                let iX = sx, iY = sy;
                (stepY > 0 ? (iY <= ey) : (iY >= ey)) || (stepX > 0 ? (iX <= ex) : (iX >= ex));
                iY += stepY, iX += stepX
              ) {
                this.guess.push({ x: iX, y: iY });
              }
            }

            if (this.usedWords.indexOf(this.guessedWord) !== -1) {
              this.foundWords.push(this.guessedWord);
              this.foundTiles.push(...this.guess);
            }


            // Gesture complete, reset the range.
            this.resetSelectedRange();
          }
        } else if (event.type === 'mouseup' || event.type === 'touchend') {
          // Verify failed, reset range (only if at the end of a gesture)
          this.resetSelectedRange();
        } else {
          this.selectedRange.end = undefined;
        }
      } else if (event.type === 'mouseup' || event.type === 'touchend') {
        // End was "null" or had no x/y. Reset.
        this.resetSelectedRange();
      } else {
        this.selectedRange.end = undefined;
      }
      return true;
    },
    resetSelectedRange() {
      this.selectedRange = {
        start: undefined,
        end: undefined,
      };
    },
    gridVal(x, y) {
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
      this.foundWords = [];
      this.foundTiles = [];
      this.guess = [];

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
            if (this.debugEnabled) {
              console.log(`DEBUG: ${err.message}`, word, x, y, dx, dy); // eslint-disable-line no-console
            }
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
