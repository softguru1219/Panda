import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import './style.scss'
import {
  getBlog, 
  setLikeBlog, 
  setUnLikeBlog, 
  updateBlog
} from '../../../actions/blog'

import {
  setLikeComment, 
  setUnLikeComment, 
  addComment,
  editComment,
} from '../../../actions/comment'

import {selViewBlog} from '../../../selectors/blog'
import ProductComment from '../../../components/ProductDetail/ProductComment'
import {isAuthenticated, currentUserId} from '../../../selectors/auth'
import NavLink from '../../../components/Elems/NavLink'

const images = require.context('../../../images/blogs')

class BlogDetail extends React.Component {
  static propTypes = {
    getBlog: PropTypes.func.isRequired,
    setLikeBlog: PropTypes.func.isRequired,
    setUnLikeBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    setLikeComment: PropTypes.func.isRequired,
    setUnLikeComment: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    userId: PropTypes.string
  }

  constructor(props)  {
    super(props)

    this.state = {
      title: '',
      desc: ''
    }
  }

  componentWillMount() {
    this.props.getBlog(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) { 
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getBlog(this.props.match.params.id)
    }
  }

  render() {
    let blog = this.props.blog
    let imagePath = ''
    if (blog && blog.img_url)
      imagePath = images(`./${blog.img_url}`)
    return (
      <div className='container-fluid blog-detail p-4'>
        {
          'id' in blog 
          ? <React.Fragment>
              <div className='row'>
                <div className='blog-img mb-4 col-md-3 col-sm-4 col-12'>
                  <img src={imagePath}></img>
                </div>
                <div className='col-md-9 col-sm-8 col-12'>
                  <h5 className='mb-4 title'>{blog.title}</h5>
                  <div className='post-metadata mb-4'>
                    by <span className='author'>{blog.user_name}</span> on <span className='post-date'>{blog.created_at}</span>
                  </div>
                  <p className='mb-4'>{blog.content}</p>
                  {
                    this.props.userId !== blog.user &&
                    <div className='btn-groups action-view mb-2'>
                      <button className='btn btn-icon type2' onClick={e => this.props.setLikeBlog(blog.id)}><i className='fa fa-thumbs-up' /></button>
                      <label className='ml-1'>{blog.like}</label>
                      <button className='btn btn-icon type2'  onClick={e => this.props.setUnLikeBlog(blog.id)}><i className='fa fa-thumbs-down' /></button>
                      <label className='ml-1'>{blog.unlike}</label>
                    </div>
                  }
                  <div className='btn-groups'>
                    {
                      this.props.isAuthenticated && 
                      <NavLink className='btn btn-default mr-2' href='/blog/create'><i className='fa fa-plus mr-2' />写博客</NavLink>
                    }
                    {
                      this.props.userId == blog.user && 
                      <a className='btn btn-default' href={`/blog/${blog.id}/edit`}><i className='fa fa-edit mr-2' />更新博客</a>
                    }
                  </div>
                </div>
              </div>
              <h5 className='sub-title'>讨论</h5>
              <ProductComment 
                comments={blog.blog_comments}
                prodId={blog.id}
                setLikeComment={this.props.setLikeComment}
                setUnLikeComment={this.props.setUnLikeComment}
                addComment={this.props.addComment}
                editComment={this.props.editComment}
                user={this.props.userId}/>
            </React.Fragment>
          : <h5>
            没有博客
          </h5>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blog: selViewBlog(state),
    isAuthenticated: isAuthenticated(state),
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
    },
    setLikeBlog: (blogId, user) => {
      dispatch(setLikeBlog(blogId, user))
    },
    setUnLikeBlog: (blogId) => {
      dispatch(setUnLikeBlog(blogId, user))
    },
    setUnLikeComment: (blogId, commentId, user) => {
      dispatch(setUnLikeComment(blogId, commentId, 'blog', user))
    },
    setLikeComment: (blogId, commentId, user) => {
      dispatch(setLikeComment(blogId, commentId, 'blog', user))
    },
    addComment: (blogId, text, user) => {
      dispatch(addComment(blogId, text, 'blog', user))
    },
    editComment: (blogId, comment, user) => {
      dispatch(editComment(blogId, comment, 'blog', user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail)
export {BlogDetail as BlogDetailNotConnected}
