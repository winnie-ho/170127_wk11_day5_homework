
let page = new Vue({
  el: '#page',
  data: {
  },
  components: {
    'weather-now': weatherNow,
    'weather-forecast': weatherForecast
  },
  methods: {
    test: () => console.log("HELLO")
  }
});