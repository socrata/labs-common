// In some cases we're OK with 404s
(function ($) {
  $.getJSONForgiving = function(url, data, success, forgives) {
    var dfrd = $.Deferred(),
    promise = dfrd.promise(),
    jqXHR;

    jqXHR = $.getJSON(url, data, success)
      .fail(function(xhr) {
        if($.inArray(xhr.status, forgives) >= 0) {
          dfrd.resolve(null);
        } else {
          dfrd.reject(xhr);
        }
      })
      .then(dfrd.resolve, dfrd.reject);
    return promise;
  };

  $.getJSONForgiving404 = function(url, data, success) {
    return $.getJSONForgiving(url, data, success, [ 404 ]);
  };

  $.ajaxForgiving = function(settings) {
    var dfrd = $.Deferred(),
    promise = dfrd.promise(),
    jqXHR;

    jqXHR = $.ajax(settings)
      .fail(function(xhr) {
        if($.inArray(xhr.status, settings.forgives) >= 0) {
          dfrd.resolve(null);
        } else {
          dfrd.reject(xhr);
        }
      })
      .then(dfrd.resolve, dfrd.reject);
    return promise;
  };

  $.ajaxForgiving404 = function(settings) {
    return $.ajaxForgiving($.extend(settings, { forgives: [ 404 ] }));
  };
}(jQuery));

