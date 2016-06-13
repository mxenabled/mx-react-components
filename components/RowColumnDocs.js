const React = require('react');

const { Button, Column, Row, Styles } = require('mx-react-components');

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
            <Column
              columnLarge={6}
              columnMedium={9}
              offsetMedium={3}
              style={styles.column}
            >
              <div style={styles.responsiveDiv}>First Column</div>
            </Column>
            <Column
              columnLarge={6}
              columnMedium={6}
              style={styles.column}
            >
              <div style={styles.responsiveDiv}>Second Column</div>
            </Column>
            <Column
              columnLarge={6}
              columnMedium={6}
              style={styles.column}
            >
              <div style={styles.responsiveDiv}>Third Column</div>
            </Column>
            <Column
              breakpointLarge={1000}
              columnLarge={6}
              columnMedium={12}
              style={styles.column}
            >
              <div style={styles.responsiveDiv}>Fourth Column</div>
            </Column>
            <Column
              columnLarge={2}
              columnMedium={4}
              offsetLarge={10}
              offsetMedium={4}
              orderLarge={-1}
              style={styles.column}
            >
              <Button style={styles.responsiveButton}>Save</Button>
            </Column>
          </Row>
        </div>

        <h3>Responsive Behavior</h3>
        <Row>
          <Column columnLarge={4} columnMedium={6}>
            <label>First column:</label>
            <ul>
              <li>Large: 50% width</li>
              <li>Medium: 66% width, 33% offset</li>
              <li>Small: 100% width (default)</li>
            </ul>
          </Column>
          <Column columnLarge={4} columnMedium={6}>
            <label>Second column:</label>
            <ul>
              <li>Large: 50% width</li>
              <li>Medium: 50% width</li>
              <li>Small: 100% width (default)</li>
            </ul>
          </Column>
          <Column columnLarge={4} columnMedium={6}>
            <label>Third column:</label>
            <ul>
              <li>Large: 50% width</li>
              <li>Medium: 50% width</li>
              <li>Small: 100% width (default)</li>
            </ul>
          </Column>
          <Column columnLarge={4} columnMedium={6}>
            <label>Fourth column:</label>
            <ul>
              <li>Large: 50% width</li>
              <li>Medium: 100% width, large breakpoint of 1000px</li>
              <li>Small: 100% width (default)</li>
            </ul>
          </Column>
          <Column columnLarge={4} columnMedium={6} orderLarge={-1}>
            <label>Button:</label>
            <ul>
              <li>Large: 17% width, 83% offset, first in order</li>
              <li>Medium: 33% width, 33% offset, last in order</li>
              <li>Small: 100% width, last in order (default)</li>
            </ul>
          </Column>
        </Row>

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

        <h5>column*<label>Number</label></h5>
        <p>A number representing the columns span at which to display the enclosed content, based on the columnCount.</p>
        <p>Defaults:</p>
        <ul>
          <li>*Large: 12</li>
          <li>*Medium: 12</li>
          <li>*Small: 12</li>
        </ul>

        <h5>offset*<label>Number</label></h5>
        <p>A number representing the offset of columns at which to display the enclosed content, based on the columnCount.</p>
        <p>Defaults:</p>
        <ul>
          <li>*Large: 12</li>
          <li>*Medium: 12</li>
          <li>*Small: 12</li>
        </ul>

        <h5>order*<label>Number</label></h5>
        <p>A number representing the order of columns at which to display the enclosed content. Can be a negative number to rise to the top.</p>
        <p>Defaults to the element order</p>

        <h5>style <label>Object</label></h5>
        <p>A style object used to style the div that wraps the uploader&#39;s content</p>


        <h5>children <label>Node</label></h5>
        <p>The content to be displayed in the column</p>

        <h3>Example</h3>
        <Markdown>
          {`
            <Row>
              <Column
                columnLarge={6}
                columnMedium={9}
                offsetMedium={3}
                style={styles.column}
              >
                <div>First Column</div>
              </Column>
              <Column
                columnLarge={6}
                columnMedium={6}
                style={styles.column}
              >
                <div>Second Column</div>
              </Column>
              <Column
                columnLarge={6}
                columnMedium={6}
                style={styles.column}
              >
                <div}>Third Column</div>
              </Column>
              <Column
                breakpointMedium={1000}
                columnLarge={6}
                columnMedium={12}
                style={styles.column}
              >
                <div>Fourth Column</div>
              </Column>
              <Column
                columnLarge={2}
                offsetLarge={10}
                orderLarge={-1}
                style={styles.column}
              >
                <Button>Save</Button>
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
      },
      responsiveButton: {
        width: '100%'
      }
    };
  }
});

module.exports = RowDocs;
