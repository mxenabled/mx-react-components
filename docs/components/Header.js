const React = require('react')
const { Link } = require('react-router')

const { Icon } = require('mx-react-components')

class Header extends React.Component {
  render() {
    return (
      <div style={styles.component}>
        <Link to="/">
          <Icon size={70} type="mx" />
        </Link>

        <nav style={styles.nav}>
          <Link style={styles.navLink} to="/">
            Home
          </Link>
          <Link style={styles.navLink} to="/components/">
            Change Log
          </Link>
          <Link style={styles.navLink} to="/components">
            Components
          </Link>
          <a href="http://github.com/mxenabled/mx-react-components" style={styles.navLink}>
            Github
          </a>
        </nav>
      </div>
    )
  }
}

const styles = {
  component: {
    position: 'relative',
    margin: '0 auto',
    width: '90%',
    maxWidth: '1200px',
  },
  nav: {
    position: 'absolute',
    right: '20px',
    top: 0,
    lineHeight: '70px',
  },
  navLink: {
    marginLeft: '20px',
    textTransform: 'uppercase',
  },
}

module.exports = Header
