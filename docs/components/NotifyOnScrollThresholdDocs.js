const React = require('react');

const { NotifyOnScrollThreshold } = require('mx-react-components');
const Markdown = require('components/Markdown');

class NotifyOnScrollThresholdDocs extends React.Component {
  constructor () {
    super();

    this.state = {
      listData: this._getMoreItems(),
      thresholdMet: false
    };
  }

  _getMoreItems = () => {
    const newItems = [];

    for (let i = 0; i < 25; i++) {
      newItems.push(Math.floor(Math.random() * 100));
    }

    return newItems;
  };

  _loadMoreData = () => {
    this.setState({
      listData: this.state.listData.concat(this._getMoreItems())
    });
  };

  render () {
    const styles = this.styles();

    return (
      <div>
        <h1>
          Notify On Scroll Threshold
          <label>
            A component that wraps scroll content and will notify its children and/or parent when a user
            has scrolled past the threshold provided.  It also exposes the scroll position
            and scroll height values to the children.
          </label>
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
                      <span>Threshold Met! <button onClick={this._loadMoreData}>Load More Data</button></span>
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
        <h5>children <label>Function</label></h5>
        <p>A function that receives thresholdMet, scrollPosition, and scrollHeight as arguments.</p>

        <h5>onThresholdMet <label>Function</label></h5>
        <p>Default: No Operation</p>
        <p>A function called when the threshold is met.</p>

        <h5>threshold <label>Number</label></h5>
        <p>Default: 0.9</p>
        <p>A number between 0 and 1 that respresents a percentage between 0% and 100%.</p>

        <h3>Example</h3>

        <p>
          Things to Note.
        </p>

        <ul>
          <li>The children of the component must be a function that returns jsx in the form of your choosing.</li>
          <li>The component takes an optional onThresholdMet callback prop that can also be used if the thresholdMet argument in the children function isn't adaquite for your needs.</li>
        </ul>

        <Markdown>
          {`
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
                    <span>Threshold Met! <button onClick={this._loadMoreData}>Load More Data</button></span>
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
  }

  styles = () => {
    return {
      scrollContainer: {
        border: '1px solid black',
        height: 200,
        padding: 10,
        position: 'relative',
        overflow: 'auto'
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
  };

}

module.exports = NotifyOnScrollThresholdDocs;
