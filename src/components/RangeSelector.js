const React = require('react');
const ReactDOM = require('react-dom');
const Radium = require('radium');
const _throttle = require('lodash/function/throttle');
const _uniqueId = require('lodash').uniqueId;

const StyleConstants = require('../constants/Style');
const KeyCodeConstants = require('../constants/KeyCodes');


class RangeSelector extends React.Component {
  constructor (props) {
    super(props);

    const lowerValue = this.props.defaultLowerValue;
    const upperValue = this.props.defaultUpperValue;

    this.state = {
      dragging: null,
      lowerPixels: 0,
      lowerValue,
      presetMenuHasFocus: false,
      presetMenuIndex: 0,
      selectedLabel: this._getSelectedLabel(lowerValue, upperValue),
      showPresets: !!this.props.presets.length && !lowerValue && !upperValue,
      upperPixels: 1,
      upperValue
    };

    this._id = this.props.id || _uniqueId('range-selector-');
    this._showPresetsButton = null;
    this._presetLabelRefs = {};
  }

  componentDidMount () {
    this._setDefaultRangeValues();

    window.addEventListener('resize', _throttle(this._setDefaultRangeValues.bind(this), 300));
    window.addEventListener('keydown', this._handleKeyPress.bind(this));
  }

  componentWillUnmount () {
    window.removeEventListener('resize', _throttle(this._setDefaultRangeValues.bind(this), 300));
    window.removeEventListener('keydown', this._handleKeyPress.bind(this));
  }

  _getSelectedLabel (lowerValue, upperValue) {
    if (this.props.presets) {
      const preset = this.props.presets.filter(preset => {
        return preset.lowerValue === lowerValue && preset.upperValue === upperValue;
      })[0];

      return preset ? preset.label : null;
    }
  }

  _setDefaultRangeValues () {
    const component = ReactDOM.findDOMNode(this.refs.rangeSelector);
    const componentStyles = window.getComputedStyle(component);
    const width = parseInt(componentStyles.width, 0);

    const lowerPixels = Math.round((this.state.lowerValue * width / this.props.range) / this.props.interval * this.props.interval);
    const upperPixels = Math.round((this.state.upperValue * width / this.props.range) / this.props.interval * this.props.interval);

    this.setState({
      lowerPixels,
      upperPixels,
      width
    });
  }

  _moveLowerToggle (multiplier) {
    const pixelInterval = this.props.interval * this.state.width / this.props.range;
    let newValue = this.state.lowerValue + (multiplier * this.props.interval);
    let newPosition = this.state.lowerPixels + (multiplier * pixelInterval);

    newValue = Math.min(newValue, this.props.range);
    newValue = Math.max(newValue, 0);
    newPosition = Math.min(newPosition, this.state.width);
    newPosition = Math.max(newPosition, 0);

    if (multiplier > 0) {
      newValue = Math.min(newValue, this.state.upperValue);
      newPosition = Math.min(newPosition, this.state.upperPixels);
    }

    this.setState({
      selectedLabel: null,
      lowerValue: newValue,
      lowerPixels: newPosition
    });
  }

  _moveUpperToggle (multiplier) {
    const pixelInterval = this.props.interval * this.state.width / this.props.range;
    let newValue = this.state.upperValue + (multiplier * this.props.interval);
    let newPosition = this.state.upperPixels + (multiplier * pixelInterval);

    newValue = Math.min(newValue, this.props.range);
    newValue = Math.max(newValue, 0);
    newPosition = Math.min(newPosition, this.state.width);
    newPosition = Math.max(newPosition, 0);
    if (multiplier < 0) {
      newValue = Math.max(newValue, this.state.lowerValue);
      newPosition = Math.max(newPosition, this.state.lowerPixels);
    }

    this.setState({
      selectedLabel: null,
      upperValue: newValue,
      upperPixels: newPosition
    });
  }

  _menuNavigatePrevious () {
    let nextIndex = this.state.presetMenuIndex - 1;

    if (nextIndex < 0) {
      nextIndex = this.props.presets.length; // because of extra custom option
      this._presetLabelRefs['Custom'].focus();
    } else {
      this._presetLabelRefs[this.props.presets[nextIndex].label].focus();
    }
    this.setState({ presetMenuIndex: nextIndex });
  }

