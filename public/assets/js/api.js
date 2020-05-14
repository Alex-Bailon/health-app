$.ajaxSetup({ headers: { 'x-user-id': localStorage.getItem("userId") } });
$(document).ready(function () {
  $("#foodform").on("submit", function (event) {
    event.preventDefault()
    var foodSearch = {
      item: $("#foodSearch").val().trim()
    }
    $.ajax("/api/food", {
      type: "POST",
      data: foodSearch
    }).then(
      function (data) {
        // Reload the page to get the updated list
        $("#calChart").text(data.calories)
        // console.log(data)

        var ctx = $("#calChart");
        var myCalChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            datasets: [{
              data: [data.calories, (2000 - data.calories)], 
              backgroundColor: "red"
            }]
          },
          options: {}
        });

        var ctx = $("#fatChart");
        var myFatChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            datasets: [{
              data: [data.totalNutrients.FAT.quantity.toFixed(2), (77 - data.totalNutrients.FAT.quantity.toFixed(2))], 
              backgroundColor: "green"
            }]
          },
          options: {}
        });
        
        var ctx = $("#sugarChart");
        var mySugarChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            datasets: [{
              data: [data.totalNutrients.SUGAR.quantity.toFixed(2), (37 - data.totalNutrients.SUGAR.quantity.toFixed(2))], 
              backgroundColor: "orange"
            }]
          },
          options: {}
        });

        var ctx = $("#carbChart");
        var myCarbChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            datasets: [{
              data: [data.totalNutrients.CHOCDF.quantity.toFixed(2), (275 - data.totalNutrients.CHOCDF.quantity.toFixed(2))], 
              backgroundColor: "blue"
            }]
          },
          options: {}
        });
         }
    );

  });
});