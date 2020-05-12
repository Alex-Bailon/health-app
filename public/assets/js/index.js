/* eslint-disable no-undef */
$(document).ready(function () {
  function hideLogo () {
    $('#logo').fadeOut(3000)
    setTimeout(() => {
      $('#login').css('display', 'block')
    }, 3000)
  }
  hideLogo()

  $('.modal').modal()
  $('.slider').slider();

  

  // // Getting references to our form and inputs
  // var emailInput = $("#email");
  // var passwordInput = $("#password");

  // // When the form is submitted, we validate there's an email and password entered
  // $("#login").on("submit", function(event) {
  //   event.preventDefault();
  //   var userData = {
  //     email: emailInput.val().trim(),
  //     password: passwordInput.val().trim()
  //   };

  //   if (!userData.email || !userData.password) {
  //     return;
  //   }

  //   // If we have an email and password we run the loginUser function and clear the form
  //   console.log('loginuser Function')
  //   loginUser(userData.email, userData.password);
  //   emailInput.val("");
  //   passwordInput.val("");
  // });

  // // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  // function loginUser(email, password) {
  //   $.post("/api/login", {
  //     email,
  //     password
  //   })
  //     .then(function(data) {
  //       console.log('logged in')
  //       window.location.replace("/userhome")
  //       // If there's an error, log the error
  //     })
  // }
})
