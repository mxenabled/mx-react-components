const React = require('react');

const { Icon, Select } = require('mx-react-components');

const Markdown = require('components/Markdown');

const IconDocs = React.createClass({
  getInitialState () {
    return {
      icon: {
        value: 'accounts',
        displayValue: 'Accounts'
      }
    };
  },

  _handleSelectChange (option) {
    this.setState({
      icon: option
    });
  },

  render () {
    return (
      <div>
        <h1>
          Icon
          <label>A set of predfined svg icons inspired by the MX products</label>
        </h1>

        <h3>Demo</h3>
        {icons.map(icon => {
          return (
            <div key={icon.value} style={{ display: 'inline-block', textAlign: 'center' }}>
              <Icon key={icon.value} size={40} type={icon.value} />
              <div>{icon.value}</div>
            </div>
          );
        })}

        <h3>Usage</h3>
        <h5>size <label>Number, String</label></h5>
        <p>A single number representing the width and height of the icon in pixels.</p>

        <h5>type <label>String</label></h5>
        <p>The name of the icon to be displayed. See above for available options.</p>

        <h3>Example</h3>
        <Markdown>
  {`
    <Icon
      size={50}
      type='accounts'
    />
  `}
        </Markdown>
      </div>
    );
  }
});

const icons = [
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
    value: 'android',
    displayValue: 'Android'
  },
  {
    value: 'apple',
    displayValue: 'Apple'
  },
  {
    value: 'arrow-down',
    displayValue: 'Arrow Down'
  },
  {
    value: 'arrow-down-fat',
    displayValue: 'Arrow Down Fat'
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
    value: 'arrow-up-fat',
    displayValue: 'Arrow Up Fat'
  },
  {
    value: 'attention',
    displayValue: 'Attention'
  },
  {
    value: 'attention-solid',
    displayValue: 'Attention Solid'
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
    value: 'bike',
    displayValue: 'Bike'
  },
  {
    value: 'bill-pay',
    displayValue: 'Bill Pay'
  },
  {
    value: 'calendar',
    displayValue: 'Calendar'
  },
  {
    value: 'calendar-plus',
    displayValue: 'Calendar Plus'
  },
  {
    value: 'camera',
    displayValue: 'Camera'
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
    value: 'cash',
    displayValue: 'Cash'
  },
  {
    value: 'chart',
    displayValue: 'Chart'
  },
  {
    value: 'check',
    displayValue: 'Check'
  },
  {
    value: 'check-skinny',
    displayValue: 'Check Skinny'
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
    value: 'clock',
    displayValue: 'Clock'
  },
  {
    value: 'close',
    displayValue: 'Close'
  },
  {
    value: 'close-skinny',
    displayValue: 'Close Skinny'
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
    value: 'desktop',
    displayValue: 'Desktop'
  },
  {
    value: 'document',
    displayValue: 'Document'
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
    value: 'education',
    displayValue: 'Education'
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
    value: 'health',
    displayValue: 'Health'
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
    value: 'import',
    displayValue: 'Import'
  },
  {
    value: 'info',
    displayValue: 'Info'
  },
  {
    value: 'investment',
    displayValue: 'Investment'
  },
  {
    value: 'key',
    displayValue: 'Key'
  },
  {
    value: 'link',
    displayValue: 'Link'
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
    value: 'map',
    displayValue: 'Map'
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
    displayValue: 'Credit (MD)'
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
    value: 'retirement',
    displayValue: 'Retirement'
  },
  {
    value: 'rocket',
    displayValue: 'Rocket'
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
    value: 'spinner',
    displayValue: 'Spinner'
  },
  {
    value: 'sync',
    displayValue: 'Sync'
  },
  {
    value: 'transfer',
    displayValue: 'Transfer'
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
    value: 'windows',
    displayValue: 'Windows'
  },
  {
    value: 'x-axis',
    displayValue: 'X Axis'
  },
  {
    value: 'y-axis',
    displayValue: 'Y Axis'
  }
];

module.exports = IconDocs;
