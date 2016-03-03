const numeral = require('numeral');
const Radium = require('Radium');
const React = require('react');

const StyleConstants = require('../constants/Style');

const Button = require('./Button');
const Icon = require('./Icon');

const FileUpload = React.createClass({
  propTypes: {
    allowedfileTypes: React.PropTypes.array,
    maxFileSize: React.PropTypes.number,
    onFileAdd: React.PropTypes.func,
    onFileRemove: React.PropTypes.func,
    uploadedFile: React.PropTypes.any
  },

  getInitialState () {
    return {
      dragging: false,
      imageSource: null,
      invalidMessage: null
    };
  },

  _handleFileSelect (e) {
    const file = e.target.files[0];

    if (file) {
      this._processFile(file);
    }
  },

  _onDragOver (e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      dragging: true,
      invalidMessage: null
    });
  },

  _onDragLeave (e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      dragging: false
    });
  },

  _onDrop (e) {
    e.stopPropagation();
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    this._processFile(file);
  },

  _onDropzoneClick () {
    this._input.click();
  },

  _processFile (file) {
    const isTooBig = this.props.maxFileSize < file.size / 1000;
    const isInvalidType = this.props.allowedfileTypes.indexOf(file.type) < 0;

    if (isTooBig || isInvalidType) {
      const invalidMessage = isTooBig ? 'This file exceeds maximum size of ' + this.props.maxFileSize + 'k' : 'This file type is not accepted';

      this.setState({
        dragging: false,
        imageSource: null,
        invalidMessage
      });
      this.props.onFileRemove();
    } else {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const imageSource = file.type.match('image*') ? reader.result : null;

        this.setState({
          dragging: false,
          imageSource,
          invalidMessage: null
        });
        this.props.onFileAdd(file);
      };
    }
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
        onDragLeave={this._onDragLeave}
        onDragOver={this._onDragOver}
        onDrop={this._onDrop}
        style={[styles.dropzone, this.state.dragging && styles.dragging, this.props.uploadedFile && styles.dropzoneLoaded]}
      >

        {this.props.uploadedFile ? (
          <div style={styles.fileInfo}>
            {this.state.imageSource ? (
              <img src={this.state.imageSource} style={styles.previewImage} />
            ) : (
              <Icon size={60} style={styles.documentIcon} type='document' />
            )}
            <div>{this.props.uploadedFile.name}</div>
            <div>{numeral(this.props.uploadedFile.size / 1000).format('0.0')}k</div>
            <Button icon='delete' onClick={this._removeImage} style={styles.button} type='secondary' />
          </div>
        ) : (
          <div style={styles.dropzoneChild}>
            {this.state.dragging ? (
              <div style={[styles.centered, styles.draggingText]}>
                <Icon size={60} style={styles.importIcon} type='import' />
                <div>Drop file here to upload</div>
              </div>
            ) : (
              <div style={styles.centered}>
              {this.state.invalidMessage ? <div style={styles.invalidMessage}>{this.state.invalidMessage}</div> : null}
              <div>Drag and drop files here or click to browse</div>
              </div>
            )}
          </div>
        )}
        <input
          name='files'
          onChange={this._handleFileSelect}
          ref={(ref) => (this._input = ref)}
          style={styles.hiddenInput}
          type='file'
        />
      </div>
    );
  }
});

const styles = {
  dropzone: {
    backgroundColor: StyleConstants.Colors.PORCELAIN,
    border: '1px solid ' + StyleConstants.Colors.FOG,
    borderRadius: 3,
    color: StyleConstants.Colors.ASH,
    fontFamily: StyleConstants.Fonts.REGULAR,
    fontSize: StyleConstants.FontSizes.MEDIUM,
    height: 100,
    position: 'relative'
  },
  hiddenInput: {
    position: 'absolute',
    visibility: 'hidden'
  },

  // Dragging Styles
  dragging: {
    backgroundColor: StyleConstants.Colors.WHITE,
    border: '1px dashed ' + StyleConstants.Colors.PRIMARY,
    height: 150
  },
  importIcon: {
    color: StyleConstants.Colors.PRIMARY
  },
  draggingText: {
    color: StyleConstants.Colors.PRIMARY,
    fontFamily: StyleConstants.Fonts.SEMIBOLD,
    fontSize: StyleConstants.FontSizes.LARGE
  },

  // Loaded Styles
  dropzoneLoaded: {
    height: 'auto',
    padding: 20
  },
  previewImage: {
    marginBottom: 10,
    maxWidth: '90%'
  },
  documentIcon: {
    color: StyleConstants.Colors.ASH
  },
  button: {
    marginTop: 10
  },

  // Dropzone Text
  dropzoneChild: {
    height: '100%',
    pointerEvents: 'none'
  },
  centered: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  invalidMessage: {
    fontSize: StyleConstants.FontSizes.LARGE,
    marginBottom: 10
  }
};

module.exports = Radium(FileUpload);
