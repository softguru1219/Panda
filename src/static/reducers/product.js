import {
  SET_VIEW_PRODUCT,
  SET_LIKE_PRODUCT,
  SET_UNLIKE_PRODUCT,

  ADD_COMMENT_PRODUCT,
  EDIT_COMMENT_PRODUCT,
  SET_LIKE_PRODUCT_COMMENT,
  SET_UNLIKE_PRODUCT_COMMENT,

  SET_PRODUCTS,
  ADD_PRODUCTS,

  SET_DISCOUNT_PRODUCTS,

  SET_WISHLIST_PRODUCTS,
  ADD_WISHLIST_PRODUCT,
  REMOVE_WISHLIST_PRODUCT,
  REMOVE_MULTI_WISHLIST,

  
  ADD_PRODUCT_COMPARE,
  SET_COMPARE_PRODUCTS,
  REMOVE_ALL_COMPARE_PRODUCTS,
  REMOVE_COMPARE_PRODUCT,
  SET_SORTS,

  SET_FILTERS,
  UPDATE_FILTERS,

  GOTO_PAGE,
  SET_PAGINATION,

  ADD_FILTER,
  FORMAT_QUERY,
  ENABLE_FETCHING,
  SET_SEARCH,
  SET_CURRENT_CATEGORY,

  EMPTY_PRODUCTS,

} from '../constants'


const initialState = {
  list: [],
  viewProduct: {},
  discountProducts: [],
  analysis_list: [],
  compare_list: [],
  compare_price_history: [],
  sorts: {
    sailing_price: 0,
    review_score: 0,
    review_count: 0,
    quantity: 0,
    // likes: 0,
    // comments: 0,
    created_at: 0
  },
  filters: {},
  pagination: {
    pageSize: 60,
    page: 1,
    count: 0,
    totalPages: 0
  },
  searchText: '',
  category1: '',
  category2: '',
  category3: '',
  isEnableFetching: true,
}

