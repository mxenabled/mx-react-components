const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const keycode = require('keycode');
const _findIndex = require('lodash/findIndex');

/**
 * Listbox
 *
 * Handles accessibility and traversal of a list of options.
 * Traverse the list with the `up`/`down` arrow keys and `tab`/`shift+tab`.
 * Selecting an option is handled with `space`/`enter`.
 * Focus is also managed.
 *
 * When `useGlobalKeyHandler` is `true` the event listener will bind to window.
 *
 * Example:
 *   <Listbox aria-label='select things'>
 *     <Option ...>Foo</Option>
 *     <Option ...>Bar</Option>
 *   </Listbox>
 */
class Listbox extends React.Component {
  static propTypes = {
    'aria-label': PropTypes.string.isRequired,
    useGlobalKeyHandler: PropTypes.bool,
    withSearch: PropTypes.bool
  };

  static defaultProps = {
    useGlobalKeyHandler: false,
    withSearch: false
  };

  constructor (props) {
    super(props);

    this.state = {
      focusedIndex: this._getSelectedOptionIndex()
    };
  }

  componentDidMount () {
    this._eventTarget = this.props.useGlobalKeyHandler ? window : this.component;
    this._eventTarget.addEventListener('keydown', this._handleKeyDown);
    this._focusOption();
  }

  componentWillUnmount () {
    this._eventTarget.removeEventListener('keydown', this._handleKeyDown);
  }

  _getChildren = () => {
    return React.Children.toArray(this.props.children);
  };

  _getSelectedOptionIndex = () => {
    const children = this._getChildren();
    const focusedIndex = _findIndex(children, child => child.props.isSelected);

    // default to first
    return focusedIndex === -1 ? 0 : focusedIndex;
  };

  _handleKeyDown = (e) => {
    switch (keycode(e)) {
      case 'up':
        e.preventDefault();
        e.stopPropagation();
        this._focusPrevious();
        break;
      case 'down':
        e.preventDefault();
        e.stopPropagation();
        this._focusNext();
        break;
      case 'enter':
      case 'space':
        // Allow space for text input when options are not in focus, otherwise space acts as a selection
        if (this.props.withSearch && this.state.focusedIndex <= 0) return
        e.preventDefault();
        e.stopPropagation();
        e.target.click();
        break;
    }
  };

  _focusOption = () => {
    const option = this.component.children[this.state.focusedIndex];

    if (option) setTimeout(() => option.focus());
  };

  _focusPrevious = () => {
    // go to the end if at the beginning
    const focusedIndex = this.state.focusedIndex === 0 ? this._getChildren().length : this.state.focusedIndex;

    this.setState({ focusedIndex: focusedIndex - 1 }, this._focusOption);
  };

  _focusNext = () => {
    // go to the beginning if at the end
    const focusedIndex = this.state.focusedIndex === this._getChildren().length - 1 ? -1 : this.state.focusedIndex;

    // focus next
    this.setState({ focusedIndex: focusedIndex + 1 }, this._focusOption);
  };

  render () {
    return (
      <div
        aria-label={this.props['aria-label']}
        className='mx-listbox'
        ref={ref => this.component = ref}
        role='listbox'
        style={this.props.style}
      >
        {React.Children.map(this.props.children, (child, index) =>
          React.cloneElement(child, {
            onBlur: () => this.setState({ focusedIndex: -1 }),
            onFocus: () => this.setState({ focusedIndex: index })
          })
        )}
      </div>
    );
  }
}

/**
 * Option
 *
 * Handles accessibility for options in a Listbox.
 */
const Option = ({ children, isSelected, ...props }) => (
  <a
    aria-selected={isSelected}
    role='option'
    tabIndex={0}
    {...props}
  >
    {children}
  </a>
);

Option.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string.isRequired
};

module.exports = { Listbox, Option: Radium(Option) };
