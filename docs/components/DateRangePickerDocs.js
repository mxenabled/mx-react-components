// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const { DateRangePicker } = require('mx-react-components');

const Markdown = require('components/Markdown');

class DateRangePickerDocs extends React.Component {
  state = {
    selectedEndDate: null,
    selectedStartDate: null
  };

  _handleDateRangeSelect = (selectedStartDate, selectedEndDate) => {
    this.setState({
      selectedStartDate,
      selectedEndDate
    });
  };

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
        <h5>defaultRanges <label>Array of range option objects</label></h5>
        <p>Default: <a href='https://github.com/mxenabled/mx-react-components/blob/master/src/components/DateRangePicker.js#L41'>See Code for default array of ranges</a></p>
        <p>Array of default range objects used when showDefaultRanges prop is set to true.  If not supplied, the default above is used.</p>
        <p>Range objects consists of a `displayValue` and two functions that get the start and end date. These functions much return unix timestamps</p>
        <Markdown lang='js'>
        {`
          [{
            displayValue: 'Today',
            getEndDate: () => moment.endOf('day').unix(), // These must be a unix timestamp
            getStartDate: () => moment.startOf('day').unix()
          }]
        `}
        </Markdown>

        <h5>format <label>String</label></h5>
        <p>Default: 'MMM D, YYYY'</p>
        <p>This is used to determine the format of the selected date. It should follow the Moment.js conventions outlined <a href='http://momentjs.com/docs/#/parsing/string-format/' target='_blank'>here</a>.</p>

        <h5>locale <label>String</label></h5>
        <p>Default: 'en'</p>
        <p>This is used to format the dates, day names, month names, etc based on the locale.</p>

        <h5>isRelative <label>boolean</label></h5>
        <p>Default: true</p>
        <p>Determines if the selected date and options are positioned relative or static.</p>

        <h5>minimumDate <label>Number (unix timestamp)</label></h5>
        <p>If set, the user will not be able to select a date prior to this date.</p>

        <h5>onDateSelect <label>Function</label></h5>
        <p>A function to be called when the user has selected a date. The selected date timestamp(s) will be passed to this function.</p>

        <h5>placeholderText <label>String</label></h5>
        <p>Default: Select A Date</p>
        <p>A string used as placeholder text for the selected date input when it is empty.</p>

        <h5>selectedEndDate <label>Number (unix timestamp)</label></h5>
        <p>This sets the selected end date on the component. Can be used to set a default end date.</p>

        <h5>selectedStartDate <label>Number (unix timestamp)</label></h5>
        <p>This sets the selected start date on the component. Can be used to set a default start date.</p>

        <h5>showDefaultRanges <label>Bool</label></h5>
        <p>Default: false</p>
        <p>When set to true, shows the default range options.</p>

        <h5>style <label>Object</label></h5>
        <p>Additional styles that can be set on the main wrapping component.</p>

        <h5>styles <label>Object</label></h5>
        <p>A nested object that allows you to set styles on any of the elements in the component. See the `styles` method in the component code for a full list of available keys and values.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

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
}

module.exports = DateRangePickerDocs;
