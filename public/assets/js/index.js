/* eslint-disable no-undef */
$(document).ready(function () {
  function hideLogo () {
    $('#logo').fadeOut(2000)
    setTimeout(() => {
      $('#login').css('display', 'block')
    }, 2000)
  }
  hideLogo()

  $('.modal').modal()
  $('.slider').slider()
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
