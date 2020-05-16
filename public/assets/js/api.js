/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$.ajaxSetup({ headers: { 'x-user-id': localStorage.getItem('userId') } })
$(document).ready(() => {
  function makeChart (data, max, color) {
    return {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [data, Math.max(max - data, 0)],
            backgroundColor: [color, 'lightgray'],
            fillOpacity: 0.3
          }
        ],
        labels: ['Total', 'Recommended']
      },
      options: {
        legend: {
          labels: {
            fontColor: 'white',
            fontStyle: 'bold',
            fontSize: 18
          }
        }
      }
    }
  }
  let calTotal
  let fatTotal
  let sugarTotal
  let carbTotal
  const today = new Date().getDate()
  let todayStored = new Date().getDate()
  console.log(today)
  console.log(todayStored)
  initDate()
  if (+today === +todayStored) {
    console.log('if')
    calTotal = localStorage.getItem('calTotal')
    fatTotal = localStorage.getItem('fatTotal')
    sugarTotal = localStorage.getItem('sugarTotal')
    carbTotal = localStorage.getItem('carbTotal')
    localStorage.setItem('todayStored', todayStored)
  } else {
    console.log('else')
    calTotal = 0
    fatTotal = 0
    sugarTotal = 0
    carbTotal = 0
    todayStored = today
    localStorage.setItem('todayStored', todayStored)
    localStorage.setItem('calTotal', calTotal)
    localStorage.setItem('fatTotal', fatTotal)
    localStorage.setItem('sugarTotal', sugarTotal)
    localStorage.setItem('carbTotal', carbTotal)
  }
  function totalCharts () {
    $('#calHeader').text('Calories')
    $('#fatHeader').text('Fat in Grams')
    $('#sugarHeader').text('Sugar in Grams')
    $('#carbHeader').text('Carbs in Grams')

    const ctx = $('#calChart')
    const myCalChart = new Chart(ctx, makeChart(calTotal, 2000, '#D38B5D'))

    const ctx2 = $('#fatChart')
    const myFatChart = new Chart(ctx2, makeChart(fatTotal, 55, '#739e82'))

    const ctx3 = $('#sugarChart')
    const mySugarChart = new Chart(ctx3, makeChart(sugarTotal, 32, '#2c5530'))

    const ctx4 = $('#carbChart')
    const myCarbChart = new Chart(ctx4, makeChart(carbTotal, 275, '#99621e'))
  }
  if (window.location.pathname === '/userhome') {
    totalCharts()
  }
  $('#foodform').on('submit', event => {
    event.preventDefault()
    var foodSearch = {
      item: $('#foodSearch')
        .val()
        .trim()
    }
    console.log(foodSearch)
    $.ajax('/api/food', {
      type: 'POST',
      data: foodSearch
    }).then(data => {
      console.log(data)
      $('.itemCal').text(data.calories)
      $('.itemFat').text(data.totalNutrients.FAT.quantity.toFixed(2))
      $('.itemSugar').text(data.totalNutrients.SUGAR.quantity.toFixed(2))
      $('.itemCarbs').text(data.totalNutrients.CHOCDF.quantity.toFixed(2))
      $('#addBtn').on('click', () => {
        calTotal = +calTotal + +$('.itemCal').text()
        fatTotal = +fatTotal + +$('.itemFat').text()
        sugarTotal = +sugarTotal + +$('.itemSugar').text()
        carbTotal = +carbTotal + +$('.itemCarbs').text()
        localStorage.setItem('calTotal', calTotal)
        localStorage.setItem('fatTotal', fatTotal)
        localStorage.setItem('sugarTotal', sugarTotal)
        localStorage.setItem('carbTotal', carbTotal)
        location.reload()
      })
    })
  })
  function initDate () {
    var ret = JSON.parse(localStorage.getItem('todayStored'))
    if (ret !== null) {
      todayStored = ret
    }
  }
})
