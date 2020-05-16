/* eslint-disable no-undef */
$(document).ready(function () {
  function hideLogo () {
    $('html').fadeIn(2000);
    // $('#logo').fadeOut(500)
    $('#logo').fadeIn(1500)
    setTimeout(() => {
      // $('.modal-trigger').css('display', 'block')
      $('.modal-trigger').fadeIn(2000).css('display', 'block')
    }, 500)
  }
  hideLogo()


  $('.modal').modal({
    opacity: 0.6,
    inDuration: 300,
    
});
  
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
