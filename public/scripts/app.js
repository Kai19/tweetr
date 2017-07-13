$().ready(function(){
    function loadTweets(){
      event.preventDefault();
      console.log('Button clicked, performing ajax call...');
      $.ajax({
        url: '/tweets',
        method: 'GET',
      })
        .done(renderTweets);
    }

    function handleNewTweets(){
      event.preventDefault();
      if($('form textarea').val().length > 140){
        alert("You have exceeded character limit.");
      }else if($('form textarea').val() == ''){
        alert('Not a valid input.');
      }else{
        console.log('Button clicked, performing ajax call...');
        $.ajax({
          url: '/tweets',
          method: 'POST',
          data: $(this).serialize()
        })
        .done(loadTweets)
        .done($('form textarea').val(''));
      }
    }

  $('form').on('submit', handleNewTweets);

  function renderTweets(tweets){
    $('tweet-container').empty();
    tweets.forEach(function (item){
      var tweetObj = createTweetElement(item);
      $('#tweet-container').prepend(tweetObj);
    });
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweetData){
    var newTweet = `
      <article>
        <header>
          <img src="${tweetData.user.avatars.regular}" />
          <span class="name">${tweetData.user.name}</span>
          <span class="twitter-id">${tweetData.user.handle}</span>
        </header>
        <div>${escape(tweetData.content.text)}</div>
        <footer>
          <span class="date">${Date(tweetData.created_at* 1000)}</span>
          <span class="icons">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </span>
        </footer>
      </article>
    `
    return newTweet;
  }
  $('button.compose').click(function(){
    $('section.new-tweet').slideToggle('slow')
    $('section.new-tweet textarea').select();
  })
});
