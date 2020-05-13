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
})
