<template>
  <v-app>
    <v-content>
      <app-nav @newGameStarted="startNewGame"></app-nav>
      <div class="container" v-if="gameActive">
        <div class="gameboard">
          <app-gametile
            v-for="kanji in boardSetup"
            class="gameboard__tile"
            :key="kanji.id + kanji.type"
            :kanji="kanji"
            :gamePhase="gamePhase"
            :cardsFlipped="cardsFlipped"
            :numCardsFlipped="numCardsFlipped"
            :boardSetup="boardSetup"
            @cardFlipped="cardFlipped"
          ></app-gametile>
          <div class="gameboard__disabled-tile"></div>
        </div>
        <h1 class="indigo--text" v-if="matchesMade === 12">You have won!</h1>
        <p class="indigo--text title m-0"><strong>Matches: </strong> {{ matchesMade }} / 12</p>
        <p class="indigo--text title m-0"><strong>Turn: </strong> {{ turnsMade }}</p>
      </div>
    </v-content>
  </v-app>
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
      gamePhase: 0,
      numCardsFlipped: 0,
      cardsFlipped: [],
      matchesMade: 0,
      turnsMade: 0,
      kanjiList: [
        {
          id: 1,
          kanji: '一',
          reading: 'いち',
          show: true,
          matched: false
        },
        {
          id: 2,
          kanji: 'ニ',
          reading: 'に',
          show: true,
          matched: false
        },
        {
          id: 3,
          kanji: '三',
          reading: 'さん',
          show: true,
          matched: false
        },
        {
          id: 4,
          kanji: '四',
          reading: 'し',
          show: true,
          matched: false
        },
        {
          id: 5,
          kanji: '五',
          reading: 'ご',
          show: true,
          matched: false
        },
        {
          id: 6,
          kanji: '六',
          reading: 'ろく',
          show: true,
          matched: false
        },
        {
          id: 7,
          kanji: '七',
          reading: 'なな',
          show: true,
          matched: false
        },
        {
          id: 8,
          kanji: '八',
          reading: 'はち',
          show: true,
          matched: false
        },
        {
          id: 9,
          kanji: '九',
          reading: 'きゅう',
          show: true,
          matched: false
        },
        {
          id: 10,
          kanji: '十',
          reading: 'じゅう',
          show: true,
          matched: false
        },
        {
          id: 11,
          kanji: '百',
          reading: 'ひゃく',
          show: true,
          matched: false
        },
        {
          id: 12,
          kanji: '千',
          reading: 'せん',
          show: true,
          matched: false
        }
      ],
      boardSetup: [],
    }
  },
  methods: {
    startNewGame() {
      this.gameActive = true;
      this.gamePhase = 0;
      this.gamePhase = 0;
      this.numCardsFlipped = 0;
      this.matchesMade = 0;
      this.turnsMade = 0;
      this.cardsFlipped = [];
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

      this.boardSetup = this.shuffleArray(kanjiList1.concat(kanjiList2));

      setTimeout(() => {
        for(let kanji of this.boardSetup) {
          if(kanji.show) {
            kanji.show = false;
          }
        }
        this.gamePhase = 1;
      }, 7000);

    },
    cardFlipped(event) {
      this.numCardsFlipped += 1;
      this.cardsFlipped.push(event);
      if(this.cardsFlipped.length == 2) {

        setTimeout(() => {
          let card1 = this.cardsFlipped[0];
          let card2 = this.cardsFlipped[1];
          if(card1.id === card2.id) {
            card1.matched = true;
            card2.matched = true;
            this.matchesMade += 1;
          } else {
            card1.show = false;
            card2.show = false;
          }
          this.turnsMade += 1;
          this.numCardsFlipped = 0;
          this.cardsFlipped = [];
        }, 1250);

      }
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
    margin: 2em auto;
    padding: 5px;
    /* border: 1px solid #c8c8c8; */
    width: 100%;
    max-width: 970px;
    background-color: #3f51b5;
    box-sizing: border-box;
  }

</style>
