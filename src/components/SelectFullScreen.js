const React = require('react');
const Radium = require('radium');

const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

class SelectFullScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      selected: false
    };
  }

  componentDidMount () {
    window.onkeyup = e => {
      if (e.keyCode === 27) {
        this._handleCloseClick();
      }
    };
  }

  _handleClick () {
    this.setState({
      isOpen: true
    });
  }

  _handleCloseClick () {
    this.setState({
      isOpen: false
    });
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
      return (
        <div style={[styles.optionsScrim, this.props.isFixed && { position: 'fixed' }]}>
          <div style={styles.close}>
            <Icon
              onClick={this._handleCloseClick.bind(this)}
              size='32px'
              style={styles.closeIcon}
              type={this.props.closeIcon}
            />
            <div style={styles.closeText}>ESC</div>
          </div>
          <div style={styles.content}>
            <div style={styles.optionsHeader}>
              {this.props.optionsHeaderText}
            </div>
            {this.props.children ? (
              <div className='mx-select-full-screen-options' style={[styles.optionsWrapper, this.props.optionsStyle]}>
                {this.props.children}
              </div>
            ) : (
              <div className='mx-select-full-screen-options' style={[styles.optionsWrapper, this.props.optionsStyle]}>
                {this.props.options.map(option => {
                  return (
                    <div
                      className='mx-select-full-screen-option'
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
            )}
          </div>
        </div>
      );
    }
  }

  render () {
    const selected = this.state.selected || this.props.selected || { displayValue: this.props.placeholderText, value: '' };

    return (
      <div className='mx-select-full-screen' style={[styles.component, this.props.style]}>
        <div
          className='mx-select-full-screen-selected'
          key='selected'
          onClick={this._handleClick.bind(this)}
          style={this.props.selectedStyle}
        >
          {selected.displayValue}
        </div>
        {this._renderOptions()}
      </div>
    );
  }
}

SelectFullScreen.propTypes = {
  closeIcon: React.PropTypes.string,
  isFixed: React.PropTypes.bool,
  isOpen: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  options: React.PropTypes.array,
  optionsHeaderText: React.PropTypes.string,
  optionsStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  optionStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]),
  placeholderText: React.PropTypes.string,
  selected: React.PropTypes.object,
  selectedStyle: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array])
};

SelectFullScreen.defaultProps = {
  closeIcon: 'close',
  isFixed: false,
  isOpen: false,
  onChange () {},
  options: [],
  optionsHeaderText: 'Select An Option',
  placeholderText: 'Select One',
  selected: false
};

const styles = {
  close: {
    position: 'absolute',
    right: 20,
    top: 15,
    textAlign: 'center',
    cursor: 'pointer',
    color: StyleConstants.Colors.ASH
  },
  closeIcon: {
    color: StyleConstants.Colors.ASH
  },
  closeText: {
    fontSize: StyleConstants.FontSizes.TINY
  },
  component: {
    cursor: 'pointer',
    fontFamily: StyleConstants.FontFamily,
    fontSize: StyleConstants.FontSizes.LARGE,
    color: StyleConstants.Colors.CHARCOAL,
    boxSizing: 'border-box',
    outline: 'none'
  },
  content: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300
  },
  optionsScrim: {
    backgroundColor: '#fff',
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999
  },
  optionsWrapper: {
    border: '1px solid ' + StyleConstants.Colors.FOG,
    height: 250,
    overflow: 'auto',
    width: 300
  },
  option: {
    cursor: 'pointer',
    backgroundColor: '#fff',
    padding: 10,
    whiteSpace: 'nowrap',
    fontSize: StyleConstants.FontSizes.MEDIUM,

    ':hover': {
      backgroundColor: StyleConstants.Colors.PRIMARY,
      color: StyleConstants.Colors.INVERSE_PRIMARY,
      opacity: 1
    }
  },
  optionsHeader: {
    color: StyleConstants.Colors.CHARCOAL,
    fontSize: StyleConstants.FontSizes.XXLARGE,
    fontWeight: 'bold',
    paddingBottom: 10
  }
};

module.exports = Radium(SelectFullScreen);
