// ----------------------------------------------------- Function for error message
function showError(message){
  alert(message);
};

$(function(){

  $('#textTweet').focus();

// ----------------------------------------------------- Form submission using Jquery
  $('#createTweet').on('submit', function(event){
    event.preventDefault();
    var tweetLength = $('#textTweet').val().length;

// ----------------------------------------------------- Validation 1
    if (tweetLength === 0) {
      showError("You didn't tweet anything :(");
      return;
    }; 
// ----------------------------------------------------- Validation 2
    if (tweetLength > 140){
      showError("You exceeded 140 characters :(");
      return;
    };

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    }).done(function(){
      console.log('AJAX POST request successful!!!');
      $('#textTweet').val('');
      loadTweets();
    })

  });

  function createTweetElement(tweetObject){
    var $article = $('<article class="tweet">');
    var $header = $('<header>');
    var $avatar = $('<img class="avatar" src=' + tweetObject.user.avatars.small + '>' );
    var $h2 = $('<h2 class="username">' + tweetObject.user.handle + '</h2>');
    var $h1 = $('<h1 class="fullname">' + tweetObject.user.name + '</h2>');
    var $divTweetContent = $('<div class="tweet-content">');
    var $p = $('<p>' + tweetObject.content.text + '</p>');
    var $footer = $('<footer>');
    var $divIcons = $('<div class="icons">');
    var $iFlag = $('<i class="fa fa-flag">');
    var $iRetweet = $('<i class="fa fa-retweet">');
    var $iHeart = $('<i class="fa fa-heart">');
    var $pTimestamp = $('<p class="timestamp">' + moment(tweetObject.created_at).fromNow() + '</p>');

    $header.append($avatar).append($h2).append($h1);
    
    $divTweetContent.append($p);
    $divIcons.append($iFlag).append($iRetweet).append($iHeart)
    
    $footer.append($divIcons).append($pTimestamp);

    $article.append($header).append($divTweetContent).append($footer);
    
    return $article;
  }

  function renderTweets(arrayTweetObject){
    $('#all-tweets').empty();
    for (var key in arrayTweetObject) {
      var article = createTweetElement(arrayTweetObject[key]);
      $('#all-tweets').prepend(article);
    }
  }

  function loadTweets(){
    $.ajax({
      method: "GET",
      url: "/tweets",
    }).done(function(data){
      console.log('AJAX GET request successful!!!');
      renderTweets(data);
    })
  } 

});