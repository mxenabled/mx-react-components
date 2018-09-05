// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');

// const { Config } = require('mx-react-components');

// const Markdown = require('components/Markdown');


export const ConfigDocs = () => {
  return (
    <div>
      <h1>
        Config
        <label>Contains various configuration values or functions</label>
      </h1>

      <h3>Usage</h3>
      <h5>setDefaultTimeZone <label>String</label></h5>
      <p>Default: user's local timezone</p>
      <p>Will set the default timezone for moment.js across all components. This is useful if you do not want moment's usual default of user's local timezone.</p>
      <p>See <a href='https://momentjs.com/timezone/docs/#/using-timezones/default-timezone/'>moment docs</a> for more information.</p>
    </div>
  );
};
