<template lang="html">
  <div name="fade" @click="cardFlipped">

    <div v-if="kanji.show">
      <p v-if="kanji.type == 'reading'">{{ kanji.reading }}</p>
      <p v-else>{{ kanji.kanji }}</p>
    </div>

  </div>
</template>

<script>
export default {
  props: ['kanji', 'gamePhase', 'cardsFlipped', 'numCardsFlipped', 'boardSetup'],
  data: function() {
    return {
      matchFound: false
    }
  },
  methods: {
    cardFlipped() {
      if(this.gamePhase === 1 &&
          this.numCardsFlipped < 2 &&
          !this.kanji.matched &&
          !this.cardsFlipped.includes(this.kanji)
      ) {
        this.kanji.show = !this.kanji.show
        this.$emit('cardFlipped', this.kanji);
      }
    }
  }
}
</script>

<style lang="css" scoped>

  .gameboard__tile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border: 1px solid #c8c8c8;
    font-size: 2.5em;
  }
  .gameboard__tile:hover {
    cursor: pointer;
    background-color: #f9f9f9;
  }

</style>
