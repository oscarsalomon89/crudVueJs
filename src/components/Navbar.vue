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
                <li id="navLogin"><router-link to="/login">Login</router-link></li>
                <li id="navHome" class="active"><router-link to="/">Home</router-link></li>
                <li id="navAbout"><router-link to="/about">About</router-link></li>
                <li id="navContact"><router-link to="/contact">Contact</router-link></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <li><a href="./">Default <span class="sr-only">(current)</span></a></li>
              </ul>
            </div><!--/.nav-collapse -->
          </div><!--/.container-fluid -->
        </nav>
</template>