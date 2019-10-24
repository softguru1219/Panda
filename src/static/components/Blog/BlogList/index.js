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


class BlogList extends React.Component {

  static propTypes = {
    blogs: PropTypes.array,
    userId: PropTypes.string,
    mine: PropTypes.bool,
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
    mine: true
  }

  constructor(props) {
    super(props)
    this.state = {
      searchText: ''
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.query != this.props.query && this.props.isEnableFetching) {
      this.props.fetchBlogs(this.props.query)
    }

    if (prevProps.mine !== this.props.mine) {
      this.props.updateFilter({
        user_id: this.props.userId
      })
    }
  }

  componentWillMount = () => {
    if (this.props.mine) {
      this.props.updateFilters({
        user_id: this.props.userId
      })
    }
    else this.props.fetchBlogs(this.props.query)
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
        <div className='table-responsive tb-blog p-2'>
          <div className='table-head py-4'>
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
          ? <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>标题</th>
                  <th>图片</th>
                  <th>描述</th> 
                  <th>喜欢</th>
                  <th>不像</th>
                  <th>评论计数</th>
                  <th style={{
                    width: '8rem'
                  }}>动作</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.blogs && this.props.blogs.map((blog, idx) => {
                    let imgPath = blog.img_url ? images(`./${blog.img_url}`) : null
                    return <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{blog.title}</td>
                      <td>
                        {
                          imgPath &&
                          <img src={imgPath} className='blog-img'/>
                        }
                      </td>
                      <td>{blog.content}</td>
                      <td>{blog.like}</td>
                      <td>{blog.unlike}</td>
                      <td>{blog.comment_count}</td>
                      <td>
                        <NavLink href={`/blog/${blog.id}`} className='btn btn-icon type1 sm'><i className='fa fa-eye' /></NavLink>
                        {
                          blog.user == this.props.userId 
                          ? <React.Fragment>
                            <a href={`/blog/${blog.id}/edit`} className='btn btn-icon type1 sm'><i className='fa fa-edit' /></a>
                            <button onClick={e => this.props.deleteBlog(blog.id)} className='btn btn-icon type1 sm'><i className='fa fa-trash'/></button>
                          </React.Fragment>
                          : <React.Fragment>
                            <button onClick={e => this.props.setLikeBlog(blog.id)} className='btn btn-icon type1 sm'><i className='fa fa-thumbs-up' /></button>
                            <button onClick={e => this.props.setUnLikeBlog(blog.id)} className='btn btn-icon type1 sm'><i className='fa fa-thumbs-down' /></button>
                          </React.Fragment>
                        }
                      </td>
                    </tr>
                  }) 
                }
              </tbody>
            </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)