$.fn.serializeObject = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

$(document).ready(function() {
  // $( "#post-form" ).on("submit", function(event) {
  $( "#post-form" ).submit(function( event ) {
    event.preventDefault();
    // var post = $(this).serialize();
    var post = $('#post-form').serializeObject();
    console.log(post);

    $.ajax({
      method: "POST",
      url: "/posts",
      data: post,
      success: function (data, status, jqXHR) { // 200
        event.preventDefault();
        console.log(data)
        $("#post-form")[0].reset();
        $('#posts').prepend(
          '<div class="plan-name"><a href=/post/"' + data._id + '">' + data.title + '</a></div><div class="remove-post pull-right" data-id="' + data._id + '"><button type="button" class="btn btn-default">Remove <span class="glyphicon glyphicon-minus"></span></div></button><div class="text"><p>' + data.category + '</p></div>')
        },
        error: function (response) { // 300-500
        }
      });

      //   $.post('/posts', post,
      //   function (response) {
      //     console.log(response)
      //     $('#posts').append("<li>" + response.data.body + "</li>");
      //     $('#new-post')[0].reset();
      //   },
      //   function (error) {
      //
      //   }
      // )
    });

    $('.remove-post').click(function (e) {
      e.preventDefault();
      var post = $(this);
      var postId = post.data('id');
      $.ajax({
        url: '/post/' + postId,
        type: 'DELETE',
        success: function(data) {
          console.log("blah here")
          post.parent().remove();
        }
      });
    });

    $('.edit-post').click(function (e) {
      e.preventDefault();
      var post = $(this);
      var postId = post.data('id');
      window.location.href = "/post/edit/" + postId
    });

    $("#edit-form").submit(function( event ) {
      event.preventDefault();
      // var post = $(this).serialize();
      var post = $('#edit-form').serializeObject();
      console.log(post);

      $.ajax({
        method: "PUT",
        url: "/post/:id",
        data: post,
        success: function (data, status, jqXHR) { // 200
          // event.preventDefault();
          // res.redirect('/post/' + req.params.id);
          console.log(data)
        },
        error: function (response) { // 300-500
        }
      });
    });

    $('#show').click(function (e) {
      e.preventDefault();
      $('#show').removeClass("show").addClass("hide");
      $('#hide').removeClass("hide").addClass("show");
    });

    $('#hide').click(function (e) {
      e.preventDefault();
      $('#hide').removeClass("show").addClass("hide");
      $('#show').removeClass("hide").addClass("show");
    });

    $('#success').click(function(s) {
      s.preventDefault();
      $(this).toggleClass('btn-primary').toggleClass('btn-success');
    });
  });
