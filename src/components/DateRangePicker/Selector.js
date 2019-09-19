const React = require('react');
const moment = require('moment');
const keycode = require('keycode');
const PropTypes = require('prop-types');

const Icon = require('../Icon');

class Selector extends React.Component {
  static propTypes = {
    currentDate: PropTypes.string,
    handleNextClick: PropTypes.func,
    handlePreviousClick: PropTypes.func,
    setCurrentDate: PropTypes.func,
    type: PropTypes.string
  };

  render () {
    const styles = this.styles();

    return (
      <div className='mx-selector' style={{ ...styles.container, ...this.props.style }}>
        <a
          aria-label={`Previous ${this.props.type}`}
          className='mx-selector-previous'
          onClick={this.props.handlePreviousClick}
          onKeyUp={e =>
            keycode(e) === 'enter' && this.props.handlePreviousClick(e)}
          role='button'
          tabIndex={0}
        >
          <Icon
            size={20}
            style={styles.calendarHeaderNav}
            type='caret-left'
          />
        </a>
        <div
          aria-label={`Currently in ${this.props.currentDate}`}
          className='mx-selector-current-date'
          role='heading'
          style={styles.currentDate}
        >
          {this.props.currentDate}
        </div>
        <a
          aria-label={`Next ${this.props.type}`}
          className='mx-selector-next'
          onClick={this.props.handleNextClick}
          onKeyUp={e => keycode(e) === 'enter' && this.props.handleNextClick(e)}
          role='button'
          tabIndex={0}
        >
          <Icon
            size={20}
            style={styles.calendarHeaderNav}
            type='caret-right'
          />
        </a>
      </div>
    );
  }

  styles = () => {
    return {
      container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'

      },
      calendarHeaderNav: {
        cursor: 'pointer'
      },
      currentDate: {
        padding: '0px 10px'
      }
    };
  }
}

class MonthSelector extends React.Component {
  static propTypes = {
    currentDate: PropTypes.number,
    setCurrentDate: PropTypes.func
  };

  _handlePreviousClick = () => {
    const currentDate = moment.unix(this.props.currentDate).startOf('month').subtract(1, 'm').unix();

    this.props.setCurrentDate(currentDate);
  };

  _handleNextClick = () => {
    const currentDate = moment.unix(this.props.currentDate).endOf('month').add(1, 'd').unix();

    this.props.setCurrentDate(currentDate);
  };

  render () {
    const styles = this.styles();

    return (
      <Selector
        {...this.props}
        currentDate={moment.unix(this.props.currentDate).format('MMMM')}
        handleNextClick={this._handleNextClick}
        handlePreviousClick={this._handlePreviousClick}
        style={styles.monthSelector}
        type='Month'
      />
    );
  }

  styles = () => {
    return {
      monthSelector: {
        width: '60%'
      }
    };
  }
}

class YearSelector extends React.Component {
  static propTypes = {
    currentDate: PropTypes.number,
    setCurrentDate: PropTypes.func
  };

  _handlePreviousClick = () => {
    const currentDate = moment.unix(this.props.currentDate).startOf('month').subtract(1, 'y').unix();

    this.props.setCurrentDate(currentDate);
  };

  _handleNextClick = () => {
    const currentDate = moment.unix(this.props.currentDate).endOf('month').add(1, 'y').unix();

    this.props.setCurrentDate(currentDate);
  };

  render () {
    return (
      <Selector
        {...this.props}
        currentDate={moment.unix(this.props.currentDate).format('YYYY')}
        handleNextClick={this._handleNextClick}
        handlePreviousClick={this._handlePreviousClick}
        type='Year'
      />
    );
  }
}


module.exports = {
  MonthSelector,
  YearSelector
};
