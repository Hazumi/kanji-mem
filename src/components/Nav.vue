<template lang="html">

  <v-toolbar app color="indigo" dark>
    <h1>漢字mem</h1>
    <v-btn
      color="white"
      class="ml-3 indigo--text"
      @click="startNewGame"
      :disabled="newGameDisabled"
    >New Game</v-btn>
  </v-toolbar>

</template>

<script>
export default {
  data: function() {
    return {
      newGameDisabled: false
    }
  },
  methods: {
    startNewGame() {
      this.$emit('newGameStarted', true);
      this.newGameDisabled = true;
      setTimeout(() => {
        this.newGameDisabled = false;
      }, 7000);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
