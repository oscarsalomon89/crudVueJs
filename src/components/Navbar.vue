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
              <a class="navbar-brand" href="/">Home</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li id="navHome" class="active"><router-link to="/inicio">Inicio</router-link></li>
                <li id="navCli"><router-link to="/clientes">Clientes</router-link></li>
                <li id="navAbout"><router-link to="/productos">Productos</router-link></li>
                <li id="navContact"><router-link to="/pedidos">Pedidos</router-link></li>
                <li id="navContact"><router-link to="/consultas">Consultas</router-link></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Config <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <li><a href="#">Configuracion</a></li>
                    <li role="separator" class="divider"></li>
                    <li><a @click="logout()">Logout <span class="sr-only">(current)</span></a></li>
                  </ul>
                </li>
              </ul>
            </div><!--/.nav-collapse -->
          </div><!--/.container-fluid -->
        </nav>
</template>
<script>
 import auth from '../auth/auth.js';
 import router from '../router'
 
 export default {
   data() {
     return {
       authenticated: localStorage.getItem('id_token')
     }
   },
   methods: {
     logout() {
       auth.logout();
     }
   }
 }
 </script>
