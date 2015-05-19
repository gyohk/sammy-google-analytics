          (function ($) {

              Sammy = Sammy || {};
              
              if (typeof tracker === "undefined") {
                  tracker = {};
              }
              if (typeof trackerAccessor === "undefined") {
                  trackerAccessor = {};
              }
              // A simple plugin that pings Google Analytics tracker
              // every time a route is triggered
              //
              // === Arguments
              //
              // +tracker+:: the Google Analytics ga function.  Defaults to
              // the default function defined by the analytics.js snippet, or pass your own tracker accessor function if you
              // have a custom install
              Sammy.GoogleAnalytics = function (app, trackerAccessor) {
                  var _tracker = tracker || window.pageTracker,
                      _trackerAccessor = trackerAccessor || function () { return window.ga; },
                      shouldTrack = false;

                  this.helpers({
                      noTrack: function () {
                          disableTracking();
                      }
                  });

                  this.bind('event-context-after', function () {
                      if (typeof _trackerAccessor != 'undefined' && _trackerAccessor() && shouldTrack) {
                          // console.log('tracking', this.path);
                          _trackerAccessor()('send', 'pageview', this.path);
                      }else if(typeof _tracker != 'undefined' && shouldTrack) {
                          _tracker._trackPageview(this.path);
                      }
                      enableTracking();
                  });

                  function disableTracking() {
                      shouldTrack = false;
                  }

                  function enableTracking() {
                      shouldTrack = true;
                  }
              };
          })(jQuery);