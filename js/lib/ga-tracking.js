$(".ga-track").click(function() {
  _gaq.push(["_trackEvent", this.getAttribute("data-action"), this.getAttribute("data-label"), this.getAttribute("data-value")]);
});
