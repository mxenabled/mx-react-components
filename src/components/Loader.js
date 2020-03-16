const PropTypes = require('prop-types');
const React = require('react');
const _merge = require('lodash/merge')

import { withTheme } from './Theme';
const Spin = require('./Spin');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class Loader extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    direction: PropTypes.oneOf(['counterclockwise', 'clockwise']),
    isLoading: PropTypes.bool,
    isRelative: PropTypes.bool,
    isSmall: PropTypes.bool,
    styles: PropTypes.object,
    theme: themeShape
  };

  static defaultProps = {
    direction: 'clockwise',
    isLoading: false,
    isRelative: false,
    isSmall: false,
    children: 'LOADING...'
  };

  render() {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    if (this.props.isLoading) {
      return (
        <div className='mx-loader' style={styles.component}>
          <div className='mx-loader-content' style={styles.content}>
            <Spin direction={this.props.direction}>
              <div style={styles.circle} />
            </Spin>
            {this.props.isSmall ? (
              null
            ) : (
                <div className='mx-loader-text' style={styles.text} > {this.props.children} </div>
              )}
          </div>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }

  styles = (theme) => {
    const color = this.props.color || theme.Colors.PRIMARY;

    const componentStyles = {
      component: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        bottom: 0,
        color: '#999',
        fontFamily: theme.Fonts.REGULAR,
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
        borderTop: '3px solid ' + color,
        borderRight: '3px solid transparent',
        borderBottom: '3px solid transparent',
        borderLeft: '3px solid transparent'
      },
      text: {
        marginTop: '10px',
        fontSize: '10px'
      }
    }

    return this.props.styles ? _merge({}, componentStyles, this.props.styles) : componentStyles
  }
}


module.exports = withTheme(Loader);
