const React = require('react')

const { Icon } = require('mx-react-components')

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="hero">
          <h1>MX React Components</h1>
          <p>A lightweight, ReactJS based ui kit for developing web-based applications.</p>
          <code>npm install mx-react-components</code>
        </div>
        <div className="features">
          <div className="container">
            <h1>Features</h1>
            <div className="flex">
              <div className="feature">
                <img src="images/react-logo.png" />
                <h2>ReactJS</h2>
                <p>
                  We are huge advocates of ReactJS at MX. Our ui kit is built using React and is
                  intended to be used in React based web projects.
                </p>
              </div>
              <div className="feature">
                <Icon size={60} type="gear" />
                <h2>Customizable</h2>
                <p>
                  The ui kit comes pre-designed to match the MX product style, but each component
                  can be customized to fit your needs.
                </p>
              </div>
              <div className="feature">
                <Icon size={60} type="mobile-phone" />
                <h2>Responsive</h2>
                <p>
                  All of our components have been designed and built to provide a consistent
                  experience across mobile, tablet, and desktop devices.
                </p>
              </div>
              <div className="feature">
                <img src="images/radium-logo.png" />
                <h2>Radium</h2>
                <p>
                  We use Radium for inline css styles that are scoped to each component and prevent
                  conflicts with other component or global styles.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="contribute">
          <div className="container">
            <h1>Contribute</h1>

            <h3>Fork the repo</h3>
            <p>The repo can be found at https://github.com/mxenabled/mx-react-components</p>

            <h3>Install the node modules</h3>
            <p>
              You may need to install some modules like babel and esw globally so you have access to
              their cli&#39;s.
            </p>
            <p>
              <code>npm install</code>
            </p>

            <h3>Run the dev server</h3>
            <p>
              Running the development server allows you to test your changes in the docs. This
              includes changes to the docs themselves.
            </p>
            <p>
              <code>npm run dev</code>
            </p>

            <h3>Make changes</h3>
            <p>You should only need to edit the files in the "src" directory.</p>

            <h3>Update Documentation</h3>
            <p>Update thes docs folder with any relevant changes included in your PR.</p>

            <h3>Run ESLint</h3>
            <p>Before you push up your code to a PR, make sure it passes our ESLint tests.</p>
            <p>
              <code>eslint src</code>
            </p>

            <h3>Commit changes and create PR</h3>
            <p>
              After you submit a PR against the main repo, someone from our team will review the
              changes and either request edits or merge it in.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Home
