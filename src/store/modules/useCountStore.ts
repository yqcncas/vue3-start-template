import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCountStore = defineStore('useCountStore', {
  state: () => {
    return {
      counter: 0,
      random: 0
    }
  },
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    }
  }
})
