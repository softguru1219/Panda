import React from 'react'
import {connect} from 'react-redux'
import t from 'tcomb-form'
import PropTypes from 'prop-types'

import {createBlog} from '../../../actions/blog'
import Message from '../../../components/Elems/Message'
import {isAuthenticated, isAuthenticating, currentUserId} from '../../../selectors/auth'
import DropzoneWithPreview from '../../../components/Elems/DropzoneWithPreview'
import './style.scss'

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
      },
      label: '标题'
    },
    content: {
      type: 'textarea',
      attrs: {
        placeholder: '密码',
      },
      label: '描述'
    }
  }
}

class BlogCreateView extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    createBlog: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }),
    userId: PropTypes.string.isRequired
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
      img: null
    }
  }

  onFormChange = (value) => {
    this.setState({ formValues: value })
  }

  create = (e) => {
    e.preventDefault()
    const value = this.blogCreateForm.getValue()
    
    if (value) {
      this.props.createBlog({...value, img: this.state.img, user: this.props.userId})
    }
  }

  reset = (e) => {
    this.setState({
      formValues: null
    })
  }


  imageChange = (file) => {
    this.setState({
      img: file
    })
  }

  render() {

    return (
      <div className="container-fluid blog-create py-4">
        <h3 className="text-center mb-4">创建博客</h3>
        <Message />
        <div className='blog-img text-center mb-4'>
          <DropzoneWithPreview onChange={this.imageChange}/>
        </div>
        <form onSubmit={this.create }>
          <Form ref={(ref) => { this.blogCreateForm = ref }}
            type={Blog}
            options={BlogFormOptions}
            value={this.state.formValues}
            onChange={this.onFormChange}
          />
          <div className='btn-groups text-right mt-4'>
            <button disabled={this.props.isAuthenticating}
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
    isAuthenticated: isAuthenticated(state),
    isAuthenticating: isAuthenticating(state),
    userId: currentUserId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBlog: (data) => {
      dispatch(createBlog(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogCreateView)
export { BlogCreateView as BlogCreateViewNotConnected }
