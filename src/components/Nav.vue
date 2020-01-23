<template lang="html">

  <v-toolbar app color="indigo" dark>
    <h1>漢字mem</h1>
    <v-btn
      color="white"
      class="ml-3 indigo--text"
      @click="startNewGame"
      :disabled="newGameDisabled"
    >New Game</v-btn>

    <label class="ml-10">
      WaniKani API Key V2 <small>(read only)</small>
      <input class="ml-1 input" type="text" value="59e23db7-2a0f-4d0a-8a2c-b6dd003b86bb">
    </label>

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
  .input {
    background-color: #fff;
    border-radius: 4px;
    color: #3f51b5;
    width: 325px;
    padding: 0.2em;
  }
</style>
