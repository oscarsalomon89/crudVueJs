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
          <ul>
            <li v-for="msg in messages" class="msg" :key="msg['.key']">
              <span>{{msg.user}} - {{msg.message}}</span>
              <button v-on:click="editMessage(msg)">Edit</button>
              <button v-on:click="removeMsg(msg)">X</button>
            </li>
          </ul>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
  import Navbar from './Navbar.vue';
  import Table from './Table.vue';
  import * as firebase from "firebase";
  import {db} from '../helpers/firebaseConfig'
  
// Get a reference to the database service
var messagesRef = db.ref('messages')

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
    firebase() {
      return {
        messages: db.ref('messages')
      }
    },
    methods: {
      addMessage () {        
        if(this.info.iduser != ''){
          this.updateMessage();
          return;
        }

        var msg = {
                    user: this.info.user,
                    message: this.info.message
                  }

        messagesRef.push(msg)
        this.info.user = '';
        this.info.message = '';
      },
      removeMsg(user) {
        messagesRef.child(user['.key']).remove()
      },
      editMessage (msg) {
          this.info.iduser = msg['.key'];
          this.info.user = msg.user;
          this.info.message = msg.message;
      }
      ,
      updateMessage() {
        messagesRef.child(this.info.iduser).update({"user": this.info.user,
                                                    "message":this.info.message});

        this.info.iduser = '';
        this.info.user = '';
        this.info.message = '';
        /*var data = JSON.stringify(this.info);
        this.$http.post('/api/updatemessage',data)
        .then(function(res){
                this.getMessages();
                this.info.iduser = ''
                this.info.message = ''
                this.info.user = ''
                this.messageFinal = 'Modificado'
            })*/
      }
    }
  }
</script>
