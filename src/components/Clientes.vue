<template>
  <div>
    <Navbar></Navbar>
  <div class="page-header">
    <h1>Clientes <small>Subtext for header</small></h1>
    <div class="row">
      <div class="col-md-3">

      </div>
      <div class="col-md-6">
          <table class="table table-bordered">
        <tr> 
            <th>#</th> 
            <th>User</th> 
            <th>Email</th> 
            <th>Auth</th> 
            <th></th> 
        </tr>
        <tr v-for="item in listUsers"> 
            <th scope="row">{{item.id}}</th> 
            <td>{{item.username}}</td> 
            <td>{{ item.email }}</td> 
            <td>
            <span class="label label-default">act</span>
            </td> 
            <td>
            <button v-on:click="authUser(item._id)" class="btn btn-danger btn-xs">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
            <button v-on:click="editMessage(item._id)" class="btn btn-success btn-xs">
                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
            </button>
            </td>
        </tr>
    </table>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
  import Navbar from './Navbar.vue';

  export default {
    components: {'Navbar': Navbar },
    data() {
      return {
        listUsers: []
      }
    },
    created: function () {
      this.getUsers ();
    },
    methods: {
      authUser () {
        var data = JSON.stringify(this.info);

        this.$http.post('/api/addmessage', data)
        .then(function(res){
                this.getMessages ();
				        // set the data after ajax request
                this.info.message = ''
                this.info.user = ''
                this.messageFinal = res.data.body
            })
      },
      getUsers () {
        this.$http.get('/api/users')
        .then(function(res){
                this.listUsers = res.data;
            })
      }
    }
  }
</script>