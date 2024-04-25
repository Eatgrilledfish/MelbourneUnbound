/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/point-in-polygon";
exports.ids = ["vendor-chunks/point-in-polygon"];
exports.modules = {

/***/ "(ssr)/./node_modules/point-in-polygon/flat.js":
/*!***********************************************!*\
  !*** ./node_modules/point-in-polygon/flat.js ***!
  \***********************************************/
/***/ ((module) => {

eval("module.exports = function pointInPolygonFlat (point, vs, start, end) {\n    var x = point[0], y = point[1];\n    var inside = false;\n    if (start === undefined) start = 0;\n    if (end === undefined) end = vs.length;\n    var len = (end-start)/2;\n    for (var i = 0, j = len - 1; i < len; j = i++) {\n        var xi = vs[start+i*2+0], yi = vs[start+i*2+1];\n        var xj = vs[start+j*2+0], yj = vs[start+j*2+1];\n        var intersect = ((yi > y) !== (yj > y))\n            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);\n        if (intersect) inside = !inside;\n    }\n    return inside;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcG9pbnQtaW4tcG9seWdvbi9mbGF0LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxTQUFTO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9wb2ludC1pbi1wb2x5Z29uL2ZsYXQuanM/NGYzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBvaW50SW5Qb2x5Z29uRmxhdCAocG9pbnQsIHZzLCBzdGFydCwgZW5kKSB7XG4gICAgdmFyIHggPSBwb2ludFswXSwgeSA9IHBvaW50WzFdO1xuICAgIHZhciBpbnNpZGUgPSBmYWxzZTtcbiAgICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkgc3RhcnQgPSAwO1xuICAgIGlmIChlbmQgPT09IHVuZGVmaW5lZCkgZW5kID0gdnMubGVuZ3RoO1xuICAgIHZhciBsZW4gPSAoZW5kLXN0YXJ0KS8yO1xuICAgIGZvciAodmFyIGkgPSAwLCBqID0gbGVuIC0gMTsgaSA8IGxlbjsgaiA9IGkrKykge1xuICAgICAgICB2YXIgeGkgPSB2c1tzdGFydCtpKjIrMF0sIHlpID0gdnNbc3RhcnQraSoyKzFdO1xuICAgICAgICB2YXIgeGogPSB2c1tzdGFydCtqKjIrMF0sIHlqID0gdnNbc3RhcnQraioyKzFdO1xuICAgICAgICB2YXIgaW50ZXJzZWN0ID0gKCh5aSA+IHkpICE9PSAoeWogPiB5KSlcbiAgICAgICAgICAgICYmICh4IDwgKHhqIC0geGkpICogKHkgLSB5aSkgLyAoeWogLSB5aSkgKyB4aSk7XG4gICAgICAgIGlmIChpbnRlcnNlY3QpIGluc2lkZSA9ICFpbnNpZGU7XG4gICAgfVxuICAgIHJldHVybiBpbnNpZGU7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/point-in-polygon/flat.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/point-in-polygon/index.js":
/*!************************************************!*\
  !*** ./node_modules/point-in-polygon/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var pointInPolygonFlat = __webpack_require__(/*! ./flat.js */ \"(ssr)/./node_modules/point-in-polygon/flat.js\")\nvar pointInPolygonNested = __webpack_require__(/*! ./nested.js */ \"(ssr)/./node_modules/point-in-polygon/nested.js\")\n\nmodule.exports = function pointInPolygon (point, vs, start, end) {\n    if (vs.length > 0 && Array.isArray(vs[0])) {\n        return pointInPolygonNested(point, vs, start, end);\n    } else {\n        return pointInPolygonFlat(point, vs, start, end);\n    }\n}\nmodule.exports.nested = pointInPolygonNested\nmodule.exports.flat = pointInPolygonFlat\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcG9pbnQtaW4tcG9seWdvbi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQSx5QkFBeUIsbUJBQU8sQ0FBQyxnRUFBVztBQUM1QywyQkFBMkIsbUJBQU8sQ0FBQyxvRUFBYTs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixtQkFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9wb2ludC1pbi1wb2x5Z29uL2luZGV4LmpzPzRiMTQiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHBvaW50SW5Qb2x5Z29uRmxhdCA9IHJlcXVpcmUoJy4vZmxhdC5qcycpXG52YXIgcG9pbnRJblBvbHlnb25OZXN0ZWQgPSByZXF1aXJlKCcuL25lc3RlZC5qcycpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcG9pbnRJblBvbHlnb24gKHBvaW50LCB2cywgc3RhcnQsIGVuZCkge1xuICAgIGlmICh2cy5sZW5ndGggPiAwICYmIEFycmF5LmlzQXJyYXkodnNbMF0pKSB7XG4gICAgICAgIHJldHVybiBwb2ludEluUG9seWdvbk5lc3RlZChwb2ludCwgdnMsIHN0YXJ0LCBlbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwb2ludEluUG9seWdvbkZsYXQocG9pbnQsIHZzLCBzdGFydCwgZW5kKTtcbiAgICB9XG59XG5tb2R1bGUuZXhwb3J0cy5uZXN0ZWQgPSBwb2ludEluUG9seWdvbk5lc3RlZFxubW9kdWxlLmV4cG9ydHMuZmxhdCA9IHBvaW50SW5Qb2x5Z29uRmxhdFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/point-in-polygon/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/point-in-polygon/nested.js":
/*!*************************************************!*\
  !*** ./node_modules/point-in-polygon/nested.js ***!
  \*************************************************/
/***/ ((module) => {

eval("// ray-casting algorithm based on\n// https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html\n\nmodule.exports = function pointInPolygonNested (point, vs, start, end) {\n    var x = point[0], y = point[1];\n    var inside = false;\n    if (start === undefined) start = 0;\n    if (end === undefined) end = vs.length;\n    var len = end - start;\n    for (var i = 0, j = len - 1; i < len; j = i++) {\n        var xi = vs[i+start][0], yi = vs[i+start][1];\n        var xj = vs[j+start][0], yj = vs[j+start][1];\n        var intersect = ((yi > y) !== (yj > y))\n            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);\n        if (intersect) inside = !inside;\n    }\n    return inside;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcG9pbnQtaW4tcG9seWdvbi9uZXN0ZWQuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsU0FBUztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvcG9pbnQtaW4tcG9seWdvbi9uZXN0ZWQuanM/Njc0NyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyByYXktY2FzdGluZyBhbGdvcml0aG0gYmFzZWQgb25cbi8vIGh0dHBzOi8vd3JmLmVjc2UucnBpLmVkdS9SZXNlYXJjaC9TaG9ydF9Ob3Rlcy9wbnBvbHkuaHRtbFxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBvaW50SW5Qb2x5Z29uTmVzdGVkIChwb2ludCwgdnMsIHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgeCA9IHBvaW50WzBdLCB5ID0gcG9pbnRbMV07XG4gICAgdmFyIGluc2lkZSA9IGZhbHNlO1xuICAgIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSBzdGFydCA9IDA7XG4gICAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSBlbmQgPSB2cy5sZW5ndGg7XG4gICAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0O1xuICAgIGZvciAodmFyIGkgPSAwLCBqID0gbGVuIC0gMTsgaSA8IGxlbjsgaiA9IGkrKykge1xuICAgICAgICB2YXIgeGkgPSB2c1tpK3N0YXJ0XVswXSwgeWkgPSB2c1tpK3N0YXJ0XVsxXTtcbiAgICAgICAgdmFyIHhqID0gdnNbaitzdGFydF1bMF0sIHlqID0gdnNbaitzdGFydF1bMV07XG4gICAgICAgIHZhciBpbnRlcnNlY3QgPSAoKHlpID4geSkgIT09ICh5aiA+IHkpKVxuICAgICAgICAgICAgJiYgKHggPCAoeGogLSB4aSkgKiAoeSAtIHlpKSAvICh5aiAtIHlpKSArIHhpKTtcbiAgICAgICAgaWYgKGludGVyc2VjdCkgaW5zaWRlID0gIWluc2lkZTtcbiAgICB9XG4gICAgcmV0dXJuIGluc2lkZTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/point-in-polygon/nested.js\n");

/***/ })

};
;