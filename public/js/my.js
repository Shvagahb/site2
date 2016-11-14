var h;
var w;
$.move = function (light) {
  var left = $(light).position().left;
  var top = $(light).position().top;
  if (left != undefined && top != undefined) {
    var size = $(light).outerWidth() + 100;

    var dirH = parseInt($(light).attr('dirH'));
    var dirV = parseInt($(light).attr('dirV'));

    if (left >= w - size - 100 || left <= 100) {
      dirH = -dirH;
    }

    if (top >= h - size - 100 || top <= 100) {
      dirV = -dirV;
    }


    $(light).animate({
      left: (left + dirH),
      top: (top + dirV)
    }, 'fast', 'linear', function () {
      setTimeout(function () { $.move(light); }, 1);
    })
      .attr('dirH', dirH)
      .attr('dirV', dirV);
  }
}

$.led = function (x, y) {
  if (x > 100 && x < (w - 100) && y > 100 && y < (h - 100)) {
    var multiple = Math.random() * 15;
    var dirH = Math.random() > .5 ? -multiple : multiple;
    var dirV = Math.random() > .5 ? -multiple : multiple;

    var r = Math.max(Math.floor(Math.random() * 50), 1000);
    var g = Math.max(Math.floor(Math.random() * 10), 100);
    var b = Math.max(Math.floor(Math.random() * 80), 100);
    var a = Math.max(Math.min(Math.random(), .1), .8);

    var size = Math.max(Math.round(Math.random() * 50), 10);

    if (x >= (w - size)) {
      x = w - size - 10;
    }

    if (y >= (h - size)) {
      y = h - size - 10;
    }

    var light = $('.light').first().clone();

    $('body').append($(light));
    $(light).css({
      'left': x + 'px',
      'top': y + 'px',
      'height': size + 'px',
      'width': size + 'px',
      'background-color': 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')',
      'border': 'solid 5px rgb(' + r + ',' + g + ',' + b + ')',
      'box-shadow': 'inset 0 0 20px rgb(' + r + ',' + g + ',' + b + '), 0 0 10px rgb(' + r + ',' + g + ',' + b + ')'
    })
      .attr('dirH', dirH)
      .attr('dirV', dirV);


    $(light).fadeIn();

    var delay = Math.max(Math.round(Math.random() * 100), 50);

    if ($('.light').length > 20 || x < 100 || y < 100 || x >= (w - 100) || y >= (h - 100)) {
      $(light).remove();
      return false;
    }

    setTimeout(function () {
      $(light).fadeOut('slow', 'linear', function () {
        $(light).remove();
      });

    }, delay * 0);


    return light;
  }
}

$(document).ready(function () {
  h = $('body').outerHeight();
  w = $('body').outerWidth();

  $(window).resize(function () {
    h = $('body').outerHeight();
    w = $('body').outerWidth();
  });

  $('body').mousemove(function (e) {

    var left = (e.clientX);
    var top = (e.clientY);
    if (left % 10 && top % 10) {
      if (left > 100 && left < (w - 100) && top > 100 && top < (h - 100)) {
        lights(left, top);
      }
    }
  });
});

function lights(left, top) {
  for (var i = 0; i < 2; i++) {
    $.move($.led(left, top));
  }
}
