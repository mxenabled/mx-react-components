const React = require('react');
const { Icon, Select } = require('mx-react-components');

const styles = {
  block: {
    boxSizing: 'border-box',
    float: 'left',
    width: '20%',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '13px',
    color: '#666666',
    textAlign: 'center',
    borderRight: '1px solid #e5e5e5',
    borderBottom: '1px solid #e5e5e5',
    borderLeft: '1px solid #e5e5e5',
    padding: '30px 0',
    marginRight: '-1px'
  },
  type: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #e5e5e5',
    borderRadius: '2px',
    display: 'inline-block',
    margin: '5px 0',
    padding: '3px 5px'
  }
};

const IconDocs = React.createClass({
  getInitialState () {
    return {
      icon: {
        value: 'accounts',
        displayValue: 'Accounts'
      }
    }
  },

  render () {
    return (
      <div>
        <h2>{'<Icon />'}</h2>
        <Select
          isMobile={false}
          onChange={this._handleSelectChange}
          options={[
            {
              value: 'accounts',
              displayValue: 'Accounts'
            },
            {
              value: 'add',
              displayValue: 'Add'
            },
            {
              value: 'add-solid',
              displayValue: 'Add Solid'
            },
            {
              value: 'arrow-down',
              displayValue: 'Arrow Down'
            },
            {
              value: 'arrow-left',
              displayValue: 'Arrow Left'
            },
            {
              value: 'arrow-right',
              displayValue: 'Arrow Right'
            },
            {
              value: 'arrow-up',
              displayValue: 'Arrow Up'
            },
            {
              value: 'attention',
              displayValue: 'Attention'
            },
            {
              value: 'auto',
              displayValue: 'Auto'
            },
            {
              value: 'backspace',
              displayValue: 'Backspace'
            },
            {
              value: 'campaigns',
              displayValue: 'Campaigns'
            },
            {
              value: 'caret-down',
              displayValue: 'Caret Down'
            },
            {
              value: 'caret-left',
              displayValue: 'Caret Left'
            },
            {
              value: 'caret-right',
              displayValue: 'Caret Right'
            },
            {
              value: 'caret-up',
              displayValue: 'Caret Up'
            },
            {
              value: 'check',
              displayValue: 'Check'
            },
            {
              value: 'check-solid',
              displayValue: 'Check Solid'
            },
            {
              value: 'checking',
              displayValue: 'Checking'
            },
            {
              value: 'close',
              displayValue: 'Close'
            },
            {
              value: 'close-solid',
              displayValue: 'Close Solid'
            },
            {
              value: 'comparisons',
              displayValue: 'Comparisons'
            },
            {
              value: 'credit-card',
              displayValue: 'Credit Card'
            },
            {
              value: 'delete',
              displayValue: 'Delete'
            },
            {
              value: 'download',
              displayValue: 'Download'
            },
            {
              value: 'edit',
              displayValue: 'Edit'
            },
            {
              value: 'envelope',
              displayValue: 'Envelope'
            },
            {
              value: 'export',
              displayValue: 'Export'
            },
            {
              value: 'folder',
              displayValue: 'Folder'
            },
            {
              value: 'gallery',
              displayValue: 'Gallery'
            },
            {
              value: 'gear',
              displayValue: 'Gear'
            },
            {
              value: 'hamburger',
              displayValue: 'Hamburger'
            },
            {
              value: 'help',
              displayValue: 'Help'
            },
            {
              value: 'home',
              displayValue: 'Home'
            },
            {
              value: 'info',
              displayValue: 'Info'
            },
            {
              value: 'list-view',
              displayValue: 'List View'
            },
            {
              value: 'loans',
              displayValue: 'Loans'
            },
            {
              value: 'md-cash',
              displayValue: 'Cash (MD)'
            },
            {
              value: 'md-check-mark',
              displayValue: 'Check Mark (MD)'
            },
            {
              value: 'md-credit',
              displayValue: 'Creidt (MD)'
            },
            {
              value: 'md-debts',
              displayValue: 'Debts (MD)'
            },
            {
              value: 'md-savings',
              displayValue: 'Savings (MD)'
            },
            {
              value: 'mobile-phone',
              displayValue: 'Mobile Phone'
            },
            {
              value: 'mx',
              displayValue: 'MX'
            },
            {
              value: 'phone',
              displayValue: 'Phone'
            },
            {
              value: 'play',
              displayValue: 'Play'
            },
            {
              value: 'play-solid',
              displayValue: 'Play Solid'
            },
            {
              value: 'savings',
              displayValue: 'Savings'
            },
            {
              value: 'search',
              displayValue: 'Search'
            },
            {
              value: 'segments',
              displayValue: 'Segments'
            },
            {
              value: 'sync',
              displayValue: 'Sync'
            },
            {
              value: 'transactions',
              displayValue: 'Transactions'
            },
            {
              value: 'user',
              displayValue: 'User'
            },
            {
              value: 'view',
              displayValue: 'View'
            },
            {
              value: 'visit',
              displayValue: 'Visit'
            },
            {
              value: 'x-axis',
              displayValue: 'X Axis'
            },
            {
              value: 'y-axis',
              displayValue: 'Y Axis'
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
          selected={this.state.icon}
          selectedStyle={{}}
          valid={true}
        />
        <br/>
        <div style={{ textAlign: 'center' }}>
          <Icon
            type={this.state.icon.value}
            size={150}
            style={{
              color: '#359BCF'
            }}
          />
        </div>

        <h3>How To Use</h3>

      </div>
    );
  },

  _handleSelectChange (option) {
    this.setState({
      icon: option
    });
  }
});

module.exports = IconDocs;