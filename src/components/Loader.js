const React = require('react');
const Spin = require('./Spin');

const Loader = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    isLoading: React.PropTypes.bool,
    isRelative: React.PropTypes.bool,
    isSmall: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      color: '#333333',
      isLoading: false,
      isRelative: false,
      isSmall: false
    };
  },

  render () {
    if (this.props.isLoading) {
      const styles = {
        component: {
          backgroundColor: 'rgba(255,255,255,0.9)',
          bottom: 0,
          color: '#999',
          fontFamily: 'Helvetica, Arial, sans-serif',
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
        <div style={styles.component}>
          <div style={styles.content}>
            <Spin>
              <div style={styles.circle} />
            </Spin>
            {this.props.isSmall ? (
              null
            ) : (
              <div style={styles.text} >LOADING...</div>
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
});

module.exports = Loader;
