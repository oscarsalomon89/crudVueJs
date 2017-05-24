<template>
  <div>
    <Navbar></Navbar>
  <div class="page-header">
    <h1>Example page header <small>Subtext for header</small></h1>
    <div class="row">
      <div class="col-md-5">
        <form id="myForm">
          <input type="hidden" v-model="info.iduser">
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" class="form-control" v-model="info.user" placeholder="User">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Mensaje</label>
            <textarea v-on:keyup.enter="addMessage()" class="form-control" rows="3" v-model="info.message" placeholder="add multiple lines"></textarea>
          </div>
        </form>
        <br>
        <button class="btn btn-primary" v-on:click="addMessage()">Enviar Mensaje
        </button>
        <h2>Ultimo mensaje:</h2>
        <h3>{{messageFinal}}</h3>
      </div>
      <div class="col-md-7">
          <tableMessages :listMessages="listMessages"></tableMessages>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
  import Navbar from './Navbar.vue';
  import Table from './Table.vue';

  export default {
    components: { 'tableMessages': Table,'Navbar': Navbar },
    data() {
      return {
        info: {
            user: '',
            message: '',
            iduser: ''
        },
        listMessages: [],
        messageFinal: ''
      }
    },
    created: function () {
      this.getMessages ();
    },
    methods: {
      addMessage () {
        var data = JSON.stringify(this.info);
        if(this.info.iduser != ''){
          this.updateMessage();
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
      editMessage (id) {
        this.$http.post('/api/editmessage',[id])
        .then(function(res){
                this.info.iduser = res.data._id;
                this.info.user = res.data.user;
                this.info.message = res.data.body;
            })
      }
      ,
      updateMessage() {
        var data = JSON.stringify(this.info);
        this.$http.post('/api/updatemessage',data)
        .then(function(res){
                this.getMessages();
                this.info.iduser = ''
                this.info.message = ''
                this.info.user = ''
                this.messageFinal = 'Modificado'
            })
      }
    }
  }
</script>
