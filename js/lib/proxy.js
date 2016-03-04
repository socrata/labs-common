define(['js.cookie'], function(Cookies) {
  var root = "https://proxy." + window.location.hostname;

  return {
    query_base: function(domain) {
      var query_base = "https://" + domain;
      if(Cookies.get('dev_proxy_user') && Cookies.get('dev_proxy_domain') == domain) {
        // If we're proxying through the dev proxy, we need to change our query_base
        query_base = root + "/socrata/" + domain;

        // Enable CORS when we're proxying
        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
          options.crossDomain = {
              crossDomain: true
            };
          options.xhrFields = {
              withCredentials: true
            };
        });
      }
      return query_base;
    },
    username: function() {
      return decodeURI((Cookies.get('dev_proxy_user') || '').replace(/\+/g, '%20'));
    },
    login_url: function(domain) {
      return root + "/login/" + domain + "?return=" + encodeURIComponent(window.location.href);
    },
    logout_url: function() {
      return root + "/logout/";
    },
    root: function() { return root }
  }
});

