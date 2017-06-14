const numeral = require('numeral');
const PropTypes = require('prop-types');
const React = require('react');

const { themeShape } = require('../constants/App');

const StyleUtils = require('../utils/Style');

const Button = require('./Button');
const Icon = require('./Icon');

class FileUpload extends React.Component {
  static propTypes = {
    allowedFileTypes: PropTypes.array,
    imageUrl: PropTypes.string,
    imageValidation: PropTypes.shape({
      exactHeight: PropTypes.number,
      exactWidth: PropTypes.number,
      maxHeight: PropTypes.number,
      maxWidth: PropTypes.number,
      minHeight: PropTypes.number,
      minWidth: PropTypes.number,
      ratioHeight: PropTypes.number,
      ratioWidth: PropTypes.number
    }),
    maxFileSize: PropTypes.number,
    onFileAdd: PropTypes.func.isRequired,
    onFileRemove: PropTypes.func.isRequired,
    onFileValidation: PropTypes.func,
    style: PropTypes.object,
    theme: themeShape,
    uploadedFile: PropTypes.any
  };

  state = {
    dragging: false,
    imageSource: null
  };

  componentDidMount () {
    this._readFile(this.props.uploadedFile, result => {
      this._validateFile(result.file, result.width, result.height);
    });
  }

  componentWillReceiveProps (newProps) {
    this._input.value = null;

    if (newProps.uploadedFile !== this.props.uploadedFile) {
      this._readFile(newProps.uploadedFile, result => {
        this._validateFile(result.file, result.width, result.height);
      });
    }
  }

  _handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.match('image*')) {
        this._readFile(file, result => {
          this._validateFile(result.file, result.width, result.height);
        });
      } else {
        this._validateFile(file);
      }
    }
  };

  _onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      dragging: true
    });
  };

  _onDragLeave = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      dragging: false
    });
  };

  _onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file.type.match('image*')) {
      this._readFile(file, result => {
        this._validateFile(result.file, result.width, result.height);
      });
    } else {
      this._validateFile(file);
    }
  };

  _onDropzoneClick = () => {
    this._input.click();
  };

  _readFile = (file, callback = () => {}) => {
    if (file) {
      const reader = new FileReader();
      const image = new Image();

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.setState({
          dragging: false,
          imageSource: file.type.match('image*') ? reader.result : null
        });

        image.src = reader.result;

        image.onload = () => {
          callback({
            file,
            width: image.width,
            height: image.height
          });
        };
      };
    }
  };

  _removeFile = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this._input.value = null;

    this.setState({
      imageSource: null
    });
    this.props.onFileRemove();
  };

  _validateImageDimensions = (width, height) => {
    const validationMessages = [];

    if (this.props.onFileValidation && this.props.imageValidation) {
      if (this.props.imageValidation.exactHeight && this.props.imageValidation.exactHeight !== height) {
        validationMessages.push('exact_height');
      }

      if (this.props.imageValidation.exactWidth && this.props.imageValidation.exactWidth !== width) {
        validationMessages.push('exact_width');
      }

      if (this.props.imageValidation.maxHeight && this.props.imageValidation.maxHeight < height) {
        validationMessages.push('max_height');
      }

      if (this.props.imageValidation.maxWidth && this.props.imageValidation.maxWidth < width) {
        validationMessages.push('max_width');
      }

      if (this.props.imageValidation.minHeight && this.props.imageValidation.minHeight > height) {
        validationMessages.push('min_height');
      }

      if (this.props.imageValidation.minWidth && this.props.imageValidation.minWidth > width) {
        validationMessages.push('min_width');
      }

      if (this.props.imageValidation.ratioHeight && this.props.imageValidation.ratioWidth && (this.props.imageValidation.ratioHeight / this.props.imageValidation.ratioWidth !== height / width)) {
        validationMessages.push('image_ratio');
      }
    }

    return validationMessages;
  };

  _validateFile = (file, width = null, height = null) => {
    const validationMessages = this._validateImageDimensions(width, height);
    const isTooBig = this.props.maxFileSize < file.size / 1000;
    const isInvalidType = this.props.allowedFileTypes && this.props.allowedFileTypes.indexOf(file.type) < 0;

    if (this.props.onFileValidation) {
      if (isTooBig) {
        validationMessages.push('file_size');
      }

      if (isInvalidType) {
        validationMessages.push('file_type');
      }

      this.props.onFileValidation(validationMessages);
    }

    if (validationMessages.length) {
      this.setState({
        dragging: false
      });

      this.props.onFileRemove(this.props.uploadedFile);
    } else {
      this.props.onFileAdd(file);
    }
  };

  render () {
    const theme = StyleUtils.mergeTheme(this.props.theme);
    const styles = this.styles(theme);
    const dropzoneLoaded = this.props.imageUrl || this.props.uploadedFile;
    const imageSource = this.state.imageSource || this.props.imageUrl;

    return (
      <div
        onClick={this._onDropzoneClick}
        onDragLeave={this._onDragLeave}
        onDragOver={this._onDragOver}
        onDrop={this._onDrop}
        style={Object.assign({}, styles.dropzone, dropzoneLoaded ? styles.dropzoneLoaded : null)}
      >
        {dropzoneLoaded ? (
          <div style={styles.fileInfo}>
            {this.props.children}
            {imageSource ? (
              <img src={imageSource} style={styles.previewImage} />
            ) : (
              <Icon size={60} style={styles.documentIcon} type='document' />
            )}
            {this.props.uploadedFile ? (
              <div>
                <div>{this.props.uploadedFile.name}</div>
                <div>{numeral(this.props.uploadedFile.size / 1000).format('0.0')}k</div>
                <Button
                  icon='delete'
                  onClick={this._removeFile}
                  style={styles.button}
                  type='secondary'
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div style={styles.dropzoneChild}>
            {this.state.dragging ? (
              <div style={Object.assign({}, styles.centered, styles.draggingText)}>
                <Icon size={60} style={styles.importIcon} type='import' />
                <div>Drop file here to upload</div>
              </div>
            ) : (
              <div style={styles.centered}>
                {this.props.children}
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

  styles = (theme) => {
    return {
      dropzone: Object.assign({}, {
        backgroundColor: this.state.dragging ? theme.Colors.WHITE : theme.Colors.GRAY_100,
        border: this.state.dragging ? '1px dashed ' + theme.Colors.PRIMARY : '1px solid ' + theme.Colors.GRAY_300,
        borderRadius: 3,
        color: theme.Colors.GRAY_500,
        fontFamily: theme.Fonts.REGULAR,
        fontSize: theme.FontSizes.MEDIUM,
        height: this.state.dragging ? 150 : 100,
        position: 'relative',
        textAlign: 'center'
      }, this.props.style),
      hiddenInput: {
        display: 'none'
      },

      // Dragging Styles
      importIcon: {
        fill: theme.Colors.PRIMARY
      },
      draggingText: {
        color: theme.Colors.PRIMARY,
        fontFamily: theme.Fonts.SEMIBOLD,
        fontSize: theme.FontSizes.LARGE
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
        maxWidth: '90%',
        opacity: this.state.dragging ? 0.5 : 1
      },
      documentIcon: {
        fill: theme.Colors.GRAY_500
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
        fontSize: theme.FontSizes.LARGE,
        marginBottom: 10
      },
      invalidIcon: {
        color: theme.Colors.GRAY_500
      }
    };
  };
}

module.exports = FileUpload;
