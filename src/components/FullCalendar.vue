<template>
  <div>
    <div class="container">
      <!-- <button @click="week">toggle weekends</button> -->
      <!-- <button @click="addEvent">add event</button> -->
      <br />
      <button id="day" @click="dayView">month view</button>
      <button id="month" @click="monthView">day view</button>
      <!-- <button @click="plus">count plus</button> -->
      <!-- <button class="getall" @click="getEvents">ComeOverHere</button> -->
    </div>
    <FullCalendar id="fullCalendar" ref="fullCalendar" class="calendar" :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";
import moment from "moment";
import { mapState, mapMutations, mapGetters } from "vuex";
import axios from "axios";

import EventModal from "./EventModal";

moment.locale("pl");

export default {
  data() {
    return {};
  },
  components: {
    FullCalendar,
  },
  computed: {
    ...mapGetters(["EVENTS"]),
    calendarOptions() {
      return {
        plugins: [
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          momentPlugin,
        ],
        initialView: "dayGridMonth",
        select: this.handleClick,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        eventClick: this.handleClick,
        weekends: true,
        timeZone: "local",
        locale: "pl",
        events: this.EVENTS,
      };
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/event/all")
      .then((result) => {
        result.data.map((el) => {
          this.ADD_EVENT(el);
        });
      })
      .catch((err) => console.log(err));
  },
  methods: {
    ...mapMutations(["ADD_EVENT"]),

    handleClick(arg) {
      //sprawzamy czy klikamy w nowy event czy tworzymy nowy

      const isNewEvent = !arg.hasOwnProperty("event");
      if (isNewEvent) {
        console.log(arg.startStr);
        console.log(arg.startStr);
        this.$modal.show(EventModal, {
          text: "Auto generatewd msg from modal",
          event: arg,
        });
        return;
      }
      this.$modal.show(EventModal, {
        text: "Auto generatewd msg from modal",
        event: arg.event,
      });
    },

    dayView() {
      const CalendarApi = this.$refs.fullCalendar.getApi();
      CalendarApi.changeView("dayGridMonth");
    },
    monthView() {
      const CalendarApi = this.$refs.fullCalendar.getApi();
      CalendarApi.changeView("timeGridWeek");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#fullCalendar {
}
.container {
  .calendar {
    padding: 200px;
  }
  .getall {
    color: white;
    margin: 5px;
    height: 30px;
    background-color: black;
    box-shadow: 10px 10px 2px grey;
    transition: all 0.3s ease-in;

    &:hover {
      box-shadow: -10px -10px 2px grey !important;
      cursor: pointer;
      color: greenyellow;
    }
  }
  #day,
  #month {
    margin-top: 5px;
    background-color: dodgerblue;
    color: white;
    border: none;
    padding: 10px;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  #day {
    border-radius: 20px 0 0 20px;
    margin-right: 1px;
  }
  #month {
    border-radius: 0 20px 20px 0;
  }
}
</style>
