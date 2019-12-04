const keycode = require('keycode');

export const isEnterOrSpaceKey = (e) => ['enter', 'space'].includes(keycode(e));

export const isArrowKey = (e) => ['right', 'left', 'up', 'down'].includes(keycode(e));