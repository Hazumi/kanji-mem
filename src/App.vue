<template>
  <v-app>
    <v-content>
      <app-nav @newGameStarted="startNewGame" @setApiKey="setApiKey"></app-nav>

      <v-alert v-if="apiError" type="error" dense dismissible color="orange" border="left">
        Unable to retrieve data from WaniKani.<br> <strong>Please enter a valid WaniKani API key V2.</strong>
      </v-alert>

      <div class="container" v-if="gameActive && !apiError">
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
      apiKey: '',
      apiKeyValid: false,
      apiError: false,
      userLvl: '',
      apiKanjiList: []
    }
  },
  methods: {
    startNewGame() {
      this.gameActive = true;
      this.apiError = false;
      this.gamePhase = 0;
      this.gamePhase = 0;
      this.numCardsFlipped = 0;
      this.matchesMade = 0;
      this.turnsMade = 0;
      this.cardsFlipped = [];
      this.apiKanjiList = [];
      this.generateGameBoard();
    },
    generateGameBoard() {

      if(this.apiKey) {
        const url = 'https://api.wanikani.com/v2/level_progressions';
        fetch(url, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`
          }
        })
          .then(res => res.json())
          .then(res => {
            this.userLvl = res.data[res.data.length - 1].data.level;
          })
          .catch(() => {
            this.apiError = true;
          }) // then

          .finally(() => {
            let level = Math.floor(Math.random() * this.userLvl) + 1;
            const url = `https://api.wanikani.com/v2/subjects?levels=${level}`;
            fetch(url, {
              headers: {
                Authorization: `Bearer ${this.apiKey}`
              }
            })
            .then(res => res.json())
            .then(res => {

              const kanjiData = res.data.filter(obj => {
                return obj.object === 'kanji';
              });

              const kanjiIndexArr = [];
              while(kanjiIndexArr.length < 12) {
                let newNum = Math.floor(Math.random() * kanjiData.length);
                if(!kanjiIndexArr.includes(newNum)) {
                  kanjiIndexArr.push(newNum);
                }
              }

              let idCounter = 1;
              for(let index of kanjiIndexArr) {

                let newKanji = {
                  id: idCounter,
                  show: true,
                  matched: false
                };

                newKanji.kanji = kanjiData[index].data.characters;

                var readingsArr = kanjiData[index].data.readings;

                for(let singleReading of readingsArr) {
                  if(singleReading.primary) {
                    newKanji.reading = singleReading.reading
                    break;
                  }
                }
                this.apiKanjiList.push(newKanji)
                idCounter += 1;
              }

              let kanjiList1 = _.cloneDeep(this.apiKanjiList);
              let kanjiList2 = _.cloneDeep(this.apiKanjiList);

              this.genKanjiList(kanjiList1, kanjiList2);
            })
          })
      } else {
        let kanjiList1 = _.cloneDeep(this.kanjiList);
        let kanjiList2 = _.cloneDeep(this.kanjiList);
        this.genKanjiList(kanjiList1, kanjiList2);
      }

    },
    genKanjiList(kanjiList1, kanjiList2) {

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
    setApiKey(key) {
      this.apiKey = key;
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
    width: 100%;
    max-width: 970px;
    background-color: #3f51b5;
    box-sizing: border-box;
  }

</style>
