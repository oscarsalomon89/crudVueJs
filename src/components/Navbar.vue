<template>
<nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <router-link class="navbar-brand" to="/">Project</router-link>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li id="navHome" class="active"><router-link to="/inicio">Inicio</router-link></li>
                <li id="navAbout"><router-link to="/productos">Productos</router-link></li>
                <li id="navContact"><router-link to="/pedidos">Pedidos</router-link></li>
                <li id="navContact"><router-link to="/consultas">Consultas</router-link></li>
              </ul>
              <ul class="nav navbar-nav navbar-right" v-if="authenticated">
                <li><a @click="logout()">Logout <span class="sr-only">(current)</span></a></li>
              </ul>
            </div><!--/.nav-collapse -->
          </div><!--/.container-fluid -->
        </nav>
</template>
<script>
 import auth from '../auth/auth.js';

 export default {
   data() {
     return {
       authenticated: localStorage.getItem('id_token')
     }
   },
   methods: {
     logout() {
       auth.logout()
     }
   }
 }
 </script>
