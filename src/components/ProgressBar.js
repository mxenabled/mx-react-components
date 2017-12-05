const PropTypes = require('prop-types')
const React = require('react')
const _merge = require('lodash/merge')

const { themeShape } = require('../constants/App')

const StyleUtils = require('../utils/Style')

class ProgressBar extends React.Component {
  static propTypes = {
    baseColor: PropTypes.string,
    height: PropTypes.number,
    percentage: PropTypes.number,
    progressColor: PropTypes.string,
    styles: PropTypes.object,
    theme: themeShape,
  }

  static defaultProps = {
    height: 10,
  }

  render() {
    const theme = StyleUtils.mergeTheme(this.props.theme)
    const styles = this.styles(theme)

    return (
      <div style={styles.component}>
        <div style={styles.progress}>{this.props.children}</div>
      </div>
    )
  }

  styles = theme => {
    const baseColor = this.props.baseColor || theme.Colors.GRAY_300
    const progressColor = this.props.progressColor || theme.Colors.PRIMARY

    return _merge(
      {},
      {
        component: {
          backgroundColor: baseColor,
          borderRadius: this.props.height / 4,
          height: this.props.height,
        },
        progress: {
          backgroundColor: progressColor,
          borderRadius: this.props.height / 4,
          height: this.props.height,
          width: this.props.percentage > 100 ? '100%' : this.props.percentage + '%',
        },
      },
      this.props.styles,
    )
  }
}

module.exports = ProgressBar
