const React = require('react');
const ReactDOM = require('react-dom');
const { hashHistory, Route, IndexRoute, Router } = require('react-router');

const BarChart = require('components/BarChartDocs');
const Button = require('components/ButtonDocs');
const ButtonGroup = require('components/ButtonGroupDocs');
const Changelog = require('components/Changelog');
const Components = require('components/Components');
const DatePicker = require('components/DatePickerDocs');
const DatePickerFullScreen = require('components/DatePickerFullScreenDocs');
const DateRangePicker = require('components/DateRangePickerDocs');
const DateTimePicker = require('components/DateTimePickerDocs');
const DisplayInput = require('components/DisplayInputDocs');
const Drawer = require('components/DrawerDocs');
const DonutChart = require('components/DonutChartDocs');
const FileUpload = require('components/FileUploadDocs');
const Gauge = require('components/GaugeDocs');
const Header = require('components/Header');
const Home = require('components/Home');
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
const Select = require('components/SelectDocs');
const SelectFullScreen = require('components/SelectFullScreenDocs');
const SimpleInput = require('components/SimpleInputDocs');
const SimpleSelect = require('components/SimpleSelectDocs');
const SimpleSlider = require('components/SimpleSliderDocs');
const Spin = require('components/SpinDocs');
const Styles = require('components/StylesDocs');
const Tabs = require('components/TabsDocs');
const TextArea = require('components/TextAreaDocs');
const TimeBasedLineChart = require('components/TimeBasedLineChartDocs');
const ToggleSwitch = require('components/ToggleSwitchDocs');
const TypeAhead = require('components/TypeAheadDocs');

const App = React.createClass({
  render () {
    const currentYear = new Date().getFullYear();

    return (
      <div>
        <Header />
        {this.props.children}
        <footer>
          <div className='container'>
            &copy; Copyright {currentYear} - MX
          </div>
        </footer>
      </div>
    );
  }
});

ReactDOM.render((
  <Router history={hashHistory}>
    <Route component={App} path='/'>
      <Route component={Components} path='components'>
        <IndexRoute component={Changelog} />
        <Route component={BarChart} path='bar' />
        <Route component={Button} path='button' />
        <Route component={ButtonGroup} path='button-group' />
        <Route component={DatePicker} path='date-picker' />
        <Route component={DatePickerFullScreen} path='date-picker-full-screen' />
        <Route component={DateRangePicker} path='date-range-picker' />
        <Route component={DateTimePicker} path='date-time-picker' />
        <Route component={DisplayInput} path='display-input' />
        <Route component={Drawer} path='drawer' />
        <Route component={DonutChart} path='donut' />
        <Route component={FileUpload} path='file-upload' />
        <Route component={Gauge} path='gauge' />
        <Route component={Icon} path='icon' />
        <Route component={Loader} path='loader' />
        <Route component={Menu} path='menu' />
        <Route component={MessageBox} path='message-box' />
        <Route component={Modal} path='modal' />
        <Route component={NotifyOnScrollThreshold} path='notify-on-scroll-threshold' />
        <Route component={PageIndicator} path='page-indicator' />
        <Route component={PaginationButtons} path='pagination-buttons' />
        <Route component={ProgressBar} path='progress-bar' />
        <Route component={RadioButton} path='radio-button' />
        <Route component={RajaIcon} path='raja-icon' />
        <Route component={RangeSelector} path='range-selector' />
        <Route component={RowColumn} path='row-column' />
        <Route component={SearchInput} path='search-input' />
        <Route component={Select} path='select' />
        <Route component={SelectFullScreen} path='select-full-screen' />
        <Route component={SimpleInput} path='simple-input' />
        <Route component={SimpleSelect} path='simple-select' />
        <Route component={SimpleSlider} path='simple-slider' />
        <Route component={Spin} path='spin' />
        <Route component={Styles} path='styles' />
        <Route component={Tabs} path='tabs' />
        <Route component={TextArea} path='textarea' />
        <Route component={TimeBasedLineChart} path='time-based-line-chart' />
        <Route component={ToggleSwitch} path='toggle-switch' />
        <Route component={TypeAhead} path='type-ahead' />
      </Route>
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('app'));
