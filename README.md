Bounding
========
A utility library for computing bounding areas for 2D point sets.


Usage
-----
*   `bounding.box([x1, y2, x2, y2, ..., xN, yN])`: returns an axis-aligned
    bounding box (as an array: `[xMin, yMin, xMax, yMax]`. Very fast to compute
    and very fast to test for overlap, but generally provides poor bounds.

    This function may also be used incrementally, as follows:

    ```javascript
    const box = bounding.box();
    for(const shape of shapes) {
      bounding.box(shape, box);
    }
    ```

*   `bounding.circle([x1, y2, x2, y2, ..., xN, yN])`: returns a bounding circle
    (as an array: `[x, y, radius]`). Fast to compute (we use Welzl's _O(N)_
    algorithm), very fast to test for overlap, and rotationally invariant (if
    that matters for your use-case), but generally provides poor bounds.

*   `bounding.hull([x1, y2, x2, y2, ..., xN, yN])`: returns the convex hull
    (as an array: `[xA, yA, xB, yB, ..., xZ, yZ]`). Slower to compute than
    other shapes (we use Andrew's _O(N log N)_ monotone chain algorithm), and
    slow to test for overlap, but provides the tighest possible bounds.


License
-------
To the extent possible by law, The Dark Sky Company, LLC has [waived all
copyright and related or neighboring rights][cc0] to this library.

[cc0]: http://creativecommons.org/publicdomain/zero/1.0
