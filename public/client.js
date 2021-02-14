// client-side js
// run by the browser each time your view template referencing it is loaded

const acts = [];

// define variables that reference elements on our page
const form = document.forms[0];

const dreamsList = document.getElementById("rituals");
const clearButton = document.querySelector('#clear-dreams');


  


$(function() {
  $.get('/rituals', function(rituals) {
    rituals.forEach(function(ritual) {
      $('<li></li>').text(ritual[0] + " " + ritual[1]).appendTo('#rituals');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
  
    var dreamInput = "i put the " + $("select[name=item_1] option:selected").val() + " and " + $("select[name=item_2] option:selected").val() + " by " + $("select[name=action] option:selected").val() + " for " + $("select[name=time] option:selected").val();
    var resultInput = $(".what").val();

    $.post('/rituals?' + $.param({act:dreamInput, result:resultInput}), function() {
      $('<li></li>').text(dreamInput + " " + resultInput).appendTo('#rituals');
      // $('input#fName').val('');
      // $('input#lName').val('');
      // $('input').focus();
    });
  });
});
