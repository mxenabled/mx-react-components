const React = require('react');

const { DatePicker } = require('mx-react-components');

const Markdown = require('components/Markdown');

const DatePickerDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
          DatePicker
          <label>Used to display and edit a start and end value with the option to define preset start/end values.</label>
        </h1>

        <h3>Demo</h3>
        <DatePicker
          closeOnDateSelect={true}
          defaultDate={'2015-10-10'}
          title='Select A Date'
          useInputForSelectedDate={false}
          useScrim={true}
        />

        <h3>Usage</h3>
        <h5>closeOnDateSelect <label>Boolean</label></h5>
        <p>Default: false</p>
        <p>If set to `true`, the calendar will be close after the user selects a data.</p>

        <h5>defaultDate <label>Number (unix timestamp)</label></h5>
        <p>Default: today's unix timestamp</p>
        <p>This sets the default selected date on component mount.</p>

        <h5>format <label>String</label></h5>
        <p>Default: 'YYYY-MM-DD'</p>
        <p>This is used to determine the format of the selected date. It should follow the Moment.js conventions outlined <a href='http://momentjs.com/docs/#/parsing/string-format/' target='_blank'>here</a>.</p>

        <h5>locale <label>String</label></h5>
        <p>Default: 'en'</p>
        <p>This is used to format the dates, day names, month names, etc based on the locale.</p>

        <h5>minimumDate <label>Number (unix timestamp)</label></h5>
        <p>If set, the user will not be able to select a date prior to this date.</p>

        <h5>onDateSelect <label>Function</label></h5>
        <p>A function to be called when the user has selected a date. The selected date timestamp will be passed to this function.</p>

        <h5>scrimStyle <label>Object | Array</label></h5>
        <p>A style object or Radium array that is used to modify the scrim element's styles.</p>

        <h5>showCaret <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>If set to 'false', the caret icon will not be shown in the selected box.</p>

        <h5>showDayBorders <label>Boolean</label></h5>
        <p>Default: false</p>
        <p>If set to 'true', then borders will be shown around each date in the calendar.</p>

        <h5>title <label>String</label></h5>
        <p>If a value is provided, it will be displayed above the calendar.</p>

        <h5>useInputForSelectedDate <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>If set to 'true', the user will be able to edit the selected date by typing. If set to 'false', the user will only be able to change the selected date by interacting with the calendar.</p>

        <h5>useScrim <label>Boolean</label></h5>
        <p>Default: false</p>
        <p>If set to 'true', a transparent scrim element will be placed behind the calendar. You can use the 'scrimStyle' prop to style the scrim.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <DatePicker
      closeOnDateSelect={true}
      title='Select A Date'
      useInputForSelectedDate={false}
      useScrim={true}
    />
  `}
        </Markdown>
      </div>
    );
  }
});

module.exports = DatePickerDocs;