export default function productReducer(state = initialState, action) {
  let prodList, compareList, wishList, viewProduct
  switch (action.type) {
    case SET_VIEW_PRODUCT:
      return {
        ...state,
        viewProduct: action.product
      }
    case SET_LIKE_PRODUCT:
      return {
        ...state,
        viewProduct: state.viewProduct.id === action.id 
        ? {
          ...state.viewProduct,
          like: state.viewProduct.like + 1
        }
        : state.viewProduct
      }

    case SET_UNLIKE_PRODUCT:
      return {
        ...state,
        viewProduct: state.viewProduct.id === action.id 
        ? {
          ...state.viewProduct,
          unlike: state.viewProduct.unlike + 1
        }
        : state.viewProduct
      }

    case SET_LIKE_PRODUCT_COMMENT:
      return {
        ...state,
        viewProduct: state.viewProduct.id === action.id 
        ? {
          ...state.viewProduct,
          product_comments: state.viewProduct.product_comments.map(c => {
            if (c.id === action.commentId) c.like += 1
            return c
          })
        }
        : state.viewProduct
      }
       
    case SET_UNLIKE_PRODUCT_COMMENT:
      return {
        ...state,
        viewProduct: state.viewProduct.id === action.id 
        ? {
          ...state.viewProduct,
          product_comments: state.viewProduct.product_comments.map(c => {
            if (c.id === action.commentId) c.unlike += 1
            return c
          })
        }
        : state.viewProduct
      }

    case ADD_COMMENT_PRODUCT:
      prodList = state.list.map(prod => {
        if (prod.id == action.id) {
          prod.comment_count += 1
        }
        return prod
      })
      viewProduct = state.viewProduct
      if (viewProduct.id == action.id) {
        viewProduct = {
          ...viewProduct,
          product_comments: [
            ...viewProduct.product_comments,
            action.comment
          ]
        }
      }
      return {
        ...state,
        list: prodList,
        viewProduct: viewProduct
      }
    case EDIT_COMMENT_PRODUCT:
      viewProduct = state.viewProduct
      if (viewProduct.id == action.id) {

        viewProduct = {
          ...viewProduct,
          product_comments: viewProduct.product_comments.map((comment) => {
            if (comment.id == action.comment.id) return action.comment
            return comment
          })
        }
      }
      return {
        ...state,
        viewProduct: viewProduct
      }
    case ADD_PRODUCTS:
      return {
        ...state,
        list: [
          ...state.list,
          ...action.products
        ]
      }
    case SET_PRODUCTS:
      return {
        ...state,
        list: action.products
      }
    
    case SET_DISCOUNT_PRODUCTS:
      return {
        ...state,
        discountProducts: action.products
      }
    
    case SET_WISHLIST_PRODUCTS:
      sessionStorage.setItem('analysis_list', JSON.stringify(action.products))
      return {
        ...state,
        analysis_list: action.products
      }
    
    case ADD_WISHLIST_PRODUCT:
      wishList = [
        ...state.analysis_list,
        action.product
      ]

      prodList = state.list.map((prod) => {
        if (prod.id === action.product.id) {
          prod = {
            ...prod,
            available_analysis: false
          }
        }
        return prod
      })
      if (state.viewProduct.id === action.product.id) {
        state.viewProduct = {
          ...state.viewProduct,
          available_analysis: false
        }
      }

      sessionStorage.setItem('analysis_list', JSON.stringify(wishList))
      return {
        ...state,
        analysis_list: [
          ...state.analysis_list,
          action.product
        ],
        list: prodList,
      }
    
    case REMOVE_WISHLIST_PRODUCT:
      wishList = state.list.filter(prod => prod.id != action.id)
      sessionStorage.setItem('analysis_list', JSON.stringify(wishList))
      return {
        ...state,
        list: wishList
      }

    case REMOVE_MULTI_WISHLIST:
      prodList = state.list.filter(prod => action.productIds.indexOf(prod.id.toString()) < 0 )
      sessionStorage.setItem('analysis_list', JSON.stringify(wishList))
      return {
        ...state,
        list: prodList
      }

    case ADD_PRODUCT_COMPARE:
      compareList = [...state.compare_list, action.product]
      sessionStorage.setItem('compare_products', JSON.stringify(compareList))
      return {
        ...state,
        compare_list: compareList
      }

    case SET_COMPARE_PRODUCTS:
      return {
        ...state,
        compare_list: action.products,
        compare_price_history: action.priceHistory
      }
    
    case REMOVE_ALL_COMPARE_PRODUCTS:
      sessionStorage.setItem('compare_products', JSON.stringify([]))
      return {
        ...state,
        compare_list: []
      }

    case REMOVE_COMPARE_PRODUCT:
      compareList = state.compare_list.filter(prod => prod.id != action.id)
      sessionStorage.setItem('compare_products', JSON.stringify(compareList))
      return {
        ...state, 
        compare_list: compareList
      }

    case GOTO_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.page
        },
        isEnableFetching: true
    }

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.data
        },
        isEnableFetching: true
      }

    case ADD_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.data
        },
        isEnableFetching: true
      }

    case SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
        isEnableFetching: false
      }
    
    case SET_SORTS:
      return {
        ...state,
        sorts: {
          ...state.sorts,
          ...action.sorts
        },
        isEnableFetching: true
      }

    case SET_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.pagination
        }
      }

    case FORMAT_QUERY:
      return {
        ...state,
        filters: {},
        sorts: {
          sailing_price: 0,
          review_score: 0,
          review_count: 0,
          quantity: 0,
          // likes: 0,
          // comments: 0,
          created_at: 0
        },
        pagination: {
          pageSize: 60,
          page: 1,
          count: 0,
          totalPages: 0
        },
        searchText: '',
        category1: '',
        category2: '',
        category3: '',
        isEnableFetching: false
      }
      
    case SET_SEARCH:
      return {
        ...state,
        searchText: action.text,
        category1: action.category1,
        isEnableFetching: true
      }

    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        category1: action.category1,
        category2: action.category2,
        category3: action.category3,
        isEnableFetching: true
      }

    case ENABLE_FETCHING:
      return {
        ...state,
        filters: {},
        pagination: {
          pageSize: 60,
          page: 1,
          count: 0,
          totalPages: 0
        },
        category1: '',
        category2: '',
        category3: '',
        searchText: '',
        isEnableFetching: true
      }

    case EMPTY_PRODUCTS:
      return {
        ...state,
        list: []
      }

    default:
      return state
  }
}

