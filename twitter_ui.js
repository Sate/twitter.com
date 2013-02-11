// Pull new tweets from twitter_data.js
var draw = function(){
  var $tweetbox = $("#tweetbox");
  $tweetbox.html("")
  for(var i = window.streams.home.length - 1; i >= 0; i-- ){
    tweet = window.streams.home[i]
   	// we'll also need to make tweet dates update after they display
   	var postTime = moment(tweet.created_at).fromNow();
    $tweetbox.append("<div class='oneTweetBox'> \
    					<div class='col1'> \
		    				<img src='img/person.png' class='userImage'/>\
		    				<div class='usernameBox'>"+"<a data-user=" + tweet.user + " class='userlink' href='index.html#user=" + tweet.user + '\'>' + tweet.user + "</a></div> \
	    				</div> \
	    				<div class='col2'> \
		    				<div class='datePostedBox'>"+postTime+"</div> \
							<div class='tweetTextBox'>"+tweet.message+"</div> \
						</div> \
					  </div>");
  
  }
}


/* Pull one user's tweets
 * maybe refactor this into the draw function later
 */
var drawOneUser = function(usernamePassedIn){
   $('.modal').modal('show');
  var $userbox = $("#userbox");
  $userbox.html("");
  for(var i = window.streams.users[usernamePassedIn].length - 1; i >= 0; i-- ){
    tweet = window.streams.users[usernamePassedIn][i]
   	// we'll also need to make tweet dates update after they display
   	var postTime = moment(tweet.created_at).fromNow();
   	$('.modal h3').text('Tweets by '+usernamePassedIn);
    $userbox.append("<div class='oneTweetBox'> \
	    				<div class='datePostedBox'>"+postTime+"</div> \
	    				<div class='userImageBox'><img src='img/person.png' class='userImage'/></div> \
	    				<div class='usernameBox'>"+"<a data-user=" + tweet.user + " class='userlink' href='index.html#user=" + tweet.user + '\'>' + tweet.user + "</a></div> \
						<div class='tweetTextBox'>"+tweet.message+"</div> \
					  </div>");
  }

}


// Grab username of any clicked anchor with userlink class
var bindanchors = function() {
	$('.userlink').click(function(){
		var username= $(this).data('user');
		drawOneUser(username);
	});
};


// Insert new tweets when user clicks button
$(document).ready(function() {
	for (i = 0; i > 20; i++) {
		draw();
	}
	$("#tweetcheck").click(function(){
		draw();
		bindanchors();
	});

	// Fade tweets in
	setTimeout(function(){
		draw();
		bindanchors();
		$('#tweetbox').fadeIn('slow');
	}, 0);

	$(".btn").click(function(){
		$('.tweetinput').slideToggle('fast');
		$('#username').focus();
	});

	$('#confirmtweet').click(function(){
		if( $('#username').val() !=""  && $('#newTweetText').val() != "" ) {
			
			var $username = $('#username').val();
			if ( window.streams.users[$username] == undefined ){
				window.streams.users[$username] = [];
			}

			add_tweet({
		    	user: $('#username').val(),
		    	message: $('#newTweetText').val(),
		    	created_at: new Date()
  		})
			draw();
		}else{
			$('#newTweetText').html("<div class='alert alert-danger'>Type something in!</div>");
		}


	});

});




