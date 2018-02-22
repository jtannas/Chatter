/**
 * Helper functions for limited, generic problems
 */

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function pickRandom(arr) {
  return arr[randBetween(0, arr.length)];
}

module.exports = {
  randBetween,
  pickRandom
}
