'use strict';

var React = require('react');

var Spin = require('./Spin');

var StyleConstants = require('../constants/Style');

var Loader = React.createClass({
  displayName: 'Loader',

  propTypes: {
    color: React.PropTypes.string,
    isLoading: React.PropTypes.bool,
    isRelative: React.PropTypes.bool,
    isSmall: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      color: StyleConstants.Colors.PRIMARY,
      isLoading: false,
      isRelative: false,
      isSmall: false,
      children: 'LOADING...'
    };
  },
  render: function render() {
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
});

module.exports = Loader;