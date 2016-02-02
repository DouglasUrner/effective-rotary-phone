/*
** client/components/generic/image-picker.jsx
*/

ImagePicker = React.createClass({
  activate( event ) {
    // Decide how to handle the click.
    const value = this.refs.imagePickerTextInput.value;
    console.log(value);

    if (value) {
      console.log('got URL:', value);
      // XXX Check that we have a valid URL. Allow local filesystem path too?
      document.getElementById('putImageHere').src = value;
      //this.upload(value); // Unnecessary...
    } else {
      console.log('pick');
      this.refs.invisibleFilepicker.click();
    }
  },

  pickImage( event ) {
    const files = this.refs.invisibleFilepicker.files;
    console.log(files[0]);

    let imgTarget = document.getElementById('putImageHere');
    imgTarget.src = URL.createObjectURL(files[0]);

    this.upload( files[0] );
  },

  /*
  ** Upload a local file to cloud filestore (S3).
  **
  ** Returns: URL of file on filestore
  */
  upload( file ) {
    console.log(`upload(${file})`);
    const uploader = new Slingshot.Upload("postImages");

    uploader.send(file, function (error, downloadURL) {
      if (error) {
        logger( 'error', 'Editor:uploadFile()', error );
        // Log service detailed response.
        console.error('Error uploading', uploader.xhr.response);
        alert (error);
      }
      else {
        logger('info', 'Editor:uploadFile(), image stored as', downloadURL);
        // Use this? Now or on view? How to handle a URL?
        return downloadURL;
      }
    });
  },

  render() {
    console.log('ImagePicker.render()', this.props);
    return (
      <div className="input">
        <img id='putImageHere' width='100%'
          src={ this.props.defaultValue }/>

        <div className="input-group">
          <div className="input-group-btn">
            {/* Buttons */}
             <button className="btn btn-default" type="button"
              onClick={this.activate}>Go!</button>
          </div>
          <input type='text' className='form-control'
            name={ this.props.name }
            ref='imagePickerTextInput'
            placeholder={ this.props.label }
            defaultValue={ this.props.defaultValue }
            aria-label='Upload image.' />
        </div>{/* /input-group */}
        <input type='file' ref='invisibleFilepicker'
          style={{display: 'none'}}
          onChange={this.pickImage} />
      </div>
    );
  }
});
