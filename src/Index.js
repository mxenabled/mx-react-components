const moment = require('moment');

module.exports = {
  BarChart: require('./components/BarChart'),
  Button: require('./components/Button'),
  ButtonGroup: require('./components/ButtonGroup'),
  Calendar: require('./components/Calendar').default,
  Column: require('./components/grid/Column'),
  Container: require('./components/grid/Container'),
  DatePicker: require('./components/DatePicker'),
  DatePickerFullScreen: require('./components/DatePickerFullScreen'),
  DateRangePicker: require('./components/DateRangePicker'),
  DateTimePicker: require('./components/DateTimePicker'),
  DisplayInput: require('./components/DisplayInput'),
  DonutChart: require('./components/DonutChart'),
  Drawer: require('./components/Drawer'),
  FileUpload: require('./components/FileUpload'),
  Gauge: require('./components/Gauge'),
  HeaderMenu: require('./components/HeaderMenu'),
  Icon: require('./components/Icon'),
  Loader: require('./components/Loader'),
  Menu: require('./components/Menu'),
  MessageBox: require('./components/MessageBox'),
  Modal: require('./components/Modal'),
  NotifyOnScrollThreshold: require('./components/NotifyOnScrollThreshold'),
  PageIndicator: require('./components/PageIndicator'),
  PaginationButtons: require('./components/PaginationButtons'),
  ProgressBar: require('./components/ProgressBar'),
  RestrictFocusToChildren: require('./components/RestrictFocusToChildren'),
  RadioButton: require('./components/RadioButton'),
  RajaIcon: require('./components/RajaIcon'),
  Row: require('./components/grid/Row'),
  RangeSelector: require('./components/RangeSelector'),
  SearchInput: require('./components/SearchInput'),
  Select: require('./components/Select'),
  SelectFullScreen: require('./components/SelectFullScreen'),
  SimpleInput: require('./components/SimpleInput'),
  SimpleSelect: require('./components/SimpleSelect'),
  SimpleSlider: require('./components/SimpleSlider'),
  Spin: require('./components/Spin'),
  Tabs: require('./components/Tabs'),
  TextArea: require('./components/TextArea'),
  ThemeContext: require('./components/Theme').ThemeContext,
  ThemeProvider: require('./components/Theme').ThemeProvider,
  TimeBasedLineChart: require('./components/TimeBasedLineChart'),
  ToggleSwitch: require('./components/ToggleSwitch'),
  Tooltip: require('./components/Tooltip'),
  TypeAhead: require('./components/TypeAhead'),

  // Accessibility
  Listbox: require('./components/accessibility/Listbox').Listbox,
  Option: require('./components/accessibility/Listbox').Option,

  // D3 components
  AxisGroup: require('./components/d3/AxisGroup'),
  BreakPointGroup: require('./components/d3/BreakPointGroup'),
  CirclesGroup: require('./components/d3/CirclesGroup'),
  GridLinesGroup: require('./components/d3/GridLinesGroup'),
  LineGroup: require('./components/d3/LineGroup'),
  ShadedAreaRectangleGroup: require('./components/d3/ShadedAreaRectangleGroup'),
  ShadedHatchPatternRectangleGroup: require('./components/d3/ShadedHatchPatternRectangleGroup'),
  SlicesGroup: require('./components/d3/SlicesGroup'),
  TimeXAxisGroup: require('./components/d3/TimeXAxisGroup'),
  BarTimeXAxis: require('./components/d3/BarTimeXAxis'),

  // App constants
  AppConstants: require('./constants/App'),
  Styles: require('./constants/Style'),

  // App Utils
  FocusManagement: require('./utils/FocusManagement'),
  ChartUtils: require('./utils/Chart'),
  StyleUtils: require('./utils/Style'),

  // App configuration
  Config: {
    setDefaultTimeZone: (timezone) => {
      moment.tz.setDefault(timezone);
    }
  }
};
