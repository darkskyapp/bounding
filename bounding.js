"use strict";

function bounding_box(points, box=[Infinity, Infinity, -Infinity, -Infinity]) {
  for(let i = points.length; i--; ) {
    const x = points[i];
    const m = i & 1;
    const n = m | 2;
    if(x < box[m]) box[m] = x;
    if(x > box[n]) box[n] = x;
  }

  return box;
}

function _circle_1(x, y) {
  return [x, y, 0];
}

function _circle_2(ax, ay, bx, by) {
  const x = (bx - ax) / 2;
  const y = (by - ay) / 2;
  return [ax + x, ay + y, Math.hypot(x, y)];
}

function _circle_3(ax, ay, bx, by, cx, cy) {
  const mx = bx - ax;
  const my = by - ay;
  const nx = cx - ax;
  const ny = cy - ay;

  const m = mx * mx + my * my;
  const n = nx * nx + ny * ny;
  const d = (mx * ny - my * nx) * 2;
  const x = (ny * m - my * n) / d;
  const y = (mx * n - nx * m) / d;
  return [ax + x, ay + y, Math.hypot(x, y)];
}

function _bounding_circle(p, q) {
  if(q.length === 6) {
    return _circle_3(q[0], q[1], q[2], q[3], q[4], q[5]);
  }
  if(p.length === 0 && q.length === 4) {
    return _circle_2(q[0], q[1], q[2], q[3]);
  }
  if(p.length === 0 && q.length === 2) {
    return _circle_1(q[0], q[1]);
  }
  if(p.length === 2 && q.length === 0) {
    return _circle_1(p[0], p[1]);
  }

  const y = p.pop();
  const x = p.pop();
  let d = _bounding_circle(p, q);
  const a = x - d[0];
  const b = y - d[1];
  const c = d[2];
  if(a * a + b * b > c * c) {
    q.push(x, y);
    d = _bounding_circle(p, q);
    q.pop();
    q.pop();
  }
  p.push(x, y);
  return d;
}

function bounding_circle(points) {
  return _bounding_circle(points, []);
}

function _quickhull(points, a, b, hull) {
  const ax = points[(a << 1) | 0];
  const ay = points[(a << 1) | 1];
  const bx = points[(b << 1) | 0];
  const by = points[(b << 1) | 1];
  const ab = bx * ay - ax * by;

  let c = -1;
  let best_d = 0;
  for(let i = 0; i < points.length; i++) {
    if(i === a || i === b) {
      continue;
    }

    const x = points[(i << 1) | 0];
    const y = points[(i << 1) | 1];
    const d = (by - ay) * x - (bx - ax) * y + ab;
    if(d < best_d) {
      c = i;
      best_d = d;
    }
  }
  if(c === -1) {
    return;
  }

  _quickhull(points, a, c, hull);
  hull.push(points[(c << 1) | 0], points[(c << 1) | 1]);
  _quickhull(points, c, b, hull);
}

function bounding_hull(points) {
  const hull = [];
  const n = points.length >> 1;

  let min = 0;
  let max = 0;
  for(let i = 1; i < n; i++) {
    if(points[i << 1] < points[min << 1]) min = i;
    if(points[i << 1] > points[max << 1]) max = i;
  }

  hull.push(points[(min << 1) | 0], points[(min << 1) | 1]);
  if(min !== max) {
    _quickhull(points, min, max, hull);
    hull.push(points[(max << 1) | 0], points[(max << 1) | 1]);
    _quickhull(points, max, min, hull);
  }

  return hull;
}

if(typeof exports !== "undefined") {
  exports.box    = bounding_box;
  exports.circle = bounding_circle;
  exports.hull   = bounding_hull;
}
