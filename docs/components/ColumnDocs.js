const React = require('react');

const { Row, Column, Styles } = require('mx-react-components');

const Markdown = require('components/Markdown');

class ColumnDocs extends React.Component {
  render () {
    const styles = this.styles();

    return (
      <div>
        <h1>
          Row
          <label>A row component used to wrap a Column for a response grid.</label>
        </h1>

        <h3>Demo</h3>
        <div className='flex'>
          <Row>
            <Column columnLarge={6}>
              <div style={styles.responsiveDiv}>First Column</div>
            </Column>
            <Column columnLarge={6}>
              <div style={styles.responsiveDiv}>Second Column</div>
            </Column>
          </Row>
        </div>

        <h3>Usage</h3>
        <h5>WARNING: This component requires the Bootstrap grid system.  You must have the bootstrap css file linked in your application.</h5>

        <h5>children <label>Node</label></h5>
        <p>This should be one or more {`
            <Column />
        `} nodes to be displayed.</p>

        <h5>relative <label>Boolean</label></h5>
        <p>Default: true</p>
        <p>Determines if the column is positioned relative or not.</p>

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
  }

  styles = () => {
    return {
      responsiveDiv: {
        boxSizing: 'border-box',
        backgroundColor: Styles.Colors.GRAY_100,
        border: '1px solid' + Styles.Colors.GRAY_300,
        borderRadius: 3,
        padding: 10,
        width: '100%'
      }
    };
  };
}

module.exports = ColumnDocs;
