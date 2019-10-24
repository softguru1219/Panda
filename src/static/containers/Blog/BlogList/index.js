import React from 'react'
import BlogGrid from '../../../components/Blog/BlogGrid'


export default class BlogListView extends React.Component {
  
  render() {
    return (
      <div className='container-fluid bloglist-page mt-4'>
        <BlogGrid />
      </div>
    )
  }
}
