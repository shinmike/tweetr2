// ----------------------------------------------------- Function for error message
function showError(message){
  alert(message);
}

$(function(){

  $('#textTweet').focus();

  function createTweetElement(tweetObject){
    var $article = $('<article class="tweet">');
    var $header = $('<header>');
    var $avatar = $(`<img class="avatar" src=${tweetObject.user.avatars.small}>`);
    var $h2 = $(`<h2 class="username">${tweetObject.user.handle}</h2>`);
    var $h1 = $(`<h1 class="fullname">${tweetObject.user.name}</h2>`);
    var $divTweetContent = $('<div class="tweet-content">');
    var $p = $(`<p>${tweetObject.content.text}</p>`);
    var $footer = $('<footer>');
    var $divIcons = $('<div class="icons">');
    var $iFlag = $('<i class="fa fa-flag">');
    var $iRetweet = $('<i class="fa fa-retweet">');
    var $iHeart = $(`<i class="fa fa-heart like-button" data-id="${tweetObject._id}">`); // 'data-id' added for like/unlike feature
    var $pTimestamp = $(`<p class="timestamp">${moment(tweetObject.created_at).fromNow()}</p>`);

    $header.append($avatar).append($h2).append($h1);
    
    $divTweetContent.append($p);
    $divIcons.append($iFlag).append($iRetweet).append($iHeart)
    
    $footer.append($divIcons).append($pTimestamp);

    $article.append($header).append($divTweetContent).append($footer);
    
    return $article;
  }

  function renderTweets(arrayTweetObject){
    var $allTweets = $('#all-tweets').empty();
    arrayTweetObject.forEach(function(article){
      $allTweets.prepend(createTweetElement(article));
    });
  }



// ----------------------------------------------------------------- Like or Unlike feature
  $("body").on("click", ".like-button", function(){
    let heart = $(this);
    const likedID = $(this).data("id"); // referring to 'data-id'
      $.ajax({
        method: "POST",
        url: `/tweets/${likedID}/like`
      }).done(function(){
        heart.toggleClass("fa-heart-o");
      });
  });


  
  function loadTweets(){
    $.ajax({
      method: "GET",
      url: "/tweets"
    }).done(function(data){
      renderTweets(data);      
    });
  }

// ----------------------------------------------------- Form submission using Jquery
  $('#createTweet').on('submit', function(e){
    e.preventDefault();
    var tweetLength = $('#textTweet').val().length;

// ----------------------------------------------------- Validation 1
    if (tweetLength === 0) {
      showError("You didn't tweet anything :(");
      return;
    }
// ----------------------------------------------------- Validation 2
    if (tweetLength > 140){
      showError("You exceeded 140 characters :(");
      return;
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    }).done(function(){
      $('#textTweet').val('');
      loadTweets();
      $('.counter').text('140');
    });

  });

  loadTweets();
});