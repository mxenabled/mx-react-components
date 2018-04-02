const React = require('react');
const ReactDOM = require('react-dom');
const { Route, Switch } = require('react-router');
const { HashRouter } = require('react-router-dom');

const Components = require('components/Components');
const Header = require('components/Header');
const Home = require('components/Home');

class App extends React.Component {
  render () {
    const currentYear = new Date().getFullYear();

    return (
      <div>
        <Header />
        <AppRoutes />
        <footer>
          <div className='container'>
            &copy; Copyright {currentYear} - MX
          </div>
        </footer>
      </div>
    );
  }
}

const AppRoutes = () => (
  <Switch>
    <Route component={Home} exact={true} path='/' />
    <Route component={Components} path='/components' />
  </Switch>
);

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('app'));
