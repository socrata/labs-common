
// Add a clipboard button to everything that's a <pre>
$.each($("pre"), function(idx, pre) {
  // Generate and set a uniq id to each pre
  var uniq_id = Math.random().toString(36).substr(2, 9);
  $(pre).attr("id", 'clipboard_' + uniq_id);

  // Add a class for our CSS
  $(pre).addClass("clipboard");

  // Generate a button for this pre
  $(pre).append('<button id="button_' + uniq_id + '" class="clipbutton btn btn-default" data-clipboard-target="clipboard_' + uniq_id + '"><i class="fa fa-clipboard"></i></button>');

  // Set up our copy event handler
  var client = new ZeroClipboard(document.getElementById("button_" + uniq_id));
  client.on("copy", function(event) {
    $("i", event.target).removeClass("fa-clipboard").addClass("fa-spinner fa-spin");
    var clipboard = event.clipboardData;
    clipboard.setData("text/plain", $(pre).text());
    setTimeout(function(){
      $("i", event.target).removeClass("fa-spinner fa-spin").addClass("fa-clipboard");
    }, 500);
  });
});
