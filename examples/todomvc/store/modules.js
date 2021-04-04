
export default {
  main: {
    namespaced: true,
    state: {
      main: 22
    },
    getters: {
      getName (state) {
        return state.main + 33
      }
    },
    mutations: {
      handle () {
        console.log('mutations handle')
      }
    },
    actions: {
      handleAction () {
        console.log('actions handle')
      }
    }
  },
  test: {
    namespaced: true,
    state: {
      main: 22332
    },
    getters: {
      getName (state) {
        return state.main + 33
      }
    },
    mutations: {
      handle () {
        console.log('mutations handle')
      }
    },
    actions: {
      handleAction () {
        console.log('actions handle')
      }
    }
  }
}
