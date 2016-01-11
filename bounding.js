(function() {
  "use strict";
  var box, circle;

  box = function(p) {
    var box, i, x;

    box = [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY
    ];

    for(i = 0; i < p.length; i++) {
      x = p[i];

      box[0] = Math.min(box[0], x[0]);
      box[1] = Math.min(box[1], x[1]);
      box[2] = Math.max(box[2], x[0]);
      box[3] = Math.max(box[3], x[1]);
    }

    return box;
  };

  circle = (function() {
    var circle, circle1, circle2, circle3, does_not_contain;
    
    circle1 = function(a) {
      return [a[0], a[1], 0];
    };

    circle2 = function(a, b) {
      var x, y;

      x = 0.5 * (b[0] - a[0]);
      y = 0.5 * (b[1] - a[1]);

      return [a[0] + x, a[1] + y, Math.sqrt(x * x + y * y)];
    };

    circle3 = function(a, b, c) {
      var as, ax, ay, bs, bx, by, d, r, x, y;

      ax = b[0] - a[0];
      ay = b[1] - a[1];
      as = ax * ax + ay * ay;
      bx = c[0] - a[0];
      by = c[1] - a[1];
      bs = bx * bx + by * by;

      d = 0.5 / (ax * by - ay * bx);
      x = d * (by * as - ay * bs);
      y = d * (ax * bs - bx * as);

      return [a[0] + x, a[1] + y, Math.sqrt(x * x + y * y)];
    };

    does_not_contain = function(c, p) {
      var r, x, y;

      x = c[0] - p[0];
      y = c[1] - p[1];
      r = c[2];
      return x * x + y * y > r * r;
    };

    circle = function(p, r) {
      var d, x;

      if(r.length === 3) {
        d = circle3(r[0], r[1], r[2]);
      }

      else if(p.length === 0 && r.length === 2) {
        d = circle2(r[0], r[1]);
      }

      else if(p.length === 0 && r.length === 1) {
        d = circle1(r[0]);
      }

      else if(p.length === 1 && r.length === 0) {
        d = circle1(p[0]);
      }

      else {
        x = p.pop();
        d = circle(p, r);
        if(does_not_contain(d, x)) {
          r.push(x);
          d = circle(p, r);
          r.pop();
        }
        p.push(x);
      }

      return d;
    };

    return function(p) {
      return circle(p, []);
    };
  })();

  if(typeof exports !== "undefined") {
    exports.box    = box;
    exports.circle = circle;
  }

  else {
    window.bounding = {box: box, circle: circle};
  }
})();
