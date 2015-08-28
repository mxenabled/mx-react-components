const React = require('react');
const { Select } = require('mx-react-components');

const SelectDocs = React.createClass({
  getInitialState () {
    return {
      selected: {
        value: null,
        displayValue: 'Select One'
      }
    }
  },

  render () {
    return (
      <div>
        <h2>{'<Select >'}</h2>
        <Select
          isMobile={false}
          onChange={this._handleSelectChange}
          options={[
            {
              value: 'option-one-value',
              displayValue: 'Option 1'
            },
            {
              value: 'option-two-value',
              displayValue: 'Option 2'
            },
            {
              value: 'option-three-value',
              displayValue: 'Option 3'
            }
          ]}
          optionsStyle={{}}
          optionStyle={{
            color: '#333'
          }}
          optionHoverStyle={{
            backgroundColor: '#359BCF',
            color: '#fff'
          }}
          placeholderText='Pick One'
          selected={this.state.selected}
          selectedStyle={{}}
          valid={true}
        />
        <br/>
        <strong>Selected:</strong> {this.state.selected.displayValue}: {this.state.selected.value}

        <h3>How To Use</h3>
      </div>
    );
  },

  _handleSelectChange (option) {
    this.setState({
      selected: option
    });
  }
});

module.exports = SelectDocs;