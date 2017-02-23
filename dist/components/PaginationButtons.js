'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var React = require('react');

var ButtonGroup = require('./ButtonGroup');

var StyleConstants = require('../constants/Style');

var _require = require('../constants/App'),
    buttonTypes = _require.buttonTypes;

var PaginationButtons = React.createClass({
  displayName: 'PaginationButtons',

  propTypes: {
    currentPage: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
    pageRange: React.PropTypes.number,
    primaryColor: React.PropTypes.string,
    style: React.PropTypes.object,
    totalPages: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(buttonTypes)
  },

  getDefaultProps: function getDefaultProps() {
    return {
      currentPage: 1,
      pageRange: 9,
      primaryColor: StyleConstants.Colors.PRIMARY,
      totalPages: 1,
      type: 'primaryOutline'
    };
  },
  _handleButtonClick: function _handleButtonClick(buttonClicked) {
    var _props = this.props,
        currentPage = _props.currentPage,
        totalPages = _props.totalPages;

    var goToPage = buttonClicked;

    if (buttonClicked === 'prev') {
      goToPage = currentPage > 1 ? currentPage - 1 : 1;
    } else if (buttonClicked === 'next') {
      goToPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    }

    this.props.onClick(goToPage);
  },
  _getPrevButton: function _getPrevButton() {
    var type = this.props.currentPage <= 1 ? 'disabled' : null;
    var style = this.styles().component;

    return {
      icon: 'caret-left',
      onClick: this._handleButtonClick.bind(null, 'prev'),
      style: style,
      type: type
    };
  },
  _getNextButton: function _getNextButton() {
    var type = this.props.currentPage >= this.props.totalPages ? 'disabled' : null;
    var style = this.styles().component;

    return {
      icon: 'caret-right',
      onClick: this._handleButtonClick.bind(null, 'next'),
      style: style,
      type: type
    };
  },
  _getStartingPage: function _getStartingPage(currentPage, maxStartingPage, staticSet, startingSet, middleSet) {
    var startingPage = 1;

    if (!staticSet && !startingSet) {
      if (middleSet) {
        startingPage = currentPage;
      } else {
        startingPage = maxStartingPage;
      }
    }

    return startingPage;
  },
  _getEndingPage: function _getEndingPage(totalPages, pageRange, startingSet, staticSet, middleSet, startingPage) {
    var endingPage = totalPages;

    if (!staticSet) {
      if (startingSet) {
        endingPage = pageRange - 2;
      } else if (middleSet) {
        endingPage = startingPage + pageRange - 5;
      }
    }

    return endingPage;
  },
  _addFirstPageButtons: function _addFirstPageButtons() {
    var style = this.styles().component;

    return [{
      onClick: this._handleButtonClick.bind(null, 1),
      style: style,
      text: '1'
    }, {
      icon: 'kabob_horizontal',
      style: style,
      type: 'disabled'
    }];
  },
  _addLastPageButtons: function _addLastPageButtons(totalPages) {
    var style = this.styles().component;

    return [{
      icon: 'kabob_horizontal',
      style: style,
      type: 'disabled'
    }, {
      onClick: this._handleButtonClick.bind(null, totalPages),
      style: style,
      text: totalPages.toString()
    }];
  },
  _getPageButtons: function _getPageButtons() {
    var style = this.styles();
    var _props2 = this.props,
        currentPage = _props2.currentPage,
        pageRange = _props2.pageRange,
        totalPages = _props2.totalPages;

    var pages = [];
    var maxStartingPage = totalPages - pageRange + 3;
    var staticSet = totalPages <= pageRange;
    var startingSet = !staticSet && currentPage <= pageRange - 2;
    var endingSet = !staticSet && !startingSet && currentPage + pageRange - 3 >= totalPages;
    var middleSet = !staticSet && !startingSet && !endingSet;
    var startingPage = this._getStartingPage(currentPage, maxStartingPage, staticSet, startingSet, middleSet);
    var endingPage = this._getEndingPage(totalPages, pageRange, startingSet, staticSet, middleSet, startingPage);

    for (var i = startingPage; i <= endingPage; i++) {
      var activeStyle = i === currentPage && style.active;
      var buttonStyle = _extends({}, style.component, activeStyle);

      pages.push({
        onClick: this._handleButtonClick.bind(null, i),
        text: i.toString(),
        style: buttonStyle
      });
    }

    if (!staticSet) {
      if (!startingSet) {
        pages.unshift.apply(pages, _toConsumableArray(this._addFirstPageButtons()));
      }

      if (!endingSet) {
        pages.push.apply(pages, _toConsumableArray(this._addLastPageButtons(totalPages)));
      }
    }

    return pages;
  },
  render: function render() {
    return React.createElement(ButtonGroup, {
      buttons: [this._getPrevButton()].concat(_toConsumableArray(this._getPageButtons()), [this._getNextButton()]),
      type: this.props.type
    });
  },
  styles: function styles() {
    return {
      component: _extends({
        padding: '4px 8px',
        width: 35
      }, this.props.style),
      active: {
        backgroundColor: StyleConstants.adjustHexOpacity(this.props.primaryColor, 0.15)
      }
    };
  }
});

module.exports = PaginationButtons;