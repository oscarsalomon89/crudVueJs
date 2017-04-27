<template>
<div class="page-header">
  <h1>Example page header <small>Subtext for header</small></h1>
  <div class="row">
    <div class="col-md-5">
      <form id="myForm">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input type="text" class="form-control" v-model="user" placeholder="User">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Mensaje</label>
          <textarea v-on:keyup.enter="addMessage(message)" class="form-control" rows="3" v-model="message" placeholder="add multiple lines"></textarea>
        </div>
      </form>      
      <br>
      <button class="btn btn-primary" v-on:click="addMessage(message)">Enviar Mensaje
      </button>
      <h2>Ultimo mensaje:</h2>
      <h3>{{messageFinal}}</h3>
    </div>
    <div class="col-md-7">      
      <ul class="list-group">
        <li class="list-group-item" v-for="item in listMessages">
          {{ item.body }} -- {{item.time | formatDate}}
          <span class="label label-default">Hola</span>
        </li>
      </ul>
      </div>
  </div>
</div>
</template>
<script>
  import moment from "moment";
  
  export default {
    data() {
      return {
        message: '',
        user: '',
        messageFinal: '',
        listMessages: []
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
        return moment(this.props.time).fromNow()
      }
    },
    methods: {
      addMessage () {
        this.$http.post('/api/addmessage', [this.message])
        .then(function(res){
                this.getMessages ();
				        // set the data after ajax request
                this.message = ''
                this.user = ''
                this.messageFinal = res.data.body
            })
      },
      getMessages () {
        this.$http.get('/api/messages')
        .then(function(res){
                this.listMessages = res.data;
            })
      }
    }
  }
</script>
