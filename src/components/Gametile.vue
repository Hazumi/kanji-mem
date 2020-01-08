<template lang="html">
  <div>
    <slot name="kanji"></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>

  .gameboard__tile {
    width: 150px;
    height: 150px;
    border: 1px solid #c8c8c8;
  }
  .gameboard__tile:hover {
    cursor: pointer;
    background-color: #f9f9f9;
  }

</style>
