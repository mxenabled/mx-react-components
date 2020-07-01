const PropTypes = require('prop-types');
const React = require('react');

import { withTheme } from './Theme';
const ButtonGroup = require('./ButtonGroup');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

const { buttonTypes } = require('../constants/App');

class PaginationButtons extends React.Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    pageRange: PropTypes.number,
    style: PropTypes.object,
    theme: themeShape,
    totalPages: PropTypes.number.isRequired,
    type: PropTypes.oneOf(buttonTypes)
  };

  static defaultProps = {
    currentPage: 1,
    pageRange: 9,
    totalPages: 1,
    type: 'primaryOutline'
  };

  _handleButtonClick = (buttonClicked) => {
    const { currentPage, totalPages } = this.props;

    let goToPage = buttonClicked;

    if (buttonClicked === 'prev') {
      goToPage = currentPage > 1 ? currentPage - 1 : 1;
    } else if (buttonClicked === 'next') {
      goToPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    }

    this.props.onClick(goToPage);
  };

  _getPrevButton = (styles) => {
    const type = this.props.currentPage <= 1 ? 'disabled' : null;
    const style = styles.component;

    return {
      className: 'mx-pagination-previous',
      icon: 'caret-left',
      onClick: this._handleButtonClick.bind(null, 'prev'),
      style,
      type
    };
  };

  _getNextButton = (styles) => {
    const type = this.props.currentPage >= this.props.totalPages ? 'disabled' : null;
    const style = styles.component;

    return {
      className: 'mx-pagination-next',
      icon: 'caret-right',
      onClick: this._handleButtonClick.bind(null, 'next'),
      style,
      type
    };
  };

  _getStartingPage = (currentPage, maxStartingPage, staticSet, startingSet, middleSet) => {
    let startingPage = 1;

    if (!staticSet && !startingSet) {
      if (middleSet) {
        startingPage = currentPage;
      } else {
        startingPage = maxStartingPage;
      }
    }

    return startingPage;
  };

  _getEndingPage = (totalPages, pageRange, startingSet, staticSet, middleSet, startingPage) => {
    let endingPage = totalPages;

    if (!staticSet) {
      if (startingSet) {
        endingPage = pageRange - 2;
      } else if (middleSet) {
        endingPage = startingPage + pageRange - 5;
      }
    }

    return endingPage;
  };

  _addFirstPageButtons = (styles) => {
    const style = styles.component;

    return [{
      onClick: this._handleButtonClick.bind(null, 1),
      style,
      text: '1'
    }, {
      icon: 'kabob_horizontal',
      style,
      type: 'disabled'
    }];
  };

  _addLastPageButtons = (styles, totalPages) => {
    const style = styles.component;

    return [{
      icon: 'kabob_horizontal',
      style,
      type: 'disabled'
    }, {
      onClick: this._handleButtonClick.bind(null, totalPages),
      style,
      text: totalPages.toString()
    }];
  };

  _getPageButtons = (styles) => {
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
      const activeStyle = i === currentPage && styles.active;
      const buttonStyle = Object.assign({}, styles.component, activeStyle);

      pages.push({
        onClick: this._handleButtonClick.bind(null, i),
        text: i.toString(),
        style: buttonStyle
      });
    }

    if (!staticSet) {
      if (!startingSet) {
        pages.unshift(...this._addFirstPageButtons(styles));
      }

      if (!endingSet) {
        pages.push(...this._addLastPageButtons(styles, totalPages));
      }
    }

    return pages;
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);

    return (
      <ButtonGroup
        buttons={[
          this._getPrevButton(styles),
          ...this._getPageButtons(styles),
          this._getNextButton(styles)
        ]}
        theme={theme}
        type={this.props.type}
      />
    );
  }

  styles = (theme) => {
    return {
      component: Object.assign({
        padding: '4px 8px',
        width: 35
      }, this.props.style),
      active: {
        backgroundColor: StyleUtils.adjustHexOpacity(theme.Colors.PRIMARY, 0.15)
      }
    };
  };
}

module.exports = withTheme(PaginationButtons);
