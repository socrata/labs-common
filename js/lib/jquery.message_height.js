// Message our parent about our height
(function ($) {
  $.message_height = function() {
    if(parent) {
      console.log("Messaging height");
      parent.postMessage({ height: document.body.offsetHeight }, "*");
    }
  }
}(jQuery));

