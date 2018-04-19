const React = require('react');
const PropTypes = require('prop-types');
const Radium = require('radium');
const keycode = require('keycode');
const _findIndex = require('lodash/findIndex');
const _startsWith = require('lodash/startsWith');

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
    useGlobalKeyHandler: PropTypes.bool
  };

  static defaultProps = {
    useGlobalKeyHandler: false
  };

  constructor (props) {
    super(props);

    this.state = {
      focusedIndex: this._getSelectedOptionIndex(),
      searchString: ''
    };
  }

  componentDidMount () {
    this._eventTarget = this.props.useGlobalKeyHandler ? window : this.component;
    this._eventTarget.addEventListener('keydown', this._handleKeyDown);
    this._focusOption();
  }

  componentWillUnmount () {
    window.clearTimeout(this.timeoutId);
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
        e.preventDefault();
        e.stopPropagation();
        e.target.click();
        break;
    }

    if (e.keyCode >= 48 && e.keyCode <= 90 || keycode(e) === 'space') {
      window.clearTimeout(this.timeoutId);
      const key = keycode(e) === 'space' ? ' ' : keycode(e);
      const searchString = this.state.searchString.concat(key.toLowerCase());

      this.setState({ searchString }, this._search(searchString));
      this.timeoutId = window.setTimeout(() => this.setState({ searchString: '' }), 1000);
    }
  };

  _search = (searchString) => {
    const children = this._getChildren();
    const focusedIndex = _findIndex(children, child => {
      return _startsWith(child.props.label.toLowerCase(), searchString);
    });

    this.setState({ focusedIndex }, this._focusOption(focusedIndex));
  }

  _focusOption = (focusedIndex = this.state.focusedIndex) => {
    const option = this.component.children[focusedIndex];

    if (option) setTimeout(() => option.focus());
  };

  _focusPrevious = () => {
    // go to the end if at the beginning
    const focusedIndex = this.state.focusedIndex === 0 ? this._getChildren().length - 1 : this.state.focusedIndex - 1;

    // focus previous
    this.setState({ focusedIndex }, this._focusOption(focusedIndex));
  };

  _focusNext = () => {
    // go to the beginning if at the end
    const focusedIndex = this.state.focusedIndex === this._getChildren().length - 1 ? 0 : this.state.focusedIndex + 1;

    // focus next
    this.setState({ focusedIndex }, this._focusOption(focusedIndex));
  };

  render () {
    return (
      <div
        aria-label={this.props['aria-label']}
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
const Option = ({ children, isSelected, label, ...props }) => (
  <a
    aria-label={isSelected && label ? `${label}, Current selection` : label}
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
