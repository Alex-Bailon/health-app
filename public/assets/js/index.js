/* eslint-disable no-undef */
$(document).ready(function () {
  // Transition effects for the html as well as the logo and login buttons
  function hideLogo () {
    $('html').fadeIn(2000);
    $('#logo').fadeIn(1500)
    $('.modal-trigger').fadeIn(2000).css('display', 'block')

  }
  hideLogo()
  // Modal settings
  $('.modal').modal({
    opacity: 0.6,
    inDuration: 500,
  });
  $('.slider').slider()
  // Collects email and password values from input
  $("#login").submit(function(e) {
    e.preventDefault()
    $.ajax("/api/login", {
      type: "POST",
      data: {email: $("#email").val(), password: $("#password").val()}
    }).then(function(data){
      localStorage.setItem("userId", data.id)
      window.location.replace("/userhome")
    })   
    .catch(function(err){
      console.log(err)
    })
  })
})
