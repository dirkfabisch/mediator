/**
 * Main JS file
 */

//= require vendor/jquery-1.11.2
//= require vendor/readingTime
//= require vendor/jquery.fitvids

/*globals jQuery, document */
(function ($) {
  "use strict";

  $(document).ready(function(){

    $(".post-content").fitVids();

    // Calculates Reading Time
    $('.post-content').readingTime({
        readingTimeTarget: '.post-reading-time',
        wordCountTarget: '.post-word-count',
    });

    // Creates Captions from Alt tags
    $(".post-content img").each(function() {
        // Let's put a caption if there is one
        if($(this).attr("alt"))
          $(this).wrap('<figure class="image"></figure>')
          .after('<figcaption>'+$(this).attr("alt")+'</figcaption>');
    });

    var $window = $(window),
    $image = $('.post-image-image, .teaserimage-image');

    $window.on('scroll', function() {
      var top = $window.scrollTop();

      if (top < 0 || top > 1500) { return; }
      $image
        .css('transform', 'translate3d(0px, '+top/3+'px, 0px)')
        .css('opacity', 1-Math.max(top/700, 0));
    });
    $window.trigger('scroll');

    var height = $('.article-image').height();
    $('.post-content').css('padding-top', height + 'px');

    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
       && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({ scrollTop: target.offset().top }, 500);
          return false;
        }
      }
    });
  });
}(jQuery));