  _menuNavigateNext () {
    let nextIndex = this.state.presetMenuIndex + 1;

    if (nextIndex > this.props.presets.length) {
      nextIndex = 0;
    }
    this.setState({ presetMenuIndex: nextIndex });
    this._focusToMenuItem();
  }

  _focusToMenuItem () {
    if (this.state.presetMenuIndex === this.props.presets.length) {
      this._presetLabelRefs['Custom'].focus();
    } else {
      this._presetLabelRefs[this.props.presets[this.state.presetMenuIndex].label].focus();
    }
    this.setState({ presetMenuHasFocus: true });
  }

  _handleKeyPress (evt) {
    const key = evt.keyCode || evt.which;
    const activeElement = document.activeElement;

    /**
     * Keyboard behavior for preset menu and slider outlined by the following docs.
     * http://www.w3.org/TR/wai-aria-practices/#menubutton
     * http://www.w3.org/TR/wai-aria-practices/#menu
     * http://www.w3.org/TR/wai-aria-practices/#slider
     */
    // if presets menu is displayed and a menu item has focus
    if (this.state.presetMenuHasFocus) {
      switch (key) {
        // escape closes menu and returns focus to menu button
        case KeyCodeConstants.esc:
          this._handleToggleViews();
          this._showPresetsButton.focus();
          this.setState({ presetMenuHasFocus: false });
          evt.preventDefault();
          break;
        case KeyCodeConstants.tab:
          this.setState({ presetMenuHasFocus: false });
          this._handleToggleViews();
          this._lowerToggle.focus();
          evt.preventDefault();
          break;
        // up and down toggle between menu items
        case KeyCodeConstants.upArrow:
          this._menuNavigateNext();
          evt.preventDefault();
          break;
        case KeyCodeConstants.downArrow:
          this._menuNavigatePrevious();
          evt.preventDefault();
          break;
        // left switches focus back to menu button
        case KeyCodeConstants.leftArrow:
          this.setState({ presetMenuHasFocus: false });
          this._showPresetsButton.focus();
          evt.preventDefault();
          break;
        case KeyCodeConstants.enter:
          if (this.state.presetMenuIndex === this.props.presets.length) {
            this.setState({ presetMenuHasFocus: false });
            this._handleToggleViews();
            this._showPresetsButton.focus();
          } else {
            this.setState({ presetMenuHasFocus: false });
            this._handlePresetClick(this.props.presets[this.state.presetMenuIndex]);
            this._showPresetsButton.focus();
          }
          evt.preventDefault();
          break;
        case KeyCodeConstants.space:
          if (this.state.presetMenuIndex === this.props.presets.length) {
            this.setState({ presetMenuHasFocus: false });
            this._handleToggleViews();
            this._showPresetsButton.focus();
          } else {
            this.setState({ presetMenuHasFocus: false });
            this._handlePresetClick(this.props.presets[this.state.presetMenuIndex]);
            this._showPresetsButton.focus();
          }
          evt.preventDefault();
          break;
        default:
          break;
      }
    } else {
      // menu button has focus, and menu is open
      if (this.state.showPresets && activeElement === this._showPresetsButton) {
        switch (key) {
          case KeyCodeConstants.tab:
            this._handleToggleViews();
            this._lowerToggle.focus();
            evt.preventDefault();
            break;
          case KeyCodeConstants.rightArrow:
            this._focusToMenuItem();
            this.setState({ presetMenuHasFocus: true });
            evt.preventDefault();
            break;
          case KeyCodeConstants.enter:
            this._handleToggleViews();
            evt.preventDefault();
            break;
          case KeyCodeConstants.space:
            this._handleToggleViews();
            evt.preventDefault();
            break;
          case KeyCodeConstants.downArrow:
            evt.preventDefault();
            this.setState({ presetMenuIndex: 0 });
            this._focusToMenuItem();
            break;
          default:
            break;
        }
      } else if (activeElement === this._showPresetsButton) { // menu button has focus, and menu is closed
        switch (key) {
          case KeyCodeConstants.enter:
            this._handleToggleViews();
            evt.preventDefault();
            break;
          case KeyCodeConstants.space:
            this._handleToggleViews();
            evt.preventDefault();
            break;
          case KeyCodeConstants.downArrow:
            this._handleToggleViews();
            this.setState({
              presetMenuHasFocus: true,
              presetMenuIndex: 0
            });
            this._focusToMenuItem();
            evt.preventDefault();
            break;
          default:
            break;
        }
      }

      if (activeElement === this._lowerToggle) {
        switch (key) {
          case KeyCodeConstants.leftArrow:
            evt.preventDefault();
            this._moveLowerToggle(-1);
            break;
          case KeyCodeConstants.downArrow:
            evt.preventDefault();
            this._moveLowerToggle(-1);
            break;
          case KeyCodeConstants.pageDown:
            evt.preventDefault();
            this._moveLowerToggle(-1 * this.props.pageUpDownInterval);
            break;
          case KeyCodeConstants.rightArrow:
            evt.preventDefault();
            this._moveLowerToggle(1);
            break;
          case KeyCodeConstants.upArrow:
            evt.preventDefault();
            this._moveLowerToggle(1);
            break;
          case KeyCodeConstants.pageUp:
            evt.preventDefault();
            this._moveLowerToggle(this.props.pageUpDownInterval);
            break;
          default:
            return null;
        }
      } else if (activeElement === this._upperToggle) {
        switch (key) {
          case KeyCodeConstants.leftArrow:
            evt.preventDefault();
            this._moveUpperToggle(-1);
            break;
          case KeyCodeConstants.downArrow:
            evt.preventDefault();
            this._moveUpperToggle(-1);
            break;
          case KeyCodeConstants.pageDown:
            evt.preventDefault();
            this._moveUpperToggle(-1 * this.props.pageUpDownInterval);
            break;
          case KeyCodeConstants.rightArrow:
            evt.preventDefault();
            this._moveUpperToggle(1);
            break;
          case KeyCodeConstants.upArrow:
            evt.preventDefault();
            this._moveUpperToggle(1);
            break;
          case KeyCodeConstants.pageUp:
            evt.preventDefault();
            this._moveUpperToggle(this.props.pageUpDownInterval);
            break;
          default:
            return null;
        }
      }
    }
  }

