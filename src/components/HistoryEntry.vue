<template>
  <div>
    <span v-for="guess in move.guess" :key="guess"
          :title="guess"
          :class="`color${guess}`">
      {{ guess[0] }}
    </span>
    <span class="grading"
          :title="`${move.numCorrect} exactly correct, ${move.numMisplaced} partially correct`">

      <!-- Check marks for exactly correct colors-->
      <span v-for="num in move.numCorrect" :key="'correct' + num">        
        &#10003;  <!-- Character code for a check mark -->
      </span>

      <!-- Light Circles for misplaced colors -->
      <span v-for="num in move.numMisplaced" :key="'partial' + num">        
        &#9675; <!-- Character code for a light circle -->
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: ['move'],
};
</script>

<style scoped lang="scss">
span {
    font-size: larger;
}

.grading {
  margin-left: 3rem;
  color: green;
}

span {
  font-weight: bold;
}

.colorRed {
  color: red;
}
.colorGreen {
  color: green;
}
.colorBlue {
  color: blue;
}
.colorViolet {
  color: purple;
}
.colorYellow {
  color: rgb(143, 140, 0);
}
.colorOrange {
  color: rgb(255, 123, 0);
}
</style>
