
import {
  SET_LIKE_PRODUCT,
  SET_UNLIKE_PRODUCT,

  SET_VIEW_PRODUCT,

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
  UPDATE_SORT,

  SET_FILTERS,
  UPDATE_FILTERS,
  ADD_FILTER,

  SET_SEARCH,
  SET_CURRENT_CATEGORY,

  SET_PAGINATION,
  GOTO_PAGE,
  
  FORMAT_QUERY,
  ENABLE_FETCHING, 

  EMPTY_PRODUCTS,
} from '../constants'

import axios from '../config/api'

import {showError, showMessage, startLoading,  endLoading} from './common'


/**
 * Pagination / Sorting / Filter Part
 */
export const gotoPage = (page) => {
  return {
    type: GOTO_PAGE,
    page: page
  }
}

export const updateFilters = (data) => {
  return {
    type: UPDATE_FILTERS,
    data
  }
}

export const updateSorts = (key) => {
  return {
    type: UPDATE_SORT,
    key: key
  }
}

export const setSorts = (sorts) => {
  return {
    type: SET_SORTS,
    sorts: sorts
  }
}

export const setFilters = (filters) => {
  return {
    type: SET_FILTERS,
    filters: filters
  }
}

export const setPagination = (data) => {
  return {
    type: SET_PAGINATION,
    pagination: {
      count: data.count,
      totalPages: data.totalPages,
      page: data.page
    }
  }
}

export const addFilter = (data) => {
  return {
    type: ADD_FILTER,
    data: data
  }
}

export const formatQuery = () => {
  return {
    type: FORMAT_QUERY
  }
}

export const enableFetching = () => {
  return {
    type: ENABLE_FETCHING
  }
}

export const setSearch = (text, catId) => {
  return {
    type: SET_SEARCH,
    text: text,
    category1: catId
  }
}
  
export const setCategory = (cat1, cat2='', cat3='') => {
  return {
    type: SET_CURRENT_CATEGORY,
    category1: cat1,
    category2: cat2,
    category3: cat3,
  }
}

export const likeProduct = (prodId) => {
  return {
    type: SET_LIKE_PRODUCT,
    id: prodId
  }
}

export const setLikeProduct = (prodId, user) => (dispatch) => {
  axios().post(`like-product/`, {product: prodId, user: user})
    .then(res => {
      dispatch(likeProduct(prodId))
    }).catch(err => {
      showError(dispatch, err)
    })
}

export const unlikeProduct = (prodId) => {
  return {
    type: SET_UNLIKE_PRODUCT,
    id: prodId,
  }
}

export const setUnLikeProduct = (prodId, user) => (dispatch) => {
  axios().post(`unlike-product/`, {product: prodId, user})
    .then(res => {
      dispatch(unlikeProduct(prodId, res.data))
    })
    .catch(err => {
      showError(dispatch, err)
    })
}

export const setProducts = (prods) => {
  return {
    type: SET_PRODUCTS,
    products: prods
  }
}

export const emptyProducts = () => {
  return {
    type: EMPTY_PRODUCTS
  }
}

export const addProducts = (prods) => {
  return {
    type: ADD_PRODUCTS,
    products: prods
  }
}

export const fetchProducts = (query) => (dispatch) => {
  dispatch(startLoading())
  axios().get(`product/${query}`)
    .then(res => {
      dispatch(setPagination(res.data))
      dispatch(setFilters(res.data.filters))
      dispatch(setProducts(res.data.results))
      dispatch(endLoading())
    })
    .catch(err => {
      showError(dispatch, err)
    })
}

export const fetchRecommendProducts = (query) => (dispatch) => {
  dispatch(startLoading())
  axios().get(`recommend-product/${query}`)
    .then(res => {
      dispatch(setPagination(res.data))
      dispatch(setFilters(res.data.filters))
      dispatch(setProducts(res.data.results))
      dispatch(endLoading())
    })
    .catch(err => {
      showError(dispatch, err)
    })
}

export const fetchDiscountTodayProducts = (query) => (dispatch) => {
  dispatch(startLoading())
  axios().get(`discount/today/${query}`)
    .then(res => {
      dispatch(setPagination(res.data))
      dispatch(setFilters(res.data.filters))
      dispatch(setProducts(res.data.results))
      dispatch(endLoading())
    })
    .catch(err => {
      showError(dispatch, err)
    })
}

export const fetchHomeProducts = () => {
  return axios().get('home-product/')
}

export const loadMoreProducts = (page) => (dispatch) => {
  dispatch(startLoading())
  axios().get(`product/?page=${page}`)
    .then(res => {
      dispatch(endLoading())
      dispatch(setPagination(res.data))
      dispatch(addProducts(res.data.results))
    })
    .catch(err => showError(dispatch, err))
}

