const React = require('react');
const { Link } = require('react-router');

const { Icon } = require('mx-react-components');

const Header = React.createClass({
  render () {
    return (
      <div style={styles.component}>
        <Icon size={70} type='mx' />

        <nav style={styles.nav}>
          <Link style={styles.navLink} to='home'>Home</Link>
          <Link style={styles.navLink} to='components'>Components</Link>
        </nav>
      </div>
    );
  }
});

const styles = {
  component: {
    position: 'relative',
    margin: '0 auto',
    width: '90%',
    maxWidth: '1200px'
  },
  nav: {
    position: 'absolute',
    right: '20px',
    top: 0,
    lineHeight: '70px'
  },
  navLink: {
    marginLeft: '20px',
    textTransform: 'uppercase'
  }
};

module.exports = Header;