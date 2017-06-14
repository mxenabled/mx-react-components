const React = require('react');
const { Link } = require('react-router');

const { DateTimePicker } = require('mx-react-components');

const Markdown = require('components/Markdown');

class DateTimePickerDocs extends React.Component {
  state = {
    selectedDate: null
  };

  _handleDateSelect = (selectedDate) => {
    this.setState({
      selectedDate
    });
  };

  render () {
    return (
      <div>
        <h1>
          DateTimePicker
          <label>Used to pick a single date and time.</label>
        </h1>

        <h3>Demo</h3>
        <DateTimePicker
          closeOnDateSelect={true}
          onDateSelect={this._handleDateSelect}
          selectedDate={this.state.selectedDate}
          timezoneFormat='name'
        >
          <div style={{ padding: 20 }}>@</div>
        </DateTimePicker>

        <h3>Usage</h3>

        <h5>calendarStyle <label>Object</label></h5>
        <p>Style object to be used on the pop-up calendar component.</p>

        <h5>children <label>Node</label></h5>
        <p>Content to be displayed between the date and time select boxes.</p>

        <h5>closeOnDateSelect <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>If set to `true`, the calendar will be close after the user selects a data.</p>

        <h5>dateFormat <label>String</label></h5>
        <p>Default: 'MMM D, YYYY'</p>
        <p>This is used to determine the format of the selected date. It should follow the Moment.js conventions outlined <a href='http://momentjs.com/docs/#/parsing/string-format/' target='_blank'>here</a>.</p>

        <h5>dateIcon <label>String</label></h5>
        <p>Default: 'calendar'</p>
        <p>Icon to be shown in the date select box</p>

        <h5>datePlaceholder <label>String</label></h5>
        <p>Default: 'Select a Date'</p>
        <p>A string used as placeholder text for the selected date input when it is empty.</p>

        <h5>locale <label>String</label></h5>
        <p>Default: 'en'</p>
        <p>This is used to format the dates, day names, month names, etc based on the locale.</p>

        <h5>minimumDate <label>Number (unix timestamp)</label></h5>
        <p>If set, the user will not be able to select a date prior to this date.</p>

        <h5>onDateSelect <label>Function</label></h5>
        <p>A function to be called when the user has selected a date. The selected date timestamp will be passed to this function.</p>

        <h5>selectedDate <label>Number (unix timestamp)</label></h5>
        <p>This sets the selected date on the component. Can be used to set a default date.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>timeFormat <label>String</label></h5>
        <p>Default: 'LT'</p>
        <p>This is used to determine the format of the selected time. It should follow the Moment.js conventions outlined <a href='http://momentjs.com/docs/#/parsing/string-format/' target='_blank'>here</a>.</p>

        <h5>timeIcon <label>String</label></h5>
        <p>Default: 'clock'</p>
        <p>Icon to be shown in the time select box</p>

        <h5>timePlaceholder <label>String</label></h5>
        <p>Default: 'Select a Time'</p>
        <p>A string used as placeholder text for the selected time input when it is empty.</p>

        <h5>timezone <label>String</label></h5>
        <p>Default: Timezone of client browser</p>
        <p>A string used to override the client browser timezone. Should be in the Moment.js convention outlined <a href='http://momentjs.com/timezone/docs/#/using-timezones/default-timezone/' target='_blank'>here</a>.</p>

        <h5>timeFormat <label>One of 'abbr' or 'name'</label></h5>
        <p>A string to determine the format of the timezone display. If not included, no timezone information will be displayed.</p>

        <h5>timezoneNames <label>Object</label></h5>
        <p>An object with timezone appbreviations mapped to the name and displayed if the timezoneFormat is set to 'name'.</p>
        <p>Default: {`
            EST: 'Eastern Standard Time',
            EDT: 'Eastern Daylight Time',
            CST: 'Central Standard Time',
            CDT: 'Central Daylight Time',
            MST: 'Mountain Standard Time',
            MDT: 'Mountain Daylight Time',
            PST: 'Pacific Standard Time',
            PDT: 'Pacific Daylight Time'
          `}
        </p>

        <h3>Example</h3>
        <Markdown>
        {`
          <DateTimePicker
            closeOnDateSelect={true}
            onDateSelect={this._handleDateSelect}
            selectedDate={this.state.selectedDate}
            timezoneFormat='name'
          >
            <div style={{ padding: 20 }}>@</div>
          </DateTimePicker>
        `}
        </Markdown>
      </div>
    );
  }
}

module.exports = DateTimePickerDocs;
