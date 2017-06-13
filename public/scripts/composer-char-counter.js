$(document).ready(function(){
  console.log("document ready!");
  $('.new-tweet textarea').on('input', function(){
    console.log($(this).val().length);
  });
});

console.log("composer-char-counter added!");