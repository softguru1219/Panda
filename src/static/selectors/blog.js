import {createSelector} from 'reselect'

export const blog = state => state.blog

export const selBlogs = state => state.blog.list
export const selSorts = state => state.blog.sorts
export const selPagination = state => state.blog.pagination
export const selFilters = state => state.blog.filters
export const isEnableFetching = state => state.blog.isEnableFetching

export const selViewBlog = state => state.blog.viewBlog

export const getBlogsCount = createSelector(
    selBlogs,
    (blogs) => {return blogs.length}
)

export const isEmptyBlogs = createSelector(
  getBlogsCount,
  (len) => { return len == 0 }
)

export const selBlogQuery = createSelector(
    selPagination,
    selFilters,
    (pagination, filters) => {
      let filters_str = Object.keys(filters)
        .filter(key => filters[key] && filters[key] !== '')
        .map(key => `${key}=${filters[key]}`)
        .join('&')
      // let sorts_str = Object.keys(sorts)
      //   .filter(key => sorts[key] !== 0)
      //   .map(key=> sorts[key] == -1 ? `-${key}`: key)
      //   .join()
      return `?page=${pagination.page}&${filters_str}`
    }
  )