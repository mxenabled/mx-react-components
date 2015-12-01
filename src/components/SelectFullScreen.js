const React = require('react');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent);

class SelectFullScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false,
      selected: false
    };
  }

  _handleClick () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  _handleCloseClick () {

  }

  _handleOptionClick (option) {
    this.setState({
      selected: option,
      isOpen: false
    });

    this.props.onChange(option);
  }

  _handleSelectChange (e) {
    const selectedOption = this.props.options.filter(option => {
      return option.value + '' === e.target.value;
    })[0];

    this._handleOptionClick(selectedOption);
  }

  _renderOptions () {
    if (this.state.isOpen) {
      if (this.props.children) {
        return (
          <div style={styles.optionsScrim}>
            <div style={styles.closeIcon}>
              <Icon
                onClick={this._handleCloseClick.bind(this)}
                size='28'
                type={'close'}
              />
            </div>
            <div style={styles.optionsHeader}>
              {this.props.optionsHeaderText}
            </div>
            <div className='mx-select-options' style={[styles.optionsWrapper, this.props.optionsStyle]}>
              {this.props.children}
            </div>
          </div>
        );
      } else {
        return (
          <div style={styles.optionsScrim}>
            <div style={styles.closeIcon}>
              <Icon
                onClick={this._handleCloseClick.bind(this)}
                size='28'
                type={'close'}
              />
            </div>
            <div style={styles.optionsHeader}>
              {this.props.optionsHeaderText}
            </div>
            <div className='mx-select-options' style={[styles.optionsWrapper, this.props.optionsStyle]}>
              {this.props.options.map(option => {
                return (
                  <div
                    className='mx-select-option'
                    key={option.displayValue + option.value}
                    onClick={this._handleOptionClick.bind(this, option)}
                    ref={option.displayValue + option.value}
                    style={[styles.option, this.props.optionStyle]}
                  >
                  {option.displayValue}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
    }
  }

  render () {
    const selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

    return (
      <div className='mx-select' style={this.props.style}>
        <div className='mx-select-custom'
          onClick={this._handleClick.bind(this)}
          style={[styles.component, this.props.dropdownStyle]}
          tabIndex='0'
        >
          <div className='mx-select-selected' key='selected' style={this.props.selectedStyle}>
            {selected.displayValue}
            <Icon
              size='20'
              style={styles.caret}
              type={this.state.isOpen ? 'caret-up' : 'caret-down'}
            />
          </div>
          {this._renderOptions()}
        </div>
      </div>
    );
  }
}

const styles = {
  caret: {
    color: '#CCCCCC',
    cursor: 'pointer',
    position: 'absolute',
    right: '-5px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  component: {
    backgroundColor: '#FFFFFF',
    borderRadius: '3px',
    border: '1px solid #E5E5E5',
    cursor: 'pointer',
    fontFamily: StyleConstants.FontFamily,
    fontSize: StyleConstants.FontSizes.MEDIUM,
    padding: '11px 10px 12px',
    boxSizing: 'border-box',
    outline: 'none'
  },
  invalid: {
    borderColor: StyleConstants.Colors.RED
  },
  optionsScrim: {
    backgroundColor: '#FFFFFF',
    bottom: 0,
    height: '100%',
    left: 0,
    opacity: '0.95',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999
  },
  optionsWrapper: {
    border: '1px solid ' + StyleConstants.Colors.FOG,
    left: '50%',
    height: '70%',
    overflow: 'auto',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300
  },
  option: {
    cursor: 'pointer',
    backgroundColor: '#FFFFFF',
    padding: '10px',
    whiteSpace: 'nowrap',
    opacity: 0.4,

    ':hover': {
      backgroundColor: StyleConstants.Colors.PRIMARY,
      color: StyleConstants.Colors.INVERSE_PRIMARY,
      opacity: 1
    }
  },
  optionsHeader: {
    color: StyleConstants.Colors.CHARCOL,
    fontSize: StyleConstants.FontSizes.XXLARGE,
    fontWeight: 'bold',
    left: '50%',
    position: 'absolute',
    top: 20,
    transform: 'translateX(-50%)'
  }
};

SelectFullScreen.propTypes = {
  dropdownPositionFixed: React.PropTypes.bool,
  dropdownStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  onChange: React.PropTypes.func,
  options: React.PropTypes.array,
  optionsHeaderText: React.PropTypes.string,
  optionsStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  optionStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  placeholderText: React.PropTypes.string,
  selected: React.PropTypes.object,
  selectedStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
};

SelectFullScreen.defaultProps = {
  dropdownPositionFixed: false,
  onChange () {},
  options: [],
  optionsHeaderText: 'Select An Option',
  placeholderText: 'Select One',
  selected: false
};

module.exports = Radium(SelectFullScreen);
