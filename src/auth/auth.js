import router from '../router'

// User object will let us check authentication status
var authenticated = false;

export default {
  auth: false,
  // Send a request to the login URL and save the returned JWT
  login(context,data) {
    context.$http.post('/api/login', data)
        .then(function(res){
                if(res.body.error){
                    context.error = res.body.msg;
                }else{
                    var token = res.body.token;
                    localStorage.setItem('id_token',token);
                    this.auth = true;
                    router.push('/inicio');
                }
            })
  },

  signup(context, creds, redirect) {
    context.$http.post('/api/adduser', creds, (data) => {
      localStorage.setItem('id_token', data.id_token)
      localStorage.setItem('access_token', data.access_token)

      //this.authenticated = true

      if(redirect) {
        router.go(redirect)
      }

    }).error((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token');
    router.push('/login');
  },

  requireAuth(to, from, next){
    var ls = localStorage.getItem('id_token');
    if(ls){
      next();
    }else{
      next('/login');
    }
  },

  islogin(to, from, next) {
    var lss = localStorage.getItem('id_token');
    if(lss){
      next('/inicio');
    }else{
      next();
    }
  }
}