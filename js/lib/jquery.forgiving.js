// In some cases we're OK with 404s
(function ($) {
  $.getJSONForgiving404 = function(url, data, success) {
    var dfrd = $.Deferred(),
    promise = dfrd.promise(),
    jqXHR;

    jqXHR = $.getJSON(url, data, success)
      .fail(function(xhr) {
        if(xhr.status == 404) {
          dfrd.resolve(null);
        } else {
          dfrd.reject(xhr);
        }
      })
      .then(dfrd.resolve, dfrd.reject);
    return promise;
  };

  $.ajaxForgiving404 = function(settings) {
    var dfrd = $.Deferred(),
    promise = dfrd.promise(),
    jqXHR;

    jqXHR = $.ajax(settings)
      .fail(function(xhr) {
        if(xhr.status == 404) {
          dfrd.resolve(null);
        } else {
          dfrd.reject(xhr);
        }
      })
      .then(dfrd.resolve, dfrd.reject);
    return promise;
  };
}(jQuery));

