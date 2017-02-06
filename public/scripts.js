$(document).ready(function() {
  $( "#post-form" ).on("submit", function(event) {
    event.preventDefault();
    var post = $(this).serialize();

    $.post('/posts', post, function (data) {
      console.log(data)
      $('#posts').append("<li>" + data.body + "</li>");
      $('#new-post')[0].reset();
    })

    $( "#post-form" ).submit(function( event ) {


    });
  });
});
