<template lang="html">

  <div class="container">

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#"><h1>漢字mem</h1></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav mr-auto">
          <button
            class="btn btn-secondary"
            @click="startNewGame"
            :disabled="newGameDisabled"
          >New Game</button>
        </div>
      </div>
    </nav>

  </div>

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
