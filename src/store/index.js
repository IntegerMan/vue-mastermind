import Vue from 'vue';
import Vuex from 'vuex';

// This file contains a lot of utility code for the actual game logic
import GameService from '../services/GameService.js';

Vue.use(Vuex)

const solutionLength = 4;
const maxGuesses = 10;
const choices = ['Blue', 'Green', 'Orange', 'Violet', 'Red', 'Yellow'];

export default new Vuex.Store({
  strict: true,

  // State is application-wide data that can be watched by various components
  // State is interacted with via this.$store.state.myVariableName
  state: {
    isGameOver: false,
    movesLeft: maxGuesses,
    history: [],
    message: '',
    solution: GameService.generateSolution(solutionLength, choices),
    guess: GameService.buildInitialGuess(solutionLength, choices),
    choices: choices,
    lastMove: null,
  },

  // Actions are things that let you run multiple mutations. 
  // They're used for more complex operations and are called via this.$store.dispatch('actionName);
  actions: {
    guess(store) {
      // Commit the evaluate guess mutation. This kicks off more logic
      store.commit('EVALUATE_GUESS');

      // If the game has ended, fire off the appropriate mutation
      if (store.state.lastMove.numCorrect === solutionLength) {
        store.commit('GAME_OVER', true);
      } else if (store.state.movesLeft <= 0) {
        store.commit('GAME_OVER', false);
      }
    }
  },

  // Mutations are independent operations that modify application data
  // They're run by calling this.$store.commit('MUTATION_NAME')
  mutations: {
    /**
     * Handles the user changing a field on a guess, prior to clicking guess
     * @param state the previous application state
     * @param payload the color choice the user made, including the new color and the index
     */
    CHANGE_COLOR(state, payload) {
      state.guess[payload.index] = payload.color
    },     
    /**
     * Resets the game state to a new state. This is run on application start
     * @param state the previous application state
     */
    RESTART_GAME(state) {
      console.log('Resetting game state');
      state.isGameOver = false;
      state.movesLeft = maxGuesses;
      state.solution = GameService.generateSolution(solutionLength, choices),
      state.history = [];
      state.message = '';
      state.lastMove = null;
    },
    /**
     * Guesses the currently selected colors and updates the game accordingly
     * @param state the previous application state
     */    
    EVALUATE_GUESS(state) {
      const move = GameService.evaluateGuess(state.guess, state.solution);

      // Ensure we record the ID of the move
      move.id = state.history.length + 1;
      state.history.push(move);
      state.lastMove = move;

      // Remove a move remaining
      state.movesLeft--;    
    },   
    /**
     * Handles the occurrence where the game has ended - either in victory or defeat
     * @param state the previous application state
     */   
    GAME_OVER(state, isWin) {
      state.isGameOver = true;

      if (isWin) {
        state.message = 'You win!';
      } else {
        state.message = 'You lost yet again.';  
      }
    },
  },
  getters: {
  },
  modules: {
  }
})
