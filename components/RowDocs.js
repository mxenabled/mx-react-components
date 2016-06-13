const React = require('react');

const { Row, Column, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

const RowDocs = React.createClass({
  render () {
    const styles = this.styles();

    return (
      <div>
        <h1>
          Row & Column
          <label>Row and column components to be used in a response grid.</label>
        </h1>

        <h3>Demo</h3>
        <div style={styles.container}>
          <Row>
            <Column columnLarge={6} style={styles.column}>
              <div style={styles.responsiveDiv}>First Column</div>
            </Column>
            <Column columnLarge={6} style={styles.column}>
              <div style={styles.responsiveDiv}>Second Column</div>
            </Column>
          </Row>
        </div>

        <h3>Row Usage</h3>

        <h5>style <label>Object</label></h5>
        <p>A style object used to style the div that wraps the uploader&#39;s content</p>

        <h5>children <label>Node</label></h5>
        <p>This should be one or more {`
            <Column />
        `} nodes to be displayed.</p>

        <h3>Column Usage</h3>

        <h5>breakpoint*<label>Number</label></h5>
        <p>A number representing the screen width (greater than or equal to) at which to display the corresponding content.</p>
        <p>Defaults:</p>
        <ul>
          <li>*Large: 1200</li>
          <li>*Medium: 750</li>
        </ul>


        <h5>columnCount <label>Number</label></h5>
        <p>A number representing the number of columns to diplay. Default: 12</p>

        <h5>children <label>Node</label></h5>
        <p>This should be one or more {`
            <Column />
        `} nodes to be displayed.</p>

        <h3>Example</h3>
        <Markdown>
          {`
            <Row>
              <Column columnLarge={6}>
                <div style={styles.responsiveDiv}>First Column</div>
              </Column>
            </Row>
          `}
        </Markdown>
      </div>
    );
  },

  styles () {
    return {
      container: {
        width: '100%'
      },
      column: {
        marginBottom: 10
      },
      responsiveDiv: {
        boxSizing: 'border-box',
        backgroundColor: Styles.Colors.PORCELAIN,
        border: '1px solid' + Styles.Colors.FOG,
        borderRadius: 3,
        padding: 10,
        width: '100%'
      }
    };
  }
});

module.exports = RowDocs;
