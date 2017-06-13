$(document).ready(function(){
  $('.new-tweet textarea').on('input', function(){
    const charLimit = 140;
    const charLength = $(this).val().length;
    const charRemaining = charLimit - charLength;
    const $counter = $(this).parent().children('.counter');
    $counter.text(charRemaining);
  });
});