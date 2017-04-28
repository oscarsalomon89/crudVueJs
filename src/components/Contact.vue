<template>
  <div class="page-header">
    <h1>Example page header <small>Subtext for header</small></h1>
    <div class="row">
      <div class="col-md-5">
        <form id="myForm">
          <input type="hidden" v-model="iduser">
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" class="form-control" v-model="info.user" placeholder="User">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Mensaje</label>
            <textarea v-on:keyup.enter="addMessage(message)" class="form-control" rows="3" v-model="info.message" placeholder="add multiple lines"></textarea>
          </div>
        </form>      
        <br>
        <button class="btn btn-primary" v-on:click="addMessage(message)">Enviar Mensaje
        </button>
        <h2>Ultimo mensaje:</h2>
        <h3>{{messageFinal}}</h3>
      </div>
      <div class="col-md-7">      
          <table class="table table-bordered">
            <tr> 
              <th>#</th> 
              <th>User</th> 
              <th>Body</th> 
              <th>Time</th> 
              <th></th> 
            </tr>
            <tr v-for="item in listMessages"> 
              <th scope="row">{{item.id}}</th> 
              <td>{{item.user}}</td> 
              <td>{{ item.body }}</td> 
              <td>
                {{item.time | formatDate}}
                <span class="label label-default">{{item.time | parseDate}}</span>
              </td> 
              <td>
                <button v-on:click="removeMessage(item._id)" class="btn btn-danger btn-xs">
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
</template>
<script>
  import moment from "moment";
  
  export default {
    data() {
      return {
        info: {
            user: '',
            message: ''            
        },
        listMessages: [],
        messageFinal: '',
        iduser: ''
      }
    },
    created: function () {
      this.getMessages ();
    },
    filters: {
      formatDate: function (value) {
        if (!value) return ''
        value = value.toString()
        return moment(value).format('MM/DD/YYYY hh:mm')
      },
      parseDate: function (value) {
        if (!value) return ''
        value = value.toString()
        return moment(value).fromNow()
      }
    },
    methods: {
      addMessage () {
        var data = JSON.stringify(this.info);
        if(this.iduser != ''){
          this.updateMessage(this.iduser,data);
          return;
        }
              
        this.$http.post('/api/addmessage', data)
        .then(function(res){
                this.getMessages ();
				        // set the data after ajax request
                this.info.message = ''
                this.info.user = ''
                this.messageFinal = res.data.body
            })
      },
      getMessages () {
        this.$http.get('/api/messages')
        .then(function(res){
                this.listMessages = res.data;
            })
      },
      removeMessage (id) {
        this.$http.post('/api/removemessage',[id])
        .then(function(res){
                this.getMessages ();
            })
      },
      editMessage (id) {
        this.$http.post('/api/editmessage',[id])
        .then(function(res){
                this.iduser = res.data.id;
                this.info.user = res.data.user;
                this.info.message = res.data.body;
            })
      }
      ,
      updateMessage (id,form) {
        this.$http.post('/api/updatemessage',[id,form])
        .then(function(res){
                this.iduser = '';
                this.info.message = ''
                this.info.user = ''
                this.messageFinal = 'Modificado'
            })
      }
    }
  }
</script>
