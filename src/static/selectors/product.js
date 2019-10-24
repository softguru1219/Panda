import {createSelector} from 'reselect'

export const product = state => state.product

export const selProducts = state => state.product.list
export const selDiscountProducts = state => state.product.discountProducts

export const selWishListProducts = state => state.product.wishlist

export const canAddWish = prodId => {
  return createSelector(
    selWishListProducts,
    (products) => {
      return products.filter(prod => prod.id === prodId).length === 0
    }
  )
}

export const getViewProduct = state => state.product.viewProduct

export const selCompareProducts = state => state.product.compare_list
export const selComparePriceHistory = state => state.product.compare_price_history

export const canCompare = prodId => {
  return createSelector(
    selCompareProducts,
    (products) => {
      return products.filter(prod => prod.id === prodId).length === 0 && products.length < 3
    }
  )
}

export const selProductsCount = createSelector(
    selProducts,
    (products) => {return products.length}
)

export const isEmptyProducts = createSelector(
    selProductsCount,
    (len) => { return len === 0 }
)


export const selPagination = state => state.product.pagination

export const showLoadMore = createSelector(
  selPagination,
  selProductsCount, 
  (pagination, len) => { return pagination.count > len}
)

export const selSorts = state => state.product.sorts
export const selFilters = state => state.product.filters

export const isEnableFetching = state => state.product.isEnableFetching

export const currentCategory1 = state => state.product.category1
export const currentCategory2 = state => state.product.category2
export const currentCategory3 = state => state.product.category3
export const selSearchText = state => state.product.searchText

export const selQuery = createSelector(
  selPagination,
  selSorts,
  selFilters,
  selSearchText,
  currentCategory1,
  currentCategory2,
  currentCategory3,
  (pagination, sorts, filters, searchText, cat1, cat2, cat3) => {
    let filters_str = Object.keys(filters)
      .filter(key => 
        key !== 'color_and_sizes'
        && key !== 'item_properties'
        && key !== 'show_filters' 
        && filters[key]
        && filters[key].value !== undefined 
        && filters[key].value !== '')
      .map(key => filters[key].value instanceof Date ? `${key}=${filters[key].value}` : `${key}=${filters[key].value}` )
      .join('&')

    let color_and_sizes_filters = {}

    if (filters.color_and_sizes !== undefined)
      Object.keys(filters.color_and_sizes)
        .filter(key => filters.color_and_sizes[key].value !== undefined && filters.color_and_sizes[key].value !== '')
        .map(key => {
          color_and_sizes_filters[key] = filters.color_and_sizes[key].value
        })

    let item_properties_filters = {}
    if (filters.item_properties !== undefined)
      Object.keys(filters.item_properties)
        .filter(key => filters.item_properties[key].value !== undefined && filters.item_properties[key].value !== '')
        .map(key => {
          item_properties_filters[key] = filters.item_properties[key].value
        })

    let sorts_str = Object.keys(sorts)
      .filter(key => sorts[key] !== 0)
      .map(key=> sorts[key] === -1 ? `-${key}`: key)
      .join()

    return `?cat1=${cat1}&cat2=${cat2}&cat3=${cat3}&search=${searchText}&page=${pagination.page}&page_size=${pagination.pageSize}&ordering=${sorts_str}&${filters_str}&color_and_sizes=${JSON.stringify(color_and_sizes_filters)}&item_properties=${JSON.stringify(item_properties_filters)}`
  }
)