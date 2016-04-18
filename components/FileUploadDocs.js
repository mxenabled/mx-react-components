const React = require('react');

const { FileUpload } = require('mx-react-components');

const Markdown = require('components/Markdown');

const FileUploadDocs = React.createClass({
  getInitialState () {
    return {
      uploadedFile: null
    };
  },

  _handleFileChange (uploadedFile) {
    this.setState({
      uploadedFile
    });
  },

  render () {
    return (
      <div>
        <h1>
          File Upload
          <label>Adds drop zone component that will accept a file, either by dragging or through a file browser, and return that file.</label>
        </h1>

        <h3>Demo</h3>
        <div className='flex'>
          <FileUpload
            allowedFileTypes={['image/jpeg', 'text/csv', 'image/png']}
            maxFileSize={3000}
            onFileAdd={this._handleFileChange}
            onFileRemove={this._handleFileChange}
            uploadedFile={this.state.uploadedFile}
          />
        </div>

        <h3>Usage</h3>
        <h5>allowedFileTypes <label>Array</label></h5>
        <p>An array of file types and extensions allowed for upload.</p>

        <h5>imageUrl <label>String</label></h5>
        <p>If provided, a thumbnail of the file will be shown in the uploader.</p>

        <h5>maxFileSize <label>Number</label></h5>
        <p>Sets the maximum file size allowed. Measured in byes.</p>

        <h5>OnFileAdd <label>function</label></h5>
        <p>Event handler for when a file is added.</p>

        <h5>OnFileRemove <label>function</label></h5>
        <p>Event handler for when a file is removed.</p>

        <h5>OnFileValidation <label>function</label></h5>
        <p>Event handler for when a file is invalid (too large or wrong file type).</p>

        <h5>style <label>Object or Array</label></h5>
        <p>A style object used to style the div that wraps the uploader&#39;s content</p>

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
      allowedFileTypes={['image/jpeg', 'text/csv', 'image/png']}
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
});

module.exports = FileUploadDocs;
