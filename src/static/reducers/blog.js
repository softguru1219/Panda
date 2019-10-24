import {
    SET_VIEW_BLOG,
    SET_LIKE_BLOG,
    SET_UNLIKE_BLOG,

    ADD_COMMENT_BLOG,
    EDIT_COMMENT_BLOG,
    ADD_BLOGS,
    SET_BLOGS,
    SET_BLOG_SORTS,
    UPDATE_BLOG_SORT,
    REMOVE_BLOG,

    SET_LIKE_BLOG_COMMENT,
    SET_UNLIKE_BLOG_COMMENT,
    UPDATE_BLOG_FILTERS,
    UPDATE_BLOG_SORTS,
    GOTO_BLOG_PAGE,
} from '../constants'

const initialState = {
    list: [],
    viewBlog: {},
    pagination: {
        pageSize: 60,
        page: 1,
        count: 0,
        totalPages: 0
    },
    sorts: {
        'like': 0,
        'unlike': 0,
        'comments': 0
    },
    filters: {
        search: '',
        user_id: undefined
    },
    isEnableFetching: true
}

export default function blogReducer(state = initialState, action) {
    let blogList, viewBlog
    switch (action.type) {
        case SET_VIEW_BLOG:
            return {
                ...state,
                viewBlog: action.blog
            }

        case SET_LIKE_BLOG:
            return {
                ...state,
                viewBlog: state.viewBlog.id === action.id 
                ? {
                ...state.viewBlog,
                like: state.viewBlog.like + 1
                }
                : state.viewBlog
            }
                        
        case SET_UNLIKE_BLOG:
            return {
                ...state,
                viewBlog: state.viewBlog.id === action.id 
                ? {
                ...state.viewBlog,
                like: state.viewBlog.unlike + 1
                }
                : state.viewBlog
            }

        case ADD_COMMENT_BLOG:
            blogList = state.list.map(blog => {
                if (blog.id == action.id) {
                    blog.comment_count += 1
                }
                return blog
            })
            viewBlog = state.viewBlog
            if (viewBlog.id == action.id) {

                viewBlog = {
                    ...viewBlog,
                    blog_comments: [
                    ...viewBlog.blog_comments,
                    action.comment
                    ]
                }
            }
            return {
                ...state,
                list: blogList,
                viewBlog: viewBlog
            }
        case EDIT_COMMENT_BLOG:
            viewBlog = state.viewBlog
            if (viewBlog.id == action.id) {
                viewBlog = {
                    ...viewBlog,
                    blog_comments: viewBlog.blog_comments.map(comment => {
                        if (comment.id === action.comment.id) return action.comment
                        return comment
                    })
                }
            }
            return {
                ...state,
                viewBlog: viewBlog
            }
        case ADD_BLOGS:
            return {
                ...state,
                list: [
                    ...state.list,
                    ...action.blogs
                ]
            }
        case SET_BLOGS:
            return {
                ...state,
                list: action.blogs
            }

        case REMOVE_BLOG:
            return {
                ...state,
                list: state.list.filter(blog => blog.id !== action.id)
            }

        case SET_BLOG_SORTS:
            return {
                ...state,
                sorts: action.sorts
            }

        case UPDATE_BLOG_SORT:
            return {
                ...state,
                sorts: state.sorts.map(st => {
                    if (st.title == action.title) {
                        st.value = (st.value + 2) % 3 - 1
                    }
                    return st
                })
            }

        case SET_LIKE_BLOG_COMMENT:
            return {
                ...state,
                viewBlog: state.viewBlog.id === action.id
                ? {
                    ...state.viewBlog,
                    blog_comments: state.viewBlog.blog_comments.map(c => {
                        if (c.id === action.commentId) c.like += 1
                        return c
                    })
                }
                : state.viewBlog
            }

        case SET_UNLIKE_BLOG_COMMENT:
            return {
                ...state,
                viewBlog: state.viewBlog.id === action.id
                ? {
                    ...state.viewBlog,
                    blog_comments: state.viewBlog.blog_comments.map(c => {
                        if (c.id === action.commentId) c.unlike += 1
                        return c
                    })
                }
                : state.viewBlog
            }
        
        case UPDATE_BLOG_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.filters
                },
                isEnableFetching: action.isEnableFetching
            }

        case UPDATE_BLOG_SORTS:
            return {
                ...state,
                sorts: {
                    ...state.sorts,
                    ...action.sorts
                },
                isEnableFetching: action.isEnableFetching
            }

        case GOTO_BLOG_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: action.page
                },
                isEnableFetching: true
            }

        default:
            return state
    }
}

