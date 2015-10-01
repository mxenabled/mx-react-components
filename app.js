const React = require('react');
const Router = require('react-router');
const { Route, RouteHandler, DefaultRoute } = Router;

const Components = require('components/Components');
const DonutChart = require('components/DonutChartDocs');
const Header = require('components/Header');
const Home = require('components/Home');
const Icon = require('components/IconDocs');
const Loader = require('components/LoaderDocs');
const Modal = require('components/Modal');
const RangeSelector = require('components/RangeSelectorDocs');
const Select = require('components/SelectDocs');
const Spin = require('components/SpinDocs');
const TypeAhead = require('components/TypeAheadDocs');

const App = React.createClass({
  render () {
    return (
      <div>
        <Header />
        <RouteHandler />
        <footer>
          <div className='container'>
            &copy; Copyright 2015 - MX
          </div>
        </footer>
      </div>
    );
  }
});

const routes = (
  <Route handler={App} name='home' path='/'>
    <Route handler={Components} name='components'>
      <Route handler={DonutChart} name='donut' />
      <Route handler={Icon} name='icon' />
      <Route handler={Loader} name='loader' />
      <Route handler={Modal} name='modal' />
      <Route handler={RangeSelector} name='range-selector' />
      <Route handler={Select} name='select' />
      <Route handler={Spin} name='spin' />
      <Route handler={TypeAhead} name='type-ahead' />
    </Route>
    <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, (Handler, state) => {
  const params = state.params;

  React.render(<Handler params={params} />, document.body);
});