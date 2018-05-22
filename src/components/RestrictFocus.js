const React = require('react');

module.exports = class RestrictFocus extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      focusableDOMNodes: [],
      focusableWrapperNodes: []
    };
  }

  componentDidMount () {

    /**
     * 1. Query _wrapper and find focusable items
     * 2. Query DOM and find focusable items
     * 3. Filter out wrapper focusable nodes from DOM
     * nodes array
     * 4. aria hide and tab index -1 DOM nodes
     */
  }

  componentWillUnmount () {

    /**
     * Remove aria hidden attribue and set
     * tabindex to 0 on DOM nodes
     */
  }

  render () {
    return (
      <div ref={ref => this._wrapper = ref}>
        {this.props.children}
      </div>
    );
  }
};