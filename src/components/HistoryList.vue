<template>
  <div v-if="moves.length">
    <h2>Past Guesses</h2>
    <history-entry v-for="move of moves" v-bind:key="move.id"
                   v-bind:move="move" />
  </div>
</template>

<script>
import HistoryEntry from "./HistoryEntry.vue";

export default {
  components: {
    HistoryEntry
  },
  computed: {
    moves() {
      return this.$store.state.history;
    }
  }
};
</script>
