const React = require('react')

const { Icon, Spin } = require('mx-react-components')

const Markdown = require('components/Markdown')

class SpinDocs extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Spin
          <label>
            A component used to rotate an element 360 degrees at a specified interval using CSS
            animations.
          </label>
        </h1>

        <h3>Demo</h3>
        <Spin>
          <Icon
            size={50}
            style={{
              transform: 'rotateX(180deg)',
            }}
            type="sync"
          />
        </Spin>

        <h3>Usage</h3>
        <h5>
          children <label>Node</label>
        </h5>
        <p>An element that you wish to spin.</p>

        <h5>
          direction <label>String</label>
        </h5>
        <p>Default: 'clockwise'</p>
        <p>The direction of the spin. Available Options: counterclockwise, clockwise.</p>

        <h5>
          speed <label>Number</label>
        </h5>
        <p>Default: 1000</p>
        <p>The time it takes the element to make 1 full rotation in milliseconds.</p>

        <h3>Example</h3>
        <Markdown>
          {`
            <Spin>
              <Icon
                size={50}
                type='sync'
              />
            </Spin>
          `}
        </Markdown>
      </div>
    )
  }
}

module.exports = SpinDocs
