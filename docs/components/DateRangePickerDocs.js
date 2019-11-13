// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router');

const Code = require('components/Code');
const { Button, DateRangePicker } = require('mx-react-components');

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
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <h5>Standard Usage</h5>
          <div style={{ marginBottom: 15 }}>
            <DateRangePicker
              onDateRangeSelect={this._handleDateRangeSelect}
              selectedEndDate={this.state.selectedEndDate}
              selectedStartDate={this.state.selectedStartDate}
              showDefaultRanges={true}
            />
          </div>
          <h5>Render Props - Custom Trigger Button</h5>
          <div>
            <DateRangePicker
              onDateRangeSelect={this._handleDateRangeSelect}
              selectedEndDate={this.state.selectedEndDate}
              selectedStartDate={this.state.selectedStartDate}
              showDefaultRanges={true}
              styles={{
                component: {
                  border: 'none',
                  margin: 0,
                  padding: 0,
                  width: 160,
                },
                optionsWrapper: {
                  marginTop: 0,
                },
              }}
            >
              {buttonProps => (
                <Button elementProps={buttonProps} icon="clock" type="neutral">My Custom Button</Button>
              )}
            </DateRangePicker>
          </div>
        </div>

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

        <h5>focusTrapProps<label>Object</label></h5>
        <p>Default: Empty Object</p>
        <p>The DateRangePicker component uses the <a href='https://github.com/davidtheclark/focus-trap-react'>Focus Trap React</a> library to prevent a user from tabing outside the date range picker for accessibility reasons.</p>
        <p>The <Code>focusTrapProps</Code> object provides a mechanism for passing the focus trap component props.</p>
        <p>See the library documentation for details on what props it accepts and how to use them.</p>

        <h5>children <label>Function</label></h5>
        <p>If a function is provided as children to the component, the return value of the function will be rendered in place of the standard button that triggers showing/hiding the calendar menu. The function receives as an argument an object of properties that can be assigned to the element you provide in the function. See documented function argument object and examples below for more details. </p>

        <p>Function Argument <label>Object</label></p>

        <Markdown lang='js'>
          {`
            {
              /**
              * An id used to associate the element you provide
              * with the calendar rendered when the DateRangePicker
              * is open. This association is for accessibility.
              */
              "aria-controls": String,
              /**
              * A boolean that is always true. This is for accessiblity
              * and informs screen readers to tell users that interacting
              * with your element will open popover content.
              */
              "aria-haspopup": Boolean,
              /**
              * A string that describes the state of the selected date
              * range that will help screen readers describe your element
              * to users.
              */
              "aria-label": String,
              /**
              * A function that when called will toggle open/close the
              * calendar menu. You can pass this directly to the onClick
              * handler of your provided element or wrap it in a function
              * and do extra work before calling it.
              */
              onClick: Function
            }
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

        <h5>onCancel <label>Function</label></h5>
        <p>A function to be called when the user presses the cancel button or clicks on the scrim to cancel the date selection. Can be useful for analytics.</p>

        <h5>onDateRangeSelect <label>Function</label></h5>
        <p>A function to be called when the user has applied their selected date range. The range's start and end dates are passed as arguements to the call.</p>

        <h5>onOpen <label>Function</label></h5>
        <p>A function to be called when the user opens the calendar. Can be useful for analytics.</p>

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

        <h3>Standard Example</h3>
        <Markdown>
        {`
          _handleDateRangeSelect (selectedStartDate, selectedEndDate) {
            this.setState({
              selectedStartDate,
              selectedEndDate
            });
          },

          <DateRangePicker
            onDateRangeSelect={this._handleDateRangeSelect}
            selectedEndDate={this.state.selectedEndDate}
            selectedStartDate={this.state.selectedStartDate}
            showDefaultRanges={true}
          />
        `}
        </Markdown>

        <h3>Using a function as children to replace the trigger button</h3>
        <Markdown>
          {`
            <DateRangePicker
              onDateRangeSelect={this._handleDateRangeSelect}
              selectedEndDate={this.state.selectedEndDate}
              selectedStartDate={this.state.selectedStartDate}
              showDefaultRanges={true}
              styles={{
                component: {
                  border: 'none',
                  margin: 0,
                  padding: 0,
                  width: 160,
                },
                optionsWrapper: {
                  marginTop: 0,
                },
              }}
            >
              {elementProps => {
                return (<button {...elementProps}>My Custom Button</button>)
              }}
            </DateRangePicker>
          `}
        </Markdown>

        <h3>Using a function as children but providing extra functionality on click</h3>
        <Markdown>
          {`
            <DateRangePicker
              onDateRangeSelect={this._handleDateRangeSelect}
              selectedEndDate={this.state.selectedEndDate}
              selectedStartDate={this.state.selectedStartDate}
              showDefaultRanges={true}
              styles={{
                component: {
                  border: 'none',
                  margin: 0,
                  padding: 0,
                  width: 160,
                },
                optionsWrapper: {
                  marginTop: 0,
                },
              }}
            >
              {elementProps => {
                return (
                  <button
                    {...elementProps}
                    onClick={() => {
                      // Do extra work here
                      elementProps.onClick()
                    }}
                  >
                    My Custom Button
                  </button>)
              }}
            </DateRangePicker>
          `}
        </Markdown>
      </div>
    );
  }
}

module.exports = DateRangePickerDocs;
