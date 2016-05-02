const Radium = require('radium');
const React = require('react');
const Velocity = require('velocity-animate');

const Button = require('../components/Button');

const StyleConstants = require('../constants/Style');

const Drawer = React.createClass({
  propTypes: {
    buttonPrimaryColor: React.PropTypes.string,
    duration: React.PropTypes.number,
    easing: React.PropTypes.array,
    navConfig: React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      onNextClick: React.PropTypes.func.isRequired,
      onPreviousClick: React.PropTypes.func.isRequired
    }),
    onClose: React.PropTypes.func.isRequired,
    title: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      buttonPrimaryColor: StyleConstants.Colors.PRIMARY,
      duration: 500,
      easing: [0.28, 0.14, 0.34, 1.04],
      title: ''
    };
  },

  componentDidMount () {
  },

  },

  _handleCloseClick () {
    this._animateComponent({ left: '100%' })
    .then(() => {
      this.props.onClose();
    });
  },

  _animateComponent (transition) {
    const el = this._component;
    const options = {
      duration: this.props.duration,
      easing: this.props.easing
    };

    return Velocity(el, transition, options);
  },

  _renderNav () {
    const styles = this.styles();

    return this.props.navConfig ? (
      <nav style={styles.nav}>
        <Button
          icon='caret-left'
          onClick={this.props.navConfig.onPreviousClick}
          primaryColor={this.props.buttonPrimaryColor}
          type='base'
        />
        <span style={styles.navLabel}>
          {this.props.navConfig.label}
        </span>
        <Button
          icon='caret-right'
          onClick={this.props.navConfig.onNextClick}
          primaryColor={this.props.buttonPrimaryColor}
          type='base'
        />
      </nav>
    ) : null;
  },

  render () {
    const styles = this.styles();

    return (
      <div>
        <div onClick={this._handleCloseClick} style={styles.scrim}></div>
        <div ref={(ref) => (this._component = ref)} style={styles.component}>
          <header style={styles.header}>
            <span style={styles.backArrow}>
              <Button
                icon='arrow-left'
                onClick={this._handleCloseClick}
                primaryColor={this.props.buttonPrimaryColor}
                type={'base'}
              />
            </span>
            <span style={styles.title}>
              {this.props.title}
            </span>
            {this._renderNav()}
          </header>
          <div style={styles.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },

  styles () {
    return {
      component: {
        zIndex: 1001,
        top: 0,
        bottom: 0,
        left: '100%',
        position: 'absolute',
        width: '80%',
        overflow: 'hidden',
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        boxShadow: StyleConstants.ShadowHigh
      },
      content: {
        backgroundColor: StyleConstants.Colors.WHITE,
        height: '100%'
      },
      scrim: {
        zIndex: 1000,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        textAlign: 'center',
        backgroundColor: StyleConstants.Colors.SCRIM
      },
      icons: {
        color: StyleConstants.Colors.ASH
      },
      backArrow: {
      },
      header: {
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        borderBottom: 'solid 1px ' + StyleConstants.Colors.FOG,
        height: 15,
        padding: '15px 25px',
        position: 'relative'
      },
      title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '50%',
        whiteSpace: 'nowrap'
      },
      nav: {
        fontFamily: StyleConstants.Fonts.THIN,
        color: StyleConstants.Colors.ASH,
      }
    };
  }
});

module.exports = Radium(Drawer);