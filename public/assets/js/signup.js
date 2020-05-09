$(document).ready(function() {
    // Getting references to our form and input
    var usernameInput = $("#username");
    var emailInput = $("#eSignup");
    var passwordInput = $("#eSignup");
  
    // When the signup button is clicked, we validate the email and password are not blank
    $("#signupBtn").on("click", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.email || !userData.password || !userData.username) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password);
      emailInput.val("");
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
        .then(function(data) {
          window.location.reload();
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  