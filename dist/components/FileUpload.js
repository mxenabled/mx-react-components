'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var numeral = require('numeral');
var PropTypes = require('prop-types');
var React = require('react');

var StyleConstants = require('../constants/Style');

var Button = require('./Button');
var Icon = require('./Icon');

var FileUpload = function (_React$Component) {
  _inherits(FileUpload, _React$Component);

  function FileUpload() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FileUpload);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dragging: false,
      imageSource: null,
      failedValidationTypes: []
    }, _this._handleFileSelect = function (e) {
      var file = e.target.files[0];

      if (file) {
        if (file.type.match('image*')) {
          _this._readFile(file, function (result) {
            _this._validateFile(result.file, result.width, result.height);
          });
        } else {
          _this._validateFile(file);
        }
      }
    }, _this._onDragOver = function (e) {
      e.stopPropagation();
      e.preventDefault();

      _this.setState({
        dragging: true
      });
    }, _this._onDragLeave = function (e) {
      e.stopPropagation();
      e.preventDefault();

      _this.setState({
        dragging: false
      });
    }, _this._onDrop = function (e) {
      e.stopPropagation();
      e.preventDefault();

      var file = e.dataTransfer.files[0];

      if (file.type.match('image*')) {
        _this._readFile(file, function (result) {
          _this._validateFile(result.file, result.width, result.height);
        });
      } else {
        _this._validateFile(file);
      }
    }, _this._onDropzoneClick = function () {
      _this._input.click();
    }, _this._readFile = function (file) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (file) {
        var reader = new FileReader();
        var image = new Image();

        reader.readAsDataURL(file);

        reader.onload = function () {
          _this.setState({
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
      }
    }, _this._removeFile = function (e) {
      e.stopPropagation();
      e.preventDefault();

      _this._input.value = null;

      _this.setState({
        imageSource: null
      });
      _this.props.onFileRemove();
    }, _this._validateImageDimensions = function (width, height) {
      var failedImageValidationTypes = [];

      if (_this.props.imageValidation) {
        if (_this.props.imageValidation.exactHeight && _this.props.imageValidation.exactHeight !== height) {
          failedImageValidationTypes.push('exact_height');
        }

        if (_this.props.imageValidation.exactWidth && _this.props.imageValidation.exactWidth !== width) {
          failedImageValidationTypes.push('exact_width');
        }

        if (_this.props.imageValidation.maxHeight && _this.props.imageValidation.maxHeight < height) {
          failedImageValidationTypes.push('max_height');
        }

        if (_this.props.imageValidation.maxWidth && _this.props.imageValidation.maxWidth < width) {
          failedImageValidationTypes.push('max_width');
        }

        if (_this.props.imageValidation.minHeight && _this.props.imageValidation.minHeight > height) {
          failedImageValidationTypes.push('min_height');
        }

        if (_this.props.imageValidation.minWidth && _this.props.imageValidation.minWidth > width) {
          failedImageValidationTypes.push('min_width');
        }

        if (_this.props.imageValidation.ratioHeight && _this.props.imageValidation.ratioWidth && _this.props.imageValidation.ratioHeight / _this.props.imageValidation.ratioWidth !== height / width) {
          failedImageValidationTypes.push('image_ratio');
        }
      }

      return failedImageValidationTypes;
    }, _this._validateFile = function (file) {
      var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var failedValidationTypes = [];
      var fileExt = file.name.split('.').pop();
      var isTooBig = _this.props.maxFileSize < file.size / 1000;
      var isInvalidFileType = _this.props.allowedFileTypes && _this.props.allowedFileTypes.indexOf(file.type) < 0;
      var isInvalidFileExtension = _this.props.allowedFileTypes && _this.props.allowedFileTypes.indexOf(fileExt) < 0;

      if (isTooBig) {
        failedValidationTypes.push('file_size');
      }

      if (isInvalidFileType && isInvalidFileExtension) {
        failedValidationTypes.push('file_type');
      }

      if (failedValidationTypes.indexOf('file_type') < 0 && failedValidationTypes.indexOf('file_size') < 0) {
        failedValidationTypes = failedValidationTypes.concat(_this._validateImageDimensions(width, height));
      }

      if (_this.props.onFileValidation) {
        _this.props.onFileValidation(failedValidationTypes);
      } else if (failedValidationTypes.length) {
        _this.setState({
          dragging: false,
          failedValidationTypes: failedValidationTypes
        });

        _this.props.onFileRemove(_this.props.uploadedFile);
      } else {
        _this.props.onFileAdd(file);
      }
    }, _this.styles = function () {
      return {
        dropzone: _extends({}, {
          backgroundColor: _this.state.dragging ? StyleConstants.Colors.WHITE : StyleConstants.Colors.PORCELAIN,
          border: _this.state.dragging ? '1px dashed ' + StyleConstants.Colors.PRIMARY : '1px solid ' + StyleConstants.Colors.FOG,
          borderRadius: 3,
          color: StyleConstants.Colors.ASH,
          fontFamily: StyleConstants.Fonts.REGULAR,
          fontSize: StyleConstants.FontSizes.MEDIUM,
          height: _this.state.dragging ? 150 : 100,
          position: 'relative',
          textAlign: 'center'
        }, _this.props.style),
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
          opacity: _this.state.dragging ? 0.5 : 1
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
          marginBottom: 10,
          color: StyleConstants.Colors.STRAWBERRY
        },
        invalidIcon: {
          color: StyleConstants.Colors.ASH
        }
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FileUpload, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this._readFile(this.props.uploadedFile, function (result) {
        _this2._validateFile(result.file, result.width, result.height);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _this3 = this;

      this._input.value = null;

      if (newProps.uploadedFile !== this.props.uploadedFile) {
        this._readFile(newProps.uploadedFile, function (result) {
          _this3._validateFile(result.file, result.width, result.height);
        });
      }
    }
  }, {
    key: '_getDefaultValidationMessage',
    value: function _getDefaultValidationMessage(validationType) {
      var validationMessage = 'Selected file did not meet requirements';

      switch (validationType) {
        case 'exact_height':
          validationMessage = 'Image requires an exact height of ' + this.props.imageValidation.exactHeight + ' pixels';
          break;
        case 'exact_width':
          validationMessage = 'Image requires an exact width of ' + this.props.imageValidation.exactWidth + ' pixels';
          break;
        case 'file_size':
          validationMessage = 'File size is too large. Must be ' + this.props.maxFileSize + 'k or less.';
          break;
        case 'file_type':
          validationMessage = 'Unpermitted File Type. Must be one of: ' + this.props.allowedFileTypes.join(', ');
          break;
        case 'image_ratio':
          validationMessage = 'Image ratio must be ' + this.props.imageValidation.ratioHeight + 'px/' + this.props.imageValidation.ratioWidth + 'px';
          break;
        case 'max_height':
          validationMessage = 'Maximum Image height of ' + this.props.imageValidation.maxHeight + ' exceeded';
          break;
        case 'max_width':
          validationMessage = 'Maximum Image width of ' + this.props.imageValidation.maxWidth + ' exceeded';
          break;
        case 'min_height':
          validationMessage = 'Image must have minimum heigh of ' + this.props.imageValidation.minHeight + ' pixels';
          break;
        case 'min_width':
          validationMessage = 'Image must have minimum width of ' + this.props.imageValidation.minWidth + ' pixels';
          break;
        default:
          break;
      }
      return validationMessage;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

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
            this.state.failedValidationTypes.length > 0 ? this.state.failedValidationTypes.map(function (validationType) {
              return React.createElement(
                'div',
                { style: styles.invalidMessage },
                _this4._getDefaultValidationMessage(validationType)
              );
            }) : null,
            this.props.children
          )
        ),
        React.createElement('input', {
          name: 'files',
          onChange: this._handleFileSelect,
          ref: function ref(_ref2) {
            return _this4._input = _ref2;
          },
          style: styles.hiddenInput,
          type: 'file'
        })
      );
    }
  }]);

  return FileUpload;
}(React.Component);

FileUpload.propTypes = {
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
  uploadedFile: PropTypes.any
};


module.exports = FileUpload;