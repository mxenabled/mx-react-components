const React = require('react');

const Spin = require('./Spin');

const StyleConstants = require('../constants/Style');

class Loader extends React.Component {
  render () {
    if (this.props.isLoading) {
      const styles = {
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

      return (
        <div className='mx-loader' style={styles.component}>
          <div className='mx-loader-content' style={styles.content}>
            <Spin>
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
        <div/>
      );
    }
  }
}

Loader.propTypes = {
  color: React.PropTypes.string,
  isLoading: React.PropTypes.bool,
  isRelative: React.PropTypes.bool,
  isSmall: React.PropTypes.bool
};

Loader.defaultProps = {
  color: StyleConstants.Colors.PRIMARY,
  isLoading: false,
  isRelative: false,
  isSmall: false,
  children: 'LOADING...'
};

module.exports = Loader;
