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

  _handleButtonClick (buttonClicked) {
    const { currentPage, totalPages } = this.props;
    let goToPage = buttonClicked;

    if (buttonClicked === 'prev') {
      goToPage = currentPage > 1 ? currentPage - 1 : 1;
    } else if (buttonClicked === 'next') {
      goToPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    }

    this.props.onClick(goToPage);
  },

  _getPageButtons () {
    const style = this.styles();
    const { currentPage, pageRange, totalPages } = this.props;
    const totalButtons = pageRange < totalPages ? pageRange : totalPages;
    const pages = [];
    const maxStartingPage = totalPages - pageRange + 1;
    let startingPage = 1;
    let maxEndingPage = maxStartingPage + pageRange - 1;
    let endingPage = totalButtons;

    if (currentPage > pageRange) {
      startingPage = maxStartingPage >= currentPage ? currentPage : maxStartingPage;
      maxEndingPage = startingPage + pageRange - 1;
      endingPage = maxEndingPage <= currentPage ? currentPage : maxEndingPage;
    }

    for (let i = startingPage; i <= endingPage; i++) {
      const buttonStyle = i === currentPage ? Object.assign({}, style.component, style.active) : style.component;

      pages.push({
        onClick: this._handleButtonClick.bind(null, i),
        text: i.toString(),
        style: buttonStyle
      });
    }

    return pages;
  },

  render () {
    const style = this.styles().component;

    return (
      <ButtonGroup
        buttons={[
          {
            icon: 'caret-left',
            onClick: this._handleButtonClick.bind(null, 'prev'),
            style
          },
          ...this._getPageButtons(),
          {
            icon: 'caret-right',
            onClick: this._handleButtonClick.bind(null, 'next'),
            style
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
      active: {
        backgroundColor: StyleConstants.adjustHexOpacity(this.props.primaryColor, 0.15)
      }
    };
  }
});

module.exports = PaginationButtons;
