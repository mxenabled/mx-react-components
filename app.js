const React = require('react');
const ReactDOM = require('react-dom');
const { hashHistory, Route, IndexRoute, Router } = require('react-router');

const Button = require('components/ButtonDocs');
const Changelog = require('components/Changelog');
const Components = require('components/Components');
const DatePicker = require('components/DatePickerDocs');
const DatePickerFullScreen = require('components/DatePickerFullScreenDocs');
const DonutChart = require('components/DonutChartDocs');
const Header = require('components/Header');
const Home = require('components/Home');
const Icon = require('components/IconDocs');
const Loader = require('components/LoaderDocs');
const Modal = require('components/ModalDocs');
const RangeSelector = require('components/RangeSelectorDocs');
const SearchInput = require('components/SearchInputDocs');
const Select = require('components/SelectDocs');
const SelectFullScreen = require('components/SelectFullScreenDocs');
const SimpleInput = require('components/SimpleInputDocs');
const Spin = require('components/SpinDocs');
const Styles = require('components/StylesDocs');
const ToggleSwitch = require('components/ToggleSwitchDocs');
const TypeAhead = require('components/TypeAheadDocs');
const TimeBasedLineChart = require('components/TimeBasedLineChartDocs');

const App = React.createClass({
  render () {
    return (
      <div>
        <Header />
        {this.props.children}
        <footer>
          <div className='container'>
            &copy; Copyright 2015 - MX
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
        <Route component={Button} path='button' />
        <Route component={DatePicker} path='date-picker' />
        <Route component={DatePickerFullScreen} path='date-picker-full-screen' />
        <Route component={DonutChart} path='donut' />
        <Route component={Icon} path='icon' />
        <Route component={Loader} path='loader' />
        <Route component={Modal} path='modal' />
        <Route component={RangeSelector} path='range-selector' />
        <Route component={SearchInput} path='search-input' />
        <Route component={Select} path='select' />
        <Route component={SelectFullScreen} path='select-full-screen' />
        <Route component={SimpleInput} path='simple-input' />
        <Route component={Spin} path='spin' />
        <Route component={Styles} path='styles' />
        <Route component={ToggleSwitch} path='toggle-switch' />
        <Route component={TypeAhead} path='type-ahead' />
        <Route component={TimeBasedLineChart} path='time-based-line-chart' />
      </Route>
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('app'));