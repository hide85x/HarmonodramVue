import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [{
      title: "Dupa",
      start:"2020-08-24",
      end: "2020-08-28",
      title: "Romeo i Julia",
      actors: ["Blind Joe", " Staś Zgaśsd", "Wladek niejadek"],
      tech: ["MAreczek B", "Miriusz Dariusz", "Sarnecki Sarna"],

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
