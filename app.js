const React = require('react');
const Router = require('react-router');
const { Route, RouteHandler, DefaultRoute } = Router;

const Header = require('components/Header');
const Home = require('components/Home');
const Components = require('components/Components');
const Icon = require('components/IconDocs');
const Loader = require('components/LoaderDocs');
const RangeSelector = require('components/RangeSelectorDocs');
const Select = require('components/SelectDocs');
const Spin = require('components/SpinDocs');

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
      <Route handler={Icon} name='icon' />
      <Route handler={Loader} name='loader' />
      <Route handler={RangeSelector} name='range-selector' />
      <Route handler={Select} name='select' />
      <Route handler={Spin} name='spin' />
    </Route>
    <DefaultRoute handler={Home} />
  </Route>
);

Router.run(routes, (Handler, state) => {
  const params = state.params;

  React.render(<Handler params={params} />, document.body);
});