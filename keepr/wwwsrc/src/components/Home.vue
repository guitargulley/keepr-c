<template>
  <div class="home container-fluid text-center">
    <!-- login modal -->
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
    <!--Add To Vault MODAL -->
    <div id="add-to-vault" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">KeepIt</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-6">
                <h4>Select Vault to add to</h4>
                <div class="row" v-for="vault in userVaults">

                  <button class="btn btn-primary" @click="addKeepToVault(vault.id)">{{vault.name}}</button>
                </div>
              </div>
              <div class="col-xs-6">
                <img :src="activeKeep.imageUrl" alt="">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of modal -->
    <!-- VIEW KEEP MODAL -->
    <div id="keep-view" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Keep Deetz</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-xs-12">
                  <h4>{{activeKeep.name}}</h4>
                  <img :src="activeKeep.imageUrl" alt="">
                  <p>Viewed: {{activeKeep.viewed}}---Keeps:{{activeKeep.keepCount}}</p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    <h1>WELCOME TO KeepR!</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <form id="search-keeps" class="form-inline" @submit.prevent="getKeeps">
            <div class="search-form-group">
              <input type="text" name="text" class="form-control" placeholder="Find a Keep">
              <button class="btn btn-submit btn-success search-btn" type="submit">
                <i class="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-3" v-for="keep in keeps">
          <div class="container" @mouseover="hoverHandle(keep.id)">
            <h2 class="title">{{keep.name}}</h2>
            <div class="content">
              <div class="content-overlay"></div>
              <img class="content-image" :src="keep.imageUrl" alt="">
              <div v-if="activeUser" class="content-details fadeIn-bottom">
                <button class="btn btn-warning">
                  <i class="fa fa-eye fa-2x"  @click="updateKeepViews(keep)" data-toggle="modal" data-target="#keep-view" aria-hidden="true"></i>
                </button>
                <button class="btn btn-success">
                  <i class="fa fa-check fa-2x" data-toggle="modal" data-target="#add-to-vault" aria-hidden="true"></i>
                </button>
                <button class="btn btn-primary">
                  <i class="fa fa-share-alt fa-2x" aria-hidden="true"></i>
                </button>
              </div>
              <div v-else class="content-details fadeIn-bottom">
                <button class="btn btn-warning">
                  <i class="fa fa-eye fa-2x" @click="updateKeepViews(keep)" data-toggle="modal" data-target="#keep-view" aria-hidden="true"></i>
                </button>
                <button class="btn btn-success">
                    <i class="fa fa-check fa-2x"  data-toggle="modal" data-target="#login" aria-hidden="true"></i>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        login: {
          email: '',
          password: ''
        }
        }
    },
    components: {

    },
    mounted() {
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getKeeps', { resource: "keeps" })
      
    },
    computed: {
      activeUser() {
        return this.$store.state.activeUser
      },
      keeps() {
        return this.$store.state.keeps
      },
      userVaults() {
        return this.$store.state.userVaults
      },
      activeKeep() {
        return this.$store.state.activeKeep
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
      getKeeps() {
        this.$store.dispatch('getKeeps', {
          resource: "keeps",
        })
      },
      hoverHandle(id){
        this.$store.dispatch('getKeep', { resource: "keeps", id: id })
        this.$store.dispatch('getVaults', { resource: 'vaults', id: this.activeUser.id })
      },
      addKeepToVault(id) {
        this.activeKeep.keepcount++
        this.activeKeep.viewed++
        this.$store.dispatch('addToVault',
          {
            data:
              {
                vaultId: id,
                keepId: this.activeKeep.id,
                userId: this.activeKeep.userId
              },
            keep: this.activeKeep,
            resource: 'vaultkeeps'
          })
          this.$store.dispatch('updateKeep', {resource: "keeps", endpoint: this.activeKeep.id, keep:this.activeKeep})
      },
      updateKeepViews(keep){
        debugger
        keep.viewed++
        var updatedKeep = {
          name: keep.name,
          imageUrl: keep.imageUrl,
          userId: keep.userId,
          keepCount: keep.keepCount,
          viewed: keep.viewed
        }
        this.$store.dispatch('updateKeep',{resource: "keeps", endpoint:keep.id, keep:updatedKeep})
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

    .container .title {
        color: #1a1a1a;
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

    .content-details h3 {
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
</style>