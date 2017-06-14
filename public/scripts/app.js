/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

const data = [
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

function createTweetElement(tweetObject) {
  const $article = $('<article class="tweet">');
  const $header = $('<header>');
  const $avatar = $('<img class="avatar" src=' + tweetObject.user.avatars.small + '>' );
  const $h2 = $('<h2 class="username">' + tweetObject.user.handle + '</h2>');
  const $h1 = $('<h1 class="fullname">' + tweetObject.user.name + '</h2>');
  const $divTweetContent = $('<div class="tweet-content">');
  const $p = $('<p>' + tweetObject.content.text + '</p>');
  const $footer = $('<footer>');
  const $divIcons = $('<div class="icons">');
  const $iFlag = $('<i class="fa fa-flag">');
  const $iRetweet = $('<i class="fa fa-retweet">');
  const $iHeart = $('<i class="fa fa-heart">');
  const $pTimestamp = $('<p class="timestamp">' + moment(tweetObject.created_at).fromNow() + '</p>');

  $header.append($avatar).append($h2).append($h1);
  
  $divTweetContent.append($p);
  $divIcons.append($iFlag).append($iRetweet).append($iHeart)
  
  $footer.append($divIcons).append($pTimestamp);

  $article.append($header).append($divTweetContent).append($footer);
  
  return $article;
}

function renderTweets(arrayTweetObject) {
  for (let key in arrayTweetObject) {
    let article = createTweetElement(arrayTweetObject[key]);
    $('#all-tweets').prepend(article);
  }
}

renderTweets(data);

});