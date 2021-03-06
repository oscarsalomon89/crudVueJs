import items from '../../api/item'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  itemSelected: []
}

// getters
const getters = {
  allProducts: state => state.all,
  itemSelected: state => state.itemSelected
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    items.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  },
  
  addItem ({ commit }, data) {
    items.addItem(
      data,
      item => { commit(types.ADD_SUCCESS, { item })},
      msgs => {commit(types.ADD_FAILURE, {msgs})}
    )
  },

  updateItem ({ commit }, data) {
    items.updateItem(
      data,
      () => commit(types.UPDATE_SUCCESS),
      () => commit(types.UPDATE_FAILURE)
    )
  },

  updateUrl ({ commit }, data) {
    items.updateUrl(
      data,
      () => commit(types.UPDATE_SUCCESS),
      () => commit(types.UPDATE_FAILURE)
    )
  },

  selectItem ({ commit }, item) {    
      commit(types.ITEM_SELECTED, { item })
  }

}

// mutations
const mutations = {
  [types.ITEM_SELECTED] (state, { item }) {
    state.itemSelected = item
  },

  [types.ADD_SUCCESS] (state, { item }) {
    state.addStatus = 'Producto Agregado con exito'
  },

  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
  }
  
}

export default {
  state,
  getters,
  actions,
  mutations
}