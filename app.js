const React = require('react');
const ReactDOM = require('react-dom');
const { Route, IndexRoute, Router } = require('react-router');

const Changelog = require('components/Changelog');
const Components = require('components/Components');
const DonutChart = require('components/DonutChartDocs');
const Header = require('components/Header');
const Home = require('components/Home');
const Icon = require('components/IconDocs');
const Loader = require('components/LoaderDocs');
const Modal = require('components/ModalDocs');
const RangeSelector = require('components/RangeSelectorDocs');
const Select = require('components/SelectDocs');
const Spin = require('components/SpinDocs');
const ToggleSwitch = require('components/ToggleSwitchDocs');
const TypeAhead = require('components/TypeAheadDocs');

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
  <Router>
    <Route component={App} path='/'>
      <Route component={Components} path='components'>
        <IndexRoute component={Changelog} />
        <Route component={DonutChart} path='donut' />
        <Route component={Icon} path='icon' />
        <Route component={Loader} path='loader' />
        <Route component={Modal} path='modal' />
        <Route component={RangeSelector} path='range-selector' />
        <Route component={Select} path='select' />
        <Route component={Spin} path='spin' />
        <Route component={ToggleSwitch} path='toggle-switch' />
        <Route component={TypeAhead} path='type-ahead' />
      </Route>
      <IndexRoute component={Home} />
    </Route>
  </Router>
), document.getElementById('app'));