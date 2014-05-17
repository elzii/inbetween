!(function ($) {
  
  // ---
  // app global
  // ---
  window.APPLICATION = {};
  var app            = window.APPLICATION;


  // ---
  // user-agent && user-agent helper methods
  // ---
  var ua                        = navigator.userAgent;
  var regex_apple_webkit        = new RegExp(/AppleWebKit\/([\d.]+)/);
  var result_apple_webkit_regex = regex_apple_webkit.exec(ua);
  var apple_webkit_version      = (result_apple_webkit_regex === null ? null : parseFloat(regex_apple_webkit.exec(ua)[1]));

  app.globals = {
    // debug toggles
    debug           : false,
    debug_skrollr   : false,

    // user-agents
    user_agent : {
      iOS         : (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false),
      iphone      : (navigator.userAgent.match(/(iPhone|iPod)/g) ? true : false),
      ipad        : (navigator.userAgent.match(/(iPad)/g) ? true : false),
      android     : (navigator.userAgent.match(/(Android)/g) ? true : false),
      mobile      : ((/Mobile|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ? true : false),
      mobile_all  : ((/Mobile|Android|iPhone|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ? true : false),
    },

    browser : {
      desktop_chrome   : (window.chrome ? true : false),
      iphone_chrome    : ((navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/) && navigator.userAgent.match('CriOS')) ? true : false),
      iphone_safari    : ((navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/) && !navigator.userAgent.match('CriOS')) ? true : false),
      android_native   : (ua.indexOf('Android') > -1 && ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1 && ua.indexOf('Chrome') <= -1),
      android_chrome   : (ua.indexOf('Android') > -1 && ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1 && ua.indexOf('Chrome') > -1),
      android_samsung  : (ua.indexOf('Android') > -1 && ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1 && ua.indexOf('Chrome') > -1 && ua.indexOf('SCH') > -1)
    }
  }
  


  // ---
  // methods / funcs
  // ---
  app.init = function()
  {
    app.setElements();
    app.scroll();
    app.chromeFix('offset');
    app.lazyLoadVideo();
  }

  app.setElements = function()
  {
    app.el      = {};
    app.el.wrap = $('#wrap');
  }

  app.scroll = function()
  {

  }

  app.chromeFix = function(method)
  {
    // invisible font fix for chrome
    if ( app.globals.browser.desktop_chrome ) {
      // Method 1 - Reset <body> width in a setTimeout
      if ( method == 'settimeout') {
        var chrome_fix_1 = function( duration ) {
          setTimeout(function() {
            $('body').width($('body').width()+1).width('auto');
          }, duration);
        }
          // Invoke Method 1
          chrome_fix_1(500);
      }

      // Method 2 - Redeclare <body> offset onload
      if ( method == 'offset') {
        var chrome_fix_2 = function() {
          var orig_body_offset = $('body').offset();
          $('body').offset(orig_body_offset);
        }
          // Invoke Method 2
          chrome_fix_2();
      }
    }
  }


  app.lazyLoadVideo = function() {

      $('.lazyload').click(function(){
          var $this           = $(this),
              video_id        = $this.data('video-id'),
              video_service   = $this.data('video-service'),
              width           = $this.width(),
              height          = $this.height();

              // console.log(width, height);

          // embed code builder function
          function buildEmbed(service, id) {
              if (service === 'youtube') {
                  var embed = '<iframe width="'+width+'" height="'+height+'" src="//www.youtube.com/embed/'+video_id+'?autoplay=1" frameborder="0" allowfullscreen></iframe>';
                  return embed;
              }
              if (service === 'vimeo') {
                  var embed = '<iframe src="//player.vimeo.com/video/'+video_id+'?title=0&amp;autoplay=1&amp;byline=0&amp;portrait=0&amp;badge=0" width="'+width+'" height="'+height+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                  return embed;
              }
          }

          // build the embed code
          var embed_code = buildEmbed(video_service, video_id);

          // remove inner elements
          $this.find('iframe').remove();
          $this.find('img').remove();
          // $this.find('.media-image-overlay').css('opacity', 0);
          $this.find('.video-play-button').hide();
          $this.css('background-image', '');

          // append the generated embed code
          if ( $this.find('iframe').length <= 0 ) {
              $this.append(embed_code);
          } else {
              // nothing
          }
      });
  }



  
  // ---
  // document ready
  // ---
  $(document).ready(function()
  {
    // app init
    app.init();

  });
  
})(jQuery);