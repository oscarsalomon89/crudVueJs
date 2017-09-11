import router from '../router'
import Vue from 'vue'
import * as firebase from "firebase";
// User object will let us check authentication status
var authenticated = false;

export default {
  auth: false,
  // Send a request to the login URL and save the returned JWT
  login(context) {
    let data = context;
    firebase.auth().signInWithEmailAndPassword(data.user,data.password).
    then(function() {
        router.push('/inicio');
    }).
    catch(function(error) {
        var errorCode = error.code;
        data.errorMsg = error.message;
    }); 
  },

  signup(context) {
    firebase.auth().createUserWithEmailAndPassword(this.info.email,this.info.password).
    then(function() {
      router.push('/inicio');
    }).
    catch(function(error) {
        var errorCode = error.code;
        alert(error.message);
    });

  },

  // To log out, we just need to remove the token
  logout() {
    firebase.auth().signOut().then(function() {
      router.push('/login');
    }).catch(function(error) {
      // An error happened.
    });
  },

  requireAuth(to, from, next){
    firebase.auth().onAuthStateChanged((user) => {
      if(user) { 
        if(to.name != 'Login' && to.name != 'Signup'){
          next();
        }else{
          //Esta logueado y quiere ir al login lo redirecciono al inicio
          next('/inicio');
        }
      } else {
        //No esta logueado
        if(to.name == 'Login' || to.name == 'Signup'){
          next();
        }else{
          next('/login')
        }
      }
     })
  }
}
