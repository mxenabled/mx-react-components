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
    setCurrentDate: PropTypes.func
  };

  render () {
    const styles = this.styles();

    return (
      <div style={Object.assign({}, this.props.style, styles.container)}>
        <a
          onClick={this.props.handlePreviousClick}
          onKeyUp={e =>
            keycode(e) === 'enter' && this.props.handlePreviousClick(e)}
          tabIndex={0}
        >
          <Icon size={20} style={styles.calendarHeaderNav} type='caret-left' />
        </a>
        <div style={styles.currentDate}>{this.props.currentDate}</div>
        <a
          onClick={this.props.handleNextClick}
          onKeyUp={e => keycode(e) === 'enter' && this.props.handleNextClick(e)}
          tabIndex={0}
        >
          <Icon size={20} style={styles.calendarHeaderNav} type='caret-right' />
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
      />
    );
  }
}


module.exports = {
  MonthSelector,
  YearSelector
};
