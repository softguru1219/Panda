
import {
    SET_LIKE_BLOG,
    SET_UNLIKE_BLOG,
    SET_VIEW_BLOG,
    SET_BLOGS,
    ADD_BLOGS,
    REMOVE_BLOG,
    
    UPDATE_BLOG_FILTERS,
    UPDATE_BLOG_SORTS,
    GOTO_BLOG_PAGE,
} from '../constants'

import axios from '../config/api'

import {showError, startLoading, endLoading} from './common'


export const gotoBlogPage = (page) => {
    return {
        type: GOTO_BLOG_PAGE,
        page: page
    }
}

export const updateBlogFilters = (data, isEnableFetching=true) => {
    return {
        type: UPDATE_BLOG_FILTERS,
        filters: data,
        isEnableFetching: isEnableFetching
    }
}

export const updateBlogSorts = (data, isEnableFetching=true) => {
    return {
        type: UPDATE_BLOG_SORTS,
        sorts: data,
        isEnableFetching: isEnableFetching
    }
}

export const likeBlog = (blogId) => {
    return {
        type: SET_LIKE_BLOG,
        id: blogId
    }
}

export const setLikeBlog = (blogId, user) => (dispatch) => {
    axios().post(`like-blog/`, {blog: blogId, user: user})
        .then(res => {
            dispatch(likeBlog(blogId))
        }).catch(err => {
            showError(dispatch, err)
        })
}

export const unlikeBlog = (blogId) => {
    return {
        type: SET_UNLIKE_BLOG,
        id: blogId,
    }
}

export const setUnLikeBlog = (blogId, user) => (dispatch) => {
    axios().post(`unlike-blog/`, {blog: blogId, user: user})
        .then(res => {
            dispatch(unlikeBlog(blogId))
        })
        .catch(err => {
            showError(dispatch, err)
        })
}

export const setBlogs = (blogs) => {
    return {
        type: SET_BLOGS,
        blogs: blogs
    }
}

export const addBlogs = (blogs) => {
    return {
        type: ADD_BLOGS,
        blogs: blogs
    }
}

export const fetchBlogs = (query='') => (dispatch) => {
    dispatch(startLoading())
    axios().get(`/blog/${query}`)
        .then(res => {
            dispatch(endLoading())
            dispatch(setBlogs(res.data.results))
        })
        .catch(err => showError(dispatch, err))
}

export const setViewBlog = (blog) => {
    return {
        type: SET_VIEW_BLOG,
        blog: blog
    }
}

export const getBlog = (blogId) => (dispatch) => {
    dispatch(startLoading())
    axios().get(`/blog-detail/${blogId}/`)
        .then(res => {
            dispatch(endLoading())
            dispatch(setViewBlog(res.data))
        })
        .catch(err => showError(dispatch, err))
}

export const updateBlog = (blogId, data) => dispatch => {
    dispatch(startLoading())
    let form_data = new FormData()
    for ( let key in data ) {
        form_data.append(key, data[key])
    }
    axios().put(`/blog/${blogId}/`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }) 
        .then(res => {
            dispatch(endLoading())
            dispatch(setViewBlog(res.data))
        })
        .catch(err => {
            showError(dispatch, err)
        })
}

export const createBlog = (data) =>(dispatch) => {
    dispatch(startLoading())
    let formData = new FormData()
    for ( let key in data ) {
        formData.append(key, data[key])
    }
    axios().post(`/blog/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        dispatch(endLoading())
        dispatch(addBlogs([res.data]))
    }).catch(err => showError(dispatch, err))
}

export const removeBlog = (blogId) => {
    return {
        type: REMOVE_BLOG,
        id: blogId
    }
}

export const deleteBlog = (blogId) => (dispatch) => {
    dispatch(startLoading())
    axios().delete(`/blog/${blogId}/`)
        .then(res => {
            dispatch(endLoading())
            dispatch(removeBlog(blogId))
        })
        .catch(err => showError(dispatch, err))
}
