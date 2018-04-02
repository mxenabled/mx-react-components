// eslint-disable react/jsx-indent rule added for proper <Markdown /> formatting
/* eslint-disable react/jsx-indent */
const React = require('react');
const { Link } = require('react-router-dom');

const { FileUpload } = require('mx-react-components');

const Markdown = require('components/Markdown');

class FileUploadDocs extends React.Component {
  state = {
    uploadedFile: null
  };

  _handleFileChange = (uploadedFile) => {
    this.setState({
      uploadedFile
    });
  };

  render () {
    return (
      <div>
        <h1>
          File Upload
          <label>A drop zone component that will accept a file, either by dragging or through a file browser, and return that file.</label>
        </h1>

        <h3>Demo</h3>
        <div style={{ cursor: 'pointer', textAlign: 'center', width: '80%', margin: 'auto' }}>
          <FileUpload
            allowedFileTypes={['image/jpeg', 'text/csv', 'image/png', 'gif']}
            imageValidation={{
              exactHeight: 200,
              exactWidth: 400,
              maxHeight: 400,
              maxWidth: 800,
              minHeight: 100,
              minWidth: 200,
              ratioHeight: 1,
              ratioWidth: 2
            }}
            maxFileSize={3000}
            onFileAdd={this._handleFileChange}
            onFileRemove={this._handleFileChange}
            uploadedFile={this.state.uploadedFile}
          >
            Click Here to Upload File (demo).
          </FileUpload>
        </div>

        <h3>Usage</h3>
        <h5>allowedFileTypes <label>Array</label></h5>
        <p>An array of file types and extensions allowed for upload.</p>

        <h5>imageValidation <label>Object</label></h5>
        <p>An object used for image dimension validation.</p>
        <p>Options are:</p>
        <ul>
          <li><h5>exactHeight<label>exact height in pixels</label></h5></li>
          <li><h5>exactWidth<label>exact width in pixels</label></h5></li>
          <li><h5>maxHeight<label>maximum height in pixels</label></h5></li>
          <li><h5>maxWidth<label>maximum width in pixels</label></h5></li>
          <li><h5>minHeight<label>minimum height in pixels</label></h5></li>
          <li><h5>minWidth<label>minimum width in pixels</label></h5></li>
          <li><h5>ratioHeight<label>ratio of height compared to width</label></h5></li>
          <li><h5>ratioWidth<label>ratio of width compared to height</label></h5></li>
        </ul>
        <p>NOTE: ratio requires both values. All others can be used alone or with others.</p>

        <h5>maxFileSize <label>Number</label></h5>
        <p>Sets the maximum file size allowed. Measured in bytes.</p>

        <h5>OnFileAdd <label>function</label></h5>
        <p>Event handler for when a file is added.</p>

        <h5>OnFileRemove <label>function</label></h5>
        <p>Event handler for when a file is removed.</p>

        <h5>OnFileValidation <label>function</label></h5>
        <p>Event handler for when a file is invalid (too large or wrong file type).</p>

        <h5>style <label>Object</label></h5>
        <p>A style object used to style the div that wraps the uploader&#39;s content</p>

        <h5>theme <label>Object</label></h5>
        <p>Customize the component&apos;s look. See <Link to='/components/theme'>Theme</Link> for more information.</p>

        <h5>uploadedFile <label>Any</label></h5>
        <p>The uploaded file</p>

        <h3>Example</h3>
        <Markdown>
  {`
    getInitialState () {
      return {
        uploadedFile: null
      };
    },

    _handleFileChange (uploadedFile) {
      this.setState({
        uploadedFile
      });
    }

    <FileUpload
      allowedFileTypes={['image/jpeg', 'text/csv', 'image/png', 'gif']}
      imageValidation={{
        exactHeight: 200,
        exactWidth: 400,
        maxHeight: 400,
        maxWidth: 800,
        minHeight: 100,
        minWidth: 200,
        ratioHeight: 1,
        ratioWidth: 2
      }}
      maxFileSize={3000}
      onFileAdd={this._handleFileChange}
      onFileRemove={this._handleFileChange}
      uploadedFile={this.state.uploadedFile}
    />
  `}
        </Markdown>
      </div>
    );
  }
}

module.exports = FileUploadDocs;
