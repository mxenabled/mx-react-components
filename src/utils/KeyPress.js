const keycode = require('keycode');

export const isEnterOrSpaceKey = (e) => ['enter', 'space'].includes(keycode(e));