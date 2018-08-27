const React = require('react');

const { Button, Column, Container, Row, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

class RowDocs extends React.Component {
  render () {
    const styles = this.styles();

    return (
      <div>
        <h1>
          Column, Container and Row
          <label>Column, Container and Row components to be used in a response grid.</label>
        </h1>

        <h3>Demo</h3>
        <div style={styles.container}>
          <Container>
            <Row>
              <Column
                offset={{ medium: 3 }}
                span={{ large: 6, medium: 9 }}
              >
                <div style={styles.responsiveDiv}>First Column</div>
              </Column>
              <Column
                span={{ large: 6, medium: 6 }}
              >
                <div style={styles.responsiveDiv}>Second Column</div>
              </Column>
              <Column
                span={{ large: 6, medium: 6 }}
              >
                <div style={styles.responsiveDiv}>Third Column</div>
              </Column>
              <Column
                breakpoints={{ large: 1000 }}
                span={{ large: 6, medium: 12 }}
              >
                <div style={styles.responsiveDiv}>Fourth Column</div>
              </Column>
              <Column
                offset={{ large: 10, medium: 4 }}
                span={{ large: 2, medium: 4 }}
              >
                <Button style={styles.responsiveButton}>Save</Button>
              </Column>
            </Row>
          </Container>
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
          <li>Large: 17% width, 83% offset</li>
          <li>Medium: 33% width, 33% offset</li>
          <li>Small: 100% width</li>
        </ul>

        <h3>Container Usage</h3>
        <h5>fluid <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>When set to true, fluid sets the container to use 100% width across all viewport and device sizes, rather than using a responsive pixel width. See <a href='https://getbootstrap.com/docs/4.0/layout/grid/'>bootstrap grid docs</a> for more details.</p>

        <h5>styles <label>Object</label></h5>
        <p>A style object that allows you to override any style attribute in the component.</p>

        <h3>Column Usage</h3>
        <h5>children <label>Node</label></h5>
        <p>The content to be displayed in the column.</p>

        <h5>offset <label>Object</label></h5>
        <p>Shape and defaults: {`
          { large: 0, medium: 0, small: 0 }
        `}</p>
        <p>A number representing the offset of columns at which to display the enclosed content, based on the columnCount.</p>

        <h5>relative <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Determines if the column is positioned relative or not.</p>

        <h5>span<label>Object</label></h5>
        <p>Shape and defaults: {`
          { large: 12, medium: 12, small: 12 }
          `}</p>
        <p>A number representing the columns span at which to display the enclosed content, based on the columnCount. If set to 0, the column will be hidden.</p>

        <h3>Row Usage</h3>
        <h5>WARNING: This component requires the Bootstrap grid system.  You must have the bootstrap css file linked in your application.</h5>

        <h5>children <label>Node</label></h5>
        <p>This should be one or more {`
            <Column />
        `} nodes to be displayed.</p>
/
        <h3>Example</h3>
        <Markdown>
          {`
            <Container>
              <Row>
                <Column
                  offset={{ medium: 3 }}
                  span={{ large: 6, medium: 9 }}
                >
                  <div style={styles.responsiveDiv}>First Column</div>
                </Column>
                <Column
                  span={{ large: 6, medium: 6 }}
                >
                  <div style={styles.responsiveDiv}>Second Column</div>
                </Column>
                <Column
                  span={{ large: 6, medium: 6 }}
                >
                  <div style={styles.responsiveDiv}>Third Column</div>
                </Column>
                <Column
                  breakpoints={{ large: 1000 }}
                  span={{ large: 6, medium: 12 }}
                >
                  <div style={styles.responsiveDiv}>Fourth Column</div>
                </Column>
                <Column
                  offset={{ large: 10, medium: 4 }}
                  span={{ large: 2, medium: 4 }}
                >
                  <Button style={styles.responsiveButton}>Save</Button>
                </Column>
              </Row>
            </Container>
          `}
        </Markdown>
      </div>
    );
  }

  styles = () => {
    return {
      container: {
        width: '100%'
      },
      responsiveDiv: {
        boxSizing: 'border-box',
        backgroundColor: Styles.Colors.GRAY_100,
        border: '1px solid' + Styles.Colors.GRAY_300,
        borderRadius: 3,
        marginBottom: 10,
        padding: 10,
        width: '100%'
      },
      responsiveButton: {
        width: '100%'
      }
    };
  };
}

module.exports = RowDocs;
