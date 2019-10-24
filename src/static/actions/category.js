import axios from '../config/api'
import {
    FETCH_CATEGORIES
} from '../constants'

const setCategories = (categories) => {
    return {
        type: FETCH_CATEGORIES,
        categories: categories
    }
}

export const fetchCategories = () => (dispatch) => {
    axios().get('category/')
        .then((res) => {
            dispatch(setCategories(res.data))
        })
}
