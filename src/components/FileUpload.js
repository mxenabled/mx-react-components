const numeral = require('numeral');
const Radium = require('radium');
const React = require('react');

const StyleConstants = require('../constants/Style');

const Button = require('./Button');
const Icon = require('./Icon');

const FileUpload = React.createClass({
  propTypes: {
    allowedFileTypes: React.PropTypes.array,
    imageUrl: React.PropTypes.string,
    maxFileSize: React.PropTypes.number,
    onFileAdd: React.PropTypes.func.isRequired,
    onFileRemove: React.PropTypes.func.isRequired,
    uploadedFile: React.PropTypes.any
  },

  getInitialState () {
    return {
      dragging: false,
      imageSource: null,
      invalidMessage: null
    };
  },

  componentDidMount () {
    this._readFile(this.props.uploadedFile);
  },

  componentWillReceiveProps (newProps) {
    if (newProps.uploadedFile !== this.props.uploadedFile) {
      this._readFile(newProps.uploadedFile);
    }
  },

  _handleFileSelect (e) {
    const file = e.target.files[0];

    if (file) {
      this._validateFile(file);
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

    this._validateFile(file);
  },

  _onDropzoneClick () {
    this._input.click();
  },

  _validateFile (file) {
    const isTooBig = this.props.maxFileSize < file.size / 1000;
    const isInvalidType = this.props.allowedFileTypes && this.props.allowedFileTypes.indexOf(file.type) < 0;

    if (isTooBig || isInvalidType) {
      const invalidMessage = isTooBig ? 'The selected file exceeds maximum size of ' + this.props.maxFileSize + 'k' : 'The selected file type is not accepted';

      this.setState({
        dragging: false,
        invalidMessage
      });

      this.props.onFileRemove(this.props.uploadedFile);
    } else {
      this.props.onFileAdd(file);
    }
  },

  _removeImage (e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      imageSource: null,
      invalidMessage: null
    });
    this.props.onFileRemove();
  },

  _readFile (file) {
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const imageSource = file.type.match('image*') ? reader.result : null;

        this.setState({
          dragging: false,
          imageSource
        });
      };
    }
  },

  _renderInvalidMessage () {
    if (this.state.invalidMessage) {
      return (
        <div style={styles.invalidMessage}>
          <Icon style={styles.invalidIcon} type='attention' />
          {this.state.invalidMessage}
        </div>
      );
    } else {
      return null;
    }
  },

  render () {
    const dropzoneLoaded = this.props.imageUrl || this.props.uploadedFile;
    const imageSource = this.state.imageSource || this.props.imageUrl;

    return (
      <div
        onClick={this._onDropzoneClick}
        onDragLeave={this._onDragLeave}
        onDragOver={this._onDragOver}
        onDrop={this._onDrop}
        style={[styles.dropzone, this.state.dragging && styles.dragging, dropzoneLoaded && styles.dropzoneLoaded]}
      >
        {dropzoneLoaded ? (
          <div style={styles.fileInfo}>
            {this._renderInvalidMessage()}
            <div>Drag and drop file here or click to browse</div>
            {imageSource ? (
              <img src={imageSource} style={[styles.previewImage, this.state.dragging && styles.faded]} />
            ) : (
              <Icon size={60} style={styles.documentIcon} type='document' />
            )}
            {this.props.uploadedFile ? (
              <div>
                <div>{this.props.uploadedFile.name}</div>
                <div>{numeral(this.props.uploadedFile.size / 1000).format('0.0')}k</div>
                <Button icon='delete' onClick={this._removeImage} style={styles.button} type='secondary' />
              </div>
            ) : null}
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
              {this._renderInvalidMessage()}
              <div>Drag and drop file here or click to browse</div>
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
    position: 'relative',
    textAlign: 'center'
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
  faded: {
    opacity: 0.5
  },

  // Loaded Styles
  dropzoneLoaded: {
    height: 'auto',
    padding: 20
  },
  previewImage: {
    marginTop: 10,
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
  },
  invalidIcon: {
    color: StyleConstants.Colors.ASH
  }
};

module.exports = Radium(FileUpload);
