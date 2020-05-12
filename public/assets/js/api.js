/* eslint-disable no-undef */
$(document).ready(function () {
$("#foodform").on("submit", function(event){
event.preventDefault()
var foodSearch = {
  item: $("#foodSearch").val().trim()
}
$.ajax("/api/food", {
  type: "POST",
  data: foodSearch
}).then(
  function() {
    // Reload the page to get the updated list
    location.reload();
    
  }
);

});
});
