$(document).ready(function () {
    function hideLogo() {
        $("#logo").fadeOut(3000)
        setTimeout(() => {
            $("#login").css("display", "block")
        }, 3000);
    }
    hideLogo();
    
    $('.modal').modal();


});