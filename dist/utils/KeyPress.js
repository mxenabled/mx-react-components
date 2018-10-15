"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEnterOrSpaceKey = void 0;

var keycode = require('keycode');

var isEnterOrSpaceKey = function isEnterOrSpaceKey(e) {
  return ['enter', 'space'].includes(keycode(e));
};

exports.isEnterOrSpaceKey = isEnterOrSpaceKey;