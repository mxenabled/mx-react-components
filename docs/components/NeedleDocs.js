const React = require('react');

const { Needle } = require('mx-react-components');

const Markdown = require('components/Markdown');

const NeedleDocs = React.createClass({
  render () {
    return (
      <div>
        <h1>
            Needle
          <label>The Needle is a new component used to indicate a UI element the user should interact with
            next.
            An example use case would be: a first-time user coming to a Goals app but hasn't added any goals
            yet.
          </label>
        </h1>

        <h3>Demo</h3>


        <Needle direction='up' />

        <span style={{ margin: '0 50px' }} />

        <Needle direction='down' />

        <span style={{ margin: '0 50px' }} />

        <Needle direction='left' />

        <span style={{ margin: '0 50px' }} />

        <Needle direction='right' />

        <h3>Usage</h3>

        <h5>direction <label>String</label></h5>
        <p>The direction of the Needle. Available Options:  up,  down,  left,  right. Default:
        'up'</p>

        <h3>Example</h3>
        <Markdown>
        { `
        <Needle direction="up" />

        <Needle direction="down" />

        <Needle direction="left" />

        <Needle direction="right" />
        `}
        </Markdown>
      </div>
    );
  }
});

module.exports = NeedleDocs;
