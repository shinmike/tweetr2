$(document).ready(function(){
  $('.new-tweet textarea').on('input', function(){
    const charLimit = 140;
    const charLength = $(this).val().length;
    const charRemaining = charLimit - charLimit;
    console.log(charRemaining);
    const $counter = $(this).parent().children('.counter');
    $counter.text(charRemaining);
  });
});