$.ajaxSetup({ headers: { 'x-user-id': localStorage.getItem('userId') } })
$(document).ready(function () {
  $('#foodform').on('submit', function (event) {
    event.preventDefault()
    var foodSearch = {
      item: $('#foodSearch')
        .val()
        .trim()
    }
    $.ajax('/api/food', {
      type: 'POST',
      data: foodSearch
    }).then(function (data) {
      // Reload the page to get the updated list
      $('#calChart').text(data.calories)
      // console.log(data)

      function makeChart(data, max, color) {
        return {
          type: 'doughnut',
          data: {
            datasets: [
              {
                data: [data, max - data],
                backgroundColor: color
              }
            ]
          },
          options: {}
        }
      }

      const ctx = $('#calChart')
      const myCalChart = new Chart(ctx, makeChart(data.calories, 2000, 'red'))


      const ctx2 = $('#fatChart')
      const myFatChart = new Chart(ctx2, makeChart(data.totalNutrients.FAT.quantity.toFixed(2), 77, 'green'))


      const ctx3 = $('#sugarChart')
      const mySugarChart = new Chart(ctx3, makeChart(data.totalNutrients.SUGAR.quantity.toFixed(2), 37, 'ornage'))

      const ctx4 = $('#carbChart')
      const myCarbChart = new Chart(ctx4, makeChart(data.totalNutrients.CHOCDF.quantity.toFixed(2), 275, 'blue'))
    })
  })
})
