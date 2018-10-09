const PropTypes = require('prop-types');
const React = require('react');
const _isEqual = require('lodash/isEqual');

import { getIconPath } from '../constants/IconPaths'

class Icon extends React.Component {
  static propTypes = {
    backgroundFillColor: PropTypes.string,
    elementProps: PropTypes.object,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    type: PropTypes.string
  };

  static defaultProps = {
    backgroundFillColor: 'transparent',
    elementProps: {},
    size: 24,
    type: 'accounts'
  };

  shouldComponentUpdate (nextProps) {
    return !_isEqual(nextProps, this.props);
  }

  render () {
    const elementProps = {
      'aria-hidden': true,
      focusable: 'false',
      ...this.props.elementProps
    };
    const styles = this.styles();

    return (
      <svg
        {...elementProps}
        className='mx-icon'
        preserveAspectRatio='xMidYMid meet'
        style={styles.component}
        viewBox='0 0 512 512'
      >
        {getIconPath(this.props.type, this.props.backgroundFillColor)}
      </svg>
    );
  }

  styles = () => {
    return {
      component: Object.assign({
        width: this.props.size,
        height: this.props.size,
        display: 'inline-block',
        verticalAlign: 'middle'
      }, this.props.style)
    };
  };
}

module.exports = Icon;
