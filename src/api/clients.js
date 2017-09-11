import Vue from 'vue'

export default {
  getClients (clientes) {
    Vue.http.get('api/users',
            ).then(response => {
                clientes(response.data)
            }, response => {
                clientes([])
            })
  },

  addClient (data, cb, errorCb) {
    Vue.http.post('api/register', data)
        .then(function(res){
            cb(res.body.user)             
            }, function(response){                
                if (response.status ==422){
                    errorCb(response.body.email[0])
                }
            })
  },

  updateClient (data, cb, errorCb) {
      Vue.http.post('api/updateUser', data)
        .then(function(res){
            cb()             
            }, function(response){
            if (response.status ==422){
                errorCb()
            }
        })
  },

  deleteClient (data, cb) {
    Vue.http.post('api/deleteUser', data)
        .then(function(res){
            cb(res.body)             
            }, function(response){
            if (response.status ==422){
                
            }
        })
  }
}