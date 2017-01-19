const React = require('react');

const { NotifyOnScrollThreshold } = require('mx-react-components');
const Markdown = require('components/Markdown');

const NotifyOnScrollThresholdDocs = React.createClass({
  getInitialState () {
    return {
      listData: this._getMoreItems(),
      thresholdMet: false
    };
  },

  _getMoreItems () {
    const newItems = [];

    for (let i = 0; i < 25; i++) {
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
    const styles = this.styles();

    return (
      <div>
        <h1>
          Notify On Scroll Threshold
          <label>A wrapping component that will notify its children when a user has scrolled to the threshold provided.</label>
        </h1>

        <h3>Demo</h3>

        <p>Scroll to the bottom of the list. {this.state.thresholdMet && <span style={{ color: 'red' }}>Threshold Met</span>}</p>

        <div style={styles.scrollContainer}>
          <NotifyOnScrollThreshold
            onThresholdMet={() => {
              this.setState({ thresholdMet: !this.state.thresholdMet });
            }}
            threshold={0.8}
          >
            {(thresholdMet, scrollPosition, scrollHeight) => {
              return (
                <div>
                  {thresholdMet && (
                    <div style={Object.assign({}, styles.thresholdMessage, { top: scrollHeight - 75 })}>
                      <span>Threshold hit! <button onClick={this._loadMoreData}>Load More Data</button></span>
                    </div>
                  )}
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
        <h5>threshold <label>Number</label></h5>
        <p>Default: 0.9</p>
        <p>A number between 0 and 1 that respresents a percentage between 0% and 100%</p>

        <h3>Example</h3>

        <p>
          NotifyOnScrollThreshold is a "function as children" component.
          As you can see from the example below.  You pass a function in the form of a child
          component.  This function is called and passed the three arguments thresholdMet,
          scrollPosition, and scrollHeight.  These aregument can then be used to conditionally
          render jsx, be passed along to other component function calls, or passed down as props
          to other child components.
        </p>

        <Markdown>
          {`
      <div style={styles.scrollContainer}>
        <NotifyOnScrollThreshold
          threshold={0.8}
        >
          {(thresholdMet, scrollPosition, scrollHeight) => {
            return (
              <div>
                {thresholdMet && (
                  <div style={Object.assign({}, styles.thresholdMessage, { top: scrollHeight - 75 })}>
                    <span>Threshold hit! <button onClick={this._loadMoreData}>Load More Data</button></span>
                  </div>
                )}
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
          `}
        </Markdown>
      </div>
    );
  },

  styles () {
    return {
      scrollContainer: {
        border: '1px solid black',
        height: 200,
        padding: 10,
        position: 'relative',
        overflow: 'scroll'
      },
      thresholdMessage: {
        backgroundColor: 'lightgrey',
        border: '1px solid black',
        left: '50%',
        padding: 10,
        position: 'absolute',
        transform: 'translateX(-50%)'
      }
    };
  }
});

module.exports = NotifyOnScrollThresholdDocs;