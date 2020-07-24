<template>
  <div id="app">
    <h1>Mastermind</h1>
    <p>
      Kata implementation for
      <a href="https://www.TechElevator.com">Tech Elevator</a> by
      <a href="https://www.LinkedIn.com/in/MattEland">Matt Eland</a> as a
      learning exercise for Vue.js and Vuex.
    </p>
    <history-list />
    <p v-if="message" class="message">{{ message }}</p>
    <div v-if="!isGameOver">
      <h2>Your Guess</h2>
      <enter-guess />
    </div>
    <div class="restart">
      <a @click="reset" href="#">Restart Game</a>
    </div>
  </div>
</template>

<script>
import HistoryList from './components/HistoryList.vue'
import EnterGuess from './components/EnterGuess.vue'

export default {
  name: 'Mastermind',

  components: {
    HistoryList,
    EnterGuess
  },

  methods: {
    reset() {
      this.$store.commit("RESTART_GAME");
    }
  },

  computed: {
    isGameOver() {
      return this.$store.state.isGameOver;
    },
    message() {
      return this.$store.state.message;
    }
  },

  // Created is a special method that fires when the component initially loads
  created() {
    this.$store.commit("RESTART_GAME");
  },
}
</script>

<style lang="scss">
$FOREGROUND_COLOR: #2c3e50;
$DEFAULT_MARGIN: 2rem;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: $FOREGROUND_COLOR;
  margin-top: $DEFAULT_MARGIN;
  margin-left: $DEFAULT_MARGIN;
}
.message {
  font-weight: bold;
  margin-top: $DEFAULT_MARGIN;
  margin-bottom: $DEFAULT_MARGIN;
}
.restart {
  margin-top: $DEFAULT_MARGIN;
}
</style>
