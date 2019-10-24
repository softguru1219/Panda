import React from 'react'
import {connect} from 'react-redux'
import t from 'tcomb-form'
import PropTypes from 'prop-types'

import {getBlog, updateBlog} from '../../../actions/blog'
import Message from '../../../components/Elems/Message'
import {selViewBlog} from '../../../selectors/blog'
import {currentUserId} from '../../../selectors/auth'
import DropzoneWithPreview from '../../../components/Elems/DropzoneWithPreview'
import './style.scss'
const images = require.context('../../../images/blogs/')

const Form = t.form.Form

const Blog = t.struct({
  title: t.String,
  content: t.String
})

const BlogFormOptions = {
  fields: {
    title: {
      attrs: {
        placeholder: '标题',
        className: 'custom-inp'
      },
      label: '标题'
    },
    content: {
      type: 'textarea',
      attrs: {
        placeholder: '密码',
        className: 'custom-textarea'
      },
      label: '描述'
    }
  }
}

class BlogEditView extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }),
    updateBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
  }

  static defaultProps = {
    statusText: '',
    location: null
  }

  constructor(props) {
    super(props)
    this.state = {
      formValues: {
        title: '',
        content: ''
      },
      new_image: null
    }
  }

  onFormChange = (value) => {
    this.setState({ formValues: value })
  }

  update = (e) => {
    e.preventDefault()
    const value = this.blogCreateForm.getValue()
    
    if (value) {
      let newData = {...value, id: this.props.blog.id, user: this.props.userId}
      if (this.state.new_image) {
        newData['img'] = this.state.new_image
      }
      this.props.updateBlog(this.props.blog.id, newData)
    }
  }

  reset = (e) => {
    this.setState({
      formValues: null
    })
  }


  imageChange = (file) => {
    this.setState({
      new_image: file
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getBlog(this.props.match.params.id)
    }
    if (prevProps.blog.title !== this.props.blog.title || prevProps.blog.content !== this.props.blog.content) {
      this.setState({
        formValues: {
          title: this.props.blog.title,
          content: this.props.blog.content
        }
      })
    }
  }

  componentWillMount() {
    this.props.getBlog(this.props.match.params.id)
  }

  render() {
    let imgPath = this.props.blog.img_url ? images(`./${this.props.blog.img_url}`): null
    return (
      <div className="container-fluid blog-create py-4">
        <h3 className="text-center mb-4">创建博客</h3>
        <Message />
        <div className='blog-img text-center mb-4'>
          <DropzoneWithPreview onChange={this.imageChange} imageUrl={imgPath}/>
        </div>
        <form onSubmit={this.update}>
          <Form ref={(ref) => { this.blogCreateForm = ref }}
            type={Blog}
            options={BlogFormOptions}
            value={this.state.formValues}
            onChange={this.onFormChange}
          />
          <div className='btn-groups text-right mt-4'>
            <button
              type="submit"
              className="btn btn-default mr-4"
            >
              创 建
            </button>
            <button className="btn btn-reset" onClick={this.reset} type='button'>
              重 启
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blog: selViewBlog(state),
    userId: currentUserId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBlog: (blogId) => {
      dispatch(getBlog(blogId))
    },
    updateBlog: (blogId, data) => {
      dispatch(updateBlog(blogId, data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogEditView)
export { BlogEditView as BlogEditViewNotConnected }
