$(function(){
  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  $('#createTweet').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    }).done(function(data){
      console.log('AJAX POST request successful!!!');
      console.log('data!!!', data);
      loadTweets();
    })
  });

  function createTweetElement(tweetObject) {
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

  function renderTweets(arrayTweetObject) {
    $('#all-tweets').empty();
    for (var key in arrayTweetObject) {
      var article = createTweetElement(arrayTweetObject[key]);
      $('#all-tweets').prepend(article);
    }
  }

  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      data: $(this).serialize()
    }).done(function(data){
      console.log('AJAX GET request successful!!!');
      console.log('data!!!', data);
      renderTweets(data);
    })
  }

  // renderTweets(data);

});