'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var numeral = require('numeral');
var React = require('react');

var StyleConstants = require('../constants/Style');

var Button = require('./Button');
var Icon = require('./Icon');

var FileUpload = React.createClass({
  displayName: 'FileUpload',

  propTypes: {
    allowedFileTypes: React.PropTypes.array,
    imageUrl: React.PropTypes.string,
    imageValidation: React.PropTypes.shape({
      exactHeight: React.PropTypes.number,
      exactWidth: React.PropTypes.number,
      maxHeight: React.PropTypes.number,
      maxWidth: React.PropTypes.number,
      minHeight: React.PropTypes.number,
      minWidth: React.PropTypes.number,
      ratioHeight: React.PropTypes.number,
      ratioWidth: React.PropTypes.number
    }),
    maxFileSize: React.PropTypes.number,
    onFileAdd: React.PropTypes.func.isRequired,
    onFileRemove: React.PropTypes.func.isRequired,
    onFileValidation: React.PropTypes.func,
    style: React.PropTypes.object,
    uploadedFile: React.PropTypes.any
  },

  getInitialState: function getInitialState() {
    return {
      dragging: false,
      imageSource: null
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    this._readFile(this.props.uploadedFile, function (result) {
      _this._validateFile(result.file, result.width, result.height);
    });
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var _this2 = this;

    this._input.value = null;

    if (newProps.uploadedFile !== this.props.uploadedFile) {
      this._readFile(newProps.uploadedFile, function (result) {
        _this2._validateFile(result.file, result.width, result.height);
      });
    }
  },
  _handleFileSelect: function _handleFileSelect(e) {
    var _this3 = this;

    var file = e.target.files[0];

    if (file) {
      if (file.type.match('image*')) {
        this._readFile(file, function (result) {
          _this3._validateFile(result.file, result.width, result.height);
        });
      } else {
        this._validateFile(file);
      }
    }
  },
  _onDragOver: function _onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      dragging: true
    });
  },
  _onDragLeave: function _onDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      dragging: false
    });
  },
  _onDrop: function _onDrop(e) {
    var _this4 = this;

    e.stopPropagation();
    e.preventDefault();

    var file = e.dataTransfer.files[0];

    if (file.type.match('image*')) {
      this._readFile(file, function (result) {
        _this4._validateFile(result.file, result.width, result.height);
      });
    } else {
      this._validateFile(file);
    }
  },
  _onDropzoneClick: function _onDropzoneClick() {
    this._input.click();
  },
  _readFile: function _readFile(file) {
    var _this5 = this;

    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (file) {
      (function () {
        var reader = new FileReader();
        var image = new Image();

        reader.readAsDataURL(file);

        reader.onload = function () {
          _this5.setState({
            dragging: false,
            imageSource: file.type.match('image*') ? reader.result : null
          });

          image.src = reader.result;

          image.onload = function () {
            callback({
              file: file,
              width: image.width,
              height: image.height
            });
          };
        };
      })();
    }
  },
  _removeFile: function _removeFile(e) {
    e.stopPropagation();
    e.preventDefault();

    this._input.value = null;

    this.setState({
      imageSource: null
    });
    this.props.onFileRemove();
  },
  _validateImageDimensions: function _validateImageDimensions(width, height) {
    var validationMessages = [];

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

      if (this.props.imageValidation.ratioHeight && this.props.imageValidation.ratioWidth && this.props.imageValidation.ratioHeight / this.props.imageValidation.ratioWidth !== height / width) {
        validationMessages.push('image_ratio');
      }
    }

    return validationMessages;
  },
  _validateFile: function _validateFile(file) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var validationMessages = this._validateImageDimensions(width, height);
    var isTooBig = this.props.maxFileSize < file.size / 1000;
    var isInvalidType = this.props.allowedFileTypes && this.props.allowedFileTypes.indexOf(file.type) < 0;

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
  },
  render: function render() {
    var _this6 = this;

    var styles = this.styles();
    var dropzoneLoaded = this.props.imageUrl || this.props.uploadedFile;
    var imageSource = this.state.imageSource || this.props.imageUrl;

    return React.createElement(
      'div',
      {
        onClick: this._onDropzoneClick,
        onDragLeave: this._onDragLeave,
        onDragOver: this._onDragOver,
        onDrop: this._onDrop,
        style: _extends({}, styles.dropzone, dropzoneLoaded ? styles.dropzoneLoaded : null)
      },
      dropzoneLoaded ? React.createElement(
        'div',
        { style: styles.fileInfo },
        this.props.children,
        imageSource ? React.createElement('img', { src: imageSource, style: styles.previewImage }) : React.createElement(Icon, { size: 60, style: styles.documentIcon, type: 'document' }),
        this.props.uploadedFile ? React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            null,
            this.props.uploadedFile.name
          ),
          React.createElement(
            'div',
            null,
            numeral(this.props.uploadedFile.size / 1000).format('0.0'),
            'k'
          ),
          React.createElement(Button, {
            icon: 'delete',
            onClick: this._removeFile,
            style: styles.button,
            type: 'secondary'
          })
        ) : null
      ) : React.createElement(
        'div',
        { style: styles.dropzoneChild },
        this.state.dragging ? React.createElement(
          'div',
          { style: _extends({}, styles.centered, styles.draggingText) },
          React.createElement(Icon, { size: 60, style: styles.importIcon, type: 'import' }),
          React.createElement(
            'div',
            null,
            'Drop file here to upload'
          )
        ) : React.createElement(
          'div',
          { style: styles.centered },
          this.props.children
        )
      ),
      React.createElement('input', {
        name: 'files',
        onChange: this._handleFileSelect,
        ref: function ref(_ref) {
          return _this6._input = _ref;
        },
        style: styles.hiddenInput,
        type: 'file'
      })
    );
  },
  styles: function styles() {
    return {
      dropzone: _extends({}, {
        backgroundColor: this.state.dragging ? StyleConstants.Colors.WHITE : StyleConstants.Colors.PORCELAIN,
        border: this.state.dragging ? '1px dashed ' + StyleConstants.Colors.PRIMARY : '1px solid ' + StyleConstants.Colors.FOG,
        borderRadius: 3,
        color: StyleConstants.Colors.ASH,
        fontFamily: StyleConstants.Fonts.REGULAR,
        fontSize: StyleConstants.FontSizes.MEDIUM,
        height: this.state.dragging ? 150 : 100,
        position: 'relative',
        textAlign: 'center'
      }, this.props.style),
      hiddenInput: {
        display: 'none'
      },

      // Dragging Styles
      importIcon: {
        fill: StyleConstants.Colors.PRIMARY
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
        maxWidth: '90%',
        opacity: this.state.dragging ? 0.5 : 1
      },
      documentIcon: {
        fill: StyleConstants.Colors.ASH
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
  }
});

module.exports = FileUpload;