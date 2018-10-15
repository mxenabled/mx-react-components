"use strict";

var PropTypes = require('prop-types');

var StyleConstants = require('./Style');

var shapeForObject = function shapeForObject(obj, propType) {
  return PropTypes.shape(Object.keys(obj).reduce(function (shape, key) {
    shape[key] = propType;
    return shape;
  }, {}));
};

module.exports = {
  buttonTypes: ['base', 'disabled', 'neutral', 'primary', 'primaryOutline', 'primaryInverse', 'secondary'],
  Icons: [{
    value: 'accounts',
    displayValue: 'Accounts'
  }, {
    value: 'add',
    displayValue: 'Add'
  }, {
    value: 'add-solid',
    displayValue: 'Add Solid'
  }, {
    value: 'android',
    displayValue: 'Android'
  }, {
    value: 'apple',
    displayValue: 'Apple'
  }, {
    value: 'appliances',
    displayValue: 'Appliances'
  }, {
    value: 'arrow-down',
    displayValue: 'Arrow Down'
  }, {
    value: 'arrow-down-fat',
    displayValue: 'Arrow Down Fat'
  }, {
    value: 'arrow-left',
    displayValue: 'Arrow Left'
  }, {
    value: 'arrow-right',
    displayValue: 'Arrow Right'
  }, {
    value: 'arrow-up',
    displayValue: 'Arrow Up'
  }, {
    value: 'arrow-up-fat',
    displayValue: 'Arrow Up Fat'
  }, {
    value: 'art',
    displayValue: 'Art'
  }, {
    value: 'attention',
    displayValue: 'Attention'
  }, {
    value: 'attention-solid',
    displayValue: 'Attention Solid'
  }, {
    value: 'auto',
    displayValue: 'Auto'
  }, {
    value: 'backspace',
    displayValue: 'Backspace'
  }, {
    value: 'bell',
    displayValue: 'bell'
  }, {
    value: 'bike',
    displayValue: 'Bike'
  }, {
    value: 'bill-pay',
    displayValue: 'Bill Pay'
  }, {
    value: 'bubbles',
    displayValue: 'Bubbles'
  }, {
    value: 'business',
    displayValue: 'Business'
  }, {
    value: 'calendar',
    displayValue: 'Calendar'
  }, {
    value: 'calendar-plus',
    displayValue: 'Calendar Plus'
  }, {
    value: 'camera',
    displayValue: 'Camera'
  }, {
    value: 'campaigns',
    displayValue: 'Campaigns'
  }, {
    value: 'caret-down',
    displayValue: 'Caret Down'
  }, {
    value: 'caret-left',
    displayValue: 'Caret Left'
  }, {
    value: 'caret-right',
    displayValue: 'Caret Right'
  }, {
    value: 'caret-up',
    displayValue: 'Caret Up'
  }, {
    value: 'cash',
    displayValue: 'Cash'
  }, {
    value: 'chart',
    displayValue: 'Chart'
  }, {
    value: 'check',
    displayValue: 'Check'
  }, {
    value: 'check-skinny',
    displayValue: 'Check Skinny'
  }, {
    value: 'check-solid',
    displayValue: 'Check Solid'
  }, {
    value: 'checkbox',
    displayValue: 'Checkbox'
  }, {
    value: 'checkbox-selected',
    displayValue: 'Checkbox Selected'
  }, {
    value: 'checkbox-solid',
    displayValue: 'Checkbox Solid'
  }, {
    value: 'checking',
    displayValue: 'Checking'
  }, {
    value: 'clock',
    displayValue: 'Clock'
  }, {
    value: 'close',
    displayValue: 'Close'
  }, {
    value: 'close-skinny',
    displayValue: 'Close Skinny'
  }, {
    value: 'close-solid',
    displayValue: 'Close Solid'
  }, {
    value: 'close-box',
    displayValue: 'Close Box'
  }, {
    value: 'comparisons',
    displayValue: 'Comparisons'
  }, {
    value: 'credit-card',
    displayValue: 'Credit Card'
  }, {
    value: 'debts',
    displayValue: 'Debts'
  }, {
    value: 'delete',
    displayValue: 'Delete'
  }, {
    value: 'desktop',
    displayValue: 'Desktop'
  }, {
    value: 'document',
    displayValue: 'Document'
  }, {
    value: 'dollar',
    displayValue: 'Dollar'
  }, {
    value: 'download',
    displayValue: 'Download'
  }, {
    value: 'duplicate',
    displayValue: 'Duplicate'
  }, {
    value: 'edit',
    displayValue: 'Edit'
  }, {
    value: 'education',
    displayValue: 'Education'
  }, {
    value: 'entertainment',
    displayValue: 'Entertainment'
  }, {
    value: 'envelope',
    displayValue: 'Envelope'
  }, {
    value: 'filter',
    displayValue: 'Filter'
  }, {
    value: 'flag',
    displayValue: 'Flag'
  }, {
    value: 'folder',
    displayValue: 'Folder'
  }, {
    value: 'food',
    displayValue: 'Food'
  }, {
    value: 'furniture',
    displayValue: 'Furniture'
  }, {
    value: 'gallery',
    displayValue: 'Gallery'
  }, {
    value: 'gear',
    displayValue: 'Gear'
  }, {
    value: 'gifts',
    displayValue: 'Gifts'
  }, {
    value: 'go-back',
    displayValue: 'Go back'
  }, {
    value: 'hamburger',
    displayValue: 'Hamburger'
  }, {
    value: 'health',
    displayValue: 'Health'
  }, {
    value: 'help',
    displayValue: 'Help'
  }, {
    value: 'home',
    displayValue: 'Home'
  }, {
    value: 'import',
    displayValue: 'Import'
  }, {
    value: 'info',
    displayValue: 'Info'
  }, {
    value: 'info-solid',
    displayValue: 'Info-solid'
  }, {
    value: 'investment',
    displayValue: 'Investment'
  }, {
    value: 'jewlery',
    displayValue: 'Jewlery'
  }, {
    value: 'kabob_horizontal',
    displayValue: 'Kabob Horizontal'
  }, {
    value: 'key',
    displayValue: 'Key'
  }, {
    value: 'kids',
    displayValue: 'Kids'
  }, {
    value: 'line-of-credit',
    displayValue: 'Line Of Credit'
  }, {
    value: 'link',
    displayValue: 'Link'
  }, {
    value: 'list-view',
    displayValue: 'List View'
  }, {
    value: 'loans',
    displayValue: 'Loans'
  }, {
    value: 'lock',
    displayValue: 'Lock'
  }, {
    value: 'map',
    displayValue: 'Map'
  }, {
    value: 'mobile-phone',
    displayValue: 'Mobile Phone'
  }, {
    value: 'money-banknote',
    displayValue: 'Money Banknote'
  }, {
    value: 'mx',
    displayValue: 'MX'
  }, {
    value: 'needle',
    displayValue: 'Needle'
  }, {
    value: 'net-worth',
    displayValue: 'Net Worth'
  }, {
    value: 'net-worth2',
    displayValue: 'Net Worth 2'
  }, {
    value: 'no',
    displayValue: 'NO'
  }, {
    value: 'pause',
    displayValue: 'Pause'
  }, {
    value: 'percent',
    displayValue: 'Percent'
  }, {
    value: 'personal-care',
    displayValue: 'Personal Care'
  }, {
    value: 'pets',
    displayValue: 'Pets'
  }, {
    value: 'phone',
    displayValue: 'Phone'
  }, {
    value: 'play',
    displayValue: 'Play'
  }, {
    value: 'play-solid',
    displayValue: 'Play Solid'
  }, {
    value: 'plus',
    displayValue: 'Plus'
  }, {
    value: 'plus-box',
    displayValue: 'Plus Box'
  }, {
    value: 'pointer',
    displayValue: 'pointer'
  }, {
    value: 'property',
    displayValue: 'Property'
  }, {
    value: 'radio-empty',
    displayValue: 'Radio Empty'
  }, {
    value: 'radio-filled',
    displayValue: 'Radio Filled'
  }, {
    value: 'real-estate',
    displayValue: 'Real Estate'
  }, {
    value: 'retirement',
    displayValue: 'Retirement'
  }, {
    value: 'rocket',
    displayValue: 'Rocket'
  }, {
    value: 'savings',
    displayValue: 'Savings'
  }, {
    value: 'search',
    displayValue: 'Search'
  }, {
    value: 'shopping',
    displayValue: 'Shopping'
  }, {
    value: 'segments',
    displayValue: 'Segments'
  }, {
    value: 'spending',
    displayValue: 'Spending'
  }, {
    value: 'spinner',
    displayValue: 'Spinner'
  }, {
    value: 'split',
    displayValue: 'Split'
  }, {
    value: 'sports',
    displayValue: 'Sports'
  }, {
    value: 'submit-feedback',
    displayValue: 'Submit Feedback'
  }, {
    value: 'subtract',
    displayValue: 'Subtract'
  }, {
    value: 'sync',
    displayValue: 'Sync'
  }, {
    value: 'taxes',
    displayValue: 'Taxes'
  }, {
    value: 'transfer',
    displayValue: 'Transfer'
  }, {
    value: 'transactions',
    displayValue: 'Transactions'
  }, {
    value: 'travel',
    displayValue: 'Travel'
  }, {
    value: 'user',
    displayValue: 'User'
  }, {
    value: 'utilities',
    displayValue: 'Utilities'
  }, {
    value: 'view',
    displayValue: 'View'
  }, {
    value: 'visit',
    displayValue: 'Visit'
  }, {
    value: 'waffle',
    displayValue: 'Waffle'
  }, {
    value: 'windows',
    displayValue: 'Windows'
  }, {
    value: 'x-axis',
    displayValue: 'X Axis'
  }, {
    value: 'y-axis',
    displayValue: 'Y Axis'
  }],
  themeShape: PropTypes.shape({
    Colors: shapeForObject(StyleConstants.Colors, PropTypes.string)
  })
};