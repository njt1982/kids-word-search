<template>
  <div id="wrapper">
    <div class="container">
      <div class="row mt-3">
        <div
          id="wordsearch_grid"
        >
          <div
            v-for="(rowV, row) in sizeInt"
            :key="row-1"
          >
            <div
              v-for="(colV, col) in sizeInt"
              :key="`${row}_${col}`"
            >
              <div
                :class="letterTileClasses(col, row)"
                :data-x="col"
                :data-y="row"
                @mousedown.prevent="wordSelectStart"
                @mouseup="wordSelectUpdate"
                @mousemove="wordSelectUpdate"
                @touchstart.prevent="wordSelectStart"
                @touchend="wordSelectUpdate"
                @touchmove="wordSelectUpdate"
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 18 18"
                >
                  <text
                    x="50%"
                    y="13"
                    text-anchor="middle"
                  >{{ gridVal(col, row) }}</text>
                </svg>
              </div>
              <div
                v-for="(wordLineData, wordLineIndex) in wordLinesForTile(col, row)"
                :key="`${row}_${col}_${wordLineIndex}`"
                :class="wordLineClasses(wordLineData)"
              />
            </div>
          </div>
        </div>

        <div class="col mb-5">
          <h2>Words</h2>
          <div class="words">
            <span
              v-for="word in usedWords"
              :key="word"
              :class="wordListClasses(word)"
            >{{ word }}</span>
          </div>

          <h2 class="mt-4">
            Timer
          </h2>
          <span>{{ displayTime }}</span>

          <h2 class="mt-4">
            Game
          </h2>
          <div
            class="btn btn-primary mb-2 d-block"
            @click="rebuildGrid()"
          >
            New Game
          </div>
          <div
            class="btn btn-primary mb-2 d-block"
            @click="clearGameState()"
          >
            Restart this game
          </div>
        </div>
      </div>
    </div>

    <div
      id="settings_modal"
      class="modal fade"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Settings
            </h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="row">
                <label
                  for="words-settings"
                  class="col-4"
                >Words:</label>

                <div class="form-group form-inline col-8 row">
                  <div
                    v-for="(word, index) in words"
                    :key="index"
                    class="input-group input-group-sm mb-2 col-6"
                  >
                    <input
                      v-model.lazy="words[index]"
                      type="text"
                      class="form-control"
                    >
                    <div class="input-group-append">
                      <div
                        class="btn btn-danger"
                        @click="removeWord(index)"
                      >
                        -
                      </div>
                    </div>
                  </div>

                  <div class=" mb-2 col">
                    <div
                      class="btn btn-success btn-sm"
                      @click="addWord()"
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <label
                  for="size-settings"
                  class="col-4"
                >Size:</label>
                <div class="col">
                  <input
                    id="size-settings"
                    v-model.lazy="size"
                    type="number"
                    name="size-settings"
                    class="form-control-sm"
                  >
                </div>
              </div>

              <div class="row">
                <label
                  class="col-4"
                  for="backwards-settings"
                >Allow backwards?</label>
                <div class="col">
                  <input
                    id="backwards-settings"
                    v-model.lazy="backwards"
                    type="checkbox"
                    name="backwards-settings"
                  >
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="saveSettings()"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SYNCABLE_KEYS = {
  backwards : { type: Boolean, default: false } ,
  words: { type: Array, default: ['air', 'bare', 'dare', 'summer', 'scared'] },
  size: { type: Number, default: 8 }
}

