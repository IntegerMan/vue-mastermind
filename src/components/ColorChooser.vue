<template>
  <select v-model="choice" 
          v-on:change="onSelected">
    <option v-for="color of choices" v-bind:key="color" 
            v-bind:value="color">
      {{ color }}
    </option>
  </select>
</template>

<script>
export default {
  props: ['colorIndex'],
  data: function() {
    return { 
      choice: "" 
    };
  },
  computed: {
    choices() {
      return this.$store.state.choices;
    }
  },
  methods: {
    onSelected() {
      const payload = {index: this.colorIndex, color: this.choice};
      this.$store.commit("CHANGE_COLOR", payload);
    }
  },
  created() {
    this.choice = this.$store.state.guess[this.index];
  }
};
</script>
