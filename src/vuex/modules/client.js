import clients from '../../api/clients'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  userSelected: [],
  addStatus: null,
  addFailure: null
}

// getters
const getters = {
  allClients: state => state.all,
  addStatus: state => state.addStatus,
  userSelected: state => state.userSelected,
  addFailure: state => state.addFailure,
}

// actions
const actions = {
  getAllClients ({ commit }) {
    clients.getClients(clients => {
      commit(types.RECEIVE_CLIENTS, { clients })
    })
  },

  addClient ({ commit }, data) {
    clients.addClient(
      data,
      client => { commit(types.ADD_SUCCESS, { client })},
      msgs => {commit(types.ADD_FAILURE, {msgs})}
    )
  },

  selectClient ({ commit }, client) {    
     commit(types.USER_SELECTED, { client })
  },

  updateClient ({ commit }, data) {
    clients.updateClient(
      data,
      () => commit(types.UPDATE_SUCCESS),
      () => commit(types.UPDATE_FAILURE)
    )
  },

  failMensaje ({ commit }, msgs) {
    commit(types.ADD_FAILURE, { msgs })
  },

  deleteClient ({ commit }, data) {
    clients.deleteClient(data)
  }
}

// mutations
const mutations = {
  [types.USER_SELECTED] (state, { client }) {
    state.userSelected = client
    state.addStatus = null
  },

  [types.RECEIVE_CLIENTS] (state, { clients }) {
    state.all = clients
  },

  [types.ADD_SUCCESS] (state, { client }) {
    state.all.push(client)
    state.addStatus = 'Cliente Agregado con exito'
  },

  [types.UPDATE_SUCCESS] (state) {
    state.addStatus = 'Cliente modificado con exito'
  },

  [types.DELETE_SUCCESS] (state, { client }) {
    state.addStatus = 'El cliente se elimino correctamente'
  },

  [types.ADD_FAILURE] (state, { msgs }) {
    // rollback to the cart saved before sending the request
    state.addFailure = msgs
  },

  [types.UPDATE_FAILURE] (state) {
    // rollback to the cart saved before sending the request
    state.addStatus = 'No se pudo modificar el cliente'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}