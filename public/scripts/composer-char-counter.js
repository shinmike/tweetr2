$(function(){

  $('.new-tweet textarea').on('input', function(){
    var charLimit = 140;
    var charLength = $(this).val().length;
    var charRemaining = charLimit - charLength;
    var $counter = $(this).parent().children('.counter');
    $counter.text(charRemaining);
    if (charRemaining < 0){
      $counter.addClass('overLimit');
    } else {
      $counter.removeClass('overLimit');
    }
  });

});