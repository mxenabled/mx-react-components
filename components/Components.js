const React = require('react');
const { Link, RouteHandler, Navigation } = require('react-router');

const { Select } = require('mx-react-components');

const Components = React.createClass({
  mixins: [Navigation],

  _handleChange (selected) {
    this.transitionTo(selected.value);
  },

  render () {
    return (
      <div className='container components'>
        <div className='sideNav'>
          <div className='defaultSelect'>
            <Select
              onChange={this._handleChange}
              options={[
                {
                  value: 'icon',
                  displayValue: 'Icon'
                },
                {
                  value: 'loader',
                  displayValue: 'Loader'
                },
                {
                  value: 'modal',
                  displayValue: 'Modal'
                },
                {
                  value: 'spin',
                  displayValue: 'Spin'
                },
                {
                  value: 'range-selector',
                  displayValue: 'Range Selector'
                },
                {
                  value: 'select',
                  displayValue: 'Select'
                },
                {
                  value: 'type-ahead',
                  displayValue: 'Type Ahead'
                },
                {
                  value: 'donut',
                  displayValue: 'Donut'
                }
              ]}
              valid={true}
            />
          </div>

          <div className='links'>
            <h3>General</h3>
            <Link to='icon'>Icon</Link>
            <Link to='loader'>Loader</Link>
            <Link to='modal'>Modal</Link>
            <Link to='spin'>Spin</Link>

            <h3>Form</h3>
            <Link to='range-selector'>Range Selector</Link>
            <Link to='select'>Select</Link>
            <Link to='type-ahead'>Type Ahead</Link>

            <h3>Charts (D3)</h3>
            <Link to='donut'>Donut</Link>
          </div>
        </div>

        <div className='content'>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = Components;