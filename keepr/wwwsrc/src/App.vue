<template>
  <div id="app" class="container-fluid">
    <nav class="navbar">
      <div class="navbar-header">
        <a class="navbar-brand" style="font-family: 'Amatic SC',cursive; font-size:3em; color:rgb(172, 67, 67);text-shadow:1px 1px 2px white;">keepR</a>
        <div class="text-right" v-if="activeUser.hasOwnProperty('username')">
          <p class="navbar-text">Welcome {{activeUser.username}}</p>
          <router-link :to="{name: 'Home'}"><button type="button" class="btn  navbar-btn home-btn">HOME</button></router-link>
          <router-link :to="{path: '/profile/'+activeUser.id}"><button type="button" class="btn  navbar-btn profile-btn">DASHBOARD</button></router-link>
          <button type="button" class="btn  navbar-btn logout-btn" @click="logout" style="margin-right: 10px">Logout</button>
        </div>
        <div class="text-right" v-else>
          <button type="button" class="btn login-btn navbar-btn " data-toggle="modal" data-target="#login">Login</button>
          <button type="button" class="btn register-btn navbar-btn" style="margin-right: 10px"data-toggle="modal" data-target="#signUp">Sign-up</button>
        </div>
      </div>

      <!-- MENU DROWDOWN -->
      
    </nav>
    <div id="login" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Sign in to your account</h4>
          </div>
          <div class="modal-body">
            <form id="login" class="form">
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" maxlength="57" name="email" class="form-control" placeholder="Email" required v-model='login.email'>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" maxlength="20" class="form-control" placeholder="password" required v-model='login.password'>
              </div>
              <div class="form-group">
                <button class="btn btn-submit btn-success" @click="submitLogin" data-dismiss="modal" type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- SIGN UP MODAL -->
    <div id="signUp" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Create a KeepR Account</h4>
            <p v-if="error">
              <b>Your Passwords Do Not Match</b>
            </p>
          </div>
          <div class="modal-body">
            <form id="register" class="form">
              <div class="form-group">
                <label for="userName">Username:</label>
                <input type="userName" name="userName" maxlength="20" class="form-control" placeholder="user name" required v-model="signUp.userName">
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" maxlength="57" name="email" class="form-control" placeholder="Email" required v-model="signUp.email">
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" maxlength="20" class="form-control" placeholder="password" required v-model="signUp.password">
              </div>
              <div class="form-group">
                <label for="reEnterPassword">Re-enter Password:</label>
                <input type="password" name="reEnterPassword" maxlength="20" class="form-control" placeholder="Re Enter Password" v-model="signUp.rPassword">
              </div>
              <div class="form-group">
                <button class="btn btn-submit btn-success" data-dismiss="modal" type="submit" @click="submitRegister">Submit</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        login: {
          email: '',
          password: ''
        },
        signUp: {
          userName: '',
          email: '',
          password: '',
          rPassword: ''
        },
        error: false,
      }
    },
    components: {

    },
    mounted() {
      this.$store.dispatch('authenticate')
    },
    computed: {
      activeUser() {
        return this.$store.state.activeUser
      }
    },
    methods: {
      submitLogin() {
        this.$store.dispatch('login', this.login)
        this.login = {
          email: '',
          password: ''
        }
      },
      submitRegister() {
        if (this.signUp.password == this.signUp.rPassword) {
          this.$store.dispatch('register', {
            username: this.signUp.userName,
            email: this.signUp.email,
            password: this.signUp.password
          })
        } else {
          this.error = true
          console.error({ error: "Passwords Do Not Match" })
        }
      },
      logout() {
        this.$store.dispatch('logout')
      },
    }
  }
</script>

<style>
  body{
    font-family:'Cinzel',serif;
    background-image:url("https://media.gettyimages.com/photos/teak-wood-background-horizontal-drop-shadow-picture-id485870457?b=1&k=6&m=485870457&s=612x612&w=0&h=rw83rMbYbRBha9o7x2dH90HAXlhfpapbsRGc5GPj9WY=");
    background-attachment: fixed;
    background-size:cover;
    background-repeat:none
  }
  .navbar{
    background-color:rgba(0, 0, 0, 0.363);
    margin-left:-15px;
    margin-right: -15px;
    
  }
  .home-btn{
    background-color:rgba(134, 226, 233, 0.521);
    color:white;
  }
  .profile-btn{
    background-color:rgba(134, 226, 233, 0.521);
    color:white;
  }
  .logout-btn{
    background-color:rgba(233, 150, 122, 0.493);
    color:white;
  }
  .login-btn{
    background-color:rgba(134, 226, 233, 0.521);
    color:white;
  }
  .register-btn{
    background-color:rgba(233, 150, 122, 0.493);
    color:white;
  }
  .well{
    background-color: rgba(0, 0, 0, 0.281);
    border-color: black;
  }
  
  .info-text {
    font-family: 'Bad Script';
  }
  .navbar .navbar-header .navbar-text{
    font-family: 'Amatic SC',cursive;
    color:white;
    text-shadow:1px 1px 2px black;
    font-size: 1.5em;
    font-weight: bold;
    letter-spacing: .3em;
  }
  .btn-default {
    width: 100%;
  }
  .navbar-btn{
    font-family: 'Amatic SC', cursive;
    text-shadow: 1px 1px 5px black;
    letter-spacing: .5em
  }
  .screenshot {
    margin-left: 50px;
  }

  .navbar ul {
    list-style-type: none;
  }

  .logout-btn {
    margin-left: 2px;
  }

  @media (max-width: 2000px) {
    .navbar-header {
      float: none;
    }
    .navbar-toggle {
      display: block;
    }
    .navbar-collapse {
      border-top: 1px solid transparent;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    .navbar-collapse.collapse {
      display: none!important;
    }
    .navbar-collapse.collapse.in {
      display: block!important;
    }
    .navbar-nav {
      float: none!important;
      margin: 7.5px -15px;
    }
    .navbar-nav>li {
      float: none;
    }
    .navbar-nav>li>a {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .state {
      width: 50%
    }
    .nav-drop-btn {
      width: 100%;
      background-color: #FFFFF9;
      margin: 2px;
      font: black;
    }
    .container {
    padding: 1em 0;
    float: left;
    width: 100%;
  }
  @media screen and (max-width: 640px) {
    .container {
      display: block;
      width: 100%;
    }
  }

  @media screen and (min-width: 900px) {
    .container {
      width: 100%;
    }
  }
  .container .title{
    color: rgba(255, 255, 255, 0.788);
    text-align: center;
    margin-bottom: 10px;
  }

  .content {
    position: relative;
    width: 90%;
    max-width: 400px;
    margin: auto;
    overflow: hidden;
  }

  .content .content-overlay {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    height: 99%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    -webkit-transition: all 0.4s ease-in-out 0s;
    -moz-transition: all 0.4s ease-in-out 0s;
    transition: all 0.4s ease-in-out 0s;
  }

  .content:hover .content-overlay {
    opacity: 1;
  }

  .content-image {
    width: 100%;
    max-height: 500px;
  }

  .content-details {
    position: absolute;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    top: 50%;
    left: 50%;
    opacity: 0;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: all 0.3s ease-in-out 0s;
    -moz-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  .content:hover .content-details {
    top: 50%;
    left: 50%;
    opacity: 1;
  }

  .content-details h2 {
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.15em;
    margin-bottom: 0.5em;
    text-transform: uppercase;
  }

  .content-details p {
    color: #fff;
    font-size: 0.8em;
  }

  .fadeIn-bottom {
    top: 80%;
  }
  }
</style>