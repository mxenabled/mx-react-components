const React = require('react');
const Radium = require('radium');
const StyleConstants = require('../constants/Style');
const Icon = require('./Icon');
const Button = require('./Button');

const Input = React.createClass({
  propTypes: {
    placeholderText: React.PropTypes.string,
    label: React.PropTypes.string,
    onTextChange: React.PropTypes.func,
    type: React.PropTypes.oneOf([
      'number',
      'password',
      'text',
      'email'
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
    options: React.PropTypes.array,
    autofocus: React.PropTypes.bool,
    button: React.PropTypes.oneOf([
      'clear',
      'submit'
    ]),
    onSubmit: React.PropTypes.func
  },

  getInitialState () {
    return {
      value: this.props.value
    };
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

  _handleInputChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.onTextChange(e.target.value);
  },

  _handleClear(e) {
    this.setState({
      value: ''
    });
    this.props.onTextChange(e.target.value);
  },

  _handleSubmit(e) {
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
        float: 'left',
      },
      suffix: {
        float: 'right',
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

    var label;
    if (this.props.label) {
      label = <label style={styles.label}>{this.props.label}</label>;
    }

    var prefix;
    if (this.props.prefix) {
      prefix = <span style={[styles.prefix, styles.addOn]}>{this.props.prefix}</span>;
    }

    var suffix;
    if (this.props.suffix) {
      suffix = <span style={[styles.suffix, styles.addOn]}>{this.props.suffix}</span>;
    }

    var icon;
    if (this.props.icon) {
      icon = <Icon type={this.props.icon} style={styles.addOn}/>;
    }

    var options = {};
    function addOptions(option) {
      return options[option] = option;
    };
    this.props.options.forEach(addOptions);

    var button;
    if (this.props.button == 'clear') {
      button = <Button onClick={this._handleClear}>Clear</Button>;
    } else if (this.props.button == 'submit') {
      button = <Button onClick={this._handleSubmit}>Submit</Button>;
    }

    return (
      <div className='input-component' style={styles.component}>
        {label}
        <div style={styles.wrapper}>
          {icon}
          {prefix}
          <input 
            style={styles.input}
            type={this.props.type}
            placeholder={this.props.placeholderText}
            onChange={this._handleInputChange}
            value={this.state.value}
            {...options}
            autoFocus={this.props.autofocus}
          />
          {suffix}
          {button}
        </div>
      </div>
    );
  }
});

module.exports = Radium(Input);