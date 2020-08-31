import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [{
      title: "Dupa",
      start:"2020-08-24",
      end: "2020-08-28"
    }]
  },
  getters: {
    EVENTS: state=>{
      return  state.events}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },

  actions: {
  },
  modules: {
  }
})
