import files from '../../api/files'
import * as types from '../mutation-types'

// initial state
const state = {
    addStatusFile: null,
    addFailurefile: null,
    filesItem: []
}

// getters
const getters = {
  filesItem: state => state.filesItem,
  addStatusFile: state => state.addStatusFile,
  addFailurefile: state => state.addFailurefile
}

// actions
const actions = {  
  addFile ({ commit }, data) {
    files.addFile(
      data,
      item => { commit(types.ADD_SUCCESS_FILE, { item })},
      msgs => {commit(types.ADD_FAILURE_FILE, {msgs})}
    )
  },
  
  selectFilesItem ({ commit }, codigo) {    
    files.selectFiles(
      codigo,
      files => { commit(types.FILES_ITEM, { files })}
    )
  },
  
  deleteFile ({ commit }, data) {
    files.deleteFile(data)
  }

}

// mutations
const mutations = { 
    [types.ADD_SUCCESS_FILE] (state, { client }) {
        state.addStatusFile = 'Archivo cargado con exito'
    },

    [types.ADD_FAILURE_FILE] (state, { msgs }) {
        // rollback to the cart saved before sending the request
        state.addFailurefile = msgs
    }, 

    [types.FILES_ITEM] (state, { files }) {
        state.filesItem = files
    }
  
}

export default {
  state,
  getters,
  actions,
  mutations
}