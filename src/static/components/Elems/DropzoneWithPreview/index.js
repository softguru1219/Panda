import React from 'react'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'


export default class DropzoneWithPreview extends React.Component {

  static propTypes = {
    imageUrl: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  onDrop(files) {
    this.props.onChange(files[0])
    this.setState({
      files: files.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    })
  }


  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
  }

  render() {
    const {files} = this.state
    return (
      <Dropzone
        accept="image/*"
        onDrop={this.onDrop.bind(this)}
        multiple={false}
      >
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className='dropzone-thumb'>
              <div className='dropzone-thumb-inner'>
               {
                 files.length !== 0 
                ? <img src={files[0].preview}/>
                : (
                  this.props.imageUrl ? <img src={this.props.imageUrl}/> : <p>拖放图像</p>
                )
               }
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    )
  }
}