"use strict";

const ObjectID = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find().toArray(callback);
    },

    // updates likes in 'db'
    updateLike: function(tweetID, callback) {
      const objectID = new ObjectID(tweetID);
      db.collection("tweets").findOne({'_id' : objectID}, function(err, tweet){
        const tweetLiked = !tweet.liked; 
        console.log(tweetLiked);
        db.collection("tweets").updateOne({'_id' : objectID}, {$set: {'liked': tweetLiked}}, callback);
      })
    }

  };
}
