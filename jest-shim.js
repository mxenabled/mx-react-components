/**
 * React 16 depends on requestAnimationFrame even in test environments
 * https://reactjs.org/docs/javascript-environment-requirements.html
 */
global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (callback) {
  setTimeout(callback, 0);
};
