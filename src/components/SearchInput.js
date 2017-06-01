const PropTypes = require('prop-types');
const React = require('react');

const Input = require('./SimpleInput');

class SearchInput extends React.Component {
  static propTypes = {
    baseColor: PropTypes.string,
    focusOnLoad: PropTypes.bool,
    handleResetClick: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    searchKeyword: PropTypes.string,
    style: PropTypes.object,
    styles: PropTypes.object
  };

  static defaultProps = {
    onBlur: () => {},
    onChange: () => {},
    placeholder: 'Search'
  };

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
  }

  styles = () => {
    return Object.assign({}, {
      component: {
        display: 'inline-block',
        width: '100%'
      }
    }, this.props.styles);
  };
}

module.exports = SearchInput;
