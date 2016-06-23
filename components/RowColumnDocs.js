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
              offset={{ medium: 3 }}
              span={{ large: 6, medium: 9 }}
              style={styles.column}
            >
              <div style={styles.responsiveDiv}>First Column</div>
            </Column>
            <Column
              span={{ large: 6, medium: 6 }}
              style={styles.column}
            >
              <div style={styles.responsiveDiv}>Second Column</div>
            </Column>
            <Column
              span={{ large: 6, medium: 6 }}
              style={styles.column}
            >
              <div style={styles.responsiveDiv}>Third Column</div>
            </Column>
            <Column
              breakpoints={{ large: 1000 }}
              span={{ large: 6, medium: 12 }}
              style={styles.column}
            >
              <div style={styles.responsiveDiv}>Fourth Column</div>
            </Column>
            <Column
              offset={{ large: 10, medium: 4 }}
              order={{ large: -1 }}
              span={{ large: 2, medium: 4 }}
              style={styles.column}
            >
              <Button style={styles.responsiveButton}>Save</Button>
            </Column>
          </Row>
        </div>

        <h3>Responsive Behavior</h3>

        <label>First column:</label>
        <ul>
          <li>Large: 50% width</li>
          <li>Medium: 66% width, 33% offset</li>
          <li>Small: 100% width (default)</li>
        </ul>

        <label>Second column:</label>
        <ul>
          <li>Large: 50% width</li>
          <li>Medium: 50% width</li>
          <li>Small: 100% width (default)</li>
        </ul>

        <label>Third column:</label>
        <ul>
          <li>Large: 50% width</li>
          <li>Medium: 50% width</li>
          <li>Small: 100% width (default)</li>
        </ul>

        <label>Fourth column:</label>
        <ul>
          <li>Large: 50% width</li>
          <li>Medium: 100% width, large breakpoint of 1000px</li>
          <li>Small: 100% width (default)</li>
        </ul>

        <label>Button:</label>
        <ul>
          <li>Large: 17% width, 83% offset, first in order</li>
          <li>Medium: 33% width, 33% offset, last in order</li>
          <li>Small: 100% width, last in order (default)</li>
        </ul>

        <h3>Row Usage</h3>

        <h5>style <label>Object</label></h5>
        <p>A style object used to style the div that wraps the uploader&#39;s content</p>

        <h5>children <label>Node</label></h5>
        <p>This should be one or more {`
            <Column />
        `} nodes to be displayed.</p>

        <h3>Column Usage</h3>

        <h5>breakpoints<label>Object</label></h5>
        <p>Shape and defaults: {`
            { large: 1200, medium: 750, small: 320 }
        `}</p>
        <p>A number representing the screen width (greater than or equal to) at which to display the corresponding content.</p>


        <h5>columnCount <label>Number</label></h5>
        <p>A number representing the number of columns to diplay. Default: 12</p>

        <h5>offset<label>Object</label></h5>
        <p>Shape and defaults: {`
          { large: 0, medium: 0, small: 0 }
        `}</p>
        <p>A number representing the offset of columns at which to display the enclosed content, based on the columnCount.</p>

        <h5>order<label>Number</label></h5>
        <p>Shape: {`
          { large: -1, medium: -2, small: -3 }
        `}</p>
        <p>A number representing the order of columns at which to display the enclosed content. Can be a negative number to rise to the top.</p>
        <p>Defaults to the element order</p>

        <h5>span<label>Object</label></h5>
        <p>Shape and defaults: {`
          { large: 12, medium: 12, small: 12 }
        `}</p>
        <p>A number representing the columns span at which to display the enclosed content, based on the columnCount. If set to 0, the column will be hidden.</p>


        <h5>style <label>Object</label></h5>
        <p>A style object used to style the div that wraps the uploader&#39;s content</p>

        <h5>children <label>Node</label></h5>
        <p>The content to be displayed in the column</p>

        <h3>Example</h3>
        <Markdown>
          {`
            <Row>
              <Column
                offset={{ medium: 3 }}
                span={{ large: 6, medium: 9 }}
                style={styles.column}
              >
                <div style={styles.responsiveDiv}>First Column</div>
              </Column>
              <Column
                span={{ large: 6, medium: 6 }}
                style={styles.column}
              >
                <div style={styles.responsiveDiv}>Second Column</div>
              </Column>
              <Column
                span={{ large: 6, medium: 6 }}
                style={styles.column}
              >
                <div style={styles.responsiveDiv}>Third Column</div>
              </Column>
              <Column
                breakpoints={{ large: 1000 }}
                span={{ large: 6, medium: 12 }}
                style={styles.column}
              >
                <div style={styles.responsiveDiv}>Fourth Column</div>
              </Column>
              <Column
                offset={{ large: 10, medium: 4 }}
                order={{ large: -1 }}
                span={{ large: 2, medium: 4 }}
                style={styles.column}
              >
                <Button style={styles.responsiveButton}>Save</Button>
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
