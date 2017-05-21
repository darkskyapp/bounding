"use strict";

function bounding_box(points=null, box=[Infinity, Infinity, -Infinity, -Infinity]) {
  if(points) {
    for(let i = points.length; i--; ) {
      const x = points[i];
      const m = i & 1;
      const n = m | 2;
      if(x < box[m]) box[m] = x;
      if(x > box[n]) box[n] = x;
    }
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

function _lexicographically([ax, ay], [bx, by]) {
  let t = ax - bx;
  if(t === 0) {
    t = ay - by;
  }
  return t;
}

function _cw(ax, ay, bx, by, x, y) {
  return (ax - x) * (by - y) >= (ay - y) * (bx - x);
}

function bounding_hull(points) {
  const list = [];
  for(let i = 1; i < points.length; i += 2) {
    list.push([points[i - 1], points[i]]);
  }
  list.sort(_lexicographically);

  const hull = [list[0][0], list[0][1], list[1][0], list[1][1]];
  for(let i = 2; i < list.length; i++) {
    const [x, y] = list[i];
    while(hull.length >= 4 && _cw(hull[hull.length - 4], hull[hull.length - 3], hull[hull.length - 2], hull[hull.length - 1], x, y)) {
      hull.length -= 2;
    }
    hull.push(x, y);
  }
  hull.push(list[list.length - 2][0], list[list.length - 2][1]);
  const n = hull.length;
  for(let i = list.length - 3; i >= 0; i--) {
    const [x, y] = list[i];
    while(hull.length >= n && _cw(hull[hull.length - 4], hull[hull.length - 3], hull[hull.length - 2], hull[hull.length - 1], x, y)) {
      hull.length -= 2;
    }
    hull.push(x, y);
  }
  hull.length -= 2;

  return hull;
}

if(typeof exports !== "undefined") {
  exports.box    = bounding_box;
  exports.circle = bounding_circle;
  exports.hull   = bounding_hull;
}
