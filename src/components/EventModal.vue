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

          <select name="play" id="play" v-model="selectedPlay">
            <option :value="play" selected v-for="play in plays" :key="play.title">{{play.title}}</option>
          </select>
        </form>
        <form v-on:submit.prevent="submit">
          <label for="title">title :</label>
          <input id="title" type="text" :placeholder="this.selectedPlay.title" name="title" />
          <p>title:{{this.selectedPlay.title || this.event.title}}</p>
          <p>starts: {{dateStart}}</p>
          <p>ends: {{dateEnd}}</p>
          <textarea v-model="textarea" name id cols="30" rows="6"></textarea>
        </form>
      </fieldset>
      <Play :selectedPlay="selectedPlay" />
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
      radioInput: "",
      textarea: "",
      selectedPlay: "",
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
  //   radioInput: function () {
  //     this.$emit("input", this.picked);
  //   },
  // },
  computed: {
    ...mapGetters(["EVENTS"]),
    dateStart() {
      return moment(this.event.startStr).format("YYYY/MM/DD  h:mm");
    },
    dateEnd() {
      return moment(this.event.endStr).format("YYYY/MM/DD  h:mm");
    },
  },
  props: {
    text: String,
    event: Object,
  },
  methods: {
    onChange(event) {
      console.log(event.target.value);
    },
    ...mapMutations(["ADD_EVENT"]),
    saveEvent() {
      const payload = {
        title: this.selectedPlay.title,
        start: this.event.startStr,
        end: this.event.endStr,
        color: this.radioInput,
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