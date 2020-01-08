<template>
  <div id="app">

    <app-nav @newGameStarted="startNewGame"></app-nav>
    <p>gameActive: {{ gameActive }}</p>

    <div class="container">
      <div class="row">
        <div class="col-12">
          <app-gameboard v-if="gameActive"></app-gameboard>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Gameboard from './components/Gameboard.vue';
import Nav from './components/Nav.vue';

export default {
  name: 'app',
  components: {
    'app-gameboard': Gameboard,
    'app-nav': Nav
  },
  data: function() {
    return {
      gameActive: false
    }
  },
  methods: {
    startNewGame() {
      this.gameActive = true;
      // NEW GAME LOGIC GOES HERE
    }
  }
}
</script>

<style>

</style>
