$(document).ready(function(){
  $('.new-tweet textarea').on('input', function(){
    const charLimit = 140;
    const charLength = $(this).val().length;
    const charRemaining = charLength - charLimit;
    console.log(charRemaining);
  });
});