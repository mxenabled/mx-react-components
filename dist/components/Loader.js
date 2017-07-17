'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');

var Spin = require('./Spin');

var StyleConstants = require('../constants/Style');

var Loader = function (_React$Component) {
  _inherits(Loader, _React$Component);

  function Loader() {
    _classCallCheck(this, Loader);

    return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).apply(this, arguments));
  }

  _createClass(Loader, [{
    key: 'render',
    value: function render() {
      if (this.props.isLoading) {
        var styles = {
          component: {
            backgroundColor: 'rgba(255,255,255,0.9)',
            bottom: 0,
            color: '#999',
            fontFamily: StyleConstants.FontFamily,
            fontSize: '10px',
            fontWeight: 600,
            left: 0,
            letterSpacing: '1px',
            position: this.props.isRelative ? 'absolute' : 'fixed',
            right: 0,
            textAlign: 'center',
            top: 0,
            zIndex: 100
          },
          content: {
            textAlign: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: 'auto',
            width: this.props.isSmall ? '30px' : '50px',
            height: this.props.isSmall ? '30px' : '50px'
          },
          circle: {
            borderRadius: '100%',
            width: this.props.isSmall ? '30px' : '50px',
            height: this.props.isSmall ? '30px' : '50px',
            borderTop: '3px solid ' + this.props.color,
            borderRight: '3px solid transparent',
            borderBottom: '3px solid transparent',
            borderLeft: '3px solid transparent'
          },
          text: {
            marginTop: '10px',
            fontSize: '10px'
          }
        };

        return React.createElement(
          'div',
          { className: 'mx-loader', style: styles.component },
          React.createElement(
            'div',
            { className: 'mx-loader-content', style: styles.content },
            React.createElement(
              Spin,
              null,
              React.createElement('div', { style: styles.circle })
            ),
            this.props.isSmall ? null : React.createElement(
              'div',
              { className: 'mx-loader-text', style: styles.text },
              ' ',
              this.props.children,
              ' '
            )
          )
        );
      } else {
        return React.createElement('div', null);
      }
    }
  }]);

  return Loader;
}(React.Component);

Loader.propTypes = {
  color: PropTypes.string,
  isLoading: PropTypes.bool,
  isRelative: PropTypes.bool,
  isSmall: PropTypes.bool
};
Loader.defaultProps = {
  color: StyleConstants.Colors.PRIMARY,
  isLoading: false,
  isRelative: false,
  isSmall: false,
  children: 'LOADING...'
};


module.exports = Loader;