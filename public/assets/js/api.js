/* eslint-disable no-undef */
$(document).ready(function () {
  $('#foodform').on('submit', function (event) {
    event.preventDefault()
    var foodSearch = $('#foodSearch')
      .val()
      .trim()
    var settings = {
      async: true,
      crossDomain: true,
      url:
        'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=' +
        foodSearch,
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com',
        'x-rapidapi-key': '7414a69555mshdafeae439feb5b5p14f0dejsn72987a0fcc7a'
      }
    }
    $.ajax(settings).done(function (response) {
      console.log(response)
    })
  })
})