  _handlePresetClick (preset) {
    const lowerPixels = Math.round((preset.lowerValue * this.state.width / this.props.range) / this.props.interval * this.props.interval);
    const upperPixels = Math.round((preset.upperValue * this.state.width / this.props.range) / this.props.interval * this.props.interval);

    this.setState({
      lowerPixels,
      lowerValue: preset.lowerValue,
      upperPixels,
      upperValue: preset.upperValue,
      showPresets: false,
      selectedLabel: this._getSelectedLabel(preset.lowerValue, preset.upperValue)
    });

    this.props.onLowerDragStop(preset.lowerValue);
    this.props.onUpperDragStop(preset.upperValue);
  }

  _handleDragStart (type) {
    this.setState({
      dragging: type
    });
  }

  _handleDragging (e) {
    if (this.state.dragging) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const pixelInterval = this.props.interval * this.state.width / this.props.range;
      const newState = {
        selectedLabel: null
      };

      let newPosition = clientX - ReactDOM.findDOMNode(this.refs.rangeSelector).getBoundingClientRect().left;

      newPosition = Math.min(newPosition, this.state.width);
      newPosition = Math.max(newPosition, 0);

      if (this.state.dragging === 'Lower') {
        newPosition = Math.min(newPosition, this.state.upperPixels);
      }

      if (this.state.dragging === 'Upper') {
        newPosition = Math.max(newPosition, this.state.lowerPixels);
      }

      newPosition = Math.round(newPosition / pixelInterval) * pixelInterval;

      newState[this.state.dragging.toLowerCase() + 'Pixels'] = newPosition;
      newState[this.state.dragging.toLowerCase() + 'Value'] = Math.round((newPosition * this.props.range / this.state.width) / this.props.interval) * this.props.interval;

      this.setState(newState);

      e.preventDefault();
    }
  }

  _handleDragEnd () {
    if (this.state.dragging) {
      this.props['on' + this.state.dragging + 'DragStop'](this.state[this.state.dragging.toLowerCase() + 'Value']);
    }

    this.setState({
      dragging: false
    });
  }

  _handleToggleViews () {
    this.setState({
      selectedLabel: null,
      showPresets: !this.state.showPresets
    });
  }

  render () {
    const styles = {
      component: {
        position: 'relative',
        fontSize: '11px',
        fontFamily: StyleConstants.FontFamily
      },
      presets: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: '20px 0',
        zIndex: 1,
        display: this.state.showPresets ? 'block' : 'none'
      },
      range: {
        padding: '44px 0 30px',
        margin: '0 10px',
        visibility: this.state.showPresets ? 'hidden' : 'visible'
      },
      track: {
        height: '1px',
        background: '#ccc'
      },
      lowerToggle: {
        width: '20px',
        height: '20px',
        borderRadius: '100%',
        background: '#fff',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.3)',
        position: 'absolute',
        top: '50%',
        left: this.state.lowerPixels,
        margin: '6px 0 0 10px',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        cursor: 'pointer'
      },
      upperToggle: {
        width: '20px',
        height: '20px',
        borderRadius: '100%',
        background: '#fff',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.3)',
        position: 'absolute',
        top: '50%',
        left: this.state.upperPixels,
        margin: '6px 0 0 10px',
        transform: 'translate(-50%, -50%)',
        WebkitTransform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 1
      },
      selected: {
        position: 'absolute',
        left: this.state.lowerPixels,
        width: this.state.upperPixels - this.state.lowerPixels,
        background: this.props.selectedColor,
        height: '3px',
        top: '50%',
        marginTop: '6px',
        transform: 'translateY(-50%)',
        WebkitTransform: 'translateY(-50%)'
      },
      lowerToggleLabel: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        textAlign: 'center',
        marginTop: '2px',
        display: 'block',
        cursor: 'pointer',
        minWidth: '20px'
      },
      upperToggleLabel: {
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
        textAlign: 'center',
        marginBottom: '2px',
        display: 'block',
        cursor: 'pointer',
        minWidth: '20px'
      },
      preset: {
        display: 'inline-block',
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: '2px',
        padding: '4px 10px 5px',
        margin: '0 5px 5px 0',
        cursor: 'pointer'
      },
      showPresets: {
        position: 'absolute',
        top: 0,
        right: 0,
        cursor: 'pointer',
        color: this.props.selectedColor
      },
      selectedLabel: {
        textAlign: 'center',
        marginTop: '17px',
        fontStyle: 'italic',
        opacity: 0.5
      },
      screenReaderLabel: {
        position: 'absolute',
        top: '-9999px',
        left: '-9999px'
      }
    };

    return (
      <div className='mx-rangeselector' style={[styles.component, this.props.style]}>
          {this.props.presets.length ? <div
            aria-haspopup='true'
            aria-owns={`${this._id}-presets-menu`}
            className='mx-rangeselector-toggle'
            onClick={this._handleToggleViews.bind(this)}
            ref={(c) => this._showPresetsButton = c}
            role='button'
            style={styles.showPresets}
            tabIndex='0'>
            Groups
          </div> : null}
        <div
          className='mx-rangeselector-presets'
          id={`${this._id}-presets-menu`}
          role='menu'
          style={styles.presets}>
          {this.props.presets.map((preset, i) => {
            return (
              <div
                className='mx-rangeselector-preset'
                key={preset.label + i}
                onClick={this._handlePresetClick.bind(this, preset)}
                ref={(c) => this._presetLabelRefs[preset.label] = c}
                role='menuitem'
                style={styles.preset}
                tabIndex='-1'>
                {preset.label}
              </div>
            );
          })}
          <div
            className='mx-rangeselector-preset'
            onClick={this._handleToggleViews.bind(this)}
            ref={(c) => this._presetLabelRefs['Custom'] = c}
            style={styles.preset}
            tabIndex='-1'>
            Custom
          </div>
        </div>
        <div
          className='mx-rangeselector-range'
          onMouseLeave={this._handleDragEnd.bind(this)}
          onMouseMove={this._handleDragging.bind(this)}
          onMouseUp={this._handleDragEnd.bind(this)}
          onTouchMove={this._handleDragging.bind(this)}
          ref='rangeSelector'
          style={styles.range}
        >
          <div className='mx-rangeselector-track' style={styles.track}></div>
          <div className='mx-rangeselector-selected' style={styles.selected}>
            <div className='mx-rangeselector-selected-label' style={styles.selectedLabel}>
              {this.state.selectedLabel}
            </div>
          </div>
          <label htmlFor={`${this._id}-lower-toggle`} style={styles.screenReaderLabel}>
            Lower Range Value
          </label>
          <div
            aria-controls={`${this._id}-lower-toggle-value`}
            aria-describedby={this.props.descriptionElementId}
            aria-valuemax={this.props.formatter(this.props.range)}
            aria-valuemin={this.props.formatter(0)}
            aria-valuenow={this.props.formatter(this.state.lowerValue)}
            className='mx-rangeselector-lower-toggle'
            id={`${this._id}-lower-toggle`}
            onMouseDown={this._handleDragStart.bind(this, 'Lower')}
            onMouseUp={this._handleDragEnd.bind(this)}
            onTouchEnd={this._handleDragEnd.bind(this)}
            onTouchStart={this._handleDragStart.bind(this, 'Lower')}
            ref={(c) => this._lowerToggle = c}
            style={styles.lowerToggle}
            tabIndex='0'
          >
            <div
              className='mx-rangeselector-lower-toggle-label'
              id={`${this._id}-lower-toggle-value`}
              style={styles.lowerToggleLabel}>
              {this.props.formatter(this.state.lowerValue)}
            </div>
          </div>
          <label htmlFor={`${this._id}-upper-toggle`} style={styles.screenReaderLabel}>
            Upper Range Value
          </label>
          <div
            aria-controls={`${this._id}-upper-toggle-value`}
            aria-describedby={this.props.descriptionElementId}
            aria-valuemax={this.props.formatter(this.props.range)}
            aria-valuemin={this.props.formatter(0)}
            aria-valuenow={this.props.formatter(this.state.upperValue)}
            className='mx-rangeselector-upper-toggle'
            id={`${this._id}-upper-toggle`}
            onMouseDown={this._handleDragStart.bind(this, 'Upper')}
            onMouseUp={this._handleDragEnd.bind(this)}
            onTouchEnd={this._handleDragEnd.bind(this)}
            onTouchStart={this._handleDragStart.bind(this, 'Upper')}
            ref={(c) => this._upperToggle = c}
            style={styles.upperToggle}
            tabIndex='0'
          >
            <div
              className='mx-rangeselector-upper-toggle-label'
              id={`${this._id}-lower-upper-value`}
              style={styles.upperToggleLabel}>
              {this.props.formatter(this.state.upperValue)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RangeSelector.propTypes = {
  defaultLowerValue: React.PropTypes.number,
  defaultUpperValue: React.PropTypes.number,
  descriptionElementId: React.PropTypes.string,
  formatter: React.PropTypes.func,
  id: React.PropTypes.string,
  interval: React.PropTypes.number,
  onLowerDragStop: React.PropTypes.func,
  onUpperDragStop: React.PropTypes.func,
  pageUpDownInterval: React.PropTypes.number,
  presets: React.PropTypes.array,
  range: React.PropTypes.number,
  selectedColor: React.PropTypes.string
};

RangeSelector.defaultProps = {
  defaultLowerValue: 0,
  defaultUpperValue: 1,
  descriptionElementId: null,
  id: null,
  interval: 1,
  formatter (value) {
    return value;
  },
  onLowerDragStop () {},
  onUpperDragStop () {},
  pageUpDownInterval: 10,
  presets: [],
  range: 100,
  selectedColor: StyleConstants.Colors.PRIMARY
};

module.exports = Radium(RangeSelector);
