const React = require('react');
const Velocity = require('velocity-animate');

const StyleConstants = require('../constants/Style');

const Icon = require('../components/Icon');

const Drawer = React.createClass({
  propTypes: {
    duration: React.PropTypes.number,
    easing: React.PropTypes.array,
    isOpen: React.PropTypes.bool,
    onClose: React.PropTypes.func.isRequired,
    siblingContent: React.PropTypes.shape({
      currentSiblingIndex: React.PropTypes.number.isRequired,
      nextSibling: React.PropTypes.func.isRequired,
      previousSibling: React.PropTypes.func.isRequired,
      totalSiblings: React.PropTypes.number.isRequired
    })
  },

  getDefaultProps () {
    return {
      duration: 500,
      isOpen: false,
      easing: [0.28, 0.14, 0.34, 1.04]
    };
  },

  componentDidMount () {
    this._renderTransition(this.props.isOpen);
  },

  componentWillReceiveProps (newProps) {
    if (newProps.isOpen !== this.props.isOpen) {
      this._renderTransition(newProps.isOpen);
    }
  },

  _renderSiblingContent () {
    const styles = this.styles();

    return (
      <div ref='siblingContent' style={styles.siblingContent}>
        <Icon onClick={this.props.siblingContent.previousSibling} size={25} style={styles.icon} type='caret-left'/>
        {this.props.siblingContent.currentSiblingIndex} of {this.props.siblingContent.totalSiblings}
        <Icon onClick={this.props.siblingContent.nextSibling} size={25} style={styles.icon} type='caret-right'/>
      </div>
    );
  },

  _renderTransition (isOpen) {
    const el = this.refs.component;
    const transition = isOpen ? { right: -800 } : { right: 0 };
    const options = {
      complete: this._slideArrowAndSiblingContent.bind(this, isOpen),
      duration: this.props.duration,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  _slideArrowAndSiblingContent (isOpen) {
    this._slideArrow(isOpen);
    this._slideSiblingContent(isOpen);
  },

  _slideArrow (isOpen) {
    const el = this.refs.arrow;
    const transition = isOpen ? { left: -25 } : { left: 25 };
    const options = {
      duration: 200,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  _slideSiblingContent (isOpen) {
    const el = this.refs.siblingContent;
    const transition = isOpen ? { top: -12 } : { top: 12 };
    const options = {
      duration: 200,
      easing: this.props.easing
    };

    Velocity(el, transition, options);
  },

  render () {
    const styles = this.styles();

    return (
      <div ref='component' style={styles.component}>
        <nav style={styles.nav}>
          <span ref='arrow' style={styles.iconContainer}>
            <Icon onClick={this.props.onClose} size={25} style={styles.icon}type='arrow-left'/>
          </span>
          {this.props.siblingContent ? this._renderSiblingContent() : null}
        </nav>
        <header></header>
        <div></div>
      </div>
    );
  },

  styles () {
    return {
      component: {
        top: 0,
        bottom: 0,
        right: -800,
        position: 'absolute',
        width: 800,
        overflow: 'hidden'
      },
      icon: {
        color: StyleConstants.Colors.ASH
      },
      iconContainer: {
        position: 'absolute',
        left: -25,
        top: 12
      },
      nav: {
        backgroundColor: StyleConstants.Colors.PORCELAIN,
        borderBottom: 'solid 1px ' + StyleConstants.Colors.ASH,
        height: 15,
        padding: '15px 25px'
      },
      siblingContent: {
        fontFamily: StyleConstants.Fonts.THIN,
        color: StyleConstants.Colors.ASH,
        position: 'absolute',
        right: 25,
        top: -12
      }
    };
  }

});

module.exports = Drawer;
