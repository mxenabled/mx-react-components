const PropTypes = require('prop-types');
const React = require('react');
const { Route } = require('react-router');
const { Link } = require('react-router-dom');

const { Select } = require('mx-react-components');

const BarChart = require('components/BarChartDocs');
const Button = require('components/ButtonDocs');
const ButtonGroup = require('components/ButtonGroupDocs');
const Changelog = require('components/Changelog');
const { ConfigDocs } = require('components/ConfigDocs');
const DatePicker = require('components/DatePickerDocs');
const DatePickerFullScreen = require('components/DatePickerFullScreenDocs');
const DateRangePicker = require('components/DateRangePickerDocs');
const DateTimePicker = require('components/DateTimePickerDocs');
const DisplayInput = require('components/DisplayInputDocs');
const Drawer = require('components/DrawerDocs');
const DonutChart = require('components/DonutChartDocs');
const FileUpload = require('components/FileUploadDocs');
const Gauge = require('components/GaugeDocs');
const Icon = require('components/IconDocs');
const Loader = require('components/LoaderDocs');
const Menu = require('components/MenuDocs');
const MessageBox = require('components/MessageBoxDocs');
const Modal = require('components/ModalDocs');
const NotifyOnScrollThreshold = require('components/NotifyOnScrollThresholdDocs');
const PageIndicator = require('components/PageIndicatorDocs');
const PaginationButtons = require('components/PaginationButtonsDocs');
const ProgressBar = require('components/ProgressBarDocs');
const RadioButton = require('components/RadioButtonDocs');
const RajaIcon = require('components/RajaIconDocs');
const RangeSelector = require('components/RangeSelectorDocs');
const RowColumn = require('components/RowColumnDocs');
const SearchInput = require('components/SearchInputDocs');
const SelectDocs = require('components/SelectDocs');
const SelectFullScreen = require('components/SelectFullScreenDocs');
const SimpleInput = require('components/SimpleInputDocs');
const SimpleSelect = require('components/SimpleSelectDocs');
const SimpleSlider = require('components/SimpleSliderDocs');
const Spin = require('components/SpinDocs');
const Styles = require('components/StylesDocs');
const Tabs = require('components/TabsDocs');
const TextArea = require('components/TextAreaDocs');
const Theme = require('components/ThemeDocs');
const TimeBasedLineChart = require('components/TimeBasedLineChartDocs');
const ToggleSwitch = require('components/ToggleSwitchDocs');
const TypeAhead = require('components/TypeAheadDocs');

