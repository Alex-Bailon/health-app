$(document).ready(function() {
    // Getting references to our form and input
    var usernameInput = $("#username");
    var emailInput = $("#eSignup");
    var passwordInput = $("#eSignup");
  
    // When the signup button is clicked, we validate the email and password are not blank
    $("#signUp").on("submit", function(event) {
      event.preventDefault();
      console.log('clicked')
      var userData = {
        email: emailInput.val().trim(),
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password || !userData.username) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password, userData.username);
      emailInput.val("");
      usernameInput.val("")
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, username) {
      $.post("/api/signup", {
        username: username,
        email: email,
        password: password
      })
        .then( () => {
          console.log('done')
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(err => {
          console.log(err)
        })
    }
  })