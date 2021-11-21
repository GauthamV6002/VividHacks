$(document).ready(() => {
    hideIfEmpty = $(".hideIfEmpty");
    if(hideIfEmpty.text()){
        hideIfEmpty.show();
    } else {
        hideIfEmpty.hide();
    }
})

const discussionQuestions = [
    "Do you have a pet?",
    "What did you do today?",
    "What country do you live in? What's it like?",
    "Do you play a musical instrument?",
    "Who's in your family?",
    "What's your favourite hobby?"
  ]; // add more!

  $(document).ready(function(){
  
    $(".initial-hide").hide();
  
    function initLogin(isNewUser) {
      $("#ad").hide();
      $("#login").show();
      $("#error").hide();
      $("#main-div").addClass("dark-back");
      if (isNewUser) {
        $('#login-or-signup').text("Signup");
      } else {
        $('#login-or-signup').text("Login");
      }
      let userNumber = Math.floor(Math.random() * (10000 - 1) + 1); // doesnt handle clashes between multiple numbers, just picks a random one for now
      $("#alien-name").text(`Your alien name will be: Alien${userNumber}`);
      setCookie("userNumber", userNumber, 10); // remember user number, for 10 days? long term storage in cloud preferably; try to not use cookies; can you store this info elsewhere?
    }
  
    $("#signup-trigger").click(function(){
      initLogin(true)
    });
  
    $("#login-trigger").click(function(){
      initLogin(false)
    });
  
    $(".profile-pic").click(function(){
      $('.profile-pic').attr('class', 'profile-pic');
      $(this).attr('class', 'profile-pic backed');
      let profilePicSource = $(this).attr('src')
      setCookie("user_img", profilePicSource, 10); //again, 10? should we use cookies at all?
    });
  
    $("#login-submit").click(function(){
      /*
      if (no profile pic was selected (ex check cookie using getCookie, database...)) {
        $(#"error").show();
        return "";
      }
      */
      $('#login').hide();
      $('#chatroom').show();
      $('#discussion-idea').text(
        "Discussion Idea: " + discussionQuestions[Math.floor(Math.random() * (discussionQuestions.length - 1) + 1)]
      );
    });
  
    $("#share-contact").click(function(){
      // share contact, open that application
    });
  
    $("#farewell").click(function(){
      // reload chatbox, query new user
    });
  
    $("#block").click(function(){
      // block current user, reload chatbox, query new friend
    });
  
  });