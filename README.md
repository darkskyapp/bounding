Bounding
========
A utility library for computing bounding areas for 2D point sets.


Usage
-----
*   `bounding.box([x1, y2, x2, y2, ..., xN, yN])`: returns an axis-aligned
    bounding box (as an array: `[xMin, yMin, xMax, yMax]`. Very fast to compute
    and very fast to test for overlap, but generally provides poor bounds.
*   `bounding.box()` and `bounding.box(points, box)`: allows one to find the
    bounding box incrementally.
*   `bounding.circle([x1, y2, x2, y2, ..., xN, yN])`: returns a bounding circle
    (as an array: `[x, y, radius]`). Fast to compute (we use Welzl's _O(N)_
    algorithm), very fast to test for overlap, and rotationally invariant (if
    that matters for your use-case), but generally provides poor bounds.
*   `bounding.hull([x1, y2, x2, y2, ..., xN, yN])`: returns the convext hull
    (as an array: `[xA, yA, xB, yB, ..., xZ, yZ]`). Slower to compute than
    other shapes (we use Andrew's _O(N log N)_ monotone chain algorithm), and
    slow to test for overlap, but provides the tighest possible bounds.
