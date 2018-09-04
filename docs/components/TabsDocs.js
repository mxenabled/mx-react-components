const React = require('react');
const { Link } = require('react-router');

const { Tabs } = require('mx-react-components');

const Markdown = require('components/Markdown');

class TabsDocs extends React.Component {
  state = {
    selectedTab: 0
  };

  _handleTabSelect = (selectedTab) => {
    this.setState({
      selectedTab
    });
  };

  render () {
    const tabs = ['Donuts', 'Ice Cream', 'Bacon', 'Chicken'];

    return (
      <div>
        <h1>
          Tabs
          <label>A component to display tabs</label>
        </h1>

        <h3>Demo</h3>

        <Tabs
          onTabSelect={this._handleTabSelect}
          selectedTab={this.state.selectedTab}
          tabs={tabs}
        />

        <Tabs
          alignment='center'
          onTabSelect={this._handleTabSelect}
          selectedTab={this.state.selectedTab}
          tabs={tabs}
        />

        <Tabs
          onTabSelect={this._handleTabSelect}
          selectedTab={this.state.selectedTab}
          tabs={tabs}
          type='pill'
        />

        <h3>Usage</h3>

        <h5>activeTabStyles<label>Object</label></h5>
        <p>Styles for the active tab.</p>

        <h5>alignment<label>'left' or 'center'</label></h5>
        <p>Default: 'left'</p>
        <p>Tab alignment.</p>

        <h5>onTabSelect <label>Function</label></h5>
        <p><em>(required)</em> A function called when you click on a tab</p>

        <h5>selectedTab<label>Number</label></h5>
        <p>Default: 0</p>
        <p>A number representing the tab that has been selected. Tabs are ordered starting at 0.</p>

        <h5>showBottomBorder <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Value to set whether you want the bottom border displayed or not.</p>

        <h5>tabs <label>Array</label></h5>
        <p>Default: PRIMARY</p>
        <p><em>(required)</em> Array of values that you want respresented as tabs. Each item in the array should be a string. The "onTabClick" function will be called when you click on each one.</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>type <label>One of: ['standard', 'pill']</label></h5>
        <p>Default: standard</p>

        <h3>Example</h3>
        <Markdown>
          {`
            const tabs = ['Donuts', 'Ice Cream', 'Bacon', 'Chicken'];
            const _handleTabSelect = (selectedTab) => {
              this.setState({
                selectedTab
              });
             };

            ...

            <Tabs
              onTabSelect={this._handleTabSelect}
              selectedTab={this.state.selectedTab}
              tabs={tabs}
            />

            <Tabs
              alignment='center'
              onTabSelect={this._handleTabSelect}
              selectedTab={this.state.selectedTab}
              tabs={tabs}
            />

            <Tabs
              onTabSelect={this._handleTabSelect}
              selectedTab={this.state.selectedTab}
              tabs={tabs}
              type='pill'
            />
          `}
        </Markdown>
      </div>
    );
  }
}

module.exports = TabsDocs;
