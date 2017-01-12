const React = require('react');

const ButtonGroup = require('./ButtonGroup');

const StyleConstants = require('../constants/Style');

const { buttonTypes } = require('../constants/App');

const PaginationButtons = React.createClass({
  propTypes: {
    currentPage: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
    pageRange: React.PropTypes.number,
    primaryColor: React.PropTypes.string,
    styles: React.PropTypes.object,
    totalPages: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(buttonTypes)
  },

  getDefaultProps () {
    return {
      currentPage: 1,
      pageRange: 5,
      primaryColor: StyleConstants.Colors.PRIMARY,
      totalPages: 1,
      type: 'primaryOutline'
    };
  },

  _handleButtonClick (goToPage) {
    const { currentPage, totalPages } = this.props;

    if (goToPage === 'prev') {
      const prevPage = currentPage > 1 ? currentPage - 1 : 1;

      this.props.onClick(prevPage, currentPage);
    } else if (goToPage === 'next') {
      const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

      this.props.onClick(nextPage, currentPage);
    }
  },

  _getPageButtons () {
    const style = this.styles();
    const { currentPage, pageRange, totalPages } = this.props;
    const totalButtons = pageRange < totalPages ? pageRange : totalPages;
    const adjuster = totalButtons % 2 === 0 ? totalButtons / 2 : (totalButtons - 1) / 2;
    const maxPage = totalButtons > totalPages ? totalButtons : totalPages;
    const minPage = (currentPage - adjuster > adjuster) && (currentPage + adjuster < maxPage) ? currentPage - adjuster : 1;
    const startingPage = (currentPage + adjuster > maxPage) && (currentPage - adjuster * 2 > minPage) ? currentPage - adjuster * 2 : minPage;
    const endingPage = (currentPage + adjuster < maxPage) && (currentPage + adjuster * 2 < maxPage) ? currentPage + adjuster : maxPage;
    let pages = [];

    console.log('maxPage', maxPage, 'minPage', minPage, 'startingPage', startingPage, 'currentPage', currentPage);

    for (let i = startingPage; i < endingPage + 1; i++) {
      const buttonStyle = i === currentPage ? Object.assign({}, style.component, { color: 'red' }) : style.component;

      pages = [...pages, {
        onClick: this._handleButtonClick.bind(null, i),
        text: i.toString(),
        style: buttonStyle
      }];
    }

    return pages;
  },

  render () {
    const style = this.styles();

    return (
      <ButtonGroup
        buttons={[
          {
            icon: 'caret-left',
            onClick: this._handleButtonClick.bind(null, 'prev'),
            style: Object.assign({}, style.component, style.arrows)
          },
          ...this._getPageButtons(),
          {
            icon: 'caret-right',
            onClick: this._handleButtonClick.bind(null, 'next'),
            style: Object.assign({}, style.component, style.arrows)
          }
        ]}
        type={this.props.type}
      />
    );
  },

  styles () {
    return {
      component: Object.assign({
        padding: '4px 8px',
        width: 35
      }, this.props.styles),
      aarows: {
        color: 'red'
      }
    };
  }
});

module.exports = PaginationButtons;
