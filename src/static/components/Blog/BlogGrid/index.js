import React from 'react'
import {setLikeBlog, setUnlikeBlog, fetchBlogs, deleteBlog, gotoBlogPage, updateBlogFilters, updateBlogSorts} from '../../../actions/blog'
import {selBlogs, selBlogQuery, selPagination, isEnableFetching} from '../../../selectors/blog'
import {isAuthenticated, currentUserId} from '../../../selectors/auth'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Pagination from '../../Elems/Pagination'
import NavLink from '../../Elems/NavLink'
import NoResult from '../../Elems/NoResult'

const images = require.context('../../../images/blogs/')

import './style.scss'


class BlogGrid extends React.Component {

  static propTypes = {
    blogs: PropTypes.array,
    userId: PropTypes.string,
    pagination: PropTypes.object,
    query: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    
    setLikeBlog: PropTypes.func.isRequired,
    setUnLikeBlog: PropTypes.func.isRequired,
    fetchBlogs: PropTypes.func.isRequired,
    gotoBlogPage: PropTypes.func.isRequired,
    updateFilters: PropTypes.func.isRequired,
    isEnableFetching: PropTypes.bool
  }

  static defaultProps = {
    blogs: [],
    isAuthenticated: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  componentWillMount = () => {
    this.props.fetchBlogs(this.props.query)
  }

  changeSearchKey = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  keyPress = (e) => {
    if(e.keyCode == 13) {
      this.search(e)
   }
  }

  search = (e) => {
    this.props.updateFilters({
      search: this.state.searchText
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className='blog-grid p-2'>
          <div className='blog-head py-4'>
            <div className='row'>
              <div className='col-8'>
                <div className='input-group'>
                  <input className='form-control' value={this.state.searchText} onChange={this.changeSearchKey} onKeyDown={this.keyPress} />
                  <div className="input-group-append">
                    <button className='btn btn-default' onClick={this.search}>搜索</button>
                  </div>
                </div>
              </div>
              {
                this.props.isAuthenticated && 
                <div className='col-4 text-right'>
                  <NavLink className='btn btn-default' href='/blog/create'><i className='fa fa-plus mr-2' />创建</NavLink>
                </div>
              }
            </div>
          </div>
          {
          this.props.blogs instanceof Array  && this.props.blogs.length != 0
          ? <div className='row'>
              {
                this.props.blogs.map((blog, idx) => {
                  let imgPath = blog.img_url ? images(`./${blog.img_url}`) : null
                  return <div className='col-6 col-sm-4 col-md-3' key={idx}>
                    <a className='blog-summary' href={`/blog/${blog.id}`}>
                      <img src={imgPath} />
                      <div className='action-view mb-2 text-center'>
                        <span><i className='fa fa-comment' /> {blog.comment_count} </span>
                        <span><i className='fa fa-thumbs-up' /> {blog.like} </span>
                        <span><i className='fa fa-thumbs-down' /> {blog.unlike} </span>
                      </div>
                      <h3 className='sub-title mb-3'>{blog.title}</h3>
                      <div className='post-metadata mb-4'>
                        by <span className='author'>{blog.user_name}</span> on <span className='post-date'>{blog.created_at}</span>
                      </div>
                      <p>{blog.content}</p>
                    </a>
                  </div>
                })
              }
            </div>
            : <NoResult />
          }
          <div className='py-4'><Pagination gotoPage={this.props.gotoBlogPage} pagination={this.props.pagination}/></div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      blogs: selBlogs(state),
      isAuthenticated: isAuthenticated(state),
      userId: currentUserId(state),
      query: selBlogQuery(state),
      pagination: selPagination(state),
      isEnableFetching: isEnableFetching(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setLikeBlog: (blog_id) => {
        dispatch(setLikeBlog(blog_id))
      },
      setUnLikeBlog: (blog_id) => {
        dispatch(setUnlikeBlog(blog_id))
      },
      fetchBlogs: (query) => {
        dispatch(fetchBlogs(query))
      },
      deleteBlog: (blog_id) => {
        dispatch(deleteBlog(blog_id))
      },
      updateFilters: (data) => {
        dispatch(updateBlogFilters(data))
      },
      updateSorts: (sorts) => {
        dispatch(updateBlogSorts(sorts))
      },
      gotoBlogPage: (page)  => {
        dispatch(gotoBlogPage(page))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogGrid)