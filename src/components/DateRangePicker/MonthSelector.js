const React = require('react');
const moment = require('moment');
const PropTypes = require('prop-types');

const Icon = require('../Icon');

class MonthSelector extends React.Component {
  static propTypes = {
    currentDate: PropTypes.string,
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
      <div style={styles.container}>
        <Icon
          elementProps={{
            onClick: this._handlePreviousClick
          }}
          size={20}
          style={styles.calendarHeaderNav}
          type='caret-left'
        />
        <div>
          {moment(this.props.currentDate, 'X').format('MMMM')}
        </div>
        <Icon
          elementProps={{
            onClick: this._handleNextClick
          }}
          size={20}
          style={styles.calendarHeaderNav}
          type='caret-right'
        />
      </div>
    );
  }

  styles = () => {
    return {
      container: {
        display: 'flex'
      },
      calendarHeaderNav: {
        width: 35,
        cursor: 'pointer'
      }
    };
  }
}

module.exports = MonthSelector;
