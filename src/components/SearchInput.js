const React = require('react');
const Radium = require('radium');

const Input = require('./SimpleInput');
const Icon = require('./Icon');

const StyleConstants = require('../constants/Style');

const SearchInput = React.createClass({
  propTypes: {
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
        <div style={styles.searchBar}>
          <Icon
            size={20}
            style={styles.searchIcon}
            type={'search'}
          />
          <Input
            onBlur={this.props.onBlur}
            onChange={this.props.onChange}
            placeholder={this.props.placeholder}
            style={styles.searchInput}
            type='text'
            value={this.props.searchKeyword}
          />
        </div>
      </div>
    );
  },

  styles () {
    return {
      component: {
        display: 'inline-block',
        width: '100%'
      },
      searchBar: {
        position: 'relative',
        marginBottom: 10
      },
      searchIcon: {
        left: 10,
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
      },
      searchInput: {
        boxSizing: 'border-box',
        lineHeight: StyleConstants.FontSizes.LARGE + 'px',
        padding: '12px 10px 12px 40px',
        outline: 'none',
        boxShadow: 'none',

        ':focus': {
          backgroundColor: StyleConstants.Colors.WHITE
        }
      }
    };
  }
});

module.exports = Radium(SearchInput);