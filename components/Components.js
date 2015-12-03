const React = require('react');
const { Link, History } = require('react-router');

const { Select } = require('mx-react-components');

const Components = React.createClass({
  mixins: [History],

  _handleChange (selected) {
    this.history.pushState(null, '/components/' + selected.value);
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
                  value: 'date-picker',
                  displayValue: 'Date Picker'
                },
                {
                  value: 'date-picker-full-screen',
                  displayValue: 'Date Picker Full Screen'
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
                  value: 'toggle-switch',
                  displayValue: 'Toggle Switch'
                },
                {
                  value: 'type-ahead',
                  displayValue: 'Type Ahead'
                },
                {
                  value: 'donut',
                  displayValue: 'Donut'
                },
                {
                  value: 'time-based-line-chart',
                  displayValue: 'Time Based Line Chart'
                }
              ]}
              selected={null}
              valid={true}
            />
          </div>

          <div className='links'>
            <h3>General</h3>
            <Link to='/components/icon'>Icon</Link>
            <Link to='/components/loader'>Loader</Link>
            <Link to='/components/modal'>Modal</Link>
            <Link to='/components/spin'>Spin</Link>

            <h3>Form</h3>
            <Link to='/components/date-picker'>Date Picker</Link>
            <Link to='/components/date-picker-full-screen'>Date Picker Full Screen</Link>
            <Link to='/components/range-selector'>Range Selector</Link>
            <Link to='/components/select'>Select</Link>
            <Link to='/components/toggle-switch'>Toggle Switch</Link>
            <Link to='/components/type-ahead'>Type Ahead</Link>

            <h3>Charts (D3)</h3>
            <Link to='/components/donut'>Donut</Link>
            <Link to='/components/time-based-line-chart'>Time Based Line Chart</Link>
          </div>
        </div>

        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Components;