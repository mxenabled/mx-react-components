const React = require('react');

const { NotifyOnScrollThreshold } = require('mx-react-components');

const NotifyOnScrollThresholdDocs = React.createClass({
  getInitialState () {
    return {
      listData: this._getMoreItems()
    };
  },

  _getMoreItems () {
    const newItems = [];

    for (let i = 0; i < 20; i++) {
      newItems.push(Math.floor(Math.random() * 100));
    }

    return newItems;
  },

  _loadMoreData () {
    this.setState({
      listData: this.state.listData.concat(this._getMoreItems())
    });
  },

  render () {
    return (
      <div>
        <h1>
          Notify On Scroll Threshold
          <label>A wrapping component that will notify its children when a user has scrolled to the threshold provided.</label>
        </h1>

        <h3>Demo</h3>

        <div style={{ border: '1px solid black', height: 200, overflow: 'scroll', padding: 10 }}>
          <NotifyOnScrollThreshold
            threshold={0.8}
          >
            {(thresholdMet) => {
              return (
                <div>
                  {thresholdMet && (
                    <div style={{ backgroundColor: 'lightgrey', padding: 10, position: 'absolute' }}>
                      Threshold hit! <button onClick={this._loadMoreData}>Load More Data?</button>
                    </div>
                  )}
                  Scroll to the bottom of the list.
                  <ul>
                    {this.state.listData.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
              );
            }}
          </NotifyOnScrollThreshold>
        </div>

        <h3>Usage</h3>

        <h3>Example</h3>
      </div>
    );
  }
});

module.exports = NotifyOnScrollThresholdDocs;