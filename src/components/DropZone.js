const React = require('react');
const Radium = require('Radium');
const numeral = require('numeral');

const StyleConstants = require('../constants/Style');

const Button = require('./Button');

const DropZone = React.createClass({
  propTypes: {
    onFileAdd: React.PropTypes.func,
    onFileRemove: React.PropTypes.func,
    uploadedFile: React.PropTypes.any
  },

  getInitialState () {
    return {
      dragging: false,
      imageSource: null
    };
  },

  componentDidMount () {
    window.addEventListener('mouseover', this._handleMouseOver);
    window.addEventListener('mouseout', this._handleMouseOut);
  },

  componentWillUnmount () {
    window.removeEventListener('mouseover', this._handleMouseOver);
    window.removeEventListener('mouseout', this._handleMouseOut);
  },

  _handleMouseOver (e) {
    if (e.buttons === 1) {
      this.setState({
        dragging: true
      });
    }
  },

  _handleMouseOut () {
    this.setState({
      dragging: false
    });
  },

  _handleFileSelect (e) {
    const file = e.target.files[0];

    this._processFile(file);
  },

  _onDragOver (e) {
    e.stopPropagation();
    e.preventDefault();
  },

  _onDrop (e) {
    e.stopPropagation();
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    this._processFile(file);
  },

  _onDropzoneClick () {
    this.refs.hiddenInput.click();
  },

  _processFile (file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
      this.setState({
        dragging: false,
        imageSource: reader.result
      });
      this.props.onFileAdd(file);
    }.bind(this);
  },

  _removeImage (e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      imageSource: null
    });
    this.props.onFileRemove();
  },

  render () {
    return (
      <div
        onClick={this._onDropzoneClick}
        onDragOver={this._onDragOver}
        onDrop={this._onDrop}
        style={[styles.dropzone, this.state.dragging && styles.dragging, this.props.uploadedFile && styles.dropzoneLoaded]}
      >
        {this.props.uploadedFile ? (
          <div style={styles.fileInfo}>
            <img src={this.state.imageSource} style={styles.previewImage} />
            <div>{this.props.uploadedFile.name}</div>
            <div>{numeral(this.props.uploadedFile.size / 1000).format('0.0')}k</div>
            <Button icon='delete' onClick={this._removeImage} style={styles.button} type='secondary' />
          </div>
        ) : (
          <div>Drag and drop files here or click to browse</div>
        )}
        <input
          name='files'
          onChange={this._handleFileSelect}
          ref='hiddenInput'
          style={styles.hiddenInput}
          type='file'
        />
      </div>
    );
  }
});

const styles = {
  dropzone: {
    fontSize: StyleConstants.FontSizes.MEDIUM,
    fontFamily: StyleConstants.Fonts.REGULAR,
    textAlign: 'center',
    position: 'relative',
    borderRadius: 3,
    padding: 40,
    color: StyleConstants.Colors.ASH,
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    border: '1px solid ' + StyleConstants.Colors.FOG
  },
  dragging: {
    backgroundColor: StyleConstants.Colors.WHITE,
    border: '1px dashed ' + StyleConstants.Colors.PRIMARY
  },
  dropzoneLoaded: {
    padding: 20
  },
  hiddenInput: {
    visibility: 'hidden',
    position: 'absolute'
  },
  fileIcon: {
    color: StyleConstants.Colors.ASH
  },
  fileInfo: {
    fontSize: StyleConstants.FontSizes.SMALL,
    lineHeight: '1.2em',
    textAlign: 'center'
  },
  previewImage: {
    maxWidth: '90%',
    marginBottom: 10
  },
  button: {
    marginTop: 10
  }
};

module.exports = Radium(DropZone);
