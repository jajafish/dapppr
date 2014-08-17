$(document).ready(function() {


$('.size-container').on('click', function() {

  if ($(this).html() === "ADDED"){
    if($(this).hasClass('medium')){
      $(this).html('medium');
    }else if($(this).hasClass('large')){
      $(this).html('large');
    }else {
      $(this).html('small');
    }
  } else {
    $(this).html('ADDED');
  }
  document.location.href = '../checkout';

});


$('.settings-icon').on('click', function() {
  var imgSrcVal = $("img.prod_img").attr("src");
  console.log(imgSrcVal);
  window.location = 'localhost:3000/'+imgSrcVal;
});






// $('.shirt-items').on('hover', function(){
//   $(this).css('opacity', '0.7');
// });
//
// $('.item-container').on('hover', function(){
//   $('.size-container').css('opacity', '1');
//   $('this .shirt-items').css('opacity', '1');
//   $(this).css('opacity', '1');
// });







});
