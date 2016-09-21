const React = require('react');

const Input = require('./SimpleInput');

const SearchInput = React.createClass({
  propTypes: {
    baseColor: React.PropTypes.string,
    focusOnLoad: React.PropTypes.bool,
    handleResetClick: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    searchKeyword: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps () {
    return {
      onBlur: () => {},
      onChange: () => {},
      placeholder: 'Search'
    };
  },

  render () {
    const styles = this.styles();

    return (
      <div style={Object.assign({}, styles.component, this.props.style)}>
        <Input
          baseColor={this.props.baseColor}
          elementProps={{
            onBlur: this.props.onBlur,
            onChange: this.props.onChange,
            placeholder: this.props.placeholder,
            type: 'text',
            value: this.props.searchKeyword
          }}
          focusOnLoad={this.props.focusOnLoad}
          handleResetClick={this.props.handleResetClick}
          icon='search'
          resetClick={this.props.handleResetClick}
          rightIcon='close-solid'
        />
      </div>
    );
  },

  styles () {
    return {
      component: {
        display: 'inline-block',
        width: '100%'
      }
    };
  }
});

module.exports = SearchInput;
