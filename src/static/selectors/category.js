import {createSelector} from 'reselect'

export const selCategories = state => state.category.items

export const selRootCategories = createSelector(
  selCategories,
  (categories) => categories.map(item => { return {id: item.id, title: item.title} })
)