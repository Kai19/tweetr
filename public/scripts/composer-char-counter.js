$().ready(function(){
  var $newTweetSection = $('section.new-tweet');
  
  $newTweetSection.find('textarea').on('input', function(event){
    var $counter = $newTweetSection.find('.counter');
    var counter = 140 - $(this).val().length;
    $counter.text(counter);

    if(counter < 0){
      $counter.addClass('warning');
    }else{
      $counter.removeClass('warning');
    }
  });
});
