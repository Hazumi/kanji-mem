<template lang="html">
  <div class="">

    <div class="gameboard">
      <app-gametile
        v-for="kanji in kanjiList"
        class="gameboard__tile"
        :key="kanji.id"
      >
        <p slot="kanji">{{ kanji }}</p>
      </app-gametile>
    </div>

  </div>
</template>

<script>
import Gametile from './Gametile.vue';
export default {
  components: {
    'app-gametile': Gametile
  },
  data: function() {
    return {
      kanjiList: [
        {
          id: 1,
          kanji: '一',
          meaning: 'one'
        },
        {
          id: 2,
          kanji: 'ニ',
          meaning: 'two'
        },
        {
          id: 3,
          kanji: '三',
          meaning: 'three'
        },
        {
          id: 4,
          kanji: '四',
          meaning: 'four'
        },
        {
          id: 5,
          kanji: '五',
          meaning: 'five'
        },
        {
          id: 6,
          kanji: '六',
          meaning: 'six'
        },
        {
          id: 7,
          kanji: '七',
          meaning: 'seven'
        },
        {
          id: 8,
          kanji: '八',
          meaning: 'eight'
        },
        {
          id: 9,
          kanji: '九',
          meaning: 'nine'
        },
        {
          id: 10,
          kanji: '百',
          meaning: 'hundred'
        },
        {
          id: 11,
          kanji: '千',
          meaning: 'thousand'
        },
        {
          id: 12,
          kanji: '万',
          meaning: 'ten thousand'
        }
      ]
    }
  },
  created() {

  }
}
</script>

<style lang="css" scoped>
  .gameboard {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #c8c8c8;
    max-width: 750px;
    box-sizing: content-box;
    border-radius: 4px;
  }
</style>
