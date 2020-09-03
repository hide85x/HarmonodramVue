<template>
  <div class="main">
    <fieldset class="eventType">
      <legend>Rodzaj wydarzenia</legend>
      <div class="eventType">
        <div class="space">
          <input type="radio" v-model="radioInput" id="spektakl" name="type" value="red" checked />
          <label for="spektakl">spektakl</label>
        </div>

        <div class="space">
          <input type="radio" v-model="radioInput" id="próba" name="type" value="blue" />
          <label for="próba">próba</label>
        </div>

        <div class="space">
          <input type="radio" v-model="radioInput" id="inne" name="type" value="yellowgreen" />
          <label for="inne">inne</label>
        </div>
      </div>
    </fieldset>
    <div class="data">
      <fieldset class="form">
        <legend>Szczegóły wydarzenia</legend>
        <form v-on:submit.prevent="submit">
          <label id="chooseplay" for="play">Wybierz przedstawienie</label>
          <select name="play" id="play" v-model="playFromEvent">
            <!-- <option v-if="playFromEvent" :selected="playFromEvent" :value="playFromEvent ">{{playFromEvent.title}}</option> -->
            <option
              :value="play"
              :selected="true"
              v-for="play in plays"
              :key="play.title"
            >{{play.title}}</option>
          </select>
        </form>
        <form v-on:submit.prevent="submit">
          <label v-if="!playFromEvent.title" for="title">tile:</label>
          <input
            v-if="!playFromEvent.title"
            id="title"
            type="text"
            v-model="titleFromInput"
            :placeholder="playFromEvent.title || titleFromInput "
            name="title"
          />
          <p v-if="playFromEvent">title:{{playFromEvent.title || titleFromInput}}</p>
          <p>starts: {{dateStart}}</p>
          <p>ends: {{dateEnd}}</p>
          <textarea v-model="textarea" name id cols="30" rows="6"></textarea>
        </form>
      </fieldset>
      <!-- mozna podawac propsy z ifem -->
      <Play :playFromEvent="playFromEvent" />
    </div>
    <div class="controls">
      <div>
        <button id="close" @click="$modal.hideAll()">X</button>
        <button @click="saveEvent">SAVE</button>
      </div>
    </div>
  </div>
</template>

<script>
import Play from "./Play";

import axios from "axios";
import moment from "moment";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "EventModal",
  components: { Play },
  data() {
    return {
      titleFromInput: "",
      radioInput: "",
      textarea: "",
      placeholder: this.titleFromInput,
      playFromEvent: this.event,
      plays: [
        {
          title: "Hamlet",
          actors: ["Janek Dupa", " Staś Zgaś", "Tomek Romek"],
          tech: ["MAreczek C", "Dariusz MNiriusz", "Gwozdzoui Młot"],
        },
        {
          title: "Romeo i Julia",
          actors: ["Blind Joe", " Staś Zgaśsd", "Wladek niejadek"],
          tech: ["MAreczek B", "Miriusz Dariusz", "Sarnecki Sarna"],
        },
      ],
    };
  },
  // watch: {
  //   placeholder(play) {
  //     this.playFromEvent= play
  //   }
  // },
  // mounted: {
  //   place: function placeholderCheck(){
  //     console.log(titleFromInput + "  dupaaqa")
  //   },

  // },
  created() {
      if(!this.newEvent) {
       this.playFromEvent = {
          title: this.event._def.title || "",
          actors: this.event._def.extendedProps.actors || "",
          tech: this.event._def.extendedProps.tech || "",
        };
      } else {
        return
      }
  },
  computed: {
    ...mapGetters(["EVENTS"]),
    dateStart() {
      return moment(this.event.startStr).format("YYYY/MM/DD  kk:mm");
    },
    dateEnd() {
      return moment(this.event.endStr).format("YYYY/MM/DD  kk:mm");
    },
  },
  props: {
    event: Object,
    newEvent: Boolean
  },
  methods: {
    ...mapMutations(["ADD_EVENT"]),
    saveEvent() {
      const payload = {
        title: this.playFromEvent.title || this.titleFromInput,
        start: this.event.startStr,
        end: this.event.endStr,
        color: this.radioInput,
        actors: this.playFromEvent.actors,
        tech: this.playFromEvent.tech,
      };
      if (!payload.title) {
        alert("tytul lajzo!");
        return;
      }
      try {
        this.ADD_EVENT(payload);
        console.log(payload);
        axios
          .post("http://localhost:3000/event/add", payload)
          .then((res) => res);
        this.$modal.hideAll();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped  lang="scss">
@import "./event.scss";
</style>