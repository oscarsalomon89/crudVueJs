// actions are functions that cause side effects and can involve
// asynchronous operations.
import * as types from './mutation-types'

export const addToCart = ({ commit }, product) => {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
}