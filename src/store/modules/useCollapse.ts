import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCollapse = defineStore('useCollapse', {
  state: () => {
    return {
      isCollapse: false
    }
  },
  actions: {
    handleCollapse() {
      // this.isCollapse = !this.isCollapse
      this.$patch({
        isCollapse: !this.isCollapse
      })
    }
  },
  getters: {
    iconCollapse: (state) => state.isCollapse
  }
})
