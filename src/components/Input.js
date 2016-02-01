const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style');
const Icon = require('./Icon');
const Button = require('./Button');

const Input = React.createClass({
  propTypes: {
    autofocus: React.PropTypes.bool,
    button: React.PropTypes.oneOf([
      'clear',
      'submit'
    ]),
    icon: React.PropTypes.oneOf([
      'accounts',
      'add',
      'add-solid',
      'arrow-down',
      'arrow-up',
      'arrow-left',
      'arrow-right',
      'arrow-down-fat',
      'arrow-up-fat',
      'attention-solid',
      'auto',
      'backspace',
      'calendar',
      'calendar-plus',
      'campaigns',
      'caret-down',
      'caret-left',
      'caret-right',
      'caret-up',
      'chart',
      'check',
      'check-solid',
      'checking',
      'clock',
      'close',
      'close-solid',
      'comparisons',
      'credit-card',
      'delete',
      'download',
      'edit',
      'envelope',
      'export',
      'folder',
      'gallery',
      'gear',
      'hamburger',
      'help',
      'home',
      'info',
      'link',
      'list-view',
      'loans',
      'md-cash',
      'md-check-mark',
      'md-credit',
      'md-debts',
      'mobile-phone',
      'mx',
      'phone',
      'play',
      'play-solid',
      'savings',
      'search',
      'segments',
      'sync',
      'transactions',
      'user',
      'view',
      'visit',
      'x-axis',
      'y-axis'
    ]),
    label: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    onTextChange: React.PropTypes.func,
    options: React.PropTypes.array,
    placeholderText: React.PropTypes.string,
    prefix: React.PropTypes.string,
    suffix: React.PropTypes.string,
    type: React.PropTypes.oneOf([
      'number',
      'password',
      'text',
      'email'
    ]),
    value: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      type: 'text',
      placeholderText: '',
      onTextChange () {},
      onSubmit () {},
      value: '',
      options: [],
      autofocus: false,
      label: 'Default'
    };
  },

  getInitialState () {
    return {
      value: this.props.value
    };
  },

  _handleInputChange (e) {
    this.setState({
      value: e.target.value
    });
    this.props.onTextChange(e.target.value);
  },

  _handleClear (e) {
    this.setState({
      value: ''
    });
    this.props.onTextChange(e.target.value);
  },

  _handleSubmit () {
    this.props.onSubmit(this.state.value);
  },

  render () {
    const styles = {
      component: {
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        boxSizing: 'border-box'
      },
      label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '700',
        fontSize: StyleConstants.FontSizes.XLARGE
      },
      wrapper: {
        display: 'flex'
      },
      input: {
        width: '100%',
        fontSize: StyleConstants.FontSizes.XLARGE,
        verticalAlign: 'middle',
        transform: 'translateZ(0)',
        overflow: 'hidden',
        transitionDuration: '0.3s',
        transitionProperty: 'transform',
        ':hover': {
          transform: 'scale(1.01)',
          fontSize: StyleConstants.FontSizes.XXLARGE
        },
        ':focus': {
          transform: 'scale(1.01)',
          fontSize: StyleConstants.FontSizes.XXLARGE
        }
      },
      prefix: {
        float: 'left'
      },
      suffix: {
        float: 'right'
      },
      addOn: {
        padding: '6px 12px',
        color: StyleConstants.Colors.WHITE,
        textAlign: 'center',
        backgroundColor: StyleConstants.Colors.PRIMARY,
        border: '1px solid #ccc',
        borderRadius: '4px'
      }
    };

    let label;

    if (this.props.label) {
      label = <label style={styles.label}>{this.props.label}</label>;
    }

    let prefix;

    if (this.props.prefix) {
      prefix = <span style={[styles.prefix, styles.addOn]}>{this.props.prefix}</span>;
    }

    let suffix;

    if (this.props.suffix) {
      suffix = <span style={[styles.suffix, styles.addOn]}>{this.props.suffix}</span>;
    }

    let icon;

    if (this.props.icon) {
      icon = <Icon style={styles.addOn} type={this.props.icon} />;
    }

    const options = {};

    function addOptions (option) {
      options[option] = option;
    }
    this.props.options.forEach(addOptions);

    let button;

    if (this.props.button === 'clear') {
      button = <Button onClick={this._handleClear}>Clear</Button>;
    } else if (this.props.button === 'submit') {
      button = <Button onClick={this._handleSubmit}>Submit</Button>;
    }

    return (
      <div className='input-component' style={styles.component}>
        {label}
        <div style={styles.wrapper}>
          {icon}
          {prefix}
          <input
            autoFocus={this.props.autofocus}
            onChange={this._handleInputChange}
            placeholder={this.props.placeholderText}
            style={styles.input}
            type={this.props.type}
            value={this.state.value}
            {...options}
          />
          {suffix}
          {button}
        </div>
      </div>
    );
  }
});

module.exports = Radium(Input);