class Components extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  _handleChange = (selected) => {
    this.context.router.push('/components/' + selected.value);
  };

  render () {
    return (
      <div className='container-fluid components'>
        <div className='sideNav'>
          <div className='defaultSelect'>
            <Select
              onChange={this._handleChange}
              options={[
                {
                  value: 'button',
                  displayValue: 'Button'
                },
                {
                  value: 'button-group',
                  displayValue: 'Button Group'
                },
                {
                  value: 'date-picker',
                  displayValue: 'Date Picker'
                },
                {
                  value: 'date-picker-full-screen',
                  displayValue: 'Date Picker Full Screen'
                },
                {
                  value: 'date-range-picker',
                  displayValue: 'Date Range Picker'
                },
                {
                  value: 'date-time-picker',
                  displayValue: 'Date Time Picker'
                },
                {
                  value: 'display-input',
                  displayValue: 'Display Input'
                },
                {
                  value: 'drawer',
                  displayValue: 'Drawer'
                },
                {
                  value: 'donut',
                  displayValue: 'Donut'
                },
                {
                  value: 'file-upload',
                  displayValue: 'File Upload'
                },
                {
                  value: 'gauge',
                  displayValue: 'Gauge'
                },
                {
                  value: 'icon',
                  displayValue: 'Icon'
                },
                {
                  value: 'loader',
                  displayValue: 'Loader'
                },
                {
                  value: 'menu',
                  displayValue: 'Menu'
                },
                {
                  value: 'modal',
                  displayValue: 'Modal'
                },
                {
                  value: 'notify-on-scroll-threshold',
                  displayValue: 'Notify On Scroll Threshold'
                },
                {
                  value: 'page-indicator',
                  displayValue: 'Page Indicator'
                },
                {
                  value: 'pagination-buttons',
                  displayValue: 'Pagination Buttons'
                },
                {
                  value: 'progress-bar',
                  displayValue: 'Progress Bar'
                },
                {
                  value: 'radio-button',
                  displayValue: 'Radio Button'
                },
                {
                  value: 'raja-icon',
                  displayValue: 'Raja Icon'
                },
                {
                  value: 'range-selector',
                  displayValue: 'Range Selector'
                },
                {
                  value: 'row-column',
                  displayValue: 'Grid Row & Column'
                },
                {
                  value: 'select',
                  displayValue: 'Select'
                },
                {
                  value: 'simple-slider',
                  displayValue: 'Simple Slider'
                },
                {
                  value: 'select-full-screen',
                  displayValue: 'Select Full Screen'
                },
                {
                  value: 'spin',
                  displayValue: 'Spin'
                },
                {
                  value: 'styles',
                  displayValue: 'Styles'
                },
                {
                  value: 'time-based-line-chart',
                  displayValue: 'Time Based Line Chart'
                },
                {
                  value: 'textarea',
                  displayValue: 'TextArea'
                },
                {
                  value: 'tabs',
                  displayValue: 'Tabs'
                },
                {
                  value: 'toggle-switch',
                  displayValue: 'Toggle Switch'
                },
                {
                  value: 'type-ahead',
                  displayValue: 'Type Ahead'
                }
              ]}
              selected={null}
              valid={true}
            />
          </div>

          <div className='links'>
            <h3>General</h3>
            <Link to='/components/icon'>Icon</Link>
            <Link to='/components/raja-icon'>Raja Icon</Link>
            <Link to='/components/loader'>Loader</Link>
            <Link to='/components/menu'>Menu</Link>
            <Link to='/components/message-box'>MessageBox</Link>
            <Link to='/components/modal'>Modal</Link>
            <Link to='/components/notify-on-scroll-threshold'>Notify On Scroll Threshold</Link>
            <Link to='/components/page-indicator'>Page Indicator</Link>
            <Link to='/components/pagination-buttons'>Pagination Buttons</Link>
            <Link to='/components/progress-bar'>Progress Bar</Link>
            <Link to='/components/spin'>Spin</Link>
            <Link to='/components/file-upload'>File Upload</Link>

            <h3>Form</h3>
            <Link to='/components/button'>Button</Link>
            <Link to='/components/button-group'>Button Group</Link>
            <Link to='/components/date-picker'>Date Picker</Link>
            <Link to='/components/date-picker-full-screen'>Date Picker Full Screen</Link>
            <Link to='/components/date-range-picker'>Date Range Picker</Link>
            <Link to='/components/date-time-picker'>Date Time Picker</Link>
            <Link to='/components/display-input'>Display Input</Link>
            <Link to='/components/drawer'>Drawer</Link>
            <Link to='/components/file-upload'>File Upload</Link>
            <Link to='/components/radio-button'>Radio Button</Link>
            <Link to='/components/range-selector'>Range Selector</Link>
            <Link to='/components/search-input'>Search Input</Link>
            <Link to='/components/select'>Select</Link>
            <Link to='/components/select-full-screen'>Select Full Screen</Link>
            <Link to='/components/simple-input'>Simple Input</Link>
            <Link to='/components/simple-select'>Simple Select</Link>
            <Link to='/components/simple-slider'>Simple Slider</Link>
            <Link to='/components/textarea'>TextArea</Link>
            <Link to='/components/tabs'>Tabs</Link>
            <Link to='/components/toggle-switch'>Toggle Switch</Link>
            <Link to='/components/type-ahead'>Type Ahead</Link>

            <h3>Charts (D3)</h3>
            <Link to='/components/bar'>Bar</Link>
            <Link to='/components/donut'>Donut</Link>
            <Link to='/components/gauge'>Gauge</Link>
            <Link to='/components/time-based-line-chart'>Time Based Line Chart</Link>

            <h3>Responsive Grid</h3>
            <Link to='/components/row-column'>Row & Column</Link>

            <h3>Customization</h3>
            <Link to='/components/config'>Config</Link>
            <Link to='/components/styles'>Styles</Link>
            <Link to='/components/theme'>Theme</Link>
          </div>
        </div>

        <div className='content'>
          <Route component={Changelog} exact={true} path='/components' />
          <Route component={BarChart} path='/components/bar' />
          <Route component={Button} path='/components/button' />
          <Route component={ButtonGroup} path='/components/button-group' />
          <Route component={ConfigDocs} path='/components/config' />
          <Route component={DatePicker} path='/components/date-picker' />
          <Route component={DatePickerFullScreen} path='/components/date-picker-full-screen' />
          <Route component={DateRangePicker} path='/components/date-range-picker' />
          <Route component={DateTimePicker} path='/components/date-time-picker' />
          <Route component={DisplayInput} path='/components/display-input' />
          <Route component={Drawer} path='/components/drawer' />
          <Route component={DonutChart} path='/components/donut' />
          <Route component={FileUpload} path='/components/file-upload' />
          <Route component={Gauge} path='/components/gauge' />
          <Route component={Icon} path='/components/icon' />
          <Route component={Loader} path='/components/loader' />
          <Route component={Menu} path='/components/menu' />
          <Route component={MessageBox} path='/components/message-box' />
          <Route component={Modal} path='/components/modal' />
          <Route component={NotifyOnScrollThreshold} path='/components/notify-on-scroll-threshold' />
          <Route component={PageIndicator} path='/components/page-indicator' />
          <Route component={PaginationButtons} path='/components/pagination-buttons' />
          <Route component={ProgressBar} path='/components/progress-bar' />
          <Route component={RadioButton} path='/components/radio-button' />
          <Route component={RajaIcon} path='/components/raja-icon' />
          <Route component={RangeSelector} path='/components/range-selector' />
          <Route component={RowColumn} path='/components/row-column' />
          <Route component={SearchInput} path='/components/search-input' />
          <Route component={SelectDocs} path='/components/select' />
          <Route component={SelectFullScreen} path='/components/select-full-screen' />
          <Route component={SimpleInput} path='/components/simple-input' />
          <Route component={SimpleSelect} path='/components/simple-select' />
          <Route component={SimpleSlider} path='/components/simple-slider' />
          <Route component={Spin} path='/components/spin' />
          <Route component={Styles} path='/components/styles' />
          <Route component={Tabs} path='/components/tabs' />
          <Route component={TextArea} path='/components/textarea' />
          <Route component={Theme} path='/components/theme' />
          <Route component={TimeBasedLineChart} path='/components/time-based-line-chart' />
          <Route component={ToggleSwitch} path='/components/toggle-switch' />
          <Route component={TypeAhead} path='/components/type-ahead' />
        </div>
      </div>
    );
  }
}

module.exports = Components;
