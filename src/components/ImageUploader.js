const React = require('react');
const Radium = require('radium');
const numeral = require('numeral');

const StyleConstants = require('../constants/Style');

const Icon = require('./Icon');
const Button = require('./Button');

const ImageUploader = React.createClass({
  propTypes: {
    allowedFileTypes: React.PropTypes.array,
    color: React.PropTypes.string,
    fileBeingDragged: React.PropTypes.bool,
    maxFileSize: React.PropTypes.number,
    onFileError: React.PropTypes.func,
    onFileRemove: React.PropTypes.func,
    onFileSuccess: React.PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
      allowedFileTypes: ['png', 'jpg', 'gif'],
      color: StyleConstants.Colors.PRIMARY,
      fileBeingDragged: false,
      maxFileSize: 150, //in kB
      onFileError: () => {},
      onFileRemove: () => {}
    };
  },

  getInitialState () {
    return {
      fileContent: null,
      invalidMessage: null,
      uploadedFile: null
    };
  },

  _onDropzoneClick () {
    this.refs.hiddenInput.click();
  },

  _onDragOver (e) {
    e.preventDefault();
  },

  _onDrop (e) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    this._uploadFile(file);
  },

  _uploadFile (file) {
    const fileTooBig = file.size / 1000 > this.props.maxFileSize;
    const fileType = file.type.split('/')[1];

    if (this.props.allowedFileTypes.indexOf(fileType) > -1 && !fileTooBig) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const fileContent = reader.result;
        const uploadedFile = file;

        this.setState({
          fileContent,
          invalidMessage: null,
          uploadedFile
        });

        this.props.onFileSuccess({
          fileContent,
          uploadedFile
        });
      };
    } else {
      this.setState({
        invalidMessage: fileTooBig ? 'The file you selected is too big. The max file size is ' + this.props.maxFileSize + ' KB' : 'The file type is not supported'
      });

      this.props.onFileError(this.state.invalidMessage);
    }
  },

  _handleRemoveFile (e) {
    e.stopPropagation();

    this.setState({
      uploadedFile: null,
      fileContent: null
    });

    this.props.onFileRemove();
  },

  _handleFileSelect (e) {
    const file = e.target.files[0];

    this._uploadFile(file);
  },

  _renderAllowedFileTypes () {
    const lastIndex = this.props.allowedFileTypes.length - 1;

    return this.props.allowedFileTypes.map((type, index) => {
      const comma = lastIndex !== index ? ', ' : '';

      return '.' + type + comma;
    });
  },

  _renderDropzone () {
    const styles = this.styles();

    return (
      <div>
        <div style={styles.title}>Upload an Image:</div>
        <div
          onClick={this._onDropzoneClick}
          onDragOver={this._onDragOver}
          onDrop={this._onDrop}
          style={styles.dropZoneWrapper}
        >
          <div style={[styles.dropZone, this.props.fileBeingDragged && styles.fileBeingDragged]}>
            {this.props.fileBeingDragged ? (
            <div style={styles.dropFileContainer}>
              <Icon
                size={32}
                style={styles.dropFileIcon}
                type='import'
              />
              <div style={styles.dropFileText}>Drop file to upload</div>
            </div>) : (
            <div style={styles.dropZoneText}>
              Drag and drop files here or click to browse
            </div>)}
            {this.state.invalidMessage ? <div style={styles.invalidMessage}>{this.state.invalidMessage}</div> : null}
          </div>
          {this.state.fileContent ? (
          <div style={styles.fileInfo}>
            <img src={this.state.fileContent} />
            <div style={styles.fileDetail}>
              {this.state.uploadedFile.name}
              ({numeral(this.state.uploadedFile.size / 1000).format('0.0')} KB)
            </div>
            <Button
              onClick={this._handleRemoveFile}
              primaryColor={this.props.color}
              style={styles.removeButton}
            >
              Remove
            </Button>
          </div>) : null}
          <input
            name='files'
            onChange={this._handleFileSelect}
            ref='hiddenInput'
            style={styles.hiddenInput}
            type='file'
          />
        </div>
        <div style={styles.fileDescription}>
          File dimensions - 615 x 110 pixels <br/>
          File types - {this._renderAllowedFileTypes()} <br/>
          Max file size - <span>{this.props.maxFileSize}</span> KB
        </div>
      </div>
    );
  },

  render () {
    return (
      <div>
        {this._renderDropzone()}
      </div>
    );
  },

  styles () {
    return {
      dropZoneWrapper: {
        backgroundColor: this.props.fileBeingDragged ? StyleConstants.Colors.WHITE : StyleConstants.Colors.PORCELAIN,
        border: !this.props.fileBeingDragged ? '1px solid ' + StyleConstants.Colors.FOG : null,
        cursor: 'pointer',
        display: 'block',
        width: '100%'
      },
      title: {
        color: StyleConstants.Colors.CHARCOAL,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        marginBottom: 5
      },
      dropZone: {
        height: 75,
        position: 'relative'
      },
      dropZoneText: {
        color: StyleConstants.Colors.ASH,
        fontFamily: StyleConstants.Fonts.Regular,
        fontSize: StyleConstants.FontSizes.LARGE,
        opacity: 0.8,
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%)'
      },
      hiddenInput: {
        visibility: 'hidden',
        position: 'absolute'
      },
      fileInfo: {
        textAlign: 'center'
      },
      fileDetail: {
        marginTop: 20,
        marginBottom: 10
      },
      fileDescription: {
        color: StyleConstants.Colors.ASH,
        marginTop: 10
      },
      removeButton: {
        marginBottom: 10
      },
      invalidMessage: {
        textAlign: 'center',
        paddingTop: 10
      },
      fileBeingDragged: {
        border: '1px dashed ' + this.props.color,
        height: 150
      },
      dropFileContainer: {
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%)'
      },
      dropFileIcon: {
        color: this.props.color,
        marginBottom: 10
      },
      dropFileText: {
        color: this.props.color,
        fontFamily: StyleConstants.Fonts.SEMIBOLD,
        fontSize: StyleConstants.FontSizes.LARGE
      }
    };
  }
});

module.exports = Radium(ImageUploader);