const React = require('react');

const { DateRangePicker } = require('mx-react-components');

const Markdown = require('components/Markdown');

const DateRangePickerDocs = React.createClass({
  getInitialState () {
    return {
      selectedEndDate: null,
      selectedStartDate: null
    };
  },

  _handleDateRangeSelect (selectedStartDate, selectedEndDate) {
    this.setState({
      selectedStartDate,
      selectedEndDate
    });
  },

  render () {
    return (
      <div>
        <h1>
          DateRangePicker
          <label>Used to select a date range with a start and end value.</label>
        </h1>

        <h3>Demo</h3>
        <DateRangePicker
          onDateSelect={this._handleDateRangeSelect}
          selectedEndDate={this.state.selectedEndDate}
          selectedStartDate={this.state.selectedStartDate}
          showDefaultRanges={true}
        />

        <h3>Usage</h3>
        <h5>closeCalendarOnRangeSelect <label>boolean</label></h5>
        <p>Default: false</p>
        <p>Determines if the calendar is closed after successful range selection.</p>

        <h5>defaultRanges <label>Array of range option objects</label></h5>
        <p>Default: <a href='https://github.com/mxenabled/mx-react-components/blob/master/src/components/DateRangePicker.js#L30'>See Code for default array of ranges</a></p>
        <p>Array of default range objects used when showDefaultRanges prop is set to true.  If not supplied, the default above is used.</p>
        <Markdown lang='js'>
        {`
          [{
            displayValue: 'Today',
            endDate: 1446063248, // Unix timestamp
            startDate: 1446063248 // Unix timestamp
          }]
        `}
        </Markdown>

        <h5>format <label>String</label></h5>
        <p>Default: 'MMM D, YYYY'</p>
        <p>This is used to determine the format of the selected date. It should follow the Moment.js conventions outlined <a href='http://momentjs.com/docs/#/parsing/string-format/' target='_blank'>here</a>.</p>

        <h5>locale <label>String</label></h5>
        <p>Default: 'en'</p>
        <p>This is used to format the dates, day names, month names, etc based on the locale.</p>

        <h5>minimumDate <label>Number (unix timestamp)</label></h5>
        <p>If set, the user will not be able to select a date prior to this date.</p>

        <h5>onDateSelect <label>Function</label></h5>
        <p>A function to be called when the user has selected a date. The selected date timestamp(s) will be passed to this function.</p>

        <h5>placeholderText <label>String</label></h5>
        <p>Default: Select A Date</p>
        <p>A string used as placeholder text for the selected date input when it is empty.</p>

        <h5>primaryColor <label>String</label></h5>
        <p>Default: PRIMARY</p>
        <p>The color used for input focus, selected date highlight, and hover border.</p>

        <h5>selectedEndDate <label>Number (unix timestamp)</label></h5>
        <p>This sets the selected end date on the component. Can be used to set a default end date.</p>

        <h5>selectedStartDate <label>Number (unix timestamp)</label></h5>
        <p>This sets the selected start date on the component. Can be used to set a default start date.</p>

        <h5>showDefaultRanges <label>Bool</label></h5>
        <p>Default: false</p>
        <p>When set to true, shows the default range options.</p>

        <h5>style <label>Object</label></h5>
        <p>Additional styles that can be set on the component.</p>

        <h3>Example</h3>
        <Markdown>
        {`
          _handleDateRangeSelect (selectedStartDate, selectedEndDate) {
            this.setState({
              selectedStartDate,
              selectedEndDate
            });
          },

          <DateRangePicker
            onDateSelect={this._handleDateRangeSelect}
            selectedEndDate={this.state.selectedEndDate}
            selectedStartDate={this.state.selectedStartDate}
            showDefaultRanges={true}
          />
        `}
        </Markdown>
      </div>
    );
  }
});

module.exports = DateRangePickerDocs;
