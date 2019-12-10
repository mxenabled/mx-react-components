const keycode = require('keycode');

export const isEnterOrSpaceKey = (e) => ['enter', 'space'].includes(keycode(e));

export const isTabKey = (e) => ['tab'].includes(keycode(e));