export default {
  name: 'Helper',
  data() {
    return {
      debugEnabled: false,
      size: 8,
      words: [],
      backwards: false,
      usedWords: [],
      foundWords: [],
      letterGrid: [[]],
      foundTiles: [],
      wordLines: [],
      guess: [],
      selectedRange: {
        start: undefined,
        end: undefined,
      },
      startTime: 0,
      displayTime: ''
    };
  },
  computed: {
    sizeInt() {
      return parseInt(this.size, 10);
    },
    guessedWord() {
      return this.guess.map(l => this.gridVal(l.x, l.y)).join('');
    },
  },
  watch: {
    backwards: function() {
      this.syncConfigToUrl()
    },
    words: function() {
      this.syncConfigToUrl()
    },
    size: function() {
      this.syncConfigToUrl()
    }
  },
  mounted() {
    this.syncConfigFromUrl();
    this.rebuildGrid();
    setInterval(function() {
      this.generateDisplayTime()
    }.bind(this), 1000);
  },
  methods: {
    syncConfigFromUrl() {
      var searchParams = new URLSearchParams(window.location.search)
      Object.keys(SYNCABLE_KEYS).forEach(key => {
        var value
        if (SYNCABLE_KEYS[key].type === Array) {
          value = searchParams.getAll(key)
          if (value.length === 0) {
            value = SYNCABLE_KEYS[key].default
          }
        } else {
          value = searchParams.get(key)
          if (value === null) {
            value = SYNCABLE_KEYS[key].default
          }
          value = new SYNCABLE_KEYS[key].type(value).valueOf()
        }
        this[key] = value
      })
    },
    syncConfigToUrl() {
      var searchParams = new URLSearchParams(window.location.search)
      Object.keys(SYNCABLE_KEYS).forEach(key => {
        searchParams.delete(key);
        const value = this[key]
        if (SYNCABLE_KEYS[key].type === Array) {
          if (value != SYNCABLE_KEYS[key].default) {
            value.forEach(valueItem => searchParams.append(key, valueItem))
          }
        } else {
          if (value != SYNCABLE_KEYS[key].default) {
            searchParams.set(key, value);
          }
        }
      })
      var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      history.pushState(null, '', newRelativePathQuery);
    },
    saveSettings() {
      this.syncConfigToUrl()
      this.rebuildGrid()
    },
    generateDisplayTime() {
      const duration = (Date.now() - this.startTime) / 1000
      this.displayTime = `${Math.floor(duration / 60)}m ${Math.floor(duration % 60)}s`
    },
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

      if (this.isTileHighlighted(x, y)) {
        classes.push('letter-tile-highlighted');
      }

      if (this.isTileAFoundWordTile(x, y)) {
        classes.push('letter-tile-found');
      }

      return classes;
    },
    wordLinesForTile(x, y) {
      return this.wordLines.filter(wordLine => (wordLine.x === x) && (wordLine.y === y))
    },
    wordLineClasses(wordLine) {
      const classes = [
        'word-strike',
        'word-strike-direction-' + wordLine.direction,
        'word-strike-length-' + wordLine.length,
      ]
      // Odd directions are diagonal
      if (wordLine.direction % 2 === 1) {
        classes.push('word-strike-diagonal')
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

            // 0 = up, 1 = up-right, 2 = right, 3 = down-right, 4 = down
            // 5 = down-left, 6 = left, 7 = up-left
            var direction = 0

            if (dx === 0) {
              // Vertical
              const step = ey > sy ? 1 : -1;
              for (let i = sy; step > 0 ? (i <= ey) : (i >= ey); i += step) {
                this.guess.push({ x: sx, y: i });
              }
              direction = step > 0 ? 4 : 0
            } else if (dy === 0) {
              // Horizontal
              const step = ex > sx ? 1 : -1;
              for (let i = sx; step > 0 ? (i <= ex) : (i >= ex); i += step) {
                this.guess.push({ x: i, y: sy });
              }
              direction = step > 0 ? 2 : 7
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
              direction = stepX > 0
                ? stepY > 0 ? 3 : 1
                : stepY > 0 ? 5 : 7

            }

            if (this.usedWords.indexOf(this.guessedWord) !== -1) {
              this.foundWords.push(this.guessedWord);
              this.foundTiles.push(...this.guess);
              const newWordLine = {
                x: sx,
                y: sy,
                length: this.guessedWord.length,
                direction
              }
              this.wordLines.push(newWordLine)
              if (this.debugEnabled) {
                console.log('Found Word:', this.guessedWord, sx, sy, newWordLine); // eslint-disable-line no-console
              }
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
    clearGameState() {
      this.foundWords = []
      this.foundTiles = []
      this.guess = []
      this.wordLines = []
      this.startTime = Date.now()
      this.generateDisplayTime()
    },
    rebuildGrid() {
      // Init letterGrid...
      this.letterGrid = [...Array(this.sizeInt)].map(() => Array(this.sizeInt))
      this.usedWords = []
      this.clearGameState()

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

          // Directions...
          // 0 = up, 1 = up-right, 2 = right, 3 = down-right, 4 = down
          // 5 = down-left, 6 = left, 7 = up-left

          // If Backwards is enabled, can have the full 0-7 range.
          // Othewrwise, can only got 1-4
          const direction = this.backwards
            ? Math.floor(Math.random() * 8)
            : 1 + Math.floor(Math.random() * 4);

          // 1-3 goes right. 5-7 goes left
          if (direction > 0 && direction < 4) {
            dx = 1;
          } else if (direction > 4 && direction < 8) {
            dx = -1;
          }
          // 0-1 and 7  go up. 3-5 go down.
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

      // Now fill in the rest of the grid.
      const alphabet = 'abcdefghijklmnopqrstuvwxyz';
      for (let y = 0; y < this.sizeInt; y += 1) {
        for (let x = 0; x < this.sizeInt; x += 1) {
          if (this.letterGrid[y][x] === undefined) {
            this.letterGrid[y][x] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
          }
        }
      }
    },
  }
};
</script>
