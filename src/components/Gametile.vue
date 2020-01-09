<template lang="html">
  <div>
    <p v-if="kanji.type == 'reading'">{{ kanji.reading }}</p>
    <p v-else>{{ kanji.kanji }}</p>
  </div>
</template>

<script>
export default {
  props: ['kanji']
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
    font-size: 2em;
  }
  .gameboard__tile:hover {
    cursor: pointer;
    background-color: #f9f9f9;
  }

</style>
