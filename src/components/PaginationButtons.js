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
    style: React.PropTypes.object,
    totalPages: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(buttonTypes)
  },

  getDefaultProps () {
    return {
      currentPage: 1,
      pageRange: 9,
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

  _getPrevButton () {
    const type = this.props.currentPage <= 1 ? 'disabled' : null;
    const style = this.styles().component;

    return {
      icon: 'caret-left',
      onClick: this._handleButtonClick.bind(null, 'prev'),
      style,
      type
    };
  },

  _getNextButton () {
    const type = this.props.currentPage >= this.props.totalPages ? 'disabled' : null;
    const style = this.styles().component;

    return {
      icon: 'caret-right',
      onClick: this._handleButtonClick.bind(null, 'next'),
      style,
      type
    };
  },

  _getStartingPage (currentPage, maxStartingPage, staticSet, startingSet, middleSet) {
    let startingPage = 1;

    if (!staticSet && !startingSet) {
      if (middleSet) {
        startingPage = currentPage;
      } else {
        startingPage = maxStartingPage;
      }
    }

    return startingPage;
  },

  _getEndingPage (totalPages, pageRange, startingSet, staticSet, middleSet, startingPage) {
    let endingPage = totalPages;

    if (!staticSet) {
      if (startingSet) {
        endingPage = pageRange - 2;
      } else if (middleSet) {
        endingPage = startingPage + pageRange - 5;
      }
    }

    return endingPage;
  },

  _addFirstPageButtons () {
    const style = this.styles().component;

    return [{
      onClick: this._handleButtonClick.bind(null, 1),
      style,
      text: '1'
    }, {
      icon: 'kabob_horizontal',
      style,
      type: 'disabled'
    }];
  },

  _addLastPageButtons (totalPages) {
    const style = this.styles().component;

    return [{
      icon: 'kabob_horizontal',
      style,
      type: 'disabled'
    }, {
      onClick: this._handleButtonClick.bind(null, totalPages),
      style,
      text: totalPages.toString()
    }];
  },

  _getPageButtons () {
    const style = this.styles();
    const { currentPage, pageRange, totalPages } = this.props;
    const pages = [];
    const maxStartingPage = totalPages - pageRange + 3;
    const staticSet = totalPages <= pageRange;
    const startingSet = !staticSet && currentPage <= pageRange - 2;
    const endingSet = !staticSet && !startingSet && currentPage + pageRange - 3 >= totalPages;
    const middleSet = !staticSet && !startingSet && !endingSet;
    const startingPage = this._getStartingPage(currentPage, maxStartingPage, staticSet, startingSet, middleSet);
    const endingPage = this._getEndingPage(totalPages, pageRange, startingSet, staticSet, middleSet, startingPage);

    for (let i = startingPage; i <= endingPage; i++) {
      const activeStyle = i === currentPage && style.active;
      const buttonStyle = Object.assign({}, style.component, activeStyle);

      pages.push({
        onClick: this._handleButtonClick.bind(null, i),
        text: i.toString(),
        style: buttonStyle
      });
    }

    if (!staticSet) {
      if (!startingSet) {
        pages.unshift(...this._addFirstPageButtons());
      }

      if (!endingSet) {
        pages.push(...this._addLastPageButtons(totalPages));
      }
    }

    return pages;
  },

  render () {
    return (
      <ButtonGroup
        buttons={[
          this._getPrevButton(),
          ...this._getPageButtons(),
          this._getNextButton()
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
      }, this.props.style),
      active: {
        backgroundColor: StyleConstants.adjustHexOpacity(this.props.primaryColor, 0.15)
      }
    };
  }
});

module.exports = PaginationButtons;
