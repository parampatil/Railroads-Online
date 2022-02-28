//Back to TOP


$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    $('#back-to-top').addClass('show');
  } else {
    $('#back-to-top').removeClass('show');
  }
});

$('#back-to-top').on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});
