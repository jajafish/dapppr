$(window).load(function() {

   $('#loader-container').css('display', 'none');

 });

$('.settings-icon').on('click', function() {
  var imgSrcVal = $("img.prod_img").attr("src");
  console.log(imgSrcVal);
  window.location = 'localhost:3000/'+imgSrcVal;
});

