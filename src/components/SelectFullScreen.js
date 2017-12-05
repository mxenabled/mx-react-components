const React = require("react");
const PropTypes = require("prop-types");
const Radium = require("radium");

const Icon = require("./Icon");

const { themeShape } = require("../constants/App");

const StyleUtils = require("../utils/Style");

class SelectFullScreen extends React.Component {
  static propTypes = {
    closeIcon: PropTypes.string,
    isFixed: PropTypes.bool,
    onChange: PropTypes.func,
    optionFormatter: PropTypes.func,
    options: PropTypes.array,
    optionsHeaderText: PropTypes.string,
    optionsStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    optionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    placeholderText: PropTypes.string,
    selected: PropTypes.object,
    selectedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: themeShape
  };

  static defaultProps = {
    closeIcon: "close",
    isFixed: false,
    onChange() {},
    options: [],
    optionsHeaderText: "Select An Option",
    placeholderText: "Select One",
    selected: false
  };

  state = {
    isOpen: false,
    selected: false
  };

  componentDidMount() {
    window.onkeyup = e => {
      if (e.keyCode === 27) {
        this._handleCloseClick();
      }
    };
  }

  _handleClick = () => {
    this.setState({
      isOpen: true
    });
  };

  _handleCloseClick = () => {
    this.setState({
      isOpen: false
    });
  };

  _handleOptionClick = option => {
    this.setState({
      selected: option,
      isOpen: false
    });

    this.props.onChange(option);
  };

  _handleSelectChange = e => {
    const selectedOption = this.props.options.filter(option => {
      return option.value + "" === e.target.value;
    })[0];

    this._handleOptionClick(selectedOption);
  };

  _optionFormatter = (option, styles) => {
    return (
      <div
        key={option.displayValue + option.value + "_value"}
        style={styles.option}
      >
        {option.displayValue}
      </div>
    );
  };

  _renderOptions = styles => {
    if (this.state.isOpen) {
      return (
        <div
          style={[
            styles.optionsScrim,
            this.props.isFixed && { position: "fixed" }
          ]}
        >
          <div onClick={this._handleCloseClick} style={styles.close}>
            <Icon
              size={20}
              style={styles.closeIcon}
              type={this.props.closeIcon}
            />
            <div style={styles.closeText}>ESC</div>
          </div>
          <div style={styles.content}>
            <div style={styles.optionsHeader}>
              {this.props.optionsHeaderText}
            </div>
            <div
              className="mx-select-full-screen-options"
              style={[styles.optionsWrapper, this.props.optionsStyle]}
            >
              {this.props.options.map(option => {
                return (
                  <div
                    className="mx-select-full-screen-option"
                    key={option.displayValue + option.value}
                    onClick={this._handleOptionClick.bind(null, option)}
                  >
                    {this.props.optionFormatter
                      ? this.props.optionFormatter(option)
                      : this._optionFormatter(option, styles)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);
    const selected = this.state.selected ||
      this.props.selected || {
        displayValue: this.props.placeholderText,
        value: ""
      };

    return (
      <div
        className="mx-select-full-screen"
        style={[styles.component, this.props.style]}
      >
        <div
          className="mx-select-full-screen-selected"
          key="selected"
          onClick={this._handleClick}
          style={this.props.selectedStyle}
        >
          {selected.displayValue}
        </div>
        {this._renderOptions(styles)}
      </div>
    );
  }

  styles = theme => {
    return {
      close: {
        position: "absolute",
        right: 20,
        top: 15,
        textAlign: "center",
        cursor: "pointer",
        color: theme.Colors.GRAY_500
      },
      closeIcon: {
        color: theme.Colors.GRAY_500
      },
      closeText: {
        fontSize: theme.FontSizes.TINY
      },
      component: {
        cursor: "pointer",
        fontFamily: theme.FontFamily,
        fontSize: theme.FontSizes.LARGE,
        color: theme.Colors.GRAY_700,
        boxSizing: "border-box",
        outline: "none"
      },
      content: {
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 300
      },
      optionsScrim: {
        backgroundColor: "#fff",
        bottom: 0,
        height: "100%",
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 999
      },
      optionsWrapper: {
        border: "1px solid " + theme.Colors.GRAY_300,
        height: 250,
        overflow: "auto",
        width: 300
      },
      option: {
        cursor: "pointer",
        backgroundColor: "#fff",
        padding: 10,
        whiteSpace: "nowrap",
        fontSize: theme.FontSizes.MEDIUM,

        ":hover": {
          backgroundColor: theme.Colors.PRIMARY,
          color: theme.Colors.WHITE,
          opacity: 1
        }
      },
      optionsHeader: {
        color: theme.Colors.GRAY_700,
        fontSize: theme.FontSizes.XXLARGE,
        fontWeight: "bold",
        paddingBottom: 10
      }
    };
  };
}

module.exports = Radium(SelectFullScreen);
