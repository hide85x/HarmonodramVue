<template>
  <div id="app">
    <FullCalendar />
  
  </div>
</template>

<script>
import FullCalendar from './components/FullCalendar.vue'


export default {
  name: 'App',
  components: {
    FullCalendar
  }, 
 
}
</script>

<style lang="scss">
* {
    font-family: montserrat, sans-serif;

}
#app {
  font-family: montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
