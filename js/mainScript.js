//=============================
//Make sure jquery is loaded
//=============================
$(function() {

  //SMOOTHSCROLL
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  //Run these when document ready
  $(document).ready(function(){


    // var bg_wh = '' + $(window).width() + ' ' + $(window).height() + '';
    // $('body.altBackground').css({'background-size':bg_wh});

    //intro video for website;
    document.getElementById('logo-video').addEventListener('ended', function() {
      $("#logo-video").addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        // after video has played hide it and the background then show logo and text
        $("#logo-video").addClass("hide");
        $("body").removeClass("altBackground").addClass('mainBackground');
        $("#home img").removeClass("hide").addClass('animated fadeIn');
        $("#home h3").removeClass("hide").addClass('animated fadeInDown');
        setTimeout( function(){
          $("#home h4").removeClass("hide").addClass('animated fadeInUp');
          $("#home hr").removeClass("hide").addClass('animated zoomIn');
        }, 2000);
      });
    });

    //CUSTOM SCROLLBAR SETUP
    $("html").niceScroll({
        mousescrollstep: 70,
        cursorcolor: "#3690de",
        cursorwidth: "5px",
        cursorborderradius: "10px",
        cursorborder: "none",
        autohidemode: "scroll"
    });

    $("#social .social-plugins").niceScroll({
        mousescrollstep: 70,
        cursorcolor: "#3690de",
        cursorwidth: "5px",
        cursorborderradius: "10px",
        cursorborder: "none",
        autohidemode: "scroll"
    });

    $('body').prepend("<a href='#home' class='fa fa-angle-double-up home_btn'></a>");

    //HOME
    // set current window size to all main sections
    $('#home').css({'height':$(window).height()});

    // NAVIGATION BAR
    setTimeout( function(){
      $(".navbar").removeClass("hide").addClass('animated fadeInDown');
    }, 500);

    // TEAM
    $("#team .member").hide();

    $("#team .crewmember").hover(
      function(){
        // $(this).find(".member").effect( "clip",1000);
        $(this).find(".member").show();
      },function(){
        $(this).find(".member").fadeOut(); //hide("blind",{},500);
      }
    );

    // PRESS
    $("#contact .press-slide .row").hide();

    $("#contact .press-slide .press-btn").click(function(){
      $("#contact .press-slide .row").toggle("slide",{direction:"down"});
    });
  
    //-----------------CONTACT FORMS------------------------
    $("#contact-submit ").click(function (event) {
      // everything looks good!
      event.preventDefault();
      submitContactForm();
    });

    function submitContactForm(){
      // Initiate Variables With Form Content
      var name = $("#name").val();
      var email = $("#email").val();
      var message = $("#message").val();
      
      $("#msgSubmitContact").empty();

      if (name == '' || email == '' || contact == '') {
        alert("Please Fill Required Fields");
      } 
      else {
        $.post("php/contactRequest.php", {
            name1: name,
            email1: email,
            message1: message
          }, function(data) {
            if (data) {
              $("#msgSubmitContact").append("<h4 class='light-blue-shadow'>Your request has been received. We will contact you soon!</h4>");
              // To reset form fields on success
              $("#contactForm")[0].reset();
            }
            else{
              $("#msgSubmitContact").append("<h4 class='light-blue-shadow'>Something went wrong :( </h4>");
            }
        });
      }
    }

    $("#betatest-submit ").click(function (event) {
      // everything looks good!
      event.preventDefault();
      submitBetaTestForm();
    });

    function submitBetaTestForm(){
      $("#msgSubmitBetatest").empty();

      // Initiate Variables With Form Content
      var email = $("#email").val();
      var atLeastOneIsChecked = false;

      if ($('#IOS').is(':checked') || $('#Android').is(':checked')) {
        atLeastOneIsChecked = true;
      }

      if (email == '' && !atLeastOneIsChecked) {
        alert("Please fill all fields");
      } 
      else{

        if ($('#IOS').is(':checked') && $('#Android').is(':checked')) {
          devicesSelected = "Android & IOS";
        }
        else{
          if ($('#Android').is(':checked')) {
            devicesSelected = "Android";
          }
          if ($('#IOS').is(':checked')) {
            devicesSelected = "IOS";
          }
        }

        $.post("php/betatestRequest.php", {
            email1: email,
            device: devicesSelected
          }, function(data) {
            if (data) {
              $("#msgSubmitBetatest").append("<h4 class='light-blue-shadow'>Your request has been received!</h4>");
              fbq('track', 'CompleteRegistration');
              // To reset form fields on success
              $("#betatestForm")[0].reset();
            }
            else{
              $("#msgSubmitBetatest").append("<h4 class='light-blue-shadow'>Something went wrong :( </h4>");
            }
        });
      }
    }

    //RESPONSIVE
    if ($(window).width() <= 980) {
      $(".navbar .menubar .navbar-header .navbar-toggle").click(function(){
        if ($(".navbar-collapse.menu").hasClass("collapse")) {
          $(".navbar .menubar .navbar-collapse.menu").removeClass("collapse in");
        }
        else{
          $(".navbar .menubar .navbar-collapse.menu").addClass("collapse in");
        }
      });

      $(".navbar .menubar .navbar-collapse .navbar-left").addClass("align-middle");

      $(".navbar .menubar .navbar-collapse .navbar-left li a").click(function(){
        $(".navbar .menubar .navbar-collapse.menu").removeClass("collapse").removeClass("in");
      });

      $(".navbar .menubar .navbar-header a").click(function(){
        $(".navbar .menubar .navbar-collapse.menu").removeClass("collapse").removeClass("in");
      });

    }

  });

}(jQuery));