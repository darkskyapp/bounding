"use strict";

function bounding_box(points) {
  const aabb = [+Infinity, +Infinity, -Infinity, -Infinity];
  for(const [x, y] of points) {
    if(x < aabb[0]) aabb[0] = x;
    if(y < aabb[1]) aabb[1] = y;
    if(x > aabb[2]) aabb[2] = x;
    if(y > aabb[3]) aabb[3] = y;
  }
  return aabb;
}

function bounding_convex_hull(points) {
  /* FIXME */
}

function _circle_1([x, y]) {
  return [x, y, 0];
}

function _circle_2([ax, ay], [bx, by]) {
  const x = (bx - ax) / 2;
  const y = (by - ay) / 2;
  return [ax + x, ay + y, Math.hypot(x, y)];
}

function _circle_3([ax, ay], [bx, by], [cx, cy]) {
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

function _contains([cx, cy, cr], [px, py]) {
  const x = cx - px;
  const y = cy - py;
  return x * x + y * y <= cr * cr;
}

function _bounding_circle(p, q) {
  if(q.length === 3) {
    return _circle_3(q[0], q[1], q[2]);
  }
  if(p.length === 0 && q.length === 2) {
    return _circle_2(q[0], q[1]);
  }
  if(p.length === 0 && q.length === 1) {
    return _circle_1(q[0]);
  }
  if(p.length === 1 && q.length === 0) {
    return _circle_1(p[0]);
  }

  const x = p.pop();
  let d = _bounding_circle(p, q);
  if(!_contains(d, x)) {
    q.push(x);
    d = _bounding_circle(p, q);
    q.pop();
  }
  p.push(x);
  return d;
}

function bounding_circle(points) {
  return _bounding_circle(Array.from(points), []);
}

if(typeof exports !== "undefined") {
  exports.box    = bounding_box;
  exports.circle = bounding_circle;
}
