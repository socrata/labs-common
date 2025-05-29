// LiveDocs
define(
    ["jquery", "underscore", "purl", "mustache", "clipboard", "hljs", "proxy", "jquery.format", "jquery.message_height"],
    function($, _, purl, Mustache, Clipboard, Highlight, Proxy, Format, MessageHeight) {
  var SODA_V3_REGEX = /v3\/views\/([^.?]+)\/(query|export)(?:\.(\w+))?/;
  var onclick = function(event) {
    event.preventDefault();

    var tryit_block = $(this).parents('.tryit-link');
    var the_link = tryit_block.find('.the-link');
    var the_href = the_link.find('a.target').attr('href');

    var matchesV3 = the_href.match(SODA_V3_REGEX);
    var ajaxOptions = matchesV3 ? {
      url: the_href,
      method: 'POST',
      data: JSON.stringify({
        query: 'select *',
        page: {
          pageNumber: 1,
          pageSize: 1000,
        },
        includeSystem: false,
      }),
      headers: {
        'X-App-Token': 'oea67iooNR5qDi35J4f4IfjDd',
        'Content-Type': 'application/json'
      },
      dataType: 'text'
    } : {
      url: the_href,
      dataType: 'text'
    };

    // Progress indication
    var the_gear = tryit_block.find("i.fa-cog");
    the_gear.addClass("fa-spin");

    $.ajax(ajaxOptions).done(function(data){
      the_gear.removeClass("fa-spin");

      // Create a results block after the link with the output
      var results_block = $('<div class="results"><a class="remove" href="#"><i class="fa fa-times"></i> close</a><pre class="response prettyprint"></pre></div>');

      // Decide how to format it
      var format = $(the_link).find('a.target').attr('data-extension');
      var response = results_block.find('.response');
      response.text(data);
      switch(format) {
        case "json":
          response.format({ method: 'json' })
          response.addClass('lang-json prettyprint');
          break;

        case "geojson":
          response.format({ method: 'json' })
          response.addClass('lang-json prettyprint');
          break;

        case "xml":
          response.format({ method: 'xml' });
          response.addClass('lang-xml prettyprint');
          break;

        case "rdf":
          response.format({ method: 'xml' });
          response.addClass('lang-xml prettyprint');
          break;
      }

      results_block.find('.prettyprint').each(function(i, block) {
        Highlight.highlightBlock(block);
      });

      // Hide any existing code blocks on the page
      $('.results').remove();

      // Drop in our code!
      the_link.after(results_block);

      // Set up the remove link
      $(".results .remove").click(function(event) {
        event.preventDefault();
        $('.results').remove();
        $('.tryit-link').show();

        // Send our height message
        $.message_height();
      });

      // Send our height message
      $.message_height();
    }).fail(function(data){
      the_gear.attr("class", "fa fa-warning");
      alert("Something went wrong with your query... Please try again later.");
    });
  };

  var setup_clipboard = function(div) {
    // Set up the clipboard button
    var clipboard = new Clipboard('.copy-it');
    clipboard.on('success', function(e) {
      console.log('Content copied to clipboard...');

      // Change it to a check, but just for a bit...
      var el = $(e.trigger).find('i');
      var orig = el.attr('class');
      el.attr('class', 'fa fa-check');
      setTimeout(function() {
        el.attr('class', orig);
      }, 2000);
    })

    clipboard.on('error', function(e) {
      console.error('Error copying to clipboard!');
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);

      // Change it to a check, but just for a bit...
      var el = $(e.trigger).find('i');
      var orig = el.attr('class');
      el.attr('class', 'fa fa-times');
      setTimeout(function() {
        el.attr('class', orig);
      }, 2000);
    });
  };

  // Update when we change formats
  var format_click = function(event) {
    event.preventDefault();

    // Find our parent tryit block, and update its a.target links
    var exec = $(this).parents('.tryit-link').find('a.target');
    var new_ext = $(this).attr('data-extension');
    var old_ext = exec.attr('data-extension');

    // Update its extension attribute and href
    exec.attr('data-extension', new_ext);
    exec.attr(
        'href',
        exec.attr('href').replace('.' + old_ext, '.' + new_ext)
        );
    exec.text(
        exec.text().replace('.' + old_ext, '.' + new_ext)
        );

    // Update our displayed format
    $(this).parents('.tools').find('span.extension').text(new_ext);

    // Run with our new output format
    $(this).parents('.tools').find('.try-it').click();
  };

  var setup = function(elements) {
    elements.each(function(i, div) {
      var href = $(div).attr("href");
      var display_url = $(div).text();
      var matches = (function(input) {
        var matchesV2 = input.match(/resource\/([^.?]+)(?:\.(\w+))?/);
        if (matchesV2) {
          var uid = matchesV2[1].match(/\w*-\w*/) ? matchesV2[1].match(/\w*-\w*/)[0] : matchesV2[1];
          var format = matchesV2[2] || 'json';

          return { uid: uid, format: format };
        }

        var matchesV3 = input.match(SODA_V3_REGEX);
        if (matchesV3) {
          var uid = matchesV3[1].match(/\w*-\w*/) ? matchesV3[1].match(/\w*-\w*/)[0] : matchesV3[1];
          var type = matchesV3[2];
          var format = matchesV3[3] || 'json';

          return { uid: uid, format: format };
        }
      })(href);
      var uid = matches.uid;
      var format = matches.format;

      // Build up our Hurl link
      var url = purl(display_url);
      var params = {};
      $.each(url.param(), function(k, v) {
        params[k] = [v];
      });

      var query = $.param({
        "method" : "GET",
        "url" : url.attr("protocol") + "://" + url.attr("host") + url.attr("path"),
        "headers" : JSON.stringify({
          "X-App-Token" : ["bjp8KrRvAPtuf809u1UXnI0Z8"]
        }),
        "args" : JSON.stringify(params)
      });
      var hurl_url = 'http://hurl.it/?' + query;
      var doc_url = '/foundry/' + url.attr("host") + '/' + uid;

      var domain = url.attr('host');

      $.when(
        $.ajax('/soql.json'),
        $.ajax({
          method: "GET",
          url: Proxy.query_base(domain) + '/api/views.json',
          data: {
            method: "getByResourceName",
            name: uid
          }
        }),
        $.ajax('/common/js/lib/tryit.mst')
      ).done(function(soql, metadata, template) {
        // Decide what versions we have available
        var formats = _.select(soql[0].formats, function(fmt) {
          return _.contains(fmt.versions, metadata[0].newBackend ? 2.1 : 2);
        });
        var default_format = _.findWhere(formats, { extension: format });

        // Render our Mustache template
        var content = Mustache.render(template[0], {
          url: href,
          display_url: display_url,
          hurl_url : hurl_url,
          doc_url: doc_url,
          formats: formats,
          default_format: default_format
        });

        // Set up the live link and format clicks
        var content = $(content);
        content.find('a.exec').click(onclick);
        content.find('a.format').click(format_click);
        $(div).replaceWith(content);

        // Set up clipboard
        setup_clipboard();
      });
    });
  };

  return {
    setup_livedocs: setup
  };
});
