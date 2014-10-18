
$(document).ready(function() {
  $('.secondSignupForm .lastInputOnForm').keyup(function(event){    
      var passwordConf = $(this),
           insertedPW = passwordConf.val(),
           insertedPwLength = insertedPW.length;
           pwLength = $('.userPassword').val().length;
      //check if user has inserted the correct password length
      if (insertedPwLength !== pwLength) {
          //if he hasn't..
          //hide the submit button
          $('.secondSignupForm').removeClass('is-active').find('.formLoading').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      } else {
          //if he has..
          //show the submit button
          $('.secondSignupForm').addClass('is-active');
      }
  });
  
});