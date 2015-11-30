require(['jquery', 'ga'], function($, ga) {
  if($.isFunction(ga)) {
    ga('send', 'pageview');

    // Track click events
    $('body').on('click', '.ga-track', function() {
      ga('send', {
        hitType: 'event',
        eventCategory: this.getAttribute('data-action'),
        eventAction: 'click',
        eventLabel: this.getAttribute('data-label'),
        eventValue: this.getAttribute('data-value')
      });
    });
  } else {
    console.log("I see you're blocking Google Analytics ;)");
  }
});
