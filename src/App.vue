<template>
  <div id="app">

    <app-nav @newGameStarted="startNewGame"></app-nav>
    <p>gameActive: {{ gameActive }}</p>

    <div class="container" v-if="gameActive">
      <div class="row">
        <div class="col-12">

          <div class="gameboard">

            <app-gametile
              v-for="kanji in boardSetup"
              class="gameboard__tile"
              :key="kanji.id + kanji.type"
              :kanji="kanji"></app-gametile>

          </div>

          <p><strong>boardSetup:</strong> {{ boardSetup }}</p>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';
import Nav from './components/Nav.vue';
import Gametile from './components/Gametile.vue';

export default {
  name: 'app',
  components: {
    'app-nav': Nav,
    'app-gametile': Gametile
  },
  data: function() {
    return {
      gameActive: false,
      kanjiList: [
        {
          id: 1,
          kanji: '一',
          reading: 'いち'
        },
        {
          id: 2,
          kanji: 'ニ',
          reading: 'に'
        },
        {
          id: 3,
          kanji: '三',
          reading: 'さん'
        },
        {
          id: 4,
          kanji: '四',
          reading: 'し'
        },
        {
          id: 5,
          kanji: '五',
          reading: 'ご'
        },
        {
          id: 6,
          kanji: '六',
          reading: 'ろく'
        },
        {
          id: 7,
          kanji: '七',
          reading: 'なな'
        },
        {
          id: 8,
          kanji: '八',
          reading: 'はち'
        },
        {
          id: 9,
          kanji: '九',
          reading: 'きゅう'
        },
        {
          id: 10,
          kanji: '十',
          reading: 'じゅう'
        },
        {
          id: 11,
          kanji: '百',
          reading: 'ひゃく'
        },
        {
          id: 12,
          kanji: '千',
          reading: 'せん'
        }
      ],
      boardSetup: ['no data'],

    }
  },
  methods: {
    startNewGame() {
      this.gameActive = true;
      this.generateGameBoard();
    },
    generateGameBoard() {
      let kanjiList1 = _.cloneDeep(this.kanjiList);
      let kanjiList2 = _.cloneDeep(this.kanjiList);
      for(let kanji of kanjiList1) {
        kanji.type = 'reading';
      }
      for(let kanji of kanjiList2) {
        kanji.type = 'kanji';
      }
      kanjiList1 = this.shuffleArray(kanjiList1)
      kanjiList2 = this.shuffleArray(kanjiList2)
      this.boardSetup = kanjiList1.concat(kanjiList2);
    },
    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
  }
}
</script>

<style>

  .gameboard {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #c8c8c8;
    max-width: 750px;
    box-sizing: content-box;
    border-radius: 4px;
  }

</style>
