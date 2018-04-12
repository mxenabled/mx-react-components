const PropTypes = require('prop-types');
const React = require('react');

import { withTheme } from './Theme';
const Input = require('./SimpleInput');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

class SearchInput extends React.Component {
  static propTypes = {
    baseColor: PropTypes.string,
    elementRef: PropTypes.func,
    focusOnLoad: PropTypes.bool,
    handleResetClick: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    searchKeyword: PropTypes.string,
    style: PropTypes.object,
    styles: PropTypes.object,
    theme: themeShape
  };

  static defaultProps = {
    onBlur: () => {},
    onChange: () => {},
    placeholder: 'Search'
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles();

    return (
      <div style={Object.assign({}, styles.component, this.props.style)}>
        <Input
          elementProps={{
            onBlur: this.props.onBlur,
            onChange: this.props.onChange,
            placeholder: this.props.placeholder,
            type: 'text',
            value: this.props.searchKeyword
          }}
          elementRef={this.props.elementRef}
          focusOnLoad={this.props.focusOnLoad}
          handleResetClick={this.props.handleResetClick}
          icon='search'
          resetClick={this.props.handleResetClick}
          rightIcon='close-solid'
          theme={theme}
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

module.exports = withTheme(SearchInput);