export const setDiscountProducts = (prods) => {
  return {
    type: SET_DISCOUNT_PRODUCTS,
    products: prods
  }
}

export const fetchDiscountProducts = (query='') => (dispatch) => {
  if (query !== '')
    dispatch(startLoading())
  axios().get(`discount/${query}`)
    .then(res => {
      if (query === '') {
        dispatch(setDiscountProducts(res.data))
      }
      else {
        dispatch(setPagination(res.data))
        dispatch(setFilters(res.data.filters))
        dispatch(setProducts(res.data.results))
        dispatch(endLoading())
      }
    })
    .catch(err => showError(dispatch, err))
}

export const fetchDiscountGeneralProducts = (query='') => (dispatch) => {
  dispatch(startLoading())
  axios().get(`discount/general/${query}`)
    .then(res => {
      dispatch(setPagination(res.data))
      dispatch(setFilters(res.data.filters))
      dispatch(setProducts(res.data.results))
      dispatch(endLoading())
    })
    .catch(err => showError(dispatch, err))
}

export const fetchDiscountTimeProducts = (query='') => (dispatch) => {
  dispatch(startLoading())
  axios().get(`discount/time/${query}`)
    .then(res => {
      dispatch(setPagination(res.data))
      dispatch(setFilters(res.data.filters))
      dispatch(setProducts(res.data.results))
      dispatch(endLoading())
    })
    .catch(err => showError(dispatch, err))
}

export const setAnalysisListProducts = (prods) => {
  return {
    type: SET_WISHLIST_PRODUCTS,
    products: prods
  }
}

export const fetchAnalysisProducts = (query='') => (dispatch) => {
  dispatch(startLoading())
  axios().get(`/analysis/${query}`)
    .then(res => {
      dispatch(setPagination(res.data))
      dispatch(setProducts(res.data.results))
      dispatch(endLoading())
    })
    .catch(err => showError(dispatch, err))
}


export const addAnalysis = (prod) => {
  return {
    type: ADD_WISHLIST_PRODUCT,
    product: prod
  }
}

export const addAnalysisProductRequest = (prod, user) => {
  return axios().put(`/analysis/${prod.id}`, {user: user})
}

export const addAnalysisProduct = (prod, user) => (dispatch) => {
  dispatch(startLoading())
  addAnalysisProductRequest(prod, user)
    .then(res => {
      dispatch(addAnalysis(res.data))
      dispatch(endLoading())
    })
    .catch(err => showError(dispatch, err))
}

export const removeAnalysis = (prodId) => {
  return {
    type: REMOVE_WISHLIST_PRODUCT,
    id: prodId
  }
}

export const removeAnalysisProduct = (prodId) => (dispatch) => {
  axios().delete(`/analysis/${prodId}/`)
    .then(res => {
      dispatch(removeAnalysis(prodId))
    })
    .catch(err => showError(dispatch, err))
}

export const removeMultiAnalysis = (prodIds) => {
  return {
    type: REMOVE_MULTI_WISHLIST,
    productIds: prodIds
  }
}

export const removeMultiAnalysisProducts = (prodIds) => dispatch => {
  axios().post(`/del-analysis/`, {
    products: prodIds
  })
  .then(res => {
    dispatch(removeMultiAnalysis(prodIds))
  })
  .catch(err => showError(dispatch, err))
}


export const setViewProduct = (prod) => {
  return {
    type: SET_VIEW_PRODUCT,
    product: prod
  }
}

export const getProduct = (prodId) => (dispatch) => {
  dispatch(startLoading())
  axios().get(`product/${prodId}`)
    .then(res => {
      dispatch(setViewProduct(res.data))
      dispatch(endLoading())
    })
    .catch(err => showError(dispatch, err))
}


export const addProductToCompare = (product) => {
  return {
    type: ADD_PRODUCT_COMPARE,
    product: product
  }
}

export const setCompareProducts = (prods, priceHistory) => {
  return {
    type: SET_COMPARE_PRODUCTS,
    products: prods,
    priceHistory: priceHistory
  }
}

export const viewCompareProduct = (prodIds) => (dispatch) => {
  dispatch(startLoading())
  axios().post('/compare/', {
    product_ids: prodIds
  })
  .then(res => {
    if (res.data.status) {
      dispatch(setCompareProducts(res.data.products, res.data.price_history))
    }
    else {
      dispatch(showMessage(res.data.message))
    }
    dispatch(endLoading())
  })
  .catch(err => showError(dispatch, err))
}

export const removeAllCompareProducts = () => {
  return {
    type: REMOVE_ALL_COMPARE_PRODUCTS
  }
}

export const removeCompareProduct = (prodId) => {
  return {
    type: REMOVE_COMPARE_PRODUCT,
    id: prodId
  }
}

export const fetchDataStatusAPI = (period='') => {
  return axios().get(`data-status/?website=${period}`)
}