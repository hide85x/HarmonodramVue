<template>
  <div class="team" >
    <fieldset class="form actors">
      <legend>Aktorzy</legend>
      <div class="actor" v-for="actor in playFromEvent.actors" :key="actor.id">
        <p>{{actor}}</p>
        <input type="checkbox" class="actorBtn input" id="close" />
      </div>
    </fieldset>

    <fieldset class="form actors">
      <legend>Technika</legend>
      <div class="actor" v-for="actor in playFromEvent.tech" :key="actor.id">
        <p>{{actor}}</p>
        <input type="checkbox" class="actorBtn" id="close" />
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: "Play",
  props: {
    playFromEvent:{
      type: Object || null,
  }
  },
  computed: {
      sortedActors() {
         return this.actors.sort((a, b) => a.imię  > b.imię )
      }
  },

  data() {
    return {
      actors: [
        { imię: "Devin", nazwisko: "Moana" },
        { imię: "Ross", nazwisko: "Mechelle" },
        { imię: "Zachery", nazwisko: "Kay" },
        { imię: "Mason", nazwisko: "Amber" },
        { imię: "Ivor", nazwisko: "Priscilla" },
        { imię: "Oscar", nazwisko: "Guinevere" },
        { imię: "Thor", nazwisko: "Ivy" },
        { imię: "Ralph", nazwisko: "Fatima" },
        { imię: "Guy", nazwisko: "Amelia" },
        { imię: "Kane", nazwisko: "Bree" },
        { imię: "Ethan", nazwisko: "Denise" },
        { imię: "Judah", nazwisko: "Camilla" },
        { imię: "Curran", nazwisko: "Lee" },
        { imię: "August", nazwisko: "Sonya" },
        { imię: "Reese", nazwisko: "Adara" },
        { imię: "Howard", nazwisko: "MacKenzie" },
        { imię: "Dustin", nazwisko: "Jael" },
        { imię: "Jermaine", nazwisko: "Mariam" },
        { imię: "Victor", nazwisko: "Felicia" },
        { imię: "Gary", nazwisko: "Amanda" },
        { imię: "Robert", nazwisko: "Julie" },
        { imię: "Dexter", nazwisko: "Ursa" },
        { imię: "Quamar", nazwisko: "Lillian" },
        { imię: "Randall", nazwisko: "Audra" },
        { imię: "Martin", nazwisko: "Ingrid" },
        { imię: "Raja", nazwisko: "Rylee" },
        { imię: "Denton", nazwisko: "Kiona" },
        { imię: "Benedict", nazwisko: "Rina" },
        { imię: "Darius", nazwisko: "Deirdre" },
        { imię: "Elton", nazwisko: "Hadassah" },
        { imię: "Yardley", nazwisko: "Sade" },
        { imię: "Hayden", nazwisko: "Anastasia" },
        { imię: "Vance", nazwisko: "Susan" },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "./event.scss";
</style>