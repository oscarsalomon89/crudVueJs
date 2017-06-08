<template>
  <div>
    <h1> Signup to chat team SS</h1>
    <form id="signup-form">
      <label for="username">Username</label><br>
      <input name="username" placeholder="Choose an username" v-model="info.user" required>
      
      <br><br><label for="password">Password</label><br>
      <input v-model="info.password" name="password" placeholder="Type a password" type="password" required>
      
      <br><br><label for="email">Email</label><br>
      <input v-model="info.email" name="email" placeholder="User email" type="email" required>
      
      <br><br><button v-on:click="addUser()" type="button">Signup</button>
    </form>
    <br><span>{{messageFin}}</span>
  </div>
</template>
<script>
  
  export default {
    data() {
      return {
        info: {
            user: '',
            password: '',
            email: ''            
        },
        messageFin: ''
      }
    },
    methods: {
      addUser () {
        if(this.info.user=='' || this.info.password== '' || this.info.email==''){
          this.messageFin = 'Datos incompletos';
          return;
        }

        var data = JSON.stringify(this.info);
              
        this.$http.post('/api/adduser', data)
        .then(function(res){
              if(!res.data.error){
                alert('Usuario creado correctamente');
                this.$router.push('/login');
              }                
            })
      }
    }
  }
</script>